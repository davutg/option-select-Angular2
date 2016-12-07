import {Component} from 'angular2/core';
import {OptionSelectComponent} from './option-select.component';
import {OptionService} from './optionService';
import {HTTP_PROVIDERS, HTTP_BINDINGS} from 'angular2/http';

@Component({
  selector: 'my-app',
  templateUrl: 'partials/app.html',
  directives: [OptionSelectComponent],  
  styleUrls: ['css/w3.css','css/site.css'],
  providers:[OptionService]
})

export class AppComponent {  
  
}
