// import {
//   Container,
//   Graphics,
//   Renderer,
//   Text,
//   RenderTexture,
//   Sprite,
//   MSAA_QUALITY,
//   Matrix,
// } from "pixi.js";

// const app = new Application({
//   resizeTo: window,
//   autoDensity: true,
//   antialias: true,
//   autoStart: false,
//   backgroundColor: 0x333333,
//   resolution: window.devicePixelRatio,
// });
// document.body.appendChild(app.view);

// const shapesToDraw = ["drawCircle", "drawRect"];

// const randomShapeFunc = Math.floor(Math.random() * shapesToDraw.length);

// const templateShape = new Graphics()
//   .beginFill(0xffffff)
//   .lineStyle({ width: 1, color: 0x333333, alignment: 0 })
//   [shapesToDraw[randomShapeFunc]](0, 0, 20, 20);

// const { width, height } = templateShape;

// // Draw the circle to the RenderTexture
// const renderTexture = RenderTexture.create({
//   width,
//   height,
//   multisample: MSAA_QUALITY.HIGH,
//   resolution: window.devicePixelRatio,
// });
// // With the existing renderer, render texture
// // make sure to apply a transform Matrix
// app.renderer.render(templateShape, {
//   renderTexture,
//   transform: new Matrix(1, 0, 0, 1, width / 2, height / 2),
// });

// // Required for MSAA, WebGL 2 only
// (app.renderer as Renderer).framebuffer.blit();

// // Discard the original Graphics
// templateShape.destroy(true);

// class Shape extends Sprite {
//   speed: number = 0;
// }
// let shapes: Shape[] = [];

// function createShape(i) {
//   const shape = new Shape(renderTexture);
//   console.log("new shape position", i);
//   shapes[i] = shape;

//   shape.anchor.set(0.5);
//   shape.speed = 1 + Math.random() * 1.2;
//   shape.position.x = app.screen.width * Math.random();
//   shape.position.y = 0 - height;

//   shape.tint = parseInt(Math.floor(Math.random() * 16777215).toString(16), 16);

//   return shape;
// }

// const container = new Container();

// window.addEventListener("click", () => {
//   const shape = createShape(shapes.length);
//   container.addChild(shape);
//   console.log("shape created by click", shapes);
// });

// setInterval(() => {
//   const shape = createShape(shapes.length);
//   container.addChild(shape);
//   console.log("shape created by interval", shapes);
// }, 1000);

// const text = new Text("", {
//   fill: "white",
//   fontWeight: "bold",
//   fontSize: 16,
// });
// text.position.set(10);
// app.stage.addChild(container, text);

// const redraw = () => {
//   let startTime = performance.now();
//   for (let i = 0; i < shapes.length; i++) {
//     const shape = shapes[i];
//     shape.position.y += shape.speed;
//     if (shape.position.y > app.screen.height + height) {
//       shape.position.y -= app.screen.height + height + height;
//     }
//   }
//   text.text =
//     "Prepared: " +
//     Math.round(performance.now() - startTime) +
//     "ms, Points: n/a";
//   app.render();

//   requestAnimationFrame(redraw);
// };

// requestAnimationFrame(redraw);
