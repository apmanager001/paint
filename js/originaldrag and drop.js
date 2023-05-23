// shapes
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d")

//rectangle, (horizontal, vertical, width, height)
context.fillStyle = "blue"
context.fillRect(150, 15, 100, 50)
// square
context.fillStyle = "red";
context.fillRect(10, 100, 50, 50)
//triangle with lines
context.beginPath();
context.moveTo(50, 10);
context.lineTo(10, 70);
context.lineTo(90, 70);
context.fillStyle = "purple"
context.fill()



//function for shapes from mdn
function draw() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
  
      ctx.fillRect(25, 25, 100, 100);
      ctx.clearRect(45, 45, 60, 60);
      ctx.strokeRect(50, 50, 50, 50);
    }
  }
  
//drag and drop
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }