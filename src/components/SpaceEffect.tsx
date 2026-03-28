"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  color: string;
  velocity: { x: number; y: number };
}

export default function SpaceEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationId: number;
    let isPC = false;

    const checkDevice = () => {
      isPC = window.matchMedia("(pointer: fine)").matches;
    };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 4000;
      
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2.5 + 0.5;
        const colors = ["#ffffff", "#e0f2fe", "#f0f9ff", "#7dd3fc"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push({
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          size: size,
          density: Math.random() * 30 + 1,
          color: color,
          velocity: {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5
          }
        });
      }
    };

    const closestPointOnSegment = (px: number, py: number, x1: number, y1: number, x2: number, y2: number) => {
      const l2 = (x1 - x2) ** 2 + (y1 - y2) ** 2;
      if (l2 === 0) return { x: x1, y: y1 };
      let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
      t = Math.max(0, Math.min(1, t));
      return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let dynamicRadius = 150;
      let mouseSpeed = 0;

      if (isPC) {
        mouseSpeed = Math.sqrt(
          (mouseRef.current.x - mouseRef.current.prevX) ** 2 + 
          (mouseRef.current.y - mouseRef.current.prevY) ** 2
        );
        dynamicRadius = Math.min(mouseRef.current.radius + mouseSpeed * 0.5, 300);
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.velocity.x;
        p.y += p.velocity.y;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        if (isPC) {
          const closest = closestPointOnSegment(
            p.x, p.y, 
            mouseRef.current.prevX, mouseRef.current.prevY,
            mouseRef.current.x, mouseRef.current.y
          );
          const dx = closest.x - p.x;
          const dy = closest.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 0.1;

          if (distance < dynamicRadius) {
            const force = (dynamicRadius - distance) / dynamicRadius;
            const repulsionStrength = 1 + mouseSpeed * 0.05;
            const directionX = (dx / distance) * force * p.density * repulsionStrength;
            const directionY = (dy / distance) * force * p.density * repulsionStrength;
            p.x -= directionX;
            p.y -= directionY;
          }
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        if (p.size > 2) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }
      }
      
      if (isPC) {
        mouseRef.current.prevX = mouseRef.current.x;
        mouseRef.current.prevY = mouseRef.current.y;
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.x;
      mouseRef.current.y = e.y;
    };

    const handleResize = () => {
      init();
    };

    checkDevice();
    init();
    animate();

    if (isPC) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{
        background: "radial-gradient(circle at 50% 50%, #0a0a1a 0%, #050505 100%)",
      }}
    />
  );
}
