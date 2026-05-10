import { useState, useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:ital,wght@0,400;0,700;1,400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#060505;--amber:#f97316;--amber-l:#fde68a;--amber-d:#7c3010;
  --violet:#7c3aed;--text:#fff4df;
  --title:'Bebas Neue',sans-serif;--mono:'Space Mono',monospace;--body:'DM Sans',sans-serif;
}
body{background:var(--bg);color:var(--text);font-family:var(--body);overflow-x:hidden;}
::selection{background:var(--amber);color:#000;}
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:var(--bg);}::-webkit-scrollbar-thumb{background:var(--amber-d);border-radius:2px;}

@keyframes floatA{0%,100%{transform:translate(0,0)}50%{transform:translate(14px,-22px)}}
@keyframes floatB{0%,100%{transform:translate(0,0)}50%{transform:translate(-14px,20px)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes lineGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes statIn{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:translateX(0)}}
@keyframes gridPan{0%{background-position:0 0}100%{background-position:60px 60px}}
@keyframes drift1{0%,100%{transform:translate(0,0)}33%{transform:translate(30px,-40px)}66%{transform:translate(-20px,25px)}}
@keyframes drift2{0%,100%{transform:translate(0,0)}33%{transform:translate(-40px,20px)}66%{transform:translate(25px,-30px)}}
@keyframes drift3{0%,100%{transform:translate(0,0)}50%{transform:translate(20px,35px)}}
@keyframes pulseGlow{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.07)}}
@keyframes graphDraw{from{stroke-dashoffset:900}to{stroke-dashoffset:0}}
@keyframes graphFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes bobSoft{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes sway{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1.5deg)}}
@keyframes orbitPulse{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:.9;transform:scale(1.12)}}
@keyframes scan{0%{transform:translateX(-120%)}100%{transform:translateX(220%)}}
@keyframes shimmer{0%{opacity:.15}50%{opacity:.65}100%{opacity:.15}}
@keyframes riseBars{from{transform:scaleY(.18)}to{transform:scaleY(1)}}
@keyframes dashMove{to{stroke-dashoffset:-18}}
@keyframes nodePop{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
@keyframes slideGlow{0%{transform:translateX(-140%)}100%{transform:translateX(240%)}}
@keyframes gradientShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes floatRotate{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-8px) rotate(1.2deg)}}
@keyframes pulseBorder{0%,100%{border-color:rgba(255,255,255,.08)}50%{border-color:rgba(249,115,22,.28)}}
@keyframes scrollNudge{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
@keyframes glowBreath{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:.7;transform:scale(1.08)}}

.ttl{font-family:var(--title);letter-spacing:.02em;line-height:.94;}
.mn{font-family:var(--mono);}
.rv{opacity:0;transform:translateY(34px) scale(.985);filter:blur(8px);transition:opacity .8s cubic-bezier(.2,.8,.2,1),transform .8s cubic-bezier(.2,.8,.2,1),filter .8s cubic-bezier(.2,.8,.2,1);}
.rv.in{opacity:1;transform:none;filter:blur(0);}

.btn{display:inline-block;background:#fff4df;border:2px solid #fff4df;border-radius:50px;padding:13px 28px;font-family:var(--body);font-weight:700;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#000;text-decoration:none;transition:all .2s;box-shadow:0 0 36px rgba(255,244,223,.18);}
.btn:hover{background:var(--amber);border-color:var(--amber);box-shadow:0 0 55px rgba(249,115,22,.55);transform:translateY(-2px);}
.btn-o{display:inline-block;background:transparent;border:2px solid rgba(255,255,255,.2);border-radius:50px;padding:13px 28px;font-family:var(--body);font-weight:700;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--text);text-decoration:none;transition:all .2s;}
.btn-o:hover{background:var(--amber);border-color:var(--amber);color:#000;box-shadow:0 0 45px rgba(249,115,22,.45);transform:translateY(-2px);}
.reg-btn{background:#fff4df;border:2px solid #fff4df;border-radius:50px;padding:12px 24px;font-family:var(--body);font-weight:700;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#000;transition:all .2s;white-space:nowrap;}
.reg-btn:hover{background:var(--amber);border-color:var(--amber);box-shadow:0 0 50px rgba(249,115,22,.5);transform:translateY(-2px);}
.nbtn{background:none;border:none;padding:10px 14px;color:rgba(255,244,223,.72);font-family:var(--mono);font-size:10px;letter-spacing:.2em;text-transform:uppercase;display:flex;align-items:center;gap:8px;transition:all .2s;cursor:pointer;}
.nbtn:hover{color:var(--amber-l);}
.nav-wrap{display:flex;align-items:center;gap:0;border:1px solid rgba(255,255,255,.08);border-radius:50px;background:rgba(255,255,255,.03);padding:4px 8px;backdrop-filter:blur(12px);}
.nav-link{background:none;border:none;padding:10px 14px;color:rgba(255,244,223,.72);font-family:var(--mono);font-size:10px;letter-spacing:.2em;text-transform:uppercase;transition:all .2s;cursor:pointer;white-space:nowrap;}
.nav-link:hover{color:var(--amber-l);}
.nav-divider{color:rgba(255,244,223,.18);font-family:var(--mono);font-size:10px;user-select:none;}
.nav-cta{color:#fff4df;}
.nav-cta:hover{color:var(--amber-l);}

.card{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.08);border-radius:20px;background:rgba(255,255,255,.03);padding:24px;transition:all .28s cubic-bezier(.2,.8,.2,1);}
.card::before{content:'';position:absolute;inset:-40%;background:linear-gradient(115deg,transparent 35%,rgba(255,244,223,.11) 50%,transparent 65%);transform:translateX(-120%);transition:transform .7s ease;pointer-events:none;}
.card:hover{border-color:rgba(249,115,22,.28);transform:translateY(-7px) scale(1.01);box-shadow:0 24px 65px rgba(0,0,0,.46),0 0 40px rgba(249,115,22,.08);}
.card:hover::before{transform:translateX(120%);}
.clink{font-family:var(--mono);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--amber);text-decoration:none;transition:color .18s;}
.clink:hover{color:var(--amber-l);}

.faq{border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:18px 22px;background:rgba(255,255,255,.02);margin-bottom:10px;}
.faq[open]{border-color:rgba(249,115,22,.3);}
details>summary{list-style:none;cursor:pointer;}
details>summary::-webkit-details-marker{display:none;}
details[open] summary::after{content:' ↑';color:var(--amber);}
summary::after{content:' ↓';color:var(--amber);}

.marquee-wrap{overflow:hidden;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);background:rgba(0,0,0,.3);padding:12px 0;}
.marquee-track{display:flex;width:max-content;animation:ticker 26s linear infinite;}
.marquee-track:hover{animation-play-state:paused;}

.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(249,115,22,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.04) 1px,transparent 1px);background-size:60px 60px;animation:gridPan 8s linear infinite;pointer-events:none;}

