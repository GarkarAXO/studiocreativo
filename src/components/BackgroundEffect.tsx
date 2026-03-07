import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

interface BackgroundEffectProps {
  id?: string;
  className?: string;
}

export const BackgroundEffect: React.FC<BackgroundEffectProps> = ({ id = "tsparticles", className = "absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-40" }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // console.log(container);
  };

  const options: ISourceOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "bubble",
        },
      },
      modes: {
        bubble: {
          distance: 200,
          duration: 2,
          opacity: 0.8,
          size: 3,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out",
        },
        random: true,
        speed: 0.2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 450,
      },
      opacity: {
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false,
        },
        value: { min: 0.1, max: 0.9 },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 0.5, max: 2.2 },
      },
    },
    detectRetina: true,
  };

  if (init) {
    return (
      <Particles
        id={id}
        particlesLoaded={particlesLoaded}
        options={options}
        className={className}
      />
    );
  }

  return null;
};