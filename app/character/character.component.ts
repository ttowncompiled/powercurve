import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, ControlGroup, FormBuilder} from 'angular2/common';

@Component({
  selector: 'character',
  templateUrl: 'app/character/character.html',
  directives: [FORM_DIRECTIVES]
})
export class CharacterComponent {
  
  @Input() char;
  myForm: ControlGroup;
  
  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'team': [''],
      'name': [''],
      'str': ['10'],
      'dex': ['10'],
      'cont': ['10'],
      'int': ['10'],
      'wis': ['10'],
      'cha': ['10'],
      'ftd': [''],
      'rflx': [''],
      'will': [''],
      'vit': [''],
      'sta': [''],
      'srgn': [''],
      'aura': [''],
      'ardx': [''],
      'argn': [''],
      'form': [''],
      'def': [''],
      'atk': [''],
      'dmg': [''],
      'crit': ['']
    });
  }
  
  Save(formValue: any): void {
    for (var key in formValue) {
      this.char[key] = formValue[key];
    }
  }
  
}