/* Pack Flize : logo, carte de visite, flyer, site et film, générés dans le navigateur à partir du nom et du métier. */
(function () {
  'use strict';
  var W = window, D = document;
  function $(s, r) { return (r || D).querySelector(s); }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- pictogrammes (grille 48 x 48, traits) ---------- */
  var E8 = function (n, rx, ry, cx, cy) { var s = ''; for (var i = 0; i < n; i++) s += '<ellipse class="d" pathLength="1" cx="' + cx + '" cy="' + (cy - 11.5) + '" rx="' + rx + '" ry="' + ry + '" transform="rotate(' + (360 / n * i) + ' ' + cx + ' ' + cy + ')"/>'; return s; };
  var P = function (d) { return '<path class="d" pathLength="1" d="' + d + '"/>'; };
  var C = function (x, y, r) { return '<circle class="d" pathLength="1" cx="' + x + '" cy="' + y + '" r="' + r + '"/>'; };
  var ICON = {
    ciseaux: C(13, 36, 5.5) + C(13, 12, 5.5) + P('M17.5 15.5 L42 38 M17.5 32.5 L42 10'),
    fleur: E8(6, 4.4, 8, 24, 24) + C(24, 24, 3),
    lotus: P('M24 38 Q12 30 15 14 Q22 19 24 27 Q26 19 33 14 Q36 30 24 38Z') + P('M24 38 Q7 36 5 22 Q14 22 20 31') + P('M24 38 Q41 36 43 22 Q34 22 28 31'),
    epi: P('M24 44 V8') + '<ellipse class="d" pathLength="1" cx="17" cy="16" rx="3" ry="6" transform="rotate(-35 17 16)"/><ellipse class="d" pathLength="1" cx="31" cy="16" rx="3" ry="6" transform="rotate(35 31 16)"/><ellipse class="d" pathLength="1" cx="16" cy="26" rx="3" ry="6" transform="rotate(-35 16 26)"/><ellipse class="d" pathLength="1" cx="32" cy="26" rx="3" ry="6" transform="rotate(35 32 26)"/><ellipse class="d" pathLength="1" cx="17" cy="36" rx="3" ry="6" transform="rotate(-35 17 36)"/><ellipse class="d" pathLength="1" cx="31" cy="36" rx="3" ry="6" transform="rotate(35 31 36)"/>',
    chope: P('M11 14 H32 V38 Q32 42 28 42 H15 Q11 42 11 38 Z') + P('M32 19 H37 Q40 19 40 22 V30 Q40 33 37 33 H32') + P('M17 21 V35 M23 21 V35') + P('M11 14 Q11 9 17 10 Q20 6 26 9 Q31 8 32 14'),
    pizza: P('M7 13 Q24 3 41 13 L24 43 Z') + C(19, 17, 2.6) + C(30, 18, 2.6) + C(24, 28, 2.6),
    couvert: P('M12 5 V19 Q12 25 18 25 Q24 25 24 19 V5 M18 5 V43') + P('M35 5 Q43 12 40 27 H35 V43 M35 5 V27'),
    maison: P('M5 24 L24 7 L43 24') + P('M10 20 V40 H38 V20') + P('M20 40 V28 H28 V40'),
    toit: P('M3 29 L24 9 L45 29') + P('M9 25 V41 H39 V25') + P('M33 15 V6 H39 V20'),
    equerre: P('M8 6 V42 H42') + P('M8 18 H17 M8 30 H26') + P('M22 42 V35 M34 42 V30'),
    fenetre: '<rect class="d" pathLength="1" x="9" y="6" width="30" height="36" rx="2"/>' + P('M24 6 V42 M9 24 H39'),
    pinceau: P('M10 39 Q13 31 21 31 L38 8 L43 12 L27 35 Q27 43 15 43 Q10 43 10 39Z'),
    goutte: P('M24 5 Q38 22 38 31 A14 14 0 0 1 10 31 Q10 22 24 5Z') + P('M17 33 Q18 38 23 39'),
    voiture: P('M5 30 L9 19 Q10 16 13 16 H35 Q38 16 39 19 L43 30 V37 H5 Z') + P('M5 30 H43') + C(14, 37, 4.2) + C(34, 37, 4.2),
    moto: C(10, 33, 7) + C(38, 33, 7) + P('M10 33 L19 17 H30 L38 33 M19 17 L15 11 H10 M25 25 H17'),
    croix: P('M19 7 H29 V19 H41 V29 H29 V41 H19 V29 H7 V19 H19 Z'),
    montagne: P('M3 41 L18 13 L26 27 L31 19 L45 41 Z') + P('M18 13 L22 20'),
    gant: P('M14 21 Q13 8 26 8 H30 Q40 8 40 18 V28 Q40 36 32 36 H30 V42 H16 V31 Q14 27 14 21Z') + P('M30 36 H16'),
    velo: C(11, 33, 8.5) + C(37, 33, 8.5) + P('M11 33 L19 16 H30 L37 33 M19 16 L25 33 H11 M30 16 L28 9 H34'),
    poisson: P('M4 24 Q19 6 34 24 Q19 42 4 24Z M34 24 L44 14 V34 Z') + C(13, 21, 1.6),
    pelote: C(24, 24, 16) + P('M10 17 Q24 28 38 13 M8 26 Q24 38 40 22 M15 37 Q28 24 34 9'),
    bouteille: P('M20 4 H28 V12 Q35 16 35 25 V42 H13 V25 Q13 16 20 12Z') + P('M13 29 H35'),
    livre: P('M24 12 Q15 7 5 10 V37 Q15 34 24 39 Q33 34 43 37 V10 Q33 7 24 12Z M24 12 V39'),
    note: C(13, 36, 5) + C(34, 32, 5) + P('M18 36 V10 L39 6 V32'),
    mairie: P('M4 18 L24 6 L44 18Z') + P('M9 23 V37 M19 23 V37 M29 23 V37 M39 23 V37 M4 42 H44'),
    camion: P('M3 13 H29 V33 H3Z M29 20 H38 L45 28 V33 H29') + C(12, 36, 4) + C(36, 36, 4),
    etoile: P('M24 5 L29.5 17.5 L43 19 L33 28 L36 42 L24 35 L12 42 L15 28 L5 19 L18.5 17.5Z')
  };

  /* ---------- métiers : libellé, pictogramme, 3 palettes, accroche, 3 services, bouton ---------- */
  var SECT = {
    coiffure: { l: 'Salon de coiffure', i: 'ciseaux', p: [['#23304f', '#e9a98d'], ['#3a1f3d', '#f0b562'], ['#0f3b3d', '#f2d189']], h: 'Un nouveau regard, à deux pas de chez vous.', s: ['Coupes femme, homme et enfant', 'Colorations, mèches et soins', 'Rendez-vous simple, par téléphone'], c: 'Prendre rendez-vous' },
    beaute: { l: 'Institut de beauté', i: 'lotus', p: [['#5b2a4a', '#f0b8a4'], ['#1f4a43', '#efc9a0'], ['#3d2a5e', '#f3c6d9']], h: 'Prenez soin de vous, sans quitter Flize.', s: ['Soins du visage et du corps', 'Beauté des mains et des pieds', 'Épilation, maquillage, conseils'], c: 'Réserver un soin' },
    boulangerie: { l: 'Boulangerie pâtisserie', i: 'epi', p: [['#7a3b12', '#f2c46d'], ['#3b2a1a', '#e9a23b'], ['#5a2230', '#f4d29a']], h: 'Le pain du matin, fait ici, pour vous.', s: ['Pains et viennoiseries du jour', 'Pâtisseries et gâteaux sur commande', 'Une adresse du quotidien à Flize'], c: 'Passer commande' },
    bar: { l: 'Bar, tabac, presse', i: 'chope', p: [['#3a2412', '#e8a838'], ['#1b3a2e', '#e9c46a'], ['#2b2b45', '#f4a259']], h: 'Le rendez-vous du village, du matin au soir.', s: ['Café, bière et boissons', 'Tabac, presse et jeux', 'Un lieu pour se retrouver'], c: 'Nous trouver' },
    resto: { l: 'Restaurant, pizzeria', i: 'pizza', p: [['#8a2a1c', '#f5c26b'], ['#1f3a2a', '#f2a65a'], ['#33241d', '#e9b44c']], h: 'À table ! Sur place, à emporter, en livraison.', s: ['Cuisine faite maison', 'Sur place ou à emporter', 'Commande en un appel'], c: 'Commander' },
    fleuriste: { l: 'Fleuriste', i: 'fleur', p: [['#2f5d3a', '#f1a7b8'], ['#4a2c5e', '#f4cf7a'], ['#1d4e5f', '#f4a6a0']], h: 'Des fleurs pour chaque moment de la vie.', s: ['Bouquets du jour et sur mesure', 'Mariages, deuils, événements', 'Livraison dans les villages voisins'], c: 'Commander un bouquet' },
    autoecole: { l: 'Auto-école', i: 'voiture', p: [['#12355b', '#f6b73c'], ['#1e1e2e', '#4cc3a2'], ['#0b4a4f', '#f5d36b']], h: 'Votre permis, avec quelqu’un de chez vous.', s: ['Permis B, code et conduite', 'Un suivi simple, étape par étape', 'Des horaires adaptés'], c: 'Nous contacter' },
    toiture: { l: 'Couverture, toiture', i: 'toit', p: [['#33404f', '#e0894a'], ['#252a3d', '#f2b548'], ['#40302a', '#d9a05b']], h: 'Une toiture solide, des devis clairs.', s: ['Couverture et réparation', 'Zinguerie, isolation, entretien', 'Devis gratuit sur place'], c: 'Demander un devis' },
    batiment: { l: 'Bâtiment, maçonnerie', i: 'maison', p: [['#2f3e46', '#e9a03b'], ['#3b2f2f', '#d98a4e'], ['#1f3b4d', '#f2c14e']], h: 'Construire, rénover, bien faire.', s: ['Maçonnerie et gros œuvre', 'Rénovation intérieure et extérieure', 'Devis gratuit'], c: 'Demander un devis' },
    menuiserie: { l: 'Menuiserie, métal', i: 'fenetre', p: [['#3a2a1f', '#d9a45b'], ['#1f2f3f', '#8fd0c0'], ['#30303a', '#e5a64c']], h: 'Du sur-mesure, fabriqué près de chez vous.', s: ['Fenêtres, portes, volets', 'Agencement et aménagement', 'Pose et dépannage'], c: 'Demander un devis' },
    peinture: { l: 'Peinture, ravalement', i: 'pinceau', p: [['#1f3f5b', '#f2b84b'], ['#4a2c3d', '#f4a89a'], ['#24433a', '#f0cc7a']], h: 'Des murs qui changent tout.', s: ['Peinture intérieure et extérieure', 'Ravalement de façades', 'Conseil couleurs et devis gratuit'], c: 'Demander un devis' },
    plomberie: { l: 'Plomberie, chauffage', i: 'goutte', p: [['#12456b', '#58c2d9'], ['#1d3557', '#f4a261'], ['#0f4c4a', '#f2c94c']], h: 'Dépannage et installation, sans attendre.', s: ['Plomberie et sanitaires', 'Chauffage et entretien', 'Dépannage rapide'], c: 'Appeler' },
    garage: { l: 'Garage, mécanique', i: 'voiture', p: [['#222b36', '#f06a3c'], ['#1c3d33', '#f2c14e'], ['#3a2c46', '#4cc3a2']], h: 'Votre voiture entre de bonnes mains.', s: ['Entretien et réparation', 'Diagnostic et contrôle', 'Devis avant intervention'], c: 'Prendre rendez-vous' },
    moto: { l: 'Moto, mécanique', i: 'moto', p: [['#1f2328', '#f05d3a'], ['#27313f', '#f2c14e'], ['#33211f', '#e9a23b']], h: 'Pour ceux qui aiment rouler.', s: ['Entretien et réparation', 'Accessoires et équipement', 'Conseils de passionnés'], c: 'Nous contacter' },
    sante: { l: 'Santé, bien-être', i: 'croix', p: [['#12526b', '#8fd9c4'], ['#2c4a3e', '#f2d28b'], ['#3b3a63', '#9fd8e8']], h: 'Votre santé, près de chez vous.', s: ['Consultation sur rendez-vous', 'Infos pratiques et accès', 'Prise de rendez-vous simple'], c: 'Prendre rendez-vous' },
    sport: { l: 'Sport, loisirs', i: 'gant', p: [['#7a1f1f', '#f4b942'], ['#1f2f4f', '#ef6f4d'], ['#222222', '#53d1a5']], h: 'Bougez, progressez, retrouvez-vous.', s: ['Cours et entraînements', 'Pour tous les niveaux', 'Inscription en ligne'], c: 'S’inscrire' },
    nature: { l: 'Nature, plein air', i: 'montagne', p: [['#23483c', '#f0c36b'], ['#1d3a52', '#e9a03b'], ['#3c4a2a', '#f4d58d']], h: 'Les Ardennes, grandeur nature.', s: ['Sorties et activités', 'Évènements et calendrier', 'Infos et inscriptions'], c: 'Nous rejoindre' },
    couture: { l: 'Créations, textile', i: 'pelote', p: [['#5a2a4d', '#f4b6a1'], ['#2d4a5e', '#f2cf7a'], ['#4a3a2a', '#e8a6b8']], h: 'Fait main, fait ici.', s: ['Créations originales', 'Commandes personnalisées', 'Marchés et boutique en ligne'], c: 'Voir les créations' },
    spiritueux: { l: 'Gin, cave, spiritueux', i: 'bouteille', p: [['#1f3b36', '#e5c06b'], ['#2b2340', '#d99a5b'], ['#3a2a1d', '#9fd1b8']], h: 'Un savoir-faire des Ardennes, à déguster.', s: ['Nos créations', 'Dégustations et conseils', 'Commande en ligne et retrait'], c: 'Commander' },
    livre: { l: 'Bibliothèque, culture', i: 'livre', p: [['#2f3e5e', '#f0c36b'], ['#4a2c34', '#f2b8a0'], ['#1f4a47', '#f3d98b']], h: 'Lire, apprendre, se retrouver.', s: ['Prêt de livres', 'Animations et rencontres', 'Ouvert à toutes et à tous'], c: 'Nous rendre visite' },
    musique: { l: 'Musique, spectacle', i: 'note', p: [['#2b2a5e', '#f4b942'], ['#4a1f44', '#6fd3c4'], ['#1f2f3f', '#f08a5d']], h: 'Jouez, chantez, partagez.', s: ['Cours individuels et collectifs', 'Tous âges, tous niveaux', 'Spectacles et animations'], c: 'S’inscrire' },
    gite: { l: 'Gîte, chambres d’hôtes', i: 'maison', p: [['#2f4a3a', '#f0c36b'], ['#3a2c2c', '#e5a36b'], ['#1f3f4f', '#f3d28b']], h: 'Un séjour au calme, au cœur des Ardennes.', s: ['Hébergement de charme', 'Tarifs et disponibilités', 'Réservation directe'], c: 'Réserver' },
    mairie: { l: 'Commune', i: 'mairie', p: [['#1f3f6b', '#e9b44c'], ['#24483a', '#f2c97a'], ['#3b2f5e', '#f0b86b']], h: 'Flize, Élan, Boutancourt, Balaives-et-Butz.', s: ['Démarches et infos pratiques', 'Commerces, artisans, associations', 'Agenda et actualités'], c: 'Nous contacter' },
    asso: { l: 'Association', i: 'etoile', p: [['#2b3f6b', '#f2b84b'], ['#4a2c4a', '#7fd1b9'], ['#1f4a3f', '#f4c06a']], h: 'Ensemble, c’est plus fort.', s: ['Nos activités', 'Agenda et inscriptions', 'Rejoindre l’association'], c: 'Nous rejoindre' },
    transport: { l: 'Transports', i: 'camion', p: [['#1f3550', '#f4a93d'], ['#2c2c36', '#5fcf9f'], ['#3a2a1f', '#f0c36b']], h: 'Là où il faut, quand il faut.', s: ['Transport de marchandises', 'Flotte moderne', 'Devis rapide'], c: 'Demander un devis' },
    fer: { l: 'Fer, matériaux', i: 'equerre', p: [['#2b3138', '#f08a3c'], ['#1f3340', '#f2c14e'], ['#3a2d2d', '#8fd0c0']], h: 'Le métal qu’il vous faut, au bon prix.', s: ['Fers et profilés', 'Découpe sur mesure', 'Retrait sur place'], c: 'Demander un devis' }
  };

  /* ---------- utilitaires ---------- */
  function hash(t) { var h = 2166136261; for (var i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rgb(h) { h = h.replace('#', ''); return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)]; }
  function mix(a, b, t) { var x = rgb(a), y = rgb(b); return '#' + [0, 1, 2].map(function (i) { return ('0' + Math.round(x[i] + (y[i] - x[i]) * t).toString(16)).slice(-2); }).join(''); }
  var MOTS_VIDES = /^(le|la|les|l'|au|aux|un|une|de|du|des|d'|et|chez|sarl|eurl|sas|sasu)$/i;
  function initiales(nom) {
    var m = nom.replace(/[’']/g, ' ').split(/[\s-]+/).filter(function (w) { return w && !MOTS_VIDES.test(w); });
    var a = (m[0] || nom).charAt(0), b = m.length > 1 ? m[1].charAt(0) : '';
    return (a + b).toUpperCase();
  }
  function lignes(nom, max) {
    var mots = nom.split(' '), L = [''];
    mots.forEach(function (w) { var cur = L[L.length - 1]; if (cur && (cur + ' ' + w).length > max && L.length < 2) L.push(w); else L[L.length - 1] = cur ? cur + ' ' + w : w; });
    return L;
  }
  var SERIF = "'Fraunces',Georgia,'Times New Roman',serif", SANS = "'Manrope','Segoe UI',Arial,sans-serif";

  /* ---------- logos : 3 propositions ---------- */
  function couleurs(pal, inv) { return inv ? { bg: '#ffffff', ic: pal[0], tx: '#ffffff', ac: pal[1], pale: 'rgba(255,255,255,.7)' } : { bg: pal[0], ic: pal[1], tx: pal[0], ac: pal[1], pale: mix(pal[0], '#ffffff', .35) }; }
  function icone(e, sc, x, y, col, w) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + sc + ')" fill="none" stroke="' + col + '" stroke-width="' + (w || 2.7) + '" stroke-linecap="round" stroke-linejoin="round">' + ICON[SECT[e.k].i] + '</g>'; }
  function marque(e, v, pal, inv) {
    var c = couleurs(pal, inv), s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" class="mk" role="img" aria-label="Logo ' + esc(e.nom) + '">';
    if (v === 0) s += '<circle cx="90" cy="90" r="80" fill="' + c.bg + '"/><circle cx="90" cy="90" r="70" fill="none" stroke="' + c.ac + '" stroke-width="2" opacity=".75"/>' + icone(e, 1.5, 54, 54, c.ic);
    else if (v === 1) s += '<rect x="14" y="14" width="152" height="152" rx="40" fill="' + (inv ? 'none' : c.bg) + '" stroke="' + (inv ? '#fff' : c.bg) + '" stroke-width="' + (inv ? 6 : 0) + '"/><text x="90" y="116" text-anchor="middle" font-family="' + SERIF + '" font-weight="700" font-size="' + (initiales(e.nom).length > 1 ? 78 : 92) + '" fill="' + (inv ? '#fff' : c.ic) + '">' + esc(initiales(e.nom)) + '</text><circle cx="140" cy="44" r="9" fill="' + c.ac + '"/>';
    else s += '<path d="M90 8 L160 32 V92 C160 130 128 158 90 174 C52 158 20 130 20 92 V32 Z" fill="' + c.bg + '"/><path d="M90 20 L148 40 V92 C148 123 122 147 90 161 C58 147 32 123 32 92 V40 Z" fill="none" stroke="' + c.ac + '" stroke-width="2" opacity=".7"/>' + icone(e, 1.3, 59, 54, c.ic);
    return s + '</svg>';
  }
  function logo(e, v, pal, inv) {
    var c = couleurs(pal, inv), maj = v === 1, L = lignes(maj ? e.nom.toUpperCase() : e.nom, maj ? 13 : 15);
    var longueur = Math.max.apply(null, L.map(function (x) { return x.length; })), fs = Math.min(maj ? 30 : 40, 345 / (longueur * (maj ? 0.78 : 0.55)));
    var y0 = L.length === 1 ? 84 : 70, y1 = y0 + (L.length - 1) * fs * 1.08, t = '';
    L.forEach(function (x, i) { t += '<text x="196" y="' + (y0 + i * fs * 1.08) + '" font-family="' + (maj ? SANS : SERIF) + '" font-weight="' + (maj ? 800 : 700) + '" font-size="' + fs.toFixed(1) + '"' + (maj ? ' letter-spacing="2.2"' : '') + ' fill="' + c.tx + '">' + esc(x) + '</text>'; });
    var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 180" class="lg" role="img" aria-label="Logo ' + esc(e.nom) + '">' + '<g>' + marque(e, v, pal, inv).replace(/<svg[^>]*>/, '<svg x="0" y="0" width="180" height="180" viewBox="0 0 180 180">') + '</g>';
    s += t + '<rect x="196" y="' + (y1 + 18) + '" width="46" height="4" rx="2" fill="' + c.ac + '"/><text x="252" y="' + (y1 + 25) + '" font-family="' + SANS + '" font-weight="700" font-size="14" letter-spacing="3.4" fill="' + c.tx + '" opacity=".72">' + esc(SECT[e.k].l.toUpperCase().split(',')[0]) + ' · FLIZE</text>';
    return s + '</svg>';
  }

  /* ---------- carte, flyer, site ---------- */
  function carte(e, pal, face) {
    if (face === 'f') return '<div class="cd f" style="background:' + pal[0] + '">' + '<div class="cdm">' + marque(e, ST.v, pal, true) + '</div><div class="cdn">' + esc(e.nom) + '</div><div class="cds">' + esc(SECT[e.k].l) + ' · Flize</div></div>';
    return '<div class="cd b" style="background:' + mix(pal[0], '#ffffff', .94) + ';color:' + pal[0] + '"><div class="cdh">' + '<div class="cdm s">' + marque(e, ST.v, pal, false) + '</div><div><b>' + esc(e.nom) + '</b><span>' + esc(SECT[e.k].l) + '</span></div></div>'
      + '<div class="cdl">' + (e.tel ? '<p>☎ ' + esc(e.tel) + '</p>' : '') + (e.adr ? '<p>⌂ ' + esc(e.adr) + '</p>' : '') + '<p>08160 Flize · Ardennes</p></div><i style="background:' + pal[1] + '"></i></div>';
  }
  function qr(url, col) {
    try { var q = W.qrcode(0, 'M'); q.addData(url); q.make(); return q.createSvgTag({ cellSize: 3, margin: 0, scalable: true }).replace('<svg', '<svg fill="' + col + '"').replace(/fill="#000000"/g, 'fill="' + col + '"'); } catch (x) { return '<div class="qrx">QR</div>'; }
  }
  function flyer(e, pal) {
    var S = SECT[e.k];
    return '<div class="fl"><div class="flh" style="background:' + pal[0] + '"><div class="fll">' + logo(e, ST.v, pal, true) + '</div><h4>' + esc(S.h) + '</h4></div>'
      + '<ul>' + S.s.map(function (x) { return '<li><i style="background:' + pal[1] + '"></i>' + esc(x) + '</li>'; }).join('') + '</ul>'
      + '<div class="flf" style="background:' + mix(pal[1], '#ffffff', .62) + ';color:' + pal[0] + '"><div>' + (e.tel ? '<b>' + esc(e.tel) + '</b>' : '<b>' + esc(S.c) + '</b>') + '<span>' + esc(e.adr ? e.adr + ', ' : '') + '08160 Flize</span></div><div class="qr">' + qr(e.url, pal[0]) + '<small>Scannez</small></div></div></div>';
  }
  function site(e, pal) {
    var S = SECT[e.k], g = 'linear-gradient(135deg,' + pal[0] + ',' + mix(pal[0], '#000000', .35) + ')';
    return '<div class="wb"><div class="wbt"><i></i><i></i><i></i><span>' + esc(e.slug) + '.fr</span></div><div class="wbp"><div class="wbs">'
      + '<div class="wnav"><span class="wlg">' + marque(e, ST.v, pal, false) + '</span><b>' + esc(e.nom) + '</b><u>Accueil</u><u>Services</u><u>Contact</u></div>'
      + '<div class="whero" style="background:' + g + '"><svg viewBox="0 0 48 48" fill="none" stroke="' + pal[1] + '" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">' + ICON[S.i].replace(/class="d" pathLength="1"/g, '') + '</svg><h5>' + esc(S.h) + '</h5><p>' + esc(S.l) + ' à Flize</p><div><em style="background:' + pal[1] + ';color:' + pal[0] + '">' + esc(S.c) + '</em><em class="o">' + (e.tel ? '☎ ' + esc(e.tel) : 'Nous écrire') + '</em></div></div>'
      + '<div class="wsv">' + S.s.map(function (x) { return '<div><i style="background:' + pal[1] + '"></i><b>' + esc(x) + '</b></div>'; }).join('') + '</div>'
      + '<div class="wmap"><b>Où nous trouver</b><span>' + esc(e.adr ? e.adr + ', ' : '') + '08160 Flize</span>' + (e.tel ? '<span>☎ ' + esc(e.tel) + '</span>' : '') + '</div>'
      + '<div class="wft" style="background:' + pal[0] + '">© ' + esc(e.nom) + ' · Flize · Ardennes</div></div></div></div>';
  }

  /* ---------- état et rendu ---------- */
  var ST = { v: 0, p: 0 }, E = W.E;
  function pal() { return SECT[E.k].p[ST.p]; }
  function download(nom, contenu) { var a = D.createElement('a'); a.href = URL.createObjectURL(new Blob([contenu], { type: 'image/svg+xml' })); a.download = nom; D.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500); }

  function rendre() {
    var p = pal(), r = D.documentElement.style;
    r.setProperty('--c1', p[0]); r.setProperty('--c2', p[1]); r.setProperty('--c3', mix(p[0], '#ffffff', .93)); r.setProperty('--c4', mix(p[1], '#ffffff', .6));
    [0, 1, 2].forEach(function (v) { var el = $('#lg' + v); el.innerHTML = logo(E, v, p, false); el.parentNode.classList.toggle('on', v === ST.v); });
    $('#pals').innerHTML = SECT[E.k].p.map(function (c, i) { return '<button type="button" class="pl' + (i === ST.p ? ' on' : '') + '" data-p="' + i + '" aria-label="Couleurs ' + (i + 1) + '" style="background:linear-gradient(135deg,' + c[0] + ' 55%,' + c[1] + ' 55%)"></button>'; }).join('');
    $('#carteF').innerHTML = carte(E, p, 'f'); $('#carteB').innerHTML = carte(E, p, 'b');
    $('#flyerBox').innerHTML = flyer(E, p); $('#siteBox').innerHTML = site(E, p);
    film();
    try { history.replaceState(null, '', '#v' + ST.v + 'p' + ST.p); } catch (x) { }
  }

  /* ---------- le film ---------- */
  var DUR = [3800, 3800, 4200, 4600, 3600], CAP = ['Votre logo', 'Votre carte de visite', 'Votre flyer', 'Votre site internet', 'Fait à Flize, pour Flize'], tm = [], enCours = true;
  function film() {
    var f = $('#film'), p = pal(), S = SECT[E.k]; if (!f) return;
    f.querySelector('.s0').innerHTML = '<div class="big">' + logo(E, ST.v, p, true) + '</div>';
    f.querySelector('.s1').innerHTML = '<div class="flip"><div class="fa">' + carte(E, p, 'f') + '</div><div class="fb">' + carte(E, p, 'b') + '</div></div>';
    f.querySelector('.s2').innerHTML = '<div class="fy">' + flyer(E, p) + '</div>';
    f.querySelector('.s3').innerHTML = '<div class="sy">' + site(E, p) + '</div>';
    f.querySelector('.s4').innerHTML = '<div class="fin"><div class="mini">' + marque(E, ST.v, p, true) + '</div><h3>' + esc(E.nom) + '</h3><p>Fait à Flize, pour Flize.</p><b>Votre site : 100 €</b></div>';
    f.dataset.n = D.querySelector('#film .s0') ? '1' : '0';
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
    ST.p = h ? +h[2] % 3 : hash(E.nom) % 3; ST.v = h ? +h[1] % 3 : 0;
    D.title = 'Maquette pour ' + E.nom + ' · WebRénov Flize';
    D.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-v],[data-p],[data-dl],[data-print],[data-film],[data-go]'); if (!b) return;
      if (b.dataset.v != null) { ST.v = +b.dataset.v; rendre(); }
      else if (b.dataset.p != null) { ST.p = +b.dataset.p; rendre(); }
      else if (b.dataset.dl != null) { download('logo-' + E.slug + '-' + (+b.dataset.dl + 1) + '.svg', logo(E, +b.dataset.dl, pal(), false)); }
      else if (b.dataset.print) { D.body.dataset.print = b.dataset.print; setTimeout(function () { W.print(); setTimeout(function () { delete D.body.dataset.print; }, 400); }, 80); }
      else if (b.dataset.film) { if (b.dataset.film === 'toggle') { enCours = !enCours; b.textContent = enCours ? '❚❚ Pause' : '▶ Lecture'; if (enCours) lire((+$('#film').dataset.s + 1 + DUR.length) % DUR.length); else tm.forEach(clearTimeout); } else { lire(+b.dataset.film); } }
    });
    if (W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches) { enCours = false; var t = $('[data-film="toggle"]'); if (t) t.textContent = '▶ Lecture'; }
    rendre();
  }

  /* ---------- annuaire (page d'accueil du dossier) ---------- */
  function annuaire() {
    var L = W.LIST, el = $('#grille'), ch = $('#filtres'), cur = '';
    var groupes = {}; L.forEach(function (e) { groupes[e.g] = (groupes[e.g] || 0) + 1; });
    ch.innerHTML = '<button type="button" class="ch on" data-g="">Tous (' + L.length + ')</button>' + Object.keys(groupes).map(function (g) { return '<button type="button" class="ch" data-g="' + esc(g) + '">' + esc(g) + ' (' + groupes[g] + ')</button>'; }).join('');
    function dessiner() {
      el.innerHTML = L.filter(function (e) { return !cur || e.g === cur; }).map(function (e) {
        var p = SECT[e.k].p[hash(e.nom) % 3];
        return '<a class="ca" href="' + esc(e.slug) + '/">' + (e.c ? '<div class="cph"><img loading="lazy" src="img/' + esc(e.slug) + '/ciel.jpg" alt=""></div>' : '') + '<div class="cl">' + logo(e, 0, p, false) + '</div><b>' + esc(e.nom) + '</b><span>' + esc(SECT[e.k].l) + '</span><u>Voir la maquette →</u></a>';
      }).join('');
    }
    ch.addEventListener('click', function (ev) { var b = ev.target.closest('.ch'); if (!b) return; cur = b.dataset.g; [].forEach.call(ch.children, function (x) { x.classList.toggle('on', x === b); }); dessiner(); });
    dessiner();
  }
  W.FP = { ICON: ICON, SECT: SECT, hash: hash, rgb: rgb, mix: mix, esc: esc, logo: logo, marque: marque, qr: qr, initiales: initiales, download: download };
  if (W.E) { if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init); else init(); }
  else if (W.LIST) { if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', annuaire); else annuaire(); }
})();
