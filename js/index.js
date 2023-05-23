
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var d = document.getElementById("staging");
var dtx = d.getContext("2d");

c.width = 300;
c.height = 700;
d.height = 700;
d.width = 1340;

//My mouse coordinates
var x,y;
c.addEventListener("mousedown",down);
c.addEventListener("mousemove",move);
c.addEventListener("mouseup",up);

//I'll save my boxes in this array
var myBoxes = new Array();

//This function describes what a box is.
//Each created box gets its own values
function box(x,y,w,h,rgb) {
    this.x = x,
    this.y = y;
    this.xS = x; //saving x
    this.yS = y; //saving y
    this.w = w;
    this.h = h;
    this.rgb = rgb;
    
    //to determine if the box is being draged
    this.draging = false;
}

//Let's make some boxes!!
myBoxes[0] = new box(25, 25, 100, 50,"green");
myBoxes[1] = new box(150,25,100,50,"blue");
myBoxes[2] = new box(25,150,20,70,"yellow");
myBoxes[3] = new box(150, 150, 100, 50,"purple");
myBoxes[4] = new box(25,250,100,50,"pink");



//here we draw everything
function draw() {
    ctx.clearRect(0,0,c.width,c.height);
    //Dropable area
    dtx.fillStyle = "red";
    dtx.fillRect(0,0,d.width,d.height);
    
    //Boxes!
    for (var i = 0; i<myBoxes.length; i++) {
        var b = myBoxes[i];

        //NEW CODE FOR UPDATE
        if (b.draging) { //box on the move
            //Also draw it on the original spot
            ctx.fillStyle="lightgrey"; //I chose a different color to make it appear more as a shadow of the box that's being moved.
            ctx.fillRect(b.xS,b.yS,b.w,b.h);
            ctx.strokeRect(b.xS,b.yS,b.w,b.h);
        }
        //End of new code for update

        ctx.fillStyle=b.rgb;
        ctx.fillRect(b.x,b.y,b.w,b.h);
        ctx.strokeRect(b.x,b.y,b.w,b.h);
    }
    
    //Let's keep re-drawing this
    requestAnimationFrame(draw);
}


function down(event) {
    event = event || window.event;
    x = event.pageX - c.offsetLeft,
    y = event.pageY - c.offsetTop;
    
    for (var i = 0; i<myBoxes.length; i++) {
        var b = myBoxes[i];
        if (x>b.x && x<b.x+b.w && y>b.y && y<b.y+b.h) {
            b.draging = true;
        }
    }
}

function move(event) {
    event = event || window.event;
    x = event.pageX - c.offsetLeft,
    y = event.pageY - c.offsetTop;
    
    for (var i = 0; i<myBoxes.length; i++) {
        var b = myBoxes[i];
        if (b.draging) {
            b.x = x;
            b.y = y;
        }
    }
}
function up(event) {
    event = event || window.event;
    x = event.pageX - c.offsetLeft,
    y = event.pageY - c.offsetTop;
    
    for (var i = 0; i<myBoxes.length; i++) {
        var b = myBoxes[i];
        if (b.draging) {
            //Let's see if the rectangle is inside the dropable area
            if (b.x>c.width/2) {
                //Yes is it!
                b.x = x;
                b.y = y;
                b.draging = false;
            }
            else {
                //No it's not, sending it back to its ordiginal spot   
                b.x = b.xS;
                b.y = b.yS;
                b.draging = false;                
            }

        }
    }
}

draw();