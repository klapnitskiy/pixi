import {
  Application,
  Container,
  Graphics,
  Text,
  RenderTexture,
  Sprite,
  Matrix,
  Point,
} from "pixi.js";

const app = new Application({
  resizeTo: window,
  autoDensity: true,
  antialias: true,
  autoStart: false,
  backgroundColor: 0x333333,
  resolution: window.devicePixelRatio,
});

document.body.appendChild(app.view);

const shapesToDraw = ["drawCircle", "drawRect"];

const randomShapeFunc = Math.floor(Math.random() * shapesToDraw.length);

const templateShape = new Graphics()
  .beginFill(0xffffff)
  .lineStyle({ width: 1, color: 0x333333, alignment: 0 })
  [shapesToDraw[randomShapeFunc]](0, 0, 20, 20);

const { width, height } = templateShape;

// Draw the circle to the RenderTexture
const renderTexture = RenderTexture.create({
  width,
  height,
  // multisample: MSAA_QUALITY.HIGH,
  resolution: window.devicePixelRatio,
});
// With the existing renderer, render texture
// make sure to apply a transform Matrix
app.renderer.render(templateShape, {
  renderTexture,
  transform: new Matrix(1, 0, 0, 1, width / 2, height / 2),
});

// Discard the original Graphics
templateShape.destroy(true);

class Shape extends Sprite {
  speed = 0;
}
let shapes = [];

function createShape(i, mousePos = undefined) {
  const shape = new Shape(renderTexture);
  console.log("new shape position", i);
  shapes[i] = shape;

  shape.anchor.set(0.5);
  shape.speed = 1 + Math.random() * 1.2;

  shape.tint = parseInt(Math.floor(Math.random() * 16777215).toString(16), 16);

  if (mousePos) {
    console.log(mousePos, "mousepos");
    shape.position.x = mousePos.x - width / 2;
    shape.position.y = mousePos.y - height / 2;
    console.log(container);

    return shape;
  }

  shape.position.x = app.screen.width * Math.random();
  shape.position.y = 0 - height;

  return shape;
}

let container = new Container();

app.stage.addChild(container);

window.addEventListener("pointerdown", (e) => {
  const shape = createShape(shapes.length, { x: e.clientX, y: e.clientY });
  container.addChild(shape);
  console.log(container);
  // console.log("shape created by click", shapes);
});

setInterval(() => {
  const shape = createShape(shapes.length);
  container.addChild(shape);
  // console.log("shape created by interval", shapes);
}, 1000);

const text = new Text("", {
  fill: "white",
  fontWeight: "bold",
  fontSize: 16,
});
text.position.set(10);
app.stage.addChild(text);

const redraw = () => {
  let startTime = performance.now();
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    shape.position.y += shape.speed;
    if (shape.position.y > app.screen.height + height) {
      shape.position.y -= app.screen.height + height + height;
    }
  }
  text.text =
    "Prepared: " +
    Math.round(performance.now() - startTime) +
    "ms, Points: n/a";
  app.render();

  requestAnimationFrame(redraw);
};

requestAnimationFrame(redraw);
