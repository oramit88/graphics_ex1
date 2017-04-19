// Computer Graphics (3504837)- Exercise 1
// Date: 19.4.2017
// students name: daria dadov (ID:319575676), or amit (ID:301427647)



// points variables for line,circle,polygon
var firstPoint_X = undefined;
var firstPoint_Y = undefined;
var secondPoint_X = undefined;
var secondPoint_Y = undefined;


//boolean variables for changing the points when pressing "change" button
var isNeedToChangeFirst = true;
var isNeedToChangeSecond = true;
var isNeedToChangechange_1_BezierPoint=false;
var isNeedToChangechange_2_BezierPoint=false;
var isNeedToChangechange_3_BezierPoint=false;
var isNeedToChangechange_4_BezierPoint=false;

// points variables for Bezier curve
var first_BezierPoint_X;
var first_BezierPoint_Y;

var second_BezierPoint_X;
var second_BezierPoint_Y;

var third_BezierPoint_X;
var third_BezierPoint_Y;

var fourth_BezierPoint_X;
var fourth_BezierPoint_Y;


//counter for limiting the number of drawing on the board
var numOfPoints=0;

var firstP = document.getElementById("firstP"); //the Gui first point coordinates
var secondP = document.getElementById("secondP"); //the Gui second point coordinates

//bazier point GUI
var p_of_1_BezierPopint=document.getElementById("1_BezierPopint");
var p_of_2_BezierPopint=document.getElementById("2_BezierPopint");
var p_of_3_BezierPopint=document.getElementById("3_BezierPopint");
var p_of_4_BezierPopint=document.getElementById("4_BezierPopint");

//the board
var canvasBoard = document.getElementById("workingZone");
var ctx = canvasBoard.getContext("2d");


function clearBoard(){
    console.log("clearBoard");
    ctx.clearRect(0,0,800,800);
}

//draws a pixel on the board in (x,y) point
function putPixel(x,y){
    //numOfPoints++;
    console.log("putpx----X:"+x+"  putpx----Y:"+y);
    ctx = canvasBoard.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(x,y,1,1);
}

function deletePixel(x,y){
    console.log("delete px----X:"+x+"  putpx----Y:"+y);
    ctx = canvasBoard.getContext("2d");
    ctx.fillStyle = "yellow";
    ctx.fillRect(x,y,1,1);
}

//returns the mouse position when user click's on the board
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

//add an event listener to mouse pressing
canvasBoard.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvasBoard, evt);
  console.log("Board listener: numOfPoints="+numOfPoints);
  //the bazier change points
  if(isNeedToChangechange_1_BezierPoint==true||isNeedToChangechange_2_BezierPoint==true||isNeedToChangechange_3_BezierPoint==true||isNeedToChangechange_4_BezierPoint==true){
      if(isNeedToChangechange_1_BezierPoint){ //id user wants to change the first bazier point
        first_BezierPoint_X=Math.round(mousePos.x);
        first_BezierPoint_Y= Math.round(mousePos.y);
        //update the GUI with the  point
        p_of_1_BezierPopint.innerText="First Point:("+first_BezierPoint_X+","+first_BezierPoint_Y+")";
        //draw the point on the bord
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
      if(numOfPoints<2){ //allow maximum 2 points drawing on the board at the same time
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
  else{ //the two points defined by the user and now we can draw the line.
      MyLine2(firstPoint_X,firstPoint_Y,secondPoint_X, secondPoint_Y);
  }
}

//drawing the line between first point to second point
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

//drawing the circle on the board
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
    }
}

//drawing the polygon on the board
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

function drawBezierCurvest(){
    var buzierMatrix=math.matrix([[ -1, 3, -3 , 1 ],[ 3, -6, 3, 0 ],[ -3, 3, 0, 0 ],[ 1, 0, 0, 0 ]]);
    var xPointsMatrix=math.matrix([[first_BezierPoint_X],[second_BezierPoint_X],[third_BezierPoint_X],[fourth_BezierPoint_X]]);
    var yPointsMatrix=math.matrix([[first_BezierPoint_Y],[second_BezierPoint_Y],[third_BezierPoint_Y],[fourth_BezierPoint_Y]]);

    if(first_BezierPoint_X==undefined||second_BezierPoint_X==undefined||third_BezierPoint_X==undefined||fourth_BezierPoint_Y==undefined){
        alert("not all points defined");
    }
    else{ //we have 4 points for bezier algorithm

        //drawing tangent
        //MyLine2(first_BezierPoint_X,first_BezierPoint_Y,second_BezierPoint_X,second_BezierPoint_Y);
        //MyLine2(third_BezierPoint_X,third_BezierPoint_Y,fourth_BezierPoint_X,fourth_BezierPoint_Y);


        //drawing the curve
        var userNumber=document.getElementById("bazSecNum").value;
        var slot=1/userNumber;
        var lastPointX=first_BezierPoint_X;
        var lastPointY=first_BezierPoint_Y;

        for(var t=0;t<=1;t=t+slot){
            var t_in_3=Math.pow(t, 3);
            var t_in_2=Math.pow(t, 2);

            var tMatrix=math.matrix([[t_in_3, t_in_2, t , 1 ]]);
            var tMatrix_mult_bazier=math.multiply(tMatrix,buzierMatrix);

            var final_X=math.multiply(tMatrix_mult_bazier,xPointsMatrix);
            var final_y=math.multiply(tMatrix_mult_bazier,yPointsMatrix);
            console.log("*****************");
            console.log(final_X._data[0][0]);
            console.log(final_y._data[0][0]);
            console.log("*****************");
            putPixel(final_X._data[0][0],final_y._data[0][0]);
            MyLine2(lastPointX,lastPointY,final_X._data[0][0],final_y._data[0][0]);
            lastPointX=final_X._data[0][0];
            lastPointY=final_y._data[0][0];
        }
   }
}
