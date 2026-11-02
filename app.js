// PORTOFOLIO: SOFTWARE DEVELOPER
// Engine & Scrollytelling based on Portofolio: Software Developer
// Profil developer dan daftar project
const PROFILE = {
  brand: 'Rifqi',                                 // logo di navbar & gedung (titik oranye otomatis)
  eyebrow: 'Rifqi Alan Maulana · Software Developer',
  line1: 'Membangun Produk,',                     // judul hero baris 1 (hitam)
  line2: 'Satu per Satu.',                        // judul hero baris 2 (oranye)
  intro: 'Full-stack, mobile, dan AI developer. Scroll untuk berkeliling dan melihat 6 project yang pernah saya kerjakan.',
  stats: [['6', 'Project'], ['3+', 'Tahun Belajar'], ['Full-stack', 'Web · Android · AI']],
  email: 'rifqialan46475@gmail.com',
  cv: 'CV-Rifqi Alan Maulana.pdf',
  banner: ['Code', 'Build', 'Ship'],              // tulisan di banner oranye gedung
  sign: 'Open to Work',                           // papan di kanopi gedung
  script: 'Dari ide,<br>jadi produk.',            // tulisan tangan di hero
  nav: ['Profil', 'Project', 'Skill', 'Kontak']
};

const PROJECTS = [
  {
    short: 'RemoteIn',
    sign: 'RemoteIn',
    role: 'Project 1 · Full-Stack Remote Job Portal',
    t1: 'RemoteIn,',
    t2: 'Portal Kerja Remote.',
    desc: 'Platform lowongan kerja remote yang mempertemukan perusahaan dan pencari kerja dalam satu aplikasi web responsif.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL'],
    points: ['Pencarian & filter lowongan instan', 'Dashboard perusahaan dan pelamar', 'Autentikasi aman & manajemen profil'],
    demo: 'https://github.com/rifqialan',
    repo: 'https://github.com/rifqialan'
  },
  {
    short: 'HRM',
    sign: 'HRM App',
    role: 'Project 2 · HRM Application',
    t1: 'HRM,',
    t2: 'Kelola SDM Lebih Rapi.',
    desc: 'Aplikasi manajemen sumber daya manusia untuk data karyawan terpadu, absensi, pengajuan cuti, dan penggajian.',
    stack: ['Laravel', 'MySQL', 'Tailwind'],
    points: ['Data karyawan & absensi realtime', 'Pengajuan dan persetujuan cuti', 'Laporan dan rekapitulasi otomatis'],
    demo: 'https://github.com/rifqialan',
    repo: 'https://github.com/rifqialan'
  },
  {
    short: 'E-Learning',
    sign: 'E-Learning',
    role: 'Project 3 · E-Learning & Course Management',
    t1: 'E-Learning,',
    t2: 'Belajar Terstruktur.',
    desc: 'Platform kursus online komprehensif untuk mengelola modul materi, kelas, tugas interaktif, dan progres belajar.',
    stack: ['React', 'Node.js', 'MongoDB'],
    points: ['Manajemen kursus & kurikulum', 'Kuis interaktif dan penilaian otomatis', 'Pelacakan progres belajar peserta'],
    demo: 'https://github.com/rifqialan',
    repo: 'https://github.com/rifqialan'
  },
  {
    short: 'HomeCraft',
    sign: 'HomeCraft',
    role: 'Project 4 · Native Android E-Commerce',
    t1: 'HomeCraft,',
    t2: 'Belanja dari Genggaman.',
    desc: 'Aplikasi e-commerce Android native untuk produk kerajinan rumah tangga unik, dari katalog interaktif sampai proses checkout.',
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase'],
    points: ['Katalog, keranjang, dan checkout', 'Notifikasi pesanan push realtime', 'Antarmuka native yang sangat responsif'],
    demo: 'https://github.com/rifqialan',
    repo: 'https://github.com/rifqialan'
  },
  {
    short: 'SmartDoc',
    sign: 'SmartDoc AI',
    role: 'Project 5 · SmartDoc Assistant: RAG AI System',
    t1: 'SmartDoc,',
    t2: 'Tanya Dokumen, Langsung Jawab.',
    desc: 'Asisten kecerdasan buatan berbasis RAG yang menjawab pertanyaan dari dokumen PDF/Word yang diunggah lengkap dengan sitasi rujukan sumber.',
    stack: ['Python', 'LangChain', 'Vector DB'],
    points: ['Unggah dan ekstraksi indeks dokumen', 'Jawaban akurat dengan kutipan halaman', 'Pencarian semantik berkecepatan tinggi'],
    demo: 'https://github.com/rifqialan',
    repo: 'https://github.com/rifqialan'
  },
  {
    short: 'KPI System',
    sign: 'KPI System',
    role: 'Project 6 · KPI Management System: Universitas Samudra',
    t1: 'KPI System,',
    t2: 'Kinerja Terukur.',
    desc: 'Sistem manajemen indikator kinerja utama untuk Universitas Samudra: penetapan target tahunan, pengisian capaian, dan pelaporan metrik.',
    stack: ['Laravel', 'MySQL', 'Chart.js'],
    points: ['Penetapan indikator & target per unit', 'Input dan verifikasi capaian berkala', 'Dashboard visualisasi kinerja institusi'],
    demo: 'https://github.com/rifqialan',
    repo: 'https://github.com/rifqialan'
  }
];

const NR = PROJECTS.length;

