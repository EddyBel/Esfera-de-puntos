import { useEffect, useRef } from "react";
import { Sphere } from "./lib/sphere";
import "./styles/sphere.css";

function App() {
  const canvasSphere = useRef(null);

  useEffect(() => {
    const sphere = new Sphere(canvasSphere.current);
    sphere.fps = 15;
    sphere.createSphere();
    // sphere.rotateSphere();

    return () => {
      sphere.destroySphere();
      sphere.cancelAnimations();
    };
  }, []);

  return (
    <main className="min-h-screen w-full bg-slate-100">
      <section className="flex items-center justify-center min-h-screen w-full">
        {/* Canvas container sphere */}
        <div
          className="canvas-sphere relative"
          id="canvas-sphere"
          ref={canvasSphere}
        ></div>

        <div className="h-screen w-full absolute flex items-end">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#273036"
              fill-opacity="1"
              d="M0,96L60,112C120,128,240,160,360,165.3C480,171,600,149,720,128C840,107,960,85,1080,80C1200,75,1320,85,1380,90.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>
    </main>
  );
}

export default App;
