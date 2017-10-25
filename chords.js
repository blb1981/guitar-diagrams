//define canvas
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

//set line width of diagram


let
  //change to make diagram work
  canvasWidth = 350,
  canvasHeight = 350,
  marginLeft = canvasWidth * .2,
  marginRight = canvasWidth * .9,
  marginTop = canvasHeight * .2,
  marginBottom = canvasHeight * .9,
  numberHorzontalLines = 7,
  numberVerticalLines = 7,
  lineWidth = 2,
  hasNut = 1,
  nutWidth = lineWidth * 4,
  lineCap = 'round',
  bodyBackgroundColor = 'lightgrey',
  canvasBackground = 'white',
  mode = 'draw',
  circleSizePercentage = .35,

  guitarWidth = marginRight - marginLeft,
  guitarHeight = marginBottom - marginTop,
  distanceBetweenVerticalLines = guitarWidth/(numberVerticalLines - 1),
  distanceBetweenHorizontalLines = guitarHeight/(numberHorzontalLines - 1),
  x = marginLeft, //used to return X mouse coordinates
  y = marginTop, //use to return Y mouse coordinates
  markerX = new Array(),
  markerY = new Array(),
  rect = canvas.getBoundingClientRect()
  rectangleWidth = distanceBetweenVerticalLines *.9,
  rectangleHeight = distanceBetweenHorizontalLines * .8

  ;


//Note object prototype
function Note(x, y, state) {
  this.x = x;
  this.y = y;
  this.state = "";
  this.xClickableLeft = this.x - (distanceBetweenVerticalLines * .3);
  this.xClickableRight = this.x + (distanceBetweenVerticalLines * .3);
  this.yClickableBottom = this.y - (distanceBetweenVerticalLines * .3);
  this.yClickableTop = this.y + (distanceBetweenVerticalLines * .3);
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
  x1y6.state = "";

  //x2s
  x2y1.state = "";
  x2y2.state = "";
  x2y3.state = "";
  x2y4.state = "";
  x2y5.state = "";
  x2y6.state = "";

  //x3s
  x3y1.state = "";
  x3y2.state = "";
  x3y3.state = "";
  x3y4.state = "";
  x3y5.state = "";
  x3y6.state = "";

  //x4s
  x4y1.state = "";
  x4y2.state = "";
  x4y3.state = "";
  x4y4.state = "";
  x4y5.state = "";
  x4y6.state = "";

  //x5s
  x5y1.state = "";
  x5y2.state = "";
  x5y3.state = "";
  x5y4.state = "";
  x5y5.state = "";
  x5y6.state = "";

  //x6s
  x6y1.state = "";
  x6y2.state = "";
  x6y3.state = "";
  x6y4.state = "";
  x6y5.state = "";
  x6y6.state = "";

  //x7s
  x7y1.state = "";
  x7y2.state = "";
  x7y3.state = "";
  x7y4.state = "";
  x7y5.state = "";
  x7y6.state = "";

  console.log('Canvas reset');
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
  let scrollTop = $(window).scrollTop();
  let scrollLeft = $(window).scrollLeft();
  let offsetY = $('#canvas').offset().top;
  let offsetX = $('#canvas').offset().left;
  let x = e.clientX - (offsetX - scrollLeft)
  let y = e.clientY -(offsetY - scrollTop);
  $('#scroll').html('mousemove: ' + x + ',' + y);
});

$('#canvas').click(function(e){
  let scrollTop = $(window).scrollTop();
  let scrollLeft = $(window).scrollLeft();
  let offsetY = $('#canvas').offset().top;
  let offsetX = $('#canvas').offset().left;
  let x = e.clientX - (offsetX - scrollLeft)
  let y = e.clientY -(offsetY - scrollTop);
  console.log(x + ',' + y);

  if (mode = 'draw') {
    determinePositionForPlot(x,y)
  }
});

