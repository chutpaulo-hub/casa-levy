import { useState, useEffect, useRef, createContext, useContext } from "react";

const COLORS = {
  torra: "#2B1810", cacau: "#3A2418", caramelo: "#8B5E3C",
  dourado: "#D4A574", latao: "#C9A961", creme: "#EFE4D2", cremeBg: "#F5EFE6"
};

const CartContext = createContext(null);
function useCart() { return useContext(CartContext); }

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function addItem(produto, torra, moagem) {
    var lineId = produto.id + "-" + torra + "-" + moagem;
    setItems(function(prev) {
      var existing = prev.find(function(i) { return i.lineId === lineId; });
      if (existing) {
        return prev.map(function(i) { return i.lineId === lineId ? Object.assign({}, i, { qty: i.qty + 1 }) : i; });
      }
      return prev.concat([{ lineId: lineId, produtoId: produto.id, nome: produto.nome, gram: produto.gram, preco: produto.preco, isReserva: produto.isReserva, torra: torra, moagem: moagem, qty: 1 }]);
    });
    setDrawerOpen(true);
  }
  function removeItem(lineId) { setItems(function(prev) { return prev.filter(function(i) { return i.lineId !== lineId; }); }); }
  function setQty(lineId, qty) {
    if (qty < 1) { removeItem(lineId); return; }
    setItems(function(prev) { return prev.map(function(i) { return i.lineId === lineId ? Object.assign({}, i, { qty: qty }) : i; }); });
  }
  var total = items.reduce(function(sum, i) { return sum + i.preco * i.qty; }, 0);
  var count = items.reduce(function(sum, i) { return sum + i.qty; }, 0);

  return (
    <CartContext.Provider value={{ items: items, addItem: addItem, removeItem: removeItem, setQty: setQty, total: total, count: count, drawerOpen: drawerOpen, setDrawerOpen: setDrawerOpen }}>
      {children}
    </CartContext.Provider>
  );
}

