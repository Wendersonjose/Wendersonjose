"use client";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useMemo, useRef } from "react";

import { twMerge } from "tailwind-merge";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: -0.7,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [0, 1, 0], // verde neon
  glowColor: [0, 1, 0],   // glow também verde
  markers: [
    { location: [-18.9186, -48.2772], size: 0.1 },
    { location: [14.5995, 120.9842], size: 0.1 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.1 },
    { location: [30.0444, 31.2357], size: 0.1 },
    { location: [39.9042, 116.4074], size: 0.1 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1},
    { location: [34.6937, 135.5022], size: 0.1 },
    { location: [41.0082, 28.9784], size: 0.1 },
  ],
};

export function Globe({ className, config = GLOBE_CONFIG, theme }) {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const globeConfig = useMemo(() => {
  const isLightTheme = theme === "light";
  return {
    ...config,
    baseColor: isLightTheme ? [0.3, 0.3, 0.3] : [1, 1, 1],
    markerColor: isLightTheme ? [1, 1, 1] : [0, 0, 0], // Verde suave no escuro
    glowColor: isLightTheme ? [1, 1, 1] : [0, 0, 0]   // Glow também verde suave
  };
}, [config, theme]);

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
  let phi = 2.0; // valor ajustado para centralizar América do Sul no início
  let width = 0;

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  window.addEventListener("resize", onResize);
  onResize();

  const globe = createGlobe(canvasRef.current, {
    ...globeConfig,
    width: width * 2,
    height: width * 2,
    onRender: (state) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + rs.get();
      state.width = width * 2;
      state.height = width * 2;
    },
  });

  setTimeout(() => {
    if (canvasRef.current) {
      canvasRef.current.style.opacity = "1";
    }
  }, 0);

  return () => {
    globe.destroy();
    window.removeEventListener("resize", onResize);
  };
}, [rs, globeConfig]);


  return (
    <div
      className={twMerge(
        "mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className="grab-canvas size-[30rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
