# 🏷️ Lost and Found

Aplikasi **Lost and Found** adalah platform untuk **melaporkan dan menemukan barang hilang** secara mudah.  
Frontend ini dibangun dengan **Next.js**, **Tailwind CSS**, dan **Shadcn UI Library** untuk tampilan modern dan responsif.


## 🔹 Fitur Utama

- **Halaman Laporan Barang Hilang** – Pengguna dapat melihat dan mengisi form laporan barang hilang.  
- **Halaman Barang Ditemukan** – Pengguna bisa menandai barang yang ditemukan.  
- **Dashboard Admin** – Tampilan admin untuk memantau status laporan.  
- **Responsive UI** – Komponen UI modern dengan Tailwind + Shadcn UI.  

## 🔹 Teknologi

- **Next.js** – Framework React untuk frontend modern.  
- **Tailwind CSS** – Styling utility-first cepat dan konsisten.  
- **Shadcn UI** – Komponen UI siap pakai dan mudah dikustomisasi.  
- **React Hooks** – State management dan efek samping.  
- **TypeScript** – Supaya lebih aman dan maintainable.


## 🔹 Instalasi & Setup

1. **Clone repository**  
```bash
git clone https://github.com/megustaSzy/app-lost-and-found.git
cd app-lost-and-found
````

2. **Install dependencies**

```bash
npm install
# atau
yarn install
```

3. **Buat file `.env`** (jika perlu untuk konfigurasi API)

4. **Jalankan development server**

```bash
npm run dev
```

5. **Buka di browser**

```
http://localhost:3000
```

## 🔹 Struktur Project

```
/app                 # Halaman Next.js (App Router)
/components          # Komponen UI (Shadcn UI)
/hooks               # Custom React hooks
/lib                 # Utility functions / API helpers
/styles              # Tailwind global styles
/public              # Asset publik (gambar, ikon, dll.)
```

