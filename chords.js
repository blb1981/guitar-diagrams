//define canvas
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

//set line width of diagram


let
  //change to make diagram work
  canvasTop = 50,
  canvasLeft = 50,
  canvasWidth = 350,
  canvasHeight = 350,
  marginLeft = canvasWidth * .2,
  marginRight = canvasWidth * .9,
  marginTop = canvasHeight * .2,
  marginBottom = canvasHeight * .9,
  numberHorzontalLines = 5,
  numberVerticalLines = 6,
  lineWidth = 2,
  hasNut = 1,
  nutWidth = lineWidth * 4,
  lineCap = 'round',
  bodyBackgroundColor = 'lightgrey',
  canvasBackground = 'white',
  mode = 'plot',

  guitarWidth = marginRight - marginLeft,
  guitarHeight = marginBottom - marginTop,
  distanceBetweenVerticalLines = guitarWidth/(numberVerticalLines - 1),
  distanceBetweenHorizontalLines = guitarHeight/(numberHorzontalLines - 1),
  x = marginLeft, //used to return X mouse coordinates
  y = marginTop, //use to return Y mouse coordinates
  markerX = new Array(),
  markerY = new Array(),
  rect = canvas.getBoundingClientRect();
  ;


//Note object prototype
function Note(x, y, state) {
  this.x = x;
  this.y = y;
  this.state = "";
}

//set markerX array positions
//first vertical line is iteration 1 and increases to the right
//left most vertical line is markerX[1], 2nd line is markerX[2], etc
//markerX[0] will be used for left side text
for (i = 0; i <= numberVerticalLines; i++) {
  if (i === 0) {
    markerX[i] = marginLeft; //needs adjusted for text
  }
  else if (i === 1) {
    markerX[i] = marginLeft;
  }
  else {
    markerX[i] = marginLeft + distanceBetweenVerticalLines * (i-1);
  }
}

//setMarkerY array positions
//open string position is markerY[0]
//first markerY[1] is halfway between horizontal line 1 and 2
for (i = 0; i <= numberHorzontalLines -1; i++) {
  if (i === 0) {
    markerY[i] = marginTop; //needs adjusted for text
  }
  else if (i === 1) {
    markerY[i] = marginTop + (distanceBetweenHorizontalLines/2);
  }
  else {
    markerY[i] = marginTop + (distanceBetweenHorizontalLines/2) + (distanceBetweenHorizontalLines * (i-1));
  }
}

//create objects for notes
//supports 7 strings, up to 6 frets

//x0s
let x0y0 = new Note(markerX[0], markerY[0], "");
let x0y1 = new Note(markerX[0], markerY[1], "");
let x0y2 = new Note(markerX[0], markerY[2], "");
let x0y3 = new Note(markerX[0], markerY[3], "");
let x0y4 = new Note(markerX[0], markerY[4], "");
let x0y5 = new Note(markerX[0], markerY[5], "");
let x0y6 = new Note(markerX[0], markerY[6], "");

//x1s
let x1y0 = new Note(markerX[1], markerY[0], "");
let x1y1 = new Note(markerX[1], markerY[1], "");
let x1y2 = new Note(markerX[1], markerY[2], "");
let x1y3 = new Note(markerX[1], markerY[3], "");
let x1y4 = new Note(markerX[1], markerY[4], "");
let x1y5 = new Note(markerX[1], markerY[5], "");
let x1y6 = new Note(markerX[1], markerY[6], "");

//x2s
let x2y0 = new Note(markerX[2], markerY[0], "");
let x2y1 = new Note(markerX[2], markerY[1], "");
let x2y2 = new Note(markerX[2], markerY[2], "");
let x2y3 = new Note(markerX[2], markerY[3], "");
let x2y4 = new Note(markerX[2], markerY[4], "");
let x2y5 = new Note(markerX[2], markerY[5], "");
let x2y6 = new Note(markerX[2], markerY[6], "");

//x3s
let x3y0 = new Note(markerX[3], markerY[0], "");
let x3y1 = new Note(markerX[3], markerY[1], "");
let x3y2 = new Note(markerX[3], markerY[2], "");
let x3y3 = new Note(markerX[3], markerY[3], "");
let x3y4 = new Note(markerX[3], markerY[4], "");
let x3y5 = new Note(markerX[3], markerY[5], "");
let x3y6 = new Note(markerX[3], markerY[6], "");

//x4s
let x4y0 = new Note(markerX[4], markerY[0], "");
let x4y1 = new Note(markerX[4], markerY[1], "");
let x4y2 = new Note(markerX[4], markerY[2], "");
let x4y3 = new Note(markerX[4], markerY[3], "");
let x4y4 = new Note(markerX[4], markerY[4], "");
let x4y5 = new Note(markerX[4], markerY[5], "");
let x4y6 = new Note(markerX[4], markerY[6], "");

