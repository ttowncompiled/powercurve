import {Component} from 'angular2/core';

// declare UPDATE_PLOT to be able to use this function 
// to update the plot with new data
declare var UPDATE_PLOT;

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html'
})
export class AppComponent {
  
  // updates the plot with new data
  UpdatePlot(): void {
    UPDATE_PLOT();
  }

}