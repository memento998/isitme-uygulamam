# Google Play Mağaza Metinleri — fixhear

Play Console > Mağaza kaydı (Store listing) alanlarına kopyalanmaya hazır metinler.

## Uygulama adı (en fazla 30 karakter)

```
fixhear – İşitme Cihazı Takibi
```

## Kısa açıklama (en fazla 80 karakter)

```
İşitme cihazınızın kontrol, bakım ve sorun takibini tek uygulamada yapın.
```

## Tam açıklama (en fazla 4000 karakter)

```
fixhear, işitme cihazı kullanan kişilerin cihazlarını düzenli takip edebilmesi için tasarlanmış ücretsiz bir asistandır. Üyelik gerektirmez; girdiğiniz tüm veriler yalnızca telefonunuzda saklanır.

CİHAZLARINIZI KAYDEDİN
• Cihaz adı, marka, model, seri numarası ve fotoğraf
• Sol, sağ veya iki kulak seçimi; pilli veya şarjlı cihaz bilgisi
• Garanti bitiş tarihi, doktor/klinik adı ve telefonu, notlar

KONTROL TAKVİMİNİZİ OTOMATİK OLUŞTURUN
• Kullanım başlangıç tarihine göre örnek kontrol programı: 1. ay, 3. ay, 6. ay, 1. yıl, 1,5 yıl, 2. yıl ve sonrasında 6 ayda bir
• Her kontrol için Bekliyor / Tamamlandı / Gecikti durumu otomatik hesaplanır
• Gerçek tamamlanma tarihi ve not ekleyin, dilediğinizde geri alın
• Tüm tarihleri ekleyin, değiştirin veya silin

BAKIM HATIRLATICILARI
• Pil değiştirme, şarj kontrolü, filtre, hortum, kubbe, temizlik, klinik kontrolü ve garanti bitişi
• Aralıkları kendinize göre ayarlayın, bildirim saatini seçin
• Yapılan işlemler bakım geçmişine kaydedilir

SORUN GİDERME REHBERİ
• "Ses gelmiyor", "cihaz ötüyor", "şarj olmuyor" gibi 8 yaygın sorun için adım adım güvenli çözüm akışları
• Çözülmeyen durumlarda sizi uzmana yönlendirir; asla riskli müdahale önermez

İSTATİSTİK VE RAPORLAR
• Tamamlama ve zamanında yapma oranları, ortalama gecikme, aylık işlem grafiği
• Cihaz başına PDF özet raporu oluşturup paylaşın (kliniğinize götürün)

VERİLERİNİZ SİZİN KONTROLÜNÜZDE
• Girdiğiniz tüm veriler yalnızca cihazınızda; hesap gerekmez
• JSON olarak yedekleyin ve geri yükleyin
• Tek dokunuşla tüm verilerinizi kalıcı olarak silin

ÖNEMLİ NOT
fixhear tıbbi tanı koymaz ve işitme uzmanınızın yerini tutmaz. Kontrol takvimi yalnızca örnek bir hatırlatma programıdır; kontrol sıklığınızı uzmanınızla belirleyin.
```

## Grafikler

| Alan | Dosya | Boyut |
| --- | --- | --- |
| Uygulama simgesi | `store/play_icon_512.png` | 512x512 PNG |
| Tanıtım grafiği (feature graphic) | `store/feature_graphic_1024x500.png` | 1024x500 PNG |
| Ekran görüntüleri | Telefonunuzdan alın (en az 2 adet) | dikey, min. 320px |

Ekran görüntüsü önerisi: Cihazlar listesi, cihaz detayı (kontrol takvimi), sorun giderme
listesi, istatistik ekranı. Telefonda güç + ses kısma tuşlarıyla alabilirsiniz.

## Reklam beyanı (Ads)

- "Does your app contain ads?" → **Yes** (Google AdMob: alt banner + uygulama açılışında bir kez geçiş reklamı)

## Veri güvenliği (Data safety) formu yanıtları

