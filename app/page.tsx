"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import ChatWidget from "@/components/ChatWidget";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import heroAnimationData from "@/public/hero-lottie.json";

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

const EMAIL = "daskuntal688@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/kuntal-das-271805287/";
const INSTAGRAM = "https://www.instagram.com/kuntal_xd";
const GITHUB = "https://github.com/kuntal-das-k";

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
);
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
);

const SOCIALS = [
  { name: "GitHub", href: GITHUB, Icon: GithubIcon },
  { name: "LinkedIn", href: LINKEDIN, Icon: LinkedInIcon },
  { name: "Instagram", href: INSTAGRAM, Icon: InstagramIcon },
];

const TECHS = [
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "C", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "Java", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "HTML", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "FastAPI", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Vercel", img: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png" },
];

const PROJECTS = [
  {
    title: "Aura",
    desc: "A high-performance developer portfolio featuring advanced animations, parallax effects, custom cursor interactions, and a futuristic UI built with Next.js and Framer Motion.",
    tag: "Next.js · Framer Motion · UI/UX",
    num: "01",
    color: "#ffe17c",
    github: "https://github.com/kuntal-das-k/Aura",
    live: "https://etherflow-xi.vercel.app",
  },
  {
    title: "Effortless Paper Generator",
    desc: "An intelligent web application that generates WBCHSE-aligned mathematics question papers for Classes 11 & 12, featuring dynamic content generation and a modern glassmorphic UI.",
    tag: "Next.js · Tailwind CSS · EdTech",
    num: "02",
    color: "#b7c6c2",
    github: null,
    live: "https://effortlesspapergenerator.vercel.app",
  },
  {
    title: "IntelliTest",
    desc: "An AI-powered SaaS platform that generates WBCHSE-aligned mathematics question papers with multi-model AI fallback, coupon-based access, and browser-native PDF generation.",
    tag: "Next.js · AI · EdTech SaaS",
    num: "03",
    color: "#171e19",
    github: "https://github.com/kuntal-das-k/IntelliTest",
    live: "https://intelli-test-paper.vercel.app/",
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
    <p style={{ fontFamily: "var(--font-display)", fontSize: "0.92rem", fontWeight: 700, color: "#000", letterSpacing: "0.02em", minWidth: "185px", minHeight: "1.4em", whiteSpace: "nowrap" }}>
      {displayed}
      {!done && active && (
        <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}
          style={{ display: "inline-block", width: "2px", height: "1em", background: "#000", marginLeft: "2px", verticalAlign: "middle" }} />
      )}
    </p>
  );
}

/* ─── TiltCard ─────────────────────────────── */
function TiltCard({ children, style, color, onClick, onMouseEnter, onMouseLeave }: {
  children: React.ReactNode; style?: React.CSSProperties; color: string;
  onClick?: () => void; onMouseEnter?: () => void; onMouseLeave?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let tiltInstance: any = null;
    const initTilt = async () => {
      if (!ref.current) return;
      const VanillaTilt = (await import("vanilla-tilt")).default;
      VanillaTilt.init(ref.current, { max: 8, speed: 500, glare: false, perspective: 900, scale: 1.02 });
      tiltInstance = (ref.current as any).vanillaTilt;
    };
    initTilt();
    return () => { if (tiltInstance) tiltInstance.destroy(); };
  }, []);
  return (
    <div ref={ref} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      style={{ ...style, transformStyle: "preserve-3d", cursor: "pointer", position: "relative", overflow: "hidden" }}>
      {children}
    </div>
  );
}

