"use client";

import { useEffect, useRef, useState } from "react";

// ── Touch device detection ──
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);
  return isTouch;
}

// ── Scramble hook ──
function useScramble(finalText: string, startDelay = 500, duration = 1400) {
  const [display, setDisplay] = useState("\u00A0");
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  useEffect(() => {
    let rafId: number;
    let startTime: number | null = null;
    let lastTickTime = 0;
    const TICK_INTERVAL = 45;

    const startTimeout = setTimeout(() => {
      const len = finalText.length;

      const animate = (now: number) => {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (progress === 1) { setDisplay(finalText); return; }

        const eased = 1 - Math.pow(1 - progress, 2);
        const revealed = Math.floor(eased * len);

        if (now - lastTickTime > TICK_INTERVAL) {
          lastTickTime = now;
          let output = "";
          for (let i = 0; i < len; i++) {
            if (finalText[i] === " ") { output += " "; continue; }
            output += i < revealed
              ? finalText[i]
              : CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          setDisplay(output);
        }

        rafId = requestAnimationFrame(animate);
      };

      rafId = requestAnimationFrame(animate);
    }, startDelay);

    return () => { clearTimeout(startTimeout); if (rafId) cancelAnimationFrame(rafId); };
  }, [finalText, startDelay, duration]);

  return display;
}

// ── Typed rotating words hook ──
function useTyped(words: string[], startDelay = 1800) {
  const [text, setText] = useState("\u00A0");
  const state = useRef({ wordIndex: 0, charIndex: 0, deleting: false });

  useEffect(() => {
    const TYPE_SPEED = 85, DELETE_SPEED = 40, PAUSE = 2000;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const { wordIndex, charIndex, deleting } = state.current;
      const current = words[wordIndex];

      if (!deleting) {
        const next = charIndex + 1;
        setText(current.slice(0, next) || "\u00A0");
        state.current.charIndex = next;
        if (next === current.length) {
          state.current.deleting = true;
          timer = setTimeout(tick, PAUSE);
          return;
        }
      } else {
        const next = charIndex - 1;
        setText(current.slice(0, next) || "\u00A0");
        state.current.charIndex = next;
        if (next === 0) {
          state.current.deleting = false;
          state.current.wordIndex = (wordIndex + 1) % words.length;
        }
      }
      timer = setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
    };

    const startTimer = setTimeout(tick, startDelay);
    return () => { clearTimeout(startTimer); clearTimeout(timer); };
  }, []);

  return text;
}

// ── Dot grid — theme-aware ──
function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const SPACING = 36;
    let raf: number;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");
      const cols = Math.ceil(canvas.width  / SPACING) + 1;
      const rows = Math.ceil(canvas.height / SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;
          const dx = x - mouse.current.x;
          const dy = y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / 240);
          const size  = 1 + proximity * 2.5;
          const alpha = (isDark ? 0.12 : 0.1) + proximity * 0.55;

          ctx.beginPath();
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
          ctx.fillStyle = proximity > 0.15
            ? `rgba(189,134,75,${alpha})`
            : isDark
              ? `rgba(255,255,255,0.07)`
              : `rgba(0,0,0,0.1)`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0, animation: "fadeInCanvas 1.2s ease 0.3s forwards" }}
    />
  );
}

// ── Cursor glow ──
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + "px";
        glowRef.current.style.top  = e.clientY + "px";
      }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top  = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="fixed z-0 pointer-events-none rounded-full"
        style={{
          width: 320, height: 320,
          background: "radial-gradient(circle, rgba(189,134,75,0.09) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: "left 0.08s ease, top 0.08s ease",
        }}
      />
      <div
        ref={dotRef}
        className="fixed z-50 pointer-events-none rounded-full bg-[#bd864b]"
        style={{ width: 5, height: 5, transform: "translate(-50%, -50%)", transition: "left 0.03s, top 0.03s" }}
      />
    </>
  );
}

// ── Main Hero ──
interface HeroProps {
  onOpenCV: () => void;
}

export default function Hero({ onOpenCV }: HeroProps) {
  const name = useScramble("Gabriele Clara Di Gioacchino", 500, 1400);
  const role = useTyped(["developer.", "builder.", "engineer.", "creator."], 1800);
  const isTouch = useIsTouchDevice();

  return (
    <>
      {!isTouch && <CursorGlow />}
      {!isTouch && <DotGrid />}

      <section
        id="about"
        className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-20 max-w-5xl"
      >
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 mb-10 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
          <span className="font-mono text-xs text-[#9a9a9a] tracking-wider">available for work</span>
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-[72px] font-medium tracking-tight leading-none mb-2 text-[#0f0f0f] dark:text-[#f0f0f0]">
          {name || "\u00A0"}
        </h1>

        {/* Role */}
        <div className="text-5xl sm:text-6xl md:text-[72px] font-light tracking-tight leading-none mb-12 flex items-baseline">
          <span className="text-[#bd864b] font-normal italic" style={{ transform: "translateZ(0)", WebkitTransform: "translateZ(0)" } as React.CSSProperties}>{role}</span>
          <span className="typed-cursor ml-0.5" />
        </div>

        {/* Description */}
        <p className="hero-desc text-[15px] text-[#9a9a9a] dark:text-[#555] leading-relaxed max-w-sm mb-12">
          I craft clean, thoughtful software — from architecture to interface.
          Based in Milan, open to remote.
        </p>

        {/* Links */}
        <div className="hero-links flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="#projects"
            className="text-sm font-mono tracking-wide text-[#0f0f0f] dark:text-[#f0f0f0] border-b border-[#0f0f0f] dark:border-[#f0f0f0] pb-px hover:text-[#bd864b] hover:border-[#bd864b] transition-colors"
          >
            See projects ↓
          </a>
          <button
            onClick={onOpenCV}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-[#9a9a9a] dark:text-[#555] border border-[#e5e5e5] dark:border-[#2a2a2a] px-4 py-2 rounded-full hover:border-[#0f0f0f] dark:hover:border-[#f0f0f0] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors"
          >
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M7 1v8M4 6l3 3 3-3M2 11h10" />
            </svg>
            Resume
          </button>
          <a href="https://github.com/gabboclaa" target="_blank" rel="noopener noreferrer"
            className="text-sm font-mono tracking-wide text-[#9a9a9a] dark:text-[#555] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors">
            GitHub ↗
          </a>
          <a href="https://www.linkedin.com/in/gabriele-clara-di-gioacchino" target="_blank" rel="noopener noreferrer"
            className="text-sm font-mono tracking-wide text-[#9a9a9a] dark:text-[#555] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors">
            LinkedIn ↗
          </a>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll absolute bottom-10 left-6 md:left-20 flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-[#d0d0d0] dark:text-[#2a2a2a]">
          <span className="block w-7 h-px bg-[#d0d0d0] dark:bg-[#2a2a2a]" />
          scroll to explore
        </div>
      </section>
    </>
  );
}
