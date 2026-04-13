"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

/* ─── reveal hook ─────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

/* ─── real contact info ───────────────────────── */
const EMAIL     = "daskuntal688@gmail.com";
const LINKEDIN  = "https://www.linkedin.com/in/kuntal-das-271805287/";
const INSTAGRAM = "https://www.instagram.com/kuntal_xd";
const GITHUB    = "https://github.com/kuntal-das-k";

/* ─── SVG social icons ───────────────────────── */
const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const SOCIALS = [
  { name: "GitHub",    href: GITHUB,    Icon: GithubIcon },
  { name: "LinkedIn",  href: LINKEDIN,  Icon: LinkedInIcon },
  { name: "Instagram", href: INSTAGRAM, Icon: InstagramIcon },
];

/* ─── data ───────────────────────────────────── */
const TECHS = [
  { name: "Python",  img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "C",       img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "Java",    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "HTML",    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS",     img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "FastAPI", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "MySQL",   img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Vercel",  img: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png" },
];

const PROJECTS = [
  {
    title: "Aura",
    desc: "A high-performance developer portfolio featuring advanced animations, parallax effects, custom cursor interactions, and a futuristic UI built with Next.js and Framer Motion.",
    tag: "Next.js · Framer Motion · UI/UX",
    num: "01",
    color: "#00ffe0",
    github: "https://github.com/kuntal-das-k/Aura",
    live: "https://etherflow-xi.vercel.app",
  },
  {
    title: "Effortless Paper Generator",
    desc: "An intelligent web application that generates WBCHSE-aligned mathematics question papers for Classes 11 & 12, featuring dynamic content generation and a modern glassmorphic UI.",
    tag: "Next.js · Tailwind CSS · EdTech",
    num: "02",
    color: "#00d4ff",
    github: null,
    live: "https://effortlesspapergenerator.vercel.app",
  },
  {
    title: "YouTube Transcript Summarizer API",
    desc: "A scalable RESTful API that extracts YouTube transcripts and generates AI-powered summaries using Google's Gemini 1.5 Flash model.",
    tag: "FastAPI · Gemini AI · Backend",
    num: "03",
    color: "#7b61ff",
    github: "https://github.com/kuntal-das-k/youtube_summary_ai",
    live: null,
  },
];

const NAV = ["About", "Skills", "Projects", "Contact"];

/* ─── Typewriter ─────────────────────────────── */
function TypewriterText({ text, active }: { text: string; active: boolean }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) { setDisplayed(""); setDone(false); return; }
    if (done) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(iv); setDone(true); }
    }, 55);
    return () => clearInterval(iv);
  }, [active, text, done]);

  return (
    <p style={{
      fontFamily: "var(--font-display)", fontSize: "0.92rem", fontWeight: 600,
      color: "#00ffe0", letterSpacing: "0.02em", minWidth: "185px", minHeight: "1.4em",
      whiteSpace: "nowrap",
    }}>
      {displayed}
      {!done && active && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          style={{ display: "inline-block", width: "2px", height: "1em", background: "#00ffe0", marginLeft: "2px", verticalAlign: "middle" }}
        />
      )}
    </p>
  );
}

