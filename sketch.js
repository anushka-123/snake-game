
<div>Teachable Machine Image Model - p5.js and ml5.js</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
<script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
<script type="text/javascript">
  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/51NXTo7bS/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";
<div>Teachable Machine Image Model - p5.js and ml5.js</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
<script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
<script type="text/javascript">
  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/51NXTo7bS/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";
  
// Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }


let rez = 20;
let food;
let w;
let h;

function setup() {
  createCanvas(400, 400);
  // Create the video
  video = createCapture(VIDEO);
  video.size(400, 400);
  video.hide();
  flipVideo = ml5.flipImage(video);

  classifyVideo();
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(4);
  snake = new snake();
  foodLocation();
}

function classifyVideo() {
  flipVideo = ml5.flipImage(video);
  classifier.classify(flipVideo, gotResults);
}
function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function controlSnake() {
  if (label === "left") {
    snake.setDir(-1, 0);
  } else if (label === "right") {
    snake.setDir(1, 0);
  } else if (label === "down") {
    snake.setDir(0, 1);
  } else if (label === "up") {
    snake.setDir(0, -1);
  }
}

function draw() {
  background(255);


  image(flipVideo, 0, 0);
  textSize(32);
  fill(0);
  text(label, 10, 50);

  scale(rez);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();

  if (snake.endGame()) {
    print("END GAME");
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  controlSnake();
  classifyVideo();
}