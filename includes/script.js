var firstPoint_X = undefined;
var firstPoint_Y = undefined;
var secondPoint_X = undefined;
var secondPoint_Y = undefined;
var dx = undefined;
var dy = undefined;
var isNeedToChangeFirst = true;
var isNeedToChangeSecond = true;

var firstP = document.getElementById("firstP");
var secondP = document.getElementById("secondP");
var c = document.getElementById("workingZone");
function putPixel(x,y){
  var c1 = document.getElementById("workingZone");
  console.log("putpx----X:"+x);
  console.log("putpx----Y:"+y);
  // var canvas = document.getElementById("workingZone");
  var ctx = c1.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(x,y,3,3);
}


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

c.addEventListener('click', function(evt) {
  var mousePos = getMousePos(c, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
  if (isNeedToChangeFirst == true){
    firstPoint_X = mousePos.x;
    firstPoint_Y = mousePos.y;
    firstP.innerText="First Point: ("+firstPoint_X+ "," + firstPoint_Y +")" ;
    putPixel(firstPoint_X,firstPoint_Y);
    isNeedToChangeFirst = false;
  }
  else if (isNeedToChangeSecond == true){
    secondPoint_X = mousePos.x;
    secondPoint_Y = mousePos.y;
    secondP.innerText="Second Point: ("+secondPoint_X+ "," + secondPoint_Y +")" ;
    putPixel(secondPoint_X,secondPoint_Y);
    isNeedToChangeSecond = false;
  }

  // console.log(message);
  }, false);

function changeFirstPoint(){
  isNeedToChangeFirst = true;
}

function changeSecondPoint(){
  isNeedToChangeSecond = true;
}

function MyLine(){
  MyLine2(firstPoint_X,firstPoint_Y,secondPoint_X, secondPoint_Y);
}
function MyLine2(firstPoint_X,firstPoint_Y,secondPoint_X, secondPoint_Y){
  var dx;
  var dy;

  if (firstPoint_X != undefined && secondPoint_X != undefined){
      dx = firstPoint_X - secondPoint_X;
      dy = firstPoint_Y - secondPoint_Y;
  }

  var range = Math.max(Math.abs(dx), Math.abs(dy));
  console.log("Range:" + range);

  dxx = dx/range;
  var test = Math.abs(dxx);
  dyy = dy/range;

  console.log("dxx: " + test + "dyy:  " + dyy);

  var Steps;
  var x;
  var y;
  var m = dy/dx;
  console.log("m"+ m);
  var min = Math.min(firstPoint_X, secondPoint_X);

  x = firstPoint_X;
  y = firstPoint_Y;
  dxx = dxx *(-1);
  dyy = dyy *(-1);
 
  for(var v=0; v < range; v++){
   x = x + dxx;
   y = y + dyy;
   putPixel(Math.round(x), Math.round(y));
}
}

var radius;

function calcRadius(){
  var xr = firstPoint_X - secondPoint_X;
  var yr = firstPoint_Y - secondPoint_Y;
  var powRadius = Math.pow(xr, 2) + Math.pow(yr, 2);
  return Math.sqrt(powRadius);

}

function MyCircle(){
  radius = calcRadius();
  for (var angle=0; angle < 720; angle++){
    var x = firstPoint_X + radius * Math.sin(angle);
    var y = firstPoint_Y + radius * Math.cos(angle);
    putPixel(x,y);
  }
}

function MyPolygon(){
  radius = calcRadius();
  var poly = document.getElementById("polyNum").value;
  var angle = 360/poly;
  var lastPx = firstPoint_X + radius * Math.cos(0 * 2 * Math.PI / poly);
  var lastPy = firstPoint_Y + radius * Math.sin(0 * 2 * Math.PI / poly);
  for (var i=1; i<=poly; i++){
    console.log(i);
    var x = firstPoint_X + radius * Math.cos(i * 2 * Math.PI / poly);
    var y = firstPoint_Y + radius * Math.sin(i * 2 * Math.PI / poly);
    putPixel(x,y);
    MyLine2(lastPx,lastPy,x,y);
    lastPx = x;
    lastPy = y;
  }
}
