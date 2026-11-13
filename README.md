# Arabic Quest — The Lost Kingdom

Game edukasi Bahasa Arab dengan dua mode:
- Eksplorasi Top-Down Pixel Art.
- Pertarungan Side-View Turn-Based.
- Kuis kosakata Bahasa Arab saat menyerang dan bertahan.
- HP, XP, Gold, potion, koin, dan penyimpanan progress lokal.

## Teknologi
- Phaser 3.90.0
- JavaScript ES Modules
- Vite 6
- LocalStorage

## Menjalankan lokal
Persyaratan: Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan Vite, biasanya `http://localhost:5173`.

## Build production
```bash
npm run build
npm run preview
```

Hasil build berada di folder `dist`.

## Kontrol
- WASD atau tombol panah: bergerak.
- Shift: berlari.
- Sentuh koin: mengambil koin.
- Sentuh Slime: memulai battle.

## Sistem battle
- Attack: jawab soal untuk menyerang.
- Defend: bersiap mengurangi damage, lalu jawab soal saat monster menyerang.
- Skill: serangan spesial dengan damage lebih besar.
- Potion: memulihkan HP.
- Jawaban benar dan cepat memberi bonus critical damage.
- Jawaban benar saat monster menyerang menghasilkan perfect dodge.

## Deploy ke Vercel
1. Upload seluruh isi folder proyek ini ke repository GitHub.
2. Import repository tersebut di Vercel.
3. Framework Preset: Vite.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Klik Deploy.

MVP ini tidak membutuhkan backend.

## Catatan
Aset karakter dan objek pada versi awal dibuat secara prosedural dari kode agar game bisa langsung berjalan tanpa mengunduh aset eksternal. Aset tersebut merupakan placeholder awal dan dapat diganti sprite sheet pixel art khusus pada tahap pengembangan berikutnya.
