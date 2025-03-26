
import React, { useEffect, useRef } from 'react';

const MovingCircles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full window size
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    // Handle resize events
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Circle configuration
    const circles: Circle[] = [];
    const numberOfCircles = 6;
    const colors = [
      'rgba(59, 130, 246, 0.2)', // blue
      'rgba(99, 102, 241, 0.15)', // indigo
      'rgba(139, 92, 246, 0.1)', // purple
      'rgba(236, 72, 153, 0.1)', // pink
      'rgba(239, 68, 68, 0.05)' // red
    ];
    
    // Circle class
    class Circle {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      targetRadius: number;
      growthSpeed: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 50 + 50; // Between 50 and 100
        this.targetRadius = this.radius;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.growthSpeed = Math.random() * 0.05 + 0.01;
      }
      
      // Update circle position and size
      update() {
        // Slowly change the target radius to create a pulsating effect
        if (Math.random() < 0.01) {
          this.targetRadius = Math.random() * 70 + 40; // Between 40 and 110
        }
        
        // Gradually approach the target radius
        if (Math.abs(this.radius - this.targetRadius) > 1) {
          if (this.radius < this.targetRadius) {
            this.radius += this.growthSpeed;
          } else {
            this.radius -= this.growthSpeed;
          }
        }
        
        // Move the circle
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off the edges
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      // Draw circle
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.filter = 'blur(30px)';
        ctx.fill();
        ctx.filter = 'none';
      }
    }
    
    // Create circles
    const init = () => {
      for (let i = 0; i < numberOfCircles; i++) {
        circles.push(new Circle());
      }
    };
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const circle of circles) {
        circle.update();
        circle.draw();
      }
    };
    
    init();
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none"
    />
  );
};

export default MovingCircles;
