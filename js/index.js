// MODAL
const openModalBtn = document.getElementById("openModal");
const modal = document.getElementById("myModal");
const closeModalBtn = document.getElementsByClassName("close")[0];

const usernameForm = document.getElementById("usernameForm");

openModalBtn.addEventListener("click", function() {
  modal.style.display = "block";
});

closeModalBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

usernameForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  console.log("Username submitted:", username);
  modal.style.display = "none";
});
//end modal

const allShapes = document.querySelectorAll('.allShapes');
const dropZone = document.querySelectorAll('.dropZone')

// Function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Event listener for hover
for (let i = 0; i < allShapes.length; i++) {
  allShapes[i].addEventListener('mouseover', function () {
    const randomColor = getRandomColor();
    this.style.backgroundColor = randomColor;
  });
}

// Event listener for scroll
window.addEventListener('click', function () {
  const randomColor = getRandomColor();
  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].style.backgroundColor = randomColor;
  }
});

allShapes.forEach(shape => {
  shape.addEventListener('dragstart', dragStart);
});

dropZone.forEach (zones => {
  zones.addEventListener('dragover', dragOver)
  zones.addEventListener('drop', dragDrop)
})


let beingDragged

function dragStart(e){
  beingDragged = e.target
}

function dragDrop(e){
  e.preventDefault();
  const clone = beingDragged.cloneNode(true);
  const offsetX = e.clientX - e.target.getBoundingClientRect().left;
  const offsetY = e.clientY - e.target.getBoundingClientRect().top;
  clone.style.position = 'absolute';
  clone.style.left = `${offsetX}px`;
  clone.style.top = `${offsetY}px`;
  e.target.appendChild(clone);
}

function dragOver(e){
  e.preventDefault()
  
}