import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Globe, LayoutGrid, ShoppingBag, Smartphone, ArrowUpRight, Mail, Phone } from "lucide-react";
import logoAsset from "../assets/natus-lab-logo-mark.png.asset.json";
import heroAsset from "../assets/hero-code-atmosphere.jpg.asset.json";
import invesstem1 from "../assets/invesstem-1.png.asset.json";
import invesstem2 from "../assets/invesstem-2.png.asset.json";
import invesstem3 from "../assets/invesstem-3.png.asset.json";
import pitchpartners1 from "../assets/pitchpartners-1.png.asset.json";
import pitchpartners2 from "../assets/pitchpartners-2.png.asset.json";
import invesmed1 from "../assets/invesmed-1.png.asset.json";
import invesmed2 from "../assets/invesmed-2.png.asset.json";
import invesmed3 from "../assets/invesmed-3.png.asset.json";
import svcWebsites from "../assets/service-websites.jpg.asset.json";
import svcPlatforms from "../assets/service-platforms.jpg.asset.json";
import svcEcommerce from "../assets/service-ecommerce.jpg.asset.json";
import svcApps from "../assets/service-apps.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: NatusLab,
  head: () => ({
    meta: [
      { title: "Natus Lab — Built to matter." },
      { name: "description", content: "A private digital studio crafting websites, platforms, e-commerce and apps. Born from nature. Built for transformation." },
      { property: "og:title", content: "Natus Lab — Built to matter." },
      { property: "og:description", content: "A private digital studio crafting websites, platforms, e-commerce and apps." },
    ],
  }),
});

/* --------- Projects (edit here to add more) --------- */
const PROJECTS = [
  {
    name: "Inves-STEM",
    type: "E-Learning · Platform",
    line: "A vibrant STEM learning platform for independent learners, tutors and schools across Africa.",
    images: [invesstem1.url, invesstem2.url, invesstem3.url],
    year: "2027",
    status: "In Progress · Launching 2027",
    href: "#",
    live: false,
    domain: "inves-stem.co",
  },
  {
    name: "Pitch Partners",
    type: "Coaching Agency · Website",
    line: "A structured coaching platform for schools — flexible packages, live pricing, and player development.",
    images: [pitchpartners1.url, pitchpartners2.url],
    year: "2026",
    href: "https://pitchpartners.co.za",
    live: true,
    domain: "pitchpartners.co.za",
  },
  {
    name: "Invesmed",
    type: "Healthcare · Corporate Platform",
    line: "An African healthcare ecosystem — telemedicine, diagnostics, remote monitoring and workforce development.",
    images: [invesmed1.url, invesmed2.url, invesmed3.url],
    year: "2026",
    href: "https://invesmed.co.za",
    live: true,
    domain: "invesmed.co.za",
  },
];

// WhatsApp: +27 66 235 7143 (SA)
const WHATSAPP_URL = "https://wa.me/27662357143?text=Hi%20Natus%20Lab%20%E2%80%94%20I'd%20like%20to%20start%20a%20project.";
const PHONE_TEL = "tel:+27716499093";
const PHONE_DISPLAY = "+27 71 649 9093";
const WHATSAPP_DISPLAY = "+27 66 235 7143";
const EMAIL = "khumo.abraham@gmail.com";

