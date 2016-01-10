import {Component} from 'angular2/core';
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
  
  // adds a character panel to the page
  AddCharacter(): void {
    var length: number = this.characterRows.length;
    if (length == 0 || this.characterRows[length-1].length == 3) {
      this.characterRows.push([{}]);
      return;
    }
    this.characterRows[length-1].push({});
  }
  
  // updates the plot with new data
  UpdatePlot(): void {
    this.isLoading = true;
    UPDATE_PLOT();
    this.isLoading = false;
  }

}