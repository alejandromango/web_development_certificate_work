/* Students: Please use this week's project for Week 11: Assignment 9: Basic Data Visualization.
     You will need to replace the contents of this JavaScript file with your own work,
     and create any other files, if any, required for the assignment.
     When you are done, be certain to submit the assignment in both Repl.it and Canvas to be graded. */

function graphData(data){
    var h = rect.height;
    var w = rect.width;
    var xMin = Math.max(130, w/10);
    var xMax = w - w/10;
    var yMax = h/10;
    var yMin = Math.min(h-90, h - h/10);
    context.moveTo(xMin, yMax);
    context.lineTo(xMin, yMin);
    context.lineTo(xMax, yMin);
    context.stroke();

    var barSpacing = (xMax - xMin)/(data.length + 1);
    var dataX = xMin + barSpacing;
    var maxArea = 8000000
    var yHeight = (yMin-yMax)
    var yScale = yHeight/maxArea;

    var tick = yMax;
    var area = maxArea;

    context.font = "40px Open Sans";
    // //textAlign supports: start, end, left, right, center
    context.textAlign = "center";
    // //textBaseline supports: top, hanging, middle, alphabetic, ideographic bottom
    context.textBaseline = "middle";
    context.fillText("Wildfires in the United States",w/2, h/20);
    context.font = "30px Open Sans";
    context.fillText("Year",w/2, h - 20);
    context.save();
    context.rotate(-Math.PI/2);
    context.textBaseline = "hanging";
    context.fillText("Area Burned (hectares)",-h/2, 10);
    context.restore();


    for (i = 0; i<=10;i++){
        context.moveTo(xMin, tick);
        context.lineTo(xMin-10, tick);
        context.lineWidth = 3;
        context.font = "20px Open Sans";
        //textAlign supports: start, end, left, right, center
        context.textAlign = "right";
        //textBaseline supports: top, hanging, middle, alphabetic, ideographic bottom
        context.textBaseline = "middle";
        context.fillText(area,xMin-20, tick);
        area -= maxArea / 10;
        tick += yHeight / 10;
    }

    for (i=0;i<data.length;i++){
        context.fillStyle = "red";
        context.moveTo(dataX, yMin);
        context.fillRect(dataX - barSpacing/3, yMin-yScale*data[i].area,  2*barSpacing/3, yScale*data[i].area);
        context.stroke();
        context.fillStyle = "black";
        //textAlign supports: start, end, left, right, center
        context.textAlign = "center";
        //textBaseline supports: top, hanging, middle, alphabetic, ideographic bottom
        context.textBaseline = "hanging";
        context.save();
        context.translate(dataX,yMin+10);
        context.rotate(-Math.PI/4);
        context.textAlign = "right";
        context.fillText(data[i].year, 0, 0);
        context.restore();

        dataX += barSpacing;
        console.log(data[i].area);}
}

var c = document.getElementById("canvas");
var context = c.getContext('2d');

//Scaling fix copied from MDN
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
// Get the DPR and size of the canvas
const dpr = window.devicePixelRatio;
const rect = c.getBoundingClientRect();

// Set the "actual" size of the canvas
c.width = rect.width * dpr;
c.height = rect.height * dpr;

// Scale the context to ensure correct drawing operations
context.scale(dpr, dpr);

// Set the "drawn" size of the canvas
c.style.width = `${rect.width}px`;
c.style.height = `${rect.height}px`;

$.getJSON("wildfires.json", graphData);
