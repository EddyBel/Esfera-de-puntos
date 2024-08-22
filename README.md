<h1 align="center">Esfera de puntos</h1>

<p align="center" >
<img src="https://img.shields.io/github/last-commit/EddyBel/Esfera-de-puntos?color=%23AED6F1&style=for-the-badge" />
<img src="https://img.shields.io/github/license/EddyBel/Esfera-de-puntos?color=%23EAECEE&style=for-the-badge" />
<img src="https://img.shields.io/github/languages/top/EddyBel/Esfera-de-puntos?color=%23F9E79F&style=for-the-badge" />
<img src="https://img.shields.io/github/languages/count/EddyBel/Esfera-de-puntos?color=%23ABEBC6&style=for-the-badge" />
<img src="https://img.shields.io/github/languages/code-size/EddyBel/Esfera-de-puntos?color=%23F1948A&style=for-the-badge" />
</p>

<p align="center">Esfera de puntos con Typescript.</p>

Este proyecto es una implementación de un diseño interactivo de una esfera 3D creada utilizando TypeScript y React. La esfera está compuesta por puntos que se distribuyen uniformemente en su superficie y pueden moverse y rotar en respuesta a interacciones del usuario. Este repositorio no es un tutorial, sino una demostración del proceso de construcción de este efecto visual.

![Preview](./public/preview.png)

## Ejemplo de uso

```typescript
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
```

---

<p align="center">
  <a href="https://github.com/EddyBel" target="_blank">
    <img alt="Github" src="https://img.shields.io/badge/GitHub-%2312100E.svg?&style=for-the-badge&logo=Github&logoColor=white" />
  </a> 
  <a href="https://www.linkedin.com/in/eduardo-rangel-eddybel/" target="_blank">
    <img alt="LinkedIn" src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />
  </a> 
</p>
