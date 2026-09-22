import fs from 'fs';
import path from 'path';

describe('device detail action labels', () => {
  const src = fs.readFileSync(path.join(__dirname, '../[id]/index.tsx'), 'utf8');

  test('pending checkup action is Tamamla, not Tamamlandı', () => {
    expect(src).toContain('messages.deviceDetail.complete');
    expect(src).not.toMatch(/label="Tamamlandı"/);
  });

  test('maintenance completion uses markReminderDone and Tamamla', () => {
    expect(src).toContain('markReminderDone');
    expect(src).toContain('setReminderToLog(reminder)');
    expect(src).not.toContain('checkmark-done-outline');
  });

  test('bakım geçmişi empty copy and checkup completion stay separate', () => {
    expect(src).toContain('messages.deviceDetail.maintenanceHistoryEmpty');
    expect(src).toContain('completeCheckup(checkup.id, completedAt, note)');
    expect(src).not.toContain('markReminderDone(checkup');
  });
});
