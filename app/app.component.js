System.register(['angular2/core', 'angular2/common', './character/character.component', './lib/firebase', './lib/plot'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, character_component_1, firebase_1, plot_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (character_component_1_1) {
                character_component_1 = character_component_1_1;
            },
            function (firebase_1_1) {
                firebase_1 = firebase_1_1;
            },
            function (plot_1_1) {
                plot_1 = plot_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(ref, fb, fs) {
                    var _this = this;
                    this.ref = ref;
                    this.characterRows = [];
                    this.isLoading = false;
                    this.choices = [];
                    this.params = fb.group({
                        'iters': [5000],
                        'lvl-under': [5],
                        'lvl': [6],
                        'lvl-over': [5]
                    });
                    fs.dataRef.child('characters').on('value', function (snapshot) {
                        _this.choices = Object.keys(snapshot.val());
                    });
                }
                // returns the opponents from the listed characters
                AppComponent.prototype.Opps = function () {
                    var opps = [];
                    for (var i = 0; i < this.characterRows.length; i++) {
                        for (var j = 0; j < this.characterRows[i].length; j++) {
                            if (this.characterRows[i][j]['team'] == 'opp') {
                                opps.push(this.characterRows[i][j]);
                            }
                        }
                    }
                    return opps;
                };
                // returns the player from the listed characters
                AppComponent.prototype.Player = function () {
                    for (var i = 0; i < this.characterRows.length; i++) {
                        for (var j = 0; j < this.characterRows[i].length; j++) {
                            if (this.characterRows[i][j]['team'] == 'player') {
                                return this.characterRows[i][j];
                            }
                        }
                    }
                    return {};
                };
                // adds a character panel to the page
                AppComponent.prototype.AddCharacter = function () {
                    var length = this.characterRows.length;
                    if (length == 0 || this.characterRows[length - 1].length == 4) {
                        this.characterRows.push([{}]);
                        return;
                    }
                    this.characterRows[length - 1].push({});
                };
                // updates the plot with new data
                AppComponent.prototype.UpdatePlot = function () {
                    var _this = this;
                    this.isLoading = true;
                    var worker = new Worker('app/lib/simulation.js');
                    worker.postMessage([this.Player(), this.Opps(), this.params.value]);
                    worker.onmessage = function (results) {
                        plot_1.PlotData(results.data);
                        _this.isLoading = false;
                        _this.ref.detectChanges();
                    };
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.html',
                        directives: [common_1.FORM_DIRECTIVES, character_component_1.CharacterComponent]
                    }), 
                    __metadata('design:paramtypes', [core_1.ChangeDetectorRef, common_1.FormBuilder, firebase_1.FirebaseService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map