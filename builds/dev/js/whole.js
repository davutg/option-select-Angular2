var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("textValue", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("option", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("optionService", ['angular2/core', 'angular2/http'], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_1, http_1;
    var OptionService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            OptionService = (function () {
                function OptionService(http) {
                    this.http = http;
                }
                OptionService.prototype.getOptions = function () {
                    return this.http.get(this.sourceAddress);
                    //.map(this.onLoaded);
                    //.catch(this.handleError);
                };
                OptionService.prototype.onLoaded = function (res) {
                    var body = res.json();
                    return body.data || {};
                };
                OptionService.prototype.handleError = function (error) {
                };
                OptionService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], OptionService);
                return OptionService;
            }());
            exports_3("OptionService", OptionService);
        }
    }
});
System.register("trim-pipe", ['angular2/core'], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_2;
    var TrimPipe;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            TrimPipe = (function () {
                function TrimPipe() {
                }
                TrimPipe.prototype.transform = function (item, _a) {
                    var param = _a[0];
                    if (!item)
                        return;
                    if (item.length > param)
                        return item.substring(0, param) + "...";
                    return item;
                };
                TrimPipe = __decorate([
                    core_2.Pipe({
                        name: 'trim'
                    }), 
                    __metadata('design:paramtypes', [])
                ], TrimPipe);
                return TrimPipe;
            }());
            exports_4("TrimPipe", TrimPipe);
        }
    }
});
System.register("sort-pipe", ["angular2/core"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_3;
    var SortPipe, exceptionList;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            }],
        execute: function() {
            SortPipe = (function () {
                function SortPipe() {
                }
                SortPipe.prototype.transform = function (array, propertyName) {
                    array.sort(function (a, b) {
                        if (propertyName != null) {
                            if (exceptionList.indexOf(a[propertyName]) > -1)
                                return -1;
                            if (a[propertyName] < b[propertyName]) {
                                return -1;
                            }
                            else if (a[propertyName] > b[propertyName]) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        }
                        else {
                            if (exceptionList.indexOf(a) > -1)
                                return -1;
                            if (a < b) {
                                return -1;
                            }
                            else if (a > b) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        }
                    });
                    return array;
                };
                SortPipe = __decorate([
                    core_3.Pipe({
                        name: "sort"
                    }), 
                    __metadata('design:paramtypes', [])
                ], SortPipe);
                return SortPipe;
            }());
            exports_5("SortPipe", SortPipe);
            exceptionList = ["n/a", "'n/a'", 'none'];
        }
    }
});
System.register("option-select.component", ['angular2/core', "optionService", "trim-pipe", "sort-pipe"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_4, optionService_1, trim_pipe_1, sort_pipe_1;
    var OptionSelectComponent, buttonClasses;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (optionService_1_1) {
                optionService_1 = optionService_1_1;
            },
            function (trim_pipe_1_1) {
                trim_pipe_1 = trim_pipe_1_1;
            },
            function (sort_pipe_1_1) {
                sort_pipe_1 = sort_pipe_1_1;
            }],
        execute: function() {
            OptionSelectComponent = (function () {
                function OptionSelectComponent(optionSrv) {
                    this.optionSrv = optionSrv;
                    //if(!this.lazy)
                    //this.isDisabled=true;        
                    this.buttonClasses = buttonClasses;
                    this.buttonName = "Select";
                    this.rows = 5;
                }
                OptionSelectComponent.prototype.ngOnInit = function () {
                    if (!this.lazy) {
                        this.load(null);
                    }
                };
                OptionSelectComponent.prototype.load = function (callbackFn) {
                    var _this = this;
                    this.optionSrv.sourceAddress = this.optionsUrl;
                    var opts = this.optionSrv.getOptions();
                    opts.subscribe(function (op) {
                        _this.listOfOptions = op.json();
                        _this.calculateSize();
                        if (_this.sorted != null) {
                            _this.sortAllOptions();
                        }
                        if (_this.selectFirst != null) {
                            _this.selectFirsts();
                        }
                        _this.isDisabled = false;
                        if (callbackFn) {
                            var p = new Promise(function (resolve, reject) {
                                resolve(callbackFn());
                            });
                        }
                    }, function (error) { return _this.errorMessage = error; });
                };
                OptionSelectComponent.prototype.showModal = function (res) {
                    this.result = res;
                    var showPopUp = function () {
                        $('#' + this.uniqueId).css("display", "block");
                    };
                    if (!this.lazy) {
                        showPopUp.bind(this)();
                    }
                    else {
                        this.load(showPopUp.bind(this));
                    }
                };
                OptionSelectComponent.prototype.closeModal = function () {
                    $('#' + this.uniqueId).css("display", "none");
                };
                OptionSelectComponent.prototype.select = function () {
                    this.result = this.currentSelection;
                    this.closeModal();
                };
                OptionSelectComponent.prototype.updateSelection = function ($event) {
                    this.currentSelection = "";
                    for (var i = 0; i < this.listOfOptions.length; i++) {
                        if (this.listOfOptions[i].selection)
                            this.currentSelection = this.currentSelection
                                + ' ' + String.fromCharCode(29) + this.listOfOptions[i].selection;
                    }
                    this.currentSelection = this.currentSelection.substring(1);
                };
                OptionSelectComponent.prototype.sortAllOptions = function () {
                    for (var x = 0; x < this.listOfOptions.length; x++) {
                        this.listOfOptions[x].Options = new sort_pipe_1.SortPipe().transform(this.listOfOptions[x].Options, 'Text');
                    }
                };
                OptionSelectComponent.prototype.selectFirsts = function () {
                    for (var x = 0; x < this.listOfOptions.length; x++) {
                        if (this.listOfOptions[x].Options[0] != null)
                            this.listOfOptions[x].selection = this.listOfOptions[x].Options[0].Value;
                    }
                };
                OptionSelectComponent.prototype.calculateSize = function () {
                    for (var x = 0; x < this.listOfOptions.length; x++) {
                        this.rows = Math.max(this.listOfOptions[x].Options.length, this.rows);
                    }
                };
                OptionSelectComponent = __decorate([
                    core_4.Component({
                        selector: 'option-select',
                        templateUrl: 'partials/optionSelectTemplate.html',
                        styleUrls: ['css/w3.css', 'css/site.css'],
                        inputs: ['optionsUrl', 'result', 'uniqueId', 'header', 'buttonName', 'editable', 'selectFirst', 'positionClass', 'sorted', 'rows', 'lazy'],
                        pipes: [trim_pipe_1.TrimPipe, sort_pipe_1.SortPipe]
                    }), 
                    __metadata('design:paramtypes', [optionService_1.OptionService])
                ], OptionSelectComponent);
                return OptionSelectComponent;
            }());
            exports_6("OptionSelectComponent", OptionSelectComponent);
            buttonClasses = "w3-btn w3-green w3-col w3-ripple";
        }
    }
});
System.register("app.component", ['angular2/core', "option-select.component", "optionService"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_5, option_select_component_1, optionService_2;
    var AppComponent;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (option_select_component_1_1) {
                option_select_component_1 = option_select_component_1_1;
            },
            function (optionService_2_1) {
                optionService_2 = optionService_2_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_5.Component({
                        selector: 'my-app',
                        templateUrl: 'partials/app.html',
                        directives: [option_select_component_1.OptionSelectComponent],
                        styleUrls: ['css/w3.css', 'css/site.css'],
                        providers: [optionService_2.OptionService]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_7("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component", 'angular2/http'], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var browser_1, app_component_1, http_2;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [http_2.HTTP_PROVIDERS]);
        }
    }
});

//# sourceMappingURL=whole.js.map
