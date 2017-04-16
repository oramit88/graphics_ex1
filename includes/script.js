var firstPoint_X = undefined;
var firstPoint_Y = undefined;
var secondPoint_X = undefined;
var secondPoint_Y = undefined;
var dx = undefined;
var dy = undefined;
var isNeedToChangeFirst = true;
var isNeedToChangeSecond = true;



var numOfPoints=0;

var firstP = document.getElementById("firstP"); //the Gui first point coordinates
var secondP = document.getElementById("secondP"); //the Gui second point coordinates

var canvasBoard = document.getElementById("workingZone");
var ctx = canvasBoard.getContext("2d");


function clearBoard(){
  console.log("clearBoard");
    ctx.clearRect(0,0,800,800);
}

function putPixel(x,y){
    numOfPoints++;
    console.log("putpx----X:"+x+"  putpx----Y:"+y);
    ctx = canvasBoard.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(x,y,2,2);
}

function deletePixel(x,y){
    console.log("delete px----X:"+x+"  putpx----Y:"+y);
    ctx = canvasBoard.getContext("2d");
    ctx.fillStyle = "yellow";
    ctx.fillRect(x,y,2,2);
}



function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

canvasBoard.addEventListener('click', function(evt) {
  console.log("Board listener: numOfPoints="+numOfPoints);
  if(numOfPoints<2){
      var mousePos = getMousePos(canvasBoard, evt);
      var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
      if (isNeedToChangeFirst == true){
          //deletePixel(firstPoint_X,firstPoint_Y);
          firstPoint_X = Math.round(mousePos.x);
          firstPoint_Y = Math.round(mousePos.y);
          firstP.innerText="First Point: ("+firstPoint_X+ "," + firstPoint_Y +")" ;
          putPixel(firstPoint_X,firstPoint_Y);
          isNeedToChangeFirst = false;
      }
      else if (isNeedToChangeSecond == true){
          //deletePixel(firstPoint_X,firstPoint_Y);
          secondPoint_X = Math.round(mousePos.x);
          secondPoint_Y = Math.round(mousePos.y);
          secondP.innerText="Second Point: ("+secondPoint_X+ "," + secondPoint_Y +")" ;
          putPixel(secondPoint_X,secondPoint_Y);
          isNeedToChangeSecond = false;
      }
  }


  // console.log(message);
}, false);

function changeFirstPoint(){
  deletePixel(firstPoint_X,firstPoint_Y);
  numOfPoints--;
  isNeedToChangeFirst = true;
}

function changeSecondPoint(){
  deletePixel(secondPoint_X,secondPoint_Y);
  numOfPoints--;
  isNeedToChangeSecond = true;
}

function MyLine(){
  if(firstPoint_X==undefined||firstPoint_Y==undefined){
    alert("first point isnt defined!");
  }
  else if(secondPoint_X==undefined||secondPoint_Y==undefined){
      alert("second point isnt defined!");
  }
  else{
      MyLine2(firstPoint_X,firstPoint_Y,secondPoint_X, secondPoint_Y);
      numOfPoints=0;
  }
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
    if(firstPoint_X==undefined||firstPoint_Y==undefined){
        alert("first point isnt defined!");
    }
    else if(secondPoint_X==undefined||secondPoint_Y==undefined){
        alert("second point isnt defined!");
    }
    else{
        radius = calcRadius();
        for (var angle=0; angle < 720; angle++){
            var x = firstPoint_X + radius * Math.sin(angle);
            var y = firstPoint_Y + radius * Math.cos(angle);
            putPixel(x,y);
        }
        numOfPoints=0;
    }
}

function MyPolygon(){
    if(firstPoint_X==undefined||firstPoint_Y==undefined){
        alert("first point isnt defined!");
    }
    else if(secondPoint_X==undefined||secondPoint_Y==undefined){
        alert("second point isnt defined!");
    }
    else{
        radius = calcRadius();
        var poly = document.getElementById("polyNum").value;
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
        numOfPoints=0;
    }

}
