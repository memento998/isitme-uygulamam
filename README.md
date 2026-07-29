# İşitme Takip

İşitme cihazı kullanan kişilerin cihazlarını, periyodik kontrollerini, bakım işlemlerini ve
yaşadıkları temel sorunları takip edebileceği Türkçe bir mobil uygulama.

- **React Native + Expo (SDK 57) + TypeScript (strict) + Expo Router**
- Android öncelikli, **Expo Go** ile çalışır, web önizlemesi desteklenir
- Tüm veriler **yalnızca cihazda** saklanır (expo-sqlite); backend, üyelik ve giriş yoktur
- Özel native modül kullanılmaz

## Özellikler

- **Cihazlar:** Cihaz ekleme/düzenleme/silme, fotoğraf, kulak seçimi, seri no, garanti,
  pilli/şarjlı, klinik bilgileri, notlar
- **Kontrol takvimi:** Başlangıç tarihine göre otomatik örnek program (1. ay, 3. ay, 6. ay,
  1. yıl, 1,5 yıl, 2. yıl, sonrasında 6 ayda bir); Bekliyor / Tamamlandı / Gecikti durumları
  otomatik hesaplanır; tamamlama, geri alma, gerçek tarih ve not desteği
- **Bakım hatırlatıcıları:** Pil, şarj, filtre, hortum, kubbe, temizlik, klinik, garanti;
  yerel bildirimlerle, saat ayarlanabilir
- **Sorun giderme:** 8 kategori için adım adım güvenli soru-cevap akışları
- **İstatistik:** Sayaçlar, tamamlama/zamanında yapma oranları, ortalama gecikme,
  aylık işlem grafiği ("Henüz yeterli veri yok" boş durumlarıyla)
- **Daha fazla:** Takvim, bildirim ayarları, JSON yedekleme/geri yükleme, PDF cihaz raporu,
  gizlilik, tıbbi sorumluluk reddi, tüm verileri silme

## Kurulum

```bash
npm install
```

## Çalıştırma

```bash
# Geliştirme sunucusu (QR kodu Expo Go ile okutun)
npm start

# Android (Expo Go veya emülatör)
npm run android

# Web önizlemesi
npm run web
```

> Not: Expo Go'da yerel bildirimler Android/iOS'ta çalışır; web önizlemesinde bildirimler
> desteklenmez. Web'de SQLite, wasm (SharedArrayBuffer) ile çalışır; gerekli başlıklar
> `metro.config.js` içinde ayarlanmıştır.

## Kalite komutları

```bash
npm run typecheck   # TypeScript strict kontrolü
npm run lint        # ESLint (eslint-config-expo)
npm test            # Jest birim testleri (tarih, takvim, durum, istatistik servisleri)
```

## Klasör yapısı

```
src/
  app/              # Expo Router ekranları
    (tabs)/         # Alt menü: Cihazlar, Sorun Giderme, İstatistik, Daha Fazla
    device/         # Cihaz ekleme, detay, düzenleme
    troubleshooting/# Sorun giderme akışları
    more/           # Takvim, bildirimler, yedekleme, raporlar, gizlilik...
  components/       # Paylaşılan UI bileşenleri (Button, Card, DateField, ...)
  constants/        # Tasarım sistemi (renkler, boşluklar, tipografi)
  data/             # Statik sorun giderme içeriği
  db/               # SQLite bağlantısı ve şema migrasyonları
  hooks/            # Ortak hook'lar
  repositories/     # Veri erişim katmanı (CRUD)
  services/         # Tarih, kontrol takvimi, durum, istatistik, bildirim,
                    # yedekleme, PDF, örnek veri servisleri
  types/            # Veri modeli tipleri
```

## Önemli notlar

- Uygulama **tıbbi tanı koymaz** ve işitme uzmanının yerini tutmaz. Kontrol programı yalnızca
  örnek bir hatırlatma takvimidir.
- Örnek veriler yalnızca geliştirme modunda (`__DEV__`) yüklenebilir.
- Veriler "Daha Fazla > Yedekleme" bölümünden JSON olarak dışa aktarılabilir ve
  "Tüm verileri sil" ile kalıcı olarak silinebilir.
