# Option Select- Angular 2 Version !
![Angular1x:optionSelect](/img/snap.JPG)
This is an `OptionSelect UI control` project which faciliate text enterence. 
Instead of entering value you can pick values from listed options.

Control has following properties;


Property | Description | 
--- | --- | ---
`select-first` | **picks first available option** | 
`editable="true"` | **allows manual text enterance** | 
`header="Instrunctions"`| **sets modal header** | 
`options-url="'/webApi/url'"`| **gather options from a json file or webapi** | 
`lazy="true"`| **automatically loads values or wait for user trigger** | 
`unique-id="myControlId"`| **sets a unique id for options modal (div)** | 
`button-name="Pick Me!`| **sets name of picker button** | 
`sorted="true"`| **sort options alphabetically** | 
`rows="5"`| **number of rows to be shown in popup list (auto calculated by default)** | 
`result="your text goes here"`| **produced result by #of picks** | 
## Usage
`
<option-select header="Pick your dream PC!" button-name="Pick PC" options-url="'/data/pc.dat'" unique-id="pcContent">
</option-select>
`

## Json options file/api format 
```
[{
    "Header": "Pick your...",
    "Options": 
              [{
                  "Text": "Option1",
                  "Value": "1"
              },
             ...    
              {
                  "Text": "OptionN",
                  "Value": "N"
              }]
]
```
## Project Description
This is simple Angular 1.x control project to ease information entry on the web.
Thanks to $http Angular service, we can gather predifined options from a `web-api`
or simply from a `json file`.

## CheatSheet.html
CheatSheet.html is a simple file just to use as a quick reference of following angular features.
These are ;

- `binding`
- `controller`
- `constant`
- `value`
- `factory`
- `directive`
- `filter`
- `service`

## Clone
You can clone this repo with following git command
`git clone https://github.com/davutg/option-select.git`

## Technologies benefited
- [AngularJS](https://angular.io/)
- [W3 Css](http://www.w3schools.com/w3css/)
- [git](http://git-scm.com/)
- [jquery](https://jquery.com/)
- [Gulp] (http://gulpjs.com/)