/* ─── TiltCard (vanilla-tilt wrapper) ─────────── */
function TiltCard({
  children,
  style,
  color,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  color: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tiltInstance: any = null;

    const initTilt = async () => {
      if (!ref.current) return;
      const VanillaTilt = (await import("vanilla-tilt")).default;

      VanillaTilt.init(ref.current, {
        max: 14,
        speed: 500,
        glare: true,
        "max-glare": 0.12,
        perspective: 900,
        scale: 1.03,
      });

      tiltInstance = (ref.current as any).vanillaTilt;
    };

    initTilt();

    return () => {
      if (tiltInstance) tiltInstance.destroy();
    };
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
/* ─── page ───────────────────────────────────── */
export default function Home() {
  const router = useRouter();
  const { scrollY } = useScroll();

  /* parallax layers */
  const yGlow   = useTransform(scrollY, [0, 600], [0, -40]);
  const yFloat1 = useTransform(scrollY, [0, 600], [0, -130]);
  const yFloat2 = useTransform(scrollY, [0, 600], [0, -30]);

  /* scroll-driven boy */
  const boyY         = useTransform(scrollY, [0, 300], [0, -20]);
  const boyScale     = useTransform(scrollY, [0, 300], [1, 1.05]);
  const boyRotateY   = useTransform(scrollY, [0, 80, 250], [0, -8, -14]);
  const waveRotate   = useTransform(scrollY, [60, 160, 260], [0, -30, 0]);
  const greetOpacity = useTransform(scrollY, [60, 140], [0, 1]);
  const greetScale   = useTransform(scrollY, [60, 140], [0.6, 1]);

  /* state */
  const [active, setActive]     = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* particles */
  const [particlesLoaded, setParticlesLoaded] = useState(false);
  const particlesInit = useCallback(async (engine: any) => {
    const { loadSlim } = await import("@tsparticles/slim");
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    setParticlesLoaded(true);
  }, []);

  useEffect(() => {
    const unsub = scrollY.on("change", v => setScrolled(v > 70));
    return unsub;
  }, [scrollY]);

  /* ── MAGNETIC CURSOR ── */
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.id = "mag-cursor";
    Object.assign(cursor.style, {
      position: "fixed", top: "0", left: "0",
      width: "10px", height: "10px",
      borderRadius: "50%",
      background: "#00ffe0",
      pointerEvents: "none",
      zIndex: "99999",
      transition: "width 0.2s ease, height 0.2s ease, opacity 0.3s ease",
      transform: "translate(-50%, -50%)",
      mixBlendMode: "difference",
    });

    const trail = document.createElement("div");
    trail.id = "mag-trail";
    Object.assign(trail.style, {
      position: "fixed", top: "0", left: "0",
      width: "38px", height: "38px",
      borderRadius: "50%",
      border: "1.5px solid rgba(0,255,224,0.5)",
      pointerEvents: "none",
      zIndex: "99998",
      transform: "translate(-50%, -50%)",
      transition: "left 0.12s ease, top 0.12s ease, width 0.25s ease, height 0.25s ease, border-color 0.25s ease",
    });

    document.body.appendChild(cursor);
    document.body.appendChild(trail);

    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top  = `${e.clientY}px`;
      trail.style.left  = `${e.clientX}px`;
      trail.style.top   = `${e.clientY}px`;
    };

    const onEnter = () => {
      cursor.style.width = "6px"; cursor.style.height = "6px";
      trail.style.width = "60px"; trail.style.height = "60px";
      trail.style.borderColor = "rgba(180,127,255,0.7)";
    };
    const onLeave = () => {
      cursor.style.width = "10px"; cursor.style.height = "10px";
      trail.style.width = "38px"; trail.style.height = "38px";
      trail.style.borderColor = "rgba(0,255,224,0.5)";
    };

    window.addEventListener("mousemove", move);

    const attachMagnet = () => {
      document.querySelectorAll("button, a, [data-tilt]").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attachMagnet();
    const observer = new MutationObserver(attachMagnet);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
      cursor.remove();
      trail.remove();
    };
  }, []);

  /* section reveals */
  const aboutRev   = useReveal();
  const skillsRev  = useReveal();
  const projRev    = useReveal();
  const contactRev = useReveal();

  /* active nav highlight */
  useEffect(() => {
    const handler = () => {
      const ids = ["about", "skills", "projects", "contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  /* animation variants */
  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const fadeUp  = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any } } };

  return (
    <>
      {/* ══════ GLOBAL STYLES ══════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --neon-cyan:    #00ffe0;
          --neon-violet:  #b47fff;
          --bg:           #050508;
          --bg-card:      #0d0d14;
          --border:       rgba(255,255,255,0.07);
          --text:         #e8e8f0;
          --muted:        #7a7a9a;
          --font-display: 'Syne', sans-serif;
          --font-body:    'DM Sans', sans-serif;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          overflow-x: hidden;
          cursor: none;
        }

        /* hide default cursor sitewide */
        a, button, [role="button"] { cursor: none !important; }

        ::-webkit-scrollbar       { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--neon-cyan); border-radius: 2px; }

        body::before {
          content: '';
          position: fixed; inset: 0;
          pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          background-size: 200px 200px; opacity: 0.4;
        }

        .sec-label {
          font-family: var(--font-display);
          font-size: clamp(0.65rem, 1.2vw, 0.75rem);
          letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--neon-cyan); margin-bottom: 1rem;
        }
        .sec-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800; line-height: 1.1; color: var(--text);
        }
        .h-line {
          width: 40px; height: 2px; background: var(--neon-cyan);
          margin-bottom: 2rem; border-radius: 2px;
        }

        /* skill card 3D hover */
        .skill-card {
          transform-style: preserve-3d;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, box-shadow 0.3s;
        }
        .skill-card:hover {
          transform: translateY(-10px) rotateX(8deg) rotateY(-6deg) scale(1.05);
          border-color: rgba(0,255,224,0.45) !important;
          box-shadow: 0 24px 60px rgba(0,255,224,0.1), 0 0 0 1px rgba(0,255,224,0.1);
        }
        .skill-card img {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), filter 0.3s;
        }
        .skill-card:hover img {
          transform: translateZ(18px) scale(1.15);
          filter: drop-shadow(0 0 12px rgba(0,255,224,0.5));
        }

        /* project tilt card glare override */
        .js-tilt-glare { border-radius: 20px !important; }

        /* particles canvas */
        #tsparticles {
          position: absolute !important;
          inset: 0 !important;
          z-index: 0 !important;
          pointer-events: none !important;
        }

        @media (max-width: 768px) {
          body { cursor: auto; }
          #mag-cursor, #mag-trail { display: none !important; }
          .nav-desktop   { display: none !important; }
          .hamburger     { display: block !important; }
          .hero-grid     { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .hero-img-wrap { display: none !important; }
          .about-grid    { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 480px) {
          .sec-title { font-size: 2rem !important; }
        }
      `}</style>

      <main style={{ position: "relative", zIndex: 1 }}>

        {/* ══════ NAV ══════ */}
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "1.1rem 5vw",
            background: "rgba(5,5,8,0.78)", backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
            KD<span style={{ color: "var(--neon-cyan)" }}>.</span>
          </span>

          {/* desktop */}
          <ul className="nav-desktop" style={{ display: "flex", gap: "2rem", listStyle: "none", alignItems: "center" }}>
            {NAV.map(n => (
              <li key={n}>
                <button onClick={() => goTo(n)} style={{
                  background: "none", border: "none",
                  fontFamily: "var(--font-body)", fontSize: "0.875rem",
                  color: active === n.toLowerCase() ? "var(--neon-cyan)" : "var(--muted)",
                  transition: "color .2s", letterSpacing: "0.03em",
                }}>{n}</button>
              </li>
            ))}
            <li>
              <button onClick={() => goTo("Contact")} style={{
                background: "transparent", border: "1px solid var(--neon-cyan)",
                color: "var(--neon-cyan)", borderRadius: "6px", padding: "0.45rem 1.1rem",
                fontSize: "0.875rem", fontFamily: "var(--font-body)",
                letterSpacing: "0.04em", transition: "background .2s, color .2s",
              }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "var(--neon-cyan)"; b.style.color = "#050508"; }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = "var(--neon-cyan)"; }}
              >Hire me</button>
            </li>
          </ul>

          {/* hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="menu"
            style={{ display: "none", background: "none", border: "none", padding: "4px" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen
                ? (<><line x1="3" y1="3" x2="19" y2="19" stroke="#00ffe0" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="19" y1="3" x2="3" y2="19" stroke="#00ffe0" strokeWidth="2" strokeLinecap="round"/></>)
                : (<><line x1="3" y1="6"  x2="19" y2="6"  stroke="#e8e8f0" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="3" y1="11" x2="19" y2="11" stroke="#e8e8f0" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="3" y1="16" x2="19" y2="16" stroke="#e8e8f0" strokeWidth="2" strokeLinecap="round"/></>)
              }
            </svg>
          </button>
        </motion.nav>

        {/* mobile menu */}
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{
              position: "fixed", top: "60px", left: 0, right: 0, zIndex: 99,
              background: "rgba(5,5,8,0.97)", backdropFilter: "blur(18px)",
              borderBottom: "1px solid var(--border)",
              display: "flex", flexDirection: "column", padding: "1rem 5vw 1.5rem", gap: "1.25rem",
            }}>
            {[...NAV, "Hire me"].map(n => (
              <button key={n} onClick={() => goTo(n === "Hire me" ? "Contact" : n)}
                style={{ background: "none", border: "none", color: "var(--text)", fontFamily: "var(--font-body)", fontSize: "1rem", textAlign: "left" }}>
                {n}
              </button>
            ))}
          </motion.div>
        )}

        {/* ══════ HERO ══════ */}
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 5vw", paddingTop: "80px", position: "relative", overflow: "hidden" }}>

          {/* ── tsParticles background ── */}
          {particlesLoaded && (
            <div id="tsparticles-wrapper" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
              {/* Dynamic import at runtime — we render a script tag that initializes tsParticles via CDN */}
              <ParticlesBackground />
            </div>
          )}

          {/* bg glows */}
          <div style={{ position: "absolute", top: "15%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(0,255,224,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: "420px", height: "420px", background: "radial-gradient(circle, rgba(180,127,255,0.09) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", width: "100%", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

            {/* LEFT */}
            <motion.div initial="hidden" animate="show" variants={stagger} style={{ position: "relative", zIndex: 1 }}>

              <motion.p variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--neon-cyan)", fontFamily: "var(--font-display)", marginBottom: "1.5rem" }}>
                <span style={{ width: "28px", height: "1px", background: "var(--neon-cyan)" }} />
                Full Stack Developer
              </motion.p>

              <motion.h1 variants={fadeUp} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
                Hi, I'm<br />
                <span style={{ background: "linear-gradient(135deg, #00ffe0 0%, #b47fff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Kuntal<br />Das
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} style={{ color: "var(--muted)", maxWidth: "420px", lineHeight: 1.75, fontSize: "1rem", marginBottom: "2.5rem" }}>
                I build modern web applications with clean UI, smooth animations,
                and high performance — from pixel-perfect interfaces to scalable backends.
              </motion.p>

              <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button onClick={() => goTo("Projects")} style={{ padding: "0.75rem 1.75rem", background: "linear-gradient(135deg, #00ffe0, #b47fff)", border: "none", borderRadius: "8px", color: "#050508", fontWeight: 600, fontSize: "0.9rem", fontFamily: "var(--font-body)", letterSpacing: "0.02em", transition: "opacity .2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = "0.82"}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = "1"}>
                  View Work →
                </button>
                <button
  onClick={() => router.push("/contact")}
  style={{
    padding: "0.75rem 1.75rem",
    background: "transparent",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    color: "var(--text)",
    fontSize: "0.9rem",
    fontFamily: "var(--font-body)",
    letterSpacing: "0.02em",
    transition: "border-color .2s, color .2s",
  }}
  onMouseEnter={(e) => {
    const b = e.currentTarget as HTMLButtonElement;
    b.style.borderColor = "var(--neon-cyan)";
    b.style.color = "var(--neon-cyan)";
  }}
  onMouseLeave={(e) => {
    const b = e.currentTarget as HTMLButtonElement;
    b.style.borderColor = "var(--border)";
    b.style.color = "var(--text)";
  }}
>
  Contact Me
</button>
              </motion.div>

              <motion.div variants={fadeUp} style={{ display: "flex", gap: "0.75rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
                {SOCIALS.map(({ name, href, Icon }) => (
                  <a key={name} href={href} target="_blank" rel="noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.45rem 0.9rem", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--muted)", textDecoration: "none", fontSize: "0.78rem", letterSpacing: "0.04em", transition: "color .2s, border-color .2s" }}
                    onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = "var(--neon-cyan)"; a.style.borderColor = "rgba(0,255,224,0.4)"; }}
                    onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = "var(--muted)"; a.style.borderColor = "var(--border)"; }}
                  >
                    <Icon />{name}
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT: 3D boy + scroll animations */}
            <motion.div className="hero-img-wrap"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "580px" }}>

              {/* ambient glow */}
              <motion.div style={{ y: yGlow, position: "absolute", zIndex: 0, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                <div style={{ width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,224,0.1) 0%, rgba(180,127,255,0.07) 45%, transparent 75%)" }} />
              </motion.div>

              {/* orbit rings */}
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                style={{ position: "absolute", width: "440px", height: "440px", border: "1px dashed rgba(0,255,224,0.12)", borderRadius: "50%", zIndex: 0 }} />
              <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
                style={{ position: "absolute", width: "510px", height: "510px", border: "1px dashed rgba(180,127,255,0.08)", borderRadius: "50%", zIndex: 0 }} />

              {/* boy image — parallax + 3D rotateY on scroll */}
              <motion.div style={{ y: boyY, scale: boyScale, rotateY: boyRotateY, position: "relative", zIndex: 2, perspective: 800 }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <Image
                    src="/boy-3d.png"
                    alt="3D developer boy"
                    width={420} height={520} priority
                    style={{ objectFit: "contain", display: "block", maxWidth: "100%", filter: "drop-shadow(0 0 40px rgba(0,255,224,0.18)) drop-shadow(0 0 80px rgba(180,127,255,0.12))" }}
                  />
                  {/* wave hand */}
                  <motion.div style={{ position: "absolute", top: "5%", right: "-10%", fontSize: "2.8rem", rotate: waveRotate, transformOrigin: "bottom center", opacity: greetOpacity, scale: greetScale, zIndex: 10 }}>
                    <motion.span
                      animate={scrolled ? { rotate: [0, -25, 10, -25, 10, -15, 0] } : { rotate: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut", repeat: scrolled ? Infinity : 0, repeatDelay: 2 }}
                      style={{ display: "inline-block", transformOrigin: "bottom center", fontSize: "2.8rem" }}>
                      👋
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>

              {/* typewriter bubble */}
              <motion.div style={{ position: "absolute", top: "8%", left: "-1rem", opacity: greetOpacity, scale: greetScale, zIndex: 5, y: yFloat1 }}>
                <div style={{ background: "rgba(8,8,18,0.94)", backdropFilter: "blur(16px)", border: "1px solid rgba(0,255,224,0.35)", borderRadius: "16px 16px 16px 4px", padding: "0.9rem 1.3rem", boxShadow: "0 0 30px rgba(0,255,224,0.15), 0 8px 32px rgba(0,0,0,0.5)", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: "-10px", left: "16px", width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "10px solid rgba(0,255,224,0.35)" }} />
                  <TypewriterText active={scrolled} text="Hi there! 👋 I'm Kuntal" />
                </div>
              </motion.div>

              {/* commit badge */}
              <motion.div style={{ y: yFloat1, position: "absolute", top: "18%", right: "-1rem", zIndex: 4 }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9, duration: 0.7 }}>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  style={{ background: "rgba(10,10,20,0.92)", backdropFilter: "blur(14px)", border: "1px solid rgba(0,255,224,0.2)", borderRadius: "14px", padding: "0.8rem 1rem", minWidth: "155px", boxShadow: "0 8px 40px rgba(0,255,224,0.1)" }}>
                  <p style={{ fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.1em", marginBottom: "6px" }}>LATEST COMMIT</p>
                  <code style={{ fontSize: "0.72rem", color: "#00ffe0", fontFamily: "monospace", display: "block", lineHeight: 1.6 }}>
                    git push origin main<br />
                    <span style={{ color: "rgba(180,127,255,0.8)" }}>✓ deployed</span>
                  </code>
                </motion.div>
              </motion.div>

              {/* location badge */}
              <motion.div style={{ y: yFloat2, position: "absolute", bottom: "5%", left: "-1rem", zIndex: 4 }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.7 }}>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  style={{ background: "rgba(10,10,20,0.92)", backdropFilter: "blur(14px)", border: "1px solid var(--border)", borderRadius: "14px", padding: "0.8rem 1.1rem", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
                  <p style={{ fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.1em", marginBottom: "3px" }}>BASED IN</p>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, fontFamily: "var(--font-display)" }}>Kolkata, India 🇮🇳</p>
                </motion.div>
              </motion.div>

              {/* open to work badge */}
              <motion.div style={{ y: yFloat1, position: "absolute", bottom: "14%", right: "-1rem", zIndex: 4 }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.7 }}>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  style={{ background: "rgba(10,10,20,0.92)", backdropFilter: "blur(14px)", border: "1px solid rgba(0,255,224,0.22)", borderRadius: "14px", padding: "0.7rem 1rem", boxShadow: "0 4px 24px rgba(0,255,224,0.1)" }}>
                  <p style={{ fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.1em", marginBottom: "3px" }}>STATUS</p>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#00ffe0", fontFamily: "var(--font-display)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}
                      style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00ffe0", display: "inline-block", flexShrink: 0 }} />
                    Open to work
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* scroll hint */}
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", zIndex: 1 }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--muted)", textTransform: "uppercase" }}>Scroll</p>
            <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--muted), transparent)" }} />
          </motion.div>
        </section>

        {/* ══════ ABOUT ══════ */}
        <section id="about" style={{ padding: "7rem 5vw", maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div ref={aboutRev.ref} initial={{ opacity: 0, y: 40 }} animate={aboutRev.inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <p className="sec-label">About Me</p>
            <div className="h-line" />
            <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
              <div>
                <h2 className="sec-title" style={{ marginBottom: "1.5rem" }}>
                  Crafting digital<br /><span style={{ color: "var(--neon-cyan)" }}>experiences</span>
                </h2>
                <p style={{ color: "var(--muted)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                  I'm a CSE student passionate about backend systems and modern web tech.
                  I love building scalable APIs that are fast, clean, and developer-friendly —
                  paired with interfaces that feel good to use.
                </p>
                <p style={{ color: "var(--muted)", lineHeight: 1.85 }}>
                  When I'm not coding, you'll find me exploring new frameworks, contributing
                  to open-source, or geeking out over system design.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { num: "2+", label: "Years of coding" },
                  { num: "5+", label: "Projects built" },
                  { num: "8+", label: "Technologies" },
                  { num: "∞",  label: "Cups of chai ☕" },
                ].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={aboutRev.inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.15 * i, duration: 0.5 }}
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem" }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 800, background: "linear-gradient(135deg, #00ffe0, #b47fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.4rem" }}>{s.num}</p>
                    <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══════ SKILLS ══════ */}
        <section id="skills" style={{ padding: "7rem 5vw", background: "rgba(255,255,255,0.01)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.div ref={skillsRev.ref} initial={{ opacity: 0, y: 30 }} animate={skillsRev.inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <p className="sec-label">Tech Stack</p>
              <div className="h-line" />
              <h2 className="sec-title" style={{ marginBottom: "3rem" }}>Tools I work with</h2>
            </motion.div>
            <motion.div ref={skillsRev.ref} initial="hidden" animate={skillsRev.inView ? "show" : "hidden"} variants={stagger}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "1rem" }}>
              {TECHS.map((tech, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="skill-card"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "1.5rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.75rem",
                    cursor: "default",
                    perspective: "600px",
                  }}
                >
                  <Image src={tech.img} alt={tech.name} width={38} height={38} style={{ objectFit: "contain" }} />
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)", textAlign: "center", fontFamily: "var(--font-body)" }}>{tech.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════ PROJECTS ══════ */}
        <section id="projects" style={{ padding: "7rem 5vw" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.div ref={projRev.ref} initial={{ opacity: 0, y: 30 }} animate={projRev.inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <p className="sec-label">Projects</p>
              <div className="h-line" />
              <h2 className="sec-title" style={{ marginBottom: "3rem" }}>Selected work</h2>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {PROJECTS.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={projRev.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TiltCard
  color={p.color}
  onClick={() => {
    if (p.live) {
      window.open(p.live, "_blank");
    } else if (p.github) {
      window.open(p.github, "_blank");
    }
  }}
                    style={{
                      background: "var(--bg-card)",
                      border: `1px solid var(--border)`,
                      borderRadius: "20px",
                      padding: "2rem",
                      transition: "border-color .25s",
                    }}
                    onMouseEnter={() => {
                      const el = document.querySelectorAll(".project-tilt-card")[i] as HTMLElement;
                      if (el) el.style.borderColor = p.color + "55";
                    }}
                    onMouseLeave={() => {
                      const el = document.querySelectorAll(".project-tilt-card")[i] as HTMLElement;
                      if (el) el.style.borderColor = "var(--border)";
                    }}
                  >
                    {/* inner content with translateZ depth layers */}
                    <div style={{ position: "absolute", top: 0, right: 0, width: "200px", height: "200px", background: `radial-gradient(circle at top right, ${p.color}0a, transparent 70%)`, pointerEvents: "none", borderRadius: "0 20px 0 0" }} />
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "4rem", fontWeight: 800, color: p.color + "18", lineHeight: 1, marginBottom: "1.5rem", letterSpacing: "-0.04em", transform: "translateZ(5px)" }}>{p.num}</p>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 700, marginBottom: "0.75rem", letterSpacing: "-0.02em", transform: "translateZ(30px)" }}>{p.title}</h3>
                    <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "1.5rem", transform: "translateZ(20px)" }}>{p.desc}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", transform: "translateZ(25px)" }}>
  <span
    style={{
      fontSize: "0.72rem",
      letterSpacing: "0.08em",
      color: p.color,
      fontFamily: "var(--font-display)",
      background: p.color + "15",
      borderRadius: "6px",
      padding: "0.3rem 0.75rem",
    }}
  >
    {p.tag}
  </span>
  <span style={{ color: "var(--muted)", fontSize: "1.1rem" }}>→</span>
</div>

{/* ✅ ADD HERE */}
<div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
  {p.live && (
    <button
      onClick={(e) => {
        e.stopPropagation();
        window.open(p.live, "_blank");
      }}
      title="View Live Project"
      style={{
        padding: "0.3rem 0.7rem",
        fontSize: "0.7rem",
        borderRadius: "6px",
        border: "1px solid var(--border)",
        background: "transparent",
        color: "var(--text)",
        cursor: "pointer",
      }}
    >
      Live
    </button>
  )}

  {p.github && (
    <button
      onClick={(e) => {
        e.stopPropagation();
        window.open(p.github, "_blank");
      }}
      title="View Source Code"
      style={{
        padding: "0.3rem 0.7rem",
        fontSize: "0.7rem",
        borderRadius: "6px",
        border: "1px solid var(--border)",
        background: "transparent",
        color: "var(--text)",
        cursor: "pointer",
      }}
    >
      Code
    </button>
  )}
</div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ CONTACT ══════ */}
        <section id="contact" style={{ padding: "7rem 5vw 5rem" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
            <motion.div ref={contactRev.ref} initial={{ opacity: 0, y: 40 }} animate={contactRev.inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>

              <p className="sec-label" style={{ textAlign: "center" }}>Contact</p>
              <div className="h-line" style={{ margin: "0 auto 2rem" }} />

              <h2 className="sec-title" style={{ marginBottom: "1.25rem" }}>
                Let's build something<br />
                <span style={{ color: "var(--neon-cyan)" }}>together</span>
              </h2>

              <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: "3rem", fontSize: "1rem" }}>
                I'm currently open to freelance projects and full-time opportunities.
                If you have a great idea or just want to say hi — my inbox is always open.
              </p>

              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={copyEmail}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", background: "var(--bg-card)", border: "1px solid rgba(0,255,224,0.25)", borderRadius: "12px", padding: "1rem 2rem", marginBottom: "3rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--text)" }}>{EMAIL}</span>
                <span style={{ fontSize: "0.7rem", color: copied ? "var(--neon-cyan)" : "var(--muted)", letterSpacing: "0.05em", transition: "color .2s" }}>
                  {copied ? "COPIED ✓" : "COPY"}
                </span>
              </motion.button>

              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                {SOCIALS.map(({ name, href, Icon }) => (
                  <motion.a key={name} href={href} target="_blank" rel="noreferrer" whileHover={{ y: -3 }}
                    style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--muted)", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.04em", border: "1px solid var(--border)", borderRadius: "10px", padding: "0.65rem 1.25rem", background: "var(--bg-card)", transition: "color .2s, border-color .2s" }}
                    onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = "var(--neon-cyan)"; a.style.borderColor = "rgba(0,255,224,0.4)"; }}
                    onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = "var(--muted)"; a.style.borderColor = "var(--border)"; }}>
                    <Icon />{name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════ FOOTER ══════ */}
        <footer style={{ borderTop: "1px solid var(--border)", padding: "1.5rem 5vw", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ color: "var(--muted)", fontSize: "0.8rem" }}>© 2025 Kuntal Das. All rights reserved.</p>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {SOCIALS.map(({ name, href, Icon }) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" title={name}
                style={{ color: "var(--muted)", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--neon-cyan)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"}>
                <Icon />
              </a>
            ))}
          </div>
          <p style={{ color: "var(--muted)", fontSize: "0.8rem" }}>
            Built with <span style={{ color: "var(--neon-cyan)" }}>Next.js</span> &amp; <span style={{ color: "var(--neon-violet)" }}>Framer Motion</span>
          </p>
        </footer>

      </main>
    </>
  );
}

/* ─── Particles Background Component ─────────── */
function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    const init = async () => {
      const { tsParticles } = await import("@tsparticles/engine");
      const { loadSlim } = await import("@tsparticles/slim");

      await loadSlim(tsParticles);

      const container = await tsParticles.load({
        id: "hero-particles",
        element: containerRef.current ?? undefined,
        options: {
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            number: {
              value: 70,
              density: { enable: true, width: 900 },
            },
            color: {
              value: ["#00ffe0", "#b47fff", "#ffffff"],
            },
            shape: { type: "circle" },
            opacity: {
              value: { min: 0.1, max: 0.5 },
              animation: {
                enable: true,
                speed: 0.8,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: 2.5 },
            },
            links: {
              enable: true,
              distance: 130,
              color: "#00ffe0",
              opacity: 0.07,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "bounce" },
            },
          },
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: { enable: true, mode: "grab" },
              resize: { enable: true },
            },
            modes: {
              grab: {
                distance: 160,
                links: { opacity: 0.25, color: "#00ffe0" },
              },
            },
          },
          detectRetina: true,
        },
      });

      cleanup = () => container?.destroy();
    };

    init().catch(console.error);

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}