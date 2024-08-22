/** Sphere class for building a sphere with points */
export class Sphere {
  cant: number;
  offset: number;
  increment: number;
  canvas: HTMLDivElement;
  points: HTMLElement[] = [];
  animationIDs: number[] = [];
  fps: number;
  angle: number = 0;
  blobFactors: number[];
  blobSpeeds: number[];
  color: string;
  sizePoints: number;

  constructor(canvasParent: HTMLDivElement, numberPoints: number | undefined) {
    this.fps = 30;
    this.cant = numberPoints || 100;
    this.offset = 2 / this.cant;
    this.increment = Math.PI * (3 - Math.sqrt(5));
    this.canvas = canvasParent;
    this.blobFactors = new Array(this.cant).fill(1);
    this.blobSpeeds = new Array(this.cant).fill(0.005);
    this.color = "#000";
    this.sizePoints = 4;
  }

  /** Create sphere with points in canvas */
  createSphere() {
    if (this.points.length === 0) {
      this._assignPoints();
      this._updatePoints();
    }

    return () => this._destroySphere();
  }

  _assignPoints() {
    for (let i = 0; i < this.cant; i++) {
      const point = document.createElement("div");
      point.className = "point";
      point.setAttribute("data-index", `${i}`);
      
      // Set inline styles for the point
      point.style.background = this.color;
      point.style.borderRadius = "50%";
      point.style.height = `${this.sizePoints}px`;
      point.style.width = `${this.sizePoints}px`;
      point.style.position = "absolute";
      point.style.transformStyle = "preserve-3d";

      this.canvas.appendChild(point);
      this.points.push(point as HTMLElement);
    }
  }

  _calculatePosition(index: number, angleOffset: number = 0): { x: number, y: number, scale: number, opacity: number } {
    const canvasWidth = this.canvas.offsetWidth;
    const radius = canvasWidth / 2;
    const y = index * this.offset - 1 + this.offset / 2;
    const r = Math.sqrt(1 - y * y);
    const a = ((index + 1) % this.cant) * this.increment + angleOffset;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const px = radius + x * radius;
    const py = radius + y * radius;
    const scale = Math.round(z * 20000) / 100;
    const opacity = (1 + z) / 1.5;
    
    return { x: px, y: py, scale, opacity };
  }

  _updatePoints(angleOffset: number = 0) {
    for (let i = 0; i < this.points.length; i++) {
      const { x, y, scale, opacity } = this._calculatePosition(i, angleOffset);
      const point = this.points[i];
      point.style.transform = `translate3d(${x}px, ${y}px, ${scale}px)`;
      point.style.opacity = `${opacity}`;
    }
  }

  _updateBlobFactors() {
    for (let i = 0; i < this.cant; i++) {
      this.blobFactors[i] += this.blobSpeeds[i];
      if (this.blobFactors[i] > 1.1 || this.blobFactors[i] < 0.9) {
        this.blobSpeeds[i] *= -1; // Reverse the direction of the change
      }
    }
  }

  rotateSphereWithBlob() {
    let angle = 0;
    let then = performance.now();
    const interval = 1000 / this.fps;
    let animationIDs: number[] = [];

    const updatePoints = (now: number) => {
      const animationID = requestAnimationFrame(updatePoints);
      animationIDs.push(animationID);

      const elapsed = now - then;

      if (elapsed > interval) {
        then = now - (elapsed % interval);
        angle += 0.01;
        this._updateBlobFactors();

        for (let i = 0; i < this.cant; i++) {
          const blobScale = this.blobFactors[i];
          const { x, y, scale, opacity } = this._calculatePosition(i, angle);

          const point = this.points[i] as HTMLElement;
          point.style.transform = `translate3d(${x}px, ${y}px, ${scale * blobScale}px)`;
          point.style.opacity = `${opacity}`;
        }
      }
    };

    updatePoints(performance.now());
    this.animationIDs = animationIDs;

    return () => {
      animationIDs.forEach((id) => cancelAnimationFrame(id));
      animationIDs = [];
    };
  }

  rotateSphere() {
    let then = performance.now();
    const interval = 1000 / this.fps;

    const updatePoints = (now: number) => {
      const elapsed = now - then;

      if (elapsed > interval) {
        then = now - (elapsed % interval);
        this.angle += 0.01;

        this._updatePoints(this.angle);
      }

      const animationID = requestAnimationFrame(updatePoints);
      this.animationIDs.push(animationID);
    };

    updatePoints(performance.now());
    return () => this._cancelAnimations();
  }

  mouseSphere() {
    const updatePoints = (evt: MouseEvent) => {
      this.angle = evt ? ((-evt.pageX / 4) * Math.PI) / 180 : 0;
      this._updatePoints(this.angle);
    };

    window.addEventListener("mousemove", updatePoints);
    return () => window.removeEventListener("mousemove", updatePoints);
  }

  _cancelAnimations() {
    this.animationIDs.forEach((id) => cancelAnimationFrame(id));
    this.animationIDs = [];
  }

  _destroySphere() {
    this.canvas.innerHTML = "";
    this.points = [];
  }
}
