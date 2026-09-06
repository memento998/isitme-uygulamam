import { isMainTabPath } from '@/constants/layout';

describe('isMainTabPath', () => {
  it('keeps the banner on the four main sections', () => {
    expect(isMainTabPath('/')).toBe(true);
    expect(isMainTabPath('/troubleshooting')).toBe(true);
    expect(isMainTabPath('/stats')).toBe(true);
    expect(isMainTabPath('/more')).toBe(true);
  });

  it('hides the banner on device form and other inner screens', () => {
    expect(isMainTabPath('/device/new')).toBe(false);
    expect(isMainTabPath('/device/abc/edit')).toBe(false);
    expect(isMainTabPath('/more/calendar')).toBe(false);
  });
});
