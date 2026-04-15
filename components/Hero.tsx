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

// ── Surname scramble hook ──
function useSurnameScramble(finalText: string) {
  const placeholder = finalText.replace(/[^\s]/g, "\u00A0");
  const [display, setDisplay] = useState(placeholder);
  const [roleReady, setRoleReady] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(finalText);
      setRoleReady(true);
      return;
    }

    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const START_DELAY = 200;
    const SCRAMBLE_DURATION = 900;
    const ROLE_DELAY = 300;
    const chars = finalText.split("");
    const revealIndexes = chars
      .map((char, index) => (char === " " ? -1 : index))
      .filter((index) => index >= 0);
    const scrambleFrames = chars.map((char) =>
      char === " " ? 0 : 6 + Math.floor(Math.random() * 5)
    );
    const frameDuration = 16;
    const perCharDuration = SCRAMBLE_DURATION / revealIndexes.length;
    let rafId = 0;
    let roleTimer: ReturnType<typeof setTimeout> | undefined;
    let startTime: number | null = null;

    const getRandomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

    const animate = (now: number) => {
      if (startTime === null) {
        startTime = now;
      }

      const elapsed = now - startTime;
      if (elapsed < START_DELAY) {
        setDisplay(placeholder);
        rafId = requestAnimationFrame(animate);
        return;
      }

      const scrambleElapsed = Math.min(elapsed - START_DELAY, SCRAMBLE_DURATION);
      const nextChars = chars.map((char, index) => {
        if (char === " ") {
          return " ";
        }

        const revealPosition = revealIndexes.indexOf(index);
        const charStart = perCharDuration * revealPosition;
        const charFrames = scrambleFrames[index];
        const charDuration = Math.max(charFrames * frameDuration, perCharDuration);
        const charEnd = charStart + charDuration;

        if (scrambleElapsed >= charEnd) {
          return char;
        }

        if (scrambleElapsed < charStart) {
          return getRandomChar();
        }

        return getRandomChar();
      });

      setDisplay(nextChars.join(""));

      if (scrambleElapsed >= SCRAMBLE_DURATION) {
        setDisplay(finalText);
        roleTimer = setTimeout(() => setRoleReady(true), ROLE_DELAY);
        return;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      if (roleTimer) clearTimeout(roleTimer);
    };
  }, [finalText, placeholder]);

  return { display, roleReady };
}

// ── Typed rotating words hook ──
function useTyped(words: string[], startDelay = 1800) {
  const [text, setText] = useState(words[0] || "\u00A0");
  // Use a ref for words so the effect doesn't depend on the array reference
  const wordsRef = useRef(words);
  const state = useRef({
    wordIndex: 0,
    charIndex: words[0]?.length ?? 0,
    deleting: true,
  });

  useEffect(() => {
    const TYPE_SPEED = 85, DELETE_SPEED = 40, PAUSE = 2000;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const { wordIndex, charIndex, deleting } = state.current;
      const current = wordsRef.current[wordIndex];

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
          state.current.wordIndex = (wordIndex + 1) % wordsRef.current.length;
        }
      }
      timer = setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
    };

    const startTimer = setTimeout(tick, startDelay);
    return () => { clearTimeout(startTimer); clearTimeout(timer); };
  }, [startDelay]);

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
    let paused = false;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);

    const onVisibility = () => {
      paused = document.hidden;
      if (!paused) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);

    const draw = () => {
      if (paused) return;
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
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
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
  const { display: surname, roleReady } = useSurnameScramble("Clara Di Gioacchino");
  const role = useTyped(["developer", "builder", "engineer", "creator"], 1800);
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
        <h1 className="text-[2.5rem] sm:text-6xl md:text-[72px] font-medium tracking-tight leading-none mb-2 text-[#0f0f0f] dark:text-[#f0f0f0]">
          <span id="firstname" className="block">Gabriele</span>
          <span id="surname" className="block whitespace-nowrap">{surname || "\u00A0"}</span>
        </h1>

        {/* Role */}
        <div
          className="text-5xl sm:text-6xl md:text-[72px] font-light tracking-tight leading-none mb-12 flex items-baseline min-h-[1.2em] transition-all duration-[400ms] ease-out"
          style={{
            opacity: roleReady ? 1 : 0,
            transform: roleReady ? "translateY(0)" : "translateY(6px)",
          }}
        >
          <span
            id="switching-word"
            className="text-[#bd864b] font-normal italic"
            style={{ transform: "translateZ(0)", WebkitTransform: "translateZ(0)" } as React.CSSProperties}
          >
            {role}
          </span>
          <span className="hero-period text-[#bd864b] font-normal italic">.</span>
          <span className="typed-cursor ml-0.5" />
        </div>

        {/* Description */}
        <div className="hero-desc mb-12">
          <p className="mt-3 mb-5 text-[28px] sm:text-[30px] md:text-[32px] font-medium text-[#0f0f0f] dark:text-[#f0ede8] leading-tight">
            I ask why before how.
          </p>
          <p className="mt-2 max-w-[27rem] text-[15px] text-[#9a9a9a] dark:text-[#6b6b6b] leading-relaxed">
            A software engineer driven by curiosity — I don't know where technology leads, and that's exactly what keeps me building.
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-wide text-[#9a9a9a] dark:text-[#3a3a3a] opacity-70">
            Python · C++ · React · Next.js · MongoDB · TensorFlow · Kafka · Spark
          </p>
        </div>

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
            aria-label="GitHub"
            className="text-[#9a9a9a] dark:text-[#555] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/gabriele-clara-di-gioacchino" target="_blank" rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#9a9a9a] dark:text-[#555] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
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