Uygulamanın kendisi veri toplamaz ancak AdMob reklam SDK'sı reklam göstermek için bazı
verileri toplar; bu nedenle form şöyle doldurulmalıdır:

- "Does your app collect or share any of the required user data types?" → **Yes**
- Toplanan veri türleri (AdMob nedeniyle):
  - **Device or other IDs** (cihaz/reklam kimliği) → Collected, Shared (advertising)
  - **App activity → App interactions** → Collected, Shared (advertising)
  - **App info and performance → Crash logs / Diagnostics** → Collected (analytics, AdMob)
  - **Location → Approximate location** → yalnızca IP tabanlı; AdMob non-personalized modda
    kullanıldığı için genelde beyan gerekmez, emin olmak için "Collected, Shared (advertising)"
    işaretlenebilir
- Her tür için: "Is this data processed ephemerally?" → No · "Required or optional?" → Required
- "Is all of the user data collected by your app encrypted in transit?" → **Yes**
  (AdMob HTTPS kullanır)
- "Do you provide a way for users to request that their data is deleted?" → uygulama içi
  "Tüm verileri sil" mevcut; AdMob verileri için Google'ın mekanizmaları geçerli

Güncel resmi rehber: https://support.google.com/admob/answer/10787303

## İçerik derecelendirmesi (Content rating)

Anket kategorisi: **Utility / Productivity**. Şiddet, kumar, müstehcenlik vb. sorularının
tümü "Hayır" → sonuç: Herkes (PEGI 3 / Everyone).

## Kategori ve iletişim

- Uygulama kategorisi: **Verimlilik (Productivity)** — Tıp/Medical seçmeyin; ekstra sağlık incelemesi açar.
- Gizlilik politikası URL'si (Play Console ve AdMob):
  `https://memento998.github.io/isitme-uygulamam/gizlilik-politikasi.html`
- Geliştirici web sitesi (Play Console > Mağaza ayarları > iletişim):
  `https://memento998.github.io/isitme-uygulamam/`
- Destek e-postası: `odyoden02@gmail.com`

## app-ads.txt

Dosya bu repoda: `docs/app-ads.txt`. GitHub Pages proje adresi:

`https://memento998.github.io/isitme-uygulamam/app-ads.txt`

AdMob tarayıcısı domain kökünü arar: `https://memento998.github.io/app-ads.txt`

Bu kök adres için GitHub'da `memento998.github.io` adlı ayrı bir depo oluşturun, aynı `app-ads.txt` içeriğini kök dizine koyun, Pages'i açın. Play Console'daki web sitesi `memento998.github.io` içerdiği sürece tarayıcı o kök dosyayı kullanır.

AdMob satırı (yalnızca AdMob kullanılıyor):

```
google.com, pub-9842945022814068, DIRECT, f08c47fec0942fa0
```

Play'de uygulama yayına alındıktan sonra AdMob > Uygulamalar > app-ads.txt > **Güncellemeleri denetle**. Doğrulama 24 saati bulabilir.

## Reklam kimliği beyanı (Play Console)

App content > Advertising ID: **Yes**, amaç **Advertising**.

## Teste alma (sırayla)

1. Bu PR'ı `main`'e birleştirin, sonra:
   ```
   git pull
   npm install
   eas build -p android --profile preview
   ```
   Çıkan **APK**'yı kendi telefonunuza kurun. Altta banner, açılışta bir kez geçiş reklamı.
   Yeni reklam birimleri 1 saate kadar boş kalabilir. **Kendi reklamınıza tıklamayın.**
2. Play'e kapalı test için:
   ```
   eas build -p android --profile production
   ```
   Çıkan **AAB**'yi Play Console > Test > Closed testing (veya Internal testing) yoluna yükleyin.
   Yeni kişisel hesaplarda yayın öncesi kapalı test (testeri + süre) istenebilir.
3. Play mağaza kaydına yukarıdaki gizlilik URL'si, kategori Verimlilik, Ads = Yes, Data safety formunu doldurun.
4. Ekran görüntüsü: Cihazlar, cihaz detayı, sorun giderme, istatistik.
