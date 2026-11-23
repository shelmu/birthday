// ============================================================
//  config.js — Game Data & Content for Visual Novel Aurel
//  Dialog persis seperti naskah di visual.md (tanpa tambahan)
// ============================================================

const GAME_CONFIG = {

  /* ──────────────────────────────────────────────
     1. META & AUDIO PATHS
     ────────────────────────────────────────────── */
  meta: {
    title: "Cerita Kita ✨",
    subtitle: "Selamat Ulang Tahun, Aurel!",
    endingVideoPath: "assets/video/compilation.mp4",
    // Backsound utama (otomatis menyala saat game dibuka / interaksi pertama)
    lofiBgmPath: "assets/audio/backsound.m4a",
    voucherBgmPath: "assets/audio/voucher_bgm.mp3"
  },

  /* ──────────────────────────────────────────────
     2. PET (Kucing Interaktif)
     ────────────────────────────────────────────── */
  pet: {
    spriteEmoji: "🐱",
    popupTexts: [
      "Meong~ ❤️",
      "Purrr~ ✨",
      "Selamat ulang tahun! 🎂",
      "Elus lagi dong~ 🐾"
    ]
  },

  /* ──────────────────────────────────────────────
     3. CHAPTERS & SCENES (PERSIS SESUAI visual.md)
     ────────────────────────────────────────────── */
  chapters: [

    // =============================================
    //  BABAK 1
    // =============================================
    {
      id: "chapter_1",
      title: "Babak 1: Sebelum Jadian",
      scenes: [

        // ── Adegan 1 (Latar Penuh Cahaya) ──
        {
          id: "c1_s1_1",
          bg: "white_light",
          speaker: null,
          charLeft: null,
          charCenter: null,
          charRight: null,
          activeChar: null,
          showPet: false,
          text: "Aurel membuka matanya, hanya penuh dengan cahaya putih, lalu terdengar suara asing.",
          nextSceneId: "c1_s1_2"
        },
        {
          id: "c1_s1_2",
          bg: "white_light",
          speaker: null,
          charLeft: null,
          charCenter: "assets/images/chars/orang hitam.png",
          charRight: null,
          activeChar: "center",
          text: "Siluet bentuk seseorang, hanya warna hitam.",
          nextSceneId: "c1_s1_3"
        },
        {
          id: "c1_s1_3",
          bg: "white_light",
          speaker: "orang 1",
          charLeft: null,
          charCenter: "assets/images/chars/orang hitam.png",
          charRight: null,
          activeChar: "center",
          text: "Selamat tuan dan nyonya, anak perempuanmu hadir dengan sehat.",
          nextSceneId: "c1_s1_4"
        },
        {
          id: "c1_s1_4",
          bg: "white_light",
          speaker: null,
          charLeft: "assets/images/chars/orang hitam.png",
          charRight: "assets/images/chars/orang hitam.png",
          activeChar: null,
          text: "Ganti dengan siluet 2 orang",
          nextSceneId: "c1_s1_5"
        },
        {
          id: "c1_s1_5",
          bg: "white_light",
          speaker: "orang 2",
          charLeft: "assets/images/chars/orang hitam.png",
          charRight: "assets/images/chars/orang hitam.png",
          activeChar: "left",
          text: "Cantiknya kamu",
          nextSceneId: "c1_s1_6"
        },
        {
          id: "c1_s1_6",
          bg: "white_light",
          speaker: "orang 3",
          charLeft: "assets/images/chars/orang hitam.png",
          charRight: "assets/images/chars/orang hitam.png",
          activeChar: "right",
          text: "Apa nama yang cocoknya ya?",
          choices: [
            {
              label: "Aurel",
              isCorrect: true,
              nextSceneId: "c1_s1_resp1"
            },
            {
              label: "Ucup",
              isCorrect: false,
              funnyResponse: "INI BUKAN CERITA TENTANG AUREL TERNYATA CIK",
              isDeadEnd: true,
              retrySceneId: "c1_s1_6"
            }
          ]
        },
        {
          id: "c1_s1_resp1",
          bg: "white_light",
          speaker: "orang 2",
          charLeft: "assets/images/chars/orang hitam.png",
          charRight: "assets/images/chars/orang hitam.png",
          activeChar: "left",
          text: "Aurelya Christine",
          nextSceneId: "c1_s2_1"
        },

        // ── Adegan 2 (Latar Sungai) ──
        {
          id: "c1_s2_1",
          bg: "assets/images/bg/sungai.jpg",
          speaker: "teman aurel",
          charLeft: "assets/images/chars/karakter base.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          showPet: true,
          text: "Ayo Aurel!",
          nextSceneId: "c1_s2_2"
        },
        {
          id: "c1_s2_2",
          bg: "assets/images/bg/sungai.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/karakter base.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "right",
          text: "Iyaa, tungguin!",
          nextSceneId: "c1_s2_3"
        },
        {
          id: "c1_s2_3",
          bg: "assets/images/bg/sungai.jpg",
          speaker: "teman aurel",
          charLeft: "assets/images/chars/karakter base.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Emang gapapa ke sungai pakai dress putih bagus itu? Gakena marah?",
          choices: [
            {
              label: "Gapapa",
              isCorrect: true,
              nextSceneId: "c1_s2_resp_gapapa"
            },
            {
              label: "Gaboleh",
              isCorrect: true,
              nextSceneId: "c1_s2_resp_gaboleh"
            }
          ]
        },
        {
          id: "c1_s2_resp_gapapa",
          bg: "assets/images/bg/sungai.jpg",
          speaker: "teman aurel",
          charLeft: "assets/images/chars/karakter base.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Yaudah",
          nextSceneId: "c1_s2_byur"
        },
        {
          id: "c1_s2_resp_gaboleh",
          bg: "assets/images/bg/sungai.jpg",
          speaker: "teman aurel",
          charLeft: "assets/images/chars/karakter base.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Aduh udah keburu kesini, yauda gapapa itu ayoo",
          nextSceneId: "c1_s2_byur"
        },
        {
          id: "c1_s2_byur",
          bg: "assets/images/bg/sungai.jpg",
          speaker: null,
          charLeft: "assets/images/chars/karakter base.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: null,
          sfx: "splash",
          specialEffect: "shake",
          text: "SFX BYURR",
          nextSceneId: "c1_s2_rumah"
        },
        {
          id: "c1_s2_rumah",
          bg: "assets/images/bg/rumah.jpg",
          speaker: "mama",
          charLeft: "assets/images/chars/mama.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Ya allah, kotor banget anakkuuuuu...",
          nextSceneId: "c1_s3_1"
        },

        // ── Adegan 3 (Latar Rumah) ──
        {
          id: "c1_s3_1",
          bg: "assets/images/bg/rumah.jpg",
          speaker: "aurel",
          charLeft: null,
          charCenter: "assets/images/chars/aurel.png",
          charRight: null,
          activeChar: "center",
          showPet: true,
          text: "Aduh laper, mau makan ah",
          nextSceneId: "c1_s3_2"
        },
        {
          id: "c1_s3_2",
          bg: "assets/images/bg/rumah.jpg",
          speaker: "aurel",
          charLeft: null,
          charCenter: "assets/images/chars/aurel.png",
          charRight: null,
          activeChar: "center",
          text: "Ok udah ambil nasi",
          nextSceneId: "c1_s3_3"
        },
        {
          id: "c1_s3_3",
          bg: "assets/images/bg/rumah.jpg",
          speaker: "aurel",
          charLeft: null,
          charCenter: "assets/images/chars/aurel.png",
          charRight: null,
          activeChar: "center",
          text: "Udah ambil lauk",
          nextSceneId: "c1_s3_4"
        },
        {
          id: "c1_s3_4",
          bg: "assets/images/bg/rumah.jpg",
          speaker: "aurel",
          charLeft: null,
          charCenter: "assets/images/chars/aurel.png",
          charRight: null,
          activeChar: "center",
          text: "*Makan dimana ya* (bicara dalam hati)",
          choices: [
            {
              label: "Di sebelah sana?",
              isCorrect: true,
              nextSceneId: "c1_s3_resp1"
            },
            {
              label: "Di meja makan?",
              isCorrect: true,
              nextSceneId: "c1_s3_resp2"
            }
          ]
        },
        {
          id: "c1_s3_resp1",
          bg: "assets/images/bg/rumah.jpg",
          speaker: "aurel",
          charLeft: null,
          charCenter: "assets/images/chars/aurel.png",
          charRight: null,
          activeChar: "center",
          text: "*oiya oiya, itu adalah pilihan yang tepat sekali*",
          nextSceneId: "c1_s3_end"
        },
        {
          id: "c1_s3_resp2",
          bg: "assets/images/bg/rumah.jpg",
          speaker: "aurel",
          charLeft: null,
          charCenter: "assets/images/chars/aurel.png",
          charRight: null,
          activeChar: "center",
          text: "*Heh, mana mungkin, meja makan kan bukan tempat makan*",
          nextSceneId: "c1_s3_end"
        },
        {
          id: "c1_s3_end",
          bg: "assets/images/bg/rumah.jpg",
          speaker: "aurel",
          charLeft: null,
          charCenter: "assets/images/chars/aurel.png",
          charRight: null,
          activeChar: "center",
          text: "Aku akan makan di sebelah sana!",
          nextSceneId: "c1_s4_1"
        },

        // ── Adegan 4 (Latar Jalanan) ──
        {
          id: "c1_s4_1",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/aurel.png",
          charRight: "assets/images/chars/karakter base.png",
          activeChar: "left",
          text: "Ayo ibet",
          nextSceneId: "c1_s4_2"
        },
        {
          id: "c1_s4_2",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "ibet",
          charLeft: "assets/images/chars/aurel.png",
          charRight: "assets/images/chars/karakter base.png",
          activeChar: "right",
          text: "Meluncur kita",
          nextSceneId: "c1_s4_3"
        },
        {
          id: "c1_s4_3",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/aurel.png",
          charRight: "assets/images/chars/karakter base.png",
          activeChar: "left",
          text: "...",
          choices: [
            {
              label: "kita rem pake kaki nanti",
              isCorrect: true,
              nextSceneId: "c1_s4_resp1_1"
            },
            {
              label: "kita tabrak aja kalo ada yang halangi",
              isCorrect: false,
              funnyResponse: "KAK AWAS ADA GEROBAK! SFX CKITTT DUAR! STIKER TEWAS MENGENASKAN 💀",
              isDeadEnd: true,
              retrySceneId: "c1_s4_3"
            }
          ]
        },
        {
          id: "c1_s4_resp1_1",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "ibet",
          charLeft: "assets/images/chars/aurel.png",
          charRight: "assets/images/chars/karakter base.png",
          activeChar: "right",
          text: "oke kak",
          nextSceneId: "c1_s4_resp1_2"
        },
        {
          id: "c1_s4_resp1_2",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "ibet",
          charLeft: "assets/images/chars/aurel.png",
          charRight: "assets/images/chars/karakter base.png",
          activeChar: "right",
          sfx: "brake",
          specialEffect: "shake",
          text: "KAK AWAS ADA GEROBAK",
          nextSceneId: "c1_s4_resp1_3"
        },
        {
          id: "c1_s4_resp1_3",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/aurel.png",
          charRight: "assets/images/chars/karakter base.png",
          activeChar: "left",
          text: "untung selamat",
          nextSceneId: "c2_s1_1"
        }
      ]
    },

    // =============================================
    //  BABAK 2
    // =============================================
    {
      id: "chapter_2",
      title: "Babak 2: Tahun Pertama",
      scenes: [

        // ── Adegan 1 (Latar Kampus) ──
        {
          id: "c2_s1_1",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/aurel.png",
          charRight: "assets/images/chars/karakter base.png",
          activeChar: "left",
          text: "Pak maaf saya telat",
          nextSceneId: "c2_s1_choice"
        },
        {
          id: "c2_s1_choice",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/aurel.png",
          charRight: "assets/images/chars/karakter base.png",
          activeChar: "left",
          text: "...",
          choices: [
            {
              label: "Saya baru sampe dari kota terpencil saya hari ini setelah perjalanan seharian penuh😭",
              isCorrect: true,
              nextSceneId: "c2_s1_resp1_1"
            },
            {
              label: "Saya begadang dan telat bangun",
              isCorrect: false,
              funnyResponse: "NO NO YA. CERITA ASLINYA GA BEGITU",
              isDeadEnd: true,
              retrySceneId: "c2_s1_choice"
            }
          ]
        },
        {
          id: "c2_s1_resp1_1",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "pegawai",
          charLeft: "assets/images/chars/aurel.png",
          charRight: "assets/images/chars/karakter base.png",
          activeChar: "right",
          text: "Sedih banget hidup kamu anakku😭",
          nextSceneId: "c2_s1_resp1_2"
        },
        {
          id: "c2_s1_resp1_2",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "pegawai",
          charLeft: "assets/images/chars/aurel.png",
          charRight: "assets/images/chars/karakter base.png",
          activeChar: "right",
          text: "Ya ya ya, saya percaya😭, kamu ikut rindam berikutnya ya",
          nextSceneId: "c2_s2_1"
        },

        // ── Adegan 2 (Latar Kamar) ──
        {
          id: "c2_s2_1",
          bg: "assets/images/bg/kamar.jpg",
          speaker: "ajah",
          charLeft: "assets/images/chars/ajah.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "AUREL BANGUN",
          nextSceneId: "c2_s2_2"
        },
        {
          id: "c2_s2_2",
          bg: "assets/images/bg/kamar.jpg",
          speaker: "ajah",
          charLeft: "assets/images/chars/ajah.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "UDAH JAM 8 WOI MABA",
          nextSceneId: "c2_s2_3"
        },
        {
          id: "c2_s2_3",
          bg: "assets/images/bg/kamar.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/ajah.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "right",
          text: "Holisyit",
          choices: [
            {
              label: "cek waktu dengan benar",
              isCorrect: true,
              nextSceneId: "c2_s2_resp1"
            },
            {
              label: "celupin seluruh kepala langsung sepenuhnya untuk memangkas waktu",
              isCorrect: true,
              nextSceneId: "c2_s2_resp2"
            }
          ]
        },
        {
          id: "c2_s2_resp1",
          bg: "assets/images/bg/kamar.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/ajah.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "right",
          text: "ternyata ini malam yaa dasar pembohonk",
          nextSceneId: "c2_s2_kecewa"
        },
        {
          id: "c2_s2_resp2",
          bg: "assets/images/bg/kamar.jpg",
          speaker: "ajah",
          charLeft: "assets/images/chars/ajah.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "tapi bo'ong",
          nextSceneId: "c2_s2_kecewa"
        },
        {
          id: "c2_s2_kecewa",
          bg: "assets/images/bg/kamar.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/ajah.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "right",
          text: "Tak pernah aku sekecewa ini wok",
          nextSceneId: "c2_s3_1"
        },

        // ── Adegan 3 (Latar Kampus) ──
        {
          id: "c2_s3_1",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/aurel.png",
          charRight: "assets/images/chars/eknes.png",
          activeChar: "left",
          text: "Ayo eknes kita masuk neraca, nanti kamu di masa depan bakal jadi ibu bendahara",
          nextSceneId: "c2_s3_2"
        },
        {
          id: "c2_s3_2",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "eknes",
          charLeft: "assets/images/chars/aurel.png",
          charRight: "assets/images/chars/eknes.png",
          activeChar: "right",
          text: "Oh ya ya ya saya setuju",
          nextSceneId: "c2_s3_3"
        },
        {
          id: "c2_s3_3",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/aurel.png",
          charRight: "assets/images/chars/eknes.png",
          activeChar: "left",
          text: "Ih tengok tu, gantengnya abangtu",
          nextSceneId: "c2_s3_4"
        },
        {
          id: "c2_s3_4",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "eknes",
          charLeft: "assets/images/chars/aurel.png",
          charRight: "assets/images/chars/eknes.png",
          activeChar: "right",
          text: "Ih iyalah, ih manisnya ihihihihi",
          nextSceneId: "c2_s4_1"
        },

        // ── Adegan 4 (Latar Kampus) ──
        {
          id: "c2_s4_1",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "aurel",
          charLeft: null,
          charCenter: "assets/images/chars/aurel.png",
          charRight: null,
          activeChar: "center",
          text: "Aduh tugas jualan gini",
          nextSceneId: "c2_s4_2"
        },
        {
          id: "c2_s4_2",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "aurel",
          charLeft: null,
          charCenter: "assets/images/chars/aurel.png",
          charRight: null,
          activeChar: "center",
          text: "Dimana ya anggota kelompokku yang lain?",
          nextSceneId: "c2_s4_3"
        },
        {
          id: "c2_s4_3",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "aurel",
          charLeft: null,
          charCenter: "assets/images/chars/aurel.png",
          charRight: null,
          activeChar: "center",
          text: "Aku chat salah satu aja kali ya",
          nextSceneId: "c2_s4_4"
        },
        {
          id: "c2_s4_4",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "aurel",
          charLeft: null,
          charCenter: "assets/images/chars/aurel.png",
          charRight: null,
          activeChar: "center",
          text: "Yang ini deh, yang kelihatan nonchalant ini.",
          nextSceneId: "c2_s4_5"
        },
        {
          id: "c2_s4_5",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "aurel",
          charLeft: null,
          charCenter: "assets/images/chars/aurel.png",
          charRight: null,
          activeChar: "center",
          text: "Hai kak, lagi dimana?",
          nextSceneId: "c2_s4_6"
        },
        {
          id: "c2_s4_6",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "shelmu",
          charLeft: null,
          charCenter: "assets/images/chars/shelmu.png",
          charRight: null,
          activeChar: "center",
          text: "Parkiran",
          nextSceneId: "c2_s4_7"
        },
        {
          id: "c2_s4_7",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "aurel",
          charLeft: null,
          charCenter: "assets/images/chars/aurel.png",
          charRight: null,
          activeChar: "center",
          text: "Oke",
          nextSceneId: "c2_s4_8"
        },
        {
          id: "c2_s4_8",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "aurel",
          charLeft: null,
          charCenter: "assets/images/chars/aurel.png",
          charRight: null,
          activeChar: "center",
          text: "Ih nonchalant bgt, tipe aku bgt",
          nextSceneId: "c2_s4_9"
        },
        {
          id: "c2_s4_9",
          bg: "assets/images/bg/kampus.jpg",
          speaker: "aurel",
          charLeft: null,
          charCenter: "assets/images/chars/aurel.png",
          charRight: null,
          activeChar: "center",
          text: "Eh dia cowo atau cewe ya?",
          nextSceneId: "c2_s5_1"
        },

        // ── Adegan 5 (Latar Ruangan) ──
        {
          id: "c2_s5_1",
          bg: "assets/images/bg/ruangan.jpg",
          speaker: "orang random",
          charLeft: "assets/images/chars/karakter base.png",
          charRight: null,
          activeChar: "left",
          text: "Jadi dalam berkomunikasi atau public speaking ada beberapa kriteria",
          nextSceneId: "c2_s5_2"
        },
        {
          id: "c2_s5_2",
          bg: "assets/images/bg/ruangan.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Gunung atau laut?",
          nextSceneId: "c2_s5_3"
        },
        {
          id: "c2_s5_3",
          bg: "assets/images/bg/ruangan.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "right",
          text: "Laut",
          nextSceneId: "c2_s5_4"
        },
        {
          id: "c2_s5_4",
          bg: "assets/images/bg/ruangan.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Cokelat atau matcha?",
          nextSceneId: "c2_s5_5"
        },
        {
          id: "c2_s5_5",
          bg: "assets/images/bg/ruangan.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "right",
          text: "Cokelat",
          nextSceneId: "c2_s5_6"
        },
        {
          id: "c2_s5_6",
          bg: "assets/images/bg/ruangan.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Kucing atau anjing?",
          nextSceneId: "c2_s5_7"
        },
        {
          id: "c2_s5_7",
          bg: "assets/images/bg/ruangan.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "right",
          text: "Kucing",
          nextSceneId: "c2_s5_8"
        },
        {
          id: "c2_s5_8",
          bg: "assets/images/bg/ruangan.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Apalagi yaa",
          nextSceneId: "c2_s6_1"
        },

        // ── Adegan 6 (Latar Cafe) ──
        {
          id: "c2_s6_1",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Ini Luigi brick lego legoan",
          nextSceneId: "c2_s6_2"
        },
        {
          id: "c2_s6_2",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Ayo kerjain bareng",
          nextSceneId: "c2_s6_3"
        },
        {
          id: "c2_s6_3",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "right",
          text: "Okee kamu kerjain, aku bantu doa",
          nextSceneId: "c2_s6_4"
        },
        {
          id: "c2_s6_4",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Tadaaa jadii",
          nextSceneId: "c2_s6_5"
        },
        {
          id: "c2_s6_5",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "right",
          text: "Aduhai ini dia anakku",
          nextSceneId: "c2_s6_6"
        },
        {
          id: "c2_s6_6",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Ayo ke gramedia trus beli makan",
          nextSceneId: "c2_s6_7"
        },
        {
          id: "c2_s6_7",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "right",
          text: "Ayo",
          nextSceneId: "c2_s6_8"
        },
        {
          id: "c2_s6_8",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Pesen sambal bawang deh",
          nextSceneId: "c2_s6_phone"
        },
        {
          id: "c2_s6_phone",
          bg: "assets/images/bg/cafe.jpg",
          speaker: null,
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: null,
          sfx: "phone",
          text: "SFX TELFON",
          nextSceneId: "c2_s6_shelmu_call"
        },
        {
          id: "c2_s6_shelmu_call",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Sebentar, oii kenapa",
          nextSceneId: "c2_s6_aksal1"
        },
        {
          id: "c2_s6_aksal1",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "aksal sibolangit",
          charLeft: "assets/images/chars/karakter base.png",
          charRight: "assets/images/chars/shelmu.png",
          activeChar: "left",
          text: "Ayo shel login, butuh orang jago 1 lagi ini",
          nextSceneId: "c2_s6_aksal2"
        },
        {
          id: "c2_s6_aksal2",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/karakter base.png",
          charRight: "assets/images/chars/shelmu.png",
          activeChar: "right",
          text: "Sabar lagi makan",
          nextSceneId: "c2_s6_aksal3"
        },
        {
          id: "c2_s6_aksal3",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "aksal sibolangit",
          charLeft: "assets/images/chars/karakter base.png",
          charRight: "assets/images/chars/shelmu.png",
          activeChar: "left",
          text: "Kapan jadian?",
          nextSceneId: "c2_s6_aksal4"
        },
        {
          id: "c2_s6_aksal4",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/karakter base.png",
          charRight: "assets/images/chars/shelmu.png",
          activeChar: "right",
          text: "Kapan-kapan",
          nextSceneId: "c2_s6_tut"
        },
        {
          id: "c2_s6_tut",
          bg: "assets/images/bg/cafe.jpg",
          speaker: null,
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: null,
          text: "SFX TUT",
          nextSceneId: "c2_s6_aurel_panitia"
        },
        {
          id: "c2_s6_aurel_panitia",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "right",
          text: "Pdhl klo mau jadian, tinggal nunggu panitiany aja",
          nextSceneId: "c2_s6_toilet"
        },
        {
          id: "c2_s6_toilet",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Ntar yh mo toilet, nak beol",
          nextSceneId: "c2_s6_brot"
        },
        {
          id: "c2_s6_brot",
          bg: "assets/images/bg/cafe.jpg",
          speaker: null,
          charLeft: null,
          charCenter: null,
          charRight: "assets/images/chars/aurel.png",
          activeChar: null,
          sfx: "toot",
          text: "SFX BROT BROT",
          nextSceneId: "c2_s6_kembali"
        },
        {
          id: "c2_s6_kembali",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Oke aku kembali",
          nextSceneId: "c2_s6_nembak"
        },
        {
          id: "c2_s6_nembak",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "left",
          text: "Kamu mau jadian sama pria nonchalant sepertiku? Heh sudah kuduga kalau kamu pasti tertarik",
          nextSceneId: "c2_s6_mau"
        },
        {
          id: "c2_s6_mau",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu.png",
          charRight: "assets/images/chars/aurel.png",
          activeChar: "right",
          text: "Mau",
          advanceEffect: "confession-transform",
          nextSceneId: "c2_s6_resmi"
        },
        {
          id: "c2_s6_resmi",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Okee",
          nextSceneId: "c3_s1_1"
        }
      ]
    },

    // =============================================
    //  BABAK 3 (Karakter sekarang: shelmu full.png & aurel full.png)
    // =============================================
    {
      id: "chapter_3",
      title: "Babak 3: Tahun Kedua",
      scenes: [

        // ── Adegan 1 (Latar Jalanan) ──
        {
          id: "c3_s1_1",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Hai sayang aku dah sampai yaa",
          nextSceneId: "c3_s1_2"
        },
        {
          id: "c3_s1_2",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "right",
          text: "Iyaa, tunggu yaa",
          nextSceneId: "c3_s1_3"
        },
        {
          id: "c3_s1_3",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Okee",
          nextSceneId: "c3_s2_1"
        },

        // ── Adegan 2 (Latar Jalanan) ──
        {
          id: "c3_s2_1",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Hai sayang aku dah sampai yaa",
          nextSceneId: "c3_s2_2"
        },
        {
          id: "c3_s2_2",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "right",
          text: "Iyaa, tunggu yaa",
          nextSceneId: "c3_s2_3"
        },
        {
          id: "c3_s2_3",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Okee",
          nextSceneId: "c3_s2_4"
        },
        {
          id: "c3_s2_4",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: null,
          charLeft: null,
          charRight: null,
          specialEffect: "interlude-30years",
          text: "30 tahun kemudian",
          nextSceneId: "c3_s2_5"
        },
        {
          id: "c3_s2_5",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: null,
          activeChar: "left",
          text: "Mana ya dia?",
          nextSceneId: "c3_s2_6"
        },
        {
          id: "c3_s2_6",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Sayangg, masih lama?",
          nextSceneId: "c3_s2_7"
        },
        {
          id: "c3_s2_7",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "right",
          text: "Maaf yaa abis BAB",
          nextSceneId: "c3_s3_1"
        },

        // ── Adegan 3 (Latar Jalanan -> Cafe) ──
        {
          id: "c3_s3_1",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Sayang ayo makan di zamzam, kata dinong disitu enak",
          nextSceneId: "c3_s3_2"
        },
        {
          id: "c3_s3_2",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "right",
          text: "Okee",
          nextSceneId: "c3_s3_3"
        },
        {
          id: "c3_s3_3",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Hmm enak ya?",
          nextSceneId: "c3_s3_4"
        },
        {
          id: "c3_s3_4",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "right",
          text: "Iyaa enak",
          nextSceneId: "c3_s3_5"
        },
        {
          id: "c3_s3_5",
          bg: "assets/images/bg/cafe.jpg",
          speaker: null,
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: null,
          text: "Melihat sesuatu di dinding",
          nextSceneId: "c3_s3_6"
        },
        {
          id: "c3_s3_6",
          bg: "assets/images/bg/cafe.jpg",
          speaker: null,
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: null,
          text: "Oalah pantes enak, ada tambahan rasa ternyata",
          nextSceneId: "c3_s4_1"
        },

        // ── Adegan 4 (Latar Jalanan -> Cafe) ──
        {
          id: "c3_s4_1",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Sayang ayo makan di warung pinggir jalan ini",
          nextSceneId: "c3_s4_2"
        },
        {
          id: "c3_s4_2",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "right",
          text: "Okee",
          nextSceneId: "c3_s4_3"
        },
        {
          id: "c3_s4_3",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Kok terlihat aneh ya menunya?",
          nextSceneId: "c3_s4_4"
        },
        {
          id: "c3_s4_4",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "right",
          text: "Ah perasaan kamu aja itu",
          nextSceneId: "c3_s4_5"
        },
        {
          id: "c3_s4_5",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Baiklah, aku pesan mie yang ini saja",
          nextSceneId: "c3_s4_6"
        },
        {
          id: "c3_s4_6",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "right",
          text: "Aku pesan yang ini",
          nextSceneId: "c3_s4_7"
        },
        {
          id: "c3_s4_7",
          bg: "assets/images/bg/cafe.jpg",
          speaker: null,
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: null,
          text: "Oalah, ada tambahan oink oink ternyata",
          nextSceneId: "c3_s5_1"
        },

        // ── Adegan 5 (Latar Jalanan -> Cafe) ──
        {
          id: "c3_s5_1",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Sayang ayo makan all you can eat",
          nextSceneId: "c3_s5_2"
        },
        {
          id: "c3_s5_2",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "right",
          text: "Ayoo",
          nextSceneId: "c3_s5_3"
        },
        {
          id: "c3_s5_3",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Aku akan makan banyak",
          nextSceneId: "c3_s5_4"
        },
        {
          id: "c3_s5_4",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "right",
          text: "Aku juga",
          nextSceneId: "c3_s5_5"
        },
        {
          id: "c3_s5_5",
          bg: "assets/images/bg/cafe.jpg",
          speaker: null,
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: null,
          text: "Oalah, enak yang dimaksud semangka semua ternyata",
          nextSceneId: "c3_s6_1"
        },

        // ── Adegan 6 (Latar Jalanan -> Cafe) ──
        {
          id: "c3_s6_1",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Sayang ayo makan misop",
          nextSceneId: "c3_s6_2"
        },
        {
          id: "c3_s6_2",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "right",
          text: "Okee",
          nextSceneId: "c3_s6_3"
        },
        {
          id: "c3_s6_3",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Aku pesen yang biasa saja",
          nextSceneId: "c3_s6_4"
        },
        {
          id: "c3_s6_4",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "right",
          text: "Aku juga",
          nextSceneId: "c3_s6_5"
        },
        {
          id: "c3_s6_5",
          bg: "assets/images/bg/cafe.jpg",
          speaker: null,
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: null,
          text: "Melihat sesuatu di kuah mie",
          nextSceneId: "c3_s6_6"
        },
        {
          id: "c3_s6_6",
          bg: "assets/images/bg/cafe.jpg",
          speaker: null,
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: null,
          text: "Oalah, pantas enak, ada tambahan rasa ternyata",
          nextSceneId: "c3_s7_1"
        },

        // ── Adegan 7 (Latar Jalanan -> Cafe) ──
        {
          id: "c3_s7_1",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Sayang ayo ke kopken",
          nextSceneId: "c3_s7_2"
        },
        {
          id: "c3_s7_2",
          bg: "assets/images/bg/jalanan.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "right",
          text: "Okee",
          nextSceneId: "c3_s7_3"
        },
        {
          id: "c3_s7_3",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "shelmu",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "left",
          text: "Lihat ini",
          nextSceneId: "c3_s7_4"
        },
        {
          id: "c3_s7_4",
          bg: "assets/images/bg/cafe.jpg",
          speaker: "aurel",
          charLeft: "assets/images/chars/shelmu full.png",
          charRight: "assets/images/chars/aurel full.png",
          activeChar: "right",
          text: "Uuu apa itu",
          nextSceneId: "TRIGGER_VIDEO_ENDING"
        }
      ]
    }
  ],

  /* ──────────────────────────────────────────────
     4. VOUCHER REWARDS (5 Tiket "Anything You Want")
     ────────────────────────────────────────────── */
  vouchers: [
    { id: "1", number: "#01", title: "Anything You Want", subtitle: "Tiket Spesial #1 • Berlaku Kapan Saja" },
    { id: "2", number: "#02", title: "Anything You Want", subtitle: "Tiket Spesial #2 • Berlaku Kapan Saja" },
    { id: "3", number: "#03", title: "Anything You Want", subtitle: "Tiket Spesial #3 • Berlaku Kapan Saja" },
    { id: "4", number: "#04", title: "Anything You Want", subtitle: "Tiket Spesial #4 • Berlaku Kapan Saja" },
    { id: "5", number: "#05", title: "Anything You Want", subtitle: "Tiket Spesial #5 • Berlaku Kapan Saja" }
  ]
};