/* ─── page ───────────────────────────────────── */
export default function Home() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const yFloat1 = useTransform(scrollY, [0, 600], [0, -130]);
  const yFloat2 = useTransform(scrollY, [0, 600], [0, -30]);
  const boyY = useTransform(scrollY, [0, 300], [0, -20]);
  const boyScale = useTransform(scrollY, [0, 300], [1, 1.05]);
  const boyRotateY = useTransform(scrollY, [0, 80, 250], [0, -8, -14]);
  const waveRotate = useTransform(scrollY, [60, 160, 260], [0, -30, 0]);
  const greetOpacity = useTransform(scrollY, [60, 140], [0, 1]);
  const greetScale = useTransform(scrollY, [60, 140], [0.6, 1]);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [particlesLoaded, setParticlesLoaded] = useState(false);
  const particlesInit = useCallback(async (engine: any) => {
    const { loadSlim } = await import("@tsparticles/slim");
    await loadSlim(engine);
  }, []);
  useEffect(() => { setParticlesLoaded(true); }, []);
  useEffect(() => {
    const unsub = scrollY.on("change", v => setScrolled(v > 70));
    return unsub;
  }, [scrollY]);

  /* MAGNETIC CURSOR */
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.id = "mag-cursor";
    Object.assign(cursor.style, {
      position: "fixed", top: "0", left: "0", width: "10px", height: "10px",
      borderRadius: "50%", background: "#000", pointerEvents: "none", zIndex: "99999",
      transition: "width 0.2s ease, height 0.2s ease", transform: "translate(-50%, -50%)",
    });
    const trail = document.createElement("div");
    trail.id = "mag-trail";
    Object.assign(trail.style, {
      position: "fixed", top: "0", left: "0", width: "38px", height: "38px",
      borderRadius: "50%", border: "2px solid rgba(0,0,0,0.4)", pointerEvents: "none", zIndex: "99998",
      transform: "translate(-50%, -50%)", transition: "left 0.12s ease, top 0.12s ease, width 0.25s ease, height 0.25s ease",
    });
    document.body.appendChild(cursor);
    document.body.appendChild(trail);
    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`;
      trail.style.left = `${e.clientX}px`; trail.style.top = `${e.clientY}px`;
    };
    const onEnter = () => { cursor.style.width = "6px"; cursor.style.height = "6px"; trail.style.width = "60px"; trail.style.height = "60px"; trail.style.borderColor = "rgba(0,0,0,0.7)"; };
    const onLeave = () => { cursor.style.width = "10px"; cursor.style.height = "10px"; trail.style.width = "38px"; trail.style.height = "38px"; trail.style.borderColor = "rgba(0,0,0,0.4)"; };
    window.addEventListener("mousemove", move);
    const attachMagnet = () => { document.querySelectorAll("button, a, [data-tilt]").forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); }); };
    attachMagnet();
    const observer = new MutationObserver(attachMagnet);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener("mousemove", move); observer.disconnect(); cursor.remove(); trail.remove(); };
  }, []);

  const aboutRev = useReveal(); const skillsRev = useReveal(); const projRev = useReveal(); const contactRev = useReveal();
  useEffect(() => {
    const handler = () => { const ids = ["about", "skills", "projects", "contact"]; for (const id of [...ids].reverse()) { const el = document.getElementById(id); if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; } } };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  const goTo = (id: string) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const copyEmail = () => { navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 2200); };
  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any } } };

  /* push-button hover helpers */
  const pushEnter = (e: React.MouseEvent) => { const b = e.currentTarget as HTMLElement; b.style.transform = "translate(4px,4px)"; b.style.boxShadow = "0 0 0 0 #000"; };
  const pushLeave = (e: React.MouseEvent, shadow = "4px 4px 0px 0px #000") => { const b = e.currentTarget as HTMLElement; b.style.transform = "translate(0,0)"; b.style.boxShadow = shadow; };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --primary: #ffe17c; --bg-dark: #171e19; --accent: #b7c6c2;
          --text: #000; --font-display: 'Cabinet Grotesk', sans-serif; --font-body: 'Satoshi', sans-serif;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--primary); color: var(--text); font-family: var(--font-body); font-weight: 500; overflow-x: hidden; cursor: none; }
        a, button, [role="button"] { cursor: none !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg-dark); }
        ::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 0; }
        .sec-label { font-family: var(--font-display); font-size: clamp(0.65rem,1.2vw,0.75rem); letter-spacing: 0.25em; text-transform: uppercase; color: var(--bg-dark); margin-bottom: 1rem; font-weight: 700; }
        .sec-title { font-family: var(--font-display); font-size: clamp(2rem,5vw,3.5rem); font-weight: 800; line-height: 1.1; color: var(--text); letter-spacing: -0.03em; }
        .h-line { width: 40px; height: 3px; background: #000; margin-bottom: 2rem; }
        .skill-card { transition: transform 0.2s cubic-bezier(0.175,0.885,0.32,1.275), box-shadow 0.2s; }
        .skill-card:hover { transform: translate(2px,2px); box-shadow: 2px 2px 0px 0px #000 !important; }
        .dot-pattern { background-image: radial-gradient(circle, #000 1px, transparent 1px); background-size: 32px 32px; opacity: 0.06; position: absolute; inset: 0; pointer-events: none; z-index: 0; }
        @media (max-width: 768px) {
          body { cursor: auto; }
          #mag-cursor, #mag-trail { display: none !important; }
          .nav-desktop { display: none !important; }
          .hamburger { display: block !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .hero-img-wrap { display: none !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 480px) { .sec-title { font-size: 2rem !important; } }
      `}</style>

      <main style={{ position: "relative", zIndex: 1 }}>

        {/* ══════ NAV ══════ */}
        <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 5vw", height: "80px", background: "#ffe17c", borderBottom: "2px solid #000" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "28px", height: "28px", background: "#000", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffe17c", fontSize: "16px", fontWeight: 800 }}>⚡</span>
            KD<span style={{ color: "#171e19" }}>.</span>
          </span>
          <ul className="nav-desktop" style={{ display: "flex", gap: "2rem", listStyle: "none", alignItems: "center" }}>
            {NAV.map(n => (
              <li key={n}><button onClick={() => goTo(n)} style={{ background: "none", border: "none", fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 700, color: active === n.toLowerCase() ? "#000" : "#171e19aa", transition: "color .2s", letterSpacing: "0.03em" }}>{n}</button></li>
            ))}
            <li>
              <a href="/resume.pdf" download
                style={{ background: "#000", color: "#fff", border: "2px solid #000", borderRadius: "8px", padding: "0.5rem 1.1rem", fontSize: "0.875rem", fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: "0.04em", textDecoration: "none", display: "inline-block", boxShadow: "4px 4px 0px 0px #000", transition: "all 0.2s cubic-bezier(0.175,0.885,0.32,1.275)" }}
                onMouseEnter={pushEnter} onMouseLeave={e => pushLeave(e)}>
                Download Resume
              </a>
            </li>
          </ul>
          <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="menu"
            style={{ display: "none", background: "none", border: "none", padding: "4px" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen
                ? <><line x1="3" y1="3" x2="19" y2="19" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/><line x1="19" y1="3" x2="3" y2="19" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/></>
                : <><line x1="3" y1="6" x2="19" y2="6" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/><line x1="3" y1="11" x2="19" y2="11" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/><line x1="3" y1="16" x2="19" y2="16" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/></>}
            </svg>
          </button>
        </motion.nav>

        {/* mobile menu */}
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ position: "fixed", top: "80px", left: 0, right: 0, zIndex: 99, background: "#ffe17c", borderBottom: "2px solid #000", display: "flex", flexDirection: "column", padding: "1rem 5vw 1.5rem", gap: "1.25rem" }}>
            {[...NAV, "Hire me"].map(n => (
              <button key={n} onClick={() => goTo(n === "Hire me" ? "Contact" : n)}
                style={{ background: "none", border: "none", color: "#000", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 700, textAlign: "left" }}>{n}</button>
            ))}
          </motion.div>
        )}

        {/* ══════ HERO ══════ */}
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 5vw", paddingTop: "80px", position: "relative", overflow: "hidden", background: "#ffe17c" }}>
          <div className="dot-pattern" />
          {particlesLoaded && <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}><ParticlesBackground /></div>}

          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", width: "100%", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <motion.div initial="hidden" animate="show" variants={stagger} style={{ position: "relative", zIndex: 1 }}>
              <motion.div variants={fadeUp} style={{ display: "inline-block", background: "#fff", border: "2px solid #000", borderRadius: "100px", padding: "0.4rem 1rem", marginBottom: "1.5rem", boxShadow: "3px 3px 0px 0px #000" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-display)" }}>NEW: Full Stack Developer 2.0</span>
              </motion.div>
              <motion.h1 variants={fadeUp} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.8rem,7vw,5.5rem)", lineHeight: 1.0, letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>
                Hi, I&apos;m<br />
                <span>Kuntal</span><br />
                <span style={{ WebkitTextStroke: "2.5px #000", WebkitTextFillColor: "transparent" }}>Das</span>
              </motion.h1>
              <motion.p variants={fadeUp} style={{ color: "#171e19cc", maxWidth: "420px", lineHeight: 1.75, fontSize: "1rem", marginBottom: "2.5rem" }}>
                I build modern web applications with clean UI, smooth animations, and high performance — from pixel-perfect interfaces to scalable backends.
              </motion.p>
              <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button onClick={() => goTo("Projects")}
                  style={{ padding: "0.85rem 2rem", background: "#000", color: "#fff", border: "2px solid #000", borderRadius: "10px", fontWeight: 700, fontSize: "0.9rem", fontFamily: "var(--font-body)", boxShadow: "8px 8px 0px 0px #000", transition: "all 0.2s cubic-bezier(0.175,0.885,0.32,1.275)" }}
                  onMouseEnter={pushEnter} onMouseLeave={e => pushLeave(e, "8px 8px 0px 0px #000")}>
                  View Work →
                </button>
                <button onClick={() => router.push("/contact")}
                  style={{ padding: "0.85rem 2rem", background: "#fff", color: "#000", border: "2px solid #000", borderRadius: "10px", fontWeight: 700, fontSize: "0.9rem", fontFamily: "var(--font-body)", boxShadow: "4px 4px 0px 0px #000", transition: "all 0.2s cubic-bezier(0.175,0.885,0.32,1.275)" }}
                  onMouseEnter={pushEnter} onMouseLeave={e => pushLeave(e)}>
                  Contact Me
                </button>
              </motion.div>
              <motion.div variants={fadeUp} style={{ display: "flex", gap: "0.75rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
                {SOCIALS.map(({ name, href, Icon }) => (
                  <a key={name} href={href} target="_blank" rel="noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.5rem 1rem", border: "2px solid #000", borderRadius: "8px", color: "#000", textDecoration: "none", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", background: "#fff", boxShadow: "3px 3px 0px 0px #000", transition: "all 0.2s cubic-bezier(0.175,0.885,0.32,1.275)" }}
                    onMouseEnter={pushEnter} onMouseLeave={e => pushLeave(e, "3px 3px 0px 0px #000")}>
                    <Icon />{name}
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT: boy in browser mockup */}
            <motion.div className="hero-img-wrap" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "580px" }}>
              {/* browser mockup frame */}
              <motion.div style={{ y: boyY, scale: boyScale, rotateY: boyRotateY, position: "relative", zIndex: 2, perspective: 800 }}>
                <div style={{ background: "#c4c4c4", border: "2px solid #000", borderRadius: "12px", boxShadow: "12px 12px 0px 0px #000", overflow: "hidden" }}>
                  <div style={{ background: "#000", padding: "10px 14px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }} />
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
                  </div>
                  <div style={{ overflow: "hidden", margin: "-2px -10px -40px -10px" }}>
                    <Lottie animationData={heroAnimationData} loop autoplay style={{ width: 400, height: 480, display: "block", maxWidth: "none" }} />
                  </div>
                </div>
              </motion.div>

              {/* typewriter bubble */}
              <motion.div style={{ position: "absolute", top: "5%", left: "-1rem", opacity: greetOpacity, scale: greetScale, zIndex: 5, y: yFloat1 }}>
                <div style={{ background: "#fff", border: "2px solid #000", borderRadius: "12px", padding: "0.9rem 1.3rem", boxShadow: "4px 4px 0px 0px #000" }}>
                  <TypewriterText active={scrolled} text="Hi there! 👋 I'm Kuntal" />
                </div>
              </motion.div>

              {/* commit badge */}
              <motion.div style={{ y: yFloat1, position: "absolute", top: "18%", right: "-1rem", zIndex: 4 }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9, duration: 0.7 }}>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  style={{ background: "#fff", border: "2px solid #000", borderRadius: "12px", padding: "0.8rem 1rem", minWidth: "155px", boxShadow: "4px 4px 0px 0px #000" }}>
                  <p style={{ fontSize: "0.6rem", color: "#171e19aa", letterSpacing: "0.1em", marginBottom: "6px", fontWeight: 700 }}>LATEST COMMIT</p>
                  <code style={{ fontSize: "0.72rem", color: "#000", fontFamily: "monospace", display: "block", lineHeight: 1.6, fontWeight: 600 }}>
                    git push origin main<br /><span style={{ color: "#28c840" }}>✓ deployed</span>
                  </code>
                </motion.div>
              </motion.div>

              {/* location badge */}
              <motion.div style={{ y: yFloat2, position: "absolute", bottom: "18%", left: "-1rem", zIndex: 4 }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.7 }}>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  style={{ background: "#fff", border: "2px solid #000", borderRadius: "12px", padding: "0.8rem 1.1rem", boxShadow: "4px 4px 0px 0px #000" }}>
                  <p style={{ fontSize: "0.6rem", color: "#171e19aa", letterSpacing: "0.1em", marginBottom: "3px", fontWeight: 700 }}>BASED IN</p>
                  <p style={{ fontSize: "0.9rem", fontWeight: 800, fontFamily: "var(--font-display)" }}>Kolkata, India 🇮🇳</p>
                </motion.div>
              </motion.div>

              {/* open to work badge */}
              <motion.div style={{ y: yFloat1, position: "absolute", bottom: "8%", right: "-1rem", zIndex: 4 }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.7 }}>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  style={{ background: "#171e19", border: "2px solid #000", borderRadius: "12px", padding: "0.7rem 1rem", boxShadow: "4px 4px 0px 0px #000" }}>
                  <p style={{ fontSize: "0.6rem", color: "#b7c6c2", letterSpacing: "0.1em", marginBottom: "3px", fontWeight: 700 }}>STATUS</p>
                  <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#ffe17c", fontFamily: "var(--font-display)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}
                      style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ffe17c", display: "inline-block", flexShrink: 0 }} />
                    Open to work
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* scroll hint */}
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", zIndex: 1 }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#171e19aa", textTransform: "uppercase", fontWeight: 700 }}>Scroll</p>
            <div style={{ width: "2px", height: "40px", background: "linear-gradient(to bottom, #000, transparent)" }} />
          </motion.div>
        </section>

        {/* ══════ SOCIAL PROOF MARQUEE ══════ */}
        <div style={{ background: "#171e19", borderBottom: "2px solid #000", padding: "1.2rem 0", overflow: "hidden", position: "relative" }}>
          <motion.div animate={{ x: [0, -1200] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            style={{ display: "flex", gap: "4rem", whiteSpace: "nowrap", width: "fit-content" }}>
            {["NEXT.JS", "REACT", "PYTHON", "FASTAPI", "TYPESCRIPT", "VERCEL", "MYSQL", "TAILWIND", "NEXT.JS", "REACT", "PYTHON", "FASTAPI", "TYPESCRIPT", "VERCEL", "MYSQL", "TAILWIND"].map((t, i) => (
              <span key={i} style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#b7c6c2", opacity: 0.5, letterSpacing: "0.15em" }}>{t}</span>
            ))}
          </motion.div>
        </div>

        {/* ══════ ABOUT ══════ */}
        <section id="about" style={{ padding: "7rem 5vw", maxWidth: "1200px", margin: "0 auto", background: "transparent" }}>
          <motion.div ref={aboutRev.ref} initial={{ opacity: 0, y: 40 }} animate={aboutRev.inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ background: "#fff", border: "2px solid #000", borderRadius: "12px", padding: "3rem", boxShadow: "8px 8px 0px 0px #000" }}>
              <p className="sec-label">About Me</p>
              <div className="h-line" />
              <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
                <div>
                  <h2 className="sec-title" style={{ marginBottom: "1.5rem" }}>
                    Crafting digital<br /><span style={{ WebkitTextStroke: "2px #000", WebkitTextFillColor: "transparent" }}>experiences</span>
                  </h2>
                  <p style={{ color: "#171e19cc", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                    I&apos;m a CSE student passionate about backend systems and modern web tech.
                    I love building scalable APIs that are fast, clean, and developer-friendly —
                    paired with interfaces that feel good to use.
                  </p>
                  <p style={{ color: "#171e19cc", lineHeight: 1.85 }}>
                    When I&apos;m not coding, you&apos;ll find me exploring new frameworks, contributing
                    to open-source, or geeking out over system design.
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[
                    { num: "2+", label: "Years of coding" },
                    { num: "5+", label: "Projects built" },
                    { num: "8+", label: "Technologies" },
                    { num: "∞", label: "Cups of chai ☕" },
                  ].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={aboutRev.inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.15 * i, duration: 0.5 }}
                      style={{ background: "#ffe17c", border: "2px solid #000", borderRadius: "12px", padding: "1.5rem", boxShadow: "4px 4px 0px 0px #000" }}>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 800, color: "#000", marginBottom: "0.4rem" }}>{s.num}</p>
                      <p style={{ color: "#171e19cc", fontSize: "0.85rem", fontWeight: 600 }}>{s.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══════ SKILLS ══════ */}
        <section id="skills" style={{ padding: "7rem 5vw", background: "#ffe17c", borderTop: "2px solid #000", borderBottom: "2px solid #000", position: "relative" }}>
          <div className="dot-pattern" />
          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <motion.div ref={skillsRev.ref} initial={{ opacity: 0, y: 30 }} animate={skillsRev.inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <p className="sec-label">Tech Stack</p>
              <div className="h-line" />
              <h2 className="sec-title" style={{ marginBottom: "3rem" }}>Tools I work with</h2>
            </motion.div>
            <motion.div initial="hidden" animate={skillsRev.inView ? "show" : "hidden"} variants={stagger}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "1rem" }}>
              {TECHS.map((tech, i) => (
                <motion.div key={i} variants={fadeUp} className="skill-card"
                  style={{ background: "#fff", border: "2px solid #000", borderRadius: "12px", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", cursor: "default", boxShadow: "4px 4px 0px 0px #000" }}>
                  <div style={{ width: "44px", height: "44px", background: "#b7c6c2", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #000", transition: "background 0.2s" }}>
                    <Image src={tech.img} alt={tech.name} width={28} height={28} style={{ objectFit: "contain" }} />
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#000", textAlign: "center", fontFamily: "var(--font-body)", fontWeight: 700 }}>{tech.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════ PROJECTS ══════ */}
        <section id="projects" style={{ padding: "7rem 5vw", background: "#fff" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.div ref={projRev.ref} initial={{ opacity: 0, y: 30 }} animate={projRev.inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <p className="sec-label">Projects</p>
              <div className="h-line" />
              <h2 className="sec-title" style={{ marginBottom: "3rem" }}>Selected work</h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {PROJECTS.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={projRev.inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
                  <TiltCard color={p.color}
                    onClick={() => { if (p.live) window.open(p.live, "_blank"); else if (p.github) window.open(p.github, "_blank"); }}
                    style={{ background: "#fff", border: "2px solid #000", borderRadius: "12px", padding: "2rem", boxShadow: "8px 8px 0px 0px #000", transition: "transform 0.2s, box-shadow 0.2s" }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "4rem", fontWeight: 800, color: p.color === "#171e19" ? "#171e1918" : p.color + "55", lineHeight: 1, marginBottom: "1.5rem", letterSpacing: "-0.04em" }}>{p.num}</p>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 800, marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>{p.title}</h3>
                    <p style={{ color: "#171e19cc", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>{p.desc}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.72rem", letterSpacing: "0.06em", color: "#000", fontFamily: "var(--font-display)", fontWeight: 700, background: p.color === "#171e19" ? "#b7c6c2" : p.color, borderRadius: "6px", padding: "0.35rem 0.75rem", border: "1.5px solid #000" }}>{p.tag}</span>
                      <span style={{ color: "#000", fontSize: "1.1rem", fontWeight: 800 }}>→</span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                      {p.live && (
                        <button onClick={(e) => { e.stopPropagation(); window.open(p.live, "_blank"); }}
                          style={{ padding: "0.35rem 0.8rem", fontSize: "0.72rem", borderRadius: "6px", border: "2px solid #000", background: "#ffe17c", color: "#000", fontWeight: 700, boxShadow: "2px 2px 0px 0px #000", transition: "all 0.2s" }}
                          onMouseEnter={pushEnter} onMouseLeave={e => pushLeave(e, "2px 2px 0px 0px #000")}>
                          Live ↗
                        </button>
                      )}
                      {p.github && (
                        <button onClick={(e) => { e.stopPropagation(); window.open(p.github, "_blank"); }}
                          style={{ padding: "0.35rem 0.8rem", fontSize: "0.72rem", borderRadius: "6px", border: "2px solid #000", background: "#fff", color: "#000", fontWeight: 700, boxShadow: "2px 2px 0px 0px #000", transition: "all 0.2s" }}
                          onMouseEnter={pushEnter} onMouseLeave={e => pushLeave(e, "2px 2px 0px 0px #000")}>
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

        {/* ══════ RESUME ══════ */}
        <section style={{ padding: "6rem 2rem", display: "flex", justifyContent: "center", background: "#171e19", borderTop: "2px solid #000", borderBottom: "2px solid #000" }}>
          <div style={{ maxWidth: "700px", width: "100%", background: "#171e19", border: "2px solid #b7c6c244", borderRadius: "12px", padding: "2.5rem", textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", marginBottom: "1rem", fontFamily: "var(--font-display)" }}>Resume</h2>
            <p style={{ color: "#b7c6c2", fontSize: "0.95rem", marginBottom: "2rem" }}>Download my resume to learn more about my skills, projects, and experience.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <a href="/resume.pdf" target="_blank"
                style={{ padding: "0.75rem 1.5rem", borderRadius: "10px", border: "2px solid #b7c6c2", color: "#b7c6c2", textDecoration: "none", fontSize: "0.85rem", fontWeight: 700, boxShadow: "4px 4px 0px 0px #b7c6c244", transition: "all 0.2s" }}
                onMouseEnter={pushEnter} onMouseLeave={e => pushLeave(e, "4px 4px 0px 0px #b7c6c244")}>
                View Resume
              </a>
              <a href="/resume.pdf" download
                style={{ padding: "0.75rem 1.5rem", borderRadius: "10px", background: "#ffe17c", color: "#000", border: "2px solid #000", textDecoration: "none", fontSize: "0.85rem", fontWeight: 700, boxShadow: "4px 4px 0px 0px #ffe17c88", transition: "all 0.2s" }}
                onMouseEnter={pushEnter} onMouseLeave={e => pushLeave(e, "4px 4px 0px 0px #ffe17c88")}>
                Download Resume
              </a>
            </div>
          </div>
        </section>

        {/* ══════ CONTACT ══════ */}
        <section id="contact" style={{ padding: "7rem 5vw 5rem", background: "#ffe17c", position: "relative" }}>
          <div className="dot-pattern" />
          <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <motion.div ref={contactRev.ref} initial={{ opacity: 0, y: 40 }} animate={contactRev.inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
              <p className="sec-label" style={{ textAlign: "center" }}>Contact</p>
              <div className="h-line" style={{ margin: "0 auto 2rem" }} />
              <h2 className="sec-title" style={{ marginBottom: "1.25rem" }}>
                Let&apos;s build something<br />
                <span style={{ WebkitTextStroke: "2px #000", WebkitTextFillColor: "transparent" }}>together</span>
              </h2>
              <p style={{ color: "#171e19cc", lineHeight: 1.8, marginBottom: "3rem", fontSize: "1rem" }}>
                I&apos;m currently open to freelance projects and full-time opportunities.
                If you have a great idea or just want to say hi — my inbox is always open.
              </p>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={copyEmail}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", background: "#fff", border: "2px solid #000", borderRadius: "12px", padding: "1rem 2rem", marginBottom: "3rem", boxShadow: "4px 4px 0px 0px #000" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "#000", fontWeight: 700 }}>{EMAIL}</span>
                <span style={{ fontSize: "0.7rem", color: copied ? "#28c840" : "#171e19aa", letterSpacing: "0.05em", fontWeight: 700, transition: "color .2s" }}>
                  {copied ? "COPIED ✓" : "COPY"}
                </span>
              </motion.button>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                {SOCIALS.map(({ name, href, Icon }) => (
                  <motion.a key={name} href={href} target="_blank" rel="noreferrer" whileHover={{ y: -3 }}
                    style={{ display: "flex", alignItems: "center", gap: "8px", color: "#000", textDecoration: "none", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.04em", border: "2px solid #000", borderRadius: "10px", padding: "0.65rem 1.25rem", background: "#fff", boxShadow: "3px 3px 0px 0px #000", transition: "all 0.2s" }}>
                    <Icon />{name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════ FOOTER ══════ */}
        <footer style={{ borderTop: "2px solid #000", padding: "1.5rem 5vw", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", background: "#171e19" }}>
          <p style={{ color: "#b7c6c2", fontSize: "0.8rem" }}>© 2025 Kuntal Das. All rights reserved.</p>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {SOCIALS.map(({ name, href, Icon }) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" title={name}
                style={{ color: "#b7c6c2", transition: "color .2s", width: "32px", height: "32px", border: "1.5px solid #272727", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", background: "#272727" }}
                onMouseEnter={e => { const a = e.currentTarget; a.style.background = "#ffe17c"; a.style.color = "#000"; a.style.borderColor = "#ffe17c"; }}
                onMouseLeave={e => { const a = e.currentTarget; a.style.background = "#272727"; a.style.color = "#b7c6c2"; a.style.borderColor = "#272727"; }}>
                <Icon />
              </a>
            ))}
          </div>
          <p style={{ color: "#b7c6c2", fontSize: "0.8rem" }}>
            Built with <span style={{ color: "#ffe17c", fontWeight: 700 }}>Next.js</span> &amp; <span style={{ color: "#b7c6c2", fontWeight: 700 }}>Framer Motion</span>
          </p>
        </footer>
        <ChatWidget />

      </main>
    </>
  );
}

/* ─── Particles Background ─────────────────── */
function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cleanup: (() => void) | null = null;
    const init = async () => {
      const { tsParticles } = await import("@tsparticles/engine");
      const { loadSlim } = await import("@tsparticles/slim");
      await loadSlim(tsParticles);
      const container = await tsParticles.load({
        id: "hero-particles", element: containerRef.current ?? undefined,
        options: {
          fullScreen: { enable: false }, background: { color: { value: "transparent" } }, fpsLimit: 60,
          particles: {
            number: { value: 40, density: { enable: true, width: 900 } },
            color: { value: ["#000000", "#171e19", "#b7c6c2"] },
            shape: { type: "circle" },
            opacity: { value: { min: 0.05, max: 0.2 }, animation: { enable: true, speed: 0.8, sync: false } },
            size: { value: { min: 1, max: 2 } },
            links: { enable: true, distance: 130, color: "#000000", opacity: 0.04, width: 1 },
            move: { enable: true, speed: 0.4, direction: "none", random: true, straight: false, outModes: { default: "bounce" } },
          },
          interactivity: {
            detectsOn: "window",
            events: { onHover: { enable: true, mode: "grab" }, resize: { enable: true } },
            modes: { grab: { distance: 160, links: { opacity: 0.12, color: "#000000" } } },
          },
          detectRetina: true,
        },
      });
      cleanup = () => container?.destroy();
    };
    init().catch(console.error);
    return () => { cleanup?.(); };
  }, []);
  return <div ref={containerRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}