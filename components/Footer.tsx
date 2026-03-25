export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e5e5e5] dark:border-[#1a1a1a] light:bg-[#f3e7db] dark:bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6 md:px-20 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-[#9a9a9a]">
          © {year} Gabriele Clara Di Gioacchino
        </span>
        <div className="flex items-center gap-6">
          {[
            { label: "GitHub",   href: "https://github.com/gabboclaa" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/gabriele-clara-di-gioacchino" },
            { label: "Email",    href: "mailto:gabriele.claradigioacchino@outlook.it" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#9a9a9a] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors"
            >
              {label} ↗
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