//x5s
let x5y0 = new Note(markerX[5], markerY[0], "");
let x5y1 = new Note(markerX[5], markerY[1], "");
let x5y2 = new Note(markerX[5], markerY[2], "");
let x5y3 = new Note(markerX[5], markerY[3], "");
let x5y4 = new Note(markerX[5], markerY[4], "");
let x5y5 = new Note(markerX[5], markerY[5], "");
let x5y6 = new Note(markerX[5], markerY[6], "");

//x6s
let x6y0 = new Note(markerX[6], markerY[0], "");
let x6y1 = new Note(markerX[6], markerY[1], "");
let x6y2 = new Note(markerX[6], markerY[2], "");
let x6y3 = new Note(markerX[6], markerY[3], "");
let x6y4 = new Note(markerX[6], markerY[4], "");
let x6y5 = new Note(markerX[6], markerY[5], "");
let x6y6 = new Note(markerX[6], markerY[6], "");

//x7s for 7 string guitarWidth
let x7y0 = new Note(markerX[7], markerY[0], "");
let x7y1 = new Note(markerX[7], markerY[1], "");
let x7y2 = new Note(markerX[7], markerY[2], "");
let x7y3 = new Note(markerX[7], markerY[3], "");
let x7y4 = new Note(markerX[7], markerY[4], "");
let x7y5 = new Note(markerX[7], markerY[5], "");
let x7y6 = new Note(markerX[7], markerY[6], "");


//set HTML body styles
$('body').css({
  'margin-top': canvasTop + 'px',
  'margin-left': canvasLeft + 'px',
  'background-color': bodyBackgroundColor
});

//set canvas HTML attributes
$('#canvas').attr({
  'width': canvasWidth,
  'height': canvasHeight
});

//set canvas styles
$('#canvas').css({
  'background-color': canvasBackground,
});

reset();

function reset() {
  //draw vertical lines
  for (i = 1; i <= numberVerticalLines; i++) {
    ctx.beginPath();
    ctx.lineCap = lineCap;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x, marginTop);
    ctx.lineTo(x, marginBottom);
    ctx.stroke();
    ctx.closePath();
    x += distanceBetweenVerticalLines;
  }

  //draw horizontal lines
  for (i = 1; i <= numberHorzontalLines; i++) {
    ctx.beginPath();
    ctx.lineCap = lineCap;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(marginLeft, y);
    ctx.lineTo(marginRight, y);
    ctx.stroke();
    ctx.closePath();
    y += distanceBetweenHorizontalLines
  }

  //draw nut (if needed)
  if (hasNut) {
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineWidth = nutWidth;
    ctx.moveTo(marginLeft, marginTop);
    ctx.lineTo(marginRight, marginTop);
    ctx.stroke();
    ctx.closePath();
  }

  //set all states to blank for reset function
  x1y1.state = "";
  x1y2.state = "";
  x1y3.state = "";
  x1y4.state = "";
  x1y5.state = "";

  //x2s
  x2y1.state = "";
  x2y2.state = "";
  x2y3.state = "";
  x2y4.state = "";
  x2y5.state = "";

  //x3s
  x3y1.state = "";
  x3y2.state = "";
  x3y3.state = "";
  x3y4.state = "";
  x3y5.state = "";

  //x4s
  x4y1.state = "";
  x4y2.state = "";
  x4y3.state = "";
  x4y4.state = "";
  x4y5.state = "";

  //x5s
  x5y1.state = "";
  x5y2.state = "";
  x5y3.state = "";
  x5y4.state = "";
  x5y5.state = "";

  //x6s
  x6y1.state = "";
  x6y2.state = "";
  x6y3.state = "";
  x6y4.state = "";
  x6y5.state = "";

}


// //Switch Modes
// function switchMode() {
//
//   var mode = document.getElementById("mode").innerHTML;
//
//   if (mode === "Plot") {
//     mode = "Text"
//     document.getElementById("mode").innerHTML = mode;
//   }
//   else if (mode === "Text") {
//     mode = "Plot"
//     document.getElementById("mode").innerHTML = mode;
//   }
// }


//for display purposes only
//return mouse x/y
$('#canvas').mousemove(function(e){
  let t = $(window).scrollTop();
  let l = $(window).scrollLeft();
  let x = e.clientX - canvasLeft + l -rect.left;
  let y = e.clientY - canvasTop + t -rect.top;
  $('#scroll').html('mousemove: ' + x + ',' + y);
});

$('#canvas').click(function(e){
  let t = $(window).scrollTop();
  let l = $(window).scrollLeft();
  let x = e.clientX - canvasLeft + l;
  let y = e.clientY - canvasTop + t;
  console.log(x + ',' + y);

  // if (mode = 'plot') {
  //   makeCircle(x,y)
  // }
});
