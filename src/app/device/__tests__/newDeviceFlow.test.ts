import fs from 'fs';
import path from 'path';

describe('new device creation flow', () => {
  const src = fs.readFileSync(path.join(__dirname, '../new.tsx'), 'utf8');

  test('uses a single database write for device, checkups and reminders', () => {
    expect(src).toContain('createDeviceWithInitialData');
    expect(src).not.toContain('createCheckups');
    expect(src).not.toContain('createDefaultReminders');
  });

  test('synchronizes notifications after the database write', () => {
    const createAt = src.indexOf('createDeviceWithInitialData');
    const syncAt = src.indexOf('syncAllNotifications');
    expect(createAt).toBeGreaterThan(-1);
    expect(syncAt).toBeGreaterThan(createAt);
  });
});
