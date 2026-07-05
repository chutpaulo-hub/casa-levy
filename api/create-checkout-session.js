// /api/create-checkout-session.js
// Vercel Serverless Function — cria uma Stripe Checkout Session a partir
// dos itens do carrinho (múltiplos produtos, com torra/moagem como metadata).
//
// IMPORTANTE: esta function roda no servidor (Node.js), nunca no navegador.
// A variável STRIPE_SECRET_KEY deve ser configurada nas Environment Variables
// do projeto na Vercel — NUNCA deve aparecer no código do front-end.

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Mapeamento dos produtos para os Price IDs criados no Stripe Dashboard.
const PRICE_IDS = {
  original: "price_1TmHeuIxbvKXswaCvG1GJLnI",
  reserva: "price_1TmHfNIxbvKXswaCkgJj3P9Z",
  latinha: "price_1TprDzIxbvKXswaCkdlr8YEX"
};

const TORRA_LABELS = {
  escura: "Torra Escura",
  media: "Torra Média",
  clara: "Torra Clara"
};

const MOAGEM_LABELS = {
  grao: "Em grão",
  moido: "Moído"
};

module.exports = async function handler(req, res) {
  // CORS básico (ajuste o domínio em produção se necessário)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido. Use POST." });
    return;
  }

  try {
    var body = req.body;
    // Em algumas configs da Vercel, req.body já vem parseado; em outras, vem como string.
    if (typeof body === "string") {
      body = JSON.parse(body);
    }
    var items = body && body.items;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "Carrinho vazio ou inválido." });
      return;
    }

    // Validação e montagem dos line_items para o Stripe.
    var line_items = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var priceId = PRICE_IDS[item.produtoId];

      if (!priceId) {
        res.status(400).json({ error: "Produto inválido: " + item.produtoId });
        return;
      }
      if (!item.qty || item.qty < 1) {
        res.status(400).json({ error: "Quantidade inválida para o item " + item.produtoId });
        return;
      }

      line_items.push({
        price: priceId,
        quantity: item.qty
      });
    }

    // Metadata da sessão: resumo legível de torra/moagem por item,
    // já que o Stripe não permite metadata por line_item em Checkout Session
    // (apenas na sessão como um todo, ou via Payment Intent depois).
    var resumoPedido = items.map(function(item) {
      var nome = item.produtoId === "original" ? "Casa Original" : item.produtoId === "reserva" ? "Reserva Rico" : "Reserva Rico Latinha";
      var torra = TORRA_LABELS[item.torra] || item.torra;
      var moagem = MOAGEM_LABELS[item.moagem] || item.moagem;
      return item.qty + "x " + nome + " (" + torra + ", " + moagem + ")";
    }).join(" | ");

    // Trunca para respeitar o limite de 500 caracteres por valor de metadata do Stripe.
    if (resumoPedido.length > 490) {
      resumoPedido = resumoPedido.slice(0, 487) + "...";
    }

    var session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: line_items,
      metadata: {
        resumo_pedido: resumoPedido,
        origem: "site-casa-levy"
      },
      shipping_address_collection: {
        allowed_countries: ["BR"]
      },
      success_url: (body.successUrl || "https://casalevy.com.br/sucesso") + "?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: body.cancelUrl || "https://casalevy.com.br"
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Erro ao criar checkout session:", err);
    res.status(500).json({ error: "Erro ao criar sessão de checkout. Tente novamente." });
  }
};
