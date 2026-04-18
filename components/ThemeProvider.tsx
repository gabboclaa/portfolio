"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "light", toggle: () => {} });

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  // Prefer the DOM class set by the inline script in layout.tsx (fastest path)
  if (document.documentElement.classList.contains("dark")) return "dark";
  if (document.documentElement.classList.contains("light")) return "light";
  // Fallback: read localStorage directly for pages where the inline script didn't run
  // (e.g. Next.js not-found / error routes served via RSC streaming)
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light") return "light";
  } catch {
    // ignore — private browsing may block localStorage
  }
  return "dark"; // default
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const t = getInitialTheme();
    // Apply the class immediately so the correct theme is in place before first paint,
    // even on routes where the layout's inline theme script didn't execute.
    if (t === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
    return t;
  });

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggle = () => {
    // Gate transitions to the toggle only — keeps scroll completely jank-free
    document.documentElement.classList.add("theme-transitioning");
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      if (next === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
      localStorage.setItem("theme", next);
      return next;
    });
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 350);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
