import { AdminService } from '../../../services/admin';
import type { AdminPaginationQuery } from '../../../types/admin';

describe('AdminService - Branch Coverage', () => {
  let service: AdminService;

  beforeEach(() => {
    service = new AdminService({ baseUrl: 'http://test.com' });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('uploadBackup', () => {
    it('should upload backup file with language header', async () => {
      const mockFile = new File(['backup data'], 'backup.zip', { type: 'application/zip' });
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ message: 'Backup uploaded' })),
      });

      await service.uploadBackup(mockFile, 'fr-FR');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/backups/upload',
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData),
          headers: {
            'Accept-Language': 'fr-FR',
          },
        }),
      );
    });

    it('should upload backup file without language header', async () => {
      const mockFile = new File(['backup data'], 'backup.zip', { type: 'application/zip' });
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ message: 'Backup uploaded' })),
      });

      await service.uploadBackup(mockFile);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/backups/upload',
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData),
          headers: {},
        }),
      );
    });
  });

  describe('debugOpenAI', () => {
    it('should debug OpenAI with file and language header', async () => {
      const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ success: true })),
      });

      await service.debugOpenAI(mockFile, 'de-DE');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/debug/openai',
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData),
          headers: {
            'Accept-Language': 'de-DE',
          },
        }),
      );
    });

    it('should debug OpenAI with file without language header', async () => {
      const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ success: true })),
      });

      await service.debugOpenAI(mockFile);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/debug/openai',
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData),
          headers: {},
        }),
      );
    });

    it('should debug OpenAI without file and with language header', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ success: true })),
      });

      await service.debugOpenAI(undefined, 'es-ES');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/debug/openai',
        expect.objectContaining({
          method: 'POST',
          body: undefined,
          headers: {
            'Accept-Language': 'es-ES',
            'Content-Type': 'application/json',
          },
        }),
      );
    });

    it('should debug OpenAI without file and without language header', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ success: true })),
      });

      await service.debugOpenAI();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/debug/openai',
        expect.objectContaining({
          method: 'POST',
          body: undefined,
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
    });
  });

  describe('query param methods', () => {
    it('should handle getAllUsers without options', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ items: [] })),
      });

      await service.getAllUsers();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/users',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
    });

    it('should handle getAllHouseholds without options', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ items: [] })),
      });

      await service.getAllHouseholds();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/households',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
    });

    it('should handle getAllGroups without options', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ items: [] })),
      });

      await service.getAllGroups();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/groups',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
    });

    it('should handle getAllUsers with acceptLanguage but no query params', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ items: [] })),
      });

      const options: AdminPaginationQuery & { acceptLanguage?: string } = {
        acceptLanguage: 'en-US',
      };

      await service.getAllUsers(options);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/users',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Accept-Language': 'en-US',
            'Content-Type': 'application/json',
          },
        }),
      );
    });

    it('should handle getAllHouseholds with acceptLanguage but no query params', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ items: [] })),
      });

      const options: AdminPaginationQuery & { acceptLanguage?: string } = {
        acceptLanguage: 'en-US',
      };

      await service.getAllHouseholds(options);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/households',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Accept-Language': 'en-US',
            'Content-Type': 'application/json',
          },
        }),
      );
    });

    it('should handle getAllGroups with acceptLanguage but no query params', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ items: [] })),
      });

      const options: AdminPaginationQuery & { acceptLanguage?: string } = {
        acceptLanguage: 'en-US',
      };

      await service.getAllGroups(options);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/groups',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Accept-Language': 'en-US',
            'Content-Type': 'application/json',
          },
        }),
      );
    });
  });
});
