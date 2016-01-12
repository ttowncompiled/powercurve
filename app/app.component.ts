import {ChangeDetectorRef , Component} from 'angular2/core';
import {FORM_DIRECTIVES, ControlGroup, FormBuilder} from 'angular2/common';
import {CharacterComponent} from './character/character.component';
import {FirebaseService} from './lib/firebase';
import {PlotData} from './lib/plot';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  directives: [FORM_DIRECTIVES, CharacterComponent]
})
export class AppComponent {
  
  characterRows: Array<Array<any>> = [];
  isLoading: boolean = false;
  params: ControlGroup;
  choices: Array<string> = [];
  
  constructor(private ref: ChangeDetectorRef, fb: FormBuilder, fs: FirebaseService) {
    this.params = fb.group({
      'iters': [5000],
      'lvl-under': [5],
      'lvl': [6],
      'lvl-over': [5]
    });
    fs.dataRef.child('characters').on('value', (snapshot: FirebaseDataSnapshot) => {
      this.choices = Object.keys(snapshot.val());
    });
  }
  
  // returns the opponents from the listed characters
  private Opps(): Array<any> {
    var opps: Array<any> = [];
    for (var i: number = 0; i < this.characterRows.length; i++) {
      for (var j: number = 0; j < this.characterRows[i].length; j++) {
        if (this.characterRows[i][j]['team'] == 'opp') {
          opps.push(this.characterRows[i][j]);
        }
      }
    }
    return opps;
  }
  
  // returns the player from the listed characters
  private Player(): any {
    for (var i: number = 0; i < this.characterRows.length; i++) {
      for (var j: number = 0; j < this.characterRows[i].length; j++) {
        if (this.characterRows[i][j]['team'] == 'player') {
          return this.characterRows[i][j];
        }
      }
    }
    return {};
  }
  
  // adds a character panel to the page
  AddCharacter(): void {
    var length: number = this.characterRows.length;
    if (length == 0 || this.characterRows[length-1].length == 4) {
      this.characterRows.push([{}]);
      return;
    }
    this.characterRows[length-1].push({});
  }
  
  // updates the plot with new data
  UpdatePlot(): void {
    this.isLoading = true;
    var worker: any = new Worker('app/lib/simulation.js');
    worker.postMessage([this.Player(), this.Opps(), this.params.value]);
    worker.onmessage = (results: any) => {
      PlotData(results.data);
      this.isLoading = false;
      this.ref.detectChanges();
    }
  }

}