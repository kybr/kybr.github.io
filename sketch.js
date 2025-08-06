// Karl Yerkes
// 2021-12-16
//


let system;
let observer;
let cat;
const N = 72;

async function setup() {
  // https://fontlibrary.org/en/font/symbola
  //
  // reduced font to 3 characters using:
  // 
  // https://stackoverflow.com/questions/12976424/how-to-remove-characters-from-a-font-file
  //
  // pyftsubset Symbola.otf \
  //   --unicodes=U+1F408,U+25C1,U+23FF \
  //   --output-file=Symbola-Limited.otf
  //
  let symbola = await loadFont("Symbola-Limited.otf");
  createCanvas(windowWidth - 100, N);
  textFont(symbola);
  textSize(N);
  noStroke();
  noCursor();
  textAlign(CENTER, CENTER);
  system = new TriangleSystem();
  observer = color(255);
  cat = color(255);
}
function draw() {
  background(255);
  textSize(N);
  fill(observer);
  text("⏿", N / 2, N / 2);
  fill(cat);
  text("🐈", width - N / 2, N / 2);
  if (
    mouseX > N &&
    mouseX < width - N &&
    mouseY > 0 &&
    mouseY < height
  ) {
    fill(200);
    text("◁", mouseX, mouseY);
  }
  system.draw();
}


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
        t.x = width - N;
        t.dx = random(1, 5);
        t.y = N / 2;
        t.dy = 0;
        t.a = random(2 * PI);
        t.da = random(0.05, 0.2) * (random() > 0.6 ? -1 : 1);
        t.size = random(3, 11);
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