import { AdminService } from '../../../services/admin';
import type { 
  MaintenanceSummary,
  MaintenanceStorageDetails,
} from '../../../types/admin';
import type { SuccessResponse } from '../../../types/common';

describe('AdminService - Maintenance API', () => {
  let service: AdminService;

  beforeEach(() => {
    service = new AdminService({ baseUrl: 'http://test.com' });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getMaintenanceSummary', () => {
    const mockSummary: MaintenanceSummary = {
      dataDirSize: '1.5 GB',
      cleanableImages: 25,
      cleanableDirs: ['temp', 'logs', 'cache'],
    };

    it('should get maintenance summary successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockSummary)),
      });

      const result = await service.getMaintenanceSummary();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/maintenance',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockSummary);
    });

    it('should handle accept-language header', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockSummary)),
      });

      await service.getMaintenanceSummary('es-ES');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/maintenance',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept-Language': 'es-ES',
          }),
        }),
      );
    });
  });

  describe('getStorageDetails', () => {
    const mockStorage: MaintenanceStorageDetails = {
      tempDirSize: '512 MB',
      backupsDirSize: '2 GB',
      groupsDirSize: '1 GB',
      recipesDirSize: '3 GB',
      userDirSize: '500 MB',
    };

    it('should get storage details successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockStorage)),
      });

      const result = await service.getStorageDetails();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/maintenance/storage',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockStorage);
    });
  });

  describe('cleanImages', () => {
    const mockSuccess: SuccessResponse = {
      message: '25 images cleaned successfully',
    };

    it('should clean images successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockSuccess)),
      });

      const result = await service.cleanImages();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/maintenance/clean/images',
        expect.objectContaining({
          method: 'POST',
        }),
      );
      expect(result).toEqual(mockSuccess);
    });
  });

  describe('cleanTemp', () => {
    const mockSuccess: SuccessResponse = {
      message: 'Temporary files cleaned successfully',
    };

    it('should clean temporary files successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockSuccess)),
      });

      const result = await service.cleanTemp();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/maintenance/clean/temp',
        expect.objectContaining({
          method: 'POST',
        }),
      );
      expect(result).toEqual(mockSuccess);
    });
  });

  describe('cleanRecipeFolders', () => {
    const mockSuccess: SuccessResponse = {
      message: 'Recipe folders cleaned successfully',
    };

    it('should clean recipe folders successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockSuccess)),
      });

      const result = await service.cleanRecipeFolders();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/maintenance/clean/recipe-folders',
        expect.objectContaining({
          method: 'POST',
        }),
      );
      expect(result).toEqual(mockSuccess);
    });
  });
});
