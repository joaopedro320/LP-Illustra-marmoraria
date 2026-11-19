# LP Ilustra Marmoraria | QH4 Growth

Landing page de captação (Google Ads + Meta Ads) da **Ilustra Marmoraria** (Barbacena/MG). Produto: High Ticket Stones + Social Media Orbia Plano 1.

## Estrutura
```
index.html            LP principal
obrigado.html         página de obrigado (noindex)
404.html              página de erro personalizada
robots.txt · sitemap.xml · site.webmanifest · vercel.json · favicon.ico
assets/css/style.css  estilos
assets/js/tracking.js CONFIG DE RASTREAMENTO (SLOT 7): WhatsApp, webhook, conversões
assets/js/main.js     animações, galeria, lightbox, formulário
assets/img/           imagens reais (webp), logo transparente, ícones, og-ilustra.jpg
TRACKING-QH4.md       guia dos slots e eventos
```

## Como publicar na Vercel
1. Suba esta pasta (ou o .zip descompactado) como projeto estático. Framework: *Other*, sem build, sem output directory.
2. Aponte o domínio e, se ele mudar, ajuste o canonical (veja pendências).
3. Teste o formulário e o botão do WhatsApp em produção.

## Pendências antes de publicar
- [ ] **GTM / Pixel / gtag**: colar nos slots `[QH4 SLOT 1 a 6]` (index, obrigado e 404, iguais). Ver TRACKING-QH4.md.
- [ ] **Domínio**: canonical, og:url, sitemap.xml e JSON-LD usam `https://marmorariailustra.com/`. Trocar se a LP ficar em outro endereço.
- [ ] **Apps Script**: `WEBHOOK_URL` em `assets/js/tracking.js` está vazio. Sem ele o formulário monta a mensagem completa e manda direto pro WhatsApp. Com ele, envia pra planilha, abre a obrigado e redireciona pro WhatsApp com "Olá, acabei de preencher o formulário no site. Aguardo mais informações."
- [ ] **Conversões do Google Ads**: preencher `ADS_CONVERSAO_WHATSAPP` e `ADS_CONVERSAO_LEAD` no tracking.js (ou disparar pelo GTM).
- [ ] **Instagram da QH4** no rodapé está como `instagram.com/qh4growth/`. Confirmar o link.
- [ ] **WhatsApp**: 5532998245019 (campo do briefing). Se mudar, atualizar `tracking.js` e os links `wa.me` no HTML.
- [ ] Verificar se os dados de domínio/hospedagem do briefing já foram tratados com a antiga empresa.

## Fonte do conteúdo
Tudo vem do briefing (PDF da pasta 01) e das fotos da pasta 02. Nada foi inventado: sem depoimentos, sem números de obras ou anos além dos informados (porcelanato desde 2021, marmoraria desde o fim de 2024). Dados financeiros e o endereço pessoal do formulário de hospedagem **não** foram usados. As avaliações aparecem só como link para o Google.
- Paleta pedida: preto, amarelo e branco (amarelo e off-white tirados da logo). Fonte não definida: Poppins + Inter.
- Referência de gosto do cliente: griffemarmores.com.br (cores e organização das imagens).
- Fotos: usadas só as sem marca ou cortadas para tirar a marca antiga "Ilustra Porcelanataria". Os 6 vídeos da pasta não foram usados.

## Rastreamento (dataLayer)
`whatsapp_click` (com `wa_local`: header, hero, servicos, contato, rodape, flutuante, obrigado, 404, avaliacoes_google), `form_start`, `generate_lead`, `thank_you_view`. Script do IVO instalado na index e na obrigado (não na 404), `data-lp="lp-ilustra-marmoraria"`.

## Checklist de SEO e entrega
- [x] Title e meta description com cidade/nicho · [x] H1 com "Marmoraria" e "perto de você"
- [x] Open Graph completo + Twitter Card (og-ilustra.jpg 1200x630) · [x] canonical
- [x] JSON-LD HomeAndConstructionBusiness + FAQPage · [x] robots.txt · [x] sitemap.xml · [x] site.webmanifest
- [x] width/height nas imagens (CLS), lazy-load e preload da imagem do hero
- [x] vercel.json (headers e cache) · [x] obrigado.html · [x] 404.html personalizada
- [x] Botão do formulário só habilita com tudo válido · [x] WhatsApp flutuante · [x] Rodapé "Desenvolvido por QH4 Growth"
- [x] Animações: reveal no scroll, parallax leve no hero, microinterações, galeria com arraste e lightbox
