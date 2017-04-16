var firstPoint_X = undefined;
var firstPoint_Y = undefined;
var secondPoint_X = undefined;
var secondPoint_Y = undefined;
var dx = undefined;
var dy = undefined;


var isNeedToChangeFirst = true;
var isNeedToChangeSecond = true;

var isNeedToChangechange_1_BezierPoint=false;
var isNeedToChangechange_2_BezierPoint=false;
var isNeedToChangechange_3_BezierPoint=false;
var isNeedToChangechange_4_BezierPoint=false;

var first_BezierPoint_X;
var first_BezierPoint_Y;

var second_BezierPoint_X;
var second_BezierPoint_Y;

var third_BezierPoint_X;
var third_BezierPoint_Y;

var fourth_BezierPoint_X;
var fourth_BezierPoint_Y;



var numOfPoints=0;

var firstP = document.getElementById("firstP"); //the Gui first point coordinates
var secondP = document.getElementById("secondP"); //the Gui second point coordinates

//bazier point GUI
var p_of_1_BezierPopint=document.getElementById("1_BezierPopint");
var p_of_2_BezierPopint=document.getElementById("2_BezierPopint");
var p_of_3_BezierPopint=document.getElementById("3_BezierPopint");
var p_of_4_BezierPopint=document.getElementById("4_BezierPopint");



var canvasBoard = document.getElementById("workingZone");
var ctx = canvasBoard.getContext("2d");


function clearBoard(){
  console.log("clearBoard");
    ctx.clearRect(0,0,800,800);
}

function putPixel(x,y){
    //numOfPoints++;
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
    var mousePos = getMousePos(canvasBoard, evt);
  console.log("Board listener: numOfPoints="+numOfPoints);
  //the bazier change points
  if(isNeedToChangechange_1_BezierPoint==true||isNeedToChangechange_2_BezierPoint==true||isNeedToChangechange_3_BezierPoint==true||isNeedToChangechange_4_BezierPoint==true){
      if(isNeedToChangechange_1_BezierPoint){
        first_BezierPoint_X=Math.round(mousePos.x);
        first_BezierPoint_Y= Math.round(mousePos.y);
        p_of_1_BezierPopint.innerText="First Point:("+first_BezierPoint_X+","+first_BezierPoint_Y+")";
        putPixel(first_BezierPoint_X,first_BezierPoint_Y);
        isNeedToChangechange_1_BezierPoint=false;
      }
      if(isNeedToChangechange_2_BezierPoint){
        second_BezierPoint_X=Math.round(mousePos.x);
        second_BezierPoint_Y=Math.round(mousePos.y);
        p_of_2_BezierPopint.innerText="Second Point:("+second_BezierPoint_X+","+second_BezierPoint_Y+")";
        putPixel(second_BezierPoint_X,second_BezierPoint_Y);
        isNeedToChangechange_2_BezierPoint=false;
      }
      if(isNeedToChangechange_3_BezierPoint){
        third_BezierPoint_X=Math.round(mousePos.x);
        third_BezierPoint_Y=Math.round(mousePos.y);
        p_of_3_BezierPopint.innerText="Third Point:("+third_BezierPoint_X+","+third_BezierPoint_Y+")";
        putPixel(third_BezierPoint_X,third_BezierPoint_Y);
          isNeedToChangechange_3_BezierPoint=false;
      }
      if(isNeedToChangechange_4_BezierPoint){
        fourth_BezierPoint_X=Math.round(mousePos.x);
        fourth_BezierPoint_Y=Math.round(mousePos.y);
        p_of_4_BezierPopint.innerText="Fourth Point:("+fourth_BezierPoint_X+","+fourth_BezierPoint_Y+")";
        putPixel(fourth_BezierPoint_X,fourth_BezierPoint_Y);
        isNeedToChangechange_4_BezierPoint=false;
      }
  }
  else{ //the main two points
      if(numOfPoints<2){
          var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
          if (isNeedToChangeFirst == true){
              //deletePixel(firstPoint_X,firstPoint_Y);
              firstPoint_X = Math.round(mousePos.x);
              firstPoint_Y = Math.round(mousePos.y);
              firstP.innerText="First Point: ("+firstPoint_X+ "," + firstPoint_Y +")" ;
              putPixel(firstPoint_X,firstPoint_Y);
              numOfPoints++;
              isNeedToChangeFirst = false;
          }
          else if (isNeedToChangeSecond == true){
              //deletePixel(firstPoint_X,firstPoint_Y);
              secondPoint_X = Math.round(mousePos.x);
              secondPoint_Y = Math.round(mousePos.y);
              secondP.innerText="Second Point: ("+secondPoint_X+ "," + secondPoint_Y +")" ;
              putPixel(secondPoint_X,secondPoint_Y);
              numOfPoints++;
              isNeedToChangeSecond = false;
          }
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
      //numOfPoints=0;
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
        //numOfPoints=0;
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
       // numOfPoints=0;
    }

}

function change1_BezierPopint() {
    isNeedToChangechange_1_BezierPoint=true;
}
function change2_BezierPopint() {
    isNeedToChangechange_2_BezierPoint=true;
}
function change3_BezierPopint() {
    isNeedToChangechange_3_BezierPoint=true;
}
function change4_BezierPopint() {
    isNeedToChangechange_4_BezierPoint=true;
}
