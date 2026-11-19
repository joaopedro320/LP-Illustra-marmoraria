# Rastreamento | LP Ilustra Marmoraria

Os slots abaixo existem, comentados e iguais, em `index.html`, `obrigado.html` e `404.html`.

| Slot | Onde | O que colar |
|---|---|---|
| 1 | `<head>` | GTM (script) |
| 2 | `<head>` | Metas de verificação de domínio |
| 3 | `<head>` | Meta Pixel direto (só se não for pelo GTM) |
| 4 | `<head>` | gtag Google Ads / GA4 (só se não usar GTM) |
| 5 | após `<body>` | GTM noscript |
| 6 | antes do `</body>` | Scripts de terceiros (Clarity, chat etc.) |
| 7 | `assets/js/tracking.js` | WhatsApp, webhook Apps Script, rótulos de conversão |
| 8 | `obrigado.html` | Conversão de lead (gtag/fbq) |

## Eventos de dataLayer
- `whatsapp_click`: `wa_local` = header, hero, servicos, contato, rodape, flutuante, obrigado, 404, avaliacoes_google
- `form_start`: primeiro foco no formulário
- `generate_lead`: envio válido (`lead_projeto`, `lead_cidade`)
- `thank_you_view`: abertura da obrigado.html

## Fluxo do formulário
- `WEBHOOK_URL` vazio: monta mensagem com todos os campos, abre o WhatsApp e leva a aba atual para a obrigado.
- `WEBHOOK_URL` preenchido: POST (JSON, `text/plain`) com nome, whatsapp, projeto, cidade, detalhes, UTMs, gclid/fbclid; abre `obrigado.html?r=1`, que redireciona ao WhatsApp com "Olá, acabei de preencher o formulário no site. Aguardo mais informações."