/* --------- Particle field: copper drift + parallax reactive --------- */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const speedRef = useRef({ current: 0.3, target: 0.3 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      width = canvas.clientWidth; height = canvas.clientHeight;
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(120, Math.floor((width * height) / 14000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.25 - 0.05,
      a: Math.random() * 0.7 + 0.15,
      hue: Math.random() > 0.7 ? "gold" : "copper",
    }));

    let lastScroll = window.scrollY;
    let lastTime = performance.now();
    const onScroll = () => {
      const now = performance.now();
      const dv = Math.abs(window.scrollY - lastScroll) / Math.max(1, now - lastTime);
      speedRef.current.target = Math.min(2.6, 0.3 + dv * 12);
      lastScroll = window.scrollY; lastTime = now;
    };
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY;
      speedRef.current.target = Math.max(speedRef.current.target, 0.9);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const draw = () => {
      speedRef.current.current += (speedRef.current.target - speedRef.current.current) * 0.05;
      speedRef.current.target += (0.3 - speedRef.current.target) * 0.02;
      const s = reduced ? 0.15 : speedRef.current.current;
      ctx.clearRect(0, 0, width, height);

      // faint light trails
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // subtle attraction to cursor
        const mx = mouseRef.current.x, my = mouseRef.current.y;
        if (mx || my) {
          const dx = mx - p.x, dy = my - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 40000) {
            p.vx += (dx / (d2 + 100)) * 0.5;
            p.vy += (dy / (d2 + 100)) * 0.5;
          }
        }
        p.x += p.vx * s * 3;
        p.y += p.vy * s * 3;
        p.vx *= 0.985; p.vy *= 0.985;
        if (p.vy > -0.05) p.vy -= 0.01;

        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
        const base = p.hue === "gold" ? "218, 178, 110" : "217, 138, 78";
        grad.addColorStop(0, `rgba(${base}, ${p.a})`);
        grad.addColorStop(1, `rgba(${base}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = `rgba(${base}, ${Math.min(1, p.a + 0.2)})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}

/* --------- Intro loading sequence --------- */
function IntroLoader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 2400);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      style={{ animation: "intro-fade-out 0.8s ease 2.0s forwards" }}
    >
      <img
        src={logoAsset.url}
        alt="Natus Lab"
        className="h-40 w-40 md:h-52 md:w-52"
        style={{ animation: "logo-glow 1.8s cubic-bezier(.2,.7,.2,1) forwards" }}
      />
    </div>
  );
}

/* --------- Navigation --------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    ["Work", "#work"], ["Services", "#services"],
    ["Process", "#process"], ["Contact", "#contact"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/70 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Natus Lab" className="h-9 w-9 md:h-10 md:w-10" />
          <span className="wordmark hidden text-sm text-foreground md:inline">Natus Lab</span>
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {links.map(([l, h]) => (
            <a key={l} href={h} className="nav-link text-sm text-foreground/80 transition">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="btn-ghost-copper hidden rounded-full px-5 py-2 text-xs uppercase tracking-[0.24em] md:inline-flex"
        >
          Start
        </a>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className={`h-px w-6 bg-foreground transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-foreground transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-foreground transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-6 px-6 py-8">
            {links.map(([l, h]) => (
              <a key={l} href={h} onClick={() => setOpen(false)} className="text-lg text-foreground">
                {l}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* --------- Device mockups (floating laptop + phone) --------- */
