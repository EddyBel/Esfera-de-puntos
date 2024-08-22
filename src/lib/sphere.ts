export class Sphere {
  cant: number;
  offset: number;
  increment: number;
  canvas: HTMLDivElement;
  points: NodeList | [];
  animationIDs: number[];
  fps: number;

  constructor(canvasParent) {
    this.fps = 30;
    this.cant = 200;
    this.offset = 2 / this.cant;
    this.increment = Math.PI * (3 - Math.sqrt(5));
    this.canvas = canvasParent;
    this.points = [];
    this.animationIDs = [];
  }

  createSphere() {
    if (this.points.length === 0) {
      this.asignPoints();
      this.positionPoints();
    }
  }

  asignPoints() {
    console.log("createSphere");
    for (let i = 0; i < this.cant; i++) {
      const point = document.createElement("div");
      point.className = "point";
      point.setAttribute("data-index", i);
      this.canvas.appendChild(point);
    }

    this.points = document.querySelectorAll(".point");
  }

  positionPoints() {
    let x, y, z, r, a, scale, opacity, point, style;

    for (let i = 0; i < this.points.length; i++) {
      y = i * this.offset - 1 + this.offset / 2;
      r = Math.sqrt(1 - y * y);
      a = ((i + 1) % this.cant) * this.increment;
      x = Math.cos(a) * r;
      z = Math.sin(a) * r;

      x = 125 + x * 100;
      y = 125 + y * 100;

      scale = Math.round(z * 20000) / 100;
      opacity = (1 + z) / 1.5;
      style = `translate3d(${x}px, ${y}px, ${scale}px)`;

      point = this.points[i];
      point.style.WebkitTransform = style;
      point.style.msTransform = style;
      point.style.transform = style;
      point.style.opacity = opacity;
    }
  }

  // Animations

  rotateSphere() {
    let x, y, z, r, a, scale, opacity, point, style;
    let angle = 0;
    let then = performance.now();
    let interval = 1000 / this.fps;
    let animationIDs = [];
    const cant = this.cant;
    const offset = this.offset;
    const increment = this.increment;
    const points = this.points;

    function updatePoints(now) {
      const animationID = requestAnimationFrame(updatePoints);
      animationIDs.push(animationID);

      const elapsed = now - then;

      if (elapsed > interval) {
        then = now - (elapsed % interval);
        angle += 0.01;

        for (let i = 0; i < cant; i++) {
          y = i * offset - 1 + offset / 2;
          r = Math.sqrt(1 - y * y);
          a = ((i + 1) % cant) * increment + angle;
          x = Math.cos(a) * r;
          z = Math.sin(a) * r;

          x = 125 + x * 100;
          y = 125 + y * 100;

          scale = Math.round(z * 20000) / 100;
          opacity = (1 + z) / 1.5;
          style = `translate3d(${x}px, ${y}px, ${scale}px)`;

          point = points[i];
          point.style.WebkitTransform = style;
          point.style.msTransform = style;
          point.style.transform = style;
          point.style.opacity = opacity;
        }
      }
    }

    updatePoints(performance.now());
    this.animationIDs = animationIDs;
  }

  mouseSphere(evt) {
    let x, y, z, r, a, scale, opacity, point, style;
    let angle = 0;
    const cant = this.cant;
    const offset = this.offset;
    const increment = this.increment;
    const points = this.points;

    function updatePoints(evt) {
      angle = evt ? ((-evt.pageX / 4) * Math.PI) / 180 : 0;

      for (let i = 0; i < cant; i++) {
        y = i * offset - 1 + offset / 2;
        r = Math.sqrt(1 - y * y);
        a = ((i + 1) % cant) * increment + angle;
        x = Math.cos(a) * r;
        z = Math.sin(a) * r;

        x = 125 + x * 100;
        y = 125 + y * 100;

        scale = Math.round(z * 20000) / 100;
        opacity = (1 + z) / 1.5;
        style = `translate3d(${x}px, ${y}px, ${scale}px)`;

        point = points[i];
        point.style.WebkitTransform = style;
        point.style.msTransform = style;
        point.style.transform = style;
        point.style.opacity = opacity;
      }
    }

    window.addEventListener("mousemove", updatePoints);
  }

  cancelAnimations() {
    this.animationIDs.map((id) => cancelAnimationFrame(id));
    this.animationIDs = [];
  }

  destroySphere() {
    this.canvas.innerHTML = "";
  }
}
