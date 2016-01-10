import {ChangeDetectorRef , Component} from 'angular2/core';
import {CharacterComponent} from './character/character.component';

// declare UPDATE_PLOT to be able to use this function 
// to update the plot with new data
declare var UPDATE_PLOT;

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  directives: [CharacterComponent]
})
export class AppComponent {
  
  characterRows: Array<Array<any>> = [];
  isLoading: boolean = false;
  
  constructor(private ref: ChangeDetectorRef) {}
  
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
  
  // returns the simulation parameters
  private Params(): any {
    return {
      'iters': 10,
      'lvl-under': 5,
      'lvl': 6,
      'lvl-over': 5
    };
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
    worker.postMessage([this.Player(), this.Opps(), this.Params()]);
    worker.onmessage = (results: any) => {
      UPDATE_PLOT(results.data);
      this.isLoading = false;
      this.ref.detectChanges();
    }
  }

}