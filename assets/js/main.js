/* =========================================================
   ELITE CONTROLE E CONSERVAÇÃO
   Interações da landing page
   ---------------------------------------------------------
   TROQUE O NÚMERO E AS MENSAGENS AQUI EMBAIXO.
   Todos os botões da página são atualizados automaticamente.
   ========================================================= */

const CONFIG = {
  // Número do WhatsApp no formato internacional, só dígitos: 55 + DDD + número
  whatsapp: '5534999399041',

  // Mensagem que já vem escrita quando o cliente abre o WhatsApp
  mensagens: {
    geral:          'Olá! Vim pelo site da Elite e gostaria de um orçamento.',
    urgencia:       'Olá! Estou com um problema de praga e preciso de atendimento. Vim pelo site da Elite.',
    agendar:        'Olá! Vim pelo site da Elite e gostaria de agendar um atendimento.',
    duvida:         'Olá! Vim pelo site da Elite e fiquei com uma dúvida sobre o serviço.',
    dedetizacao:    'Olá! Vim pelo site e quero um orçamento de dedetização (baratas e insetos).',
    desratizacao:   'Olá! Vim pelo site e quero um orçamento de desratização (ratos).',
    descupinizacao: 'Olá! Vim pelo site e quero um orçamento de descupinização (cupins).',
    caixa:          'Olá! Vim pelo site e quero um orçamento de limpeza de caixa d’água.'
  }
};

(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Links de WhatsApp ---------- */
  const waLink = (chave) => {
    const texto = CONFIG.mensagens[chave] || CONFIG.mensagens.geral;
    return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texto);
  };

  $$('.js-wa').forEach((el) => {
    el.href = waLink(el.dataset.msg);
    el.target = '_blank';
    el.rel = 'noopener';
  });

  /* ---------- Telefone visível ---------- */
  const formataTelefone = (num) => {
    const d = String(num).replace(/\D/g, '').replace(/^55/, '');
    const ddd = d.slice(0, 2);
    const resto = d.slice(2);
    if (resto.length === 9) return `(${ddd}) ${resto.slice(0, 5)}-${resto.slice(5)}`;
    if (resto.length === 8) return `(${ddd}) ${resto.slice(0, 4)}-${resto.slice(4)}`;
    return `(${ddd}) ${resto}`;
  };
  const telefone = formataTelefone(CONFIG.whatsapp);
  $$('.js-phone-display').forEach((el) => { el.textContent = telefone; });

  /* ---------- Header fixo ---------- */
  const header = $('#header');
  const mobar = $('#mobar');
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-stuck', y > 24);
    if (mobar) mobar.classList.toggle('is-show', y > 520);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const burger = $('#burger');
  const nav = $('#nav');

  const fechaMenu = () => {
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-open');
  };

  burger.addEventListener('click', () => {
    const aberto = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', aberto);
    burger.setAttribute('aria-expanded', String(aberto));
    burger.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', aberto);
  });

  $$('#nav a').forEach((a) => a.addEventListener('click', fechaMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechaMenu(); });
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') && !nav.contains(e.target) && !burger.contains(e.target)) fechaMenu();
  });

  /* ---------- Animação de entrada ---------- */
  const alvos = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    alvos.forEach((el) => obs.observe(el));
  } else {
    alvos.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- FAQ em acordeão ---------- */
  const itens = $$('#faq .faq__item');
  itens.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) itens.forEach((o) => { if (o !== item) o.open = false; });
    });
  });

  /* ---------- Formulário que abre o WhatsApp ---------- */
  const form = $('#form-orcamento');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const obrigatorios = ['nome', 'servico', 'tipo', 'local'];
      let valido = true;

      obrigatorios.forEach((nome) => {
        const campo = form.elements[nome];
        const box = campo.closest('.field');
        const ok = campo.value.trim() !== '';
        box.classList.toggle('is-invalid', !ok);
        if (!ok && valido) { campo.focus(); valido = false; }
      });

      if (!valido) return;

      const d = {
        nome: form.elements.nome.value.trim(),
        servico: form.elements.servico.value,
        tipo: form.elements.tipo.value,
        local: form.elements.local.value.trim(),
        mensagem: form.elements.mensagem.value.trim()
      };

      const linhas = [
        'Olá! Vim pelo site da Elite e quero um orçamento.',
        '',
        `Nome: ${d.nome}`,
        `Serviço: ${d.servico}`,
        `Tipo de imóvel: ${d.tipo}`,
        `Local: ${d.local}`
      ];
      if (d.mensagem) linhas.push('', `Situação: ${d.mensagem}`);

      const url = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(linhas.join('\n'));

      if (typeof gtag === 'function') gtag('event', 'contato_whatsapp', { metodo: 'formulario' });
      window.open(url, '_blank', 'noopener');
    });

    form.addEventListener('input', (e) => {
      const box = e.target.closest('.field');
      if (box && e.target.value.trim() !== '') box.classList.remove('is-invalid');
    });
    form.addEventListener('change', (e) => {
      const box = e.target.closest('.field');
      if (box && e.target.value.trim() !== '') box.classList.remove('is-invalid');
    });
  }

  /* ---------- Evento de clique nos botões de WhatsApp ---------- */
  $$('.js-wa').forEach((el) => {
    el.addEventListener('click', () => {
      if (typeof gtag === 'function') gtag('event', 'contato_whatsapp', { metodo: el.dataset.msg || 'botao' });
      if (typeof fbq === 'function') fbq('track', 'Contact');
    });
  });

  /* ---------- Ano do rodapé ---------- */
  const ano = $('#ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
