# 🎂 Visual Novel Ulang Tahun: Cerita Kita ✨

Game visual novel interaktif yang dibuat khusus untuk ulang tahun **Aurelya Christine**.

---

## 🚀 Cara Membuka & Menjalankan Game

1. Buka folder:
   `D:\codecodecode\01. ULTAH AUREL\NEW\`
2. Klik dua kali file **`index.html`** (bisa dibuka dengan Google Chrome, Microsoft Edge, atau browser lainnya).
3. Game langsung berjalan dengan rasio layar **16:9** yang telah dioptimalkan khusus untuk layar laptop 15.6 inch.

---

## 📝 Di Mana & Cara Mengedit Dialog Naskah Cerita

Seluruh naskah dialog dan alur cerita berada di dalam satu file:
📄 **`D:\codecodecode\01. ULTAH AUREL\NEW\js\config.js`**

Kamu bisa membuka file tersebut menggunakan **VS Code**, **Notepad**, atau teks editor lainnya.

### Struktur Setiap Adegan di `js/config.js`:
Setiap baris dialog tersusun seperti contoh berikut:

```javascript
{
  id: "c1_s2_2",                               // ID adegan (jangan diubah)
  bg: "assets/images/bg/sungai.jpg",           // Gambar latar belakang
  speaker: "aurel",                            // Nama pembicara yang muncul di atas teks
  charLeft: "assets/images/chars/karakter base.png", // Karakter di sisi kiri
  charRight: "assets/images/chars/aurel.png",        // Karakter di sisi kanan
  activeChar: "right",                         // Siapa yang sedang bicara ('left' / 'right' / 'center')
  text: "Iyaa, tungguin!",                     // << GANTI DIALOG DI SINI >>
  nextSceneId: "c1_s2_3"                       // Adegan berikutnya
}
```

### Jika ada Pilihan (Choices):
```javascript
choices: [
  {
    label: "Aurel",                            // Teks tombol pilihan 1
    isCorrect: true,
    nextSceneId: "c1_s1_resp1"
  },
  {
    label: "Ucup",                             // Teks tombol pilihan 2
    isCorrect: false,
    funnyResponse: "INI BUKAN CERITA TENTANG AUREL TERNYATA CIK", // Pesan yang muncul jika salah
    isDeadEnd: true,
    retrySceneId: "c1_s1_6"                    // Kembali ke adegan ini untuk coba lagi
  }
]
```
> **Tips:** Cukup edit bagian `text`, `label`, `funnyResponse`, atau `speaker`. Jangan menghapus tanda petik (`"..."`) atau koma (`,`).

---

## 🎵 Backsound (Otomatis Menyala)

Backsound utama sudah terpasang di:
📂 **`assets/audio/backsound.m4a`**

- Musik otomatis menyala begitu game dibuka. Jika browser memblokir autoplay sebelum ada interaksi, musik akan menyala pada klik/sentuhan pertama pemain.
- Pemain bisa mematikan/menyalakan suara kapan saja melalui tombol speaker (🔊/🔇) di pojok kanan atas.

### Mengganti Backsound
1. Siapkan file musik berekstensi `.mp3` atau `.m4a`.
2. Timpa file **`assets/audio/backsound.m4a`** (nama file harus sama), atau
3. Ubah path di **`js/config.js`** pada bagian `meta.lofiBgmPath`.

### Musik Layar Voucher
Musik khusus saat masuk layar tiket hadiah ada di:
📂 **`assets/audio/voucher_bgm.mp3`**
Ganti isi file tersebut (nama tetap sama) untuk memakai lagu lain.

---

## 🎬 Menambahkan Video Kompilasi Kenangan (Ending)

Setelah Babak 3 selesai di Kopken, cerita akan otomatis beralih ke pemutar video kompilasi kenangan:
- Masukkan file video kamu ke:
  📂 **`D:\codecodecode\01. ULTAH AUREL\NEW\assets\video\compilation.mp4`**
- Ketika video selesai diputar (atau jika tombol *Lanjut ke Hadiah ➡️* ditekan), layar otomatis berpindah ke **5 Kartu Voucher "Anything You Want"**.

---

## 🎫 5 Tiket Voucher "Anything You Want"

- Terdapat 5 kartu tiket spesial bernomor `#01` s/d `#05`.
- Aurel dapat mengeklik **"Klaim Tiket 🎫"** dan mengetikkan permohonan/keinginannya.
- Tiket akan diberi stempel **TERKLAIM ✓** dan tersimpan permanen di memori browser laptop (`localStorage`).
