let font;

function preload() {
  font = loadFont("Inconsolata.ttf");
}

function setup() {
  createCanvas(400, 400, WEBGL);
  textFont(font);
  fill(0);
}

function draw() {
  background(255);
  rotate(frameCount/1000);
  text("this is the truth", 0, 0)
}
