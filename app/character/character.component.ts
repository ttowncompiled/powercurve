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
  }
  
  ngOnInit(): void {
    this.Save(this.myForm.value);
  }
  
  Save(formValue: any): void {
    for (var key in formValue) {
      this.char[key] = formValue[key];
    }
  }
  
}