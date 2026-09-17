import { isAppOwnedPhotoUri } from '../photos';

describe('isAppOwnedPhotoUri', () => {
  test('kalıcı uygulama dizinindeki URI\'yi tanır', () => {
    expect(
      isAppOwnedPhotoUri('file:///data/user/0/com.isitmetakip.app/files/device-photos/abc.jpg')
    ).toBe(true);
  });

  test('önbellek veya seçici URI\'lerini uygulama dosyası saymaz', () => {
    expect(
      isAppOwnedPhotoUri('file:///data/user/0/com.isitmetakip.app/cache/cropped1814158652.jpg')
    ).toBe(false);
    expect(isAppOwnedPhotoUri('content://media/external/images/media/12')).toBe(false);
    expect(isAppOwnedPhotoUri(null)).toBe(false);
    expect(isAppOwnedPhotoUri('')).toBe(false);
  });
});
