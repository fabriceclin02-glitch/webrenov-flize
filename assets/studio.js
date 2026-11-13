/* Pack Flize v2 : film d'ouverture avec la vue aérienne réelle, planche de marque, vitrine, cartes, flyer recto-verso, site ordinateur + téléphone. */
(function () {
  'use strict';
  var FP = window.FP, E = window.E2, D = document, W = window;
  if (!FP || !E) return;
  var SECT = FP.SECT, ICON = FP.ICON, esc = FP.esc, mix = FP.mix, S = SECT[E.k];
  function $(s, r) { return (r || D).querySelector(s); }
  var ST = { v: 0, p: FP.hash(E.nom) % 3, slogan: '', tel: E.tel || '', nom: E.nom, cs: 'a' };
  function pal() { return S.p[ST.p]; }
  function rgba(h, a) { return 'rgba(' + FP.rgb(h).join(',') + ',' + a + ')'; }
  function ph(n) { return E.pre + 'stock/' + E.k + '-' + n + '.jpg'; }
  function ciel() { return E.ciel ? E.pre + E.slug + '/ciel.jpg' : ph(1); }
  function large() { return E.ciel ? E.pre + E.slug + '/large.jpg' : ph(2); }
  function slogan() { return ST.slogan || S.h; }
  function ent() { return { nom: ST.nom, k: E.k, slug: E.slug, adr: E.adr, tel: ST.tel, url: E.url }; }
  function adr() { return (E.adr ? E.adr + ', ' : '') + 'Flize'; }
  var exact = E.geo && E.geo.type === 'housenumber';

  /* ---------- pièces ---------- */
  function pin() {
    if (!E.geo || (E.geo.type !== 'housenumber' && E.geo.type !== 'street')) return '';
    return '<div class="xpin' + (exact ? '' : ' ring') + '"><i></i><div class="xlab"><b>' + esc(ST.nom) + '</b><span>' + esc(adr()) + '</span></div></div>';
  }
  function carte(face, style) {
    var p = pal(), e = ent();
    if (face === 'f') {
      var fond = style === 'b' ? 'background-image:linear-gradient(135deg,' + rgba(p[0], .9) + ',' + rgba(p[0], .5) + '),url(' + ph(2) + ');background-size:cover;background-position:center' : 'background:' + p[0];
      return '<div class="xcd xf" style="' + fond + '"><div class="xcm">' + FP.marque(e, ST.v, p, true) + '</div><div class="xcn">' + esc(ST.nom) + '</div><div class="xcs">' + esc(S.l) + ' · Flize</div></div>';
    }
    return '<div class="xcd xb" style="background:' + mix(p[0], '#ffffff', .94) + ';color:' + p[0] + '"><div class="xch"><div class="xcm s">' + FP.marque(e, ST.v, p, false) + '</div><div><b>' + esc(ST.nom) + '</b><span>' + esc(S.l) + '</span></div></div>'
      + '<div class="xcl">' + (ST.tel ? '<p>☎ ' + esc(ST.tel) + '</p>' : '') + (E.adr ? '<p>⌂ ' + esc(E.adr) + '</p>' : '') + '<p>08160 Flize · Ardennes</p></div><div class="xcq">' + FP.qr(E.url, p[0]) + '</div><i style="background:' + p[1] + '"></i></div>';
  }
  function flyerR() {
    var p = pal(), e = ent();
    return '<div class="xfl r" style="background-image:linear-gradient(180deg,' + rgba(p[0], .25) + ' 0%,' + rgba(p[0], .5) + ' 45%,' + rgba(p[0], .96) + ' 100%),url(' + ph(1) + ')">'
      + '<div class="xfll">' + FP.logo(e, ST.v, p, true) + '</div><div class="xflt"><h4>' + esc(slogan()) + '</h4><p>' + esc(S.l) + ' · Flize</p></div>'
      + '<div class="xflb"><b>' + esc(ST.tel || S.c) + '</b><span>' + esc(adr()) + ' · 08160</span></div></div>';
  }
  function flyerV() {
    var p = pal(), e = ent();
    return '<div class="xfl v" style="color:' + p[0] + '"><div class="xflh">' + FP.logo(e, ST.v, p, false) + '</div>'
      + '<ul>' + S.s.map(function (x) { return '<li><i style="background:' + p[1] + '"></i>' + esc(x) + '</li>'; }).join('') + '</ul>'
      + '<div class="xmap"><img src="' + large() + '" alt="" loading="lazy"><span class="xp"></span><small>Nous trouver · ' + esc(adr()) + '</small></div>'
      + '<div class="xflf" style="background:' + mix(p[1], '#ffffff', .6) + '"><div><b>' + esc(ST.tel || S.c) + '</b><span>' + esc(S.c) + '</span></div><div class="qr">' + FP.qr(E.url, p[0]) + '<small>Scannez</small></div></div></div>';
  }
  function siteHTML() {
    var p = pal(), e = ent();
    return '<div class="xsite"><div class="xs">'
      + '<div class="xnav"><span class="xlg">' + FP.marque(e, ST.v, p, false) + '</span><b>' + esc(ST.nom) + '</b><u>Accueil</u><u>Services</u><u>Contact</u></div>'
      + '<div class="xhero" style="background-image:linear-gradient(100deg,' + rgba(p[0], .93) + ',' + rgba(p[0], .4) + '),url(' + ph(1) + ')"><h5>' + esc(slogan()) + '</h5><p>' + esc(S.l) + ' à Flize</p><div><em class="a" style="background:' + p[1] + ';color:' + p[0] + '">' + esc(S.c) + '</em><em class="o">' + (ST.tel ? '☎ ' + esc(ST.tel) : 'Nous écrire') + '</em></div></div>'
      + '<div class="xsv">' + S.s.map(function (x, i) { return '<div><img src="' + ph(i % 3 + 1) + '" alt="" loading="lazy"><b>' + esc(x) + '</b></div>'; }).join('') + '</div>'
      + '<div class="xab"><b>Qui sommes-nous ?</b><p>Ici, votre présentation : votre histoire, votre savoir-faire, ce qui vous distingue. Nous l’écrivons ensemble, avec vos mots.</p></div>'
      + '<div class="xwh"><div class="xmap"><img src="' + large() + '" alt="" loading="lazy"><span class="xp"></span></div><div><b>Où nous trouver</b><span>' + esc(adr()) + '</span>' + (ST.tel ? '<span>☎ ' + esc(ST.tel) + '</span>' : '') + '<em class="a" style="background:' + p[0] + ';color:#fff">Itinéraire</em></div></div>'
      + '<div class="xft" style="background:' + p[0] + '">© ' + esc(ST.nom) + ' · Flize · Ardennes</div></div></div>';
  }
  function vitrine() {
    var p = pal(), e = ent(), mur = mix(p[0], '#ffffff', .9), st = '';
    for (var i = 0; i < 10; i++) st += '<path d="M' + (80 + i * 64) + ' 150 h64 v32 q-32 18 -64 0z" fill="' + (i % 2 ? '#ffffff' : p[1]) + '"/>';
    var lg = FP.logo(e, ST.v, p, true).replace('<svg ', '<svg x="100" y="40" width="322" height="100" ');
    return '<svg viewBox="0 0 800 420" class="xvit" role="img" aria-label="Votre vitrine"><rect width="800" height="420" fill="' + mix(p[0], '#ffffff', .82) + '"/><rect y="372" width="800" height="48" fill="#cfcac0"/>'
      + '<rect x="40" y="20" width="720" height="360" fill="' + mur + '"/><rect x="60" y="28" width="680" height="116" rx="12" fill="' + p[0] + '"/>' + lg
      + st + '<rect x="610" y="48" width="100" height="78" rx="8" fill="' + rgba('#ffffff', .12) + '"/><g transform="translate(634 58) scale(1.2)" fill="none" stroke="' + p[1] + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' + ICON[S.i].replace(/class="d" pathLength="1"/g, '') + '</g>'
      + '<rect x="72" y="214" width="224" height="150" rx="6" fill="' + rgba(p[0], .1) + '" stroke="' + p[0] + '" stroke-width="4"/><rect x="504" y="214" width="224" height="150" rx="6" fill="' + rgba(p[0], .1) + '" stroke="' + p[0] + '" stroke-width="4"/>'
      + '<rect x="330" y="206" width="140" height="166" rx="6" fill="' + p[0] + '"/><rect x="342" y="220" width="116" height="152" rx="4" fill="' + rgba('#ffffff', .22) + '"/><circle cx="450" cy="300" r="5" fill="' + p[1] + '"/>'
      + '<g transform="translate(150 250) scale(1.7)">' + '<circle cx="24" cy="24" r="22" fill="' + p[1] + '" opacity=".95"/><g transform="translate(6 6) scale(.75)" fill="none" stroke="' + p[0] + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' + ICON[S.i].replace(/class="d" pathLength="1"/g, '') + '</g></g>'
      + '<text x="616" y="300" text-anchor="middle" font-family="Manrope,Arial,sans-serif" font-weight="800" font-size="26" fill="' + p[0] + '">Bienvenue</text><text x="616" y="328" text-anchor="middle" font-family="Manrope,Arial,sans-serif" font-weight="700" font-size="14" letter-spacing="3" fill="' + p[0] + '" opacity=".7">À FLIZE</text></svg>';
  }
  function swatches() {
    var p = pal();
    return [[p[0], 'Couleur principale'], [p[1], 'Couleur d’accent'], [mix(p[0], '#ffffff', .93), 'Fond doux'], ['#1b2130', 'Texte']].map(function (c) {
      return '<div class="xsw"><i style="background:' + c[0] + '"></i><b>' + c[0].toUpperCase() + '</b><span>' + c[1] + '</span></div>';
    }).join('');
  }

  /* ---------- rendu ---------- */
  function rendre() {
    var p = pal(), r = D.documentElement.style, e = ent();
    r.setProperty('--c1', p[0]); r.setProperty('--c2', p[1]); r.setProperty('--c3', mix(p[0], '#ffffff', .93)); r.setProperty('--c4', mix(p[1], '#ffffff', .6));
    [0, 1, 2].forEach(function (v) { var el = $('#lg' + v); el.innerHTML = FP.logo(e, v, p, false); el.parentNode.classList.toggle('on', v === ST.v); });
    $('#pals').innerHTML = S.p.map(function (c, i) { return '<button type="button" class="pl' + (i === ST.p ? ' on' : '') + '" data-p="' + i + '" aria-label="Couleurs ' + (i + 1) + '" style="background:linear-gradient(135deg,' + c[0] + ' 55%,' + c[1] + ' 55%)"></button>'; }).join('');
    $('#sw').innerHTML = swatches(); $('#vit').innerHTML = vitrine();
    $('#cF').innerHTML = carte('f', ST.cs); $('#cB').innerHTML = carte('b', ST.cs);
    $('#fR').innerHTML = flyerR(); $('#fV').innerHTML = flyerV();
    $('#sD').innerHTML = siteHTML(); $('#sP').innerHTML = siteHTML();
    [].forEach.call(D.querySelectorAll('[data-cs]'), function (b) { b.classList.toggle('on', b.dataset.cs === ST.cs); });
    film();
    try { history.replaceState(null, '', '#v' + ST.v + 'p' + ST.p); } catch (x) { }
  }

  /* ---------- le film ---------- */
  var DUR = [5200, 4200, 4800, 5800, 4000], CAP = ['Votre commerce, vu du ciel', 'Votre logo', 'Votre carte et votre flyer', 'Votre site internet', 'Fait à Flize, pour Flize'], tm = [], enCours = true;
  function film() {
    var f = $('#film'), p = pal(), e = ent(); if (!f) return;
    var fac = E.facade ? '<img class="xfac" src="' + E.pre + E.slug + '/facade.jpg" alt="Façade de ' + esc(adr()) + '"><div class="xchip g">Façade · Google Street View © Google</div>' : '';
    f.querySelector('.s0').innerHTML = '<div class="xkb"><img src="' + ciel() + '" alt="Vue aérienne de ' + esc(adr()) + '"></div>' + pin() + fac + '<div class="xchip">' + (E.ciel ? (E.geo && (E.geo.type === 'housenumber' || E.geo.type === 'street') ? 'Vue aérienne réelle · © IGN' : 'Flize vue du ciel · © IGN') : 'Flize') + '</div>';
    f.querySelector('.s1').innerHTML = '<div class="xbg" style="background-image:linear-gradient(' + rgba(p[0], .82) + ',' + rgba('#05070c', .92) + '),url(' + ph(1) + ')"></div><div class="big">' + FP.logo(e, ST.v, p, true) + '</div>';
    f.querySelector('.s2').innerHTML = '<div class="xdk" style="background:radial-gradient(120% 120% at 30% 20%,' + mix(p[1], '#ffffff', .78) + ',' + mix(p[0], '#ffffff', .6) + ')"><div class="xfc"><div class="xflip"><div class="a">' + carte('f', ST.cs) + '</div><div class="b">' + carte('b', ST.cs) + '</div></div></div><div class="xff">' + flyerR() + '</div></div>';
    f.querySelector('.s3').innerHTML = '<div class="xbg" style="background:radial-gradient(100% 120% at 70% 10%,' + rgba(p[1], .35) + ',#05070c 70%)"></div><div class="xdsk"><div class="xwb"><div class="xwt"><i></i><i></i><i></i><span>' + esc(E.slug) + '.fr</span></div><div class="xwp">' + siteHTML() + '</div></div><div class="xph"><div class="xnotch"></div><div class="xwp">' + siteHTML() + '</div></div></div>';
    f.querySelector('.s4').innerHTML = '<div class="xbg" style="background-image:linear-gradient(' + rgba(p[0], .85) + ',' + rgba('#05070c', .95) + '),url(' + ciel() + ')"></div><div class="fin"><div class="mini">' + FP.marque(e, ST.v, p, true) + '</div><h3>' + esc(ST.nom) + '</h3><p>Fait à Flize, pour Flize.</p><b>Votre site : 100 €</b></div>';
    if (!f.dataset.on) { f.dataset.on = '1'; lire(0); }
  }
  function lire(i) {
    var f = $('#film'); tm.forEach(clearTimeout); tm = [];
    f.dataset.s = '-1';
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      f.dataset.s = String(i); $('#cap').textContent = CAP[i];
      [].forEach.call(f.querySelectorAll('.bar i'), function (b, k) { b.className = k < i ? 'ok' : k === i ? 'go' : ''; b.style.animationDuration = DUR[k] + 'ms'; });
      if (enCours) tm.push(setTimeout(function () { lire((i + 1) % DUR.length); }, DUR[i]));
    }); });
  }

  /* ---------- page ---------- */
  function init() {
    var h = (location.hash || '').match(/v(\d)p(\d)/);
    if (h) { ST.v = +h[1] % 3; ST.p = +h[2] % 3; }
    D.title = 'Maquette pour ' + E.nom + ' · WebRénov Flize';
    D.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-v],[data-p],[data-dl],[data-print],[data-film],[data-cs]'); if (!b) return;
      if (b.dataset.v != null) { ST.v = +b.dataset.v; rendre(); }
      else if (b.dataset.p != null) { ST.p = +b.dataset.p; rendre(); }
      else if (b.dataset.cs != null) { ST.cs = b.dataset.cs; rendre(); }
      else if (b.dataset.dl != null) { FP.download('logo-' + E.slug + '-' + (+b.dataset.dl + 1) + '.svg', FP.logo(ent(), +b.dataset.dl, pal(), false)); }
      else if (b.dataset.print) { D.body.dataset.print = b.dataset.print; setTimeout(function () { W.print(); setTimeout(function () { delete D.body.dataset.print; }, 400); }, 80); }
      else if (b.dataset.film != null) { if (b.dataset.film === 'toggle') { enCours = !enCours; b.textContent = enCours ? '❚❚ Pause' : '▶ Lecture'; if (enCours) lire((+$('#film').dataset.s + 1 + DUR.length) % DUR.length); else tm.forEach(clearTimeout); } else { lire(+b.dataset.film); } }
    });
    var t1 = $('#inSlogan'), t2 = $('#inTel'), t3 = $('#inNom'), minuteur;
    function maj() { clearTimeout(minuteur); minuteur = setTimeout(function () { ST.slogan = t1.value.trim(); ST.tel = t2.value.trim(); ST.nom = t3.value.trim() || E.nom; rendre(); }, 250); }
    [t1, t2, t3].forEach(function (t) { if (t) t.addEventListener('input', maj); });
    if (t1) t1.placeholder = S.h; if (t2) t2.value = ST.tel; if (t3) t3.value = E.nom;
    if (W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches) { enCours = false; var t = $('[data-film="toggle"]'); if (t) t.textContent = '▶ Lecture'; }
    if ('IntersectionObserver' in W) { var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }); }, { threshold: .12 }); [].forEach.call(D.querySelectorAll('.rv'), function (n) { io.observe(n); }); }
    else [].forEach.call(D.querySelectorAll('.rv'), function (n) { n.classList.add('in'); });
    rendre();
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init); else init();
})();
