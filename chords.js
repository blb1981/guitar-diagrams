//define canvas
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

//settings
let
  canvasWidth = 300,
  canvasHeight = 350,
  marginLeft = canvasWidth * .2,
  marginRight = canvasWidth * .9,
  marginTop = canvasHeight * .2,
  marginBottom = canvasHeight * .9,
  leftTextSpace = canvasWidth - marginLeft,
  topTextSpace = canvasHeight - marginTop,
  numberHorzontalLines = 5, //frets
  numberVerticalLines = 6, //strings
  lineWidth = 2,
  topNut = true,
  leftNut = false,
  nutWidth = lineWidth * 4,
  lineCap = 'round',
  nutLineCap = 'round',
  bodyBackgroundColor = '#ffffff',
  canvasBackground = 'white',
  canvasBorderColor = 'black',
  canvasBorderWidth = '2px',
  mode = 'draw',
  circleSizePercentage = .35,
  guitarWidth = marginRight - marginLeft,
  guitarHeight = marginBottom - marginTop,
  distanceBetweenVerticalLines = guitarWidth/(numberVerticalLines - 1),
  distanceBetweenHorizontalLines = guitarHeight/(numberHorzontalLines - 1),
  markerX = new Array(),
  markerY = new Array(),
  rect = canvas.getBoundingClientRect()
  whiteRectangleWidth = distanceBetweenVerticalLines *.9,
  whiteRectangleHeight = distanceBetweenHorizontalLines * .6,
  blackRectangleWidth = distanceBetweenVerticalLines *.7,
  blackRectangleHeight = distanceBetweenHorizontalLines * .6,
  scrollTop = $(window).scrollTop(),
  scrollLeft = $(window).scrollLeft(),
  offsetY = $('#canvas').offset().top,
  offsetX = $('#canvas').offset().left
  ;//end settings


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
//supports 8 strings, up to 6 frets
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

//x7s for 7 string guitar
let x7y0 = new Note(markerX[7], markerY[0], "");
let x7y1 = new Note(markerX[7], markerY[1], "");
let x7y2 = new Note(markerX[7], markerY[2], "");
let x7y3 = new Note(markerX[7], markerY[3], "");
let x7y4 = new Note(markerX[7], markerY[4], "");
let x7y5 = new Note(markerX[7], markerY[5], "");
let x7y6 = new Note(markerX[7], markerY[6], "");

//x8s for 8 string guitar
let x8y0 = new Note(markerX[8], markerY[0], "");
let x8y1 = new Note(markerX[8], markerY[1], "");
let x8y2 = new Note(markerX[8], markerY[2], "");
let x8y3 = new Note(markerX[8], markerY[3], "");
let x8y4 = new Note(markerX[8], markerY[4], "");
let x8y5 = new Note(markerX[8], markerY[5], "");
let x8y6 = new Note(markerX[8], markerY[6], "");


//set HTML body styles
$('body').css({
  'background-color': bodyBackgroundColor
});

$('#reset').click(function(){
  reset();
});

$('#drawButton').click(function(){
  $('#drawLI').toggleClass('active');
  $('#textLI').toggleClass('active');
  mode = 'draw';
});

$('#textButton').click(function(){
  $('#drawLI').toggleClass('active');
  $('#textLI').toggleClass('active');
  mode = 'text';
});



