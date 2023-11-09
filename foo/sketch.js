let font;

function preload() {
  font = loadFont("Inconsolata.ttf");
}

function setup() {
  createCanvas(400, 400, WEBGL);
  textFont(font);
}

function draw() {
  background(220);
  text("this is the truth", 0, 0)
}
