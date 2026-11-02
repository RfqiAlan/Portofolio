# Rifqi Alan Maulana: 3D Interactive Portfolio

Sebuah website portofolio interaktif berbasis 3D isometrik scrollytelling yang dibangun menggunakan Three.js dan web modern standar. Menampilkan visualisasi ruang kantor virtual, karakter interaktif yang bergerak mengikuti alur scroll, 6 showcase proyek rekayasa perangkat lunak, serta resume profil profesional lengkap.

---

## Fitur Utama

* **3D Isometric Scrollytelling:** Visualisasi gedung kantor dan 6 bilik proyek yang dikendalikan secara halus melalui scroll roda mouse atau gestur layar sentuh.
* **Procedural Character & Path:** Karakter 3D yang berjalan dinamis mengikuti kurva *Catmull-Rom spline* melintasi setiap ruangan kerja.
* **Seamless Page Transition:** Setelah tur 3D selesai di bilik proyek ke-6, halaman bertransisi mulus menjadi website profil konvensional yang dapat di-scroll seperti biasa.
* **7 Domain Keahlian:** Meliputi Machine Learning & AI, Computer Vision, Data & Predictive Analytics, Product Thinking & UI/UX, Front-End, Back-End & API, serta Databases & Version Control.
* **Accessible & High-Contrast:** Memenuhi standar aksesibilitas WCAG AAA dengan tipografi tajam, dukungan mode gelap dan terang, serta bebas elemen visual artifisial.

---

## Tech Stack

* **3D Graphics:** Three.js (WebGL procedural geometries & canvas texturing)
* **Core:** Semantic HTML5, Modern CSS3 (CSS Variables, Flexbox, Grid), Vanilla JavaScript (ES6+)
* **Typography:** Bricolage Grotesque, Plus Jakarta Sans, Caveat
* **Deployment:** Vercel

---

## Struktur Folder

```text
├── index.html                  # Dokumen HTML utama dan struktur website biasa
├── styles.css                  # Desain visual, sistem token warna, responsivitas
├── app.js                      # Engine Three.js, spline, kamera, animasi, dan scrollytelling
├── vercel.json                 # Konfigurasi deployment Vercel
├── CV-Rifqi Alan Maulana.pdf  # Berkas resume unduhan
└── README.md                   # Dokumentasi proyek
```

---

## Menjalankan Proyek Secara Lokal

1. Clone repositori ini:
   ```bash
   git clone https://github.com/RfqiAlan/Portofolio.git
   cd Portofolio
   ```

2. Buka dengan Live Server di VS Code atau jalankan server lokal:
   ```bash
   npx serve .
   ```

3. Buka peramban pada alamat `http://localhost:3000`.

---

## Kontak & Profil

* **Nama:** Rifqi Alan Maulana
* **Pendidikan:** S1 Sistem Informasi, Universitas Hasanuddin (IPK 3.97)
* **Email:** [rifqialan46475@gmail.com](mailto:rifqialan46475@gmail.com)
* **GitHub:** [github.com/RfqiAlan](https://github.com/RfqiAlan)

