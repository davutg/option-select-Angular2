import {Component} from 'angular2/core';
import {Option} from './option';
import {OptionService} from './optionService';
import {TextValue}from './textValue';
import {TrimPipe} from './trim-pipe';
import {SortPipe} from './sort-pipe';


//let $ = require('../../node_modules/jquery/dist/jquery.min.js');
declare var $: any;

@
Component({
    selector: 'option-select',
    templateUrl: 'partials/optionSelectTemplate.html',
    styleUrls: ['css/w3.css', 'css/site.css'],
    inputs: ['optionsUrl', 'result', 'uniqueId', 'header', 'buttonName', 'editable', 'selectFirst','positionClass','sorted','rows','lazy'],
    pipes: [TrimPipe,SortPipe]
})

export class OptionSelectComponent {

constructor(private optionSrv:OptionService) { 
        //if(!this.lazy)
        //this.isDisabled=true;        
        this.buttonClasses=buttonClasses;
        this.buttonName="Select";
        this.rows=5;
    }
    
    ngOnInit()
    {          
            if(!this.lazy)
            {
                this.load(null);
            }                
    }
    
    load(callbackFn)
    {
            
            this.optionSrv.sourceAddress=this.optionsUrl;
            var opts=this.optionSrv.getOptions();     
            opts.subscribe(
            op => 
                {
                    this.listOfOptions = op.json();
                        this.calculateSize();
                        if(this.sorted!=null){
                            this.sortAllOptions();
                        }
                        if (this.selectFirst!=null) {
                            this.selectFirsts();                                
                        }                       
                    this.isDisabled=false;
                    if(callbackFn)
                    {
                        var p=new Promise((resolve, reject) => {
                                resolve(callbackFn());
                            });
                    }
                }
            ,
            error =>  this.errorMessage = <any>error);
    }
       
    private listOfOptions : Option[];
    private errorMessage:string;
    
    public rows:number;
    
    public editable: boolean;
    public selectFirst: boolean;
    public sorted:boolean;
    public lazy:boolean;
    
    public result: string;
    public buttonName: string;
    public header: string;
    public uniqueId: string;
    public optionsUrl: string;
    public positionClass:string;
        
    private currentSelection:string;
    private isDisabled:boolean;
    private buttonClasses:string;

    showModal(res) {
        this.result = res;    
        var showPopUp=function()
                    {                      
                        $('#' + this.uniqueId).css("display", "block");  
                    };
            if(!this.lazy)
            {
                showPopUp.bind(this)();                                  
            }else
            {
                this.load(showPopUp.bind(this));
            }
    }

    closeModal() {
        $('#' + this.uniqueId).css("display", "none");
    }
    
    select() {
        this.result=this.currentSelection;
        this.closeModal();
    }

    updateSelection($event) {
        this.currentSelection="";
        for (var i = 0; i < this.listOfOptions.length; i++) {
            if(this.listOfOptions[i].selection)
            this.currentSelection=this.currentSelection
                +' '+String.fromCharCode(29)+this.listOfOptions[i].selection;
        }
        this.currentSelection=this.currentSelection.substring(1);        
    }
    
    sortAllOptions()
    {         
        for(var x=0;x<this.listOfOptions.length;x++)
        {
            this.listOfOptions[x].Options=new SortPipe().transform(this.listOfOptions[x].Options,'Text');
        }        
    }
    
    selectFirsts()
    {         
            
        for(var x=0;x<this.listOfOptions.length;x++)
        {                
            if(this.listOfOptions[x].Options[0]!=null)
            this.listOfOptions[x].selection=this.listOfOptions[x].Options[0].Value;                
        }        
    }
    
    calculateSize()
    {         
        
        for(var x=0;x<this.listOfOptions.length;x++)
        {                
            this.rows= Math.max(this.listOfOptions[x].Options.length,this.rows);                
        }        
    }
}
var buttonClasses="w3-btn w3-green w3-col w3-ripple";