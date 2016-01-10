System.register(['angular2/core', './character/character.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, character_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (character_component_1_1) {
                character_component_1 = character_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.characterRows = [];
                    this.isLoading = false;
                }
                // adds a character panel to the page
                AppComponent.prototype.AddCharacter = function () {
                    var length = this.characterRows.length;
                    if (length == 0 || this.characterRows[length - 1].length == 3) {
                        this.characterRows.push([{}]);
                        return;
                    }
                    this.characterRows[length - 1].push({});
                };
                // updates the plot with new data
                AppComponent.prototype.UpdatePlot = function () {
                    this.isLoading = true;
                    UPDATE_PLOT();
                    this.isLoading = false;
                    console.log(this.characterRows);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.html',
                        directives: [character_component_1.CharacterComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map