# Elite Controle e Conservação — Landing Page

Landing page estática, sem build e sem dependências. Basta subir a pasta na Vercel.

---

## 1. Antes de publicar, ajuste estes 5 pontos

| # | O que ajustar | Onde |
|---|---|---|
| 1 | **Número do WhatsApp** | `assets/js/main.js`, primeira linha do `CONFIG`. Formato: `55` + DDD + número, só dígitos. O número atual está como `553499399041`. **Confira se não falta o nono dígito**, porque celular no Brasil costuma ter 9 dígitos depois do DDD. Trocar ali atualiza os 15 botões da página. Depois, para deixar redondo, faça um localizar e substituir de `553499399041` no `index.html` também: lá estão os links de reserva que funcionam mesmo se o JavaScript não carregar. |
| 2 | **Depoimentos** | `index.html`, seção `id="depoimentos"`. Os três cards estão com texto modelo entre colchetes. Cole avaliações reais do Google, WhatsApp ou Instagram. Se ainda não tiver avaliações, apague a seção inteira. |
| 3 | **Região de atendimento** | `index.html`: rodapé (`Atendimento no Triângulo Mineiro e região`) e o campo `areaServed` no JSON-LD, perto do fim do arquivo. Troque pelas cidades que vocês realmente atendem. Isso pesa no Google local. |
| 4 | **Domínio** | O domínio com acento aparece em formato técnico (`xn--elitecontroleconservao-x4b9g.com`) nas tags `canonical`, `og:url`, `robots.txt` e `sitemap.xml`. Se registrarem também a versão sem acento (`elitecontroleconservacao.com`), use ela como principal e aponte a outra por redirecionamento. |
| 5 | **Garantia e comprovante** | As seções de diferenciais e dúvidas citam garantia do serviço e emissão de comprovante de execução. Confirme os prazos e a documentação que a empresa realmente entrega, e ajuste os textos. |

Opcional: CNPJ e responsável técnico já estão comentados no rodapé do `index.html`, prontos para descomentar.

---

## 2. Publicar na Vercel

### Opção A — pelo site da Vercel (mais rápido)
1. Acesse `vercel.com`, clique em **Add New > Project**.
2. Escolha **Deploy without Git** e arraste a pasta do projeto, ou conecte o repositório.
3. Framework Preset: **Other**. Build Command: deixe vazio. Output Directory: deixe vazio.
4. Clique em **Deploy**.

### Opção B — pelo terminal
```bash
npm i -g vercel
cd elite-lp
vercel --prod
```
Quando perguntar o diretório do projeto, confirme a pasta atual. Não há build step.

### Domínio próprio
1. No painel do projeto: **Settings > Domains > Add**.
2. Digite `elitecontroleconservação.com`. A Vercel converte sozinha para o formato técnico.
3. No registrador do domínio, aponte os registros que a Vercel mostrar:
   - `A` do domínio raiz para `76.76.21.21`
   - `CNAME` de `www` para `cname.vercel-dns.com`
4. Propagação leva de alguns minutos a 24 horas. O HTTPS é emitido sozinho.

---

## 3. Estrutura

```
elite-lp/
├── index.html              página única, com o conteúdo e os dados estruturados
├── vercel.json             cache, headers de segurança, cleanUrls
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── favicon.ico
└── assets/
    ├── css/style.css       design system completo (tokens, componentes, responsivo)
    ├── js/main.js          CONFIG do WhatsApp, menu, FAQ, formulário, animações
    ├── fonts/              Cinzel e Inter locais, sem chamada externa
    └── img/                logo, foto do técnico, frota, ícones e og-image
```

---

## 4. Como a conversão funciona

Todo caminho da página termina no WhatsApp:

- Botão fixo no topo, em todas as telas
- CTA duplo no herói
- CTA depois da seção de sinais de infestação
- CTA próprio dentro de cada card de serviço, com mensagem já escrita para aquele serviço
- CTA na seção de estrutura
- Formulário que monta a mensagem e abre o WhatsApp com nome, serviço, tipo de imóvel e local
- CTA no fim da página
- Botão flutuante no desktop e barra fixa no rodapé do celular

Nenhum deles depende de servidor ou backend. O formulário não envia e-mail, ele monta a mensagem e abre o WhatsApp.

---

## 5. Pixel e Google Analytics

O `main.js` já dispara os eventos quando existe `gtag` ou `fbq` na página:

- `gtag('event', 'contato_whatsapp')`
- `fbq('track', 'Contact')`

Para ativar, cole o script do GA4 ou do Pixel da Meta antes de `</head>` no `index.html`. Nada mais precisa ser mexido.

---

## 6. Editar o conteúdo

O texto todo está no `index.html`, em português e sem template engine. Para trocar as cores, os tokens ficam no topo do `assets/css/style.css`, no bloco `:root`. A paleta dourada foi extraída da própria logo:

| Token | Cor | Uso |
|---|---|---|
| `--gold-300` | `#FBDC8D` | brilho alto, títulos em destaque |
| `--gold-400` | `#EEBF53` | ícones, detalhes |
| `--gold-500` | `#C89B3C` | dourado principal |
| `--gold-700` | `#79510C` | sombra do gradiente |
| `--black` | `#030303` | fundo |
