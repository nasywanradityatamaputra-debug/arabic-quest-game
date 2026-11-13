export const questions = [
  { arabic: "مَا مَعْنَى كَلِمَةِ أَسَدٌ؟", transliteration: "Asadun", meaning: "Apa arti kata asadun?", options: ["Kucing", "Singa", "Gajah", "Burung"], answer: 1 },
  { arabic: "مَا مَعْنَى كَلِمَةِ كِتَابٌ؟", transliteration: "Kitaabun", meaning: "Apa arti kata kitaabun?", options: ["Buku", "Meja", "Kursi", "Pintu"], answer: 0 },
  { arabic: "مَا مَعْنَى كَلِمَةِ تُفَّاحٌ؟", transliteration: "Tuffaahun", meaning: "Apa arti kata tuffaahun?", options: ["Pisang", "Jeruk", "Apel", "Anggur"], answer: 2 },
  { arabic: "مَا مَعْنَى كَلِمَةِ بَيْتٌ؟", transliteration: "Baitun", meaning: "Apa arti kata baitun?", options: ["Sekolah", "Rumah", "Masjid", "Pasar"], answer: 1 },
  { arabic: "مَا مَعْنَى كَلِمَةِ قَلَمٌ؟", transliteration: "Qalamun", meaning: "Apa arti kata qalamun?", options: ["Penghapus", "Tas", "Buku", "Pulpen"], answer: 3 },
  { arabic: "مَا مَعْنَى كَلِمَةِ مَاءٌ؟", transliteration: "Maa'un", meaning: "Apa arti kata maa'un?", options: ["Air", "Api", "Angin", "Tanah"], answer: 0 },
  { arabic: "مَا مَعْنَى كَلِمَةِ أَحْمَرُ؟", transliteration: "Ahmaru", meaning: "Apa arti kata ahmaru?", options: ["Biru", "Hijau", "Merah", "Kuning"], answer: 2 },
  { arabic: "مَا مَعْنَى كَلِمَةِ أُمٌّ؟", transliteration: "Ummun", meaning: "Apa arti kata ummun?", options: ["Ayah", "Ibu", "Kakak", "Adik"], answer: 1 },
  { arabic: "مَا مَعْنَى كَلِمَةِ قِطٌّ؟", transliteration: "Qittun", meaning: "Apa arti kata qittun?", options: ["Kucing", "Kelinci", "Kuda", "Ikan"], answer: 0 },
  { arabic: "مَا مَعْنَى كَلِمَةِ شَمْسٌ؟", transliteration: "Syamsun", meaning: "Apa arti kata syamsun?", options: ["Bulan", "Bintang", "Awan", "Matahari"], answer: 3 },
  { arabic: "مَا مَعْنَى كَلِمَةِ مَدْرَسَةٌ؟", transliteration: "Madrasatun", meaning: "Apa arti kata madrasatun?", options: ["Rumah", "Sekolah", "Kebun", "Kantor"], answer: 1 },
  { arabic: "مَا مَعْنَى كَلِمَةِ بَابٌ؟", transliteration: "Baabun", meaning: "Apa arti kata baabun?", options: ["Jendela", "Atap", "Pintu", "Lantai"], answer: 2 }
];

export function randomQuestion() {
  return questions[Math.floor(Math.random() * questions.length)];
}