// -------------------------------------------------------------
// 1. SETUP NAVIGATION & UI CARDS
// -------------------------------------------------------------
const nav = document.getElementById('nav');
if (nav) {
  nav.innerHTML = `
    <a href="#" class="brand-link" onclick="window.scrollTo({top:0, behavior:'smooth'}); return false;">
      <b>${PROFILE.brand}<i>.</i></b>
    </a>
    <div class="nav-links">
      <a onclick="scrollToStep(0)">Tur 3D</a>
      <a href="#tentang">Tentang</a>
      <a href="#proyek">Proyek</a>
      <a href="#keahlian">Keahlian</a>
      <a href="#kontak">Kontak</a>
    </div>
    <span class="sp"></span>
    <div class="nav-actions">
      <a class="btn nav-cv-btn" href="${PROFILE.cv}">Unduh CV</a>
      <button type="button" class="btn d nav-contact-btn" onclick="openContactModal()">Hubungi Saya</button>
      <button type="button" class="btn nav-menu-toggle" aria-label="Buka Menu Navigasi" onclick="toggleMobileNav()">
        <span class="menu-icon"></span>
      </button>
    </div>
    <div class="mobile-nav-drawer" id="mobile-nav-drawer">
      <div class="mobile-nav-items">
        <a onclick="scrollToStep(0); toggleMobileNav(false);">Tur 3D Isometrik</a>
        <a href="#tentang" onclick="toggleMobileNav(false);">Tentang Saya</a>
        <a href="#proyek" onclick="toggleMobileNav(false);">6 Proyek Unggulan</a>
        <a href="#keahlian" onclick="toggleMobileNav(false);">Keahlian Teknis</a>
        <a href="#kontak" onclick="toggleMobileNav(false);">Kontak & Kolaborasi</a>
        <div class="mobile-nav-btns">
          <a class="btn" href="${PROFILE.cv}" download style="width:100%; justify-content:center;">Unduh Resume CV</a>
          <button type="button" class="btn d" onclick="toggleMobileNav(false); openContactModal();" style="width:100%; justify-content:center;">Hubungi Saya</button>
        </div>
      </div>
    </div>
  `;
}

window.toggleMobileNav = function(forceState) {
  const drawer = document.getElementById('mobile-nav-drawer');
  const toggleBtn = document.querySelector('.nav-menu-toggle');
  if (!drawer) return;
  const isOpen = forceState !== undefined ? forceState : !drawer.classList.contains('open');
  if (isOpen) {
    drawer.classList.add('open');
    if (toggleBtn) toggleBtn.classList.add('active');
  } else {
    drawer.classList.remove('open');
    if (toggleBtn) toggleBtn.classList.remove('active');
  }
};

document.addEventListener('click', (e) => {
  const drawer = document.getElementById('mobile-nav-drawer');
  const toggleBtn = document.querySelector('.nav-menu-toggle');
  if (!drawer || !drawer.classList.contains('open')) return;
  if (!drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
    window.toggleMobileNav(false);
  }
});