function DeviceMockups() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      setTilt({ x: (e.clientY - cy) / 60, y: (e.clientX - cx) / 60 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative hidden h-[520px] w-full lg:block"
      style={{ perspective: "1400px" }}
    >
      {/* Laptop */}
      <div
        className="absolute right-2 top-16 w-[520px]"
        style={{
          transform: `rotateX(${8 - tilt.x}deg) rotateY(${-14 + tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(.2,.7,.2,1)",
          animation: "float 8s ease-in-out infinite",
        }}
      >
        <div className="rounded-t-xl border border-border/60 bg-gradient-to-b from-[oklch(0.22_0.015_40)] to-[oklch(0.14_0.008_40)] p-2 shadow-[0_50px_100px_-20px_oklch(0_0_0/0.7),0_0_60px_-10px_oklch(0.66_0.14_45/0.25)]">
          <div className="aspect-[16/10] overflow-hidden rounded-md bg-background">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-1.5 border-b border-border/40 bg-card/60 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[oklch(0.5_0.12_45)]" />
                <span className="h-2 w-2 rounded-full bg-[oklch(0.5_0.06_60)]" />
                <span className="h-2 w-2 rounded-full bg-[oklch(0.4_0.03_50)]" />
                <span className="ml-3 text-[9px] tracking-widest text-muted-foreground">natuslab.co</span>
              </div>
              <div className="flex-1 p-5">
                <div className="mb-3 h-2 w-16 rounded bg-copper/60" style={{ background: "var(--copper)" }} />
                <div className="mb-2 h-4 w-3/5 rounded bg-foreground/80" />
                <div className="mb-6 h-3 w-2/5 rounded bg-foreground/40" />
                <div className="grid grid-cols-3 gap-2">
                  {[0,1,2].map(i => (
                    <div key={i} className="aspect-square rounded border border-border/40 bg-card/60" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto h-3 w-[105%] -translate-x-[2.5%] rounded-b-2xl bg-gradient-to-b from-[oklch(0.22_0.015_40)] to-[oklch(0.1_0.008_40)] shadow-inner" />
      </div>

      {/* Phone */}
      <div
        className="absolute bottom-0 left-4 w-[170px]"
        style={{
          transform: `rotateX(${-6 + tilt.x}deg) rotateY(${10 - tilt.y}deg) rotateZ(-6deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(.2,.7,.2,1)",
          animation: "float 6s ease-in-out infinite reverse",
        }}
      >
        <div className="rounded-[2rem] border border-border/70 bg-gradient-to-b from-[oklch(0.2_0.015_40)] to-[oklch(0.1_0.008_40)] p-2 shadow-[0_40px_80px_-20px_oklch(0_0_0/0.7),0_0_40px_-10px_oklch(0.66_0.14_45/0.3)]">
          <div className="aspect-[9/19] overflow-hidden rounded-[1.6rem] bg-background p-3">
            <div className="mb-4 flex justify-center">
              <div className="h-1 w-12 rounded-full bg-foreground/30" />
            </div>
            <div className="mb-2 h-3 w-16 rounded bg-foreground/80" />
            <div className="mb-4 h-2 w-24 rounded bg-foreground/30" />
            <div className="space-y-2">
              {[0,1,2].map(i => (
                <div key={i} className="h-10 rounded-md border border-border/40 bg-card/60" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes float { 0%,100% { translate: 0 0 } 50% { translate: 0 -12px } }`}</style>
    </div>
  );
}

/* --------- Reveal on scroll --------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* --------- Hero --------- */
function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const on = (e: MouseEvent) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      setTilt({ x: (e.clientY - cy) / 90, y: (e.clientX - cx) / 90 });
    };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      {/* Layered atmosphere: hero image + particles + radial masks */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroAsset.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(1.05)",
            transform: `translate3d(${tilt.y * 0.6}px, ${tilt.x * 0.6}px, 0) scale(1.06)`,
            transition: "transform 0.9s cubic-bezier(.2,.7,.2,1)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 50%, transparent 0%, oklch(0.09 0.006 40 / 0.55) 45%, var(--background) 82%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
        <ParticleField />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <div
            className="reveal mb-8 inline-flex items-center gap-3 rounded-full border px-4 py-1.5"
            style={{ borderColor: "oklch(0.66 0.14 45 / 0.4)", background: "oklch(0.12 0.008 40 / 0.5)", backdropFilter: "blur(10px)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--copper)", boxShadow: "0 0 12px var(--copper)" }} />
            <span className="label" style={{ letterSpacing: "0.28em", color: "var(--foreground)" }}>
              Private Digital Studio
            </span>
          </div>

          <h1 className="reveal text-[3.4rem] leading-[0.98] tracking-tight md:text-[5rem] lg:text-[6rem]">
            Digital work,
            <br />
            <span
              className="italic"
              style={{
                background: "linear-gradient(120deg, oklch(0.62 0.14 45), oklch(0.82 0.13 70) 55%, oklch(0.6 0.13 42))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              built to matter.
            </span>
          </h1>

          <p className="reveal mt-8 max-w-xl text-base leading-relaxed text-foreground md:text-lg">
            A quiet studio designing websites, SaaS platforms, e-commerce stores
            and mobile apps for brands that refuse to look like anyone else.
            Born from nature. Built for transformation.
          </p>

          <div className="reveal mt-10 flex flex-wrap items-center gap-4">
            <a href="#work" className="btn-copper rounded-full px-8 py-4 text-xs uppercase tracking-[0.28em]">
              View Work
            </a>
            <a href="#contact" className="btn-ghost-copper rounded-full px-8 py-4 text-xs uppercase tracking-[0.28em]">
              Start a Project
            </a>
          </div>

          <div className="reveal mt-14 grid max-w-md grid-cols-3 gap-6 border-t pt-6" style={{ borderColor: "oklch(0.48 0.09 50 / 0.3)" }}>
            {[
              ["By", "Invitation"],
              ["Est.", "MMXXIV"],
              ["Craft", "Studio"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="label mb-1">{k}</div>
                <div className="text-sm text-foreground" style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-work montage: layered browser + phone frames of live projects */}
        <div
          className="relative mx-auto hidden aspect-[4/5] w-full max-w-md lg:block"
          style={{ perspective: "1400px" }}
        >
          {/* Back browser: Invesmed */}
          <div
            className="absolute right-0 top-0 w-[92%] overflow-hidden rounded-xl border shadow-[0_50px_100px_-20px_oklch(0_0_0/0.7),0_0_60px_-10px_oklch(0.66_0.14_45/0.22)]"
            style={{
              borderColor: "oklch(0.48 0.09 50 / 0.4)",
              transform: `rotateX(${8 - tilt.x}deg) rotateY(${-12 + tilt.y}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.8s cubic-bezier(.2,.7,.2,1)",
              animation: "floatY 9s ease-in-out infinite",
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-border/40 bg-card/70 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[oklch(0.5_0.12_45)]" />
              <span className="h-2 w-2 rounded-full bg-[oklch(0.5_0.06_60)]" />
              <span className="h-2 w-2 rounded-full bg-[oklch(0.4_0.03_50)]" />
              <span className="ml-3 text-[9px] tracking-widest text-muted-foreground">invesmed.co.za</span>
            </div>
            <img src={invesmed1.url} alt="Invesmed" className="block w-full" />
          </div>

          {/* Middle browser: Inves-STEM */}
          <div
            className="absolute left-0 top-[38%] w-[78%] overflow-hidden rounded-xl border shadow-[0_40px_80px_-20px_oklch(0_0_0/0.7),0_0_50px_-10px_oklch(0.66_0.14_45/0.25)]"
            style={{
              borderColor: "oklch(0.66 0.14 45 / 0.5)",
              transform: `rotateX(${-4 + tilt.x}deg) rotateY(${8 - tilt.y}deg) rotateZ(-3deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.8s cubic-bezier(.2,.7,.2,1)",
              animation: "floatY 7s ease-in-out infinite reverse",
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-border/40 bg-card/70 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[oklch(0.5_0.12_45)]" />
              <span className="h-2 w-2 rounded-full bg-[oklch(0.5_0.06_60)]" />
              <span className="h-2 w-2 rounded-full bg-[oklch(0.4_0.03_50)]" />
              <span className="ml-3 text-[9px] tracking-widest text-muted-foreground">inves-stem.co</span>
            </div>
            <img src={invesstem1.url} alt="Inves-STEM" className="block w-full" />
          </div>

          {/* Front card: Pitch Partners pricing detail */}
          <div
            className="absolute bottom-0 right-4 w-[52%] overflow-hidden rounded-xl border shadow-[0_40px_60px_-15px_oklch(0_0_0/0.75)]"
            style={{
              borderColor: "oklch(0.66 0.14 45 / 0.55)",
              transform: `rotateX(${-6 + tilt.x * 1.2}deg) rotateY(${-6 - tilt.y}deg) rotateZ(4deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.8s cubic-bezier(.2,.7,.2,1)",
              animation: "floatY 8s ease-in-out infinite",
              animationDelay: "0.4s",
            }}
          >
            <img src={pitchpartners2.url} alt="Pitch Partners" className="block w-full" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
        <div className="flex flex-col items-center gap-3 opacity-70">
          <span className="label" style={{ fontSize: "0.6rem" }}>Scroll</span>
          <div className="h-10 w-px" style={{ background: "linear-gradient(to bottom, var(--copper), transparent)" }} />
        </div>
      </div>

      <style>{`
        @keyframes floatY { 0%,100% { translate: 0 0 } 50% { translate: 0 -14px } }
        @keyframes pulseGlow { 0%,100% { opacity: 0.55 } 50% { opacity: 0.9 } }
      `}</style>
    </section>
  );
}

/* --------- Marquee capabilities --------- */
function Marquee() {
  const items = [
    "Editorial Websites", "SaaS Platforms", "E-Commerce Stores",
    "Mobile Apps", "Motion Design", "Brand Systems",
    "Private Portals", "AI Interfaces", "Design Systems",
  ];
  const row = [...items, ...items];
  return (
    <section aria-hidden className="relative border-y py-8" style={{ borderColor: "oklch(0.48 0.09 50 / 0.28)", background: "oklch(0.11 0.008 40 / 0.6)" }}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
      <div className="overflow-hidden">
        <div className="flex gap-14" style={{ animation: "scroll-x 40s linear infinite", width: "max-content" }}>
          {row.map((w, i) => (
            <div key={i} className="flex items-center gap-14">
              <span className="text-2xl md:text-3xl" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "oklch(0.75 0.02 60)" }}>
                {w}
              </span>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--copper)" }} />
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes scroll-x { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </section>
  );
}

/* --------- Main page --------- */
/* --------- Project row (refined, compact) --------- */
function ProjectRow({
  p,
  index,
}: {
  p: (typeof PROJECTS)[number];
  index: number;
}) {
  const [active, setActive] = useState(0);
  const reversed = index % 2 === 1;
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div
      className={`reveal group grid grid-cols-1 items-center gap-10 lg:grid-cols-12 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Preview — compact, glass framed */}
      <div className="lg:col-span-7">
        <div
          ref={frameRef}
          onMouseMove={(e) => {
            const r = frameRef.current?.getBoundingClientRect();
            if (!r) return;
            setTilt({
              x: ((e.clientY - r.top) / r.height - 0.5) * -4,
              y: ((e.clientX - r.left) / r.width - 0.5) * 6,
            });
          }}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          className="relative mx-auto w-full max-w-[560px]"
          style={{ perspective: "1400px" }}
        >
          {/* Ambient copper bloom */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 opacity-60 blur-2xl transition duration-700 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, oklch(0.66 0.14 45 / 0.28), transparent 60%), radial-gradient(circle at 80% 80%, oklch(0.48 0.09 50 / 0.25), transparent 65%)",
            }}
          />

          <div
            className="glass-panel relative overflow-hidden rounded-2xl p-3"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.6s cubic-bezier(.2,.7,.2,1)",
            }}
          >
            <div
              className="overflow-hidden rounded-lg border shadow-[0_30px_60px_-25px_oklch(0_0_0/0.8)]"
              style={{ borderColor: "oklch(0.48 0.09 50 / 0.4)" }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 border-b border-border/40 bg-card/70 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[oklch(0.5_0.12_45)]" />
                <span className="h-2 w-2 rounded-full bg-[oklch(0.5_0.06_60)]" />
                <span className="h-2 w-2 rounded-full bg-[oklch(0.4_0.03_50)]" />
                <span className="ml-3 text-[10px] tracking-widest text-muted-foreground">
                  {p.domain}
                </span>
                {p.live === false && (
                  <span
                    className="ml-auto flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-[0.2em]"
                    style={{
                      borderColor: "oklch(0.66 0.14 45 / 0.55)",
                      color: "var(--copper)",
                      background: "oklch(0.1 0.008 40 / 0.7)",
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: "var(--copper)",
                        boxShadow: "0 0 10px var(--copper)",
                        animation: "pulseGlow 1.8s ease-in-out infinite",
                      }}
                    />
                    In Progress
                  </span>
                )}
              </div>

              {/* Cross-fade image stack */}
              <div className="relative aspect-[16/10] w-full bg-background">
                {p.images.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`${p.name} — ${idx + 1}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-out"
                    style={{ opacity: active === idx ? 1 : 0 }}
                  />
                ))}
                {/* Copper sheen on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 60%, oklch(0.66 0.14 45 / 0.18), transparent 65%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          {p.images.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {p.images.map((src, idx) => (
                <button
                  key={idx}
                  type="button"
                  onMouseEnter={() => setActive(idx)}
                  onFocus={() => setActive(idx)}
                  onClick={() => setActive(idx)}
                  aria-label={`View ${p.name} shot ${idx + 1}`}
                  className="relative h-12 w-20 overflow-hidden rounded-md border transition"
                  style={{
                    borderColor:
                      active === idx
                        ? "oklch(0.66 0.14 45 / 0.9)"
                        : "oklch(0.48 0.09 50 / 0.35)",
                    boxShadow:
                      active === idx
                        ? "0 0 20px -4px oklch(0.66 0.14 45 / 0.55)"
                        : "none",
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="block h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Copy */}
      <div className="lg:col-span-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="label" style={{ color: "var(--copper)" }}>{p.type}</span>
          <span className="label">{p.year}</span>
        </div>
        <h3 className="mb-4 text-3xl md:text-4xl">{p.name}</h3>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">{p.line}</p>

        {p.status && (
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.24em]"
            style={{
              borderColor: "oklch(0.66 0.14 45 / 0.55)",
              color: "var(--copper)",
              background: "oklch(0.12 0.008 40 / 0.6)",
              backdropFilter: "blur(10px)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--copper)", boxShadow: "0 0 10px var(--copper)" }}
            />
            {p.status}
          </div>
        )}

        {p.live ? (
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group/link inline-flex items-center gap-3 rounded-full border px-5 py-2.5 transition hover:-translate-y-0.5"
            style={{
              borderColor: "oklch(0.66 0.14 45 / 0.5)",
              background: "oklch(0.1 0.008 40 / 0.5)",
              backdropFilter: "blur(10px)",
            }}
          >
            <span className="label" style={{ color: "var(--copper)" }}>Visit live site</span>
            <ArrowUpRight
              className="h-4 w-4 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              style={{ color: "var(--copper)" }}
            />
          </a>
        ) : (
          <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Preview by request
          </span>
        )}
      </div>
    </div>
  );
}

function NatusLab() {
  useReveal();

  const services = [
    { icon: Globe,      title: "Websites",         line: "Editorial, cinematic sites built to convert and endure.",   image: svcWebsites.url },
    { icon: LayoutGrid, title: "SaaS Platforms",   line: "Custom internal systems and client-facing platforms.",       image: svcPlatforms.url },
    { icon: ShoppingBag,title: "E-Commerce Stores",line: "Boutique storefronts engineered for premium brands.",        image: svcEcommerce.url },
    { icon: Smartphone, title: "Mobile Apps",      line: "Native-feel mobile and web apps with intent-first UX.",      image: svcApps.url },
  ];

  const principles = [
    { n: "01", t: "Clarity", l: "Every element earns its place." },
    { n: "02", t: "Performance", l: "Fast, resilient, engineered to last." },
    { n: "03", t: "Transformation", l: "Ordinary inputs become defining products." },
  ];

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <IntroLoader />
      <Nav />

      {/* HERO */}
      <Hero />

      {/* MARQUEE */}
      <Marquee />

      {/* SERVICES */}
      <section id="services" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-14 flex flex-col gap-4">
            <span className="label" style={{ color: "var(--copper)" }}>What I Build</span>
            <h2 className="max-w-2xl text-4xl md:text-5xl">
              Four disciplines. One standard.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, line, image }, idx) => (
              <div
                key={title}
                className="glass-panel reveal group relative overflow-hidden rounded-2xl"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                {/* Ambient image layer */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={image}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-[1400ms] ease-out group-hover:scale-110 group-hover:opacity-100"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, oklch(0.11 0.008 40 / 0.15) 0%, oklch(0.13 0.008 40 / 0.55) 55%, oklch(0.15 0.008 40 / 0.95) 100%)",
                    }}
                  />
                  {/* Sweep shimmer */}
                  <div
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 opacity-0 transition duration-700 group-hover:left-full group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(120deg, transparent 0%, oklch(1 0 0 / 0.18) 50%, transparent 100%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative -mt-8 p-7">
                  <div
                    className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md"
                    style={{
                      borderColor: "oklch(0.66 0.14 45 / 0.7)",
                      background: "oklch(0.1 0.008 40 / 0.75)",
                      boxShadow: "0 8px 30px -10px oklch(0.66 0.14 45 / 0.6)",
                    }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.25} style={{ color: "var(--copper)" }} />
                  </div>
                  <h3 className="mb-2 text-2xl">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{line}</p>
                </div>

                {/* Hover copper glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, oklch(0.66 0.14 45 / 0.25), transparent 60%)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-14 flex items-end justify-between gap-8">
            <div>
              <span className="label" style={{ color: "var(--copper)" }}>Selected Work</span>
              <h2 className="mt-4 text-4xl md:text-5xl">A private gallery.</h2>
            </div>
            <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
              Recent studio projects. Click any logo to visit the live site.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {PROJECTS.map((p, i) => (
              <ProjectRow key={p.name} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-14">
            <span className="label" style={{ color: "var(--copper)" }}>The Difference</span>
            <h2 className="mt-4 max-w-xl text-4xl md:text-5xl">Three principles. Held to.</h2>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.n} className="reveal border-t pt-8" style={{ borderColor: "oklch(0.48 0.09 50 / 0.35)" }}>
                <div
                  className="mb-6 font-serif text-5xl md:text-6xl"
                  style={{ color: "var(--copper)", fontFamily: "var(--font-serif)" }}
                >
                  {p.n}
                </div>
                <h3 className="mb-3 text-2xl">{p.t}</h3>
                <p className="text-sm text-muted-foreground">{p.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="relative py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(0.66 0.14 45 / 0.18), transparent 70%)",
              filter: "blur(20px)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="reveal text-4xl leading-tight md:text-6xl">
            Ready to build something{" "}
            <span style={{ color: "var(--copper)" }}>exceptional?</span>
          </h2>
          <p className="reveal mx-auto mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
            Every project starts with a conversation — message me for pricing and scope.
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-copper rounded-full px-8 py-4 text-sm uppercase tracking-[0.24em]"
            >
              WhatsApp
            </a>
            <a
              href={PHONE_TEL}
              className="btn-ghost-copper rounded-full px-8 py-4 text-sm uppercase tracking-[0.24em]"
            >
              Call
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="btn-ghost-copper rounded-full px-8 py-4 text-sm uppercase tracking-[0.24em]"
            >
              Email
            </a>
          </div>
          <div className="reveal mt-10 grid grid-cols-1 gap-3 text-xs text-muted-foreground sm:grid-cols-3">
            <div>
              <div className="label mb-1">WhatsApp</div>
              <div className="text-foreground" style={{ fontFamily: "var(--font-sans)" }}>{WHATSAPP_DISPLAY}</div>
            </div>
            <div>
              <div className="label mb-1">Call</div>
              <div className="text-foreground" style={{ fontFamily: "var(--font-sans)" }}>{PHONE_DISPLAY}</div>
            </div>
            <div>
              <div className="label mb-1">Email</div>
              <div className="truncate text-foreground" style={{ fontFamily: "var(--font-sans)" }}>{EMAIL}</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-border/50 py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Natus Lab" className="h-9 w-9" />
            <span className="wordmark text-xs text-foreground">Natus Lab</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="text-muted-foreground transition hover:text-copper"
              style={{ color: "var(--muted-foreground)" }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.83 11.83 0 0 0 5.65 1.44h.01c6.55 0 11.85-5.3 11.85-11.85 0-3.17-1.23-6.15-3.4-8.43zM12.06 21.7h-.01a9.84 9.84 0 0 1-5.02-1.38l-.36-.21-3.8 1 1.02-3.7-.24-.38a9.85 9.85 0 1 1 18.3-5.19c0 5.44-4.43 9.86-9.89 9.86zm5.4-7.39c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.01-1.04 2.47c0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.48.71.31 1.26.5 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.75-.71 2-1.4.25-.68.25-1.27.17-1.4-.07-.13-.27-.2-.57-.35z"/>
              </svg>
            </a>
            <a
              href={PHONE_TEL}
              aria-label="Call"
              className="transition hover:text-copper"
              style={{ color: "var(--muted-foreground)" }}
            >
              <Phone className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="transition hover:text-copper"
              style={{ color: "var(--muted-foreground)" }}
            >
              <Mail className="h-5 w-5" strokeWidth={1.5} />
            </a>
          </div>
          <p className="label text-xs" style={{ color: "var(--muted-foreground)" }}>
            Built to matter · © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

