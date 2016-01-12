import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, Control, ControlGroup, FormBuilder} from 'angular2/common';
import {FirebaseService} from '../lib/firebase';

@Component({
  selector: 'character',
  templateUrl: 'app/character/character.html',
  directives: [FORM_DIRECTIVES]
})
export class CharacterComponent {
  
  @Input() char;
  @Input() choices;
  myForm: ControlGroup;
  choiceForm: ControlGroup;
  
  constructor(public fb: FormBuilder, public fbs: FirebaseService) {
    this.myForm = this.fb.group({
      'team': [''],
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
      'vit': ['0'],
      'sta': ['0'],
      'srgn': ['0'],
      'aura': ['0'],
      'ardx': ['0'],
      'argn': ['0'],
      'form': ['melee'],
      'def': ['0'],
      'atk': ['1'],
      'dmg': ['1'],
      'crit': ['0'],
      'cdmg': ['1']
    });
    this.choiceForm = this.fb.group({
      'choice': ['']
    });
    this.ListenForChoice();
  }
  
  ListenForChoice(): void {
    this.choiceForm.valueChanges.subscribe((value: string) => {
      if (value['choice'] != '') {
        this.fbs.dataRef.child('characters/' + value['choice']).once('value', (snapshot: FirebaseDataSnapshot) => {
          this.UpdateForm(snapshot.val());
        });
      } else {
        this.Reset();
      }
    });
  }
  
  ngOnInit(): void {
    this.PassUp();
  }
  
  PassUp(): void {
    // must perform a deep copy
    for (var key in this.myForm.value) {
      this.char[key] = this.myForm.value[key];
    }
  }
  
  Reset(): void {
    this.myForm = this.fb.group({
      'team': [''],
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
      'vit': ['0'],
      'sta': ['0'],
      'srgn': ['0'],
      'aura': ['0'],
      'ardx': ['0'],
      'argn': ['0'],
      'form': ['melee'],
      'def': ['0'],
      'atk': ['1'],
      'dmg': ['1'],
      'crit': ['0'],
      'cdmg': ['1']
    });
  }
  
  SaveForm(): void {
    this.PassUp();
    var character = this.myForm.value;
    if (this.myForm.value['name'] != '') {
      this.fbs.dataRef.child('characters/' + character['name']).update(character);
    }
  }
  
  UpdateForm(val: any): void {
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
  }
  
}