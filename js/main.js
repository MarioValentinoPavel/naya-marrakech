// NAYA · «La table vue d'en haut». Carta, mesa simétrica, estado abierto/cerrado y animaciones.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lang = () => document.documentElement.lang || 'fr';
  const T = (fr, en, es) => (window.I18N ? I18N.t(fr, en, es) : fr);
  const txt = (v) => (v == null ? '' : typeof v === 'string' ? v : v[lang()] || v.fr);
  const dh = (n) => `${n.toLocaleString('fr-FR')} DH`;
  const store = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (_) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) { /* sin almacenamiento */ } } };

  // ---------- catálogo: cada cosa que se puede poner en la mesa ----------
  const ITEMS = new Map();
  MENU.forEach((sec) => {
    sec.items.forEach((it) => ITEMS.set(it.id, { ...it, kind: 'dish' }));
    sec.eggs?.items.forEach((it) => ITEMS.set(it.id, { ...it, kind: 'row' }));
    if (sec.extra) ITEMS.set(sec.extra.id, { ...sec.extra, kind: 'row' });
  });
  DRINKS.forEach((g) => g.items.forEach((it) => ITEMS.set(it.id, { ...it, kind: 'drink', side: 'drink' })));

  // ---------- estado de la mesa (se recuerda en este navegador) ----------
  const KEY = 'naya-table';
  const saved = store.get(KEY, { t: [], p: 2 });
  const table = new Map((saved.t || []).filter(([id]) => ITEMS.has(id)));
  let persons = Math.min(12, Math.max(1, saved.p || 2));
  const persist = () => store.set(KEY, { t: [...table], p: persons });

  // ---------- estado abierto / cerrado con la hora de Marrakech ----------
  function status() {
    let mins = null;
    try {
      const p = new Intl.DateTimeFormat('en-GB', { timeZone: SHOP.tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
      mins = +p.find((x) => x.type === 'hour').value * 60 + +p.find((x) => x.type === 'minute').value;
    } catch (_) { /* sin zona horaria: texto fijo */ }
    const open = mins != null && mins >= SHOP.open && mins < SHOP.close;
    const t = mins == null ? T('Tous les jours, 9 h – minuit', 'Every day, 9 am – midnight', 'Todos los días, 9 h – medianoche')
      : open ? T('Ouvert maintenant · jusqu’à minuit', 'Open now · until midnight', 'Abierto ahora · hasta medianoche')
        : T('Fermé · ouvre à 9 h', 'Closed · opens at 9 am', 'Cerrado · abre a las 9 h');
    $$('.js-status').forEach((el) => { el.classList.toggle('is-open', open); const s = $('.js-status-t', el); if (s) s.textContent = t; });
  }

  // ---------- la carta ----------
  const TABS = [...MENU.map((s) => ({ id: s.id, title: s.title })), { id: 'boissons', title: { fr: 'Boissons', en: 'Drinks', es: 'Bebidas' } }];
  let current = 'brunch';

  function qtyHTML(id, label) {
    const q = table.get(id) || 0;
    return `<div class="qty${q ? ' has' : ''}" data-id="${id}">`
      + `<button type="button" class="q-rem" aria-label="${T('Retirer', 'Remove', 'Quitar')} ${label}">−</button>`
      + `<output aria-live="polite">${q}</output>`
      + `<button type="button" class="q-add" aria-label="${T('Ajouter', 'Add', 'Añadir')} ${label} ${T('à ma table', 'to my table', 'a mi mesa')}">+</button></div>`;
  }
  function dishHTML(it) {
    const tile = it.img
      ? `<img src="assets/img/tiles/${it.img}.webp" alt="${it.n}, ${T('vu du dessus', 'seen from above', 'visto desde arriba')}" width="400" height="400" loading="lazy">`
      : `<span>${it.n}</span><em>${T('Photo à venir', 'Photo coming soon', 'Foto próximamente')}</em>`;
    return `<article class="dish" data-id="${it.id}"><div class="dish-tile${it.img ? '' : ' no-photo'}">${tile}${qtyHTML(it.id, it.n)}</div>`
      + `<h3>${it.n}</h3><p class="dish-p">${dh(it.p)}</p>`
      + (it.star ? `<p class="dish-star">${T('L’incontournable de la maison', 'The house classic', 'El imprescindible de la casa')}</p>` : '')
      + `<p class="dish-d">${txt(it.d)}</p></article>`;
  }
  const rowHTML = (it) => `<li class="row"><b>${txt(it.n)}</b><span>${dh(it.p)}</span>${qtyHTML(it.id, txt(it.n))}</li>`;
  const dark = (hex) => { const n = parseInt(hex.slice(1), 16); return (0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) < 110; };
  function swHTML(it) {
    const two = it.c[1] ? ` two" style="--c1:${it.c[0]};--c2:${it.c[1]}` : `" style="--c1:${it.c[0]}`;
    return `<article class="sw" data-id="${it.id}"><div class="sw-c${two}">${qtyHTML(it.id, txt(it.n))}</div>`
      + `<h4>${txt(it.n)}</h4><p>${dh(it.p)}</p>${it.i ? `<small>${txt(it.i)}</small>` : ''}</article>`;
  }
  function renderCarte() {
    const tabs = $('.tabs'), panels = $('.js-panels');
    tabs.innerHTML = TABS.map((t) => `<button class="tab" type="button" role="tab" id="t-${t.id}" aria-controls="p-${t.id}" aria-selected="${t.id === current}" tabindex="${t.id === current ? 0 : -1}">${txt(t.title)}</button>`).join('');
    panels.innerHTML = MENU.map((s) => {
      let h = `<div class="panel" role="tabpanel" id="p-${s.id}" aria-labelledby="t-${s.id}" tabindex="0"${s.id === current ? '' : ' hidden'}><div class="dishes">${s.items.map(dishHTML).join('')}</div>`;
      if (s.eggs) h += `<div class="more"><h3>${txt(s.eggs.title)}</h3><p class="more-note">${txt(s.eggs.note)}</p><ul class="rows">${s.eggs.items.map(rowHTML).join('')}</ul></div>`;
      if (s.extra) h += `<div class="more"><h3>${T('En plus', 'Extra', 'Extra')}</h3><ul class="rows">${rowHTML(s.extra)}</ul></div>`;
      return h + '</div>';
    }).join('') + `<div class="panel" role="tabpanel" id="p-boissons" aria-labelledby="t-boissons" tabindex="0"${current === 'boissons' ? '' : ' hidden'}>`
      + DRINKS.map((g) => `<div class="sw-group"><h3>${txt(g.title)}</h3><div class="sws">${g.items.map(swHTML).join('')}</div></div>`).join('') + '</div>';
  }
  function selectTab(id, focus) {
    current = id;
    $$('.tab').forEach((b) => { const on = b.id === 't-' + id; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
    $$('.panel').forEach((p) => { p.hidden = p.id !== 'p-' + id; });
    const p = $('#p-' + id);
    if (!reduce && window.gsap && p) gsap.fromTo($$('.dish, .sw, .more', p).slice(0, 14), { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: 'power3.out', stagger: .035, clearProps: 'transform,opacity' });
    window.ScrollTrigger?.refresh();
  }
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (tab) { selectTab(tab.id.slice(2)); return; }
    const link = e.target.closest('[data-tab]');
    if (link) { selectTab(link.dataset.tab); }
  });
  document.addEventListener('keydown', (e) => {
    const tab = e.target.closest?.('.tab'); if (!tab) return;
    const all = $$('.tab'), i = all.indexOf(tab);
    const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: all.length - 1 }[e.key];
    if (to == null) return;
    e.preventDefault(); selectTab(all[(to + all.length) % all.length].id.slice(2), true);
  });

  // ---------- la mesa ----------
  const board = $('.js-board'), empty = $('.js-empty'), bill = $('.js-bill');
  const sideOf = (it) => (it.kind === 'drink' ? 'drink' : it.side);
  function setQty(id, q) {
    q = Math.max(0, Math.min(9, q));
    if (q) table.set(id, q); else table.delete(id);
    persist();
    $$(`.qty[data-id="${id}"]`).forEach((el) => { el.classList.toggle('has', q > 0); $('output', el).textContent = q; });
    renderTable(id);
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.q-add, .q-rem'); if (!b) return;
    const id = b.closest('.qty').dataset.id, q = table.get(id) || 0;
    setQty(id, q + (b.classList.contains('q-add') ? 1 : -1));
    if (b.classList.contains('q-add')) toast(`${txt(ITEMS.get(id).n)} · ${T('ajouté à votre table', 'added to your table', 'añadido a tu mesa')}`);
  });
  $$('.js-add-one').forEach((b) => b.addEventListener('click', () => { const id = b.dataset.id; setQty(id, (table.get(id) || 0) + 1); toast(`${txt(ITEMS.get(id).n)} · ${T('ajouté à votre table', 'added to your table', 'añadido a tu mesa')}`); }));
  $('.js-example')?.addEventListener('click', () => { EXAMPLE_TABLE.forEach(([id, q]) => table.set(id, q)); persons = 2; persist(); syncQty(); renderTable(); });
  $('.js-clear')?.addEventListener('click', () => { table.clear(); persist(); syncQty(); renderTable(); });
  $('.js-pp-minus')?.addEventListener('click', () => { persons = Math.max(1, persons - 1); persist(); renderBill(); });
  $('.js-pp-plus')?.addEventListener('click', () => { persons = Math.min(12, persons + 1); persist(); renderBill(); });
  const syncQty = () => $$('.qty').forEach((el) => { const q = table.get(el.dataset.id) || 0; el.classList.toggle('has', q > 0); $('output', el).textContent = q; });

  function tileHTML(it, key, count) {
    const badge = count > 1 ? `<i>×${count}</i>` : '';
    if (it.kind === 'drink') {
      const two = it.c[1] ? ` two" style="--c1:${it.c[0]};--c2:${it.c[1]}` : `" style="--c1:${it.c[0]}`;
      return `<div class="tile drink${dark(it.c[0]) ? ' dark' : ''}${two}" data-k="${key}"><span>${txt(it.n)}</span>${badge}</div>`;
    }
    if (it.img) return `<div class="tile" data-k="${key}"><img src="assets/img/tiles/${it.img}.webp" alt="" width="400" height="400">${badge}</div>`;
    return `<div class="tile no-photo" data-k="${key}"><span>${txt(it.n)}</span>${badge}</div>`;
  }
  function renderTable(added) {
    const rows = [...table].map(([id, q]) => ({ it: ITEMS.get(id), id, q }));
    const sale = rows.filter((r) => sideOf(r.it) === 'sale'), sucre = rows.filter((r) => sideOf(r.it) === 'sucre'), drinks = rows.filter((r) => sideOf(r.it) === 'drink');
    const n = rows.length;
    empty.hidden = n > 0; bill.hidden = n === 0;
    // FLIP: posición de cada pieza antes de recolocar la mesa
    const before = new Map($$('.tile', board).map((t) => [t.dataset.k, t.getBoundingClientRect()]));
    // se mide el tablero (el contenedor vacío está oculto y daría 0)
    const host = board.parentElement, hs = getComputedStyle(host);
    const W = (host.clientWidth - parseFloat(hs.paddingLeft) - parseFloat(hs.paddingRight)) || 800, gap = W < 560 ? 8 : 14;
    const most = Math.max(sale.length, sucre.length, 1);
    const cols = W < 560 ? (most <= 2 ? 1 : most <= 6 ? 2 : 3) : (most <= 1 ? 1 : most <= 4 ? 2 : most <= 9 ? 3 : 4);
    const half = (W - gap) / 2;
    const ts = Math.floor(Math.min(W < 560 ? 132 : 190, (half - (cols - 1) * gap) / cols));
    const per = W < 560 ? 3 : Math.max(4, Math.min(drinks.length, 8));
    const dts = Math.floor(Math.min(W < 560 ? ts * .78 : ts * .72, (W - (per - 1) * gap) / per));
    board.style.setProperty('--bg', gap + 'px');
    const half$ = (list, side) => {
      if (!list.length && n) return `<div class="b-half b-${side} b-none"><p>${side === 'sale' ? T('Côté salé', 'Savoury side', 'Lado salado') : T('Côté sucré', 'Sweet side', 'Lado dulce')}</p><a href="#carte" data-tab="${side === 'sale' ? 'brunch' : 'desserts'}" class="link-u">${T('Choisir', 'Choose', 'Elegir')}</a></div>`;
      return `<div class="b-half b-${side}" style="--ts:${ts}px">${list.map((r) => tileHTML(r.it, r.id, r.q)).join('')}</div>`;
    };
    board.innerHTML = n ? (drinks.length ? `<div class="b-drinks" style="--ts:${dts}px">${drinks.map((r) => tileHTML(r.it, r.id, r.q)).join('')}</div>` : '')
      + half$(sale, 'sale') + half$(sucre, 'sucre') : '';
    if (!reduce) {
      $$('.tile', board).forEach((t) => {
        const a = before.get(t.dataset.k), b = t.getBoundingClientRect();
        if (a) {
          const dx = a.left - b.left, dy = a.top - b.top, s = a.width / b.width;
          if (Math.abs(dx) + Math.abs(dy) > 1 || Math.abs(1 - s) > .01) t.animate([{ transform: `translate(${dx}px, ${dy}px) scale(${s})` }, { transform: 'none' }], { duration: 520, easing: 'cubic-bezier(.23, 1, .32, 1)' });
        } else {
          t.animate([{ transform: 'translateY(-28px) scale(1.06)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 560, easing: 'cubic-bezier(.23, 1, .32, 1)', delay: added && t.dataset.k === added ? 0 : 40 });
        }
      });
    }
    renderBill();
  }
  function renderBill() {
    const rows = [...table].map(([id, q]) => ({ it: ITEMS.get(id), q }));
    const total = rows.reduce((s, r) => s + r.it.p * r.q, 0), count = rows.reduce((s, r) => s + r.q, 0);
    $('.js-bill-list').innerHTML = rows.map((r) => `<li><span>${r.q} ×</span><b>${txt(r.it.n)}</b><span>${dh(r.it.p * r.q)}</span></li>`).join('');
    $('.js-total').textContent = dh(total);
    $('.js-pp').textContent = persons;
    const pp = Math.round(total / persons);
    $('.js-pp-txt').textContent = persons === 1 ? T('personne', 'person', 'persona')
      : T(`personnes, soit ${dh(pp)} par personne`, `people, that is ${dh(pp)} each`, `personas, es decir ${dh(pp)} por persona`);
    const pill = $('.js-pill');
    pill.hidden = count === 0;
    $('.js-pill-n').textContent = count; $('.js-pill-t').textContent = dh(total);
    return { rows, total };
  }
  $('.js-copy')?.addEventListener('click', async () => {
    const { rows, total } = renderBill();
    const lines = [T('Ma table chez NAYA', 'My table at NAYA', 'Mi mesa en NAYA'), ...rows.map((r) => `${r.q} × ${txt(r.it.n)} · ${dh(r.it.p * r.q)}`),
      `${T('Total', 'Total', 'Total')} : ${dh(total)}` + (persons > 1 ? ` (${persons} ${T('personnes', 'people', 'personas')}, ${dh(Math.round(total / persons))} ${T('chacun', 'each', 'cada uno')})` : ''),
      'NAYA · Rue Hassania, Guéliz, Marrakech · 07 15 47 92 27'];
    const text = lines.join('\n');
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; } catch (_) {
      const ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
      try { ok = document.execCommand('copy'); } catch (__) { ok = false; } ta.remove();
    }
    toast(ok ? T('Liste copiée', 'List copied', 'Lista copiada') : T('Impossible de copier', 'Could not copy', 'No se ha podido copiar'));
  });

  let toastT;
  function toast(msg) {
    const el = $('.js-toast'); el.textContent = msg; el.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 1900);
  }

  // ---------- menú móvil ----------
  const menu = $('#menu'), mbtn = $('.menu-btn');
  function setMenu(open) {
    menu.hidden = !open; mbtn.setAttribute('aria-expanded', String(open));
    $('span', mbtn).textContent = open ? T('Fermer', 'Close', 'Cerrar') : T('Menu', 'Menu', 'Menú');
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) { window.lenis?.stop(); $('a', menu)?.focus(); } else window.lenis?.start();
  }
  mbtn?.addEventListener('click', () => setMenu(menu.hidden));
  menu?.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); mbtn.focus(); } });

  // ---------- desplazamiento suave y anclas ----------
  const navH = () => $('.top').offsetHeight;
  if (!reduce && window.Lenis) {
    window.lenis = new Lenis({ lerp: .11, wheelMultiplier: .95 });
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
    } else { const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
  } else if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const el = document.querySelector(id); if (!el) return;
    e.preventDefault();
    const y = el.getBoundingClientRect().top + scrollY - (id === '#accueil' ? 0 : navH() - 1);
    if (window.lenis) lenis.scrollTo(y, { duration: 1.2 }); else scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', id);
  });

  // ---------- cabecera, barra móvil y píldora ----------
  const top = $('.top'), mbar = $('.mbar'), pill = $('.js-pill'), tableSec = $('#table'), hero = $('.hero');
  function onScroll() {
    const y = scrollY;
    top.classList.toggle('scrolled', y > 24);
    const pastHero = y > hero.offsetHeight * .6;
    mbar?.classList.toggle('off', !pastHero);
    const r = tableSec.getBoundingClientRect(), end = $('#trouver').getBoundingClientRect().top < innerHeight * .9;
    pill.classList.toggle('off', !pastHero || (r.top < innerHeight * .85 && r.bottom > innerHeight * .2) || end);
  }
  addEventListener('scroll', onScroll, { passive: true });

  // ---------- vídeo de cocina: solo suena la imagen, y solo en pantalla ----------
  const vid = $('.js-vid'), vbtn = $('.js-vid-btn');
  let userPaused = reduce;
  if (vid) {
    const sync = () => { vbtn.setAttribute('aria-pressed', String(vid.paused)); vbtn.setAttribute('aria-label', vid.paused ? T('Lire la vidéo', 'Play the video', 'Reproducir el vídeo') : T('Mettre la vidéo en pause', 'Pause the video', 'Pausar el vídeo')); };
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !userPaused) { vid.preload = 'auto'; vid.play().catch(() => {}); } else vid.pause();
    }, { threshold: .25 }).observe(vid);
    vbtn.addEventListener('click', () => { if (vid.paused) { userPaused = false; vid.play().catch(() => {}); } else { userPaused = true; vid.pause(); } });
    vid.addEventListener('play', sync); vid.addEventListener('pause', sync); sync();
  }

  // ---------- Le Beldi: líneas de cada etiqueta a su pieza, medidas sobre la foto ----------
  const lines = $('.js-lines'), bimg = $('.beldi-plate img');
  function drawLines() {
    if (!lines || !bimg || getComputedStyle(lines).display === 'none') return;
    const st = lines.getBoundingClientRect(), ir = bimg.getBoundingClientRect();
    if (!ir.width || !st.width) return;
    lines.setAttribute('viewBox', `0 0 ${st.width.toFixed(1)} ${st.height.toFixed(1)}`);
    lines.innerHTML = $$('.pt[data-to]').map((li) => {
      const [fx, fy] = li.dataset.to.split(',').map(Number);
      const b = $('b', li).getBoundingClientRect(), left = !!li.closest('.beldi-l');
      const ax = (left ? b.right + 16 : b.left - 16) - st.left, ay = b.top + b.height * .56 - st.top;
      const tx = ir.left + fx * ir.width - st.left, ty = ir.top + fy * ir.height - st.top;
      const mx = left ? Math.min(tx - 26, ax + (tx - ax) * .55) : Math.max(tx + 26, ax + (tx - ax) * .55);
      const f = (n) => n.toFixed(1);
      return `<path pathLength="1" d="M${f(ax)} ${f(ay)}H${f(mx)}L${f(tx)} ${f(ty)}"/><circle cx="${f(ax)}" cy="${f(ay)}" r="3"/><circle class="ring" cx="${f(tx)}" cy="${f(ty)}" r="5.5"/>`;
    }).join('');
    if (reduce || !window.gsap) lines.classList.add('drawn');
  }
  if (bimg) { if (bimg.complete) drawLines(); else bimg.addEventListener('load', drawLines); }

  // ---------- animaciones ----------
  function splitWords(el) {
    if (el.dataset.done) return;
    const t = el.textContent.trim();
    el.setAttribute('aria-label', t);
    el.innerHTML = t.split(/\s+/).map((w) => `<span class="w" aria-hidden="true"><span>${w}</span></span>`).join(' ');
    el.dataset.done = 1;
  }
  function animate() {
    const html = document.documentElement;
    if (reduce || !window.gsap || !window.ScrollTrigger) { html.classList.remove('pre'); return; }
    const mobile = matchMedia('(max-width: 760px), (max-width: 1100px) and (orientation: portrait)').matches;
    // arranque: se sirve el plato y el nombre sale de detrás, a cada lado
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, onStart: () => html.classList.remove('pre') });
    tl.fromTo('.mono-plate', { y: mobile ? 40 : 70, rotation: -14, scale: .9, opacity: 0 }, { y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1.15 })
      .fromTo('.mono-l .mono-i', mobile ? { yPercent: 105 } : { xPercent: 102 }, { xPercent: 0, yPercent: 0, duration: 1.1, ease: 'expo.out' }, .55)
      .fromTo('.mono-r .mono-i', mobile ? { yPercent: -105 } : { xPercent: -102 }, { xPercent: 0, yPercent: 0, duration: 1.1, ease: 'expo.out' }, .55)
      .fromTo('[data-h]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .08, clearProps: 'transform,opacity' }, 1.05);
    // al bajar, la mesa gira un poco y el nombre se abre
    gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      .to('.mono-plate', { rotation: mobile ? 0 : 24, y: mobile ? 0 : '6vh', ease: 'none' }, 0)
      .to('.mono-l', mobile ? { y: '-3vh' } : { x: '-4vw', ease: 'none' }, 0)
      .to('.mono-r', mobile ? { y: '3vh' } : { x: '4vw', ease: 'none' }, 0);
    // títulos palabra a palabra
    $$('[data-split]').forEach((h) => {
      splitWords(h);
      gsap.fromTo($$('.w > span', h), { yPercent: 105 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: .055, scrollTrigger: { trigger: h, start: 'top 88%', toggleActions: 'play none none none' } });
    });
    // piezas de cada sección: título, texto y luego imagen, escalonados al entrar
    const ups = $$('[data-up]');
    gsap.set(ups, { opacity: 0 });
    ScrollTrigger.batch(ups, { start: 'top 90%', onEnter: (b) => gsap.fromTo(b, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: 'power3.out', stagger: .08, clearProps: 'transform,opacity' }) });
    // los dos platos giran en espejo con el scroll
    gsap.fromTo('.duo-l .duo-a', { rotation: -16 }, { rotation: 12, ease: 'none', scrollTrigger: { trigger: '.duo', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo('.duo-r .duo-a', { rotation: 16 }, { rotation: -12, ease: 'none', scrollTrigger: { trigger: '.duo', start: 'top bottom', end: 'bottom top', scrub: true } });
    // Le Beldi: aparecen el plato y las etiquetas, y cada línea se dibuja hasta su pieza
    gsap.set('.beldi-plate, .beldi-stage .pt', { opacity: 0 });
    ScrollTrigger.create({ trigger: '.beldi-stage', start: 'top 72%', toggleActions: 'play none none none', onEnter: () => {
      gsap.to('.beldi-plate', { opacity: 1, duration: .9, ease: 'power2.out' });
      gsap.to('.beldi-stage .pt', { opacity: 1, duration: .8, stagger: .12, delay: .25, ease: 'power2.out' });
      drawLines(); requestAnimationFrame(() => lines?.classList.add('drawn'));
    } });
    // fachada y cocina: se abren desde el eje
    const doors = { '.tri-l .tri-m': 'inset(0 0 0 100%)', '.tri-c .tri-m': 'inset(0 50% 0 50%)', '.tri-r .tri-m': 'inset(0 100% 0 0)' };
    Object.entries(doors).forEach(([s, from], i) => gsap.fromTo(s, { clipPath: from }, { clipPath: 'inset(0 0% 0 0%)', duration: 1.4, ease: 'expo.inOut', delay: i === 1 ? .12 : 0, scrollTrigger: { trigger: '.tri', start: 'top 78%', toggleActions: 'play none none none' } }));
    gsap.fromTo('.tri-m img, .tri-m video', { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.tri', start: 'top bottom', end: 'bottom top', scrub: true } });
    // la nota sube hasta 4,7
    const sn = $('.score-n');
    if (sn) ScrollTrigger.create({ trigger: sn, start: 'top 85%', onEnter: () => { const o = { v: 0 }; gsap.to(o, { v: 4.7, duration: 1.6, ease: 'power2.out', onUpdate: () => { sn.textContent = o.v.toFixed(1).replace('.', ','); } }); } });
    // el nombre del pie sube letra a letra
    gsap.fromTo('.foot-name span', { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: .07, scrollTrigger: { trigger: '.foot', start: 'top 80%', toggleActions: 'play none none none' } });
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }

  // ---------- arranque ----------
  // i18n.js reescribe los textos al cargar: se anima después, y al cambiar de idioma los títulos se vuelven a partir ya visibles
  function paint() {
    renderCarte(); renderTable(); status();
    document.title = T('NAYA · Brunch & Dessert à Guéliz, Marrakech', 'NAYA · Brunch & Dessert in Guéliz, Marrakech', 'NAYA · Brunch y postres en Guéliz, Marrakech');
  }
  let started = false;
  function boot() { if (started) return; started = true; paint(); onScroll(); animate(); }
  function resplit() {
    $$('[data-split]').forEach((h) => { delete h.dataset.done; splitWords(h); });
  }
  document.addEventListener('langchange', () => { if (!started) boot(); else { paint(); if (!reduce) resplit(); drawLines(); } });
  document.fonts?.ready.then(drawLines);
  if (!window.I18N) boot();
  setTimeout(boot, 2500);
  setInterval(status, 60 * 1000);
  let rw = innerWidth;
  addEventListener('resize', () => { drawLines(); if (Math.abs(innerWidth - rw) > 40) { rw = innerWidth; renderTable(); } });
})();
