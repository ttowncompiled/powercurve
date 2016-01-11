// sets up tooltips for the plot points
function ActivateTooltip(): void {
  // creates the tooltip to display the y point
  (<any> $("<div id='tooltip'></div>")).css({
      position: "absolute",
      display: "none",
      border: "1px solid #fdd",
      padding: "2px",
      "background-color": "#fee",
      opacity: 0.80
  }).appendTo("body");

  // displays the tooltip on hover
  (<any> $("#placeholder")).bind("plothover", function (event, pos, item) {
      if (item) {
        var x = item.datapoint[0].toFixed(2),
          y = item.datapoint[1].toFixed(2);
        (<any> $("#tooltip")).html(y)
          .css({top: item.pageY+5, left: item.pageX+5})
          .fadeIn(200);
      } else {
        (<any> $("#tooltip")).hide();
      }
  });
}

// enable side nav for the legend
function ActivateSideNav(): void {
  (<any> $('.button-collapse')).sideNav();
}

// plots the data
export function PlotData(data: Array<any>): void {
  (<any> $).plot($("#placeholder"),
      data,
      {
        legend: {
          container: $("#legend")
        },
        series: {
          lines: {
            show: true
          },
          points: {
            show: true
          }
        },
        grid: {
          hoverable: true,
          clickable: true
        },
        yaxis: {
          min: 0,
          max: 1
        }
      }
  );
  ActivateTooltip();
  ActivateSideNav();
}