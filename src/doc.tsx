import { useEffect, useRef } from "react";
import { Sphere } from "./lib/sphere";

export function SphereComponent() {

    const canvas = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const current = canvas.current;
        if (!current) return;

        // Create Sphere
        const sphere = new Sphere(current, 150);
        sphere.fps = 30;
        sphere.color = '#17181f'
        sphere.sizePoints = 3
        
        const destroySphere = sphere.createSphere();
        const cancelEvent = sphere.mouseSphere();
        const cancelRotate = sphere.rotateSphere();

        return () => {
            destroySphere();
            cancelEvent();
            cancelRotate();
        }
    }, [])


    return <div ref={canvas} className="w-[200px] h-[200px]"></div>
}