const ST = [
  [
    PROFILE.eyebrow,
    PROFILE.line1,
    PROFILE.line2,
    PROFILE.intro,
    `<div class="cta">
      <a class="btn d" onclick="scrollToStep(1)">Lihat Proyek</a>
      <button class="btn" onclick="openContactModal()">Hubungi Saya</button>
    </div>
    <div class="stats">
      ${PROFILE.stats.map(s => `<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}
    </div>`
  ]
].concat(
  PROJECTS.map((p, pIdx) => [
    p.role,
    p.t1,
    p.t2,
    p.desc,
    `<div class="card">
      <b>Tech stack</b>
      <div class="chips">${p.stack.map(s => `<span>${s}</span>`).join('')}</div>
      <ul class="hl">${p.points.map(s => `<li>${s}</li>`).join('')}</ul>
      <div class="lnk">
        <a class="btn d" href="${p.demo}" target="_blank" rel="noopener noreferrer">Repositori</a>
        <a class="btn" href="${p.repo}" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
      ${pIdx === PROJECTS.length - 1 ? `<button type="button" class="btn d" style="margin-top:10px; width:100%; text-align:center;" onclick="document.getElementById('website-biasa').scrollIntoView({behavior:'smooth'})">Lihat Profil & Website Lengkap</button>` : ''}
    </div>`
  ])
);

const NAMES = ['Profil'].concat(PROJECTS.map(p => p.short));
const copy = document.getElementById('copy');
const prog = document.getElementById('prog');
const scr = document.getElementById('script');

if (scr) scr.innerHTML = PROFILE.script;

if (prog) {
  prog.innerHTML = NAMES.map((n, i) => `<div class="seg" data-idx="${i}"><small>0${i + 1}</small><i></i>${n}</div>`).join('') + '<div class="hint" id="hint">Scroll ↓</div>';
}

const segs = [...document.querySelectorAll('.seg')];
let cur = -1;

function setStep(i) {
  if (i === cur) return;
  cur = i;
  if (copy) copy.classList.add('out');
  if (scr) scr.style.opacity = i === 0 ? 1 : 0;
  segs.forEach((s, k) => s.classList.toggle('on', k === i));

  setTimeout(() => {
    const s = ST[i];
    if (copy && s) {
      copy.innerHTML = `<div class="eyebrow">${s[0]}</div><h1>${s[1]}<em>${s[2]}</em></h1><p>${s[3]}</p>${s[4]}`;
      copy.classList.remove('out');
    }
  }, 260);
}

// Tour navigation metrics: KPI System selesai dulu (750vh), lalu hold (100vh), baru profil muncul (>850vh)
function getTourMetrics() {
  const h = window.innerHeight;
  const tourDistance = 7.5 * h; // 750vh untuk menyelesaikan stasiun 0 sampai stasiun 6 (KPI System)
  const holdDistance = 1.0 * h; // 100vh hold penuh di KPI System
  const spacerHeight = tourDistance + holdDistance + h; // 950vh total spacer
  return { tourDistance, holdDistance, spacerHeight, h };
}

// Stepper click jump navigation
window.scrollToStep = function(idx) {
  const { tourDistance, holdDistance } = getTourMetrics();
  let targetY = (idx / NR) * tourDistance;
  if (idx === NR) {
    targetY = tourDistance + holdDistance * 0.2; // mendarat tepat dan nyaman di KPI System
  }
  window.scrollTo({ top: targetY, behavior: 'smooth' });
};

segs.forEach(seg => {
  seg.addEventListener('click', () => {
    const idx = parseInt(seg.getAttribute('data-idx'));
    window.scrollToStep(idx);
  });
});

const hintEl = document.getElementById('hint');
if (hintEl) {
  hintEl.addEventListener('click', () => {
    window.scrollToStep(1);
  });
}

// -------------------------------------------------------------
// 2. THREE.JS ENGINE SETUP
// -------------------------------------------------------------
const T = THREE;
const OR = '#ff7a2e', ORB = '#ff8f45', CR = '#fbeee0', WH = '#fbf6f0', TAN = '#e6b88a';

const canvas = document.getElementById('c');
const R = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
R.outputEncoding = T.sRGBEncoding;
R.shadowMap.enabled = true;
R.shadowMap.type = T.PCFSoftShadowMap;
R.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const S = new T.Scene();
const cam = new T.OrthographicCamera(-1, 1, 1, -1, -150, 300);

S.add(new T.HemisphereLight(0xfff6ee, 0xffd9bd, 0.78));
const fill = new T.DirectionalLight(0xffe2c8, 0.22);
fill.position.set(20, 12, 24);
S.add(fill);

const sun = new T.DirectionalLight(0xfff4e8, 0.55);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -26, right: 26, top: 26, bottom: -26, near: 1, far: 100 });
sun.shadow.radius = 6;
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.03;
S.add(sun, sun.target);

const gp = new T.Mesh(new T.PlaneGeometry(600, 600).rotateX(-Math.PI / 2), new T.ShadowMaterial({ opacity: 0.16 }));
gp.receiveShadow = true;
S.add(gp);

const grid = new T.GridHelper(400, 133, 0xcdb8a4, 0xcdb8a4);
grid.material.transparent = true;
grid.material.opacity = 0.22;
grid.position.y = 0.01;
S.add(grid);

const mats = {};
const M = c => mats[c] || (mats[c] = new T.MeshStandardMaterial({ color: c, roughness: 0.72, metalness: 0.02 }));
const put = (m, x, y, z, g = S) => {
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  g.add(m);
  return m;
};

// Rounded Extruded Box Geometry Cache
const gc = {};
function RB(w, h, d) {
  const k = w + '_' + h + '_' + d;
  if (gc[k]) return gc[k];
  const m = Math.min(w, h, d);
  if (m < 0.2) return gc[k] = new T.BoxGeometry(w, h, d);

  const r = Math.min(0.1, m / 3);
  const s = new T.Shape();
  const a = w / 2 - r, b = h / 2 - r;
  s.moveTo(-a, -b);
  s.lineTo(a, -b);
  s.lineTo(a, b);
  s.lineTo(-a, b);
  s.closePath();

  const g = new T.ExtrudeGeometry(s, {
    depth: d - 2 * r,
    bevelEnabled: true,
    bevelThickness: r,
    bevelSize: r,
    bevelSegments: 2,
    curveSegments: 3
  });
  g.translate(0, 0, -(d - 2 * r) / 2);
  return gc[k] = g;
}

const bx = (w, h, d, x, y, z, c) => put(new T.Mesh(RB(w, h, d), M(c)), x, y + h / 2, z);
const cy = (r, h, x, y, z, c) => put(new T.Mesh(new T.CylinderGeometry(r, r, h, 14), M(c)), x, y + h / 2, z);
const sp = (r, x, y, z, c) => put(new T.Mesh(new T.SphereGeometry(r, 14, 10), M(c)), x, y, z);

function ctex(w, h, fn) {
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  fn(cv.getContext('2d'), w, h);
  const t = new T.CanvasTexture(cv);
  t.encoding = T.sRGBEncoding;
  t.anisotropy = 4;
  return t;
}

function plane(w, h, tx, x, y, z, ry = 0) {
  const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ map: tx, transparent: true }));
  m.position.set(x, y, z);
  m.rotation.y = ry;
  S.add(m);
}

const rr = (g, x, y, w, h, r) => {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
};

const bar = (t, x, y, z) => plane(3.6, 0.62, ctex(512, 88, (g, W, H) => {
  g.fillStyle = ORB;
  rr(g, 0, 0, W, H, 16);
  g.fill();
  g.fillStyle = '#fff';
  g.font = '700 38px sans-serif';
  g.textBaseline = 'middle';
  g.fillText('+  ' + t.toUpperCase(), 28, H / 2 + 2);
}), x, y, z);

// -------------------------------------------------------------
// 3. KARAKTER MANUSIA HIDUP & OBJEK PROYEK
// -------------------------------------------------------------
const people = [], leds = [], rob = [];

const blobT = ctex(64, 64, (g) => {
  const r = g.createRadialGradient(32, 32, 2, 32, 32, 30);
  r.addColorStop(0, 'rgba(60,35,20,.38)');
  r.addColorStop(1, 'rgba(60,35,20,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
});

const blob = (x, z, s) => {
  const m = new T.Mesh(new T.PlaneGeometry(s, s).rotateX(-Math.PI / 2), new T.MeshBasicMaterial({ map: blobT, transparent: true, depthWrite: false }));
  m.position.set(x, 0.215, z);
  S.add(m);
  return m;
};

function person(x, z, o) {
  const g = new T.Group();
  const Y = o.seat ? -0.3 : 0;
  const pc = o.p || '#2a3558';
  const sk = o.sk || '#e9b995';
  const hc = o.h || '#2a1d17';

  const piv = (px, py, pz) => {
    const q = new T.Group();
    q.position.set(px, py, pz);
    g.add(q);
    return q;
  };

  const a = (geo, c, px, py, pz, p) => {
    const m = new T.Mesh(geo, M(c));
    m.position.set(px, py, pz);
    m.castShadow = true;
    (p || g).add(m);
    return m;
  };

  const u = { ph: Math.random() * 6.28, seat: !!o.seat };

  if (o.seat) {
    a(new T.BoxGeometry(0.55, 0.24, 0.85), pc, 0, 0.5, 0.3);
  } else {
    u.L = piv(-0.17, 0.85, 0);
    u.Rr = piv(0.17, 0.85, 0);
    [u.L, u.Rr].forEach(q => {
      a(new T.CylinderGeometry(0.14, 0.12, 0.85, 10), pc, 0, -0.43, 0, q);
      a(new T.BoxGeometry(0.22, 0.1, 0.34), '#222', 0, -0.86, 0.06, q);
    });
  }

  a(new T.CylinderGeometry(0.3, 0.34, 0.9, 14), o.c, 0, 1.28 + Y, 0);

  u.AL = piv(-0.43, 1.58 + Y, 0);
  u.AR = piv(0.43, 1.58 + Y, 0);
  [u.AL, u.AR].forEach((q, k) => {
    a(new T.CylinderGeometry(0.09, 0.085, 0.75, 8), o.c, 0, -0.38, 0, q);
    a(new T.SphereGeometry(0.09, 8, 6), sk, 0, -0.78, 0, q);
    q.rotation.z = (k ? 1 : -1) * 0.1;
  });

  u.H = piv(0, 1.92 + Y, 0);
  a(new T.SphereGeometry(0.26, 14, 10), sk, 0, 0, 0, u.H);
  const h = a(new T.SphereGeometry(0.275, 14, 8, 0, 6.283, 0, 1.75), hc, 0, 0.04, -0.02, u.H);
  h.rotation.x = -0.25;

  if (o.bun) a(new T.SphereGeometry(0.12, 10, 8), hc, 0, 0.16, -0.27, u.H);
  if (o.bag) a(new T.BoxGeometry(0.4, 0.55, 0.2), o.bag, 0, 1.3 + Y, -0.4);

  g.position.set(x, 0.2, z);
  g.rotation.y = o.ry || 0;
  S.add(g);
  u.blob = blob(x, z, 1.5);
  g.userData = u;
  people.push(g);
  return g;
}

const plant = (x, z, s = 1) => {
  cy(0.4 * s, 0.55 * s, x, 0.2, z, '#ece4d8');
  [[0, 0, 0], [0.35, 0.2, 0.1], [-0.3, 0.15, -0.2], [0, 0.45, 0.1]].forEach(a => {
    sp(0.5 * s, x + a[0] * s, 0.95 * s + a[1] * s, z + a[2] * s, '#4f8f3f');
  });
};

const mon = (x, y, z) => {
  bx(0.85, 0.55, 0.06, x, y + 0.25, z, '#1f1f22');
  bx(0.12, 0.28, 0.1, x, y, z, '#333');
};

const desk = (x, z, w = 2.4) => {
  bx(w, 0.95, 1.3, x, 0.2, z, '#f6efe7');
  bx(w + 0.1, 0.1, 1.4, x, 1.15, z, TAN);
};

const counter = (x, z, l, top) => {
  bx(l, 1.05, 1, x, 0.2, z, '#f6efe7');
  bx(l + 0.2, 0.1, 1.35, x, 1.25, z, top);
  bx(l + 0.02, 0.16, 0.06, x, 0.7, z + 0.52, OR);
};

const pal = ['#ff7a2e', '#f6c85f', '#6ab187', '#a58bd6', '#4f8fd6', '#e4572e', '#ffffff', '#f0a8c0'];

const dash = (x, y, z, w, h) => {
  bx(w + 0.2, h + 0.2, 0.2, x, y, z, '#1d1b1a');
  plane(w, h, ctex(400, Math.round(400 * h / w), (g, W, H) => {
    g.fillStyle = '#26221f';
    g.fillRect(0, 0, W, H);
    g.fillStyle = OR;
    [0.3, 0.5, 0.4, 0.7, 0.6, 0.9].forEach((v, k) => {
      g.fillRect(24 + k * (W - 48) / 6, H - 16 - v * (H - 50), (W - 48) / 6 - 10, v * (H - 50));
    });
    g.fillStyle = '#fff';
    g.font = '700 16px sans-serif';
    g.fillText('Dashboard', 16, 22);
  }), x, y + (h + 0.2) / 2, z + 0.11);
};

const shelf = (x, w, rows) => {
  bx(w, rows * 0.78, 0.3, x, 0.2, -8.75, '#f3ece3');
  for (let r = 0; r <= rows; r++) {
    bx(w, 0.1, 0.7, x, 0.2 + r * 0.78, -8.5, '#fff');
    if (r < rows) {
      for (let c = 0; c < Math.floor(w / 0.5); c++) {
        bx(0.38, 0.5 + ((c * 7 + r * 3) % 3) * 0.08, 0.4, x - w / 2 + 0.3 + c * 0.5, 0.3 + r * 0.78, -8.5, pal[(c * 3 + r * 5) % 8]);
      }
    }
  }
};

const C = i => 18 + (i - 1) * 14;
const FZ = 4, BZ = -9;

const FT = ctex(256, 256, (g) => {
  g.fillStyle = '#fbeee0';
  g.fillRect(0, 0, 256, 256);
  g.strokeStyle = '#efd9c5';
  g.lineWidth = 3;
  g.strokeRect(0, 0, 256, 256);
  const gr = g.createLinearGradient(0, 0, 256, 256);
  gr.addColorStop(0, 'rgba(255,255,255,.35)');
  gr.addColorStop(1, 'rgba(230,190,150,.12)');
  g.fillStyle = gr;
  g.fillRect(0, 0, 256, 256);
});
FT.wrapS = FT.wrapT = T.RepeatWrapping;
FT.repeat.set(7, 6.5);

const floor = x => {
  const m = new T.Mesh(new T.PlaneGeometry(14, 13).rotateX(-Math.PI / 2), new T.MeshStandardMaterial({ map: FT, roughness: 0.55 }));
  m.position.set(x, 0.202, -2.5);
  m.receiveShadow = true;
  S.add(m);
};

function room(i) {
  const x = C(i);
  bx(14, 0.2, 13, x, 0, -2.5, CR);
  floor(x);
  bx(14.2, 0.14, 0.7, x, 0.2, FZ + 0.15, ORB);
  bx(14, 3.2, 0.5, x, 0.2, BZ - 0.25, WH);
  bx(14, 0.12, 0.5, x, 3.4, BZ - 0.25, ORB);
  (i === 1 ? [x - 7, x + 7] : [x + 7]).forEach(px => {
    bx(0.6, 3, 8.4, px, 0.2, -5.05, WH);
    bx(0.6, 0.12, 8.4, px, 3.2, -5.05, ORB);
    bx(0.5, 0.1, 8.4, px + 0.55, 0.2, -5.05, ORB);
  });
  bar(PROJECTS[i - 1].sign, x - 3.3, 2.3, BZ + 0.03);
  return x;
}

// -------------------------------------------------------------
// 4. MODELING GEDUNG MARKAS & 6 RUANGAN PROYEK
// -------------------------------------------------------------

// Gedung Hero (Headquarters)
bx(9.5, 1.3, 8, 0, 0, 0.5, '#f6efe8');
bx(9.7, 0.15, 8.2, 0, 1.3, 0.5, '#ffffff');
[-2.8, -0.6, 1.6].forEach(px => {
  const m = bx(1.8, 0.1, 1.1, px + 1.2, 1.5, 3, '#2b3550');
  m.rotation.x = -0.3;
});
bx(5.8, 10.5, 5.8, 0, 1.3, -2, '#fbf6f0');
for (let y = 3; y < 11; y += 1.15) {
  bx(5.9, 0.66, 5.9, 0, y, -2, '#2c2c31');
}
bx(0.7, 12.5, 4.8, 3.4, 0, -2.3, '#ff6a1a');
for (let k = 0; k < 17; k++) {
  bx(0.08, 12.5, 0.07, 3.78, 0, -4.5 + k * 0.27, '#e55a10');
}

plane(2.3, 2.8, ctex(230, 280, (g) => {
  g.fillStyle = '#fff';
  g.font = '600 34px sans-serif';
  PROFILE.banner.forEach((t, k) => g.fillText(t, 20, 50 + k * 40));
}), 3.8, 10.4, -2.3, Math.PI / 2);

const ring = new T.Mesh(new T.TorusGeometry(1.2, 0.12, 8, 40), M('#ff8f45'));
ring.rotation.x = Math.PI / 2;
put(ring, 0, 11.9, -2);

plane(3.2, 0.9, ctex(320, 90, (g, W, H) => {
  g.fillStyle = '#1d1a17';
  g.font = '800 60px sans-serif';
  g.textBaseline = 'middle';
  const w = g.measureText(PROFILE.brand).width;
  g.fillText(PROFILE.brand, 8, H / 2);
  g.fillStyle = '#ff6a1a';
  g.fillText('.', 8 + w, H / 2);
}), -0.6, 9.3, 0.93);

bx(2.2, 2.6, 0.3, -1.4, 0.2, 3.0, '#ff8f45');
bx(5, 0.3, 2.4, 0, 3.1, 3.6, '#ffffff');

plane(3.4, 0.4, ctex(340, 40, (g, W, H) => {
  g.fillStyle = '#1d1a17';
  g.font = '700 24px sans-serif';
  g.textBaseline = 'middle';
  g.fillText(PROFILE.sign, 4, H / 2);
}), -2.2, 2.85, 4.83);

bx(40, 0.08, 3.4, 10, 0, 11, '#3a3a3f');
bx(3.4, 0.08, 8, -8, 0, 7, '#3a3a3f');
cy(1.7, 0.08, -8, 0, 11, '#3a3a3f');
for (let k = 0; k < 14; k++) {
  bx(1.1, 0.02, 0.12, -4 + k * 2.4, 0.09, 11, '#f5f0e8');
}

const amb = new T.Group();
[[2.5, 1, 1.2, 0, 0.35, 0, '#ffffff'], [1, 0.8, 1.1, 1.2, 0.35, 0, '#ffffff'], [2.52, 0.14, 1.22, 0, 0.9, 0, '#ff6a1a']].forEach(a => {
  put(new T.Mesh(new T.BoxGeometry(a[0], a[1], a[2]), M(a[6])), a[3], a[4] + a[1] / 2, a[5], amb);
});
amb.position.set(6, 0.1, 11);
S.add(amb);

cy(0.07, 3.2, -5, 0, 8.6, '#222');
sp(0.22, -5, 3.3, 8.6, '#fff');

const tree = (x, z, s = 1) => {
  cy(0.14 * s, 1.2 * s, x, 0, z, '#8a5a3b');
  [[0, 0], [0.5, 0.3], [-0.5, 0.1], [0, 0.6]].forEach(a => {
    sp(0.85 * s, x + a[0] * s, 2.3 * s + a[1] * s, z, '#5b9a4b');
  });
};
[[-4.5, 2.5], [-3.6, 7, 0.8], [6.5, 6.6, 0.9], [-6.2, -2.5, 0.8]].forEach(a => tree(a[0], a[1], a[2] || 1));

// ---- 1. RemoteIn: meja kerja, globe 3D ----
let x = room(1);
for (let k = 0; k < 3; k++) {
  const dx = x - 4 + k * 3.2;
  desk(dx, -5.6);
  mon(dx - 0.5, 1.25, -5.8);
  mon(dx + 0.5, 1.25, -5.8);
  person(dx, -7.0, { c: ['#2f4a7a', '#5b7a9a', '#8a5a7a'][k], bun: k === 1, seat: 1 });
}
dash(x + 4.4, 1.3, BZ + 0.05, 3, 1.5);
cy(0.2, 0.9, x + 5.2, 0.2, -0.8, '#999');
sp(1.1, x + 5.2, 2.3, -0.8, '#4f8fd6');
const gr = new T.Mesh(new T.TorusGeometry(1.35, 0.06, 6, 36), M(ORB));
gr.rotation.set(1.2, 0.3, 0);
put(gr, x + 5.2, 2.3, -0.8);
plant(x - 5.8, -7.2);

// ---- 2. HRM: meja rapat bundar, lemari arsip ----
x = room(2);
cy(0.3, 0.85, x, 0.2, -3.6, '#f6efe7');
cy(2, 0.12, x, 1.05, -3.6, TAN);
[[-2.7, -3.6, Math.PI / 2, '#2f4a7a'], [2.7, -3.6, -Math.PI / 2, '#8a5a7a'], [-1.1, -5.5, 0, '#5b7a9a'], [1.1, -5.5, 0, '#3f8f93']].forEach((a, k) => {
  cy(0.4, 0.45, x + a[0], 0.2, a[1], ORB);
  person(x + a[0], a[1], { c: a[3], seat: 1, ry: a[2], bun: k % 2 });
});
for (let k = 0; k < 3; k++) {
  bx(1.2, 2.4, 0.9, x - 5 + k * 1.3, 0.2, -8.3, '#8c8e95');
  bx(0.5, 0.06, 0.06, x - 5 + k * 1.3, 1.5, -7.8, '#444');
}
dash(x + 3.6, 1.3, BZ + 0.05, 3, 1.5);
plant(x + 5.8, -1.2);

// ---- 3. E-Learning: papan tulis, bangku siswa ----
x = room(3);
bx(5.4, 2.4, 0.15, x + 0.8, 0.9, BZ + 0.05, '#ffffff');
bx(5.6, 0.12, 0.2, x + 0.8, 3.3, BZ + 0.05, ORB);

plane(5, 2, ctex(500, 200, (g) => {
  g.fillStyle = '#ff7a2e';
  g.font = '700 26px sans-serif';
  g.fillText('Modul 1 · Pengantar', 24, 40);
  g.fillStyle = '#bbb';
  [70, 100, 130, 160].forEach(y => g.fillRect(24, y, 380 - y, 6));
}), x + 0.8, 2.1, BZ + 0.15);

person(x + 0.8, -6.8, { c: '#f4f4f4', ry: 0, h: '#6c5a4a' });
for (let r = 0; r < 2; r++) {
  for (let k = 0; k < 3; k++) {
    const dx = x - 3 + k * 3, dz = -3 + r * 2.8;
    bx(1.6, 0.1, 0.8, dx, 0.95, dz, TAN);
    bx(0.1, 0.8, 0.1, dx - 0.6, 0.2, dz, '#999');
    bx(0.1, 0.8, 0.1, dx + 0.6, 0.2, dz, '#999');
    cy(0.35, 0.45, dx, 0.2, dz + 0.9, ORB);
    person(dx, dz + 0.9, { c: pal[(k + r * 2) % 8 === 6 ? 0 : (k + r * 2) % 8], seat: 1, ry: Math.PI, h: ['#2a1d17', '#7b4a2b', '#1d1a17'][k] });
  }
}
shelf(x - 5.5, 1.2, 3);
plant(x + 5.8, -1);

// ---- 4. HomeCraft: rak produk, ponsel besar, paket ----
x = room(4);
shelf(x - 1.8, 5, 4);
counter(x - 1.2, -4.4, 5, TAN);
person(x - 1.5, -5.6, { c: '#e9e2d8', h: '#9ec1d8', bun: 1 });
mon(x - 2.8, 1.35, -4.4);

bx(1.5, 2.7, 0.18, x + 4.4, 0.2, -3.6, '#1f1f22');
plane(1.3, 2.5, ctex(130, 250, (g, W, H) => {
  g.fillStyle = '#fff';
  g.fillRect(0, 0, W, H);
  g.fillStyle = ORB;
  g.fillRect(8, 8, W - 16, 70);
  [100, 150, 200].forEach(y => {
    g.fillStyle = '#eee';
    g.fillRect(8, y, W - 16, 38);
  });
}), x + 4.4, 1.55, -3.5);

[[3.5, -6], [4.5, -6.3], [3.9, -6]].forEach((a, k) => {
  bx(1.1, 0.9, 1, x + a[0] - 1, k === 2 ? 1.1 : 0.2, a[1], k === 2 ? '#d9a066' : TAN);
});
for (let k = 0; k < 3; k++) {
  bx(0.8, 0.9, 0.6, x - 5.2 + k * 0.85, 0.2, -1, ['#ff8f45', '#f6c85f', '#6ab187'][k]);
}
plant(x + 5.8, -7);

// ---- 5. SmartDoc AI: server rack, robot AI ----
x = room(5);
for (let k = 0; k < 3; k++) {
  bx(1.3, 3.2, 1, x - 4.6 + k * 1.6, 0.2, -8.3, '#2b2d33');
  for (let r = 0; r < 8; r++) {
    leds.push(put(new T.Mesh(new T.BoxGeometry(0.9, 0.06, 0.05), new T.MeshBasicMaterial({ color: r % 3 ? '#6ab187' : OR })), x - 4.6 + k * 1.6, 0.73 + r * 0.34, -7.78));
  }
}

const gl = new T.Mesh(new T.CircleGeometry(2.4, 40).rotateX(-Math.PI / 2), new T.MeshBasicMaterial({ color: OR, transparent: true, opacity: 0.14 }));
gl.position.set(x + 1, 0.22, -3.6);
S.add(gl);

bx(1.3, 1.4, 1, x + 1, 0.2, -4, '#f6efe7');
[
  sp(0.62, x + 1, 2.2, -4, '#ffffff'),
  bx(0.95, 0.26, 0.1, x + 1, 2.1, -3.45, OR),
  cy(0.04, 0.5, x + 1, 2.7, -4, '#999'),
  sp(0.13, x + 1, 3.3, -4, OR)
].forEach(m => {
  m.userData.y0 = m.position.y;
  rob.push(m);
});
bx(0.35, 1, 0.35, x - 0.1, 0.5, -4, '#ececec');
bx(0.35, 1, 0.35, x + 2.1, 0.5, -4, '#ececec');

for (let k = 0; k < 4; k++) {
  bx(1, 0.05, 0.7, x + 4.3, 0.2 + k * 0.09, -6.5 + k * 0.02, ['#fff', '#f7efe6', '#fff', '#f3e6d6'][k]);
}

desk(x + 4.4, -1.4, 2.6);
mon(x + 4, 1.25, -1.6);
person(x + 4.4, -0.2, { c: '#2f5d8f', seat: 1, ry: Math.PI });
plant(x - 5.8, -1.2);

// ---- 6. KPI System: dashboard besar, grafik batang 3D ----
x = room(6);
dash(x, 1.2, BZ + 0.05, 5.4, 2);
for (let k = 0; k < 5; k++) {
  bx(0.9, 0.8 + k * 0.55, 0.9, x - 2.4 + k * 1.3, 0.2, -3.6, k === 4 ? OR : '#f6c85f');
}
bx(0.12, 0.12, 3.6, x - 3, 3.2, -3.6, '#999');
desk(x + 4, -1.6, 2.6);
mon(x + 3.6, 1.25, -1.8);
person(x + 4, -0.4, { c: '#3b4f7a', seat: 1, ry: Math.PI, bun: 1 });
[[-5.2, -1.8], [-4.1, -1.8]].forEach((a, k) => {
  cy(0.4, 0.45, x + a[0], 0.2, a[1], ORB);
  person(x + a[0], a[1], { c: ['#8a5a7a', '#5b7a9a'][k], seat: 1, ry: 0 });
});
plant(x + 5.8, -7);
bx(0.7, 0.12, 13, x + 7, 0.2, -2.5, ORB);

// ---- Jalur Pemandu Kurva & Tokoh Utama ----
const stn = [[0.5, -2.2], [0, 0.2], [0, -1.6], [-0.5, -2.2], [1.5, -1.4], [0, -1.4]];
const pts = [new T.Vector3(2.5, 0.3, 7.2)];
for (let i = 1; i <= NR; i++) {
  pts.push(new T.Vector3(C(i) - 5, 0.3, 2.6), new T.Vector3(C(i) + stn[i - 1][0], 0.3, stn[i - 1][1]));
}

const curve = new T.CatmullRomCurve3(pts);
const OC = new T.Color(OR);
const tg = new T.TubeGeometry(curve, 480, 0.13, 6, false);
const full = tg.index ? tg.index.count : tg.attributes.position.count;

S.add(new T.Mesh(new T.TubeGeometry(curve, 480, 0.4, 4, false), new T.MeshBasicMaterial({ color: OC, transparent: true, opacity: 0.1 })));
const tube = new T.Mesh(tg, new T.MeshBasicMaterial({ color: OC }));
S.add(tube);

const wk = person(0, 0, { c: '#ff7a2e', bag: '#1f2d4d', p: '#1f2d4d' });

// -------------------------------------------------------------
// 5. ANIMASI LOOP & PARALLAX TRACKING
// -------------------------------------------------------------
const sm = t => t * t * (3 - 2 * t);
const c01 = t => Math.min(1, Math.max(0, t));
let cp = 0, ry = 0, pu = 0, PX = 0, PY = 0, MX = 0, MY = 0;

window.addEventListener('pointermove', e => {
  MX = e.clientX / window.innerWidth - 0.5;
  MY = e.clientY / window.innerHeight - 0.5;
});

function frame() {
  requestAnimationFrame(frame);
  const tt = performance.now() / 1000;

  const w = window.innerWidth;
  const h = window.innerHeight;
  const { tourDistance, holdDistance } = getTourMetrics();
  // tp mencapai 1.0 (KPI System) tepat saat scroll mencapai tourDistance
  const tp = Math.min(1, Math.max(0, window.scrollY / tourDistance));
  cp += (tp - cp) * 0.07;

  const sN = cp * NR;
  const i = Math.min(NR - 1, Math.floor(sN));
  const f = sN - i;
  const u = cp >= 0.999 ? 1 : (i + sm(c01((f - 0.25) / 0.5))) / NR;

  const p = curve.getPoint(u);
  const k = sm(c01(u * NR * 1.1));
  const tn = curve.getTangent(u);

  wk.position.set(p.x, 0.2, p.z);
  const tr = Math.atan2(tn.x, tn.z);
  ry += Math.atan2(Math.sin(tr - ry), Math.cos(tr - ry)) * 0.12;
  wk.rotation.y = ry;

  tube.geometry.setDrawRange(0, Math.floor(full * u / 3) * 3);

  const tg2 = new T.Vector3(p.x - 2.5 * (1 - k), p.y + 4.2 * (1 - k), p.z - 9.5 * (1 - k));
  const a = w / h;
  // Framing responsif: di layar vertikal/ponsel (a < 1), zoom dinamis agar scene 3D tidak terpotong ke samping
  const portraitZoom = a < 1 ? Math.max(1.15, 0.72 / a) : 1;
  const H = (21 - k * 9.5) * portraitZoom;

  cam.left = -H * a / 2;
  cam.right = H * a / 2;
  cam.top = H / 2;
  cam.bottom = -H / 2;

  PX += (MX - PX) * 0.05;
  PY += (MY - PY) * 0.05;
  cam.position.set(tg2.x + 12 + PX * 2.4 + Math.sin(tt * 0.35) * 0.15, tg2.y + 20 - PY * 1.6, tg2.z + 12 - PX * 2.4);
  cam.lookAt(tg2);

  const offsetY = w < 800 ? h * 0.22 : 0;
  const offsetX = w < 800 ? 0 : -w * 0.18;
  cam.setViewOffset(w, h, offsetX, offsetY, w, h);
  cam.updateProjectionMatrix();

  sun.position.set(tg2.x - 14, tg2.y + 22, tg2.z - 3);
  sun.target.position.copy(tg2);

  if (R.domElement.width !== Math.floor(w * R.getPixelRatio())) {
    R.setSize(w, h, false);
  }

  // Animasi Orang: bernapas, menoleh, mengetik
  people.forEach(g => {
    const q = g.userData;
    if (g === wk) return;
    g.position.y = 0.2 + Math.sin(tt * 1.6 + q.ph) * 0.01;
    q.H.rotation.y = Math.sin(tt * 0.5 + q.ph) * 0.5;
    q.H.rotation.x = Math.sin(tt * 0.7 + q.ph) * 0.06;
    if (q.seat) {
      q.AL.rotation.x = -0.8 + Math.sin(tt * 11 + q.ph) * 0.09;
      q.AR.rotation.x = -0.8 - Math.sin(tt * 9 + q.ph) * 0.09;
    } else {
      q.AL.rotation.x = Math.sin(tt * 1.2 + q.ph) * 0.07;
      q.AR.rotation.x = -q.AL.rotation.x;
    }
  });

  // Animasi Berjalan Tokoh Utama
  const mv = c01(Math.abs(u - pu) * 500);
  const wu = wk.userData;
  const wph = tt * 9;
  pu = u;

  wu.L.rotation.x = Math.sin(wph) * 0.65 * mv;
  wu.Rr.rotation.x = -wu.L.rotation.x;
  wu.AL.rotation.x = -wu.L.rotation.x * 0.8;
  wu.AR.rotation.x = -wu.AL.rotation.x;
  wk.position.y = 0.2 + Math.abs(Math.sin(wph)) * 0.06 * mv;
  wu.blob.position.set(p.x, p.x > 10 ? 0.215 : 0.03, p.z);

  // Animasi Objek Hidup
  leds.forEach((l, k) => {
    l.visible = Math.sin(tt * (3 + k % 5) + k * 1.7) > -0.35;
  });
  rob.forEach(m => m.position.y = m.userData.y0 + Math.sin(tt * 2) * 0.09);
  gr.rotation.z = tt * 0.6;
  ring.scale.setScalar(1 + 0.04 * Math.sin(tt * 2));
  amb.position.x = -8 + ((tt * 1.6) % 36);

  R.render(S, cam);

  // Transisi halus ke website biasa HANYA SETELAH KPI System selesai dan ditahan (hold)
  const transitionStart = tourDistance + holdDistance;
  const pastScroll = window.scrollY - transitionStart;
  const stageEl = document.getElementById('stage') || document.querySelector('.stage');

  if (pastScroll > 10) {
    const fade = Math.min(1, pastScroll / (h * 0.45));
    if (copy) {
      copy.style.opacity = `${1 - fade}`;
      copy.style.pointerEvents = fade > 0.8 ? 'none' : 'auto';
    }
    if (prog) {
      prog.style.opacity = `${1 - fade}`;
      prog.style.pointerEvents = fade > 0.8 ? 'none' : 'auto';
    }
    if (scr) scr.style.opacity = '0';
    if (stageEl && fade > 0.85) {
      stageEl.style.pointerEvents = 'none';
    }
  } else {
    if (copy && !copy.classList.contains('out')) {
      copy.style.opacity = '1';
      copy.style.pointerEvents = 'auto';
    }
    if (prog) {
      prog.style.opacity = '1';
      prog.style.pointerEvents = 'auto';
    }
    if (stageEl) {
      stageEl.style.pointerEvents = 'auto';
    }
  }

  setStep(Math.min(NR, Math.round(sN)));
  segs.forEach((e, j) => {
    const line = e.querySelector('i');
    if (line) line.style.setProperty('--f', c01(sN - j + 1));
  });

  if (hintEl) {
    if (pastScroll > 40) {
      hintEl.style.opacity = '0';
    } else if (cp > 0.95) {
      hintEl.innerHTML = 'Profil Lengkap ↓';
      hintEl.style.opacity = '1';
      hintEl.onclick = () => document.getElementById('website-biasa')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      hintEl.innerHTML = 'Scroll ↓';
      hintEl.style.opacity = '1';
      hintEl.onclick = () => window.scrollToStep(1);
    }
  }
}

R.setSize(window.innerWidth, window.innerHeight, false);
requestAnimationFrame(frame);

window.addEventListener('resize', () => {
  R.setSize(window.innerWidth, window.innerHeight, false);
});

// -------------------------------------------------------------
// 6. MODAL KONTAK CEPAT LOGIC
// -------------------------------------------------------------
window.openContactModal = function() {
  const modal = document.getElementById('contact-modal');
  if (modal) modal.style.display = 'flex';
};

window.closeContactModal = function() {
  const modal = document.getElementById('contact-modal');
  if (modal) modal.style.display = 'none';
};

window.handleContactSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('c-name')?.value || document.getElementById('cn-name')?.value || 'Teman';
  const email = document.getElementById('c-email')?.value || document.getElementById('cn-email')?.value || 'email Anda';

  alert(`Terima kasih, ${name}! Pesan Anda telah tercatat. Kami akan segera menghubungi balik ke ${email}.`);
  if (typeof window.closeContactModal === 'function') window.closeContactModal();
};
