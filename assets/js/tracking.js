/* ============================================================
   QH4 | CONFIGURAÇÃO DE RASTREAMENTO (SLOT 7)
   Edite só este bloco. Veja TRACKING-QH4.md.
   ============================================================ */
window.QH4 = {
  LP: 'lp-ilustra-marmoraria',
  // Número do WhatsApp (DDI + DDD + número, só dígitos)
  WHATSAPP: '5532998245019',
  // Google Apps Script (Web App). Vazio = o formulário monta a mensagem completa
  // com os campos e envia direto pro WhatsApp. Preenchido = envia pra planilha,
  // abre a página de obrigado e redireciona pro WhatsApp com mensagem curta.
  WEBHOOK_URL: '',
  MSG_WEBHOOK: 'Olá, acabei de preencher o formulário no site. Aguardo mais informações.',
  MSG_CTA: 'Olá! Vim pelo site da Ilustra Marmoraria e gostaria de pedir um orçamento.',
  // Rótulos de conversão do Google Ads (opcional, SLOT 4 / SLOT 8)
  ADS_CONVERSAO_WHATSAPP: '',   // ex.: 'AW-XXXXXXXXX/AbCdEfGh'
  ADS_CONVERSAO_LEAD: ''        // ex.: 'AW-XXXXXXXXX/AbCdEfGh'
};
window.dataLayer = window.dataLayer || [];
window.QH4.push = function (name, extra) {
  var p = { event: name, lp: window.QH4.LP };
  for (var k in (extra || {})) p[k] = extra[k];
  window.dataLayer.push(p);
};
window.QH4.adsConv = function (label) {
  if (label && typeof window.gtag === 'function') window.gtag('event', 'conversion', { send_to: label });
};
/* whatsapp_click: qualquer link para wa.me; data-local diz de onde veio */
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href*="wa.me"]');
  if (!a) return;
  window.QH4.push('whatsapp_click', { wa_local: a.getAttribute('data-local') || 'outro' });
  window.QH4.adsConv(window.QH4.ADS_CONVERSAO_WHATSAPP);
});
