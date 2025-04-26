import { AdminService } from '../../../services/admin';
import type { AdminPaginationQuery } from '../../../types/admin';

describe('AdminService - Additional Branch Coverage', () => {
  let service: AdminService;

  beforeEach(() => {
    service = new AdminService({ baseUrl: 'http://test.com' });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('all methods with acceptLanguage parameter', () => {
    it('should call all endpoints without acceptLanguage parameter', async () => {
      // Mock responses for all endpoints
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ success: true })),
      });

      // Call all methods without acceptLanguage
      await service.getAppInfo();
      await service.getAppStatistics();
      await service.checkAppConfig();
      await service.createUser({ username: 'test', fullName: 'Test User', email: 'test@example.com', password: '123' });
      await service.unlockUsers();
      await service.getUser('user-id');
      await service.updateUser('user-id', { id: 'user-id', email: 'test@example.com' });
      await service.deleteUser('user-id');
      await service.generatePasswordResetToken({ email: 'test@example.com' });
      await service.createHousehold({ name: 'Test Household' });
      await service.getHousehold('household-id');
      await service.updateHousehold('household-id', { id: 'household-id', name: 'Updated', groupId: 'group-id' });
      await service.deleteHousehold('household-id');
      await service.createGroup({ name: 'Test Group' });
      await service.getGroup('group-id');
      await service.updateGroup('group-id', { id: 'group-id', name: 'Updated' });
      await service.deleteGroup('group-id');
      await service.checkEmailConfig();
      await service.sendTestEmail({ email: 'test@example.com' });
      await service.getAllBackups();
      await service.createBackup();
      await service.getBackupToken('backup.zip');
      await service.deleteBackup('backup.zip');
      await service.restoreBackup('backup.zip');
      await service.getMaintenanceSummary();
      await service.getStorageDetails();
      await service.cleanImages();
      await service.cleanTemp();
      await service.cleanRecipeFolders();

      // Verify all calls were made with proper headers
      const calls = (global.fetch as jest.Mock).mock.calls;
      calls.forEach(call => {
        const headers = call[1].headers;
        // When acceptLanguage is not provided, headers should either be empty object or contain only Content-Type
        expect(headers).toBeDefined();
        if (Object.keys(headers).length > 0) {
          expect(headers['Accept-Language']).toBeUndefined();
        }
      });
    });

    it('should call all endpoints with acceptLanguage parameter', async () => {
      // Mock responses for all endpoints
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ success: true })),
      });

      // Call all methods with acceptLanguage
      await service.getAppInfo('fr-FR');
      await service.getAppStatistics('fr-FR');
      await service.checkAppConfig('fr-FR');
      await service.createUser({ username: 'test', fullName: 'Test User', email: 'test@example.com', password: '123' }, 'fr-FR');
      await service.unlockUsers(false, 'fr-FR');
      await service.getUser('user-id', 'fr-FR');
      await service.updateUser('user-id', { id: 'user-id', email: 'test@example.com' }, 'fr-FR');
      await service.deleteUser('user-id', 'fr-FR');
      await service.generatePasswordResetToken({ email: 'test@example.com' }, 'fr-FR');
      await service.createHousehold({ name: 'Test Household' }, 'fr-FR');
      await service.getHousehold('household-id', 'fr-FR');
      await service.updateHousehold('household-id', { id: 'household-id', name: 'Updated', groupId: 'group-id' }, 'fr-FR');
      await service.deleteHousehold('household-id', 'fr-FR');
      await service.createGroup({ name: 'Test Group' }, 'fr-FR');
      await service.getGroup('group-id', 'fr-FR');
      await service.updateGroup('group-id', { id: 'group-id', name: 'Updated' }, 'fr-FR');
      await service.deleteGroup('group-id', 'fr-FR');
      await service.checkEmailConfig('fr-FR');
      await service.sendTestEmail({ email: 'test@example.com' }, 'fr-FR');
      await service.getAllBackups('fr-FR');
      await service.createBackup('fr-FR');
      await service.getBackupToken('backup.zip', 'fr-FR');
      await service.deleteBackup('backup.zip', 'fr-FR');
      await service.restoreBackup('backup.zip', 'fr-FR');
      await service.getMaintenanceSummary('fr-FR');
      await service.getStorageDetails('fr-FR');
      await service.cleanImages('fr-FR');
      await service.cleanTemp('fr-FR');
      await service.cleanRecipeFolders('fr-FR');

      // Verify all calls were made with proper Accept-Language headers
      const calls = (global.fetch as jest.Mock).mock.calls;
      calls.forEach(call => {
        const headers = call[1].headers;
        expect(headers['Accept-Language']).toBe('fr-FR');
      });
    });
  });
});
