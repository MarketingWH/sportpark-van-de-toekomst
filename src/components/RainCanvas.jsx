import { useEffect, useRef } from 'react';

// Realistische regen op een canvas: druppels in drie dieptelagen (ver, midden,
// dichtbij) met een lichte windhoek, plus kleine spatjes waar ze de grond raken.
const LAYERS = [
  { share: 0.5, speed: [620, 820], length: [8, 14], width: 0.7, alpha: [0.12, 0.22] },
  { share: 0.35, speed: [900, 1150], length: [14, 22], width: 1, alpha: [0.18, 0.32] },
  { share: 0.15, speed: [1300, 1600], length: [24, 38], width: 1.4, alpha: [0.25, 0.42] },
];
const WIND = 0.16; // horizontale verschuiving per verticale pixel
const DROPS_PER_MEGAPIXEL = 900;
const SPLASHES_PER_SECOND_PER_MEGAPIXEL = 260;

const random = (min, max) => min + Math.random() * (max - min);

function createDrop(width, height, layer, startAnywhere) {
  return {
    x: random(-height * WIND, width),
    y: startAnywhere ? random(-height, height) : random(-height * 0.3, -20),
    speed: random(...layer.speed),
    length: random(...layer.length),
    alpha: random(...layer.alpha),
    layer,
  };
}

function RainCanvas({ reduceMotion = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let drops = [];
    let splashes = [];
    let frameId = 0;
    let lastTime = performance.now();
    let splashBudget = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const total = Math.round(((width * height) / 1_000_000) * DROPS_PER_MEGAPIXEL);
      drops = LAYERS.flatMap((layer) =>
        Array.from({ length: Math.round(total * layer.share) }, () =>
          createDrop(width, height, layer, true),
        ),
      );
    };

    const drawDrops = () => {
      context.lineCap = 'round';

      // Per laag één pad: veel sneller dan elke druppel apart tekenen
      for (const layer of LAYERS) {
        const alpha = (layer.alpha[0] + layer.alpha[1]) / 2;
        context.strokeStyle = `rgba(225, 236, 248, ${alpha})`;
        context.lineWidth = layer.width;
        context.beginPath();

        for (const drop of drops) {
          if (drop.layer !== layer) {
            continue;
          }

          context.moveTo(drop.x - drop.length * WIND, drop.y - drop.length);
          context.lineTo(drop.x, drop.y);
        }

        context.stroke();
      }
    };

    const drawSplashes = () => {
      for (const splash of splashes) {
        const progress = splash.age / splash.life;
        context.strokeStyle = `rgba(225, 236, 248, ${0.38 * (1 - progress)})`;
        context.lineWidth = 0.8;
        context.beginPath();
        context.ellipse(
          splash.x,
          splash.y,
          splash.size * (0.3 + progress),
          splash.size * 0.32 * (0.3 + progress),
          0,
          0,
          Math.PI * 2,
        );
        context.stroke();
      }
    };

    const step = (now) => {
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      context.clearRect(0, 0, width, height);

      for (const drop of drops) {
        drop.y += drop.speed * delta;
        drop.x += drop.speed * delta * WIND;

        if (drop.y - drop.length > height || drop.x - drop.length > width) {
          Object.assign(drop, createDrop(width, height, drop.layer, false));
        }
      }

      // Spatjes vooral in het onderste deel (het maaiveld ligt dichterbij)
      splashBudget += ((width * height) / 1_000_000) * SPLASHES_PER_SECOND_PER_MEGAPIXEL * delta;
      while (splashBudget >= 1) {
        splashBudget -= 1;
        const y = height * (0.25 + Math.sqrt(Math.random()) * 0.75);
        splashes.push({
          x: random(0, width),
          y,
          size: 2 + (y / height) * 5,
          age: 0,
          life: random(0.22, 0.38),
        });
      }

      splashes = splashes.filter((splash) => {
        splash.age += delta;
        return splash.age < splash.life;
      });

      drawDrops();
      drawSplashes();
      frameId = window.requestAnimationFrame(step);
    };

    resize();

    if (reduceMotion) {
      // Stilstaand beeld: wel regen te zien, geen beweging
      drawDrops();
    } else {
      frameId = window.requestAnimationFrame(step);
    }

    const observer = new ResizeObserver(() => {
      resize();
      if (reduceMotion) {
        context.clearRect(0, 0, width, height);
        drawDrops();
      }
    });
    observer.observe(canvas);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" style={{ width: '100%', height: '100%', display: 'block' }} />;
}

export default RainCanvas;