//draw shapes
function drawShapes(x,y,state) {
  if (state === "") {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(x - (rectangleWidth/2), y -(rectangleHeight/2), rectangleWidth, rectangleHeight);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(x,y,(distanceBetweenVerticalLines * circleSizePercentage),0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    return "black";
  }
}

//determinePositionForPlot function
function determinePositionForPlot(x,y) {

  //if open string
  if (y > x1y0.yClickableBottom && y < x0y0.y) {

    if (x > x1y0.xClickableLeft && x < x1y0.xClickableRight) {
      console.log('line 1 clicked');
    }
    else if (x > x2y0.xClickableLeft && x < x2y0.xClickableRight) {
      console.log('line 2 clicked');
    }
    else if (x > x3y0.xClickableLeft && x < x3y0.xClickableRight) {
      console.log('line 3 clicked');
    }
    else if (x > x4y0.xClickableLeft && x < x4y0.xClickableRight) {
      console.log('line 4 clicked');
    }
    else if (x > x5y0.xClickableLeft && x < x5y0.xClickableRight) {
      console.log('line 5 clicked');
    }
    else if (x > x6y0.xClickableLeft && x < x6y0.xClickableRight) {
      console.log('line 6 clicked');
    }
    else if (x > x7y0.xClickableLeft && x < x7y0.xClickableRight) {
      console.log('line 7 clicked');
    }
  }

  //if 1st fret
  if (y > x1y1.yClickableBottom && y < x0y1.yClickableTop) {

    if (x > x1y1.xClickableLeft && x < x1y1.xClickableRight) {
      x1y1.state = drawShapes(x1y1.x, x1y1.y, x1y1.state);
    }
    else if (x > x2y1.xClickableLeft && x < x2y1.xClickableRight) {
      console.log('line 2 clicked');
    }
    else if (x > x3y1.xClickableLeft && x < x3y1.xClickableRight) {
      console.log('line 3 clicked');
    }
    else if (x > x4y1.xClickableLeft && x < x4y1.xClickableRight) {
      console.log('line 4 clicked');
    }
    else if (x > x5y1.xClickableLeft && x < x5y1.xClickableRight) {
      console.log('line 5 clicked');
    }
    else if (x > x6y1.xClickableLeft && x < x6y1.xClickableRight) {
      console.log('line 6 clicked');
    }
    else if (x > x7y1.xClickableLeft && x < x7y1.xClickableRight) {
      console.log('line 7 clicked');
    }
  }

  //if 2nd fret
  if (y > x1y2.yClickableBottom && y < x0y2.yClickableTop) {
    console.log('2nd fret clicked');

    if (x > x1y2.xClickableLeft && x < x1y2.xClickableRight) {
      console.log('line 1 clicked');
    }
    else if (x > x2y2.xClickableLeft && x < x2y2.xClickableRight) {
      console.log('line 2 clicked');
    }
    else if (x > x3y2.xClickableLeft && x < x3y2.xClickableRight) {
      console.log('line 3 clicked');
    }
    else if (x > x4y2.xClickableLeft && x < x4y2.xClickableRight) {
      console.log('line 4 clicked');
    }
    else if (x > x5y2.xClickableLeft && x < x5y2.xClickableRight) {
      console.log('line 5 clicked');
    }
    else if (x > x6y2.xClickableLeft && x < x6y2.xClickableRight) {
      console.log('line 6 clicked');
    }
    else if (x > x7y2.xClickableLeft && x < x7y2.xClickableRight) {
      console.log('line 7 clicked');
    }
  }

  //if 3rd fret
  if (y > x1y3.yClickableBottom && y < x0y3.yClickableTop) {
    console.log('3rd fret clicked');

    if (x > x1y3.xClickableLeft && x < x1y3.xClickableRight) {
      console.log('line 1 clicked');
    }
    else if (x > x2y3.xClickableLeft && x < x2y3.xClickableRight) {
      console.log('line 2 clicked');
    }
    else if (x > x3y3.xClickableLeft && x < x3y3.xClickableRight) {
      console.log('line 3 clicked');
    }
    else if (x > x4y3.xClickableLeft && x < x4y3.xClickableRight) {
      console.log('line 4 clicked');
    }
    else if (x > x5y3.xClickableLeft && x < x5y3.xClickableRight) {
      console.log('line 5 clicked');
    }
    else if (x > x6y3.xClickableLeft && x < x6y3.xClickableRight) {
      console.log('line 6 clicked');
    }
    else if (x > x7y3.xClickableLeft && x < x7y3.xClickableRight) {
      console.log('line 7 clicked');
    }
  }

  //if 4th fret
  if (y > x1y4.yClickableBottom && y < x0y4.yClickableTop) {
    console.log('4th fret clicked');

    if (x > x1y4.xClickableLeft && x < x1y4.xClickableRight) {
      console.log('line 1 clicked');
    }
    else if (x > x2y4.xClickableLeft && x < x2y4.xClickableRight) {
      console.log('line 2 clicked');
    }
    else if (x > x3y4.xClickableLeft && x < x3y4.xClickableRight) {
      console.log('line 3 clicked');
    }
    else if (x > x4y4.xClickableLeft && x < x4y4.xClickableRight) {
      console.log('line 4 clicked');
    }
    else if (x > x5y4.xClickableLeft && x < x5y4.xClickableRight) {
      console.log('line 5 clicked');
    }
    else if (x > x6y4.xClickableLeft && x < x6y4.xClickableRight) {
      console.log('line 6 clicked');
    }
    else if (x > x7y4.xClickableLeft && x < x7y4.xClickableRight) {
      console.log('line 7 clicked');
    }
  }

  //if 5th fret
  if (y > x1y5.yClickableBottom && y < x0y5.yClickableTop) {
    console.log('5th fret clicked');

    if (x > x1y5.xClickableLeft && x < x1y5.xClickableRight) {
      console.log('line 1 clicked');
    }
    else if (x > x2y5.xClickableLeft && x < x2y5.xClickableRight) {
      console.log('line 2 clicked');
    }
    else if (x > x3y5.xClickableLeft && x < x3y5.xClickableRight) {
      console.log('line 3 clicked');
    }
    else if (x > x4y5.xClickableLeft && x < x4y5.xClickableRight) {
      console.log('line 4 clicked');
    }
    else if (x > x5y5.xClickableLeft && x < x5y5.xClickableRight) {
      console.log('line 5 clicked');
    }
    else if (x > x6y5.xClickableLeft && x < x6y5.xClickableRight) {
      console.log('line 6 clicked');
    }
    else if (x > x7y5.xClickableLeft && x < x7y5.xClickableRight) {
      console.log('line 7 clicked');
    }
  }

  //if 6th fret
  if (y > x1y6.yClickableBottom && y < x0y6.yClickableTop) {
    console.log('6th fret clicked');

    if (x > x1y6.xClickableLeft && x < x1y6.xClickableRight) {
      console.log('line 1 clicked');
    }
    else if (x > x2y6.xClickableLeft && x < x2y6.xClickableRight) {
      console.log('line 2 clicked');
    }
    else if (x > x3y6.xClickableLeft && x < x3y6.xClickableRight) {
      console.log('line 3 clicked');
    }
    else if (x > x4y6.xClickableLeft && x < x4y6.xClickableRight) {
      console.log('line 4 clicked');
    }
    else if (x > x5y6.xClickableLeft && x < x5y6.xClickableRight) {
      console.log('line 5 clicked');
    }
    else if (x > x6y6.xClickableLeft && x < x6y6.xClickableRight) {
      console.log('line 6 clicked');
    }
    else if (x > x7y6.xClickableLeft && x < x7y6.xClickableRight) {
      console.log('line 7 clicked');
    }
  }

}
