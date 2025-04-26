import { AdminService } from '../../../services/admin';
import type { 
  AllBackups,
  BackupFile,
  FileTokenResponse,
} from '../../../types/admin';
import type { SuccessResponse } from '../../../types/common';

describe('AdminService - Backups API', () => {
  let service: AdminService;

  beforeEach(() => {
    service = new AdminService({ baseUrl: 'http://test.com' });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllBackups', () => {
    const mockAllBackups: AllBackups = {
      imports: [
        {
          name: 'backup-2023-11-30.zip',
          date: '2023-11-30T10:00:00Z',
          size: 1048576,
        },
        {
          name: 'backup-2023-11-29.zip',
          date: '2023-11-29T10:00:00Z',
          size: 2097152,
        },
      ],
      templates: ['template1.json', 'template2.json'],
    };

    it('should get all backups successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockAllBackups)),
      });

      const result = await service.getAllBackups();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/backups',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockAllBackups);
    });
  });

  describe('createBackup', () => {
    const mockSuccess: SuccessResponse = {
      message: 'Backup created successfully',
    };

    it('should create a backup successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockSuccess)),
      });

      const result = await service.createBackup();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/backups',
        expect.objectContaining({
          method: 'POST',
        }),
      );
      expect(result).toEqual(mockSuccess);
    });
  });

  describe('getBackupToken', () => {
    const mockToken: FileTokenResponse = {
      fileToken: 'token-123-456',
    };

    it('should get backup file token successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockToken)),
      });

      const result = await service.getBackupToken('backup-2023-11-30.zip');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/backups/backup-2023-11-30.zip',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockToken);
    });
  });

  describe('deleteBackup', () => {
    const mockSuccess: SuccessResponse = {
      message: 'Backup deleted successfully',
    };

    it('should delete a backup successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockSuccess)),
      });

      const result = await service.deleteBackup('backup-2023-11-30.zip');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/backups/backup-2023-11-30.zip',
        expect.objectContaining({
          method: 'DELETE',
        }),
      );
      expect(result).toEqual(mockSuccess);
    });
  });

  describe('uploadBackup', () => {
    const mockSuccess: SuccessResponse = {
      message: 'Backup uploaded successfully',
    };

    const mockFile = new File(['backup content'], 'backup.zip', { type: 'application/zip' });

    it('should upload a backup file successfully', async () => {
      const formData = new FormData();
      formData.append('archive', mockFile);

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockSuccess)),
      });

      const result = await service.uploadBackup(mockFile);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/backups/upload',
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData),
        }),
      );
      expect(result).toEqual(mockSuccess);
    });

    it('should handle accept-language header with upload', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockSuccess)),
      });

      await service.uploadBackup(mockFile, 'fr-FR');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/backups/upload',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept-Language': 'fr-FR',
          }),
        }),
      );
    });
  });

  describe('restoreBackup', () => {
    const mockSuccess: SuccessResponse = {
      message: 'Backup restored successfully',
    };

    it('should restore a backup successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockSuccess)),
      });

      const result = await service.restoreBackup('backup-2023-11-30.zip');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/backups/backup-2023-11-30.zip/restore',
        expect.objectContaining({
          method: 'POST',
        }),
      );
      expect(result).toEqual(mockSuccess);
    });
  });
});