.tilt{transition:transform .35s,box-shadow .35s;border-radius:22px;overflow:hidden;}
.animated-panel{transition:transform .35s ease,box-shadow .35s ease,filter .35s ease;animation:pulseBorder 5.2s ease-in-out infinite;}
.animated-panel:hover{transform:translateY(-6px) scale(1.01);box-shadow:0 22px 70px rgba(249,115,22,.18);filter:brightness(1.08);}
.graph-line-anim{stroke-dasharray:900;stroke-dashoffset:900;animation:graphDraw 2.1s cubic-bezier(.2,.8,.2,1) .15s forwards;}
.graph-point-anim{animation:pulseGlow 2.4s ease-in-out infinite;transform-origin:center;transform-box:fill-box;}
.float-anim{animation:bob 4.6s ease-in-out infinite;transform-origin:center;transform-box:fill-box;}
.float-soft-anim{animation:bobSoft 5.8s ease-in-out infinite;transform-origin:center;transform-box:fill-box;}
.sway-anim{animation:sway 5.2s ease-in-out infinite;transform-origin:center;transform-box:fill-box;}
.orbit-anim{animation:orbitPulse 3.2s ease-in-out infinite;transform-origin:center;transform-box:fill-box;}
.dash-anim{animation:dashMove 1.1s linear infinite;}
.node-pop-anim{animation:nodePop 2.8s ease-in-out infinite;transform-origin:center;transform-box:fill-box;}
.bar-rise-anim{animation:riseBars 1.2s cubic-bezier(.2,.8,.2,1) both;transform-origin:bottom;transform-box:fill-box;}
.scan-shell{position:relative;overflow:hidden;}
.scan-shell::after{content:'';position:absolute;inset:-20%;background:linear-gradient(110deg,transparent 35%,rgba(255,244,223,.12) 50%,transparent 65%);animation:scan 4.6s linear infinite;pointer-events:none;}
.shimmer-anim{animation:shimmer 2.7s ease-in-out infinite;}
@media (prefers-reduced-motion: reduce){
  .graph-line-anim,.graph-point-anim,.float-anim,.float-soft-anim,.sway-anim,.orbit-anim,.dash-anim,.node-pop-anim,.bar-rise-anim,.shimmer-anim,.animated-panel,.scroll-hint{animation:none !important;}
  .scan-shell::after{animation:none !important;display:none;}
}
.cursor-glow{position:fixed;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,.13),rgba(124,58,237,.07) 36%,transparent 68%);pointer-events:none;z-index:4;transform:translate(-50%,-50%);mix-blend-mode:screen;filter:blur(10px);transition:opacity .25s ease;}
.scroll-hint{position:absolute;left:50%;bottom:20px;transform:translateX(-50%);font-family:var(--mono);font-size:8px;letter-spacing:.35em;text-transform:uppercase;color:rgba(255,244,223,.38);animation:scrollNudge 2.2s ease-in-out infinite;}
.ambient-glow{animation:glowBreath 7s ease-in-out infinite;}
.parallax-layer{will-change:transform;}
`;

function useReveal() {
  useEffect(() => {
    const run = () => document.querySelectorAll(".rv:not(.in)").forEach((el,i) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 30) {
        el.style.transitionDelay = `${Math.min(i * 35, 180)}ms`;
        el.classList.add("in");
      }
    });
    run();
    window.addEventListener("scroll", run, { passive: true });
    return () => window.removeEventListener("scroll", run);
  });
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div className="cursor-glow" style={{ left: pos.x, top: pos.y }} />;
}

function useParallax() {
  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      document.querySelectorAll("[data-parallax]").forEach(el => {
        const speed = Number(el.getAttribute("data-parallax")) || 0;
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
}

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => { const d = new Date(); setT(`${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`); };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return <span>{t}</span>;
}

function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let w = c.width = c.offsetWidth, h = c.height = c.offsetHeight;
    const pts = Array.from({ length: 45 }, () => ({ x: Math.random()*w, y: Math.random()*h, vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3, r:Math.random()*1.3+.4, a:Math.random()*.45+.1 }));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      pts.forEach(p => { p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(249,115,22,${p.a})`; ctx.fill(); });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<100){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(249,115,22,${.06*(1-d/100)})`;ctx.lineWidth=.5;ctx.stroke();}}
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:1, pointerEvents:"none", opacity:.8 }}/>;
}

function Marquee() {
  const items = ["AI-Native Production","Vertical Content Series","Creator-Led Mini-Movies","Micro-Dramas","Brand Story Engine","Cinematic Quality","Global Distribution","Story-First Strategy","Southeast Asia Based","Built to Travel"];
  const all = [...items,...items];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {all.map((item,i) => <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:14, paddingRight:36, fontFamily:"var(--mono)", fontSize:10, letterSpacing:".28em", textTransform:"uppercase", color:"rgba(255,244,223,.42)", whiteSpace:"nowrap" }}><span style={{ color:"var(--amber)", fontSize:7 }}>◆</span>{item}</span>)}
      </div>
    </div>
  );
}

function TiltCard({ children, style={} }) {
  const ref = useRef(null);
  const mv = e => { const el=ref.current; if(!el)return; const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5; el.style.transform=`perspective(800px) rotateY(${x*9}deg) rotateX(${-y*7}deg) scale(1.02)`; el.style.boxShadow=`${-x*18}px ${-y*12}px 55px rgba(249,115,22,.16)`; };
  const lv = () => { const el=ref.current; if(!el)return; el.style.transform="perspective(800px) rotateY(0) rotateX(0) scale(1)"; el.style.boxShadow="0 0 70px rgba(249,115,22,.1)"; };
  return <div ref={ref} className="tilt" onMouseMove={mv} onMouseLeave={lv} style={{ boxShadow:"0 0 70px rgba(249,115,22,.1)", ...style }}>{children}</div>;
}

function StatPill({ num, label, delay=0 }) {
  return (
    <div style={{ display:"inline-flex", flexDirection:"column", gap:2, background:"rgba(0,0,0,.65)", border:"1px solid rgba(249,115,22,.24)", borderRadius:12, padding:"11px 18px", backdropFilter:"blur(10px)", animation:`statIn .6s ease ${delay}s both` }}>
      <span className="ttl" style={{ fontSize:26, color:"#fff4df", lineHeight:1 }}>{num}</span>
      <span style={{ fontFamily:"var(--mono)", fontSize:8, letterSpacing:".2em", textTransform:"uppercase", color:"rgba(253,186,116,.68)" }}>{label}</span>
    </div>
  );
}

function RollingNumber({ value, prefix="", suffix="", decimals=0, duration=1400 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true;
        const start = performance.now();
        const step = now => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(value * eased);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: .35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{prefix}{display.toFixed(decimals)}{suffix}</span>;
}

function HeroSVG() {
  return (
    <svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"auto", display:"block" }}>
      <defs>
        <linearGradient id="hBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2d1015"/><stop offset=".5" stopColor="#150f23"/><stop offset="1" stopColor="#050305"/></linearGradient>
        <linearGradient id="phG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fed7aa"/><stop offset="1" stopColor="#0a0808"/></linearGradient>
        <radialGradient id="hg1" cx="30%" cy="26%" r="44%"><stop offset="0" stopColor="rgba(249,115,22,.5)"/><stop offset="1" stopColor="transparent"/></radialGradient>
        <radialGradient id="hg2" cx="70%" cy="65%" r="38%"><stop offset="0" stopColor="rgba(124,58,237,.42)"/><stop offset="1" stopColor="transparent"/></radialGradient>
        <filter id="hb"><feGaussianBlur stdDeviation="28"/></filter>
        <filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <clipPath id="hc"><rect width="900" height="520" rx="22"/></clipPath>
      </defs>
      <g clipPath="url(#hc)">
        <rect width="900" height="520" fill="url(#hBg)"/>
        <ellipse cx="270" cy="140" rx="230" ry="230" fill="url(#hg1)" filter="url(#hb)"/>
        <ellipse cx="640" cy="350" rx="210" ry="210" fill="url(#hg2)" filter="url(#hb)"/>
        {[1,2,3,4,5].map(i=><line key={i} x1={i*150} y1="0" x2={i*150} y2="520" stroke="rgba(255,255,255,.022)" strokeWidth="1"/>)}
        {[1,2,3].map(i=><line key={i} x1="0" y1={i*130} x2="900" y2={i*130} stroke="rgba(255,255,255,.022)" strokeWidth="1"/>)}
        <rect width="900" height="46" fill="rgba(255,255,255,.05)"/>
        <line x1="0" y1="46" x2="900" y2="46" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
        <text x="22" y="28" fill="rgba(255,244,223,.75)" fontFamily="Space Mono" fontSize="10" letterSpacing="3">AI // STORY ENGINE</text>
        <text x="420" y="28" fill="rgba(255,244,223,.3)" fontFamily="Space Mono" fontSize="9" textAnchor="middle" letterSpacing="2">BANGZUU STUDIOS</text>
        <text x="800" y="28" fill="rgba(255,244,223,.55)" fontFamily="Space Mono" fontSize="9" letterSpacing="2">REC ●</text>
        <circle cx="848" cy="26" r="5" fill="#ef4444"><animate attributeName="opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite"/></circle>
        {/* Phone 1 */}
        <rect x="50" y="70" width="148" height="238" rx="20" fill="rgba(0,0,0,.52)" stroke="rgba(255,255,255,.14)" strokeWidth="1.5"/>
        <rect x="58" y="80" width="132" height="218" rx="16" fill="url(#phG)" opacity=".95"/>
        <circle cx="124" cy="156" r="40" fill="rgba(0,0,0,.48)"/><circle cx="124" cy="156" r="24" fill="rgba(0,0,0,.65)"/>
        <polygon points="114,147 114,165 134,156" fill="rgba(253,186,116,.72)"/>
        <rect x="72" y="256" width="104" height="6" rx="3" fill="rgba(255,255,255,.35)"/>
        <rect x="72" y="280" width="104" height="26" rx="13" fill="rgba(249,115,22,.22)" stroke="rgba(249,115,22,.45)" strokeWidth="1"/>
        <text x="124" y="298" fill="#fde68a" fontFamily="Space Mono" fontSize="8" textAnchor="middle" letterSpacing="1">EPISODE 01</text>
        {/* Phone 2 - centre */}
        <rect x="238" y="56" width="166" height="284" rx="24" fill="rgba(0,0,0,.58)" stroke="rgba(253,186,116,.38)" strokeWidth="2"/>
        <rect x="246" y="66" width="150" height="264" rx="20" fill="rgba(253,186,116,.22)"/>
        <ellipse cx="321" cy="194" rx="65" ry="65" fill="rgba(249,115,22,.2)" filter="url(#hb)"/>
        <circle cx="321" cy="176" r="46" fill="rgba(0,0,0,.42)"/>
        <text x="321" y="184" fill="rgba(253,186,116,.9)" fontFamily="Bebas Neue" fontSize="22" textAnchor="middle" letterSpacing="3">STORY</text>
        <rect x="258" y="280" width="126" height="7" rx="3" fill="rgba(255,255,255,.32)"/>
        <rect x="258" y="304" width="126" height="30" rx="15" fill="rgba(249,115,22,.2)" stroke="rgba(249,115,22,.42)" strokeWidth="1"/>
        <text x="321" y="324" fill="#fde68a" fontFamily="Space Mono" fontSize="8" textAnchor="middle" letterSpacing="1">BRAND STORY ▶</text>
        {/* Phone 3 */}
        <rect x="444" y="78" width="136" height="218" rx="18" fill="rgba(124,58,237,.17)" stroke="rgba(167,139,250,.24)" strokeWidth="1.5"/>
        <rect x="452" y="88" width="120" height="198" rx="14" fill="rgba(124,58,237,.13)"/>
        <rect x="466" y="110" width="92" height="6" rx="3" fill="rgba(167,139,250,.32)"/>
        <rect x="466" y="124" width="68" height="5" rx="2.5" fill="rgba(167,139,250,.2)"/>
        <rect x="466" y="156" width="92" height="76" rx="10" fill="rgba(0,0,0,.32)" stroke="rgba(255,255,255,.07)"/>
        <text x="512" y="188" fill="rgba(253,186,116,.82)" fontFamily="Space Mono" fontSize="7.5" textAnchor="middle" letterSpacing="1">AI SCRIPT</text>
        <text x="512" y="204" fill="rgba(255,244,223,.38)" fontFamily="Space Mono" fontSize="6.5" textAnchor="middle">GENERATING...</text>
        <rect x="466" y="244" width="92" height="26" rx="13" fill="rgba(124,58,237,.18)" stroke="rgba(167,139,250,.28)" strokeWidth="1"/>
        <text x="512" y="262" fill="rgba(167,139,250,.9)" fontFamily="Space Mono" fontSize="7.5" textAnchor="middle">◆ APPROVED</text>
        {/* Bottom panel */}
        <rect x="50" y="352" width="544" height="144" rx="18" fill="rgba(0,0,0,.56)" stroke="rgba(255,255,255,.09)" strokeWidth="1"/>
        <rect x="50" y="352" width="544" height="1" fill="rgba(249,115,22,.18)"/>
        <text x="76" y="376" fill="rgba(255,244,223,.48)" fontFamily="Space Mono" fontSize="9" letterSpacing="2">PRODUCTION TIMELINE</text>
        <text x="550" y="376" fill="rgba(255,244,223,.38)" fontFamily="Space Mono" fontSize="9" textAnchor="end">00:48 / 02:16</text>
        {["Script","Creator","Brand","Distribute"].map((l,i)=>(<g key={l}><rect x={76+i*126} y="388" width="112" height="32" rx="9" fill={i===2?"rgba(249,115,22,.18)":"rgba(255,255,255,.05)"} stroke={i===2?"rgba(249,115,22,.38)":"rgba(255,255,255,.1)"} strokeWidth="1"/><text x={132+i*126} y="409" fill={i===2?"#fde68a":"rgba(255,244,223,.48)"} fontFamily="Space Mono" fontSize="9" textAnchor="middle" letterSpacing="1">{l}</text></g>))}
        <rect x="76" y="440" width="510" height="5" rx="2.5" fill="rgba(255,255,255,.07)"/>
        <rect x="76" y="440" width="308" height="5" rx="2.5" fill="rgba(249,115,22,.52)"/>
        <circle cx="384" cy="442" r="8" fill="#f97316" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" filter="url(#glow)"/>
        <text x="76" y="466" fill="rgba(255,244,223,.28)" fontFamily="Space Mono" fontSize="7.5">WEEK 1</text>
        <text x="216" y="466" fill="rgba(255,244,223,.28)" fontFamily="Space Mono" fontSize="7.5">WEEK 3</text>
        <text x="366" y="466" fill="rgba(249,115,22,.75)" fontFamily="Space Mono" fontSize="7.5" fontWeight="bold">NOW</text>
        <text x="490" y="466" fill="rgba(255,244,223,.28)" fontFamily="Space Mono" fontSize="7.5">DELIVERY</text>
        {/* Right metrics panel */}
        <rect x="636" y="68" width="218" height="420" rx="18" fill="rgba(0,0,0,.5)" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
        <rect x="636" y="68" width="218" height="1" fill="rgba(249,115,22,.16)"/>
        <text x="658" y="100" fill="rgba(253,186,116,.72)" fontFamily="Space Mono" fontSize="9" letterSpacing="2">METRICS</text>
        {[["Views","2.1M"],["Episodes","12"],["Avg Watch","87%"],["Brand Recall","4.2×"]].map(([l,v],i)=>(<g key={l}><text x="658" y={136+i*74} fill="rgba(255,244,223,.36)" fontFamily="Space Mono" fontSize="8" letterSpacing="1">{l}</text><text x="658" y={160+i*74} fill="rgba(255,244,223,.92)" fontFamily="Bebas Neue" fontSize="30" letterSpacing="2">{v}</text><rect x="658" y={167+i*74} width={v.includes("M")?76:v.includes("%")?56:v.includes("×")?52:66} height="3" rx="1.5" fill="rgba(249,115,22,.42)"/><line x1="658" y1={180+i*74} x2="832" y2={180+i*74} stroke="rgba(255,255,255,.045)" strokeWidth="1"/></g>))}
      </g>
    </svg>
  );
}

function TravelSVG() {
  return (
    <svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"auto", display:"block", borderRadius:"18px 18px 0 0" }}>
      <defs><linearGradient id="skyT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1a3a45"/><stop offset="1" stopColor="#0a1a1c"/></linearGradient><filter id="gT"><feGaussianBlur stdDeviation="18"/></filter></defs>
      <rect width="700" height="380" fill="url(#skyT)"/>
      <circle cx="210" cy="128" r="95" fill="rgba(251,191,36,.26)" filter="url(#gT)"/>
      <circle cx="210" cy="128" r="44" fill="#fbbf24" opacity=".8"/>
      <ellipse cx="350" cy="330" rx="350" ry="55" fill="rgba(249,115,22,.1)" filter="url(#gT)"/>
      <polygon points="0,380 160,172 320,380" fill="#1c3a3e"/>
      <polygon points="100,380 295,152 490,380" fill="#263f42"/>
      <polygon points="255,380 440,190 625,380" fill="#1a3032"/>
      <polygon points="380,380 530,230 680,380" fill="#0d2022"/>
      <rect x="0" y="318" width="700" height="62" fill="#050f10"/>
      <rect x="0" y="315" width="700" height="5" fill="rgba(253,186,116,.14)"/>
      <circle cx="350" cy="238" r="21" fill="rgba(0,0,0,.7)"/>
      <rect x="339" y="259" width="22" height="42" rx="11" fill="rgba(0,0,0,.65)"/>
      <rect x="327" y="255" width="26" height="18" rx="4" fill="rgba(253,186,116,.52)" stroke="rgba(253,186,116,.72)" strokeWidth="1"/>
      <circle cx="556" cy="192" r="20" fill="rgba(0,0,0,.5)" stroke="rgba(253,186,116,.28)" strokeWidth="1"/>
      <text x="556" y="198" fill="rgba(253,186,116,.8)" fontFamily="Space Mono" fontSize="11" textAnchor="middle">✈</text>
      <rect x="26" y="336" width="160" height="30" rx="15" fill="rgba(0,0,0,.62)" stroke="rgba(253,186,116,.24)"/>
      <text x="106" y="355" fill="#fde68a" fontFamily="Space Mono" fontSize="8.5" textAnchor="middle" letterSpacing="2">DESTINATION STORY</text>
      <text x="22" y="24" fill="rgba(255,244,223,.5)" fontFamily="Space Mono" fontSize="9" letterSpacing="3">TRAVEL & TOURISM</text>
    </svg>
  );
}

function EntSVG() {
  return (
    <svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"auto", display:"block", borderRadius:"18px 18px 0 0" }}>
      <defs><linearGradient id="bgE2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2c0d17"/><stop offset=".5" stopColor="#1b1230"/><stop offset="1" stopColor="#05030a"/></linearGradient><linearGradient id="phE2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fed7aa"/><stop offset="1" stopColor="#1a0810"/></linearGradient><filter id="gE2"><feGaussianBlur stdDeviation="20"/></filter></defs>
      <rect width="700" height="380" fill="url(#bgE2)"/>
      <ellipse cx="175" cy="155" rx="155" ry="155" fill="rgba(249,115,22,.22)" filter="url(#gE2)"/>
      <ellipse cx="545" cy="268" rx="135" ry="135" fill="rgba(124,58,237,.2)" filter="url(#gE2)"/>
      <rect x="52" y="56" width="110" height="196" rx="17" fill="url(#phE2)" opacity=".9" stroke="rgba(253,186,116,.25)" strokeWidth="1"/>
      <rect x="60" y="66" width="94" height="176" rx="13" fill="rgba(0,0,0,.34)"/>
      <circle cx="107" cy="142" r="30" fill="rgba(0,0,0,.5)"/>
      <polygon points="99,132 99,152 121,142" fill="rgba(253,186,116,.8)"/>
      <rect x="202" y="84" width="96" height="174" rx="15" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
      <rect x="348" y="66" width="110" height="206" rx="17" fill="rgba(124,58,237,.18)" stroke="rgba(167,139,250,.18)" strokeWidth="1"/>
      <rect x="52" y="280" width="565" height="82" rx="14" fill="rgba(0,0,0,.55)" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
      <text x="76" y="304" fill="rgba(253,186,116,.7)" fontFamily="Space Mono" fontSize="8.5" letterSpacing="2">EPISODE QUEUE</text>
      {["EP01","EP02","EP03","EP04","EP05","EP06","EP07","EP08"].map((ep,i)=>(
        <g key={ep}><rect x={76+i*66} y="316" width="56" height="34" rx="7" fill={i<3?"rgba(249,115,22,.26)":"rgba(255,255,255,.05)"} stroke={i<3?"rgba(249,115,22,.45)":"rgba(255,255,255,.09)"} strokeWidth="1"/><text x={104+i*66} y="337" fill={i<3?"#fde68a":"rgba(255,244,223,.33)"} fontFamily="Space Mono" fontSize="7" textAnchor="middle">{ep}</text></g>
      ))}
      <text x="22" y="24" fill="rgba(255,244,223,.5)" fontFamily="Space Mono" fontSize="9" letterSpacing="3">ENTERTAINMENT & MEDIA</text>
      <text x="654" y="42" fill="rgba(253,186,116,.52)" fontSize="32">▣</text>
    </svg>
  );
}

function FitSVG() {
  return (
    <svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"auto", display:"block", borderRadius:"18px 18px 0 0" }}>
      <defs><linearGradient id="bgF2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3a1a0b"/><stop offset=".5" stopColor="#101511"/><stop offset="1" stopColor="#050808"/></linearGradient><linearGradient id="phF2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fed7aa"/><stop offset="1" stopColor="#0a0e0b"/></linearGradient><filter id="gF2"><feGaussianBlur stdDeviation="22"/></filter></defs>
      <rect width="700" height="380" fill="url(#bgF2)"/>
      <ellipse cx="195" cy="175" rx="155" ry="155" fill="rgba(249,115,22,.28)" filter="url(#gF2)"/>
      <rect x="270" y="46" width="148" height="268" rx="23" fill="url(#phF2)" opacity=".92" stroke="rgba(253,186,116,.3)" strokeWidth="1.5"/>
      <rect x="278" y="56" width="132" height="248" rx="19" fill="rgba(0,0,0,.33)"/>
      <circle cx="344" cy="145" r="42" fill="rgba(0,0,0,.54)"/><circle cx="344" cy="130" r="20" fill="rgba(0,0,0,.7)"/>
      <ellipse cx="344" cy="170" rx="23" ry="17" fill="rgba(0,0,0,.54)"/>
      <rect x="286" y="238" width="112" height="7" rx="3" fill="rgba(255,255,255,.3)"/>
      <rect x="282" y="256" width="120" height="28" rx="14" fill="rgba(249,115,22,.2)" stroke="rgba(249,115,22,.38)" strokeWidth="1"/>
      <text x="342" y="274" fill="#fde68a" fontFamily="Space Mono" fontSize="7" textAnchor="middle" letterSpacing="1">PROTOCOL →</text>
      <rect x="78" y="84" width="112" height="188" rx="17" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
      <rect x="502" y="122" width="158" height="30" rx="15" fill="rgba(249,115,22,.14)" stroke="rgba(249,115,22,.3)" strokeWidth="1"/>
      <text x="581" y="141" fill="#fde68a" fontFamily="Space Mono" fontSize="8.5" textAnchor="middle">Comeback Story</text>
      <rect x="26" y="334" width="148" height="28" rx="14" fill="rgba(0,0,0,.6)" stroke="rgba(253,186,116,.22)"/>
      <text x="100" y="352" fill="#fde68a" fontFamily="Space Mono" fontSize="8.5" textAnchor="middle" letterSpacing="2">COMEBACK ARC</text>
      <text x="22" y="24" fill="rgba(255,244,223,.5)" fontFamily="Space Mono" fontSize="9" letterSpacing="3">FITNESS & LIFESTYLE</text>
      <text x="654" y="42" fill="rgba(253,186,116,.52)" fontSize="32">◈</text>
    </svg>
  );
}

function ProcessSVG({ type }) {
  if (type === "brand") return (<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"auto", display:"block" }}><defs><linearGradient id="pb1b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2b1a10"/><stop offset="1" stopColor="#080604"/></linearGradient><filter id="gPB2"><feGaussianBlur stdDeviation="12"/></filter></defs><rect width="360" height="190" fill="url(#pb1b)"/><circle cx="290" cy="70" r="75" fill="rgba(249,115,22,.22)" filter="url(#gPB2)"/><rect x="34" y="32" width="126" height="138" rx="10" fill="#111" stroke="rgba(255,255,255,.14)" strokeWidth="1" transform="rotate(-6 34 32)"/><text x="50" y="78" fill="#fff4df" fontFamily="Bebas Neue" fontSize="17" letterSpacing="2">BRAND</text><text x="50" y="98" fill="#fff4df" fontFamily="Bebas Neue" fontSize="17" letterSpacing="2">STRATEGY</text><rect x="50" y="112" width="70" height="5" rx="2" fill="rgba(255,255,255,.24)"/><rect x="196" y="36" width="136" height="122" rx="12" fill="rgba(255,244,223,.1)" stroke="rgba(253,186,116,.24)" strokeWidth="1" transform="rotate(7 196 36)"/><circle cx="263" cy="100" r="34" fill="rgba(249,115,22,.16)" stroke="rgba(253,186,116,.48)" strokeWidth="1"/><text x="263" y="98" fill="#fde68a" fontFamily="Space Mono" fontSize="6.5" textAnchor="middle" letterSpacing="1">STORY</text><text x="263" y="110" fill="#fde68a" fontFamily="Space Mono" fontSize="6.5" textAnchor="middle" letterSpacing="1">REASON</text></svg>);
  if (type === "ai") return (<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"auto", display:"block" }}><defs><linearGradient id="pb2b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#17132d"/><stop offset="1" stopColor="#050308"/></linearGradient><radialGradient id="cAI2" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="rgba(125,211,252,.5)"/><stop offset="1" stopColor="transparent"/></radialGradient><filter id="gPA2"><feGaussianBlur stdDeviation="14"/></filter></defs><rect width="360" height="190" fill="url(#pb2b)"/><circle cx="110" cy="96" r="92" fill="url(#cAI2)" filter="url(#gPA2)"/><circle cx="110" cy="96" r="52" fill="#0b1220" stroke="rgba(125,211,252,.4)" strokeWidth="2"/><text x="110" y="108" fill="#e0f2fe" fontFamily="Bebas Neue" fontSize="32" textAnchor="middle" letterSpacing="4">AI</text>{["Story Struct","Beat Sheet","Visual Dev"].map((l,i)=>(<g key={l}><rect x="228" y={30+i*46} width="112" height="34" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/><text x="244" y={52+i*46} fill="rgba(255,244,223,.7)" fontFamily="Space Mono" fontSize="7.5" letterSpacing="1">✓ {l}</text></g>))}</svg>);
  if (type === "creator") return (<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"auto", display:"block" }}><defs><linearGradient id="pb3b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#24120f"/><stop offset="1" stopColor="#060508"/></linearGradient><linearGradient id="phCb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fed7aa"/><stop offset="1" stopColor="#120808"/></linearGradient></defs><rect width="360" height="190" fill="url(#pb3b)"/><rect x="30" y="12" width="72" height="130" rx="14" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/><rect x="134" y="8" width="84" height="152" rx="15" fill="url(#phCb)" opacity=".9" stroke="rgba(253,186,116,.3)" strokeWidth="1.5"/><rect x="142" y="18" width="68" height="132" rx="11" fill="rgba(0,0,0,.34)"/><circle cx="176" cy="78" r="26" fill="rgba(0,0,0,.5)"/><circle cx="176" cy="66" r="12" fill="rgba(0,0,0,.7)"/><rect x="146" y="124" width="60" height="5" rx="2" fill="rgba(255,255,255,.28)"/><rect x="262" y="26" width="58" height="130" rx="13" fill="rgba(124,58,237,.1)" stroke="rgba(167,139,250,.14)" strokeWidth="1"/><rect x="30" y="156" width="290" height="26" rx="13" fill="rgba(0,0,0,.56)" stroke="rgba(255,255,255,.07)" strokeWidth="1"/><text x="175" y="174" fill="rgba(255,244,223,.55)" fontFamily="Space Mono" fontSize="8" textAnchor="middle" letterSpacing="2">CREATOR · 2.1M VIEWS</text></svg>);
  return (<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"auto", display:"block" }}><defs><linearGradient id="pb4b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#19161d"/><stop offset="1" stopColor="#060408"/></linearGradient></defs><rect width="360" height="190" fill="url(#pb4b)"/><text x="20" y="24" fill="rgba(253,186,116,.7)" fontFamily="Space Mono" fontSize="8" letterSpacing="3">ASSET LIBRARY</text><rect x="20" y="34" width="86" height="66" rx="9" fill="rgba(249,115,22,.2)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/><rect x="118" y="34" width="86" height="66" rx="9" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/><rect x="216" y="34" width="124" height="66" rx="9" fill="rgba(124,58,237,.13)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/><rect x="20" y="112" width="86" height="56" rx="9" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.08)" strokeWidth="1"/><rect x="118" y="112" width="86" height="56" rx="9" fill="rgba(249,115,22,.14)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/><rect x="216" y="104" width="124" height="78" rx="11" fill="rgba(0,0,0,.65)" stroke="rgba(255,255,255,.11)" strokeWidth="1"/><text x="230" y="122" fill="rgba(253,186,116,.8)" fontFamily="Space Mono" fontSize="7.5" letterSpacing="2">VERSIONS</text><text x="230" y="140" fill="rgba(255,244,223,.58)" fontFamily="Space Mono" fontSize="7.5">✓ 16:9 Landscape</text><text x="230" y="156" fill="rgba(255,244,223,.58)" fontFamily="Space Mono" fontSize="7.5">✓ 9:16 Vertical</text><text x="230" y="172" fill="rgba(255,244,223,.58)" fontFamily="Space Mono" fontSize="7.5">✓ 1:1 Square</text></svg>);
}

function StudioSVG() {
  return (
    <svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" className="animated-panel" style={{ width:"100%", height:"auto", display:"block", borderRadius:18, border:"1px solid rgba(255,255,255,.08)", overflow:"hidden" }}>
      <defs><linearGradient id="stBg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1a1028"/><stop offset="1" stopColor="#060505"/></linearGradient><filter id="stBl"><feGaussianBlur stdDeviation="22"/></filter></defs>
      <rect width="560" height="320" fill="url(#stBg2)"/>
      <ellipse cx="168" cy="128" rx="120" ry="120" fill="rgba(249,115,22,.26)" filter="url(#stBl)" className="orbit-anim"/>
      <ellipse cx="392" cy="128" rx="120" ry="120" fill="rgba(124,58,237,.24)" filter="url(#stBl)" className="orbit-anim"/>
      <ellipse cx="280" cy="236" rx="100" ry="100" fill="rgba(52,211,153,.18)" filter="url(#stBl)" className="orbit-anim"/>
      <circle cx="168" cy="128" r="90" fill="none" stroke="rgba(249,115,22,.32)" strokeWidth="1.5"/>
      <circle cx="392" cy="128" r="90" fill="none" stroke="rgba(124,58,237,.32)" strokeWidth="1.5"/>
      <circle cx="280" cy="226" r="90" fill="none" stroke="rgba(52,211,153,.26)" strokeWidth="1.5"/>
      <text x="114" y="110" fill="rgba(249,115,22,.88)" fontFamily="Bebas Neue" fontSize="15" textAnchor="middle" letterSpacing="2">AI-ASSISTED</text>
      <text x="114" y="128" fill="rgba(249,115,22,.88)" fontFamily="Bebas Neue" fontSize="15" textAnchor="middle" letterSpacing="2">PRODUCTION</text>
      <text x="446" y="110" fill="rgba(167,139,250,.88)" fontFamily="Bebas Neue" fontSize="15" textAnchor="middle" letterSpacing="2">CREATOR</text>
      <text x="446" y="128" fill="rgba(167,139,250,.88)" fontFamily="Bebas Neue" fontSize="15" textAnchor="middle" letterSpacing="2">DISTRIBUTION</text>
      <text x="280" y="264" fill="rgba(52,211,153,.82)" fontFamily="Bebas Neue" fontSize="15" textAnchor="middle" letterSpacing="2">STORY-FIRST</text>
      <text x="280" y="280" fill="rgba(52,211,153,.82)" fontFamily="Bebas Neue" fontSize="15" textAnchor="middle" letterSpacing="2">STRATEGY</text>
      <circle cx="280" cy="168" r="36" fill="rgba(255,244,223,.06)" stroke="rgba(255,244,223,.16)" strokeWidth="1.5" className="node-pop-anim"/>
      <text x="280" y="163" fill="#fff4df" fontFamily="Bebas Neue" fontSize="12" textAnchor="middle" letterSpacing="2">BANGZUU</text>
      <text x="280" y="178" fill="rgba(253,186,116,.78)" fontFamily="Bebas Neue" fontSize="12" textAnchor="middle" letterSpacing="2">STUDIOS</text>
      <text x="20" y="20" fill="rgba(255,244,223,.3)" fontFamily="Space Mono" fontSize="7.5" letterSpacing="3">THE INTERSECTION</text>
    </svg>
  );
}

function MarketSVG() {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);
  const pts = [18,28,22,38,32,52,45,68,58,82,72,96,88,118,105,138];
  const path = pts.map((y,i)=>`${i===0?"M":"L"}${30+i*32},${177-y}`).join(" ");
  const area = path + ` L${30+15*32},177 L30,177 Z`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAnimate(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 560 236" xmlns="http://www.w3.org/2000/svg" className="animated-panel" style={{ width:"100%", height:"auto", display:"block", borderRadius:18, border:"1px solid rgba(255,255,255,.08)", overflow:"hidden" }}>
      <defs><linearGradient id="mkBg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0d0a18"/><stop offset="1" stopColor="#060505"/></linearGradient><linearGradient id="mkLn" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#7c3aed"/><stop offset=".5" stopColor="#f97316"/><stop offset="1" stopColor="#fde68a"/></linearGradient><linearGradient id="mkAr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(249,115,22,.22)"/><stop offset="1" stopColor="rgba(249,115,22,0)"/></linearGradient><filter id="mkBl"><feGaussianBlur stdDeviation="10"/></filter></defs>
      <rect width="560" height="236" fill="url(#mkBg2)"/>
      {[62,102,142,177].map(y=><line key={y} x1="30" y1={y} x2="530" y2={y} stroke="rgba(255,255,255,.04)" strokeWidth="1"/>)}
      <path d={area} fill="url(#mkAr)" opacity=".85"/>
      <path d={path} fill="none" stroke="rgba(249,115,22,.35)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" filter="url(#mkBl)" className={animate?"graph-line-anim":""}/>
      <path d={path} fill="none" stroke="url(#mkLn)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={animate?"graph-line-anim":""}/>
      {pts.map((y,i)=> i%4===3 && (<g key={i}><circle cx={30+i*32} cy={177-y} r="5" fill="#f97316" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" className="graph-point-anim"/><rect x={30+i*32-20} y={177-y-24} width="40" height="16" rx="5" fill="rgba(0,0,0,.7)" stroke="rgba(249,115,22,.28)" strokeWidth="1"/><text x={30+i*32} y={177-y-12} fill="#fde68a" fontFamily="Space Mono" fontSize="7" textAnchor="middle">{(y*0.14).toFixed(0)}B</text></g>))}
      {["$0","$5B","$10B","$15B"].map((l,i)=><text key={l} x="22" y={180-i*38} fill="rgba(255,244,223,.28)" fontFamily="Space Mono" fontSize="6.5" textAnchor="end">{l}</text>)}
      {["2020","2022","2024","2026"].map((l,i)=><text key={l} x={30+i*160} y="198" fill="rgba(255,244,223,.28)" fontFamily="Space Mono" fontSize="6.5" textAnchor="middle">{l}</text>)}
      <line x1={30+10*32} y1="38" x2={30+10*32} y2="179" stroke="rgba(249,115,22,.3)" strokeWidth="1" strokeDasharray="4,3"/>
      <rect x={30+10*32-18} y="40" width="52" height="16" rx="5" fill="rgba(249,115,22,.18)" stroke="rgba(249,115,22,.38)" strokeWidth="1"/>
      <text x={30+10*32+8} y="52" fill="#fde68a" fontFamily="Space Mono" fontSize="7" textAnchor="middle">NOW</text>
      <rect x="372" y="48" width="148" height="74" rx="12" fill="rgba(0,0,0,.62)" stroke="rgba(249,115,22,.22)" strokeWidth="1"/>
      <text x="446" y="74" fill="rgba(253,186,116,.58)" fontFamily="Space Mono" fontSize="7.5" textAnchor="middle" letterSpacing="2">2025 VALUE</text>
      <text x="446" y="102" fill="#fff4df" fontFamily="Bebas Neue" fontSize="32" textAnchor="middle" letterSpacing="2">$11B</text>
      <text x="20" y="20" fill="rgba(255,244,223,.28)" fontFamily="Space Mono" fontSize="7" letterSpacing="3">MARKET GROWTH</text>
    </svg>
  );
}

function StoryWorldsBanner() {
  return (
    <svg viewBox="0 0 1200 280" xmlns="http://www.w3.org/2000/svg" className="animated-panel" style={{ width:"100%", height:"auto", display:"block" }}>
      <defs>
        <linearGradient id="swBg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0d0208"/><stop offset=".35" stopColor="#1a0f28"/><stop offset=".65" stopColor="#0f1a10"/><stop offset="1" stopColor="#0d0208"/></linearGradient>
        <filter id="swBl"><feGaussianBlur stdDeviation="28"/></filter>
      </defs>
      <rect width="1200" height="280" fill="url(#swBg2)"/>
      <ellipse cx="240" cy="140" rx="200" ry="120" fill="rgba(249,115,22,.28)" filter="url(#swBl)"/>
      <ellipse cx="600" cy="140" rx="180" ry="100" fill="rgba(124,58,237,.24)" filter="url(#swBl)"/>
      <ellipse cx="960" cy="140" rx="200" ry="120" fill="rgba(52,211,153,.18)" filter="url(#swBl)"/>
      {Array.from({length:21},(_,i)=><line key={i} x1={i*60} y1="0" x2={i*60} y2="280" stroke="rgba(255,255,255,.02)" strokeWidth="1"/>)}
      {/* Travel world */}
      <rect x="56" y="52" width="268" height="176" rx="14" fill="rgba(0,0,0,.42)" stroke="rgba(249,115,22,.22)" strokeWidth="1"/>
      <polygon points="56,228 190,128 324,228" fill="#1c3a3e" opacity=".9"/>
      <polygon points="96,228 218,148 340,228" fill="#263f42" opacity=".8"/>
      <circle cx="138" cy="104" r="30" fill="#fbbf24" opacity=".72"/>
      <rect x="64" y="202" width="100" height="20" rx="10" fill="rgba(0,0,0,.6)" stroke="rgba(249,115,22,.28)"/>
      <text x="114" y="216" fill="#fde68a" fontFamily="Space Mono" fontSize="7.5" textAnchor="middle" letterSpacing="2">TRAVEL</text>
      {/* Entertainment world */}
      <rect x="460" y="36" width="280" height="208" rx="14" fill="rgba(0,0,0,.42)" stroke="rgba(124,58,237,.26)" strokeWidth="1.5"/>
      <rect x="478" y="58" width="82" height="132" rx="12" fill="rgba(253,186,116,.2)" stroke="rgba(253,186,116,.28)" strokeWidth="1"/>
      <text x="519" y="118" fill="#fff4df" fontFamily="Bebas Neue" fontSize="17" textAnchor="middle" letterSpacing="2">MICRO</text>
      <text x="519" y="138" fill="#fde68a" fontFamily="Bebas Neue" fontSize="17" textAnchor="middle" letterSpacing="2">DRAMA</text>
      <rect x="574" y="72" width="72" height="108" rx="10" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
      <rect x="658" y="82" width="64" height="94" rx="10" fill="rgba(124,58,237,.16)" stroke="rgba(167,139,250,.18)" strokeWidth="1"/>
      <rect x="468" y="200" width="120" height="20" rx="10" fill="rgba(0,0,0,.6)" stroke="rgba(124,58,237,.28)"/>
      <text x="528" y="214" fill="rgba(167,139,250,.88)" fontFamily="Space Mono" fontSize="7.5" textAnchor="middle" letterSpacing="2">ENTERTAINMENT</text>
      {/* Fitness world */}
      <rect x="876" y="52" width="268" height="176" rx="14" fill="rgba(0,0,0,.42)" stroke="rgba(52,211,153,.2)" strokeWidth="1"/>
      <circle cx="1010" cy="122" r="52" fill="rgba(249,115,22,.16)"/>
      <circle cx="1010" cy="106" r="22" fill="rgba(0,0,0,.58)"/>
      <ellipse cx="1010" cy="148" rx="28" ry="20" fill="rgba(0,0,0,.52)"/>
      <rect x="884" y="202" width="100" height="20" rx="10" fill="rgba(0,0,0,.6)" stroke="rgba(52,211,153,.28)"/>
      <text x="934" y="216" fill="rgba(52,211,153,.82)" fontFamily="Space Mono" fontSize="7.5" textAnchor="middle" letterSpacing="2">FITNESS</text>
      {/* Arrows */}
      <line x1="328" y1="140" x2="455" y2="140" stroke="rgba(255,255,255,.1)" strokeWidth="1" strokeDasharray="5,4"/>
      <polygon points="452,135 462,140 452,145" fill="rgba(255,255,255,.18)"/>
      <line x1="744" y1="140" x2="871" y2="140" stroke="rgba(255,255,255,.1)" strokeWidth="1" strokeDasharray="5,4"/>
      <polygon points="868,135 878,140 868,145" fill="rgba(255,255,255,.18)"/>
      <text x="600" y="264" fill="rgba(255,244,223,.16)" fontFamily="Bebas Neue" fontSize="20" textAnchor="middle" letterSpacing="6">STORY WORLDS</text>
    </svg>
  );
}

function CreatorNetworkSVG() {
  return (
    <svg viewBox="0 0 560 306" xmlns="http://www.w3.org/2000/svg" className="animated-panel" style={{ width:"100%", height:"auto", display:"block", borderRadius:18, border:"1px solid rgba(255,255,255,.08)", overflow:"hidden" }}>
      <defs>
        <linearGradient id="cnBgNew" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#120915"/><stop offset=".48" stopColor="#171024"/><stop offset="1" stopColor="#050505"/></linearGradient>
        <linearGradient id="phoneGlow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fed7aa"/><stop offset="1" stopColor="#14090b"/></linearGradient>
        <filter id="cnBlurNew"><feGaussianBlur stdDeviation="20"/></filter>
      </defs>
      <rect width="560" height="306" fill="url(#cnBgNew)"/>
      <ellipse cx="120" cy="130" rx="135" ry="135" fill="rgba(249,115,22,.18)" filter="url(#cnBlurNew)"/>
      <ellipse cx="434" cy="160" rx="128" ry="128" fill="rgba(124,58,237,.2)" filter="url(#cnBlurNew)"/>
      <text x="22" y="24" fill="rgba(255,244,223,.32)" fontFamily="Space Mono" fontSize="7.5" letterSpacing="3">CREATOR DISTRIBUTION</text>
      <rect x="42" y="54" width="118" height="198" rx="18" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)" strokeWidth="1"/>
      <rect x="50" y="62" width="102" height="182" rx="14" fill="url(#phoneGlow)" opacity=".9" className="sway-anim"/>
      <circle cx="101" cy="126" r="33" fill="rgba(0,0,0,.48)"/>
      <circle cx="101" cy="115" r="14" fill="rgba(0,0,0,.72)"/>
      <ellipse cx="101" cy="142" rx="19" ry="13" fill="rgba(0,0,0,.58)"/>
      <rect x="62" y="206" width="78" height="6" rx="3" fill="rgba(255,255,255,.28)"/>
      <text x="101" y="231" fill="#fde68a" fontFamily="Space Mono" fontSize="7" textAnchor="middle" letterSpacing="1">2.1M VIEWS</text>
      <rect x="205" y="72" width="132" height="162" rx="18" fill="rgba(0,0,0,.48)" stroke="rgba(249,115,22,.24)" strokeWidth="1"/>
      <text x="271" y="95" fill="rgba(253,186,116,.72)" fontFamily="Space Mono" fontSize="7.5" textAnchor="middle" letterSpacing="2">SERIES DROP</text>
      {[0,1,2].map(i=>(<g key={i}><rect x={220+i*31} y="112" width="24" height={58+i*18} rx="8" fill={i===2?"rgba(249,115,22,.4)":"rgba(255,255,255,.08)"} stroke="rgba(255,255,255,.09)" strokeWidth="1"/></g>))}
      <rect x="224" y="198" width="94" height="20" rx="10" fill="rgba(249,115,22,.14)" stroke="rgba(249,115,22,.28)"/>
      <text x="271" y="212" fill="#fde68a" fontFamily="Space Mono" fontSize="7" textAnchor="middle">AUDIENCE BUILT-IN</text>
      <rect x="382" y="48" width="136" height="210" rx="18" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
      <text x="450" y="75" fill="rgba(255,244,223,.42)" fontFamily="Space Mono" fontSize="7.5" textAnchor="middle" letterSpacing="2">CHANNEL MIX</text>
      {[["TRAVEL","1.2M"],["FITNESS","840K"],["LIFESTYLE","560K"],["BEAUTY","410K"]].map(([a,b],i)=>(<g key={a}><rect x="398" y={92+i*34} width="104" height="24" rx="8" fill={i===0?"rgba(249,115,22,.16)":"rgba(255,255,255,.045)"} stroke={i===0?"rgba(249,115,22,.28)":"rgba(255,255,255,.08)"}/><text x="410" y={108+i*34} fill={i===0?"#fde68a":"rgba(255,244,223,.55)"} fontFamily="Space Mono" fontSize="6.5">{a}</text><text x="490" y={108+i*34} fill="rgba(253,186,116,.7)" fontFamily="Space Mono" fontSize="6.5" textAnchor="end">{b}</text></g>))}
      <path d="M160 152 C178 152, 186 152, 205 152" fill="none" stroke="rgba(249,115,22,.35)" strokeWidth="1.5" strokeDasharray="4 4" className="dash-anim"/>
      <path d="M337 152 C356 152, 364 152, 382 152" fill="none" stroke="rgba(249,115,22,.35)" strokeWidth="1.5" strokeDasharray="4 4" className="dash-anim"/>
    </svg>
  );
}

function WhySVG() {
  return (
    <svg viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg" className="animated-panel" style={{ width:"100%", height:"auto", display:"block", borderRadius:18, border:"1px solid rgba(255,255,255,.08)", overflow:"hidden" }}>
      <defs>
        <linearGradient id="wyBgNew" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#170b08"/><stop offset=".5" stopColor="#160f20"/><stop offset="1" stopColor="#050505"/></linearGradient>
        <filter id="wyBlurNew"><feGaussianBlur stdDeviation="18"/></filter>
      </defs>
      <rect width="560" height="280" fill="url(#wyBgNew)"/>
      <ellipse cx="120" cy="135" rx="125" ry="125" fill="rgba(249,115,22,.2)" filter="url(#wyBlurNew)"/>
      <ellipse cx="430" cy="135" rx="125" ry="125" fill="rgba(124,58,237,.18)" filter="url(#wyBlurNew)"/>
      <text x="22" y="24" fill="rgba(255,244,223,.32)" fontFamily="Space Mono" fontSize="7.5" letterSpacing="3">AI-ASSISTED PRODUCTION</text>
      <rect x="24" y="42" width="512" height="196" rx="18" fill="rgba(0,0,0,.42)" stroke="rgba(255,255,255,.08)"/>
      <rect x="42" y="62" width="198" height="156" rx="14" fill="rgba(255,255,255,.035)" stroke="rgba(255,255,255,.08)"/>
      <text x="58" y="84" fill="rgba(253,186,116,.72)" fontFamily="Space Mono" fontSize="7" letterSpacing="2">SCRIPT BOARD</text>
      {[0,1,2].map(i=>(<g key={i}><rect x="58" y={100+i*32} width={i===1?132:154} height="18" rx="7" fill={i===1?"rgba(249,115,22,.18)":"rgba(255,255,255,.06)"} stroke={i===1?"rgba(249,115,22,.3)":"rgba(255,255,255,.07)"}/></g>))}
      <rect x="58" y="196" width="82" height="10" rx="5" fill="rgba(253,186,116,.32)"/>
      <rect x="262" y="62" width="256" height="92" rx="14" fill="rgba(255,255,255,.035)" stroke="rgba(255,255,255,.08)"/>
      <text x="278" y="84" fill="rgba(253,186,116,.72)" fontFamily="Space Mono" fontSize="7" letterSpacing="2">EDIT TIMELINE</text>
      {[0,1,2,3].map(i=>(<rect key={i} x={278+i*54} y="102" width="44" height="22" rx="6" fill={i===2?"rgba(249,115,22,.24)":"rgba(255,255,255,.06)"} stroke={i===2?"rgba(249,115,22,.34)":"rgba(255,255,255,.08)"}/>))}
      <rect x="278" y="134" width="214" height="4" rx="2" fill="rgba(255,255,255,.08)"/>
      <rect x="278" y="134" width="144" height="4" rx="2" fill="rgba(249,115,22,.5)"/>
      <circle cx="422" cy="136" r="6" fill="#f97316"/>
      <rect x="262" y="170" width="120" height="48" rx="12" fill="rgba(249,115,22,.12)" stroke="rgba(249,115,22,.28)"/>
      <text x="322" y="190" fill="#fde68a" fontFamily="Bebas Neue" fontSize="18" textAnchor="middle" letterSpacing="2">FAST</text>
      <text x="322" y="205" fill="rgba(255,244,223,.48)" fontFamily="Space Mono" fontSize="6.5" textAnchor="middle">4–8 WEEK DELIVERY</text>
      <rect x="398" y="170" width="120" height="48" rx="12" fill="rgba(124,58,237,.12)" stroke="rgba(167,139,250,.22)"/>
      <text x="458" y="190" fill="#fde68a" fontFamily="Bebas Neue" fontSize="18" textAnchor="middle" letterSpacing="2">CINEMATIC</text>
      <text x="458" y="205" fill="rgba(255,244,223,.48)" fontFamily="Space Mono" fontSize="6.5" textAnchor="middle">NOT GENERIC AI</text>
    </svg>
  );
}

function BrandInStorySVG() {
  return (
    <svg viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg" className="animated-panel" style={{ width:"100%", height:"auto", display:"block", borderRadius:18, border:"1px solid rgba(255,255,255,.08)", overflow:"hidden" }}>
      <defs>
        <linearGradient id="bsBgNew" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#18090f"/><stop offset=".55" stopColor="#100d18"/><stop offset="1" stopColor="#060505"/></linearGradient>
        <filter id="bsBlurNew"><feGaussianBlur stdDeviation="18"/></filter>
      </defs>
      <rect width="560" height="280" fill="url(#bsBgNew)"/>
      <ellipse cx="128" cy="120" rx="130" ry="120" fill="rgba(249,115,22,.18)" filter="url(#bsBlurNew)"/>
      <ellipse cx="450" cy="160" rx="120" ry="120" fill="rgba(52,211,153,.1)" filter="url(#bsBlurNew)"/>
      <text x="22" y="24" fill="rgba(255,244,223,.32)" fontFamily="Space Mono" fontSize="7.5" letterSpacing="3">BRAND AS THE PLOT</text>
      <rect x="24" y="42" width="344" height="196" rx="18" fill="rgba(0,0,0,.48)" stroke="rgba(255,255,255,.08)"/>
      <rect x="42" y="60" width="308" height="160" rx="14" fill="rgba(255,244,223,.04)"/>
      <rect x="42" y="60" width="308" height="78" rx="14" fill="rgba(28,11,41,.72)"/>
      <rect x="42" y="138" width="308" height="82" fill="rgba(10,24,16,.7)"/>
      <circle cx="150" cy="105" r="24" fill="rgba(0,0,0,.64)"/>
      <circle cx="150" cy="94" r="11" fill="rgba(0,0,0,.82)"/>
      <ellipse cx="150" cy="121" rx="14" ry="10" fill="rgba(0,0,0,.72)"/>
      <rect x="205" y="84" width="56" height="72" rx="10" fill="rgba(249,115,22,.2)" stroke="rgba(249,115,22,.42)" strokeWidth="1.5"/>
      <text x="233" y="114" fill="#fde68a" fontFamily="Bebas Neue" fontSize="12" textAnchor="middle" letterSpacing="1.5">BRAND</text>
      <text x="233" y="129" fill="rgba(253,186,116,.66)" fontFamily="Space Mono" fontSize="6" textAnchor="middle">IN STORY</text>
      <rect x="56" y="181" width="110" height="22" rx="11" fill="rgba(239,68,68,.1)" stroke="rgba(239,68,68,.22)"/>
      <text x="111" y="196" fill="rgba(239,68,68,.65)" fontFamily="Space Mono" fontSize="7" textAnchor="middle">NOT PRODUCT PLACEMENT</text>
      <rect x="182" y="181" width="138" height="22" rx="11" fill="rgba(52,211,153,.1)" stroke="rgba(52,211,153,.24)"/>
      <text x="251" y="196" fill="rgba(52,211,153,.75)" fontFamily="Space Mono" fontSize="7" textAnchor="middle">STORY TURNING POINT</text>
      <rect x="390" y="42" width="146" height="196" rx="18" fill="rgba(0,0,0,.48)" stroke="rgba(255,255,255,.08)"/>
      <text x="463" y="68" fill="rgba(253,186,116,.72)" fontFamily="Space Mono" fontSize="7.5" textAnchor="middle" letterSpacing="2">ASSET OUTPUT</text>
      {[["HERO FILM","03:10"],["VERTICAL CUT","09:16"],["SOCIAL EDIT","00:30"],["PAID AD","01:01"]].map(([a,b],i)=>(<g key={a}><rect x="406" y={84+i*32} width="114" height="22" rx="8" fill={i===1?"rgba(249,115,22,.16)":"rgba(255,255,255,.045)"} stroke={i===1?"rgba(249,115,22,.28)":"rgba(255,255,255,.08)"}/><text x="416" y={99+i*32} fill={i===1?"#fde68a":"rgba(255,244,223,.55)"} fontFamily="Space Mono" fontSize="6.5">{a}</text><text x="510" y={99+i*32} fill="rgba(253,186,116,.7)" fontFamily="Space Mono" fontSize="6.5" textAnchor="end">{b}</text></g>))}
    </svg>
  );
}

function FitnessOfferSVG() {
  return (
    <svg viewBox="0 0 560 420" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"auto", display:"block", borderRadius:18, border:"1px solid rgba(255,255,255,.08)", overflow:"hidden" }}>
      <defs>
        <linearGradient id="foBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#241108"/><stop offset=".5" stopColor="#111510"/><stop offset="1" stopColor="#050505"/></linearGradient>
        <linearGradient id="foPhone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fed7aa"/><stop offset=".45" stopColor="#fff4df"/><stop offset="1" stopColor="#0a0e0b"/></linearGradient>
        <filter id="foBlur"><feGaussianBlur stdDeviation="24"/></filter>
      </defs>
      <rect width="560" height="420" fill="url(#foBg)"/>
      <ellipse cx="145" cy="158" rx="150" ry="150" fill="rgba(249,115,22,.24)" filter="url(#foBlur)"/>
      <ellipse cx="440" cy="270" rx="138" ry="138" fill="rgba(52,211,153,.12)" filter="url(#foBlur)"/>
      <text x="22" y="26" fill="rgba(255,244,223,.34)" fontFamily="Space Mono" fontSize="8" letterSpacing="3">FITNESS SERIES SYSTEM</text>
      <rect x="28" y="48" width="184" height="324" rx="24" fill="rgba(0,0,0,.54)" stroke="rgba(253,186,116,.28)" strokeWidth="1.5"/>
      <rect x="39" y="61" width="162" height="298" rx="19" fill="url(#foPhone)" opacity=".94"/>
      <circle cx="120" cy="146" r="48" fill="rgba(0,0,0,.48)"/>
      <circle cx="120" cy="128" r="22" fill="rgba(0,0,0,.72)"/>
      <ellipse cx="120" cy="170" rx="27" ry="19" fill="rgba(0,0,0,.55)"/>
      <text x="120" y="232" fill="#fff4df" fontFamily="Bebas Neue" fontSize="20" textAnchor="middle" letterSpacing="2">COMEBACK</text>
      <text x="120" y="253" fill="#fde68a" fontFamily="Bebas Neue" fontSize="20" textAnchor="middle" letterSpacing="2">ARC</text>
      <rect x="61" y="286" width="118" height="7" rx="3.5" fill="rgba(255,255,255,.28)"/>
      <rect x="61" y="312" width="118" height="30" rx="15" fill="rgba(249,115,22,.18)" stroke="rgba(249,115,22,.38)"/>
      <text x="120" y="331" fill="#fde68a" fontFamily="Space Mono" fontSize="7.5" textAnchor="middle" letterSpacing="1">EPISODE 01 ▶</text>
      <rect x="236" y="48" width="292" height="98" rx="16" fill="rgba(0,0,0,.48)" stroke="rgba(255,255,255,.08)"/>
      <text x="254" y="72" fill="rgba(253,186,116,.72)" fontFamily="Space Mono" fontSize="7.5" letterSpacing="2">PRODUCT INTEGRATION</text>
      {[["SUPPLEMENT","Protocol"],["APPAREL","Identity"],["APP","Progress"]].map(([a,b],i)=>(<g key={a}><rect x={254+i*88} y="88" width="78" height="36" rx="10" fill={i===0?"rgba(249,115,22,.18)":"rgba(255,255,255,.05)"} stroke={i===0?"rgba(249,115,22,.32)":"rgba(255,255,255,.08)"}/><text x={293+i*88} y="103" fill={i===0?"#fde68a":"rgba(255,244,223,.55)"} fontFamily="Space Mono" fontSize="6.3" textAnchor="middle">{a}</text><text x={293+i*88} y="115" fill="rgba(255,244,223,.34)" fontFamily="Space Mono" fontSize="5.8" textAnchor="middle">{b}</text></g>))}
      <rect x="236" y="164" width="292" height="100" rx="16" fill="rgba(0,0,0,.48)" stroke="rgba(255,255,255,.08)"/>
      <text x="254" y="188" fill="rgba(253,186,116,.72)" fontFamily="Space Mono" fontSize="7.5" letterSpacing="2">SERIES STRUCTURE</text>
      {[["Wk 1","Start"],["Wk 3","Protocol"],["Wk 5","Breakthrough"],["Wk 8","Finish"]].map(([a,b],i)=>(<g key={a}><rect x={254+i*64} y="204" width="54" height="40" rx="10" fill={i===2?"rgba(249,115,22,.18)":"rgba(255,255,255,.05)"} stroke={i===2?"rgba(249,115,22,.32)":"rgba(255,255,255,.08)"}/><text x={281+i*64} y="220" fill={i===2?"#fde68a":"rgba(255,244,223,.56)"} fontFamily="Space Mono" fontSize="6.5" textAnchor="middle">{a}</text><text x={281+i*64} y="233" fill="rgba(255,244,223,.34)" fontFamily="Space Mono" fontSize="5.8" textAnchor="middle">{b}</text></g>))}
      <rect x="236" y="282" width="292" height="90" rx="16" fill="rgba(0,0,0,.48)" stroke="rgba(255,255,255,.08)"/>
      <text x="254" y="306" fill="rgba(253,186,116,.72)" fontFamily="Space Mono" fontSize="7.5" letterSpacing="2">REUSABLE OUTPUTS</text>
      {[["VERTICAL SERIES","09:16"],["HERO CUT","03:10"],["PAID SOCIAL","00:30"]].map(([a,b],i)=>(<g key={a}><rect x={254+i*86} y="322" width="76" height="30" rx="9" fill={i===0?"rgba(249,115,22,.16)":"rgba(255,255,255,.045)"} stroke={i===0?"rgba(249,115,22,.28)":"rgba(255,255,255,.08)"}/><text x={292+i*86} y="335" fill={i===0?"#fde68a":"rgba(255,244,223,.56)"} fontFamily="Space Mono" fontSize="6.2" textAnchor="middle">{a}</text><text x={292+i*86} y="346" fill="rgba(253,186,116,.65)" fontFamily="Space Mono" fontSize="5.8" textAnchor="middle">{b}</text></g>))}
      <rect x="28" y="388" width="500" height="14" rx="7" fill="rgba(0,0,0,.5)" stroke="rgba(255,255,255,.06)"/>
      <text x="278" y="398" fill="rgba(255,244,223,.42)" fontFamily="Space Mono" fontSize="6.7" textAnchor="middle" letterSpacing="2">STORY-FIRST · AUDIENCE-NATIVE · BUILT TO SCALE</text>
    </svg>
  );
}

function EntHeroSVG() {
  return (
    <svg viewBox="0 0 440 530" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"auto", display:"block", borderRadius:20, border:"1px solid rgba(255,255,255,.11)", boxShadow:"0 0 70px rgba(249,115,22,.18)" }}>
      <defs><linearGradient id="ehBg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2d1015"/><stop offset=".5" stopColor="#1b1230"/><stop offset="1" stopColor="#040208"/></linearGradient><linearGradient id="ehPh2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fed7aa"/><stop offset="1" stopColor="#1a0810"/></linearGradient><filter id="gEH2"><feGaussianBlur stdDeviation="22"/></filter><clipPath id="ehC2"><rect width="440" height="530" rx="20"/></clipPath></defs>
      <g clipPath="url(#ehC2)">
        <rect width="440" height="530" fill="url(#ehBg2)"/>
        <circle cx="138" cy="168" r="132" fill="rgba(249,115,22,.27)" filter="url(#gEH2)"/>
        <circle cx="316" cy="348" r="112" fill="rgba(124,58,237,.22)" filter="url(#gEH2)"/>
        <rect x="20" y="20" width="400" height="40" rx="11" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
        <text x="38" y="45" fill="rgba(253,186,116,.72)" fontFamily="Space Mono" fontSize="8.5" letterSpacing="2">VERTICAL IP SLATE</text>
        <circle cx="382" cy="40" r="4" fill="#ef4444"><animate attributeName="opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite"/></circle>
        <rect x="36" y="78" width="146" height="232" rx="20" fill="url(#ehPh2)" stroke="rgba(253,186,116,.3)" strokeWidth="1.5"/>
        <rect x="44" y="88" width="130" height="212" rx="16" fill="rgba(0,0,0,.3)"/>
        <ellipse cx="109" cy="182" rx="46" ry="46" fill="rgba(249,115,22,.16)" filter="url(#gEH2)"/>
        <text x="109" y="160" fill="#fff4df" fontFamily="Bebas Neue" fontSize="22" textAnchor="middle" letterSpacing="3">MICRO</text>
        <text x="109" y="185" fill="#fde68a" fontFamily="Bebas Neue" fontSize="22" textAnchor="middle" letterSpacing="3">DRAMA</text>
        <rect x="56" y="248" width="108" height="6" rx="3" fill="rgba(255,255,255,.26)"/>
        <rect x="54" y="270" width="112" height="28" rx="14" fill="rgba(249,115,22,.2)" stroke="rgba(249,115,22,.4)" strokeWidth="1"/>
        <text x="110" y="288" fill="#fde68a" fontFamily="Space Mono" fontSize="7.5" textAnchor="middle">EPISODE 01 ▶</text>
        {[0,1,2].map(i=>(<g key={i}><rect x="228" y={78+i*88} width="108" height="72" rx="13" fill={["rgba(255,255,255,.06)","rgba(249,115,22,.12)","rgba(124,58,237,.1)"][i]} stroke="rgba(255,255,255,.09)" strokeWidth="1"/>{i===1&&<><text x="282" y="122" fill="rgba(253,186,116,.72)" fontFamily="Space Mono" fontSize="7" textAnchor="middle" letterSpacing="1">FEATURED</text><rect x="252" y="130" width="60" height="3" rx="1.5" fill="rgba(249,115,22,.45)"/></>}</g>))}
        <rect x="36" y="338" width="368" height="95" rx="16" fill="rgba(0,0,0,.6)" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
        <rect x="36" y="338" width="368" height="1" fill="rgba(249,115,22,.18)"/>
        <text x="56" y="362" fill="rgba(253,186,116,.68)" fontFamily="Space Mono" fontSize="8.5" letterSpacing="2">AI PIPELINE</text>
        {["Pre-prod","Visual Dev","Post Accel","Distrib"].map((s,i)=>(<g key={s}><rect x={56+i*88} y="374" width="78" height="44" rx="9" fill={i===1?"rgba(249,115,22,.18)":"rgba(255,255,255,.05)"} stroke={i===1?"rgba(249,115,22,.35)":"rgba(255,255,255,.07)"} strokeWidth="1"/><text x={95+i*88} y="400" fill={i===1?"#fde68a":"rgba(255,244,223,.4)"} fontFamily="Space Mono" fontSize="7" textAnchor="middle">{s}</text></g>))}
        <circle cx="386" cy="448" r="50" fill="none" stroke="rgba(249,115,22,.18)" strokeWidth="1.5"/>
        <text x="386" y="454" fill="rgba(253,186,116,.78)" fontFamily="Bebas Neue" fontSize="17" textAnchor="middle" letterSpacing="2">AI</text>
      </g>
    </svg>
  );
}

function FitHeroSVG() {
  return (
    <svg viewBox="0 0 440 530" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"auto", display:"block", borderRadius:20, border:"1px solid rgba(255,255,255,.11)", boxShadow:"0 0 70px rgba(249,115,22,.18)" }}>
      <defs><linearGradient id="fhBg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#35170d"/><stop offset=".5" stopColor="#151515"/><stop offset="1" stopColor="#040506"/></linearGradient><linearGradient id="fhPh2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fed7aa"/><stop offset=".4" stopColor="#fff"/><stop offset="1" stopColor="#0a0e0b"/></linearGradient><filter id="gFH2"><feGaussianBlur stdDeviation="22"/></filter><clipPath id="fhC2"><rect width="440" height="530" rx="20"/></clipPath></defs>
      <g clipPath="url(#fhC2)">
        <rect width="440" height="530" fill="url(#fhBg2)"/>
        <circle cx="148" cy="188" r="140" fill="rgba(249,115,22,.28)" filter="url(#gFH2)"/>
        <rect x="20" y="20" width="400" height="40" rx="11" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
        <text x="38" y="45" fill="rgba(253,186,116,.72)" fontFamily="Space Mono" fontSize="8.5" letterSpacing="2">CREATOR-LED FITNESS</text>
        <rect x="48" y="78" width="150" height="280" rx="23" fill="url(#fhPh2)" opacity=".9" stroke="rgba(253,186,116,.32)" strokeWidth="1.5"/>
        <rect x="56" y="88" width="134" height="260" rx="19" fill="rgba(0,0,0,.31)"/>
        <circle cx="123" cy="184" r="44" fill="rgba(0,0,0,.5)"/><circle cx="123" cy="168" r="20" fill="rgba(0,0,0,.7)"/>
        <ellipse cx="123" cy="208" rx="24" ry="18" fill="rgba(0,0,0,.5)"/>
        <rect x="68" y="276" width="110" height="6" rx="3" fill="rgba(255,255,255,.28)"/>
        <rect x="64" y="294" width="118" height="30" rx="15" fill="rgba(249,115,22,.2)" stroke="rgba(249,115,22,.36)" strokeWidth="1"/>
        <text x="123" y="313" fill="#fde68a" fontFamily="Space Mono" fontSize="7.5" textAnchor="middle" letterSpacing="1">PROTOCOL →</text>
        {[0,1,2].map(i=>(<g key={i}><rect x="252" y={88+i*94} width="152" height="78" rx="13" fill={["rgba(255,255,255,.06)","rgba(249,115,22,.14)","rgba(52,211,153,.08)"][i]} stroke={["rgba(255,255,255,.09)","rgba(249,115,22,.28)","rgba(52,211,153,.18)"][i]} strokeWidth="1"/>{i===1&&<><text x="328" y="132" fill="#fde68a" fontFamily="Bebas Neue" fontSize="18" textAnchor="middle" letterSpacing="2">COMEBACK</text><text x="328" y="152" fill="rgba(253,186,116,.6)" fontFamily="Space Mono" fontSize="6.5" textAnchor="middle">ARC ACTIVE</text></>}</g>))}
        <rect x="48" y="390" width="368" height="90" rx="16" fill="rgba(0,0,0,.58)" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
        <rect x="48" y="390" width="368" height="1" fill="rgba(249,115,22,.18)"/>
        <text x="68" y="414" fill="rgba(253,186,116,.68)" fontFamily="Space Mono" fontSize="8.5" letterSpacing="2">TRAINING ARC</text>
        {["Wk 1","Wk 3","Wk 5","Wk 8"].map((wk,i)=>(<g key={wk}><rect x={68+i*86} y="426" width="76" height="40" rx="9" fill={i===2?"rgba(249,115,22,.2)":"rgba(255,255,255,.05)"} stroke={i===2?"rgba(249,115,22,.4)":"rgba(255,255,255,.07)"} strokeWidth="1"/>{i===2&&<rect x={68+i*86} y="426" width="76" height="2" rx="1" fill="rgba(249,115,22,.55)"/>}<text x={106+i*86} y="451" fill={i===2?"#fde68a":"rgba(255,244,223,.38)"} fontFamily="Space Mono" fontSize="7.5" textAnchor="middle">{wk}</text></g>))}
      </g>
    </svg>
  );
}

function GenreGridSVG() {
  return (
    <svg viewBox="0 0 560 420" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"auto", display:"block", borderRadius:18, border:"1px solid rgba(255,255,255,.08)", overflow:"hidden" }}>
      <defs>
        <linearGradient id="ggBgNew" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#230d16"/><stop offset=".5" stopColor="#171027"/><stop offset="1" stopColor="#060505"/></linearGradient>
        <linearGradient id="ggPhone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fed7aa"/><stop offset="1" stopColor="#16090d"/></linearGradient>
        <filter id="ggBlurNew"><feGaussianBlur stdDeviation="22"/></filter>
      </defs>
      <rect width="560" height="420" fill="url(#ggBgNew)"/>
      <ellipse cx="132" cy="144" rx="150" ry="150" fill="rgba(249,115,22,.2)" filter="url(#ggBlurNew)"/>
      <ellipse cx="438" cy="278" rx="150" ry="150" fill="rgba(124,58,237,.2)" filter="url(#ggBlurNew)"/>
      <text x="22" y="26" fill="rgba(255,244,223,.34)" fontFamily="Space Mono" fontSize="8" letterSpacing="3">VERTICAL CONTENT PIPELINE</text>
      <rect x="28" y="52" width="178" height="302" rx="22" fill="rgba(0,0,0,.52)" stroke="rgba(253,186,116,.24)" strokeWidth="1.5"/>
      <rect x="38" y="64" width="158" height="278" rx="18" fill="url(#ggPhone)" opacity=".94"/>
      <circle cx="117" cy="142" r="48" fill="rgba(0,0,0,.46)"/>
      <text x="117" y="136" fill="#fff4df" fontFamily="Bebas Neue" fontSize="23" textAnchor="middle" letterSpacing="3">MICRO</text>
      <text x="117" y="161" fill="#fde68a" fontFamily="Bebas Neue" fontSize="23" textAnchor="middle" letterSpacing="3">DRAMA</text>
      <rect x="54" y="250" width="126" height="7" rx="3.5" fill="rgba(255,255,255,.24)"/>
      <rect x="54" y="275" width="126" height="32" rx="16" fill="rgba(249,115,22,.18)" stroke="rgba(249,115,22,.38)"/>
      <text x="117" y="295" fill="#fde68a" fontFamily="Space Mono" fontSize="7.5" textAnchor="middle" letterSpacing="1">EPISODE 01 ▶</text>
      <rect x="236" y="52" width="292" height="104" rx="16" fill="rgba(0,0,0,.48)" stroke="rgba(255,255,255,.08)"/>
      <text x="254" y="76" fill="rgba(253,186,116,.72)" fontFamily="Space Mono" fontSize="7.5" letterSpacing="2">EPISODE QUEUE</text>
      {["EP01","EP02","EP03","EP04"].map((ep,i)=>(<g key={ep}><rect x={254+i*62} y="94" width="52" height="38" rx="9" fill={i<2?"rgba(249,115,22,.18)":"rgba(255,255,255,.05)"} stroke={i<2?"rgba(249,115,22,.34)":"rgba(255,255,255,.08)"}/><text x={280+i*62} y="118" fill={i<2?"#fde68a":"rgba(255,244,223,.45)"} fontFamily="Space Mono" fontSize="7" textAnchor="middle">{ep}</text></g>))}
      <rect x="236" y="174" width="292" height="96" rx="16" fill="rgba(0,0,0,.48)" stroke="rgba(255,255,255,.08)"/>
      <text x="254" y="198" fill="rgba(253,186,116,.72)" fontFamily="Space Mono" fontSize="7.5" letterSpacing="2">GENRE SLATE</text>
      {[["THRILLER","⚡"],["REVENGE","🔥"],["SCI-FI","▣"],["FANTASY","✦"]].map(([name,icon],i)=>(<g key={name}><rect x={254+(i%2)*126} y={214+Math.floor(i/2)*28} width="112" height="22" rx="8" fill={i===0?"rgba(249,115,22,.14)":"rgba(255,255,255,.045)"} stroke={i===0?"rgba(249,115,22,.28)":"rgba(255,255,255,.08)"}/><text x={266+(i%2)*126} y={229+Math.floor(i/2)*28} fill={i===0?"#fde68a":"rgba(255,244,223,.56)"} fontFamily="Space Mono" fontSize="6.8">{icon} {name}</text></g>))}
      <rect x="236" y="288" width="292" height="66" rx="16" fill="rgba(0,0,0,.48)" stroke="rgba(255,255,255,.08)"/>
      <text x="254" y="312" fill="rgba(253,186,116,.72)" fontFamily="Space Mono" fontSize="7.5" letterSpacing="2">DELIVERY SPEED</text>
      <rect x="254" y="326" width="214" height="5" rx="2.5" fill="rgba(255,255,255,.08)"/>
      <rect x="254" y="326" width="164" height="5" rx="2.5" fill="rgba(249,115,22,.48)"/>
      <circle cx="418" cy="328.5" r="7" fill="#f97316"/>
      <text x="486" y="331" fill="#fde68a" fontFamily="Bebas Neue" fontSize="18" textAnchor="middle" letterSpacing="2">4–8 WKS</text>
      <rect x="28" y="372" width="500" height="26" rx="13" fill="rgba(0,0,0,.52)" stroke="rgba(255,255,255,.07)"/>
      <text x="278" y="389" fill="rgba(255,244,223,.5)" fontFamily="Space Mono" fontSize="7.5" textAnchor="middle" letterSpacing="2">LICENSING · COMMISSIONING · CO-PRODUCTION</text>
    </svg>
  );
}

function AthleteJourneySVG() {
  return (
    <svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto",display:"block",borderRadius:18,border:"1px solid rgba(255,255,255,.08)",overflow:"hidden"}}>
      <defs>
        <linearGradient id="ajBgNew" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1a0d05"/><stop offset="1" stopColor="#060505"/></linearGradient>
        <linearGradient id="ajArcNew" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#7c3aed"/><stop offset=".5" stopColor="#f97316"/><stop offset="1" stopColor="#fde68a"/></linearGradient>
        <filter id="ajBlurNew"><feGaussianBlur stdDeviation="11"/></filter>
      </defs>
      <rect width="560" height="240" fill="url(#ajBgNew)"/>
      <ellipse cx="280" cy="214" rx="280" ry="68" fill="rgba(249,115,22,.07)" filter="url(#ajBlurNew)"/>
      <path d="M 38,166 Q 136,54 276,48 Q 416,42 518,92" fill="none" stroke="rgba(249,115,22,.28)" strokeWidth="7" strokeLinecap="round" filter="url(#ajBlurNew)"/>
      <path d="M 38,166 Q 136,54 276,48 Q 416,42 518,92" fill="none" stroke="url(#ajArcNew)" strokeWidth="2.5" strokeLinecap="round"/>
      {[{x:38,y:166,label:"DAY 1",sub:"Start",col:"rgba(124,58,237,.78)"},{x:136,y:104,label:"WEEK 2",sub:"Protocol",col:"rgba(167,139,250,.78)"},{x:276,y:48,label:"WEEK 5",sub:"Breakthrough",col:"#f97316"},{x:416,y:52,label:"WEEK 7",sub:"Identity",col:"#fbbf24"},{x:518,y:92,label:"FINALE",sub:"Comeback",col:"#fde68a"}].map((m,i)=>(
        <g key={m.label}>
          <circle cx={m.x} cy={m.y} r={i===2?13:9} fill="rgba(0,0,0,.78)" stroke={m.col} strokeWidth={i===2?2:1.5}/>
          {i===2&&<circle cx={m.x} cy={m.y} r="21" fill="none" stroke="rgba(249,115,22,.27)" strokeWidth="1" strokeDasharray="3,3"/>}
          <text x={m.x} y={m.y+(i===2?5:4)} fill={m.col} fontFamily="Space Mono" fontSize={i===2?6.5:5.5} textAnchor="middle">{i===2?"★":"●"}</text>
          <text x={m.x} y={m.y+30} fill="rgba(255,244,223,.72)" fontFamily="Space Mono" fontSize="7" textAnchor="middle">{m.label}</text>
          <text x={m.x} y={m.y+45} fill="rgba(255,244,223,.42)" fontFamily="Space Mono" fontSize="6" textAnchor="middle">{m.sub}</text>
          {i===2&&(<g><rect x={m.x+20} y={m.y-28} width="48" height="28" rx="7" fill="rgba(249,115,22,.18)" stroke="rgba(249,115,22,.38)" strokeWidth="1"/><text x={m.x+44} y={m.y-9} fill="#fde68a" fontFamily="Space Mono" fontSize="6.5" textAnchor="middle">BRAND</text></g>)}
        </g>
      ))}
      <text x="20" y="20" fill="rgba(255,244,223,.28)" fontFamily="Space Mono" fontSize="7" letterSpacing="3">ATHLETE JOURNEY ARC</text>
    </svg>
  );
}

/* ── SHARED ── */
const Lbl = ({c}) => <p style={{fontFamily:"var(--mn)",fontSize:10,letterSpacing:".3em",textTransform:"uppercase",color:"var(--amber)",marginBottom:12}}>{c}</p>;
const BigT = ({c,sz=56}) => <h2 className="ttl" style={{fontSize:`clamp(28px,4.5vw,${sz}px)`,color:"#fff4df"}}>{c}</h2>;
const HR = () => <div style={{width:"100%",height:1,background:"rgba(255,255,255,.06)",margin:"64px 0"}}/>;
const Rv = ({children,style={}}) => <div className="rv" style={style}>{children}</div>;

function RegForm() {
  return (
    <form style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginTop:28}} onSubmit={e=>e.preventDefault()}>
      <input type="email" placeholder="Work email" style={{flex:"1 1 200px",background:"rgba(0,0,0,.5)",border:"1px solid rgba(255,255,255,.24)",borderRadius:50,padding:"12px 20px",color:"#fff4df",fontFamily:"var(--body)",fontSize:14,outline:"none"}}/>
      <input type="url" placeholder="Company website" style={{flex:"1 1 200px",background:"rgba(0,0,0,.5)",border:"1px solid rgba(255,255,255,.24)",borderRadius:50,padding:"12px 20px",color:"#fff4df",fontFamily:"var(--body)",fontSize:14,outline:"none"}}/>
      <button type="submit" className="reg-btn">Register Interest</button>
    </form>
  );
}

function Header({page,setPage}) {
  const [drop,setDrop]=useState(false);
  const [subDrop,setSubDrop]=useState(false);
  const go=(p,id)=>{setPage(p||"home");setDrop(false);window.scrollTo({top:0,behavior:"smooth"});if(id)setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"}),80);};
  const goHomeSection=(id)=>{
    setPage("home");
    setDrop(false);
    setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"}),80);
  };
  return (
    <header style={{position:"fixed",top:0,left:0,right:0,zIndex:200,borderBottom:"1px solid rgba(255,255,255,.07)",background:"rgba(6,5,5,.92)",backdropFilter:"blur(20px)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:18}}>
        <button onClick={()=>go("home")} style={{background:"none",border:"none",color:"#fff4df",fontFamily:"var(--mn)",fontSize:12,fontWeight:700,letterSpacing:".3em",textTransform:"uppercase",cursor:"pointer",whiteSpace:"nowrap"}}>Bangzuu<span style={{color:"var(--amber)"}}>*</span></button>
        <nav className="nav-wrap">
          <button className="nav-link" onClick={()=>go("home")}>Home</button>
          <span className="nav-divider">|</span>
          <div style={{position:"relative"}}>
            <button className="nbtn" onClick={()=>setDrop(d=>!d)}>Industries <span style={{color:"var(--amber)"}}>⌄</span></button>
            {drop&&(<div style={{position:"absolute",left:"50%",transform:"translateX(-50%)",top:"calc(100% + 8px)",width:248,background:"rgba(8,6,6,.97)",border:"1px solid rgba(255,255,255,.08)",borderRadius:14,padding:8,backdropFilter:"blur(18px)",zIndex:300,boxShadow:"0 28px 65px rgba(0,0,0,.5)"}}>
              <button onClick={()=>go("home","who-we-work-with")} style={{display:"block",width:"100%",background:"none",border:"none",borderRadius:9,padding:"9px 14px",textAlign:"left",color:"rgba(255,244,223,.62)",fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".17em",textTransform:"uppercase",transition:"all .14s",cursor:"pointer"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(249,115,22,.1)";e.currentTarget.style.color="var(--amber-l)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="rgba(255,244,223,.62)";}}>
                Travel
              </button>
              <div style={{position:"relative"}}
                onMouseEnter={()=>setSubDrop(true)}
                onMouseLeave={()=>setSubDrop(false)}>
                <button onClick={()=>go("entertainment")} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",background:"none",border:"none",borderRadius:9,padding:"9px 14px",textAlign:"left",color:"rgba(255,244,223,.62)",fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".17em",textTransform:"uppercase",transition:"all .14s",cursor:"pointer"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(249,115,22,.1)";e.currentTarget.style.color="var(--amber-l)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="rgba(255,244,223,.62)";}}>
                  <span>Entertainment & Media</span><span style={{color:"var(--amber)"}}>›</span>
                </button>
                {subDrop&&(
                  <div style={{position:"absolute",left:"calc(100% + 8px)",top:0,width:228,background:"rgba(8,6,6,.97)",border:"1px solid rgba(255,255,255,.08)",borderRadius:14,padding:8,backdropFilter:"blur(18px)",zIndex:310,boxShadow:"0 28px 65px rgba(0,0,0,.5)"}}>
                    {[["Microdramas","entertainment"],["AI / Production Studios","entertainment"],["Sales Agents","entertainment"]].map(([lbl,p])=>(
                      <button key={lbl} onClick={()=>go(p)} style={{display:"block",width:"100%",background:"none",border:"none",borderRadius:9,padding:"9px 14px",textAlign:"left",color:"rgba(255,244,223,.62)",fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".17em",textTransform:"uppercase",transition:"all .14s",cursor:"pointer"}}
                        onMouseEnter={e=>{e.currentTarget.style.background="rgba(249,115,22,.1)";e.currentTarget.style.color="var(--amber-l)";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="rgba(255,244,223,.62)";}}>
                        {lbl}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={()=>go("fitness")} style={{display:"block",width:"100%",background:"none",border:"none",borderRadius:9,padding:"9px 14px",textAlign:"left",color:"rgba(255,244,223,.62)",fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".17em",textTransform:"uppercase",transition:"all .14s",cursor:"pointer"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(249,115,22,.1)";e.currentTarget.style.color="var(--amber-l)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="rgba(255,244,223,.62)";}}>
                Fitness & Lifestyle
              </button>
            </div>)}
          </div>
          <span className="nav-divider">|</span>
          <button className="nav-link" onClick={()=>goHomeSection("about-us")}>About Us</button>
          <span className="nav-divider">|</span>
          <button className="nav-link nav-cta" onClick={()=>goHomeSection("register")}>Work With Us</button>
        </nav>
      </div>
    </header>
  );
}

/* ── HOME ── */
const WHY=[["AI-assisted production without sacrificing story.","We use AI-native workflows to compress timelines and production costs — without producing content that looks or feels generated. Cinematic quality. Faster delivery."],["Your brand becomes the plot.","Not the logo in the corner. Not the 30-second read. The reason the story exists, the thing the character needs, the moment the narrative turns."],["Real creators. Real audiences. Real distribution.","We work with an existing creator network with proven audiences. Distribution isn't a plan — it's built into the product from day one."],["You leave with an asset, not an impression.","Every project delivers reusable content across paid, owned, and social channels. The value compounds long after the initial upload."]];
const STATS=[
  {value:11,prefix:"$",suffix:"B",decimals:0,label:"Global micro-drama market value in 2025, projected to reach $14B in 2026."},
  {value:1.4,prefix:"",suffix:" Billion",decimals:1,label:"Views generated by KFC's branded Douyin micro-drama series."},
  {value:3.34,prefix:"",suffix:"B Yuan",decimals:2,label:"Sales driven by Kans beauty brand through five branded mini-dramas."}
];
const AUDIENCE=[{label:"Travel & Tourism Brands",headline:"Put your destination inside the story.",copy:"Your audience already trusts creators. We make sure they remember your brand — by putting it inside the story, not in front of it.",cta:"See how it works for travel brands",V:TravelSVG},{label:"Entertainment & Media",headline:"Produce, co-produce, and partner.",copy:"Micro-drama platforms, AI production studios, and sales agents looking for content, collaboration, or IP. We produce, co-produce, and partner.",cta:"See how it works for entertainment & media",V:EntSVG},{label:"Fitness, Lifestyle & DTC Brands",headline:"Build brand identity, not just metrics.",copy:"Creator content that builds brand identity, not just performance metrics. Story-first. Audience-native.",cta:"See how it works for fitness & lifestyle brands",V:FitSVG}];
const FORMATS=[["Vertical Content Series","Multi-episode short-form branded series.","Social-first. AI-assisted. Built around your brand as the story engine.","brand"],["Creator-Led Mini-Movies","3–10 minute branded entertainment films.","Real influencer. Real audience. Your brand owns the narrative.","creator"],["Micro-Dramas","Serialised vertical storytelling for platforms, brands, and co-production partners.","Built for the formats growing fastest globally.","ai"]];
const PROCESS=[["01","Brand Strategy","Find the story reason your brand belongs.","brand"],["02","AI-Assisted Production","Compress scripting, previsuals, and creative iteration.","ai"],["03","Creator Distribution","Build around creators and audiences already moving.","creator"],["04","Reusable Asset","Deliver content that works across paid, owned, and social.","asset"]];

function HomePage() {
  useReveal();
  useParallax();
  return (
    <>
      {/* HERO */}
      <div style={{position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",overflow:"hidden"}}>
        <Particles/>
        <div className="hero-grid"/>
        <div data-parallax=".03" className="parallax-layer ambient-glow" style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 78% 58% at 50% 0%,rgba(249,115,22,.11) 0%,transparent 60%)",zIndex:2,pointerEvents:"none"}}/>
        <div data-parallax="-.02" className="parallax-layer ambient-glow" style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 58% 48% at 20% 60%,rgba(124,58,237,.09) 0%,transparent 55%)",zIndex:2,pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:180,background:"linear-gradient(to bottom,transparent,var(--bg))",zIndex:3,pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:10,maxWidth:1280,margin:"0 auto",padding:"130px 24px 60px",width:"100%"}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:10,border:"1px solid rgba(253,186,116,.2)",borderRadius:50,padding:"8px 18px",fontFamily:"var(--mn)",fontSize:10,letterSpacing:".26em",textTransform:"uppercase",color:"rgba(255,244,223,.7)",background:"rgba(0,0,0,.32)",backdropFilter:"blur(10px)",animation:"fadeUp .6s ease both"}}>
              <span style={{color:"var(--amber)",fontSize:7.5}}>▶</span> AI // STORY // <Clock/>
            </div>
          </div>
          <h1 className="ttl" style={{textAlign:"center",fontSize:"clamp(50px,10.5vw,128px)",lineHeight:.87,color:"#fff4df",animation:"fadeUp .7s .1s ease both",marginBottom:0}}>
            We Build Stories<br/><span style={{WebkitTextStroke:"1px rgba(249,115,22,.55)",color:"transparent"}}>Brands</span> Live Inside.
          </h1>
          <div style={{display:"flex",justifyContent:"center",margin:"22px 0"}}>
            <div style={{width:110,height:2,background:"linear-gradient(90deg,transparent,var(--amber),transparent)",animation:"lineGrow .8s .4s ease both",transformOrigin:"center"}}/>
          </div>
          <p style={{textAlign:"center",maxWidth:660,margin:"0 auto 36px",fontSize:17,lineHeight:1.85,color:"rgba(255,244,223,.62)",animation:"fadeUp .7s .3s ease both"}}>
            Bangzuu Studios is an AI-native branded content studio. We create vertical content series, creator-led mini-movies, and micro-dramas that turn brand integrations into the engine of the story — not an interruption inside it.
          </p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",animation:"fadeUp .7s .45s ease both",marginBottom:48}}>
            <a href="#register" className="btn">Work With Us →</a>
            <a href="#what-we-build" className="btn-o">Explore What We Do</a>
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:52}}>
            <StatPill num="$11B" label="Market 2025" delay={.5}/>
            <StatPill num="1.4B" label="Views (KFC)" delay={.65}/>
            <StatPill num="3×" label="Brand Recall" delay={.8}/>
            <StatPill num="4–8wk" label="Delivery" delay={.95}/>
          </div>
          <TiltCard><div className="scan-shell"><HeroSVG/></div></TiltCard>
          <div className="scroll-hint">Scroll</div>
        </div>
      </div>

      {/* MARQUEE */}
      <Marquee/>

      {/* STUDIO */}
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
        <HR/>
        <Rv>
          <div id="about-us" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:44,alignItems:"center"}}>
            <div>
              <Lbl c="The Studio"/>
              <BigT c="The Studio" sz={62}/>
              <p style={{fontSize:16,lineHeight:1.9,color:"rgba(255,244,223,.6)",marginTop:18,marginBottom:16}}>Bangzuu Studios sits at the intersection of AI-assisted production, creator distribution, and story-first brand strategy. We work with brands, media platforms, and production partners who believe the future of content isn't louder advertising — it's better storytelling.</p>
              <p style={{fontSize:16,lineHeight:1.9,color:"rgba(255,244,223,.6)"}}>We build content that is faster to produce, harder to skip, and more valuable to own.</p>
            </div>
            <StudioSVG/>
          </div>
        </Rv>
        <Rv style={{marginTop:28}}><StoryWorldsBanner/></Rv>

        {/* PROCESS */}
        <HR/>
        <Rv>
          <div style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:26,background:"rgba(255,255,255,.02)",padding:36,boxShadow:"0 28px 110px rgba(0,0,0,.32)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:28,flexWrap:"wrap",gap:14}}>
              <div><Lbl c="Production system"/><BigT c="From brand brief to story asset."/></div>
              <p style={{maxWidth:380,fontSize:14,lineHeight:1.82,color:"rgba(255,244,223,.48)"}}>A visual workflow for how Bangzuu turns a brand into a creator-led story format with distribution built in.</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14}}>
              {PROCESS.map(([num,title,copy,type])=>(
                <div key={num} className="card" style={{padding:0,overflow:"hidden"}}>
                  <div style={{position:"relative",overflow:"hidden",borderBottom:"1px solid rgba(255,255,255,.07)"}}><ProcessSVG type={type}/><div style={{position:"absolute",top:12,left:12,background:"rgba(0,0,0,.62)",border:"1px solid rgba(0,0,0,.18)",borderRadius:50,padding:"3px 11px",fontFamily:"var(--mn)",fontSize:8.5,letterSpacing:".2em",color:"var(--amber)",backdropFilter:"blur(8px)"}}>{num}</div></div>
                  <div style={{padding:20}}><h3 className="ttl" style={{fontSize:20,color:"#fff4df",marginBottom:7}}>{title}</h3><p style={{fontSize:12.5,lineHeight:1.68,color:"rgba(255,244,223,.44)"}}>{copy}</p></div>
                </div>
              ))}
            </div>
          </div>
        </Rv>

        {/* WHO WE WORK WITH */}
        <HR/>
        <Rv id="who-we-work-with"><Lbl c="Audience pathways"/><BigT c="Who We Work With"/></Rv>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:18,marginTop:36}}>
          {AUDIENCE.map(({label,headline,copy,cta,V})=>(
            <Rv key={label}>
              <div className="card" style={{padding:0,overflow:"hidden"}}>
                <V/>
                <div style={{padding:24}}><h3 className="ttl" style={{fontSize:24,color:"#fff4df",marginBottom:12}}>{headline}</h3><p style={{fontSize:13.5,lineHeight:1.8,color:"rgba(255,244,223,.52)",marginBottom:16}}>{copy}</p><a href="#register" className="clink">{cta} →</a></div>
              </div>
            </Rv>
          ))}
        </div>

        {/* WHY */}
        <HR/>
        <Rv>
          <div style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:26,background:"rgba(255,255,255,.02)",padding:36}}>
            <div style={{marginBottom:32}}><Lbl c="Why Bangzuu"/><BigT c="Why Bangzuu"/></div>
            {/* Row 1: cards left, WhySVG right */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20,alignItems:"stretch"}}>
              <div style={{display:"grid",gap:14}}>
                {WHY.slice(0,2).map(([b,c])=>(<div key={b} className="card" style={{background:"rgba(0,0,0,.28)"}}><p style={{fontWeight:700,fontSize:15,lineHeight:1.58,color:"#fff4df",marginBottom:9}}>{b}</p><p style={{fontSize:13.5,lineHeight:1.82,color:"rgba(255,244,223,.52)"}}>{c}</p></div>))}
              </div>
              <WhySVG/>
            </div>
            {/* Row 2: network left, cards right */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,alignItems:"stretch"}}>
              <CreatorNetworkSVG/>
              <div style={{display:"grid",gap:14}}>
                {WHY.slice(2).map(([b,c])=>(<div key={b} className="card" style={{background:"rgba(0,0,0,.28)"}}><p style={{fontWeight:700,fontSize:15,lineHeight:1.58,color:"#fff4df",marginBottom:9}}>{b}</p><p style={{fontSize:13.5,lineHeight:1.82,color:"rgba(255,244,223,.52)"}}>{c}</p></div>))}
              </div>
            </div>
            <div style={{marginTop:20}}><BrandInStorySVG/></div>
          </div>
        </Rv>

        {/* FORMATS */}
        <HR/>
        <Rv><Lbl c="Formats"/><BigT c="What We Build"/></Rv>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:18,marginTop:36}}>
          {FORMATS.map(([title,copy,detail,type])=>(
            <Rv key={title}>
              <div className="card" style={{padding:0,overflow:"hidden"}}>
                <div style={{borderBottom:"1px solid rgba(255,255,255,.07)",overflow:"hidden"}}><ProcessSVG type={type}/></div>
                <div style={{padding:24}}><h3 className="ttl" style={{fontSize:24,color:"#fff4df",marginBottom:10}}>{title}</h3><p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.52)",marginBottom:9}}>{copy}</p><p style={{fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".18em",textTransform:"uppercase",color:"var(--amber)"}}>{detail}</p></div>
              </div>
            </Rv>
          ))}
        </div>

        {/* MARKET */}
        <HR/>
        <Rv><Lbl c="Market proof"/><BigT c="The Market Is Moving"/></Rv>
        <div style={{display:"grid",gap:18,marginTop:36}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:14}}>
            {STATS.map(({value,prefix,suffix,decimals,label})=>(
              <Rv key={label}>
                <div className="card" style={{height:"100%",minHeight:168,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                  <div className="ttl" style={{fontSize:44,color:"#fff4df",marginBottom:12}}><RollingNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals}/></div>
                  <p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.5)"}}>{label}</p>
                </div>
              </Rv>
            ))}
          </div>
          <Rv>
            <div style={{borderRadius:20,overflow:"hidden"}}>
              <MarketSVG/>
            </div>
          </Rv>
        </div>

        {/* REGISTER */}
        <HR/>
        <Rv id="register">
          <div style={{border:"1px solid rgba(255,255,255,.2)",borderRadius:26,background:"rgba(255,255,255,.12)",padding:56,textAlign:"center",boxShadow:"0 0 72px rgba(255,244,223,.07),0 28px 110px rgba(0,0,0,.26)",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 30%,rgba(255,244,223,.09),transparent 50%)",pointerEvents:"none"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <Lbl c="Register interest"/>
              <BigT c="Ready to Build Something Worth Watching?" sz={60}/>
              <p style={{maxWidth:560,margin:"18px auto 0",fontSize:16,lineHeight:1.88,color:"rgba(255,255,255,.88)"}}>Tell us who you are and what you're building. We'll take it from there.</p>
              <RegForm/>
              <p style={{marginTop:18,fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,.65)"}}>We review every submission. Limited availability per quarter.</p>
            </div>
          </div>
        </Rv>
      </div>
    </>
  );
}

/* ── ENT PAGE ── */
const ENT_OFFERS=[{title:"Content Supply for Micro-Drama Platforms",copy:"Vertical micro-drama series produced at AI-native speed — built for the episode formats, genre conventions, and algorithmic demands of the world's fastest-growing content platforms.",bullets:["Genre-led storytelling: sci-fi, thriller, revenge, action, fantasy","Vertical-first format, episodic structure, built for mobile-first audiences","Licensing and commissioning models available — we work to your pipeline"]},{title:"Co-Production & Studio Partnerships",copy:"AI-native production collaboration for studios and production companies looking to compress timelines, reduce costs, and bring more ambitious projects to market faster.",bullets:["AI-assisted pre-production, post-production, and visual development","Hybrid live-action and AI-generated content pipelines","Flexible co-production structures — we adapt to your existing workflow"]},{title:"IP Development for Sales & Distribution",copy:"Slate development and IP creation for sales agents and distributors looking for vertical micro-drama content with international sales potential.",bullets:["Genre-led IP built with territory sales in mind from day one","Formats designed to travel — not locked to single-market conventions","Festival and platform-ready delivery standards"]}];
const ENT_MARKET=[["$11B → $14B","Global micro-drama market 2025 to 2026, per Omdia."],["58 platforms mapped","Active micro-drama platforms globally."],["100–400%","Year-on-year growth rates across the fastest-scaling platforms in 2025."],["$240M","DramaBox annual revenue 2025, up from $120M the prior year."]];
const ENT_AUDIENCE=["Micro-drama platforms actively commissioning or licensing external content","OTT platforms adding vertical micro-drama strands to existing catalogues","AI-native and tech-forward production studios looking for co-production partners","Traditional production companies exploring AI-assisted workflows for the first time","Sales agents and international distributors looking for vertical IP with global sales potential","Content acquisition teams at fast-growing platforms needing pipeline at speed","Investors and accelerator-backed studios building content infrastructure in emerging markets"];
const ENT_WHY=[["We are AI-native — not AI-assisted as an afterthought.","Our production pipeline is built around generative and AI-assisted workflows from the ground up. That means faster delivery, lower cost per episode, and the ability to produce at the volume platforms actually need."],["We understand micro-drama as a format, not a trend.","Genre conventions, episode architecture, hook mechanics, algorithmic performance — we build content engineered to perform inside the formats growing fastest globally."],["We produce content that travels.","Genre-led storytelling with international DNA — not locked to a single market, language, or platform's preferences."],["We are a studio, not a service provider.","We bring creative vision, production capability, and market understanding to every project. We are a partner in what you're building — not a vendor fulfilling a brief."]];
const ENT_FAQ=[["What formats and genres do you produce?","Vertical micro-drama series in sci-fi, thriller, revenge, action, and fantasy. We also develop genre hybrids and format experiments for partners with appetite for differentiation."],["How fast can you deliver?","A pilot or proof-of-concept series can move from brief to delivery in 4–8 weeks. Full series timelines are project-dependent — but consistently faster than traditional equivalents."],["What licensing models do you work with?","Flat-fee licensing, revenue share, co-production equity, and commissioned originals. The right model depends on the platform, the project, and the partnership."],["Do you develop original IP or only produce to brief?","Both. We have an active slate of original vertical IP in development — available for licensing, co-production, or acquisition."],["What markets do you produce for?","Southeast Asia-based with global production capability. Genre-led, internationally portable, not locked to single-market conventions."]];

function EntertainmentPage() {
  useReveal();
  return (
    <>
      {/* HERO BAND */}
      <div style={{position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#2d1015 0%,#1b1230 50%,#040208 100%)",minHeight:520,display:"flex",alignItems:"center"}}>
        <div className="hero-grid" style={{opacity:.48}}/>
        <div style={{position:"absolute",left:"5%",top:"18%",width:280,height:280,borderRadius:"50%",background:"rgba(249,115,22,.2)",filter:"blur(75px)",animation:"drift1 13s ease-in-out infinite",pointerEvents:"none"}}/>
        <div style={{position:"absolute",right:"8%",bottom:"14%",width:240,height:240,borderRadius:"50%",background:"rgba(124,58,237,.18)",filter:"blur(65px)",animation:"drift2 15s ease-in-out infinite",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:110,background:"linear-gradient(to bottom,transparent,var(--bg))",pointerEvents:"none",zIndex:2}}/>
        <div style={{position:"relative",zIndex:5,maxWidth:1280,margin:"0 auto",padding:"110px 24px 72px",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"center"}}>
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,border:"1px solid rgba(253,186,116,.2)",borderRadius:50,padding:"6px 14px",fontFamily:"var(--mn)",fontSize:8.5,letterSpacing:".26em",textTransform:"uppercase",color:"rgba(253,186,116,.72)",background:"rgba(0,0,0,.38)",backdropFilter:"blur(10px)",marginBottom:22}}>
              <span style={{color:"var(--amber)",fontSize:7}}>▶</span> Bangzuu Studios × Entertainment & Media
            </div>
            <h1 className="ttl" style={{fontSize:"clamp(32px,5vw,66px)",color:"#fff4df",marginBottom:20}}>The Micro-Drama Market Is Exploding. The Content Supply Isn't Keeping Up.</h1>
            <p style={{fontSize:16,fontWeight:700,lineHeight:1.82,color:"rgba(253,186,116,.86)",marginBottom:20}}>Bangzuu Studios is an AI-native production studio creating vertical content series and micro-dramas for platforms, co-production partners, and international sales pipelines — faster, leaner, and more cinematic than traditional production.</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}>
              <StatPill num="$14B" label="Market 2026" delay={.2}/>
              <StatPill num="58" label="Active platforms" delay={.35}/>
              <StatPill num="400%" label="YoY growth" delay={.5}/>
            </div>
            {["AI-assisted production compresses timelines without compromising quality","Vertical-first format natively built for platforms driving fastest audience growth","Flexible partnership — licensing, co-production, or IP development"].map(b=>(<div key={b} style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:13,padding:"11px 16px",fontSize:13.5,lineHeight:1.72,color:"rgba(255,244,223,.6)",marginBottom:9}}>{b}</div>))}
            <p style={{margin:"16px 0",fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".2em",textTransform:"uppercase",color:"var(--amber)"}}>Selectively building platform and production partnerships.</p>
            <a href="#ent-register" className="btn">Register Interest</a>
          </div>
          <TiltCard style={{border:"none",boxShadow:"none"}}><EntHeroSVG/></TiltCard>
        </div>
      </div>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
        <HR/>
        <Rv>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"start"}}>
            <BigT c="The formats growing fastest are the hardest to staff and supply." sz={50}/>
            <div>
              <p style={{fontSize:15,lineHeight:1.88,color:"rgba(255,244,223,.6)",marginBottom:18}}>Micro-drama platforms are scaling at 100–400% annually. The appetite for content is outpacing the pipeline that feeds it. Traditional production is too slow, too expensive, and too format-agnostic to keep up.</p>
              <p style={{fontSize:15,lineHeight:1.88,color:"rgba(255,244,223,.6)"}}>AI-native studios that understand story — not just generation — are what the market needs. There aren't many of them yet.</p>
            </div>
          </div>
        </Rv>

        <HR/>
        <Rv>
          <Lbl c="Offerings"/><BigT c="What We Do"/>
          <div style={{display:"grid",gridTemplateColumns:"1.15fr 1fr",gap:24,marginTop:28,alignItems:"start"}}>
            <div style={{display:"grid",gap:18}}>
              {ENT_OFFERS.map(o=>(
                <div key={o.title} className="card">
                  <div style={{width:38,height:38,borderRadius:"50%",border:"1px solid rgba(253,186,116,.2)",background:"rgba(249,115,22,.1)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(253,186,116,.78)",fontSize:17,marginBottom:18}}>▣</div>
                  <h3 className="ttl" style={{fontSize:20,color:"#fff4df",marginBottom:11}}>{o.title}</h3>
                  <p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.52)",marginBottom:13}}>{o.copy}</p>
                  {o.bullets.map(b=>(<p key={b} style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:9,padding:"9px 13px",fontSize:12.5,lineHeight:1.58,color:"rgba(255,244,223,.48)",marginBottom:7}}>{b}</p>))}
                </div>
              ))}
            </div>
            <div style={{position:"sticky",top:90}}><GenreGridSVG/></div>
          </div>
        </Rv>

        <HR/>
        <Rv>
          <div style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:26,background:"rgba(255,255,255,.02)",padding:36}}>
            <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:36}}>
              <div><Lbl c="Audience"/><BigT c="Who Is This For"/></div>
              <div>
                <div style={{display:"grid",gap:9,marginBottom:22}}>{ENT_AUDIENCE.map(item=>(<div key={item} style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:11,padding:"11px 16px",fontSize:13.5,lineHeight:1.68,color:"rgba(255,244,223,.6)"}}>{item}</div>))}</div>
                <p style={{fontSize:14,fontStyle:"italic",lineHeight:1.82,color:"rgba(253,186,116,.72)"}}>If you're building in the micro-drama space and need a production partner who understands both the technology and the story — this is for you.</p>
              </div>
            </div>
          </div>
        </Rv>

        <HR/>
        <Rv>
          <Lbl c="Why Bangzuu"/>
          <BigT c="Why Bangzuu"/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:14,marginTop:28}}>
            {ENT_WHY.map(([b,c])=>(
              <div key={b} className="card" style={{background:"rgba(0,0,0,.28)",minHeight:210,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <p style={{fontWeight:700,fontSize:15,lineHeight:1.58,color:"#fff4df",marginBottom:9}}>{b}</p>
                <p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.5)"}}>{c}</p>
              </div>
            ))}
          </div>
        </Rv>

        <HR/>
        <Rv>
          <Lbl c="Market data"/>
          <BigT c="The Market You're Already In"/>
          <div style={{display:"grid",gap:18,marginTop:28}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:14}}>
              {ENT_MARKET.map(([num,lbl])=>(
                <div key={num} className="card" style={{height:"100%",minHeight:148,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                  <div className="ttl" style={{fontSize:34,color:"#fff4df",marginBottom:10}}>{num}</div>
                  <p style={{fontSize:12.5,lineHeight:1.72,color:"rgba(255,244,223,.48)"}}>{lbl}</p>
                </div>
              ))}
            </div>
            <div style={{borderRadius:20,overflow:"hidden"}}>
              <MarketSVG/>
            </div>
          </div>
        </Rv>

        <HR/>
        <Rv><Lbl c="FAQ"/><BigT c="FAQ"/><div style={{marginTop:28}}>{ENT_FAQ.map(([q,a])=>(<details key={q} className="faq"><summary style={{fontWeight:700,color:"#fff4df",fontSize:14}}>{q}</summary><p style={{marginTop:12,fontSize:13.5,lineHeight:1.82,color:"rgba(255,244,223,.52)"}}>{a}</p></details>))}</div></Rv>

        <HR/>
        <Rv>
          <div id="ent-register" style={{border:"1px solid rgba(255,255,255,.16)",borderRadius:26,background:"rgba(255,255,255,.07)",padding:52,textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 30%,rgba(255,244,223,.06),transparent 50%)",pointerEvents:"none"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <Lbl c="Selective partnerships only"/><BigT c="Let's Talk About What You're Building." sz={48}/>
              <p style={{maxWidth:520,margin:"18px auto 0",fontSize:15,lineHeight:1.88,color:"rgba(255,244,223,.58)"}}>Whether you need content supply, a co-production partner, or IP for your sales slate — we want to hear from you.</p>
              <RegForm/>
              <p style={{marginTop:14,fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,.42)"}}>We review every submission. Selective partnerships only.</p>
            </div>
          </div>
        </Rv>
      </div>
    </>
  );
}

/* ── FITNESS PAGE ── */
const FIT_OFFERS=[{title:"Vertical Content Series for Fitness & Lifestyle Brands",copy:"Short-form, social-first branded series built around your product as the story engine — not a product placement. Developed with AI-assisted production and designed to live natively on the platforms your audience already spends time on.",bullets:["Multi-episode format that compounds over time — each episode deepens brand association","Story frameworks built for supplements, apparel, equipment, apps, and wellness brands","Scalable: start with a pilot series, expand what proves itself"]},{title:"Creator-Led Mini-Movies",copy:"3–10 minute branded entertainment films built around real creators and their existing audiences. Your product becomes the reason the story turns.",bullets:["Native to the creator's world — feels like their content, not your brief","Full brand usage rights across paid, owned, and social channels","Story templates built for fitness, lifestyle, and DTC brands — ready to pitch fast"]}];
const FIT_AUDIENCE=["Supplement and sports nutrition brands with an audience that cares about performance and identity","Gym apparel and activewear brands ready to move beyond product shots and UGC loops","Fitness and workout apps looking for hero content that builds long-term brand trust","Outdoor, adventure, and sports brands whose product deserves a story as good as the experience","Wellness, recovery, and lifestyle brands with something worth saying and an audience worth saying it to","DTC brands in fitness and lifestyle spending on creator content and not seeing the return the brief promised","Fitness, lifestyle, and direct-to-consumer brands with an engaged online audience and a product worth building a story around"];
const FIT_WHY=[["We make your brand part of the culture, not a sponsor of it.","The fitness and lifestyle audience can spot a paid integration from the first frame. We build content where your brand is so embedded in the story that the question never comes up."],["AI-assisted production means we move at the speed the market demands.","Vertical content trends fast. We produce fast — without sacrificing the cinematic quality that makes the audience stop scrolling."],["We work with creators who already have the audience you want.","No building from scratch. No hoping the algorithm picks it up. Real creators, real subscribers, real watch-through."],["You walk away with content that compounds.","A hero asset you own. A story your audience remembers. A brand association that outlasts the campaign that created it."]];
const FIT_FAQ=[["How is this different from a standard influencer partnership?","A standard partnership gives you a creator's audience for 30–90 seconds. What we build gives you a story their audience finishes, shares, and remembers — with your brand as the reason it worked."],["We already run UGC and performance creative. Why would we add this?","UGC and performance creative optimise for the short-term. Story-first content builds the brand equity that makes performance creative work better over time."],["How long does production take?","A vertical content series pilot moves from brief to delivery in 4–8 weeks. Creator mini-movies typically run 6–10 weeks."],["What does brand integration actually look like?","Your product is written into the story as the thing the character uses — not demonstrated to camera. A supplement isn't reviewed. It's the protocol that gets the athlete to the finish line."],["What usage rights do we get?","Full brand usage rights across your paid, owned, and social channels. The asset is yours."],["How many brand partners do you take on?","A limited number per quarter. Registering early puts you at the front of the queue."]];

function FitnessPage() {
  useReveal();
  return (
    <>
      {/* HERO BAND */}
      <div style={{position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#35170d 0%,#151515 50%,#040506 100%)",minHeight:520,display:"flex",alignItems:"center"}}>
        <div className="hero-grid" style={{opacity:.42}}/>
        <div style={{position:"absolute",left:"7%",top:"14%",width:300,height:300,borderRadius:"50%",background:"rgba(249,115,22,.24)",filter:"blur(85px)",animation:"drift1 14s ease-in-out infinite",pointerEvents:"none"}}/>
        <div style={{position:"absolute",right:"9%",bottom:"18%",width:220,height:220,borderRadius:"50%",background:"rgba(52,211,153,.09)",filter:"blur(65px)",animation:"drift3 17s ease-in-out infinite",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:110,background:"linear-gradient(to bottom,transparent,var(--bg))",pointerEvents:"none",zIndex:2}}/>
        <div style={{position:"relative",zIndex:5,maxWidth:1280,margin:"0 auto",padding:"110px 24px 72px",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"center"}}>
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,border:"1px solid rgba(253,186,116,.2)",borderRadius:50,padding:"6px 14px",fontFamily:"var(--mn)",fontSize:8.5,letterSpacing:".26em",textTransform:"uppercase",color:"rgba(253,186,116,.72)",background:"rgba(0,0,0,.38)",backdropFilter:"blur(10px)",marginBottom:22}}>
              <span style={{color:"var(--amber)",fontSize:7}}>▶</span> Bangzuu Studios × Fitness, Lifestyle & DTC
            </div>
            <h1 className="ttl" style={{fontSize:"clamp(32px,5vw,66px)",color:"#fff4df",marginBottom:20}}>Stop Sponsoring Fitness Content. Start Being the Reason People Watch It.</h1>
            <p style={{fontSize:16,fontWeight:700,lineHeight:1.82,color:"rgba(253,186,116,.86)",marginBottom:20}}>Bangzuu Studios builds vertical content series and creator-led mini-movies for fitness, lifestyle, and DTC brands — where your supplement fuels the comeback, your apparel defines the character, and your product isn't a mid-roll. It's the whole point.</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}>
              <StatPill num="4–8wk" label="Delivery time" delay={.2}/>
              <StatPill num="2.1M" label="Avg creator reach" delay={.35}/>
              <StatPill num="4.2×" label="Brand recall" delay={.5}/>
            </div>
            {["Your product written into the story as the thing that gets the athlete there","Vertical content series built natively for the platforms your audience trains on","Real fitness creators with real audiences — distribution exists before the first frame","Content that builds brand equity over time — not just ROAS for one campaign cycle"].map(b=>(<div key={b} style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:13,padding:"11px 16px",fontSize:13.5,lineHeight:1.72,color:"rgba(255,244,223,.6)",marginBottom:9}}>{b}</div>))}
            <p style={{margin:"16px 0",fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".2em",textTransform:"uppercase",color:"var(--amber)"}}>Limited brand partners per quarter.</p>
            <a href="#fit-register" className="btn">Register Interest</a>
          </div>
          <TiltCard style={{border:"none",boxShadow:"none"}}><FitHeroSVG/></TiltCard>
        </div>
      </div>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
        <HR/>
        <Rv>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"start"}}>
            <BigT c="Performance creative has a ceiling. Most fitness brands hit it faster than they expect." sz={50}/>
            <div>
              <p style={{fontSize:15,lineHeight:1.88,color:"rgba(255,244,223,.6)",marginBottom:18}}>UGC ads start strong and burn out. Influencer reads blend into the feed. The audience has seen the before-and-after. They've heard the discount code. They know what's coming before the creator opens their mouth.</p>
              <p style={{fontSize:15,lineHeight:1.88,color:"rgba(255,244,223,.6)"}}>The brands building lasting equity in fitness and lifestyle aren't running more ads. They're building content people actually want to watch.</p>
            </div>
          </div>
        </Rv>

        <HR/>
        <Rv>
          <Lbl c="Offerings"/><BigT c="What We Do"/>
          <div style={{marginTop:24,marginBottom:24}}><AthleteJourneySVG/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22,alignItems:"start"}}>
            <div style={{display:"grid",gap:18}}>
              {FIT_OFFERS.map(o=>(
                <div key={o.title} className="card">
                  <div style={{width:38,height:38,borderRadius:"50%",border:"1px solid rgba(253,186,116,.2)",background:"rgba(249,115,22,.1)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(253,186,116,.78)",fontSize:17,marginBottom:18}}>◈</div>
                  <h3 className="ttl" style={{fontSize:20,color:"#fff4df",marginBottom:11}}>{o.title}</h3>
                  <p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.52)",marginBottom:13}}>{o.copy}</p>
                  {o.bullets.map(b=>(<p key={b} style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:9,padding:"9px 13px",fontSize:12.5,lineHeight:1.58,color:"rgba(255,244,223,.48)",marginBottom:7}}>{b}</p>))}
                </div>
              ))}
            </div>
            <div style={{position:"sticky",top:90}}><FitnessOfferSVG/></div>
          </div>
        </Rv>

        <HR/>
        <Rv>
          <div style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:26,background:"rgba(255,255,255,.02)",padding:36}}>
            <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:36}}>
              <div><Lbl c="Audience"/><BigT c="Who Is This For"/></div>
              <div>
                <div style={{display:"grid",gap:9,marginBottom:22}}>{FIT_AUDIENCE.map(item=>(<div key={item} style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:11,padding:"11px 16px",fontSize:13.5,lineHeight:1.68,color:"rgba(255,244,223,.6)"}}>{item}</div>))}</div>
                <p style={{fontSize:14,fontStyle:"italic",lineHeight:1.82,color:"rgba(253,186,116,.72)"}}>If your brand lives in the fitness or lifestyle space and you're ready for content that builds something lasting — this is for you.</p>
              </div>
            </div>
          </div>
        </Rv>

        <HR/>
        <Rv>
          <Lbl c="Why Bangzuu"/><BigT c="Why Bangzuu"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginTop:28,alignItems:"stretch"}}>
            <div style={{display:"grid",gap:14}}>{FIT_WHY.slice(0,2).map(([b,c])=>(<div key={b} className="card" style={{background:"rgba(0,0,0,.28)"}}><p style={{fontWeight:700,fontSize:15,lineHeight:1.58,color:"#fff4df",marginBottom:9}}>{b}</p><p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.5)"}}>{c}</p></div>))}</div>
            <div style={{display:"grid",gap:14}}>{FIT_WHY.slice(2).map(([b,c])=>(<div key={b} className="card" style={{background:"rgba(0,0,0,.28)"}}><p style={{fontWeight:700,fontSize:15,lineHeight:1.58,color:"#fff4df",marginBottom:9}}>{b}</p><p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.5)"}}>{c}</p></div>))}</div>
          </div>
          <div style={{marginTop:20}}><CreatorNetworkSVG/></div>
        </Rv>

        <HR/>
        <Rv><Lbl c="FAQ"/><BigT c="FAQ"/><div style={{marginTop:28}}>{FIT_FAQ.map(([q,a])=>(<details key={q} className="faq"><summary style={{fontWeight:700,color:"#fff4df",fontSize:14}}>{q}</summary><p style={{marginTop:12,fontSize:13.5,lineHeight:1.82,color:"rgba(255,244,223,.52)"}}>{a}</p></details>))}</div></Rv>

        <HR/>
        <Rv>
          <div id="fit-register" style={{border:"1px solid rgba(255,255,255,.16)",borderRadius:26,background:"rgba(255,255,255,.07)",padding:52,textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 30%,rgba(255,244,223,.06),transparent 50%)",pointerEvents:"none"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <Lbl c="Limited spots available per quarter"/><BigT c="Ready to Build Content Your Audience Actually Wants to Watch?" sz={46}/>
              <p style={{maxWidth:520,margin:"18px auto 0",fontSize:15,lineHeight:1.88,color:"rgba(255,244,223,.58)"}}>Stop blending in. Start owning the story. Register your interest and we'll be in touch within 48 hours.</p>
              <RegForm/>
              <p style={{marginTop:14,fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,.42)"}}>We review every submission. Limited spots available per quarter.</p>
            </div>
          </div>
        </Rv>
      </div>
    </>
  );
}

/* ── APP ── */
export default function App() {
  const [page,setPage]=useState("home");
  const [scrollPct,setScrollPct]=useState(0);
  useEffect(()=>{
    const fn=()=>{const m=document.documentElement.scrollHeight-window.innerHeight;setScrollPct(m>0?(window.scrollY/m)*100:0);};
    window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);
  },[]);

  return (
    <>
      <style>{CSS}</style>
      <CursorGlow/>
      {/* scroll bar */}
      <div style={{position:"fixed",top:0,left:0,height:3,width:`${scrollPct}%`,background:"linear-gradient(90deg,var(--amber),#fde68a)",boxShadow:"0 0 20px var(--amber)",zIndex:300,transition:"width .1s linear"}}/>
      {/* ambient blobs */}
      <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
        <div style={{position:"absolute",left:"5%",top:"20%",width:280,height:280,borderRadius:"50%",background:"rgba(124,58,237,.11)",filter:"blur(72px)",animation:"floatA 11s ease-in-out infinite"}}/>
        <div style={{position:"absolute",right:"7%",top:"40%",width:320,height:320,borderRadius:"50%",background:"rgba(249,115,22,.08)",filter:"blur(88px)",animation:"floatB 14s ease-in-out infinite"}}/>
        <div style={{position:"absolute",left:"50%",top:30,width:600,height:600,borderRadius:"50%",background:"rgba(249,115,22,.05)",filter:"blur(120px)",transform:"translateX(-50%)"}}/>
      </div>
      {/* noise */}
      <div style={{position:"fixed",inset:0,zIndex:50,pointerEvents:"none",opacity:.05,mixBlendMode:"screen"}}><div style={{position:"absolute",inset:0,background:"repeating-linear-gradient(0deg,rgba(255,255,255,.14) 0,transparent 1px,transparent 4px)"}}/></div>
      <Header page={page} setPage={setPage}/>
      <main style={{position:"relative",zIndex:10}}>
        {page==="home"&&<HomePage/>}
        {page==="entertainment"&&<EntertainmentPage/>}
        {page==="fitness"&&<FitnessPage/>}
      </main>
      <footer style={{position:"relative",zIndex:10,borderTop:"1px solid rgba(255,255,255,.07)",padding:"32px 24px"}}>
        <div style={{maxWidth:1280,margin:"0 auto",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10,fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".22em",textTransform:"uppercase",color:"rgba(255,244,223,.32)"}}>
          <span>© 2026 Bangzuu Studios</span>
          <span>{page==="home"?"AI // Story // Distribution":page==="entertainment"?"Entertainment // Media // Micro-drama":"Fitness // Lifestyle // DTC"}</span>
        </div>
      </footer>
    </>
  );
}