const BagIcon = ({ size = 22, color = COLORS.creme }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 8h12l1 13H5L6 8Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke={color} strokeWidth="1.6"/>
  </svg>
);

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
.pad-sec { padding: 100px 60px; }
@media(max-width:768px){ .pad-sec { padding: 64px 24px; } }
.descriptor { font-family: 'Cormorant Garamond', serif; font-size: 13px; letter-spacing: 0.3em; text-transform: uppercase; color: ${COLORS.dourado}; font-style: italic; display: block; margin-bottom: 16px; }
.gold-line { width: 200px; height: 1px; background: ${COLORS.dourado}; margin: 32px auto; opacity: 0.6; }
.ornament { color: ${COLORS.dourado}; letter-spacing: 0.6em; font-size: 14px; display: block; text-align: center; margin: 24px 0; }
.btn-primary { background: ${COLORS.dourado}; color: ${COLORS.torra}; font-family: 'Cormorant Garamond', serif; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; padding: 14px 36px; border: none; cursor: pointer; transition: opacity 0.3s; display: inline-block; }
.btn-primary:hover { opacity: 0.85; }
.btn-secondary { background: transparent; color: ${COLORS.creme}; font-family: 'Cormorant Garamond', serif; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; padding: 13px 35px; border: 1px solid ${COLORS.dourado}; cursor: pointer; transition: all 0.3s; display: inline-block; }
.btn-secondary:hover { background: rgba(212,165,116,0.1); }
.btn-latao { background: transparent; color: ${COLORS.latao}; font-family: 'Cormorant Garamond', serif; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; padding: 13px 35px; border: 1px solid ${COLORS.latao}; cursor: pointer; transition: all 0.3s; display: inline-block; }
.btn-latao:hover { background: rgba(201,169,97,0.1); }
.btn-text { background: none; border: none; cursor: pointer; font-family: 'Cormorant Garamond', serif; font-size: 17px; font-style: italic; color: ${COLORS.dourado}; text-decoration: none; border-bottom: 1px solid ${COLORS.dourado}; padding-bottom: 2px; }
.fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease, transform 0.8s ease; }
.fade-in.visible { opacity: 1; transform: translateY(0); }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 24px; }
.modal-box { background: ${COLORS.cacau}; border: 1px solid ${COLORS.dourado}; padding: 40px 24px; max-width: 540px; width: 100%; text-align: center; }
.sticky-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 500; background: rgba(43,24,16,0.92); backdrop-filter: blur(8px); padding: 18px 60px; display: flex; align-items: center; justify-content: space-between; border-bottom: 0.5px solid rgba(212,165,116,0.2); }
@media(max-width:768px){ .sticky-nav { padding: 14px 24px; } }
.nav-links { display: flex; gap: 28px; }
@media(max-width:1024px){ .nav-links { display: none; } }
.nav-link { font-family: 'Cormorant Garamond', serif; font-size: 15px; letter-spacing: 0.12em; color: ${COLORS.creme}; background: none; border: none; cursor: pointer; opacity: 0.8; transition: opacity 0.3s; padding: 0; }
.nav-link:hover { opacity: 1; }
.hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; }
@media(max-width:1024px){ .hamburger { display: flex; } }
.ham-line { width: 24px; height: 1px; background: ${COLORS.creme}; }
.mob-menu { position: fixed; inset: 0; background: ${COLORS.torra}; z-index: 600; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 36px; }
.mob-link { font-family: 'Cormorant Garamond', serif; font-size: 36px; letter-spacing: 0.15em; color: ${COLORS.creme}; background: none; border: none; cursor: pointer; }
.faq-item { border-bottom: 0.5px solid rgba(139,94,60,0.3); }
.faq-q { width: 100%; text-align: left; background: none; border: none; cursor: pointer; padding: 22px 0; display: flex; justify-content: space-between; align-items: center; font-family: 'Cormorant Garamond', serif; font-size: 19px; color: ${COLORS.torra}; letter-spacing: 0.02em; }
.faq-a { font-family: 'Lora', serif; font-size: 14px; line-height: 1.8; color: ${COLORS.caramelo}; padding-bottom: 22px; padding-right: 36px; }
.dep-card { background: ${COLORS.cacau}; border: 1px solid rgba(212,165,116,0.2); padding: 40px 32px; flex: 1; min-width: 220px; }
@media(max-width:768px){ .dep-card { padding: 28px 22px; min-width: 100%; } }
.testi-quote { font-family: 'Cormorant Garamond', serif; font-size: 56px; line-height: 0.5; color: ${COLORS.dourado}; margin-bottom: 14px; display: block; }
.opt-btn { padding: 11px 14px; font-family: 'Cormorant Garamond', serif; font-size: 14px; cursor: pointer; transition: all 0.2s; background: transparent; text-align: center; }
.opt-btn.active { background: rgba(212,165,116,0.15); }
.shop-card { background: white; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 32px rgba(43,24,16,0.08); }
@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
.cart-icon-btn { position: relative; background: none; border: none; cursor: pointer; padding: 6px; display: flex; align-items: center; }
.cart-badge { position: absolute; top: -4px; right: -4px; background: ${COLORS.dourado}; color: ${COLORS.torra}; font-family: 'Lora', serif; font-size: 11px; font-weight: 600; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; line-height: 1; }
.cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 900; }
.cart-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 100%; max-width: 420px; background: ${COLORS.cremeBg}; z-index: 901; display: flex; flex-direction: column; box-shadow: -8px 0 40px rgba(0,0,0,0.25); animation: slideIn 0.3s ease; }
@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
.cart-item { display: flex; gap: 14px; padding: 18px 0; border-bottom: 0.5px solid rgba(139,94,60,0.2); }
.qty-btn { width: 26px; height: 26px; border: 0.5px solid rgba(139,94,60,0.35); background: white; cursor: pointer; font-family: 'Lora', serif; font-size: 14px; color: ${COLORS.torra}; display: flex; align-items: center; justify-content: center; }
.whatsapp-btn { position: fixed; bottom: 28px; right: 28px; z-index: 400; width: 56px; height: 56px; border-radius: 50%; background: #25D366; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,0.25); transition: transform 0.2s, box-shadow 0.2s; }
.whatsapp-btn:hover { transform: scale(1.08); box-shadow: 0 6px 24px rgba(0,0,0,0.3); }
@media(max-width:768px){ .whatsapp-btn { bottom: 20px; right: 20px; width: 50px; height: 50px; } }
.hero-glow { position: absolute; inset: -10%; background: radial-gradient(circle at 50% 40%, rgba(212,165,116,0.22), transparent 60%); animation: heroGlow 8s ease-in-out infinite; }
@keyframes heroGlow { 0%,100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
.steam-wrap { position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; overflow: hidden; }
.steam { position: absolute; bottom: -10%; border-radius: 50%; background: radial-gradient(circle, rgba(239,228,210,0.5), transparent 70%); filter: blur(6px); animation-name: steamRise; animation-timing-function: ease-in; animation-iteration-count: infinite; }
@keyframes steamRise { 0% { transform: translateY(0) translateX(0) scale(0.6); opacity: 0; } 15% { opacity: 0.5; } 80% { opacity: 0.2; } 100% { transform: translateY(-110vh) translateX(var(--drift, 30px)) scale(1.4); opacity: 0; } }
.hero-grain { position: absolute; inset: 0; opacity: 0.05; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); mix-blend-mode: overlay; }
`;

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

// Saco de café — produto único, com torra selecionável visualmente
const SacoProduto = ({ produto, torraInfo, gram }) => {
  var w = 200, h = 300;
  var sw = w * 0.78, sh = h * 0.66;
  var sx = (w - sw) / 2, sy = h * 0.14;
  var a = produto.isReserva ? COLORS.latao : COLORS.dourado;
  var nomeL = produto.nome.split(" ");
  var notasL = torraInfo.notas.split(" . ");
  return (
    <svg width={w} height={h} viewBox={"0 0 " + w + " " + h} fill="none">
      <rect x="0" y="0" width={w} height={h} rx="12" fill="#3D2B1A"/>
      <rect x="0" y="0" width={w} height={h} rx="12" fill="none" stroke="#2B1810" strokeWidth="1.2"/>
      <line x1="0" y1={h*0.12} x2={w} y2={h*0.12} stroke="#2B1810" strokeWidth="0.4" opacity="0.4"/>
      <line x1="0" y1={h*0.88} x2={w} y2={h*0.88} stroke="#2B1810" strokeWidth="0.4" opacity="0.4"/>
      <ellipse cx={w/2} cy={h*0.93} rx={w*0.09} ry={w*0.045} fill="none" stroke="#2B1810" strokeWidth="0.8" opacity="0.4"/>
      <rect x={sx} y={sy} width={sw} height={sh} rx="2" fill="#EFE4D2"/>
      <rect x={sx} y={sy} width={sw} height={sh} rx="2" fill="none" stroke={a} strokeWidth="0.6"/>
      <rect x={sx} y={sy} width={sw} height="5" fill={a}/>
      <rect x={sx} y={sy+sh-5} width={sw} height="5" fill={a}/>
      <circle cx={w/2} cy={sy+sh*0.13} r="17" fill="none" stroke={a} strokeWidth="1"/>
      <circle cx={w/2} cy={sy+sh*0.13} r="13.5" fill="none" stroke={a} strokeWidth="0.4" opacity="0.5"/>
      <text x={w/2} y={sy+sh*0.13+6} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="17" fill="#2B1810">{produto.isReserva ? "R" : "L"}</text>
      <text x={w/2} y={sy+sh*0.27} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="7.5" fill={a} letterSpacing="2" fontStyle="italic">CASA LEVY</text>
      <line x1={sx+sw*0.15} y1={sy+sh*0.30} x2={sx+sw*0.85} y2={sy+sh*0.30} stroke={a} strokeWidth="0.5" opacity="0.5"/>
      <text x={w/2} y={sy+sh*0.40} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="15" fill="#2B1810" letterSpacing="0.5">{nomeL.slice(0,2).join(" ")}</text>
      {nomeL[2] && <text x={w/2} y={sy+sh*0.48} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="13" fill="#2B1810" letterSpacing="0.5">{nomeL[2]}</text>}
      <line x1={sx+sw*0.22} y1={sy+sh*(nomeL[2]?0.52:0.45)} x2={sx+sw*0.78} y2={sy+sh*(nomeL[2]?0.52:0.45)} stroke={a} strokeWidth="0.5" opacity="0.7"/>
      <text x={w/2} y={sy+sh*(nomeL[2]?0.58:0.51)} textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="7" fill={a} letterSpacing="1.5" fontStyle="italic">{torraInfo.label}</text>
      <text x={w/2} y={sy+sh*(nomeL[2]?0.66:0.59)} textAnchor="middle" fontFamily="Lora, serif" fontSize="6.5" fill="#2B1810" opacity="0.65">{notasL[0]||""}</text>
      {notasL[1] && <text x={w/2} y={sy+sh*(nomeL[2]?0.73:0.66)} textAnchor="middle" fontFamily="Lora, serif" fontSize="6.5" fill="#2B1810" opacity="0.65">{notasL[1]}</text>}
      <line x1={sx+sw*0.1} y1={sy+sh*0.88} x2={sx+sw*0.9} y2={sy+sh*0.88} stroke={a} strokeWidth="0.3" opacity="0.4"/>
      <text x={w/2} y={sy+sh*0.93} textAnchor="middle" fontFamily="Lora, serif" fontSize="6.5" fill="#2B1810" opacity="0.55">{gram}</text>
    </svg>
  );
};

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

function Modal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={function(e) { e.stopPropagation(); }}>
        <MonogramL size={60}/>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: COLORS.dourado, margin: "24px 0 16px" }}>Em breve</h3>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 15, lineHeight: 1.8, color: COLORS.creme, opacity: 0.85, marginBottom: 32 }}>Estamos finalizando o checkout da loja. Entre em contato pelo Instagram para garantir já o seu pedido.</p>
        <button className="btn-primary" onClick={onClose}>Entendido</button>
        <div style={{ marginTop: 16 }}>
          <a href="https://instagram.com" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.2em", color: COLORS.dourado, textDecoration: "none", opacity: 0.8 }}>@casalevy_cafe</a>
        </div>
      </div>
    </div>
  );
}

function CartDrawer() {
  const cart = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCheckout() {
    setError(null);
    setLoading(true);
    try {
      var payload = {
        items: cart.items.map(function(i) {
          return { produtoId: i.produtoId, torra: i.torra, moagem: i.moagem, qty: i.qty };
        }),
        successUrl: window.location.origin + "/sucesso",
        cancelUrl: window.location.origin
      };
      var resp = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      var data = await resp.json();
      if (!resp.ok || !data.url) {
        throw new Error(data.error || "Não foi possível iniciar o checkout.");
      }
      window.location.href = data.url;
    } catch (e) {
      setError("Não foi possível abrir o checkout agora. Tente novamente em alguns instantes.");
      setLoading(false);
    }
  }

  if (!cart.drawerOpen) return null;
  return (
    <>
      <div className="cart-overlay" onClick={function() { cart.setDrawerOpen(false); }}/>
      <div className="cart-drawer">
        <div style={{ padding: "24px 24px 18px", borderBottom: "0.5px solid rgba(139,94,60,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: COLORS.torra }}>Sua sacola</h3>
          <button onClick={function() { cart.setDrawerOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: COLORS.caramelo }}>×</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "8px 24px" }}>
          {cart.items.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 0" }}>
              <div className="cart-empty-icon" style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><BagIcon size={40} color={COLORS.caramelo}/></div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: COLORS.caramelo }}>Sua sacola está vazia</p>
            </div>
          )}
          {cart.items.map(function(item) { return (
            <div key={item.lineId} className="cart-item">
              <div style={{ width: 56, height: 72, background: item.isReserva ? "#1A0E0A" : COLORS.cremeBg, borderRadius: 4, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="90" stroke={item.isReserva ? COLORS.latao : COLORS.dourado} strokeWidth="3"/>
                  <text x="100" y="118" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="100" fill={item.isReserva ? COLORS.latao : COLORS.dourado}>{item.isReserva ? "R" : "L"}</text>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: COLORS.torra }}>{item.nome}</div>
                <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: COLORS.caramelo, marginTop: 2 }}>{item.gram} · {TORRAS[item.torra].curta} · {item.moagem === "grao" ? "Em grão" : "Moído"}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button className="qty-btn" onClick={function() { cart.setQty(item.lineId, item.qty - 1); }}>−</button>
                    <span style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.torra, minWidth: 16, textAlign: "center" }}>{item.qty}</span>
                    <button className="qty-btn" onClick={function() { cart.setQty(item.lineId, item.qty + 1); }}>+</button>
                  </div>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: COLORS.torra }}>R$ {(item.preco * item.qty).toFixed(2).replace(".", ",")}</span>
                </div>
                <button onClick={function() { cart.removeItem(item.lineId); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Lora', serif", fontSize: 11, color: COLORS.caramelo, opacity: 0.6, marginTop: 8, padding: 0, textDecoration: "underline" }}>Remover</button>
              </div>
            </div>
          ); })}
        </div>

        {cart.items.length > 0 && (
          <div style={{ padding: "20px 24px 28px", borderTop: "0.5px solid rgba(139,94,60,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: COLORS.caramelo, letterSpacing: "0.05em" }}>TOTAL</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: COLORS.torra }}>R$ {cart.total.toFixed(2).replace(".", ",")}</span>
            </div>
            <button onClick={handleCheckout} disabled={loading} style={{ width: "100%", padding: "16px", background: loading ? COLORS.caramelo : COLORS.dourado, color: COLORS.torra, fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", border: "none", cursor: loading ? "default" : "pointer" }}>{loading ? "Abrindo checkout..." : "Finalizar compra"}</button>
            {error && <p style={{ fontFamily: "'Lora', serif", fontSize: 12, color: "#B23A3A", textAlign: "center", marginTop: 10 }}>{error}</p>}
            <p style={{ fontFamily: "'Lora', serif", fontSize: 11, color: COLORS.caramelo, textAlign: "center", marginTop: 12, opacity: 0.7 }}>Frete calculado no checkout</p>
          </div>
        )}
      </div>
    </>
  );
}

// Dados dos 3 produtos
const TORRAS = {
  escura: { id: "escura", label: "TORRA ESCURA", curta: "Escura", notas: "chocolate amargo . caramelo escuro . corpo cheio", uso: "Espresso e cafeteira italiana" },
  media: { id: "media", label: "TORRA MÉDIA", curta: "Média", notas: "caramelo . frutas vermelhas suaves . doçura presente", uso: "Versátil para qualquer método" },
  clara: { id: "clara", label: "TORRA CLARA", curta: "Clara", notas: "frutas frescas . florais . acidez cítrica viva", uso: "Métodos manuais (V60, Chemex)" }
};

const PRODUTOS = {
  original: {
    id: "original", nome: "Casa Original", gram: "250g", preco: 49.90,
    frase: "Para dias que começam do jeito certo.",
    isReserva: false, isLatinha: false, foto: "/produtos/casa-original.jpg"
  },
  reserva: {
    id: "reserva", nome: "Reserva Rico", gram: "250g", preco: 69.90,
    frase: "Para dias que começam do jeito certo.",
    isReserva: true, isLatinha: false, foto: "/produtos/reserva-rico-250.jpg"
  },
  latinha: {
    id: "latinha", nome: "Reserva Rico Latinha", gram: "150g", preco: 50.00,
    frase: "Uma homenagem em forma de presente.",
    isReserva: true, isLatinha: true, foto: "/produtos/reserva-rico.jpg"
  }
};

const RoruloSVG = ({ produto }) => {
  var vinho = "#6B1F1F";
  var creme = "#F5F0E8";
  var w = 190, h = 280;

  if (produto.isLatinha) {
    return (
      <svg width={w} height={h} viewBox={"0 0 " + w + " " + h} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width={w} height={h} fill={creme}/>
        {/* Lata — corpo */}
        <rect x="45" y="40" width="100" height="180" rx="6" fill={vinho}/>
        {/* Topo e base da lata */}
        <ellipse cx="95" cy="40" rx="50" ry="10" fill="#5A1010"/>
        <ellipse cx="95" cy="220" rx="50" ry="10" fill="#5A1010"/>
        {/* Faixa creme com rótulo */}
        <rect x="45" y="80" width="100" height="100" fill={creme}/>
        {/* Texto no rótulo */}
        <text x="95" y="112" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="14" fontWeight="500" fill={vinho}>Casa Levy</text>
        <text x="95" y="128" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="8" fontWeight="700" letterSpacing="1.5" fill={vinho}>RESERVA RICO</text>
        {/* Monograma pequeno */}
        <circle cx="95" cy="152" r="14" fill={vinho}/>
        <text x="95" y="158" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="12" fill={creme}>L</text>
        {/* Detalhe dourado topo/base lata */}
        <rect x="45" y="54" width="100" height="3" fill="#C9A961" opacity="0.7"/>
        <rect x="45" y="213" width="100" height="3" fill="#C9A961" opacity="0.7"/>
        {/* Gramagem */}
        <text x="95" y="248" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="10" fontWeight="700" fill={vinho}>150g · Lata de metal</text>
        {/* Label edição presente */}
        <text x="95" y="265" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="9" fontStyle="italic" fill={vinho}>Edição Presente</text>
      </svg>
    );
  }

  var titulo = produto.isReserva ? "RESERVA RICO" : "CASA ORIGINAL";
  return (
    <svg width={w} height={h} viewBox={"0 0 " + w + " " + h} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width={w} height={h} fill={creme}/>
      <rect width={w} height="9" fill={vinho}/>
      <rect y={h-9} width={w} height="9" fill={vinho}/>
      <text x={w/2} y="55" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="40" fontWeight="500" fill={vinho}>Casa Levy</text>
      <text x={w/2} y="82" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="14" fontWeight="700" letterSpacing="2.5" fill={vinho}>{titulo}</text>
      <line x1="14" y1="118" x2="60" y2="118" stroke={vinho} strokeWidth="1"/>
      <line x1="130" y1="118" x2="176" y2="118" stroke={vinho} strokeWidth="1"/>
      <circle cx={w/2} cy="118" r="28" fill={vinho}/>
      <text x={w/2} y="127" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="24" fill={creme}>L</text>
      <text x={w/2} y="138" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="7" fill={creme} letterSpacing="2.5">. . .</text>
      <line x1="14" y1="164" x2="42" y2="164" stroke={vinho} strokeWidth="0.8"/>
      <text x={w/2} y="168" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="8.5" fontWeight="700" letterSpacing="1.5" fill={vinho}>CAFÉ ESPECIAL 100% ARÁBICA</text>
      <line x1="148" y1="164" x2="176" y2="164" stroke={vinho} strokeWidth="0.8"/>
      <text x={w/2} y="228" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="12" fontStyle="italic" fill={vinho}>Para dias que começam do jeito certo</text>
      <text x={w/2} y="253" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="11" fontWeight="700" fill={vinho}>250g</text>
    </svg>
  );
};

function ProductImage({ produto }) {
  const [errored, setErrored] = useState(false);
  if (produto.foto && !errored) {
    return (
      <img
        src={produto.foto}
        alt={produto.nome}
        onError={function() { setErrored(true); }}
        style={{ width: "100%", height: "100%", objectFit: "contain", maxHeight: 340 }}
      />
    );
  }
  return <RoruloSVG produto={produto}/>;
}

function ProductCard({ produtoId }) {
  const [torra, setTorra] = useState("media");
  const [moagem, setMoagem] = useState("grao");
  const [added, setAdded] = useState(false);
  const cart = useCart();
  var produto = PRODUTOS[produtoId];
  var torraInfo = TORRAS[torra];
  var a = produto.isReserva ? COLORS.latao : COLORS.dourado;
  var bgImagem = COLORS.cremeBg;
  function handleAdd() {
    cart.addItem(produto, torra, moagem);
    setAdded(true);
    setTimeout(function() { setAdded(false); }, 1800);
  }
  return (
    <div className="shop-card" style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ background: COLORS.cremeBg, height: 340, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <ProductImage produto={produto}/>
      </div>
      <div style={{ padding: "28px 28px 32px" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: COLORS.torra, marginBottom: 6 }}>{produto.nome}</h3>
        <div style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo, marginBottom: 4 }}>{produto.gram}</div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 15, color: COLORS.torra, opacity: 0.75, lineHeight: 1.5, marginBottom: 20 }}>{produto.frase}</p>

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.15em", color: COLORS.caramelo, marginBottom: 8 }}>TORRA</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, border: "0.5px solid rgba(139,94,60,0.25)" }}>
            {Object.values(TORRAS).map(function(t, i) { return (
              <button key={t.id} onClick={function() { setTorra(t.id); }} className={"opt-btn" + (torra === t.id ? " active" : "")} style={{ borderRight: i < 2 ? "0.5px solid rgba(139,94,60,0.25)" : "none", color: COLORS.torra }}>{t.curta}</button>
            ); })}
          </div>
        </div>

        <div style={{ marginBottom: 22 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.15em", color: COLORS.caramelo, marginBottom: 8 }}>MOAGEM</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "0.5px solid rgba(139,94,60,0.25)" }}>
            <button onClick={function() { setMoagem("grao"); }} className={"opt-btn" + (moagem === "grao" ? " active" : "")} style={{ borderRight: "0.5px solid rgba(139,94,60,0.25)", color: COLORS.torra }}>Em grão</button>
            <button onClick={function() { setMoagem("moido"); }} className={"opt-btn" + (moagem === "moido" ? " active" : "")} style={{ color: COLORS.torra }}>Moído</button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: COLORS.torra }}>R$ {produto.preco.toFixed(2).replace(".", ",")}</span>
        </div>

        <button onClick={handleAdd} style={{ width: "100%", padding: "15px", background: added ? COLORS.caramelo : a, color: COLORS.torra, fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "background 0.25s" }}>
          {added ? "Adicionado ✓" : "Adicionar ao carrinho"}
        </button>
      </div>
    </div>
  );
}

function AnimatedBackdrop() {
  var steamConfigs = [
    { left: "30%", size: 90, delay: "0s", duration: "9s", drift: "20px" },
    { left: "45%", size: 70, delay: "2.2s", duration: "11s", drift: "-25px" },
    { left: "58%", size: 100, delay: "4.5s", duration: "10s", drift: "15px" },
    { left: "38%", size: 60, delay: "1.2s", duration: "8s", drift: "-15px" },
    { left: "52%", size: 80, delay: "6s", duration: "12s", drift: "30px" }
  ];
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #1A0E0A 0%, #2B1810 55%, #3A2418 100%)" }}/>
      <div className="hero-glow"/>
      <div className="steam-wrap">
        {steamConfigs.map(function(s, i) { return (
          <div key={i} className="steam" style={{ left: s.left, width: s.size, height: s.size, animationDuration: s.duration, animationDelay: s.delay, "--drift": s.drift }}/>
        ); })}
      </div>
      <div className="hero-grain"/>
    </div>
  );
}

function Hero() {
  const [videoError, setVideoError] = useState(true);
  return (
    <section className="sec-dark" style={{ minHeight: "92vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "110px 24px 60px", position: "relative", overflow: "hidden" }}>
      {!videoError && (
        <video
          autoPlay loop muted playsInline
          poster="/hero-poster.jpg"
          onError={function() { setVideoError(true); }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        >
          <source src="/hero.mp4" type="video/mp4"/>
        </video>
      )}
      {videoError && <AnimatedBackdrop/>}
      <div style={{ position: "absolute", inset: 0, background: "rgba(43,24,16,0.5)", zIndex: 1 }}/>

      <FadeIn style={{ position: "relative", zIndex: 2 }}><MonogramL size={130}/></FadeIn>
      <FadeIn style={{ marginTop: 28, position: "relative", zIndex: 2 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 9vw, 100px)", fontWeight: 400, letterSpacing: "0.35em", color: COLORS.creme, lineHeight: 1 }}>CASA LEVY</h1>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(11px,1.5vw,14px)", letterSpacing: "0.3em", color: COLORS.dourado, fontStyle: "italic", marginTop: 10 }}>TRÊS GERAÇÕES DE CAFÉ</div>
        <div className="gold-line" style={{ margin: "24px auto" }}/>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(16px,2vw,20px)", color: COLORS.creme, opacity: 0.8, marginBottom: 36 }}>o café como pausa, presença e família</p>
        <button className="btn-primary" onClick={function() { document.getElementById("loja")?.scrollIntoView({ behavior: "smooth" }); }}>Ver os cafés</button>
      </FadeIn>
      <div style={{ marginTop: 56, color: COLORS.dourado, letterSpacing: "0.6em", fontSize: 12, animation: "pulse 2.5s ease-in-out infinite", position: "relative", zIndex: 2 }}>. . .</div>
    </section>
  );
}

function Loja() {
  return (
    <section id="loja" className="sec-light pad-sec">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="descriptor" style={{ color: COLORS.caramelo }}>A LOJA</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,54px)", color: COLORS.torra }}>Três cafés. Uma casa.</h2>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 15, color: COLORS.torra, opacity: 0.6, marginTop: 14, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>Escolha a torra e a moagem. O resto a casa cuida.</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
          <FadeIn><ProductCard produtoId="original"/></FadeIn>
          <FadeIn><ProductCard produtoId="reserva"/></FadeIn>
          <FadeIn><ProductCard produtoId="latinha"/></FadeIn>
        </div>
      </div>
    </section>
  );
}

function Manifesto({ nav }) {
  return (
    <section className="sec-dark pad-sec">
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <FadeIn><span className="ornament">. . .</span></FadeIn>
        <FadeIn>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px,6vw,72px)", lineHeight: 1.1, color: COLORS.creme, marginBottom: 40 }}>Não vendemos café.<br/><em>Vendemos o ritual.</em></h2>
        </FadeIn>
        <FadeIn>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 16, lineHeight: 1.9, color: COLORS.creme, opacity: 0.8, marginBottom: 28 }}>Café é a primeira coisa que a gente faz. É o que reúne a casa antes do mundo começar.</p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 16, lineHeight: 1.9, color: COLORS.creme, opacity: 0.75, marginBottom: 36 }}>A Casa Levy nasce dessa convicção e de uma história que atravessou três continentes para chegar até a sua xícara.</p>
          <button className="btn-text" onClick={function() { nav("casa"); }}>Conheça nossa história</button>
        </FadeIn>
      </div>
    </section>
  );
}

function ReservaDestaque({ nav }) {
  return (
    <section className="sec-deep pad-sec" style={{ textAlign: "center" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <FadeIn><RicoPortrait size={140}/></FadeIn>
        <FadeIn>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.3em", color: COLORS.latao, marginTop: 28, marginBottom: 20 }}>RESERVA RICO</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(30px,4vw,52px)", color: COLORS.creme, marginBottom: 24 }}>Uma homenagem em cada lote</h2>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 16, lineHeight: 1.9, color: COLORS.creme, opacity: 0.8, marginBottom: 32 }}>Um blend especial, diferente do café do dia a dia da casa, em homenagem ao avô Menahem. Microlotes numerados à mão, nas três torras.</p>
          <button className="btn-latao" onClick={function() { document.getElementById("loja")?.scrollIntoView({ behavior: "smooth" }); }}>Ver a Reserva</button>
        </FadeIn>
      </div>
    </section>
  );
}

function Depoimentos() {
  var deps = [
    { texto: "O Casa Original me lembrou o café que meu pai fazia. Não sei como, mas é exatamente aquilo.", autor: "Roberto T.", cidade: "São Paulo" },
    { texto: "A Reserva Rico é outra coisa. Comprei pra mim e já voltei pra comprar de presente.", autor: "Camila L.", cidade: "Niterói" },
    { texto: "Simples de comprar, chegou rápido, café fresquinho. Recomendo.", autor: "Marina S.", cidade: "Rio de Janeiro" }
  ];
  return (
    <section className="sec-dark pad-sec">
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px,4vw,48px)", color: COLORS.creme }}>O que a casa anda dizendo</h2>
        </FadeIn>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {deps.map(function(d, i) { return (
            <FadeIn key={i} style={{ flex: "1 1 260px" }}>
              <div className="dep-card">
                <span className="testi-quote">"</span>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.75, color: COLORS.creme, marginBottom: 24 }}>{d.texto}</p>
                <div style={{ width: 28, height: 0.5, background: COLORS.dourado, marginBottom: 14, opacity: 0.5 }}/>
                <div style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.dourado }}>{d.autor}</div>
                <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: COLORS.creme, opacity: 0.5 }}>{d.cidade}</div>
              </div>
            </FadeIn>
          ); })}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  var items = [
    { q: "Qual a diferença entre as torras?", a: "Escura é mais encorpada, ideal para espresso. Média é equilibrada, funciona em qualquer método. Clara é mais floral e ácida, melhor em métodos manuais como V60 e Chemex." },
    { q: "Moído ou em grão — qual escolher?", a: "Em grão se você tem moedor em casa (recomendado, fica mais fresco). Moído se você não tem moedor — ajustamos a moagem para o método mais comum (filtrado)." },
    { q: "Para quais cidades vocês entregam?", a: "Para todo o Brasil. Frete calculado no checkout." },
    { q: "Como o café fica fresco até chegar?", a: "Torramos toda semana, embalamos com válvula desgaseificadora, e enviamos em até 48h depois da torra." },
    { q: "O que é a Reserva Rico?", a: "Um blend especial, diferente do Casa Original, feito em homenagem ao avô Menahem Levy. Edição limitada e numerada à mão, disponível nas três torras." },
    { q: "Posso presentear?", a: "Pode. Os dois cafés têm opção de presente com cartão escrito à mão." }
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

function FAQSection() {
  return (
    <section className="sec-light pad-sec">
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="descriptor" style={{ color: COLORS.caramelo }}>PERGUNTAS FREQUENTES</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px,4vw,48px)", color: COLORS.torra }}>A casa responde</h2>
        </FadeIn>
        <FAQ/>
      </div>
    </section>
  );
}

function Footer({ nav }) {
  return (
    <footer className="sec-cacau" style={{ padding: "64px 24px 32px" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 48, marginBottom: 48 }}>
          <div>
            <MonogramL size={46}/>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, letterSpacing: "0.35em", color: COLORS.creme, marginTop: 14, marginBottom: 4 }}>CASA LEVY</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 11, color: COLORS.dourado, letterSpacing: "0.2em", marginBottom: 14 }}>Três gerações de café</div>
            <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: COLORS.creme, opacity: 0.5 }}>Rio de Janeiro, Brasil</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.2em", color: COLORS.dourado, marginBottom: 20 }}>NAVEGAÇÃO</div>
            {["A Loja","A Casa","A Cartilha"].map(function(l, i) { return (
              <div key={i} style={{ marginBottom: 10 }}>
                <button onClick={function() { nav(["loja","casa","cartilha"][i]); }} style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.creme, opacity: 0.7, background: "none", border: "none", cursor: "pointer", padding: 0 }}>{l}</button>
              </div>
            ); })}
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.2em", color: COLORS.dourado, marginBottom: 20 }}>AJUDA</div>
            {["Frete e entrega","Trocas e devoluções","Fale com a casa"].map(function(l, i) { return (
              <div key={i} style={{ marginBottom: 10 }}>
                <span style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.creme, opacity: 0.5 }}>{l}</span>
              </div>
            ); })}
          </div>
        </div>
        <div style={{ height: 0.5, background: COLORS.dourado, opacity: 0.3, marginBottom: 24 }}/>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 11, color: COLORS.creme, opacity: 0.4 }}>2026 Casa Levy — Em memória de Menahem (Rico) Levy — 1938 — 2024</p>
      </div>
    </footer>
  );
}

function Home({ nav }) {
  return (
    <>
      <Hero/>
      <Loja/>
      <Manifesto nav={nav}/>
      <ReservaDestaque nav={nav}/>
      <Depoimentos/>
      <FAQSection/>
      <Footer nav={nav}/>
    </>
  );
}

function PageCasa({ nav }) {
  return (
    <div className="cl-site sec-light" style={{ paddingTop: 80 }}>
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "64px 24px" }}>
        <button onClick={function() { nav("home"); }} style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo, background: "none", border: "none", cursor: "pointer", marginBottom: 36, opacity: 0.7 }}>← Voltar</button>
        <span className="descriptor" style={{ color: COLORS.caramelo }}>A CASA</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px,5vw,64px)", color: COLORS.torra, marginBottom: 40, lineHeight: 1.1 }}>Três gerações,<br/><em>uma travessia.</em></h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 16, lineHeight: 1.95, color: COLORS.torra, opacity: 0.75, marginBottom: 28 }}>Tudo começa no Egito de 1938. Menahem Levy nasce em Alexandria, uma cidade onde diferentes culturas se cruzavam e o café era ritualístico, árabe, forte, com cardamomo, servido em xícaras pequenas como sinal de hospitalidade.</p>
        <div style={{ borderLeft: "2px solid " + COLORS.dourado, paddingLeft: 28, margin: "40px 0" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 20, color: COLORS.caramelo }}>O Rico não bebia café. Ele recebia as pessoas com café. Era diferente.</div>
          <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: COLORS.caramelo, opacity: 0.6, marginTop: 10 }}>Paulo Chut</div>
        </div>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 16, lineHeight: 1.95, color: COLORS.torra, opacity: 0.75, marginBottom: 28 }}>Com a perseguição aos judeus no Egito, Menahem perde tudo. Passa pela França. Chega ao Brasil com as referências que nenhum exílio consegue tirar: o paladar, a hospitalidade, e a convicção de que café é gesto de presença.</p>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 16, lineHeight: 1.95, color: COLORS.torra, opacity: 0.75, marginBottom: 28 }}>No Brasil, Rico vira exportador de café. Operador do mercado. Pioneiro em trazer o espresso italiano para bares e restaurantes brasileiros. Monta torrefação. Constrói uma carreira inteira ao redor do café.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, margin: "56px 0", textAlign: "center" }}>
          {[["1938","Nasce em Alexandria"],["Anos 1950","Chega ao Brasil"],["Anos 1980","Pioneiro do espresso"],["2026","Casa Levy"]].map(function(item, i) { return (
            <div key={i}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: COLORS.dourado, marginBottom: 6 }}>{item[0]}</div>
              <div style={{ width: "100%", height: "0.5px", background: COLORS.dourado, opacity: 0.3, marginBottom: 10 }}/>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 12, color: COLORS.caramelo, opacity: 0.7 }}>{item[1]}</div>
            </div>
          ); })}
        </div>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 16, lineHeight: 1.95, color: COLORS.torra, opacity: 0.75, marginBottom: 56 }}>A Casa Levy é o que acontece quando as gerações se encontram numa paixão. O Renato, coração e cara da casa, com o ofício e o paladar herdados do pai. E o Paulo Chut, que toma café em quantidade absurda e ainda acha que a próxima xícara vai ser a melhor.</p>
      </div>
      <Footer nav={nav}/>
    </div>
  );
}

function PageCartilha({ nav }) {
  const [artigoAberto, setArtigoAberto] = useState(null);
  var artigos = [
    { titulo: "O que é café especial?", desc: "A diferença entre o que você toma e o que você poderia tomar", tempo: "4 min", conteudo: "Café especial é uma classificação técnica, não um rótulo de marketing. Para receber essa denominação, um café precisa atingir no mínimo 80 pontos em uma escala de 100 definida pela Specialty Coffee Association (SCA). A avaliação é feita por profissionais certificados chamados Q-graders, que analisam atributos como aroma, acidez, corpo, doçura, equilíbrio e ausência de defeitos.\n\nO que diferencia um café especial do café comum começa antes da torra, na fazenda. Grãos especiais são colhidos seletivamente, no ponto exato de maturação.\n\nNa Casa Levy, todos os cafés são compostos exclusivamente por grãos com pontuação acima de 80 pontos. A Reserva Rico vai além, com microlotes que alcançam pontuações acima de 85." },
    { titulo: "A diferença entre torras", desc: "Por que o mesmo grão é outro café conforme a torra", tempo: "5 min", conteudo: "A torra é uma das etapas mais decisivas na cadeia do café. É ela que transforma os compostos químicos do grão verde em aroma, sabor e corpo.\n\nTorra clara preserva mais acidez, florais e frutas. É a preferida para métodos de coado manual.\n\nTorra média equilibra acidez e doçura. Funciona bem em espresso e em coado.\n\nTorra escura leva o grão além do segundo crack. A acidez cede espaço ao amargor controlado, ao corpo denso e ao caramelo. É a torra clássica do espresso italiano.\n\nNão existe torra melhor ou pior. Existe torra adequada ao método e ao paladar de cada pessoa." },
    { titulo: "Espresso ou coado: qual é o seu?", desc: "Um guia honesto para descobrir seu método", tempo: "6 min", conteudo: "A escolha entre espresso e coado não é questão de gosto apenas. Envolve estilo de vida, equipamento disponível e o que você espera da bebida.\n\nO espresso é uma extração sob pressão, entre 8 e 10 bar, em 25 a 30 segundos. O resultado é concentrado, com crema, corpo denso e intensidade elevada.\n\nPara fazer espresso em casa com qualidade, você precisa de uma máquina com bomba de pressão adequada e de um moedor capaz de ajuste fino.\n\nO coado é uma extração por percolação. A água passa pelo café por gravidade, sem pressão. O resultado é uma bebida mais clara, com acidez mais evidente e complexidade aromática.\n\nSe você aprecia a intensidade, o espresso é seu método. Se você gosta de explorar nuances e tem paciência para o processo, o coado vai surpreender." },
    { titulo: "Moído ou em grão?", desc: "Como escolher e por que faz diferença", tempo: "3 min", conteudo: "A escolha entre café moído e em grão é, basicamente, uma escolha entre conveniência e frescor.\n\nO café perde aroma e sabor rapidamente depois de moído — o processo de oxidação começa em minutos. Café em grão, guardado bem, mantém suas qualidades por semanas.\n\nSe você tem um moedor em casa, mesmo um manual simples, vale a pena comprar em grão e moer na hora de preparar.\n\nSe você não tem moedor, sem problema: moemos pra você no ponto certo, considerando o método que você mais usa. É melhor um café moído fresco e bem ajustado do que um café em grão que vai ficar parado sem ser usado." },
    { titulo: "Como o Renato faz o coado de manhã", desc: "A receita da casa, com notas de cada etapa", tempo: "4 min", conteudo: "Renato torra café toda semana e bebe café todo dia. A receita que ele usa de manhã não é sofisticada. É consistente.\n\nEquipamento: coador de cerâmica V60, filtro de papel branqueado, chaleira de bico fino, balança e termômetro.\n\nCafé: Casa Original, moído na hora em moagem média. 15 gramas para 225 ml de água.\n\nTemperatura da água: 93°C. Renato ferve a água e aguarda 45 segundos antes de usar.\n\nBloom: 30 ml de água, aguarda 35 segundos. O café fresco libera CO2 nesse momento.\n\nExtração principal: despeja o restante em movimentos circulares lentos.\n\nTempo total: 3 minutos e 20 segundos. Renato bebe sem açúcar." },
    { titulo: "Era do Rico essa mania de cardamomo no café", desc: "A herança egípcia que você pode tentar", tempo: "5 min", conteudo: "Na Alexandria dos anos 1940, o café não era bebido sozinho. Era servido com cardamomo, às vezes com água de rosas, sempre em xícaras pequenas. Era o café árabe, o qahwa.\n\nMenahem Levy cresceu nesse ritual. Quando chegou ao Brasil, trouxe o hábito. O cardamomo aparecia na sua xícara em dias específicos, pela memória do que tinha sido normal para ele.\n\nO cardamomo pertence à família do gengibre. No café, ele adiciona notas cítricas e levemente mentoladas, que contrabalançam a amargura e ampliam a percepção de doçura.\n\nA técnica mais comum é adicionar uma ou duas sementes levemente amassadas ao pó antes da extração.\n\nNão é uma preparação para todo dia. Mas é uma preparação que conta uma história." },
    { titulo: "Como chega o café até você", desc: "Da torra à sua porta, em até 48h", tempo: "3 min", conteudo: "Café fresco é a diferença entre uma xícara comum e uma xícara memorável. Por isso, a Casa Levy torra em pequenos lotes, toda semana — nunca temos estoque parado por meses.\n\nQuando você faz o pedido, escolhe a torra e a moagem. O café é torrado (ou separado, se já tiver lote fresco da torra escolhida) e embalado com válvula desgaseificadora, que deixa o CO2 sair sem deixar o oxigênio entrar.\n\nO envio acontece em até 48 horas depois da torra. Isso significa que, quando o café chega na sua casa, ele ainda está no auge do frescor.\n\nFrete para todo o Brasil, calculado no checkout conforme o seu CEP." }
  ];

  if (artigoAberto) {
    return (
      <div className="cl-site sec-light" style={{ paddingTop: 80 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px" }}>
          <button onClick={function() { setArtigoAberto(null); }} style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo, background: "none", border: "none", cursor: "pointer", marginBottom: 40, opacity: 0.7 }}>← Voltar para a Cartilha</button>
          <div style={{ fontFamily: "'Lora', serif", fontSize: 11, letterSpacing: "0.15em", color: COLORS.dourado, marginBottom: 24 }}>{artigoAberto.tempo} DE LEITURA</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,52px)", color: COLORS.torra, marginBottom: 16, lineHeight: 1.2 }}>{artigoAberto.titulo}</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 18, color: COLORS.caramelo, marginBottom: 48, lineHeight: 1.6 }}>{artigoAberto.desc}</p>
          <div style={{ height: "0.5px", background: COLORS.dourado, opacity: 0.3, marginBottom: 48 }}/>
          {artigoAberto.conteudo.split("\n\n").map(function(p, i) { return (
            <p key={i} style={{ fontFamily: "'Lora', serif", fontSize: 16, lineHeight: 1.95, color: COLORS.torra, opacity: 0.8, marginBottom: 28 }}>{p}</p>
          ); })}
          <div style={{ height: "0.5px", background: COLORS.dourado, opacity: 0.3, margin: "48px 0 32px" }}/>
          <button onClick={function() { setArtigoAberto(null); }} style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: COLORS.caramelo, background: "none", border: "none", cursor: "pointer", borderBottom: "0.5px solid " + COLORS.caramelo }}>Voltar para a Cartilha</button>
        </div>
        <Footer nav={nav}/>
      </div>
    );
  }

  return (
    <div className="cl-site sec-light" style={{ paddingTop: 80 }}>
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "64px 24px" }}>
        <button onClick={function() { nav("home"); }} style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo, background: "none", border: "none", cursor: "pointer", marginBottom: 36, opacity: 0.7 }}>← Voltar</button>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="descriptor" style={{ color: COLORS.caramelo }}>A CARTILHA DA CASA</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,60px)", color: COLORS.torra }}>Não vendemos café.<br/><em>Ensinamos.</em></h1>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 28 }}>
          {artigos.map(function(a, i) { return (
            <div key={i} style={{ border: "0.5px solid rgba(139,94,60,0.2)", padding: "32px 26px", background: "white" }}>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 11, letterSpacing: "0.15em", color: COLORS.dourado, marginBottom: 14 }}>{a.tempo} DE LEITURA</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: COLORS.torra, marginBottom: 10 }}>{a.titulo}</h3>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 13, color: COLORS.caramelo, lineHeight: 1.7, marginBottom: 20 }}>{a.desc}</p>
              <button className="btn-text" style={{ color: COLORS.caramelo, borderBottomColor: COLORS.caramelo, fontSize: 13 }} onClick={function() { setArtigoAberto(a); }}>Ler</button>
            </div>
          ); })}
        </div>
      </div>
      <Footer nav={nav}/>
    </div>
  );
}

function PageSucesso({ nav }) {
  const cart = useCart();
  useEffect(function() {
    // Limpa o carrinho assim que a página de sucesso carrega —
    // o pagamento já foi confirmado pelo Stripe nesse ponto.
    cart.items.forEach(function(i) { cart.removeItem(i.lineId); });
  }, []);
  return (
    <div className="cl-site sec-light" style={{ paddingTop: 80, minHeight: "90vh", display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "64px 24px", textAlign: "center" }}>
        <MonogramL size={90} color={COLORS.dourado}/>
        <div style={{ width: 64, height: 64, borderRadius: "50%", border: "1.5px solid " + COLORS.dourado, display: "flex", alignItems: "center", justifyContent: "center", margin: "32px auto 28px" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={COLORS.dourado} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <span className="descriptor" style={{ color: COLORS.caramelo }}>PEDIDO CONFIRMADO</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,52px)", color: COLORS.torra, marginBottom: 24, lineHeight: 1.15 }}>Bem-vindo à casa.</h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 16, lineHeight: 1.9, color: COLORS.torra, opacity: 0.75, marginBottom: 12 }}>Seu pedido foi recebido e já está com a gente. Você vai receber a confirmação por e-mail em alguns instantes.</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 18, color: COLORS.caramelo, marginBottom: 40 }}>Renato já está de olho na sua torra.</p>
        <button className="btn-primary" onClick={function() { nav("home"); }}>Voltar para a Casa</button>
      </div>
    </div>
  );
}

function AppShell() {
  const [page, setPage] = useState(function() {
    if (typeof window !== "undefined" && window.location.pathname === "/sucesso") return "sucesso";
    return "home";
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useCart();

  useEffect(function() {
    var style = document.createElement("style");
    style.textContent = fonts + globalCSS;
    document.head.appendChild(style);
    return function() { document.head.removeChild(style); };
  }, []);

  useEffect(function() { window.scrollTo(0, 0); setMenuOpen(false); }, [page]);

  function nav(p) {
    if (p === "loja") {
      if (page !== "home") { setPage("home"); setTimeout(function() { document.getElementById("loja")?.scrollIntoView({ behavior: "smooth" }); }, 50); }
      else { document.getElementById("loja")?.scrollIntoView({ behavior: "smooth" }); }
      setMenuOpen(false);
      return;
    }
    if (typeof window !== "undefined" && window.history && window.history.replaceState) {
      window.history.replaceState({}, "", p === "home" ? "/" : "/" + p);
    }
    setPage(p);
  }
  function openModal() { setModalOpen(true); }
  function closeModal() { setModalOpen(false); }

  var navLinks = [
    { label: "A Loja", page: "loja" },
    { label: "A Casa", page: "casa" },
    { label: "A Cartilha", page: "cartilha" }
  ];

  return (
    <div className="cl-site" style={{ minHeight: "100vh" }}>
      <nav className="sticky-nav">
        <button onClick={function() { nav("home"); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
          <MonogramL size={34} color={COLORS.dourado}/>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, letterSpacing: "0.35em", color: COLORS.creme }}>CASA LEVY</div>
        </button>
        <div className="nav-links">
          {navLinks.map(function(l, i) { return (
            <button key={i} className="nav-link" onClick={function() { nav(l.page); }}>{l.label}</button>
          ); })}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <button className="cart-icon-btn" onClick={function() { cart.setDrawerOpen(true); }} aria-label="Sacola">
            <BagIcon size={21} color={COLORS.creme}/>
            {cart.count > 0 && <span className="cart-badge">{cart.count}</span>}
          </button>
          <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 12 }} onClick={function() { nav("loja"); }}>Comprar</button>
          <button className="hamburger" onClick={function() { setMenuOpen(!menuOpen); }}>
            <div className="ham-line"/><div className="ham-line"/><div className="ham-line"/>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mob-menu">
          <button onClick={function() { setMenuOpen(false); }} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", cursor: "pointer", color: COLORS.creme, fontFamily: "'Cormorant Garamond', serif", fontSize: 28 }}>×</button>
          {navLinks.map(function(l, i) { return (
            <button key={i} className="mob-link" onClick={function() { nav(l.page); }}>{l.label}</button>
          ); })}
        </div>
      )}

      {page === "home" && <Home nav={nav}/>}
      {page === "casa" && <PageCasa nav={nav}/>}
      {page === "cartilha" && <PageCartilha nav={nav}/>}
      {page === "sucesso" && <PageSucesso nav={nav}/>}

      <CartDrawer/>
      {modalOpen && <Modal onClose={closeModal}/>}
      <a
        href="https://wa.me/5521990910552?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido%20na%20Casa%20Levy."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

export default function CasaLevy() {
  return (
    <CartProvider>
      <AppShell/>
    </CartProvider>
  );
}
