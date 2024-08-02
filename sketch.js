// Karl Yerkes
// 2021-12-16
//
// How do we see a cat?
//
// Cats are made of triangles. The triangles come at us
// through space and hit our eyes. The triangles change us.
// We become the cat a little bit because of its triangles.
// And, that is how we see a cat.
//
// Use this? https://github.com/spite/ccapture.js/
//

class TriangleSystem {
  constructor() {
    this.list = [];
    for (let i = 0; i < 20; i++) {
      this.list.push({
        x: 0,
        y: 0,
        a: 0,
        dx: 0,
        dy: 0,
        da: 0,
        size: 0,
        color: 0,
        visible: false,
      });
    }
  }
  draw() {
    if (random() > 0.981) {
      for (let t of this.list) {
        if (t.visible) {
          continue; // find first invisible triangle
        }
        cat = color(random(255), random(255), random(255));
        t.x = width - 60;
        t.dx = random(1, 5);
        t.y = 26;
        t.dy = 0;
        t.a = random(2 * PI);
        t.da = random(0.05, 0.2) * (random() > 0.5 ? -1 : 1);
        t.size = random(2, 11);
        t.color = cat;
        t.visible = true;
        break;
      }
    }

    for (let t of this.list) {
      if (t.visible) {
        const x = mouseX - t.x;
        const y = mouseY - t.y;
        if (sqrt(x * x + y * y) < 20) {
          // tend to pass greens
          t.dy += ((hue(t.color) - 120) / 120) * 0.1;
        }
      }
    }

    for (let t of this.list) {
      if (t.visible) {
        t.x -= t.dx;
        t.y += t.dy;
        t.a += t.da;
      }
    }

    for (let t of this.list) {
      if (t.visible) {
        if (t.y < 0 || t.y > height) {
          t.visible = false;
        }
      }
    }

    for (let t of this.list) {
      if (t.visible) {
        if (t.x < 60) {
          t.visible = false;
          if (t.y < 55) {
            if (t.y > 12) {
              observer = t.color;
            }
          }
        }
      }
    }

    beginShape(TRIANGLES);
    noStroke();
    const A = 0;
    const B = (2 * PI) / 3;
    const C = (4 * PI) / 3;
    for (let t of this.list) {
      if (t.visible) {
        fill(t.color);
        vertex(t.x + t.size * sin(t.a + A), t.y + t.size * cos(t.a + A));
        vertex(t.x + t.size * sin(t.a + B), t.y + t.size * cos(t.a + B));
        vertex(t.x + t.size * sin(t.a + C), t.y + t.size * cos(t.a + C));
      }
    }
    endShape();
  }
}

let symbola;

function preload() {
  fontRegular = loadFont("Symbola-Limited.otf");
  // reduced font to 3 characters using:
  // pyftsubset Symbola.otf --unicodes=U+1F408,U+25C1,U+23FF --output-file=Symbola-Limited.otf
  // https://stackoverflow.com/questions/12976424/how-to-remove-characters-from-a-font-file
}

let system;
let observer;
let cat;
function setup() {
  createCanvas(windowWidth, windowWidth * 0.116667);
  //createCanvas(600, 70);
  textFont(fontRegular);
  textSize(72);
  stroke(255);
  system = new TriangleSystem();
  observer = color(0);
  cat = color(0);
  noCursor();
}
function draw() {
  background(255);
  //clear();
  textSize(72);
  fill(observer);
  text("⏿", 5, 56);
  fill(cat);
  text("🐈", width - 60, 60);
  if (
    mouseX > 20 &&
    mouseX < width - 20 &&
    mouseY > 10 &&
    mouseY < height - 10
  ) {
    fill(0);
    text("◁", mouseX - 29, mouseY + 20);
  } else {
    mouseX = 0;
    mouseY = 0;
  }
  system.draw();
  //textSize(18);
  //fill(0);
  //text("Cats are made of triangles that make us a little like them.", 80, 60);
}
