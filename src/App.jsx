import { useState, useEffect, useRef } from "react";
 
const COLORS = {
  torra: "#2B1810", cacau: "#3A2418", caramelo: "#8B5E3C",
  dourado: "#D4A574", latao: "#C9A961", creme: "#EFE4D2", cremeBg: "#F5EFE6"
};
 
const fonts = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');`;
 
const globalCSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: ${COLORS.torra}; }
.cl-site { font-family: 'Lora', serif; color: ${COLORS.creme}; background: ${COLORS.torra}; }
h1,h2,h3,h4 { font-family: 'Cormorant Garamond', serif; }
.sec-dark { background: ${COLORS.torra}; color: ${COLORS.creme}; }
.sec-cacau { background: ${COLORS.cacau}; color: ${COLORS.creme}; }
.sec-light { background: ${COLORS.cremeBg}; color: ${COLORS.torra}; }
.sec-deep { background: #1A0E0A; color: ${COLORS.creme}; }
.pad-sec { padding: 120px 60px; }
@media(max-width:768px){ .pad-sec { padding: 80px 24px; } }
.descriptor { font-family: 'Cormorant Garamond', serif; font-size: 13px; letter-spacing: 0.3em; text-transform: uppercase; color: ${COLORS.dourado}; font-style: italic; display: block; margin-bottom: 16px; }
.gold-line { width: 200px; height: 1px; background: ${COLORS.dourado}; margin: 32px auto; opacity: 0.6; }
.ornament { color: ${COLORS.dourado}; letter-spacing: 0.6em; font-size: 14px; display: block; text-align: center; margin: 24px 0; }
.btn-primary { background: ${COLORS.dourado}; color: ${COLORS.torra}; font-family: 'Cormorant Garamond', serif; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; padding: 14px 36px; border: none; cursor: pointer; transition: opacity 0.3s; display: inline-block; }
.btn-primary:hover { opacity: 0.85; }
.btn-secondary { background: transparent; color: ${COLORS.creme}; font-family: 'Cormorant Garamond', serif; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; padding: 13px 35px; border: 1px solid ${COLORS.dourado}; cursor: pointer; transition: all 0.3s; display: inline-block; }
.btn-secondary:hover { background: rgba(212,165,116,0.1); }
.btn-secondary-dark { background: transparent; color: ${COLORS.torra}; font-family: 'Cormorant Garamond', serif; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; padding: 13px 35px; border: 1px solid ${COLORS.caramelo}; cursor: pointer; transition: all 0.3s; display: inline-block; }
.btn-secondary-dark:hover { background: rgba(139,94,60,0.1); }
.btn-latao { background: transparent; color: ${COLORS.latao}; font-family: 'Cormorant Garamond', serif; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; padding: 13px 35px; border: 1px solid ${COLORS.latao}; cursor: pointer; transition: all 0.3s; display: inline-block; }
.btn-latao:hover { background: rgba(201,169,97,0.1); }
.btn-text { background: none; border: none; cursor: pointer; font-family: 'Cormorant Garamond', serif; font-size: 17px; font-style: italic; color: ${COLORS.dourado}; text-decoration: none; border-bottom: 1px solid ${COLORS.dourado}; padding-bottom: 2px; }
.fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease, transform 0.8s ease; }
.fade-in.visible { opacity: 1; transform: translateY(0); }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 24px; }
.modal-box { background: ${COLORS.cacau}; border: 1px solid ${COLORS.dourado}; padding: 40px 24px; max-width: 540px; width: 100%; text-align: center; }
.sticky-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 500; background: rgba(43,24,16,0.92); backdrop-filter: blur(8px); padding: 20px 60px; display: flex; align-items: center; justify-content: space-between; border-bottom: 0.5px solid rgba(212,165,116,0.2); }
@media(max-width:768px){ .sticky-nav { padding: 16px 24px; } }
.nav-links { display: flex; gap: 28px; }
@media(max-width:1024px){ .nav-links { display: none; } }
.nav-link { font-family: 'Cormorant Garamond', serif; font-size: 15px; letter-spacing: 0.12em; color: ${COLORS.creme}; background: none; border: none; cursor: pointer; opacity: 0.8; transition: opacity 0.3s; padding: 0; }
.nav-link:hover { opacity: 1; }
.hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; }
@media(max-width:1024px){ .hamburger { display: flex; } }
.ham-line { width: 24px; height: 1px; background: ${COLORS.creme}; }
.mob-menu { position: fixed; inset: 0; background: ${COLORS.torra}; z-index: 600; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 40px; }
.mob-link { font-family: 'Cormorant Garamond', serif; font-size: 40px; letter-spacing: 0.15em; color: ${COLORS.creme}; background: none; border: none; cursor: pointer; }
.faq-item { border-bottom: 0.5px solid rgba(139,94,60,0.3); }
.faq-q { width: 100%; text-align: left; background: none; border: none; cursor: pointer; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; font-family: 'Cormorant Garamond', serif; font-size: 20px; color: ${COLORS.torra}; letter-spacing: 0.02em; }
.faq-a { font-family: 'Lora', serif; font-size: 15px; line-height: 1.8; color: ${COLORS.caramelo}; padding-bottom: 24px; padding-right: 40px; }
.blend-card { background: white; border: 1px solid rgba(139,94,60,0.15); padding: 48px 40px; transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; }
.blend-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(139,94,60,0.12); }
@media(max-width:768px){ .blend-card { padding: 32px 24px; } }
.dep-card { background: ${COLORS.cacau}; border: 1px solid rgba(212,165,116,0.2); padding: 48px 36px; flex: 1; min-width: 220px; }
@media(max-width:768px){ .dep-card { padding: 32px 24px; min-width: 100%; } }
.testi-quote { font-family: 'Cormorant Garamond', serif; font-size: 60px; line-height: 0.5; color: ${COLORS.dourado}; margin-bottom: 16px; display: block; }
.buy-box { border: 0.5px solid rgba(139,94,60,0.2); padding: 32px; margin-top: 32px; }
@media(max-width:768px){ .buy-box { padding: 20px 16px; } }
.buy-option { display: flex; flex-direction: column; gap: 8px; padding: 20px; border: 0.5px solid rgba(139,94,60,0.2); cursor: pointer; transition: all 0.25s; position: relative; }
@media(max-width:768px){ .buy-option { padding: 16px 12px; } }
.buy-option.selected { border-color: var(--accent); background: rgba(212,165,116,0.06); }
.buy-option.featured { border-color: var(--accent); }
@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
`;
 
const SL = {
  o250a: "https://buy.stripe.com/eVq28sfZUaWk8ub76P6wE0c",
  o250s: "https://buy.stripe.com/7sY28s6pk1lKdOv9eX6wE0d",
  o500a: "https://buy.stripe.com/14AaEY7to0hG11JfDl6wE0a",
  o500s: "https://buy.stripe.com/8x2fZidRMggEh0H2Qz6wE09",
  e250a: "https://buy.stripe.com/dRmcN62944xWeSzbn56wE04",
  e250s: "https://buy.stripe.com/4gM5kEcNIc0o5hZ1Mv6wE01",
  e500a: "https://buy.stripe.com/7sYeVe294aWkeSz1Mv6wE0b",
  e500s: "https://buy.stripe.com/28EfZieVQ5C0dOv2Qz6wE07",
  h250a: "https://buy.stripe.com/8x25kE9Bw5C07q71Mv6wE02",
  h250s: "https://buy.stripe.com/4gM5kE8xsc0o39R1Mv6wE0e",
  h500a: "https://buy.stripe.com/7sY4gAcNI9Sg6m32Qz6wE00",
  h500s: "https://buy.stripe.com/aFa8wQ3d84xW4dVgHp6wE08",
  ralex: "https://buy.stripe.com/14A5kEeVQ2pO6m3gHp6wE05",
  rparis: "https://buy.stripe.com/aFa00k00We8w25Nezh6wE03",
  rrio: "https://buy.stripe.com/3cI5kEbJE8Oc8ub4YH6wE06"
};
 
function getStripeUrl(blendId, gram, tipo, moagem) {
  var g = gram === "250g" ? "250" : "500";
  var t = tipo === "assinatura" ? "s" : "a";
  var prefix = blendId === "blend-original" ? "o" : blendId === "blend-equilibrio" ? "e" : "h";
  var key = prefix + g + t;
  var base = SL[key];
  if (!base) return null;
  var m = encodeURIComponent(moagem || "Em grao");
  return base + "?utm_content=" + m;
}
 
function getReservaUrl(nome) {
  if (nome === "Reserva Alexandria") return SL.ralex;
  if (nome === "Reserva Paris") return SL.rparis;
  if (nome === "Reserva Rio") return SL.rrio;
  return null;
}
 
const MonogramL = ({ size = 180, color = COLORS.dourado, letter = "L", showDots = true }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <circle cx="100" cy="100" r="90" stroke={color} strokeWidth="1.8"/>
    <circle cx="100" cy="100" r="82" stroke={color} strokeWidth="0.5" opacity="0.6"/>
    <text x="100" y="118" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="100" fontWeight="400" fill={COLORS.creme}>{letter}</text>
    {showDots && (<><circle cx="90" cy="148" r="1.5" fill={color}/><circle cx="100" cy="148" r="1.5" fill={color}/><circle cx="110" cy="148" r="1.5" fill={color}/></>)}
  </svg>
);
 
const RicoPortrait = ({ size = 160 }) => (
  <div style={{ width: size, height: size, margin: "0 auto", position: "relative" }}>
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="96" stroke={COLORS.latao} strokeWidth="1.8"/>
      <circle cx="100" cy="100" r="88" stroke={COLORS.latao} strokeWidth="0.5" opacity="0.5"/>
      <path d="M38 85 Q40 50 65 35 Q85 22 100 20 Q115 22 135 35 Q160 50 162 85" fill="#C8C0B8" opacity="0.6"/>
      <path d="M38 85 Q42 55 66 38 Q86 25 100 23" fill="none" stroke={COLORS.latao} strokeWidth="0.6" opacity="0.5"/>
      <path d="M162 85 Q158 55 134 38 Q114 25 100 23" fill="none" stroke={COLORS.latao} strokeWidth="0.6" opacity="0.5"/>
      <ellipse cx="100" cy="110" rx="54" ry="65" fill="#D8C8B0" opacity="0.5"/>
      <ellipse cx="100" cy="110" rx="54" ry="65" fill="none" stroke={COLORS.latao} strokeWidth="0.8" opacity="0.6"/>
      <path d="M68 82 Q78 76 88 80" fill="none" stroke={COLORS.latao} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
      <path d="M112 80 Q122 76 132 82" fill="none" stroke={COLORS.latao} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
      <rect x="64" y="86" width="32" height="20" rx="8" fill="none" stroke={COLORS.latao} strokeWidth="1.8" opacity="0.9"/>
      <rect x="104" y="86" width="32" height="20" rx="8" fill="none" stroke={COLORS.latao} strokeWidth="1.8" opacity="0.9"/>
      <path d="M96 96 Q100 93 104 96" fill="none" stroke={COLORS.latao} strokeWidth="1.4" opacity="0.9"/>
      <path d="M64 96 Q55 93 48 90" fill="none" stroke={COLORS.latao} strokeWidth="1.2" opacity="0.8"/>
      <path d="M136 96 Q145 93 152 90" fill="none" stroke={COLORS.latao} strokeWidth="1.2" opacity="0.8"/>
      <circle cx="80" cy="96" r="5" fill={COLORS.latao} opacity="0.3"/>
      <circle cx="120" cy="96" r="5" fill={COLORS.latao} opacity="0.3"/>
      <circle cx="83" cy="93" r="2" fill="white" opacity="0.5"/>
      <circle cx="123" cy="93" r="2" fill="white" opacity="0.5"/>
      <path d="M95 106 Q90 118 88 124 Q94 128 100 127 Q106 128 112 124 Q110 118 105 106" fill="none" stroke={COLORS.latao} strokeWidth="0.7" opacity="0.55"/>
      <path d="M78 138 Q100 154 122 138" fill="none" stroke={COLORS.latao} strokeWidth="1.6" opacity="0.85" strokeLinecap="round"/>
      <path d="M78 138 Q72 128 76 120" fill="none" stroke={COLORS.latao} strokeWidth="0.8" opacity="0.5"/>
      <path d="M122 138 Q128 128 124 120" fill="none" stroke={COLORS.latao} strokeWidth="0.8" opacity="0.5"/>
      <path d="M82 138 Q100 150 118 138 Q100 136 82 138 Z" fill="white" opacity="0.7"/>
      <path d="M46 118 Q44 135 48 152 Q56 168 70 175 Q84 181 100 182" fill="none" stroke={COLORS.latao} strokeWidth="0.9" opacity="0.55"/>
      <path d="M50 118 Q48 134 52 150 Q60 166 74 173" fill="none" stroke={COLORS.latao} strokeWidth="0.6" opacity="0.4"/>
      <path d="M154 118 Q156 135 152 152 Q144 168 130 175 Q116 181 100 182" fill="none" stroke={COLORS.latao} strokeWidth="0.9" opacity="0.55"/>
      <path d="M150 118 Q152 134 148 150 Q140 166 126 173" fill="none" stroke={COLORS.latao} strokeWidth="0.6" opacity="0.4"/>
      <path d="M82 132 Q91 128 100 130 Q109 128 118 132" fill="none" stroke={COLORS.latao} strokeWidth="1.2" opacity="0.65" strokeLinecap="round"/>
      <path d="M46 95 Q40 108 44 122 Q48 132 56 134 Q58 120 58 108 Z" fill="none" stroke={COLORS.latao} strokeWidth="0.8" opacity="0.55"/>
      <path d="M154 95 Q160 108 156 122 Q152 132 144 134 Q142 120 142 108 Z" fill="none" stroke={COLORS.latao} strokeWidth="0.8" opacity="0.55"/>
      <text x="100" y="197" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="8" fill={COLORS.latao} letterSpacing="2" opacity="0.7" fontStyle="italic">RICO</text>
    </svg>
  </div>
);
 
const SacoBlend = ({ blend, gram, moagem, isReserva, loteNome, loteNotas }) => {
  var w = gram === "250g" ? 160 : 192;
  var h = gram === "250g" ? 240 : 288;
  var sw = w * 0.78; var sh = h * 0.66;
  var sx = (w - sw) / 2; var sy = h * 0.14;
  var a = isReserva ? COLORS.latao : (blend ? blend.accent : COLORS.dourado);
  var fs = gram === "250g" ? 1 : 1.18;
  var nome = isReserva ? (loteNome || "") : (blend ? blend.nome : "");
  var notas = isReserva ? (loteNotas || "") : (blend ? blend.notas : "");
  var torra = isReserva ? "EDICAO LIMITADA" : (blend ? blend.torra : "");
  var uso = isReserva ? "Microlote especial\nnumerado a mao" : (blend ? blend.uso : "");
  var usoL = uso.split("\n");
  var notasL = notas.split(" . ");
  var nomeL = nome.split(" ");
  return (
    <svg width={w} height={h} viewBox={"0 0 " + w + " " + h} fill="none">
      <rect x="0" y="0" width={w} height={h} rx="10" fill="#3D2B1A"/>
      <rect x="0" y="0" width={w} height={h} rx="10" fill="none" stroke="#2B1810" strokeWidth="1.2"/>
      <line x1="0" y1={h*0.12} x2={w} y2={h*0.12} stroke="#2B1810" strokeWidth="0.4" opacity="0.4"/>
      <line x1="0" y1={h*0.88} x2={w} y2={h*0.88} stroke="#2B1810" strokeWidth="0.4" opacity="0.4"/>
      <ellipse cx={w/2} cy={h*0.93} rx={w*0.09} ry={w*0.045} fill="none" stroke="#2B1810" strokeWidth="0.8" opacity="0.4"/>
      <rect x={sx} y={sy} width={sw} height={sh} rx="2" fill="#EFE4D2"/>
      <rect x={sx} y={sy} width={sw} height={sh} rx="2" fill="none" stroke={a} strokeWidth="0.5"/>
      <rect x={sx} y={sy} width={sw} height={4*fs} fill={a}/>
      <rect x={sx} y={sy+sh-4*fs} width={sw} height={4*fs} fill={a}/>
      <circle cx={w/2} cy={sy+sh*0.13} r={14*fs} fill="none" stroke={a} strokeWidth="0.9"/>
      <circle cx={w/2} cy={sy+sh*0.13} r={11*fs} fill="none" stroke={a} strokeWidth="0.35" opacity="0.5"/>
      <text x={w/2} y={sy+sh*0.13+5*fs} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize={14*fs} fill="#2B1810">{isReserva ? "R" : "L"}</text>
      <text x={w/2} y={sy+sh*0.26} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize={6*fs} fill={a} letterSpacing="2" fontStyle="italic">CASA LEVY</text>
      <line x1={sx+sw*0.15} y1={sy+sh*0.29} x2={sx+sw*0.85} y2={sy+sh*0.29} stroke={a} strokeWidth="0.4" opacity="0.5"/>
      <text x={w/2} y={sy+sh*0.38} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize={nomeL.length > 2 ? 10*fs : 12*fs} fill="#2B1810" letterSpacing="0.5">{nomeL.slice(0,2).join(" ")}</text>
      {nomeL[2] && <text x={w/2} y={sy+sh*0.46} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize={10*fs} fill="#2B1810" letterSpacing="0.5">{nomeL[2]}</text>}
      <line x1={sx+sw*0.22} y1={sy+sh*(nomeL[2]?0.50:0.43)} x2={sx+sw*0.78} y2={sy+sh*(nomeL[2]?0.50:0.43)} stroke={a} strokeWidth="0.5" opacity="0.7"/>
      <text x={w/2} y={sy+sh*(nomeL[2]?0.56:0.50)} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize={5.5*fs} fill={a} letterSpacing="1.5" fontStyle="italic">{torra}</text>
      <text x={w/2} y={sy+sh*(nomeL[2]?0.62:0.57)} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize={6*fs} fill="#2B1810" fontStyle="italic" opacity="0.6">{usoL[0]}</text>
      {usoL[1] && <text x={w/2} y={sy+sh*(nomeL[2]?0.68:0.63)} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize={6*fs} fill="#2B1810" fontStyle="italic" opacity="0.6">{usoL[1]}</text>}
      <text x={w/2} y={sy+sh*(nomeL[2]?0.79:0.75)} textAnchor="middle" fontFamily="Lora, serif" fontSize={5*fs} fill="#2B1810" opacity="0.65">{notasL[0]||""}</text>
      {notasL[1] && <text x={w/2} y={sy+sh*(nomeL[2]?0.85:0.81)} textAnchor="middle" fontFamily="Lora, serif" fontSize={5*fs} fill="#2B1810" opacity="0.65">{notasL[1]}</text>}
      <line x1={sx+sw*0.1} y1={sy+sh*0.88} x2={sx+sw*0.9} y2={sy+sh*0.88} stroke={a} strokeWidth="0.3" opacity="0.4"/>
      {!isReserva && <text x={w/2} y={sy+sh*0.93} textAnchor="middle" fontFamily="Lora, serif" fontSize={5*fs} fill="#2B1810" opacity="0.55">{gram}</text>}
      {isReserva && <text x={w/2} y={sy+sh*0.93} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize={5.5*fs} fill={a} opacity="0.8">150g - Edicao Limitada</text>}
    </svg>
  );
};
 
const CupSVG = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <path d="M20 30 L100 30 L90 100 L30 100 Z" fill="none" stroke={COLORS.dourado} strokeWidth="1"/>
    <path d="M20 30 Q60 15 100 30" fill="none" stroke={COLORS.dourado} strokeWidth="0.6" opacity="0.5"/>
    <ellipse cx="60" cy="100" rx="30" ry="5" fill="none" stroke={COLORS.dourado} strokeWidth="0.6" opacity="0.4"/>
    <path d="M100 45 Q120 50 115 70 Q110 85 95 80" fill="none" stroke={COLORS.dourado} strokeWidth="1"/>
  </svg>
);
 
function BuyBox({ blend, blendId, openModal }) {
  const [gram, setGram] = useState("250g");
  const [moagem, setMoagem] = useState("Em grao");
  const [buyType, setBuyType] = useState("assinar");
  const [showMachineNote, setShowMachineNote] = useState(false);
  var a = blend ? blend.accent : COLORS.dourado;
  var precoAvulso = gram === "250g" ? 49 : 90;
  var precoAssine = gram === "250g" ? 44 : 81;
  var economia = precoAvulso - precoAssine;
  var moagens = [
    { id: "Em grao", label: "Em grao", desc: "Para quem tem moedor" },
    { id: "Moido para espresso", label: "Moido para espresso", desc: "Para maquina de espresso" },
    { id: "Moido para filtrado", label: "Moido para filtrado", desc: "V60, Chemex, coador, francesa" }
  ];
  function handleMoagem(id) { setMoagem(id); setShowMachineNote(id === "Moido para espresso"); }
  function handleComprar() {
    var tipo = buyType === "assinar" ? "assinatura" : "avulso";
    var url = getStripeUrl(blendId, gram, tipo, moagem);
    if (url) { window.open(url, "_blank"); } else { openModal("sua compra"); }
  }
  return (
    <div className="buy-box" style={{ "--accent": a }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.2em", color: COLORS.caramelo, marginBottom: 12 }}>GRAMATURA</div>
        <div style={{ display: "flex", gap: 10 }}>
          {["250g","500g"].map(function(g) { return (
            <button key={g} onClick={function() { setGram(g); }} style={{ flex: 1, padding: "12px", fontFamily: "'Cormorant Garamond', serif", fontSize: 16, background: gram === g ? a + "20" : "transparent", border: "0.5px solid " + (gram === g ? a : "rgba(139,94,60,0.25)"), color: COLORS.torra, cursor: "pointer", transition: "all 0.2s" }}>{g}</button>
          ); })}
        </div>
      </div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.2em", color: COLORS.caramelo, marginBottom: 12 }}>MOAGEM</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {moagens.map(function(m) { return (
            <button key={m.id} onClick={function() { handleMoagem(m.id); }} style={{ padding: "10px 12px", background: moagem === m.id ? a + "18" : "transparent", border: "0.5px solid " + (moagem === m.id ? a : "rgba(139,94,60,0.2)"), cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: COLORS.torra }}>{m.label}</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 11, color: COLORS.caramelo, opacity: 0.7 }}>{m.desc}</div>
            </button>
          ); })}
        </div>
        {showMachineNote && (
          <div style={{ marginTop: 10, padding: "12px 16px", border: "0.5px solid " + COLORS.latao + "50" }}>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 12, color: COLORS.torra, lineHeight: 1.6, marginBottom: 6 }}>Para espresso você precisa de uma máquina adequada.</p>
            <button style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: COLORS.caramelo, background: "none", border: "none", cursor: "pointer", borderBottom: "0.5px solid " + COLORS.caramelo }}>Me ajuda a escolher</button>
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        <div className={"buy-option" + (buyType === "assinar" ? " selected" : " featured")} style={{ "--accent": a }} onClick={function() { setBuyType("assinar"); }}>
          <div style={{ position: "absolute", top: -10, left: 16, background: a, padding: "2px 12px", fontFamily: "'Cormorant Garamond', serif", fontSize: 10, letterSpacing: "0.2em", color: COLORS.cremeBg }}>MAIS ESCOLHIDO</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: 8 }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: COLORS.torra, marginBottom: 4 }}>Assinar e economizar</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: COLORS.caramelo, lineHeight: 1.6 }}>Entrega mensal automática. Cancele quando quiser.</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: a, marginTop: 6 }}>Após 6 meses, Renato escolhe uma Reserva Rico para você</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: COLORS.caramelo, marginTop: 4 }}>Acesso antecipado a novos lotes da Reserva Rico</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: COLORS.torra }}>R$ {precoAssine}<span style={{ fontSize: 13, opacity: 0.6 }}>/mês</span></div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 11, color: a }}>economia de R$ {economia}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", border: "1px solid " + a, background: buyType === "assinar" ? a : "transparent", flexShrink: 0 }}/>
            <span style={{ fontFamily: "'Lora', serif", fontSize: 11, color: COLORS.caramelo }}>Plano mensal — sem fidelidade</span>
          </div>
        </div>
        <div className={"buy-option" + (buyType === "avulso" ? " selected" : "")} style={{ "--accent": a }} onClick={function() { setBuyType("avulso"); }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: COLORS.torra, marginBottom: 4 }}>Comprar uma vez</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: COLORS.caramelo }}>Sem compromisso</div>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: COLORS.torra }}>R$ {precoAvulso}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", border: "1px solid rgba(139,94,60,0.4)", background: buyType === "avulso" ? a : "transparent", flexShrink: 0 }}/>
            <span style={{ fontFamily: "'Lora', serif", fontSize: 11, color: COLORS.caramelo }}>Compra única</span>
          </div>
        </div>
      </div>
      <button onClick={handleComprar} style={{ width: "100%", padding: "16px", background: a, color: COLORS.cremeBg, fontFamily: "'Cormorant Garamond', serif", fontSize: 15, letterSpacing: "0.2em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "opacity 0.3s" }}>
        {buyType === "assinar" ? "Assinar por R$ " + precoAssine + "/mês" : "Comprar por R$ " + precoAvulso}
      </button>
      {buyType === "assinar" && (
        <p style={{ fontFamily: "'Lora', serif", fontSize: 11, color: COLORS.caramelo, textAlign: "center", marginTop: 10, opacity: 0.7 }}>Pause, mude ou cancele quando quiser. Sem letra miúda.</p>
      )}
    </div>
  );
}
 
function useFadeIn() {
  const ref = useRef(null);
  useEffect(function() {
    var el = ref.current;
    if (!el) return;
    var obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return function() { obs.disconnect(); };
  }, []);
  return ref;
}
 
function FadeIn({ children, style }) {
  var ref = useFadeIn();
  return <div ref={ref} className="fade-in" style={style || {}}>{children}</div>;
}
 
function Modal({ content, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={function(e) { e.stopPropagation(); }}>
        <MonogramL size={60}/>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: COLORS.dourado, margin: "24px 0 16px" }}>Em breve</h3>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 15, lineHeight: 1.8, color: COLORS.creme, opacity: 0.85, marginBottom: 32 }}>Estamos finalizando o checkout. Entre em contato pelo Instagram para garantir já a sua vaga.</p>
        <button className="btn-primary" onClick={onClose}>Entendido</button>
        <div style={{ marginTop: 16 }}>
          <a href="https://instagram.com" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.2em", color: COLORS.dourado, textDecoration: "none", opacity: 0.8 }}>@casalevy.cafe</a>
        </div>
      </div>
    </div>
  );
}
 
function FAQ() {
  const [open, setOpen] = useState(null);
  var items = [
    { q: "Como funciona a assinatura?", a: "Você escolhe o café, a gramatura e a moagem, e recebe todo mês com 10% de desconto. Após 6 meses, o Renato escolhe um lote da Reserva Rico e envia de presente. Assinantes também têm acesso antecipado a novos lotes." },
    { q: "Posso pausar ou cancelar?", a: "Pode, sem letra miúda. Pause, mude o café ou cancele a qualquer momento. Não cobramos taxa, não pedimos motivo." },
    { q: "Para quais cidades vocês entregam?", a: "Para todo o Brasil. Frete calculado no checkout." },
    { q: "Como o café fica fresco até chegar?", a: "Torramos toda semana, embalamos com válvula desgaseificadora, e enviamos em até 48h depois da torra." },
    { q: "Posso presentear?", a: "Pode. Temos opção de presente em todos os cafés e na Reserva Rico. Embrulho especial e cartão escrito à mão." },
    { q: "De onde vem o café?", a: "De fazendas brasileiras com relação direta com a Casa Levy. Cada café vem com a ficha do produtor." },
    { q: "O que é a Reserva Rico?", a: "Microlotes especiais feitos com um blend especial, em homenagem ao avô Menahem. Edição limitada, numerada à mão. Assinantes têm acesso antecipado a cada novo lote. Quem completa 6 meses recebe um lote escolhido pelo Renato, de presente da casa." }
  ];
  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      {items.map(function(item, i) { return (
        <div key={i} className="faq-item">
          <button className="faq-q" onClick={function() { setOpen(open === i ? null : i); }}>
            <span>{item.q}</span>
            <span style={{ color: COLORS.dourado, fontSize: 22, fontFamily: "monospace", fontWeight: 300 }}>{open === i ? "-" : "+"}</span>
          </button>
          {open === i && <div className="faq-a">{item.a}</div>}
        </div>
      ); })}
    </div>
  );
}
 
function Hero({ nav }) {
  return (
    <section className="sec-dark" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px" }}>
      <FadeIn><MonogramL size={160}/></FadeIn>
      <FadeIn style={{ marginTop: 32 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(64px, 10vw, 120px)", fontWeight: 400, letterSpacing: "0.4em", color: COLORS.creme, lineHeight: 1 }}>CASA LEVY</h1>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(11px,1.5vw,14px)", letterSpacing: "0.3em", color: COLORS.dourado, fontStyle: "italic", marginTop: 12 }}>TRÊS GERAÇÕES DE CAFÉ</div>
        <div className="gold-line" style={{ margin: "28px auto" }}/>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(17px,2vw,22px)", color: COLORS.creme, opacity: 0.8, marginBottom: 48 }}>o café como pausa, presença e família</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={function() { nav("blend-original"); }}>Escolher meu café</button>
          <button className="btn-secondary" onClick={function() { nav("reserva"); }}>Reserva Rico</button>
        </div>
      </FadeIn>
      <div style={{ marginTop: 80, color: COLORS.dourado, letterSpacing: "0.6em", fontSize: 12, animation: "pulse 2.5s ease-in-out infinite" }}>. . .</div>
    </section>
  );
}
 
function Manifesto({ nav }) {
  return (
    <section className="sec-dark pad-sec">
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <FadeIn><span className="ornament">. . .</span></FadeIn>
        <FadeIn>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px,7vw,80px)", lineHeight: 1.1, color: COLORS.creme, marginBottom: 48 }}>Não vendemos café.<br/><em>Vendemos o ritual.</em></h2>
        </FadeIn>
        <FadeIn>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 17, lineHeight: 1.9, color: COLORS.creme, opacity: 0.8, marginBottom: 32 }}>Café é a primeira coisa que a gente faz. É o que reúne a casa antes do mundo começar.</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 22, color: COLORS.dourado, marginBottom: 8 }}>Café é pausa.</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 22, color: COLORS.dourado, marginBottom: 8 }}>Café é presença.</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 22, color: COLORS.dourado, marginBottom: 40 }}>Café é família.</p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 17, lineHeight: 1.9, color: COLORS.creme, opacity: 0.75, marginBottom: 40 }}>A Casa Levy nasce dessa convicção e de uma história que atravessou três continentes para chegar até a sua xícara.</p>
          <button className="btn-text" onClick={function() { nav("casa"); }}>Conheça nossa história</button>
        </FadeIn>
      </div>
    </section>
  );
}
 
function Historia({ nav }) {
  var pessoas = [
    { gen: "A primeira geração", nome: 'Menahem "Rico" Levy', anos: "1938 — 2024", texto: "Nasceu no Egito, em uma Alexandria cosmopolita onde o café árabe era moeda de hospitalidade. Quando os judeus foram expulsos, perdeu casa, língua e referências, mas trouxe na memória a forma de fazer café. Estudou na França. Escolheu o Brasil como pátria. Foi exportador, operador de mercado, pioneiro do espresso italiano em bares e restaurantes brasileiros. Foi chamado de Rico a vida inteira, porque era rico de história, de afeto, de paladar." },
    { gen: "A segunda geração", nome: "Renato Levy", anos: "", texto: "Aprendeu o ofício observando o pai. É o coração e a cara da Casa Levy. Quem decide os blends. Quem garante que cada saca que entra na torrefação saia com a assinatura da casa." },
    { gen: "A terceira geração", nome: "Paulo Chut", anos: "", texto: "Sobrinho-neto e apaixonado confesso por café, o tipo que toma xícaras sem parar e ainda acha que a próxima vai ser a melhor. Para Paulo, trabalhar com café não é uma escolha racional. É a única forma que faz sentido de honrar o avô Rico e transformar obsessão em algo real." }
  ];
  return (
    <section className="sec-light pad-sec">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 80 }}>
          <span className="descriptor" style={{ textAlign: "center" }}>A CASA</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,58px)", color: COLORS.torra }}>Três gerações, uma travessia</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 60 }}>
          {pessoas.map(function(p, i) { return (
            <FadeIn key={i}>
              <div style={{ borderTop: "1px solid " + COLORS.dourado, paddingTop: 32 }}>
                <MonogramL size={60} color={COLORS.caramelo}/>
                <div style={{ marginTop: 20, marginBottom: 6, fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.2em", color: COLORS.caramelo }}>{p.gen}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: COLORS.torra, marginBottom: 4 }}>{p.nome}</h3>
                {p.anos && <div style={{ fontSize: 13, color: COLORS.caramelo, marginBottom: 16, fontStyle: "italic" }}>{p.anos}</div>}
                <p style={{ fontFamily: "'Lora', serif", fontSize: 15, lineHeight: 1.85, color: COLORS.caramelo, marginTop: 16 }}>{p.texto}</p>
              </div>
            </FadeIn>
          ); })}
        </div>
        <FadeIn style={{ textAlign: "center", marginTop: 80 }}>
          <div className="gold-line"/>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 22, color: COLORS.caramelo, margin: "32px 0" }}>E o avô Rico está em cada café que sai daqui.</p>
          <button className="btn-text" style={{ color: COLORS.caramelo, borderBottomColor: COLORS.caramelo }} onClick={function() { nav("casa"); }}>A história completa</button>
        </FadeIn>
      </div>
    </section>
  );
}
 
function Blends({ nav }) {
  var cafes = [
    { id: "blend-original", nome: "Casa Original", torra: "TORRA ESCURA", uso: "Para espresso e\ncafeteira italiana", notas: "chocolate amargo . caramelo escuro . corpo cheio", frase: "O café que o Rico tomava de manhã. Forte, presente, direto.", accent: COLORS.caramelo },
    { id: "blend-equilibrio", nome: "Casa Equilíbrio", torra: "TORRA MÉDIA", uso: "Versátil para\nqualquer método", notas: "caramelo . frutas vermelhas suaves . doçura presente", frase: "O café da casa cheia. Funciona para todos.", accent: COLORS.dourado },
    { id: "blend-horizonte", nome: "Casa Horizonte", torra: "TORRA CLARA", uso: "Para métodos\nmanuais", notas: "frutas frescas . florais . acidez cítrica viva", frase: "Para quem entrou no café e não quer mais sair.", accent: COLORS.latao }
  ];
  return (
    <section className="sec-light pad-sec">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 80 }}>
          <span className="descriptor" style={{ color: COLORS.caramelo }}>NOSSOS CAFÉS</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px,5vw,58px)", color: COLORS.torra }}>Três cafés. Três torras. Uma casa.</h2>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 16, color: COLORS.torra, opacity: 0.6, marginTop: 16 }}>R$ 49 (250g) · R$ 90 (500g) · Assine por R$ 44/mês (250g) ou R$ 81/mês (500g)</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 32 }}>
          {cafes.map(function(b, i) { return (
            <FadeIn key={i}>
              <div className="blend-card" onClick={function() { nav(b.id); }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
                  <SacoBlend blend={b} gram="250g" moagem=""/>
                </div>
                <div style={{ width: 40, height: 0.5, background: b.accent, marginBottom: 20, opacity: 0.6 }}/>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.2em", color: b.accent, marginBottom: 8 }}>{b.torra}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: COLORS.torra, marginBottom: 12 }}>{b.nome}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 17, color: COLORS.torra, lineHeight: 1.6, marginBottom: 20, opacity: 0.75 }}>{b.frase}</p>
                <button className="btn-text" style={{ color: b.accent, borderBottomColor: b.accent, fontSize: 15 }}>Escolher este café</button>
              </div>
            </FadeIn>
          ); })}
        </div>
      </div>
    </section>
  );
}
 
function ReservaRicoHome({ nav }) {
  return (
    <section className="sec-deep pad-sec" style={{ textAlign: "center" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FadeIn><RicoPortrait size={160}/></FadeIn>
        <FadeIn>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.3em", color: COLORS.latao, marginTop: 32, marginBottom: 24 }}>RESERVA RICO</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(36px,5vw,62px)", color: COLORS.creme, marginBottom: 32 }}>Uma homenagem em cada lote</h2>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 17, lineHeight: 1.95, color: COLORS.creme, opacity: 0.8, marginBottom: 24 }}>Microlotes especiais feitos com um blend especial, em homenagem ao avô Menahem. Edição limitada, numerada à mão.</p>
          <div style={{ background: COLORS.latao + "15", border: "0.5px solid " + COLORS.latao + "50", padding: "20px 32px", marginBottom: 40, display: "inline-block" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 18, color: COLORS.latao }}>Assinantes têm acesso antecipado e ganham um lote após 6 meses</p>
          </div>
          <br/>
          <button className="btn-latao" onClick={function() { nav("reserva"); }}>Conhecer a Reserva</button>
        </FadeIn>
      </div>
    </section>
  );
}
 
function Cartilha({ nav }) {
  var artigos = [
    { titulo: "A diferença entre torras", desc: "Por que o mesmo grão é outro café conforme a torra" },
    { titulo: "Espresso ou coado: qual é o seu?", desc: "Um guia honesto para descobrir seu método" },
    { titulo: "Como o Renato faz o coado de manhã", desc: "A receita da casa" },
    { titulo: "Era do Rico essa mania de cardamomo no café", desc: "A herança egípcia que você pode tentar" }
  ];
  return (
    <section className="sec-light pad-sec">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 80, alignItems: "center" }}>
          <FadeIn style={{ display: "flex", justifyContent: "center" }}><CupSVG/></FadeIn>
          <FadeIn>
            <span className="descriptor" style={{ color: COLORS.caramelo }}>A CARTILHA DA CASA</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px,4vw,50px)", color: COLORS.torra, marginBottom: 24 }}>Não vendemos café.<br/><em>Ensinamos.</em></h2>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 15, lineHeight: 1.9, color: COLORS.torra, opacity: 0.7, marginBottom: 40 }}>Cada café, cada caixa, cada e-mail vem com a Cartilha.</p>
            <div style={{ marginBottom: 40 }}>
              {artigos.map(function(a, i) { return (
                <div key={i} style={{ borderBottom: "0.5px solid rgba(139,94,60,0.2)", padding: "16px 0" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: COLORS.torra, marginBottom: 4 }}>{a.titulo}</div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo }}>{a.desc}</div>
                </div>
              ); })}
            </div>
            <button className="btn-text" style={{ color: COLORS.caramelo, borderBottomColor: COLORS.caramelo }} onClick={function() { nav("cartilha"); }}>Acessar a Cartilha</button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
 
function ComoChega() {
  var passos = [
    { n: "01", titulo: "Escolhe o café", desc: "Navega, se apaixona, escolhe a gramatura e a moagem. Compra avulso ou assina com 10% de desconto." },
    { n: "02", titulo: "Renato torra", desc: "Toda semana, em pequenos lotes. Café fresco, nunca estoque velho." },
    { n: "03", titulo: "A casa embala", desc: "Cada caixa vem com o café, a Cartilha do mês, e um cartão escrito à mão." },
    { n: "04", titulo: "Chega a tempo do ritual", desc: "Frete rápido para todo o Brasil. Após 6 meses de assinatura, assinantes recebem a Reserva Rico." }
  ];
  return (
    <section className="sec-light pad-sec">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 80 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,4vw,52px)", color: COLORS.torra }}>Como o café chega até você</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 48 }}>
          {passos.map(function(p, i) { return (
            <FadeIn key={i}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 72, color: COLORS.dourado, opacity: 0.3, lineHeight: 1, marginBottom: 16 }}>{p.n}</div>
                <div style={{ width: 40, height: 0.5, background: COLORS.dourado, marginBottom: 16, opacity: 0.5 }}/>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: COLORS.torra, marginBottom: 12 }}>{p.titulo}</h3>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 15, color: COLORS.caramelo, lineHeight: 1.8 }}>{p.desc}</p>
              </div>
            </FadeIn>
          ); })}
        </div>
      </div>
    </section>
  );
}
 
function Depoimentos() {
  var deps = [
    { texto: "Comecei a entender de café depois de assinar. A Cartilha sozinha já valeria a mensalidade, mas o café é melhor ainda.", autor: "Marina S.", cidade: "Rio de Janeiro" },
    { texto: "O Casa Original me lembrou o café que meu pai fazia. Não sei como, mas é exatamente aquilo. Já presenteei três pessoas.", autor: "Roberto T.", cidade: "São Paulo" },
    { texto: "A Reserva Rico que veio na assinatura foi outra coisa. Cada caixa é uma surpresa. Vale cada centavo.", autor: "Camila L.", cidade: "Niterói" }
  ];
  return (
    <section className="sec-dark pad-sec">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 80 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,4vw,52px)", color: COLORS.creme }}>O que a casa anda dizendo</h2>
        </FadeIn>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {deps.map(function(d, i) { return (
            <FadeIn key={i} style={{ flex: "1 1 260px" }}>
              <div className="dep-card">
                <span className="testi-quote">"</span>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 18, lineHeight: 1.75, color: COLORS.creme, marginBottom: 28 }}>{d.texto}</p>
                <div style={{ width: 30, height: 0.5, background: COLORS.dourado, marginBottom: 16, opacity: 0.5 }}/>
                <div style={{ fontFamily: "'Lora', serif", fontSize: 14, color: COLORS.dourado }}>{d.autor}</div>
                <div style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.creme, opacity: 0.5 }}>{d.cidade}</div>
              </div>
            </FadeIn>
          ); })}
        </div>
      </div>
    </section>
  );
}
 
function FAQSection() {
  return (
    <section className="sec-light pad-sec">
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="descriptor" style={{ color: COLORS.caramelo }}>PERGUNTAS FREQUENTES</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,4vw,52px)", color: COLORS.torra }}>A casa responde</h2>
        </FadeIn>
        <FAQ/>
      </div>
    </section>
  );
}
 
function Footer({ nav, openModal }) {
  return (
    <footer className="sec-cacau" style={{ padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 60, marginBottom: 64 }}>
          <div>
            <MonogramL size={50}/>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, letterSpacing: "0.35em", color: COLORS.creme, marginTop: 16, marginBottom: 4 }}>CASA LEVY</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 12, color: COLORS.dourado, letterSpacing: "0.2em", marginBottom: 16 }}>Três gerações de café</div>
            <div style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.creme, opacity: 0.5 }}>Rio de Janeiro, Brasil</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.2em", color: COLORS.dourado, marginBottom: 24 }}>NAVEGAÇÃO</div>
            {["Nossos Cafés","Reserva Rico","Utensílios","A Cartilha","A Casa"].map(function(l, i) { return (
              <div key={i} style={{ marginBottom: 12 }}>
                <button onClick={function() { nav(["blend-original","reserva","utensilios","cartilha","casa"][i]); }} style={{ fontFamily: "'Lora', serif", fontSize: 14, color: COLORS.creme, opacity: 0.7, background: "none", border: "none", cursor: "pointer", padding: 0 }}>{l}</button>
              </div>
            ); })}
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.2em", color: COLORS.dourado, marginBottom: 24 }}>AJUDA</div>
            {["Como funciona a assinatura","Frete e entrega","Trocas e devoluções","Fale com a casa","FAQ"].map(function(l, i) { return (
              <div key={i} style={{ marginBottom: 12 }}>
                <span style={{ fontFamily: "'Lora', serif", fontSize: 14, color: COLORS.creme, opacity: 0.5 }}>{l}</span>
              </div>
            ); })}
            <div style={{ marginTop: 24, padding: "16px", border: "0.5px solid " + COLORS.latao + "40" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em", color: COLORS.latao, marginBottom: 8 }}>O CLUBE</div>
              <button onClick={function() { nav("clube"); }} style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.creme, opacity: 0.7, background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 1.6 }}>Como funciona a assinatura e os benefícios exclusivos</button>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.2em", color: COLORS.dourado, marginBottom: 24 }}>A CASA EM SUA CAIXA</div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 14, color: COLORS.creme, opacity: 0.7, lineHeight: 1.7, marginBottom: 20 }}>Receba a Cartilha mensal e novidades da casa.</p>
            <input placeholder="seu@email.com" style={{ width: "100%", background: "transparent", border: "0.5px solid " + COLORS.dourado, borderRadius: 0, padding: "12px 16px", fontFamily: "'Lora', serif", fontSize: 14, color: COLORS.creme, marginBottom: 12, outline: "none" }}/>
            <button className="btn-secondary" style={{ width: "100%", textAlign: "center" }} onClick={function() { openModal("newsletter"); }}>Assinar a Cartilha</button>
          </div>
        </div>
        <div style={{ height: 0.5, background: COLORS.dourado, opacity: 0.3, marginBottom: 32 }}/>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 12, color: COLORS.creme, opacity: 0.4 }}>2026 Casa Levy — Em memória de Menahem (Rico) Levy — 1938 — 2024</p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Política de privacidade","Termos","Instagram"].map(function(l, i) { return (
              <span key={i} style={{ fontFamily: "'Lora', serif", fontSize: 12, color: COLORS.creme, opacity: 0.4 }}>{l}</span>
            ); })}
          </div>
        </div>
      </div>
    </footer>
  );
}
 
function PageBlend({ blendId: initialBlendId, nav, openModal }) {
  var blendsData = {
    "blend-original": { nome: "Casa Original", torra: "TORRA ESCURA", uso: "Para espresso e\ncafeteira italiana", frase: "O café que o Rico tomava de manhã. Forte, presente, direto.", notas: "chocolate amargo . caramelo escuro . corpo cheio", accent: COLORS.caramelo, historia: "O Original nasce da memória de Menahem. Uma torra escura, desenvolvida, que extrai o melhor dos grãos do Cerrado e da Mogiana.", metodos: [{ nome: "Espresso", proporcao: "1:2 (18g para 36ml)", tempo: "25-30s" },{ nome: "Cafeteira italiana", proporcao: "Moído médio-fino", tempo: "4-5 min" },{ nome: "Moka", proporcao: "Água fria, fogo médio", tempo: "6-7 min" }] },
    "blend-equilibrio": { nome: "Casa Equilíbrio", torra: "TORRA MÉDIA", uso: "Versátil para\nqualquer método", frase: "O café da casa cheia. Funciona para todos.", notas: "caramelo . frutas vermelhas suaves . doçura presente", accent: COLORS.dourado, historia: "O Equilíbrio é o café para quando tem visita. Uma torra média que respeita a doçura natural dos grãos.", metodos: [{ nome: "Espresso", proporcao: "1:2.5 (17g para 42ml)", tempo: "27s" },{ nome: "Coado (V60)", proporcao: "1:15 (15g para 225ml)", tempo: "3 min" },{ nome: "French press", proporcao: "1:14 (15g para 210ml)", tempo: "4 min" }] },
    "blend-horizonte": { nome: "Casa Horizonte", torra: "TORRA CLARA", uso: "Para métodos\nmanuais", frase: "Para quem entrou no café e não quer mais sair.", notas: "frutas frescas . florais . acidez cítrica viva", accent: COLORS.latao, historia: "O Horizonte é pra quem foi além. A torra clara guarda o que o grão tem de mais vivo.", metodos: [{ nome: "V60 / Coado", proporcao: "1:16 (14g para 224ml)", tempo: "3:30 min" },{ nome: "Chemex", proporcao: "1:15 (20g para 300ml)", tempo: "4 min" },{ nome: "Aeropress", proporcao: "1:12 (15g para 180ml)", tempo: "2 min" }] }
  };
  const [blendId, setBlendId] = useState(initialBlendId || "blend-original");
  const [gram, setGram] = useState("250g");
  var b = blendsData[blendId];
  return (
    <div className="cl-site sec-light" style={{ paddingTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        <button onClick={function() { nav("home"); }} style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo, background: "none", border: "none", cursor: "pointer", marginBottom: 32, opacity: 0.7 }}>Voltar</button>
        <div style={{ display: "flex", gap: 0, marginBottom: 48, flexWrap: "wrap" }}>
          {Object.keys(blendsData).map(function(id) {
            var bd = blendsData[id];
            return (
              <button key={id} onClick={function() { setBlendId(id); setGram("250g"); }} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.08em", padding: "10px 16px", background: blendId === id ? bd.accent + "20" : "transparent", border: "0.5px solid " + (blendId === id ? bd.accent : "rgba(139,94,60,0.25)"), borderRight: id !== "blend-horizonte" ? "none" : "0.5px solid " + (blendId === id ? bd.accent : "rgba(139,94,60,0.25)"), color: COLORS.torra, cursor: "pointer", transition: "all 0.25s", fontStyle: blendId === id ? "italic" : "normal" }}>
                {bd.nome.replace("Casa ","")}
              </button>
            );
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <SacoBlend blend={b} gram={gram} moagem=""/>
            <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: COLORS.caramelo, textAlign: "center", opacity: 0.7 }}>
              {gram === "250g" ? "R$ 49 avulso · R$ 44/mês assinando" : "R$ 90 avulso · R$ 81/mês assinando"}
            </div>
          </div>
          <div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.2em", color: b.accent }}>{b.torra}</span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,64px)", color: COLORS.torra, margin: "12px 0" }}>{b.nome}</h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 19, color: COLORS.torra, marginBottom: 24, lineHeight: 1.6, opacity: 0.75 }}>{b.frase}</p>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 14, color: COLORS.caramelo, marginBottom: 8 }}>{b.notas}</p>
            <BuyBox blend={b} blendId={blendId} openModal={openModal}/>
          </div>
        </div>
        <div style={{ marginTop: 80, borderTop: "0.5px solid rgba(139,94,60,0.2)", paddingTop: 48, marginBottom: 48 }}>
          <span className="descriptor" style={{ color: COLORS.caramelo }}>COMO PREPARAR</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 20, marginTop: 28 }}>
            {b.metodos.map(function(m, i) { return (
              <div key={i} style={{ border: "0.5px solid rgba(139,94,60,0.2)", padding: "24px 20px" }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: COLORS.torra, marginBottom: 12 }}>{m.nome}</h4>
                <div style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo, marginBottom: 6 }}>{m.proporcao}</div>
                <div style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo, opacity: 0.7 }}>{m.tempo}</div>
              </div>
            ); })}
          </div>
        </div>
        <div style={{ maxWidth: 640 }}>
          <span className="descriptor" style={{ color: COLORS.caramelo }}>A HISTÓRIA DESTE CAFÉ</span>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 16, lineHeight: 1.9, color: COLORS.torra, opacity: 0.75, marginTop: 24 }}>{b.historia}</p>
        </div>
      </div>
    </div>
  );
}
 
function PageClube({ nav }) {
  var steps = [
    { n: "01", titulo: "Escolhe seu café", desc: "Vai na página do café, escolhe a gramatura e a moagem. Clica em Assinar." },
    { n: "02", titulo: "Recebe todo mês", desc: "Café fresco, torrado na semana, embalado com a Cartilha do mês e um cartão da casa." },
    { n: "03", titulo: "10% de desconto sempre", desc: "R$ 49 vira R$ 44. R$ 90 vira R$ 81. O desconto é automático, todo mês." },
    { n: "04", titulo: "Reserva Rico após 6 meses", desc: "Quem completa 6 meses recebe um lote da Reserva Rico escolhido pelo Renato. Um presente da casa." },
    { n: "05", titulo: "Acesso antecipado à Reserva Rico", desc: "Quando um novo lote sai, assinantes sabem primeiro e podem garantir o seu antes do público geral." },
    { n: "06", titulo: "Sem fidelidade", desc: "Pause, mude o café, mude a gramatura, cancele. Sem taxa, sem motivo, a qualquer momento." }
  ];
  return (
    <div className="cl-site sec-light" style={{ paddingTop: 80 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px" }}>
        <button onClick={function() { nav("home"); }} style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo, background: "none", border: "none", cursor: "pointer", marginBottom: 40, opacity: 0.7 }}>Voltar</button>
        <span className="descriptor" style={{ color: COLORS.caramelo }}>COMO FUNCIONA</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px,6vw,68px)", color: COLORS.torra, marginBottom: 24 }}>A assinatura<br/><em>Casa Levy</em></h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 17, lineHeight: 1.9, color: COLORS.torra, opacity: 0.75, marginBottom: 48 }}>Você escolhe o café que ama, a gramatura e a moagem, e ele chega todo mês com 10% de desconto.</p>
        {steps.map(function(p, i) { return (
          <div key={i} style={{ display: "flex", gap: 28, marginBottom: 40, paddingBottom: 40, borderBottom: i < 5 ? "0.5px solid rgba(139,94,60,0.15)" : "none" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, color: COLORS.dourado, opacity: 0.4, lineHeight: 1, flexShrink: 0, width: 48 }}>{p.n}</div>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: COLORS.torra, marginBottom: 8 }}>{p.titulo}</h3>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 15, color: COLORS.caramelo, lineHeight: 1.8 }}>{p.desc}</p>
            </div>
          </div>
        ); })}
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button className="btn-primary" onClick={function() { nav("blend-original"); }}>Escolher meu café</button>
        </div>
      </div>
    </div>
  );
}
 
function PageReserva({ nav, openModal }) {
  var lotes = [
    { nome: "Reserva Alexandria", sub: "A cidade onde tudo começou", notas: "chocolate amargo . especiarias . cardamomo", torra: "TORRA ESCURA", historia: "Em homenagem à Alexandria onde Menahem nasceu, ao café árabe servido em xícaras pequenas, ao cardamomo que ele nunca esqueceu." },
    { nome: "Reserva Paris", sub: "O exílio que formou o homem", notas: "caramelo . avelã . elegância europeia", torra: "TORRA MÉDIA", historia: "Pela França o Rico passou antes de escolher o Brasil. Paris foi o intervalo entre o que ele perdeu e o que ainda construiria." },
    { nome: "Reserva Rio", sub: "A pátria que ele escolheu", notas: "frutas tropicais . caju . mel", torra: "TORRA CLARA", historia: "O Rio foi onde o Rico fincou raízes, criou família e construiu tudo." }
  ];
  return (
    <div className="cl-site" style={{ paddingTop: 80 }}>
      <section style={{ background: "#1A0E0A", padding: "80px 24px", textAlign: "center" }}>
        <button onClick={function() { nav("home"); }} style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.creme, background: "none", border: "none", cursor: "pointer", marginBottom: 40, opacity: 0.5 }}>Voltar</button>
        <RicoPortrait size={180}/>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.35em", color: COLORS.latao, margin: "24px 0 16px" }}>RESERVA RICO</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(40px,6vw,72px)", color: COLORS.creme, marginBottom: 24 }}>Uma homenagem em cada lote</h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 17, lineHeight: 1.9, color: COLORS.creme, opacity: 0.75, maxWidth: 600, margin: "0 auto 24px" }}>Um blend especial em microlotes numerados à mão. Disponível avulso por R$ 99. Assinantes têm acesso antecipado e após 6 meses recebem um lote de presente.</p>
        <div style={{ display: "inline-block", background: COLORS.latao + "15", border: "0.5px solid " + COLORS.latao + "50", padding: "14px 32px", marginBottom: 40 }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 17, color: COLORS.latao }}>Assinantes têm acesso antecipado e ganham um lote após 6 meses</p>
        </div>
        <br/>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-latao" onClick={function() { openModal("a Reserva Rico"); }}>Comprar avulso — R$ 99</button>
          <button className="btn-secondary" onClick={function() { nav("blend-original"); }}>Assinar e receber de surpresa</button>
        </div>
      </section>
      <section style={{ background: COLORS.torra, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="descriptor">LOTES ATUAIS</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: COLORS.creme }}>Edições disponíveis</h2>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 15, color: COLORS.creme, opacity: 0.5, marginTop: 12 }}>R$ 99 — 150g — Numerado à mão</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 32 }}>
            {lotes.map(function(l, i) { return (
              <div key={i} style={{ background: "#1A0E0A", border: "1px solid " + COLORS.latao + "30", padding: "48px 36px" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
                  <SacoBlend isReserva={true} loteNome={l.nome} loteNotas={l.notas} gram="250g" moagem=""/>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: COLORS.creme, marginBottom: 4 }}>{l.nome}</h3>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 15, color: COLORS.latao, marginBottom: 8, opacity: 0.8 }}>{l.sub}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.15em", color: COLORS.latao, opacity: 0.7, marginBottom: 16 }}>{l.torra}</div>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.creme, opacity: 0.5, lineHeight: 1.7, marginBottom: 24 }}>{l.historia}</p>
                <div style={{ height: "0.5px", background: COLORS.latao, opacity: 0.3, marginBottom: 20 }}/>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: COLORS.latao }}>R$ 99 (150g)</span>
                  <button className="btn-latao" style={{ padding: "10px 24px", fontSize: 12 }} onClick={function() {
                    var url = getReservaUrl(l.nome);
                    if (url) { window.open(url, "_blank"); } else { openModal(l.nome); }
                  }}>Comprar</button>
                </div>
              </div>
            ); })}
          </div>
        </div>
      </section>
      <Footer nav={nav} openModal={openModal}/>
    </div>
  );
}
 
function PageCasa({ nav }) {
  return (
    <div className="cl-site sec-light" style={{ paddingTop: 80 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px" }}>
        <button onClick={function() { nav("home"); }} style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo, background: "none", border: "none", cursor: "pointer", marginBottom: 40, opacity: 0.7 }}>Voltar</button>
        <span className="descriptor" style={{ color: COLORS.caramelo }}>A CASA</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px,6vw,72px)", color: COLORS.torra, marginBottom: 48, lineHeight: 1.1 }}>Três gerações,<br/><em>uma travessia.</em></h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 17, lineHeight: 1.95, color: COLORS.torra, opacity: 0.75, marginBottom: 32 }}>Tudo começa no Egito de 1938. Menahem Levy nasce em Alexandria, uma cidade onde diferentes culturas se cruzavam e o café era ritualístico, árabe, forte, com cardamomo, servido em xícaras pequenas como sinal de hospitalidade.</p>
        <div style={{ borderLeft: "2px solid " + COLORS.dourado, paddingLeft: 32, margin: "48px 0" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 22, color: COLORS.caramelo }}>O Rico não bebia café. Ele recebia as pessoas com café. Era diferente.</div>
          <div style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo, opacity: 0.6, marginTop: 12 }}>Paulo Chut</div>
        </div>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 17, lineHeight: 1.95, color: COLORS.torra, opacity: 0.75, marginBottom: 32 }}>Com a perseguição aos judeus no Egito, Menahem perde tudo. Passa pela França. Chega ao Brasil com as referências que nenhum exílio consegue tirar: o paladar, a hospitalidade, e a convicção de que café é gesto de presença.</p>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 17, lineHeight: 1.95, color: COLORS.torra, opacity: 0.75, marginBottom: 32 }}>No Brasil, Rico vira exportador de café. Operador do mercado. Pioneiro em trazer o espresso italiano para bares e restaurantes brasileiros. Monta torrefação. Constrói uma carreira inteira ao redor do café.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, margin: "64px 0", textAlign: "center" }}>
          {[["1938","Nasce em Alexandria"],["Anos 1950","Chega ao Brasil"],["Anos 1980","Pioneiro do espresso"],["2026","Casa Levy"]].map(function(item, i) { return (
            <div key={i}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: COLORS.dourado, marginBottom: 8 }}>{item[0]}</div>
              <div style={{ width: "100%", height: "0.5px", background: COLORS.dourado, opacity: 0.3, marginBottom: 12 }}/>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo, opacity: 0.7 }}>{item[1]}</div>
            </div>
          ); })}
        </div>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 17, lineHeight: 1.95, color: COLORS.torra, opacity: 0.75 }}>A Casa Levy é o que acontece quando as gerações se encontram numa paixão. O Renato, coração e cara da casa, com o ofício e o paladar herdados do pai. E o Paulo Chut, que toma café em quantidade absurda e ainda acha que a próxima xícara vai ser a melhor.</p>
      </div>
    </div>
  );
}
 
function PageCartilha({ nav }) {
  var niveis = ["Está começando","Já entendeu","Quer ir fundo"];
  const [ativo, setAtivo] = useState(0);
  const [artigoAberto, setArtigoAberto] = useState(null);
  var artigos = [
    [
      { titulo: "O que é café especial?", desc: "A diferença entre o que você toma e o que você poderia tomar", tempo: "4 min", conteudo: "Café especial é uma classificação técnica, não um rótulo de marketing. Para receber essa denominação, um café precisa atingir no mínimo 80 pontos em uma escala de 100 definida pela Specialty Coffee Association (SCA). A avaliação é feita por profissionais certificados chamados Q-graders, que analisam atributos como aroma, acidez, corpo, doçura, equilíbrio e ausência de defeitos.\n\nO que diferencia um café especial do café comum começa antes da torra, na fazenda. Grãos especiais são colhidos seletivamente, no ponto exato de maturação.\n\nNa Casa Levy, todos os cafés são compostos exclusivamente por grãos com pontuação acima de 80 pontos. A Reserva Rico vai além, com microlotes que alcançam pontuações acima de 85." },
      { titulo: "A diferença entre torras", desc: "Por que o mesmo grão é outro café conforme a torra", tempo: "5 min", conteudo: "A torra é uma das etapas mais decisivas na cadeia do café. É ela que transforma os compostos químicos do grão verde em aroma, sabor e corpo.\n\nTorra clara preserva mais acidez, florais e frutas. É a preferida para métodos de coado manual.\n\nTorra média equilibra acidez e doçura. Funciona bem em espresso e em coado.\n\nTorra escura leva o grão além do segundo crack. A acidez cede espaço ao amargor controlado, ao corpo denso e ao caramelo. É a torra clássica do espresso italiano.\n\nNão existe torra melhor ou pior. Existe torra adequada ao método e ao paladar de cada pessoa." },
      { titulo: "Como fazer um coado decente", desc: "Com o que você já tem em casa", tempo: "3 min", conteudo: "Você não precisa de equipamento especial para fazer um coado bom. Precisa de três coisas: café fresco, água quente na temperatura certa e atenção ao processo.\n\nTemperatura da água: o ideal é entre 90°C e 96°C. Se não tiver termômetro, ferva a água e aguarde 30 segundos antes de usar.\n\nProporção: 1 grama de café para cada 15 ml de água. Para uma xícara de 200 ml, use cerca de 13 gramas de café.\n\nO processo: umedeça o filtro com água quente. Despeje a primeira quantidade de água e aguarde 30 segundos. Esse é o bloom. Depois, despeje o restante da água em movimentos circulares lentos.\n\nTempo total: entre 3 e 4 minutos." }
    ],
    [
      { titulo: "Espresso ou coado: qual é o seu?", desc: "Um guia honesto para descobrir seu método", tempo: "6 min", conteudo: "A escolha entre espresso e coado não é questão de gosto apenas. Envolve estilo de vida, equipamento disponível e o que você espera da bebida.\n\nO espresso é uma extração sob pressão, entre 8 e 10 bar, em 25 a 30 segundos. O resultado é concentrado, com crema, corpo denso e intensidade elevada.\n\nPara fazer espresso em casa com qualidade, você precisa de uma máquina com bomba de pressão adequada e de um moedor capaz de ajuste fino.\n\nO coado é uma extração por percolação. A água passa pelo café por gravidade, sem pressão. O resultado é uma bebida mais clara, com acidez mais evidente e complexidade aromática.\n\nSe você aprecia a intensidade, o espresso é seu método. Se você gosta de explorar nuances e tem paciência para o processo, o coado vai surpreender." },
      { titulo: "Moagem: o fator que mais importa", desc: "Por que o moedor importa mais que a máquina", tempo: "7 min", conteudo: "No mundo do café, há um consenso entre profissionais: o moedor é o equipamento mais importante da sua bancada.\n\nO motivo é técnico. A extração do café depende da superfície de contato entre o pó e a água. Grãos moídos de forma irregular extraem de forma desigual, resultando em um café desequilibrado.\n\nUm bom moedor produz partículas uniformes, garantindo equilíbrio e clareza na xícara.\n\nMoedores de disco cônico são superiores aos de lâmina. Para coado, um moedor manual cônico de qualidade já entrega resultados excelentes. Para espresso, o investimento precisa ser maior.\n\nSe você usa café pré-moído, saiba que o processo de oxidação começa imediatamente após a moagem. Moer na hora é a diferença entre um café vivo e um café plano." },
      { titulo: "Como o Renato faz o coado de manhã", desc: "A receita da casa, com notas de cada etapa", tempo: "4 min", conteudo: "Renato torra café toda semana e bebe café todo dia. A receita que ele usa de manhã não é sofisticada. É consistente.\n\nEquipamento: coador de cerâmica V60, filtro de papel branqueado, chaleira de bico fino, balança e termômetro.\n\nCafé: Casa Equilíbrio, moído na hora em moagem média. 15 gramas para 225 ml de água.\n\nTemperatura da água: 93°C. Renato ferve a água e aguarda 45 segundos antes de usar.\n\nBloom: 30 ml de água, aguarda 35 segundos. O café fresco libera CO2 nesse momento.\n\nExtração principal: despeja o restante em movimentos circulares lentos.\n\nTempo total: 3 minutos e 20 segundos. Renato bebe sem açúcar." }
    ],
    [
      { titulo: "Processamentos: natural, lavado e honey", desc: "Como o processamento na fazenda cria sabores diferentes", tempo: "8 min", conteudo: "O processamento é a etapa entre a colheita do fruto do café e a obtenção do grão seco. É uma das variáveis que mais impacta o perfil sensorial da bebida.\n\nO processamento natural é o mais antigo. O fruto inteiro é seco ao sol. Os açúcares da polpa fermentam e são absorvidos pelo grão, resultando em perfis com notas de frutas tropicais e corpo elevado.\n\nO processamento lavado remove a polpa do grão antes da secagem. O resultado é um café mais limpo, com acidez mais evidente.\n\nO processamento honey mantém parte da mucilagem sobre o grão durante a secagem. A quantidade preservada define subtipos como yellow, red e black honey, em ordem crescente de doçura.\n\nEntender o processamento ajuda a antecipar o perfil da bebida. Natural aponta para frutas. Lavado aponta para clareza. Honey aponta para equilíbrio." },
      { titulo: "Extraindo um espresso perfeito", desc: "Os parâmetros que você precisa entender", tempo: "10 min", conteudo: "O espresso é o método com menor margem de erro. Entender as variáveis é o primeiro passo para extrações consistentes.\n\nDose: entre 16 e 20 gramas no portafiltro. Determina a resistência que o café oferece à passagem da água.\n\nYield: a proporção de extração, normalmente 1:2, ou seja, 18 gramas de café para 36 gramas de líquido.\n\nTempo de extração: entre 25 e 30 segundos. Abaixo de 20 segundos, subextraído. Acima de 35, superextraído.\n\nMoagem: a principal variável de ajuste. Mais fina aumenta a resistência. Mais grossa reduz.\n\nTemperatura: entre 90°C e 96°C. Torras escuras extraem melhor em temperaturas menores.\n\nO espresso perfeito existe como equilíbrio entre acidez, doçura e amargor, ajustado ao paladar de quem bebe." },
      { titulo: "Era do Rico essa mania de cardamomo no café", desc: "A herança egípcia e o que ela tem a ensinar", tempo: "5 min", conteudo: "Na Alexandria dos anos 1940, o café não era bebido sozinho. Era servido com cardamomo, às vezes com água de rosas, sempre em xícaras pequenas. Era o café árabe, o qahwa.\n\nMenahem Levy cresceu nesse ritual. Quando chegou ao Brasil, trouxe o hábito. O cardamomo aparecia na sua xícara em dias específicos, pela memória do que tinha sido normal para ele.\n\nO cardamomo pertence à família do gengibre. No café, ele adiciona notas cítricas e levemente mentoladas, que contrabalançam a amargura e ampliam a percepção de doçura.\n\nA técnica mais comum é adicionar uma ou duas sementes levemente amassadas ao pó antes da extração.\n\nNão é uma preparação para todo dia. Mas é uma preparação que conta uma história." }
    ]
  ];
 
  if (artigoAberto) {
    return (
      <div className="cl-site sec-light" style={{ paddingTop: 80 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px" }}>
          <button onClick={function() { setArtigoAberto(null); }} style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo, background: "none", border: "none", cursor: "pointer", marginBottom: 40, opacity: 0.7 }}>Voltar para a Cartilha</button>
          <div style={{ fontFamily: "'Lora', serif", fontSize: 11, letterSpacing: "0.15em", color: COLORS.dourado, marginBottom: 24 }}>{niveis[ativo].toUpperCase()} — {artigoAberto.tempo} de leitura</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,52px)", color: COLORS.torra, marginBottom: 16, lineHeight: 1.2 }}>{artigoAberto.titulo}</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 18, color: COLORS.caramelo, marginBottom: 48, lineHeight: 1.6 }}>{artigoAberto.desc}</p>
          <div style={{ height: "0.5px", background: COLORS.dourado, opacity: 0.3, marginBottom: 48 }}/>
          {artigoAberto.conteudo.split("\n\n").map(function(p, i) { return (
            <p key={i} style={{ fontFamily: "'Lora', serif", fontSize: 16, lineHeight: 1.95, color: COLORS.torra, opacity: 0.8, marginBottom: 28 }}>{p}</p>
          ); })}
          <div style={{ height: "0.5px", background: COLORS.dourado, opacity: 0.3, margin: "48px 0 32px" }}/>
          <button onClick={function() { setArtigoAberto(null); }} style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: COLORS.caramelo, background: "none", border: "none", cursor: "pointer", borderBottom: "0.5px solid " + COLORS.caramelo }}>Voltar para a Cartilha</button>
        </div>
      </div>
    );
  }
 
  return (
    <div className="cl-site sec-light" style={{ paddingTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <button onClick={function() { nav("home"); }} style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo, background: "none", border: "none", cursor: "pointer", marginBottom: 40, opacity: 0.7 }}>Voltar</button>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="descriptor" style={{ color: COLORS.caramelo }}>A CARTILHA DA CASA</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px,6vw,72px)", color: COLORS.torra }}>Não vendemos café.<br/><em>Ensinamos.</em></h1>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 64, flexWrap: "wrap" }}>
          {niveis.map(function(n, i) { return (
            <button key={i} onClick={function() { setAtivo(i); }} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.08em", padding: "10px 16px", background: "none", cursor: "pointer", border: "0.5px solid " + COLORS.dourado, borderRight: i < 2 ? "none" : "0.5px solid " + COLORS.dourado, color: ativo === i ? COLORS.torra : COLORS.caramelo, backgroundColor: ativo === i ? COLORS.dourado + "30" : "transparent", transition: "all 0.3s" }}>{n}</button>
          ); })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 32 }}>
          {artigos[ativo].map(function(a, i) { return (
            <div key={i} style={{ border: "0.5px solid rgba(139,94,60,0.2)", padding: "40px 32px", background: "white" }}>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 11, letterSpacing: "0.15em", color: COLORS.dourado, marginBottom: 20 }}>{niveis[ativo].toUpperCase()} — {a.tempo} de leitura</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: COLORS.torra, marginBottom: 12 }}>{a.titulo}</h3>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 14, color: COLORS.caramelo, lineHeight: 1.7, marginBottom: 24 }}>{a.desc}</p>
              <button className="btn-text" style={{ color: COLORS.caramelo, borderBottomColor: COLORS.caramelo, fontSize: 14 }} onClick={function() { setArtigoAberto(a); }}>Ler</button>
            </div>
          ); })}
        </div>
      </div>
    </div>
  );
}
 
function PageUtensilios({ nav, openModal }) {
  return (
    <div className="cl-site sec-light" style={{ paddingTop: 80 }}>
      <div style={{ background: COLORS.cremeBg, padding: "80px 24px", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <button onClick={function() { nav("home"); }} style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo, background: "none", border: "none", cursor: "pointer", marginBottom: 60, opacity: 0.7, alignSelf: "flex-start" }}>Voltar</button>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <span className="descriptor" style={{ color: COLORS.caramelo }}>A LOJA</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px,6vw,68px)", color: COLORS.torra, marginBottom: 32 }}>Utensílios para o ritual</h1>
          <div style={{ width: 60, height: 0.5, background: COLORS.dourado, margin: "0 auto 40px", opacity: 0.5 }}/>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 17, lineHeight: 1.9, color: COLORS.torra, opacity: 0.7, marginBottom: 16 }}>Estamos fazendo a curadoria dos equipamentos certos, xícaras, balanças, chaleiras, moedores, máquinas de espresso e métodos manuais.</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 20, color: COLORS.caramelo, marginBottom: 48 }}>Só colocamos aqui o que a casa realmente usa e recomenda.</p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 14, color: COLORS.caramelo, opacity: 0.6, marginBottom: 40 }}>Em breve.</p>
          <button className="btn-secondary-dark" onClick={function() { openModal("aviso de novidades da loja"); }}>Me avisa quando chegar</button>
        </div>
      </div>
      <Footer nav={nav} openModal={openModal}/>
    </div>
  );
}
 
function Home({ nav, openModal }) {
  return (
    <>
      <Hero nav={nav}/>
      <Manifesto nav={nav}/>
      <Historia nav={nav}/>
      <Blends nav={nav}/>
      <ReservaRicoHome nav={nav}/>
      <Cartilha nav={nav}/>
      <ComoChega/>
      <Depoimentos/>
      <FAQSection/>
      <Footer nav={nav} openModal={openModal}/>
    </>
  );
}
 
export default function CasaLevy() {
  const [page, setPage] = useState("home");
  const [modal, setModal] = useState({ open: false, content: "" });
  const [menuOpen, setMenuOpen] = useState(false);
 
  useEffect(function() {
    var style = document.createElement("style");
    style.textContent = fonts + globalCSS;
    document.head.appendChild(style);
    return function() { document.head.removeChild(style); };
  }, []);
 
  useEffect(function() { window.scrollTo(0, 0); setMenuOpen(false); }, [page]);
 
  function nav(p) { setPage(p); }
  function openModal(content) { setModal({ open: true, content: content }); }
  function closeModal() { setModal({ open: false, content: "" }); }
 
  var navLinks = [
    { label: "Nossos Cafés", page: "blend-original" },
    { label: "Reserva Rico", page: "reserva" },
    { label: "Utensílios", page: "utensilios" },
    { label: "A Cartilha", page: "cartilha" },
    { label: "A Casa", page: "casa" }
  ];
 
  return (
    <div className="cl-site" style={{ minHeight: "100vh" }}>
      <nav className="sticky-nav">
        <button onClick={function() { nav("home"); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
          <MonogramL size={36} color={COLORS.dourado}/>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, letterSpacing: "0.35em", color: COLORS.creme }}>CASA LEVY</div>
        </button>
        <div className="nav-links">
          {navLinks.map(function(l, i) { return (
            <button key={i} className="nav-link" onClick={function() { nav(l.page); }}>{l.label}</button>
          ); })}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 12 }} onClick={function() { nav("blend-original"); }}>Escolher meu café</button>
          <button className="hamburger" onClick={function() { setMenuOpen(!menuOpen); }}>
            <div className="ham-line"/><div className="ham-line"/><div className="ham-line"/>
          </button>
        </div>
      </nav>
 
      {menuOpen && (
        <div className="mob-menu">
          <button onClick={function() { setMenuOpen(false); }} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", cursor: "pointer", color: COLORS.creme, fontFamily: "'Cormorant Garamond', serif", fontSize: 28 }}>x</button>
          {navLinks.map(function(l, i) { return (
            <button key={i} className="mob-link" onClick={function() { nav(l.page); }}>{l.label}</button>
          ); })}
        </div>
      )}
 
      {page === "home" && <Home nav={nav} openModal={openModal}/>}
      {page === "clube" && <PageClube nav={nav} openModal={openModal}/>}
      {(page === "blend-original" || page === "blend-equilibrio" || page === "blend-horizonte") && <PageBlend blendId={page} nav={nav} openModal={openModal}/>}
      {page === "reserva" && <PageReserva nav={nav} openModal={openModal}/>}
      {page === "casa" && <PageCasa nav={nav}/>}
      {page === "cartilha" && <PageCartilha nav={nav}/>}
      {page === "utensilios" && <PageUtensilios nav={nav} openModal={openModal}/>}
 
      {modal.open && <Modal content={modal.content} onClose={closeModal}/>}
    </div>
  );
}
 


