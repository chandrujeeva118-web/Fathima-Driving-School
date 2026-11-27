/* Fathima Driving School - plain JavaScript (no libraries) */
(function () {
  'use strict';

  // ---- Settings you may change ----
  var CFG = {
    wa: '919751709990',   // WhatsApp number (country code + number)
    endpoint: ''          // Optional: a Formspree/other form URL. Leave '' to send enquiries via WhatsApp.
  };

  var d = document, root = d.documentElement, body = d.body;
  root.classList.remove('no-js');
  var rm = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (rm) body.classList.add('rm');
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || d).querySelectorAll(s)); };

  // ---- Icons (injected once so every page can use <use href="#i-name">) ----
  var I = {
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    chat: '<path d="M4 20l1.4-4.2A8 8 0 1 1 8.4 18.8z"/><path d="M9 9.5c.5 2 2.5 4 5 5l1.2-1.2-2-1-.8.8c-.8-.4-1.6-1.2-2-2l.8-.8-1-2z"/>',
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
    car: '<path d="M3 15v-3l2-5h14l2 5v3"/><path d="M3 15h18v3H3z"/><circle cx="7.5" cy="18" r="1.8"/><circle cx="16.5" cy="18" r="1.8"/>',
    bike: '<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16l4-6h5l3 6M10 10l-1-3H7M15 10l-1-3h3"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    route: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H14a3 3 0 0 1 0 6h-4a3 3 0 0 0 0 6h5.5"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    flag: '<path d="M5 21V4M5 5h12l-2 4 2 4H5"/>',
    wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 14v7M10 11.5L4 10M14 11.5l6-1.5"/>'
  };
  var sp = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true">';
  for (var k in I) sp += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + I[k] + '</symbol>';
  body.insertAdjacentHTML('afterbegin', sp + '</svg>');

  // ---- Animated vehicles (SVG) ----
  function wheel(x, y, r) {
    return '<g transform="translate(' + x + ' ' + y + ')"><g class="wheel"><circle r="' + r + '" fill="#14171B"/><circle r="' + (r * .62) + '" fill="#d5dbe0"/><circle r="' + (r * .62) + '" fill="none" stroke="#14171B" stroke-width="2"/><g stroke="#9aa4af" stroke-width="2.5" stroke-linecap="round"><line x1="-9" y1="0" x2="9" y2="0"/><line x1="0" y1="-9" x2="0" y2="9"/><line x1="-6.5" y1="-6.5" x2="6.5" y2="6.5"/><line x1="-6.5" y1="6.5" x2="6.5" y2="-6.5"/></g><circle r="3" fill="#14171B"/></g></g>';
  }
  function lp(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><rect width="16" height="16" rx="2" fill="#fff" stroke="#D62828" stroke-width="1.5"/><path d="M5 3v10h7v-2.4H7.6V3z" fill="#D62828"/></g>';
  }
  var V = {
    car: '<svg class="veh" viewBox="0 0 240 100" role="img" aria-label="Learner car with an L plate"><ellipse cx="120" cy="94" rx="104" ry="4" fill="rgba(0,0,0,.3)"/><polygon points="226,60 262,50 262,72" fill="rgba(255,255,255,.12)"/><rect x="14" y="52" width="212" height="26" rx="10" fill="#F5C518"/><path d="M62 52 L84 26 Q88 22 94 22 H146 Q152 22 156 26 L180 52 Z" fill="#F5C518"/><path d="M72 50 L90 30 H118 V50 Z" fill="#BFE3F5"/><path d="M124 30 H146 L164 50 H124 Z" fill="#BFE3F5"/><circle cx="104" cy="40" r="6" fill="#3b2a20"/><rect x="102" y="45" width="5" height="6" fill="#3b2a20"/><path d="M121 52 V76" stroke="rgba(0,0,0,.25)" stroke-width="2"/><rect x="218" y="58" width="9" height="7" rx="2" fill="#fff"/><rect x="13" y="58" width="6" height="8" rx="2" fill="#D62828"/>' + lp(132, 58, 1) + wheel(56, 78, 17) + wheel(184, 78, 17) + '</svg>',
    bike: '<svg class="veh" viewBox="0 0 200 110" role="img" aria-label="Learner motorcycle rider with an L plate"><ellipse cx="100" cy="104" rx="86" ry="4" fill="rgba(0,0,0,.3)"/><polygon points="150,46 190,36 190,62" fill="rgba(255,255,255,.12)"/><path d="M46 84 L84 62 H124 L154 84" stroke="#14171B" stroke-width="6" fill="none" stroke-linejoin="round"/><path d="M84 60 Q92 42 116 44 L128 60 Z" fill="#F5C518"/><rect x="58" y="54" width="34" height="7" rx="3" fill="#14171B"/><line x1="154" y1="84" x2="140" y2="46" stroke="#14171B" stroke-width="5" stroke-linecap="round"/><line x1="134" y1="44" x2="150" y2="38" stroke="#14171B" stroke-width="5" stroke-linecap="round"/><circle cx="146" cy="50" r="5" fill="#fff"/><line x1="86" y1="52" x2="98" y2="30" stroke="#E8ECEF" stroke-width="13" stroke-linecap="round"/><line x1="98" y1="32" x2="136" y2="44" stroke="#E8ECEF" stroke-width="6" stroke-linecap="round"/><polyline points="88,54 112,66 106,84" fill="none" stroke="#1b3a5c" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="100" cy="19" r="10" fill="#D62828"/>' + lp(22, 54, .85) + wheel(46, 84, 20) + wheel(154, 84, 20) + '</svg>'
  };
  $$('.veh-slot').forEach(function (el) { el.innerHTML = V[el.getAttribute('data-vehicle')] || V.car; });
  $$('.veh-slot.enter').forEach(function (el) {
    el.addEventListener('animationend', function () { el.classList.remove('enter'); });
  });

  // ---- Vehicle toggle (home hero) ----
  var heroSlot = $('.stage .veh-slot'), jSlot = $('.j-car .veh-slot');
  var courseLink = $('[data-course-link]');
  function swap(slot, t) {
    if (!slot) return;
    if (rm) { slot.innerHTML = V[t]; return; }
    slot.classList.add('out');
    setTimeout(function () {
      slot.innerHTML = V[t];
      slot.classList.remove('out');
      slot.classList.add('pre');
      void slot.offsetWidth;
      slot.classList.remove('pre');
    }, 650);
  }
  $$('[data-set-vehicle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.getAttribute('data-set-vehicle');
      $$('[data-set-vehicle]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      swap(heroSlot, t);
      if (jSlot) jSlot.innerHTML = V[t];
      if (courseLink) {
        courseLink.href = t === 'car' ? 'four-wheeler-driving-classes-srivilliputtur.html' : 'two-wheeler-riding-classes-srivilliputtur.html';
        $('span', courseLink).textContent = t === 'car' ? 'See the car course' : 'See the two-wheeler course';
      }
    });
  });

  // ---- Nav ----
  var nav = $('.nav'), burger = $('.burger'), links = $('.links');
  if (burger) burger.addEventListener('click', function () {
    var o = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', o ? 'true' : 'false');
  });
  var page = body.getAttribute('data-page');
  $$('.links a[data-page]').forEach(function (a) { if (a.getAttribute('data-page') === page) a.classList.add('active'); });

  // ---- Intro (staggered, after a short delay) + scroll reveal ----
  $$('[data-stagger]').forEach(function (p) {
    $$(':scope > .reveal', p).forEach(function (c, i) { c.style.setProperty('--d', (i * 120) + 'ms'); });
  });
  $$('.reveal[data-delay]').forEach(function (e) { e.style.setProperty('--d', e.getAttribute('data-delay') + 'ms'); });
  function runIntro() {
    $$('.intro').forEach(function (e, i) {
      if (rm) return e.classList.add('in');
      setTimeout(function () { e.classList.add('in'); }, 250 + i * 170);
    });
  }
  if (d.readyState === 'complete') runIntro(); else window.addEventListener('load', runIntro);

  var rv = $$('.reveal');
  if (rm || !('IntersectionObserver' in window)) rv.forEach(function (e) { e.classList.add('in'); });
  else {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(function (e) { io.observe(e); });
  }

  // ---- Parallax, progress bar, journey ----
  var bar = $('.progress'), topBtn = $('.to-top');
  var par = $$('[data-speed]');
  var jw = $('.journey-wrap'), jr = $('.journey'), car = $('.j-car'), far = $('.j-far'), near = $('.j-near'), road = $('.j-road');
  var stops = $$('.stop'), card = $('.j-card');
  var STEPS = [
    ['Tell us what you want to drive', 'Send your name, number and vehicle. We call you back and agree a start date.'],
    ['Learner’s licence', 'We explain the rules and the application steps so the paperwork is not a surprise.'],
    ['Practise on real roads', 'Short, regular sessions: starting, steering, junctions, reversing and parking.'],
    ['Mock test, then licence test', 'One full practice run of the RTO test, so test day feels familiar.']
  ];
  var cur = -1, lastP = 0, mt;
  function setStep(n) {
    cur = n;
    card.classList.add('swap');
    setTimeout(function () {
      $('[data-j-count]').textContent = 'Stop ' + (n + 1) + ' of 4';
      $('[data-j-title]').textContent = STEPS[n][0];
      $('[data-j-text]').textContent = STEPS[n][1];
      card.classList.remove('swap');
    }, 180);
    stops.forEach(function (s, i) { s.classList.toggle('on', i === n); s.classList.toggle('done', i < n); });
  }
  if (jw && !rm) setStep(0);

  var ticking = false;
  function update() {
    ticking = false;
    var y = window.pageYOffset, vh = window.innerHeight, h = root.scrollHeight - vh;
    if (bar) bar.style.width = (h > 0 ? y / h * 100 : 0) + '%';
    if (nav) nav.classList.toggle('scrolled', y > 10);
    if (topBtn) topBtn.classList.toggle('show', y > 700);
    if (rm) return;
    par.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      el.style.transform = 'translate3d(0,' + ((r.top + r.height / 2 - vh / 2) * parseFloat(el.getAttribute('data-speed'))).toFixed(1) + 'px,0)';
    });
    if (jw) {
      var jb = jw.getBoundingClientRect(), p = Math.min(1, Math.max(0, -jb.top / (jb.height - vh)));
      car.style.left = (8 + 78 * p) + '%';
      far.style.transform = 'translate3d(' + (-25 * p) + '%,0,0)';
      near.style.transform = 'translate3d(' + (-45 * p) + '%,0,0)';
      road.style.backgroundPositionX = (-1600 * p) + 'px';
      var n = Math.round(p * 3);
      if (n !== cur) setStep(n);
      if (Math.abs(p - lastP) > 0.0004) {
        jr.classList.add('moving');
        clearTimeout(mt);
        mt = setTimeout(function () { jr.classList.remove('moving'); }, 160);
      }
      lastP = p;
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
  if (topBtn) topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: rm ? 'auto' : 'smooth' }); });

  // ---- Button ripple ----
  d.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.btn');
    if (!b || rm) return;
    var r = b.getBoundingClientRect(), s = Math.max(r.width, r.height) / 2, sp = d.createElement('span');
    sp.className = 'rip';
    sp.style.cssText = 'width:' + s + 'px;height:' + s + 'px;left:' + (e.clientX - r.left - s / 2) + 'px;top:' + (e.clientY - r.top - s / 2) + 'px';
    b.appendChild(sp);
    setTimeout(function () { sp.remove(); }, 650);
  });

  // ---- WhatsApp chat bubble (appears after a delay) ----
  var bub = $('.wa-bubble');
  if (bub) {
    setTimeout(function () { bub.classList.add('show'); }, 7000);
    setTimeout(function () { bub.classList.remove('show'); }, 17000);
    $('button', bub).addEventListener('click', function () { bub.classList.remove('show'); });
  }

  // ---- Enquiry form ----
  var form = $('[data-enquiry]');
  if (form) {
    var def = form.getAttribute('data-default') || 'four-wheeler';
    var rd = $('input[value="' + def + '"]', form);
    if (rd) rd.checked = true;
    var ph = form.elements.phone;
    ph.addEventListener('input', function () { ph.value = ph.value.replace(/\D/g, '').slice(0, 10); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form), name = String(f.get('name') || '').trim(), phone = String(f.get('phone') || '');
      var en = $('[data-err=name]', form), ep = $('[data-err=phone]', form), bad = false;
      en.textContent = name.length < 2 ? 'Enter your name.' : '';
      ep.textContent = /^[6-9]\d{9}$/.test(phone) ? '' : 'Enter a 10-digit mobile number.';
      if (name.length < 2 || !/^[6-9]\d{9}$/.test(phone)) bad = true;
      if (bad || f.get('website')) return;
      var vm = { 'four-wheeler': 'car (four-wheeler) driving', 'two-wheeler': 'two-wheeler riding', both: 'both car and two-wheeler' };
      var tm = { any: 'any time', morning: 'the morning', afternoon: 'the afternoon', evening: 'the evening' };
      var msg = String(f.get('message') || '').trim();
      var text = 'Hello Fathima Driving School, I am ' + name + '. I want to learn ' + (vm[f.get('vehicle')] || 'driving') + '. My number: ' + phone + '. Best time to call: ' + (tm[f.get('time')] || 'any time') + '.' + (msg ? ' Note: ' + msg : '');
      var done = function () {
        var ok = $('.form-ok');
        form.hidden = true; ok.hidden = false;
        var s = $('.veh-slot', ok); if (s && !rm) s.classList.add('enter');
      };
      if (CFG.endpoint) {
        fetch(CFG.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ name: name, phone: phone, vehicle: f.get('vehicle'), time: f.get('time'), message: msg }) })
          .then(function (r) { if (!r.ok) throw 0; done(); })
          .catch(function () { $('[data-err=phone]', form).textContent = 'Could not send. Please call us instead.'; });
      } else {
        window.open('https://wa.me/' + CFG.wa + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
        done();
      }
    });
  }

  $$('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
})();
