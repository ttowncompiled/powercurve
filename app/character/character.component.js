System.register(['angular2/core', 'angular2/common', '../lib/firebase'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, firebase_1;
    var CharacterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (firebase_1_1) {
                firebase_1 = firebase_1_1;
            }],
        execute: function() {
            CharacterComponent = (function () {
                function CharacterComponent(fb, fbs) {
                    this.fb = fb;
                    this.fbs = fbs;
                    this.myForm = this.fb.group({
                        'team': ['player'],
                        'name': [''],
                        'str': ['10'],
                        'dex': ['10'],
                        'cont': ['10'],
                        'int': ['10'],
                        'wis': ['10'],
                        'cha': ['10'],
                        'ftd': ['0'],
                        'rflx': ['0'],
                        'will': ['0'],
                        'vit': ['1'],
                        'sta': ['0'],
                        'srgn': ['0'],
                        'aura': ['0'],
                        'ardx': ['0'],
                        'argn': ['0'],
                        'form': ['melee'],
                        'def': ['0'],
                        'atk': ['1 * d4 + 0'],
                        'dmg': ['1 * d4 + 0'],
                        'crit': ['0'],
                        'cdmg': ['1 * d1 + 0']
                    });
                    this.choiceForm = this.fb.group({
                        'choice': ['']
                    });
                    this.ListenForChoice();
                }
                CharacterComponent.prototype.ListenForChoice = function () {
                    var _this = this;
                    this.choiceForm.valueChanges.subscribe(function (value) {
                        if (value != '') {
                            _this.fbs.dataRef.child('characters/' + value['choice']).once('value', function (snapshot) {
                                _this.UpdateForm(snapshot.val());
                            });
                        }
                    });
                };
                CharacterComponent.prototype.ngOnInit = function () {
                    this.PassUp();
                };
                CharacterComponent.prototype.PassUp = function () {
                    // must perform a deep copy
                    for (var key in this.myForm.value) {
                        this.char[key] = this.myForm.value[key];
                    }
                };
                CharacterComponent.prototype.SaveForm = function () {
                    this.PassUp();
                    var character = this.myForm.value;
                    this.fbs.dataRef.child('characters/' + character['name']).update(character);
                };
                CharacterComponent.prototype.UpdateForm = function (val) {
                    this.myForm = this.fb.group({
                        'team': [val['team']],
                        'name': [val['name']],
                        'str': [val['str']],
                        'dex': [val['dex']],
                        'cont': [val['cont']],
                        'int': [val['int']],
                        'wis': [val['wis']],
                        'cha': [val['cha']],
                        'ftd': [val['ftd']],
                        'rflx': [val['rflx']],
                        'will': [val['will']],
                        'vit': [val['vit']],
                        'sta': [val['sta']],
                        'srgn': [val['srgn']],
                        'aura': [val['aura']],
                        'ardx': [val['ardx']],
                        'argn': [val['argn']],
                        'form': [val['form']],
                        'def': [val['def']],
                        'atk': [val['atk']],
                        'dmg': [val['dmg']],
                        'crit': [val['crit']],
                        'cdmg': [val['cdmg']]
                    });
                    this.PassUp();
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], CharacterComponent.prototype, "char", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], CharacterComponent.prototype, "choices", void 0);
                CharacterComponent = __decorate([
                    core_1.Component({
                        selector: 'character',
                        templateUrl: 'app/character/character.html',
                        directives: [common_1.FORM_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, firebase_1.FirebaseService])
                ], CharacterComponent);
                return CharacterComponent;
            })();
            exports_1("CharacterComponent", CharacterComponent);
        }
    }
});
//# sourceMappingURL=character.component.js.map