function reset() {

  //set canvas HTML attributes
  $('#canvas').attr({
    'width': canvasWidth,
    'height': canvasHeight
  });

  //set canvas styles
  $('#canvas').css({
    'background-color': canvasBackground,
    'border-color' : canvasBorderColor,
    'border-style' : 'solid',
    'border-width' : canvasBorderWidth
  });

  let x = marginLeft;
  let y = marginTop;

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
  if (topNut) {
    ctx.beginPath();
    ctx.lineCap = nutLineCap;
    ctx.lineWidth = nutWidth;
    ctx.moveTo(marginLeft, marginTop);
    ctx.lineTo(marginRight, marginTop);
    ctx.stroke();
    ctx.closePath();
  }
  //draw nut on left side (if needed)
  if (leftNut) {
    ctx.beginPath();
    ctx.lineCap = nutLineCap;
    ctx.lineWidth = nutWidth;
    ctx.moveTo(marginLeft, marginTop);
    ctx.lineTo(marginLeft, marginBottom);
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

  //x8s
  x8y1.state = "";
  x8y2.state = "";
  x8y3.state = "";
  x8y4.state = "";
  x8y5.state = "";
  x8y6.state = "";

  console.log('Canvas reset');
}

//for display purposes only
//return mouse x/y
$('#canvas').mousemove(function(e){
  let x = e.clientX - (offsetX - scrollLeft)
  let y = e.clientY -(offsetY - scrollTop);
  $('#scroll').html('mousemove: ' + x + ',' + y);
});

$('#canvas').click(function(e){
  x = e.clientX - (offsetX - scrollLeft),
  y = e.clientY -(offsetY - scrollTop)

  if (mode === 'draw') {
    determinePositionForPlot(x,y)
  }
});

//draw shapes
function drawShapes(x,y,state) {
  if (state === "") {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(x - (whiteRectangleWidth/2), y -(whiteRectangleHeight/2), whiteRectangleWidth, whiteRectangleHeight);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(x,y,(distanceBetweenVerticalLines * circleSizePercentage),0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    return "circle";
  }

  //rectangle functionality commented out intentionally
  /************************************************************/
  // if (state === "circle") {
  //   ctx.beginPath();
  //   ctx.fillStyle = "white";
  //   ctx.rect(x - (whiteRectangleWidth/2), y -(whiteRectangleHeight/2), whiteRectangleWidth, whiteRectangleHeight);
  //   ctx.fill();
  //   ctx.closePath();
  //
  //   ctx.beginPath();
  //   ctx.fillStyle = "black";
  //   ctx.rect(x - (blackRectangleWidth/2), y -(blackRectangleHeight/2), blackRectangleWidth, blackRectangleHeight);
  //   // ctx.arc(x,y,(distanceBetweenVerticalLines * circleSizePercentage),0,2*Math.PI);
  //   ctx.fill();
  //   ctx.closePath();
  //   return "square";
  // }
/************************************************************/

  if (state === "circle") {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(x - (whiteRectangleWidth/2), y -(whiteRectangleHeight/2), whiteRectangleWidth, whiteRectangleHeight);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.lineCap = lineCap;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x, (y + (distanceBetweenHorizontalLines/2)));
    ctx.lineTo(x, (y - (distanceBetweenHorizontalLines/2)));
    ctx.stroke();
    ctx.closePath();
    return "";
  }
}

function drawOpenShapes(x,y,state) {

  if (state === ""){
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(x - 9, y - 3, 18,18);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(x,y + 6,7,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    return "circle";
  }

  else if (state === "circle"){
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(x - 9, y - 3, 18,18);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("X",x,y + 12);
    ctx.closePath();
    return "x";
  }

  else if (state === "x"){
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(x - 9, y - 3, 18,18);
    ctx.fill();
    ctx.closePath();

    return "";
  }
}


//determinePositionForPlot function
function determinePositionForPlot(x,y) {

  //if open string
  if (y > x1y0.yClickableBottom && y < x1y0.y) {

    if (x > x1y0.xClickableLeft && x < x1y0.xClickableRight) {
      x1y0.state = drawOpenShapes(x1y0.x, x1y0.y, x1y0.state)
    }
    else if (x > x2y0.xClickableLeft && x < x2y0.xClickableRight) {
      x2y0.state = drawOpenShapes(x2y0.x, x2y0.y, x2y0.state)
    }
    else if (x > x3y0.xClickableLeft && x < x3y0.xClickableRight) {
      x3y0.state = drawOpenShapes(x3y0.x, x3y0.y, x3y0.state)
    }
    else if (x > x4y0.xClickableLeft && x < x4y0.xClickableRight) {
      x4y0.state = drawOpenShapes(x4y0.x, x4y0.y, x4y0.state)
    }
    else if (x > x5y0.xClickableLeft && x < x5y0.xClickableRight) {
      x5y0.state = drawOpenShapes(x5y0.x, x5y0.y, x5y0.state)
    }
    else if (x > x6y0.xClickableLeft && x < x6y0.xClickableRight) {
      x6y0.state = drawOpenShapes(x6y0.x, x6y0.y, x6y0.state)
    }
    else if (x > x7y0.xClickableLeft && x < x7y0.xClickableRight) {
      x7y0.state = drawOpenShapes(x7y0.x, x7y0.y, x7y0.state)
    }
    else if (x > x8y0.xClickableLeft && x < x8y0.xClickableRight) {
      x8y0.state = drawOpenShapes(x8y0.x, x8y0.y, x8y0.state)
    }
  }

  //if 1st fret
  if (y > x1y1.yClickableBottom && y < x0y1.yClickableTop) {

    if (x > x1y1.xClickableLeft && x < x1y1.xClickableRight) {
      x1y1.state = drawShapes(x1y1.x, x1y1.y, x1y1.state);
    }
    else if (x > x2y1.xClickableLeft && x < x2y1.xClickableRight) {
      x2y1.state = drawShapes(x2y1.x, x2y1.y, x2y1.state);
    }
    else if (x > x3y1.xClickableLeft && x < x3y1.xClickableRight) {
      x3y1.state = drawShapes(x3y1.x, x3y1.y, x3y1.state);
    }
    else if (x > x4y1.xClickableLeft && x < x4y1.xClickableRight) {
      x4y1.state = drawShapes(x4y1.x, x4y1.y, x4y1.state);
    }
    else if (x > x5y1.xClickableLeft && x < x5y1.xClickableRight) {
      x5y1.state = drawShapes(x5y1.x, x5y1.y, x5y1.state);
    }
    else if (x > x6y1.xClickableLeft && x < x6y1.xClickableRight) {
      x6y1.state = drawShapes(x6y1.x, x6y1.y, x6y1.state);
    }
    else if (x > x7y1.xClickableLeft && x < x7y1.xClickableRight) {
      x7y1.state = drawShapes(x7y1.x, x7y1.y, x7y1.state);
    }
    else if (x > x8y1.xClickableLeft && x < x8y1.xClickableRight) {
      x8y1.state = drawShapes(x8y1.x, x8y1.y, x8y1.state);
    }
  }

  //if 2nd fret
  if (y > x1y2.yClickableBottom && y < x0y2.yClickableTop) {

    if (x > x1y2.xClickableLeft && x < x1y2.xClickableRight) {
      x1y2.state = drawShapes(x1y2.x, x1y2.y, x1y2.state);
    }
    else if (x > x2y2.xClickableLeft && x < x2y2.xClickableRight) {
      x2y2.state = drawShapes(x2y2.x, x2y2.y, x2y2.state);
    }
    else if (x > x3y2.xClickableLeft && x < x3y2.xClickableRight) {
      x3y2.state = drawShapes(x3y2.x, x3y2.y, x3y2.state);
    }
    else if (x > x4y2.xClickableLeft && x < x4y2.xClickableRight) {
      x4y2.state = drawShapes(x4y2.x, x4y2.y, x4y2.state);
    }
    else if (x > x5y2.xClickableLeft && x < x5y2.xClickableRight) {
      x5y2.state = drawShapes(x5y2.x, x5y2.y, x5y2.state);
    }
    else if (x > x6y2.xClickableLeft && x < x6y2.xClickableRight) {
      x6y2.state = drawShapes(x6y2.x, x6y2.y, x6y2.state);
    }
    else if (x > x7y2.xClickableLeft && x < x7y2.xClickableRight) {
      x7y2.state = drawShapes(x7y2.x, x7y2.y, x7y2.state);
    }
    else if (x > x8y2.xClickableLeft && x < x8y2.xClickableRight) {
      x8y2.state = drawShapes(x8y2.x, x8y2.y, x8y2.state);
    }
  }

  //if 3rd fret
  if (y > x1y3.yClickableBottom && y < x0y3.yClickableTop) {

    if (x > x1y3.xClickableLeft && x < x1y3.xClickableRight) {
      x1y3.state = drawShapes(x1y3.x, x1y3.y, x1y3.state);
    }
    else if (x > x2y3.xClickableLeft && x < x2y3.xClickableRight) {
      x2y3.state = drawShapes(x2y3.x, x2y3.y, x2y3.state);
    }
    else if (x > x3y3.xClickableLeft && x < x3y3.xClickableRight) {
      x3y3.state = drawShapes(x3y3.x, x3y3.y, x3y3.state);
    }
    else if (x > x4y3.xClickableLeft && x < x4y3.xClickableRight) {
      x4y3.state = drawShapes(x4y3.x, x4y3.y, x4y3.state);
    }
    else if (x > x5y3.xClickableLeft && x < x5y3.xClickableRight) {
      x5y3.state = drawShapes(x5y3.x, x5y3.y, x5y3.state);
    }
    else if (x > x6y3.xClickableLeft && x < x6y3.xClickableRight) {
      x6y3.state = drawShapes(x6y3.x, x6y3.y, x6y3.state);
    }
    else if (x > x7y3.xClickableLeft && x < x7y3.xClickableRight) {
      x7y3.state = drawShapes(x7y3.x, x7y3.y, x7y3.state);
    }
    else if (x > x8y3.xClickableLeft && x < x8y3.xClickableRight) {
      x8y3.state = drawShapes(x8y3.x, x8y3.y, x8y3.state);
    }
  }

  //if 4th fret
  if (y > x1y4.yClickableBottom && y < x0y4.yClickableTop) {

    if (x > x1y4.xClickableLeft && x < x1y4.xClickableRight) {
      x1y4.state = drawShapes(x1y4.x, x1y4.y, x1y4.state);
    }
    else if (x > x2y4.xClickableLeft && x < x2y4.xClickableRight) {
      x2y4.state = drawShapes(x2y4.x, x2y4.y, x2y4.state);
    }
    else if (x > x3y4.xClickableLeft && x < x3y4.xClickableRight) {
      x3y4.state = drawShapes(x3y4.x, x3y4.y, x3y4.state);
    }
    else if (x > x4y4.xClickableLeft && x < x4y4.xClickableRight) {
      x4y4.state = drawShapes(x4y4.x, x4y4.y, x4y4.state);
    }
    else if (x > x5y4.xClickableLeft && x < x5y4.xClickableRight) {
      x5y4.state = drawShapes(x5y4.x, x5y4.y, x5y4.state);
    }
    else if (x > x6y4.xClickableLeft && x < x6y4.xClickableRight) {
      x6y4.state = drawShapes(x6y4.x, x6y4.y, x6y4.state);
    }
    else if (x > x7y4.xClickableLeft && x < x7y4.xClickableRight) {
      x7y4.state = drawShapes(x7y4.x, x7y4.y, x7y4.state);
    }
    else if (x > x8y4.xClickableLeft && x < x8y4.xClickableRight) {
      x8y4.state = drawShapes(x8y4.x, x8y4.y, x8y4.state);
    }
  }

  //if 5th fret
  if (y > x1y5.yClickableBottom && y < x0y5.yClickableTop) {

    if (x > x1y5.xClickableLeft && x < x1y5.xClickableRight) {
      x1y5.state = drawShapes(x1y5.x, x1y5.y, x1y5.state);
    }
    else if (x > x2y5.xClickableLeft && x < x2y5.xClickableRight) {
      x2y5.state = drawShapes(x2y5.x, x2y5.y, x2y5.state);
    }
    else if (x > x3y5.xClickableLeft && x < x3y5.xClickableRight) {
      x3y5.state = drawShapes(x3y5.x, x3y5.y, x3y5.state);
    }
    else if (x > x4y5.xClickableLeft && x < x4y5.xClickableRight) {
      x4y5.state = drawShapes(x4y5.x, x4y5.y, x4y5.state);
    }
    else if (x > x5y5.xClickableLeft && x < x5y5.xClickableRight) {
      x5y5.state = drawShapes(x5y5.x, x5y5.y, x5y5.state);
    }
    else if (x > x6y5.xClickableLeft && x < x6y5.xClickableRight) {
      x6y5.state = drawShapes(x6y5.x, x6y5.y, x6y5.state);
    }
    else if (x > x7y5.xClickableLeft && x < x7y5.xClickableRight) {
      x7y5.state = drawShapes(x7y5.x, x7y5.y, x7y5.state);
    }
    else if (x > x8y5.xClickableLeft && x < x8y5.xClickableRight) {
      x8y5.state = drawShapes(x8y5.x, x8y5.y, x8y5.state);
    }
  }

  //if 6th fret
  if (y > x1y6.yClickableBottom && y < x0y6.yClickableTop) {

    if (x > x1y6.xClickableLeft && x < x1y6.xClickableRight) {
      x1y6.state = drawShapes(x1y6.x, x1y6.y, x1y6.state);
    }
    else if (x > x2y6.xClickableLeft && x < x2y6.xClickableRight) {
      x2y6.state = drawShapes(x2y6.x, x2y6.y, x2y6.state);
    }
    else if (x > x3y6.xClickableLeft && x < x3y6.xClickableRight) {
      x3y6.state = drawShapes(x3y6.x, x3y6.y, x3y6.state);
    }
    else if (x > x4y6.xClickableLeft && x < x4y6.xClickableRight) {
      x4y6.state = drawShapes(x4y6.x, x4y6.y, x4y6.state);
    }
    else if (x > x5y6.xClickableLeft && x < x5y6.xClickableRight) {
      x5y6.state = drawShapes(x5y6.x, x5y6.y, x5y6.state);
    }
    else if (x > x6y6.xClickableLeft && x < x6y6.xClickableRight) {
      x6y6.state = drawShapes(x6y6.x, x6y6.y, x6y6.state);
    }
    else if (x > x7y6.xClickableLeft && x < x7y6.xClickableRight) {
      x7y6.state = drawShapes(x7y6.x, x7y6.y, x7y6.state);
    }
    else if (x > x8y6.xClickableLeft && x < x8y6.xClickableRight) {
      x8y6.state = drawShapes(x8y6.x, x8y6.y, x8y6.state);
    }
  }

}

reset();
