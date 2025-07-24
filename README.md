# 🎉 Website Ulang Tahun Romantis

Website ulang tahun interaktif yang dibuat khusus untuk pacar tercinta! ❤️

## ✨ Fitur

- 🎯 4 Quiz Grid interaktif di awal
- 📸 Foto surprise di akhir setelah menjawab semua pertanyaan
- 💖 Design romantis dengan animasi smooth
- 🌈 Gradient warna yang cantik (pink, purple, indigo)
- 🎨 Ikon dari Lucide React (heart, star, gift, sparkles)
- 📱 Responsive untuk mobile dan desktop
- ⚡ Built dengan Next.js, TypeScript, dan Tailwind CSS

## 🚀 Cara Menjalankan

### Pertama kali setup:
```bash
npm install
```

### Jalankan di localhost:
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat website.

## 📸 Cara Menambahkan Foto

1. Siapkan foto yang ingin ditampilkan
2. Letakkan foto di folder `public/images/` dengan nama `birthday-photo.jpg`
3. Update komponen `BirthdayWebsite.tsx` untuk menggunakan foto tersebut

Ganti bagian placeholder dengan:
```jsx
<img 
  src="/images/birthday-photo.jpg" 
  alt="Foto Ulang Tahun" 
  className="w-full h-96 object-cover rounded-lg"
/>
```

## 🎨 Kustomisasi

### Mengubah Pertanyaan:
Edit array `questions` di file `src/components/BirthdayWebsite.tsx`

### Mengubah Warna:
Edit class Tailwind di komponen untuk menyesuaikan skema warna

### Mengubah Animasi:
Modify properti Framer Motion untuk animasi yang berbeda

## 🌐 Deploy ke Vercel

1. Push kode ke GitHub repository
2. Buka [Vercel](https://vercel.com)
3. Import repository GitHub Anda
4. Deploy otomatis akan berjalan!

Atau gunakan Vercel CLI:
```bash
npm i -g vercel
vercel
```

## 📁 Struktur Project

```
src/
  ├── app/
  │   ├── page.tsx          # Halaman utama
  │   └── layout.tsx        # Layout aplikasi
  ├── components/
  │   └── BirthdayWebsite.tsx  # Komponen utama quiz
public/
  └── images/               # Folder untuk foto
```

## 💡 Tips

- Sesuaikan pertanyaan dengan hal-hal personal yang hanya kalian berdua yang tahu
- Pilih foto yang memiliki momen spesial
- Test di mobile device untuk memastikan tampilan responsive
- Gunakan foto dengan resolusi yang baik untuk hasil terbaik

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Deployment**: Vercel

---

Made with ❤️ for someone special

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
