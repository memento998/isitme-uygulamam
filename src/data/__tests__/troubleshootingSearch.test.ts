import { searchCategories } from '../troubleshooting';
import { getUiMessages } from '@/i18n/messages';

describe('troubleshooting search', () => {
  test('empty query returns all categories', () => {
    expect(searchCategories('').map((c) => c.id)).toEqual([
      'no-sound',
      'low-sound',
      'intermittent-sound',
      'echo',
      'too-loud-ambient',
      'whistling',
      'not-charging',
      'bluetooth',
    ]);
  });

  test('filters by Turkish titles and keywords by default', () => {
    const ids = searchCategories('sessiz').map((c) => c.id);
    expect(ids).toContain('no-sound');
    expect(ids).not.toContain('bluetooth');
  });

  test('filters by localized titles and keywords when provided', () => {
    const en = getUiMessages('en').troubleshooting.categories;
    expect(searchCategories('no sound', en).map((c) => c.id)).toEqual(['no-sound']);
    expect(searchCategories('silent', en).map((c) => c.id)).toContain('no-sound');
    expect(searchCategories('bluetooth', en).map((c) => c.id)).toEqual(['bluetooth']);
    expect(searchCategories('sessiz', en)).toEqual([]);
  });
});
