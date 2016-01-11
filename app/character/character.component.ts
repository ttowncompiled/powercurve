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
      'vit': ['10'],
      'sta': ['10'],
      'srgn': ['1'],
      'aura': ['10'],
      'ardx': ['1'],
      'argn': ['1'],
      'form': ['melee'],
      'def': ['0'],
      'atk': ['1 * d1 + 0'],
      'dmg': ['1 * d1 + 0'],
      'crit': ['0']
    });
    this.Save(this.myForm.value);
  }
  
  Save(formValue: any): void {
    for (var key in formValue) {
      this.char[key] = formValue[key];
    }
  }
  
}