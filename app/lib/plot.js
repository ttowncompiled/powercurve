System.register([], function(exports_1) {
    // sets up tooltips for the plot points
    function ActivateTooltip() {
        // creates the tooltip to display the y point
        $("<div id='tooltip'></div>").css({
            position: "absolute",
            display: "none",
            border: "1px solid #fdd",
            padding: "2px",
            "background-color": "#fee",
            opacity: 0.80
        }).appendTo("body");
        // displays the tooltip on hover
        $("#placeholder").bind("plothover", function (event, pos, item) {
            if (item) {
                var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
                $("#tooltip").html(y)
                    .css({ top: item.pageY + 5, left: item.pageX + 5 })
                    .fadeIn(200);
            }
            else {
                $("#tooltip").hide();
            }
        });
    }
    // enable side nav for the legend
    function ActivateSideNav() {
        $('.button-collapse').sideNav();
    }
    // plots the data
    function PlotData(data) {
        $.plot($("#placeholder"), data, {
            legend: {
                container: $("#legend"),
                noColumns: 2
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
        });
        ActivateTooltip();
        ActivateSideNav();
    }
    exports_1("PlotData", PlotData);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=plot.js.map