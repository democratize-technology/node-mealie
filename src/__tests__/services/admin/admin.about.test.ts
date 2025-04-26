import { AdminService } from '../../../services/admin';
import type { AdminAboutInfo, AppStatistics, CheckAppConfig } from '../../../types/admin';

describe('AdminService - About API', () => {
  let service: AdminService;

  beforeEach(() => {
    service = new AdminService({ baseUrl: 'http://test.com' });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAppInfo', () => {
    const mockAppInfo: AdminAboutInfo = {
      production: true,
      version: '1.0.0',
      demoStatus: false,
      allowSignup: true,
      enableOidc: false,
      oidcRedirect: '',
      oidcProviderName: '',
      enableOpenai: false,
      enableOpenaiImageServices: false,
      versionLatest: '1.0.0',
      apiPort: 3000,
      apiDocs: '/docs',
      dbType: 'postgres',
      defaultGroup: 'default',
      defaultHousehold: 'default',
      buildId: '123',
      recipeScraperVersion: '1.0.0',
    };

    it('should get app info successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockAppInfo)),
      });

      const result = await service.getAppInfo();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/about',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockAppInfo);
    });

    it('should handle accept-language header', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockAppInfo)),
      });

      await service.getAppInfo('en-US');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/about',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept-Language': 'en-US',
          }),
        }),
      );
    });
  });

  describe('getAppStatistics', () => {
    const mockStatistics: AppStatistics = {
      totalRecipes: 100,
      totalUsers: 50,
      totalHouseholds: 10,
      totalGroups: 5,
      uncategorizedRecipes: 2,
      untaggedRecipes: 3,
    };

    it('should get app statistics successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockStatistics)),
      });

      const result = await service.getAppStatistics();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/about/statistics',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockStatistics);
    });

    it('should handle accept-language header', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockStatistics)),
      });

      await service.getAppStatistics('fr-FR');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/about/statistics',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept-Language': 'fr-FR',
          }),
        }),
      );
    });
  });

  describe('checkAppConfig', () => {
    const mockConfig: CheckAppConfig = {
      emailReady: true,
      ldapReady: false,
      oidcReady: false,
      enableOpenai: true,
      baseUrlSet: true,
      isUpToDate: true,
    };

    it('should check app config successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockConfig)),
      });

      const result = await service.checkAppConfig();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/about/check',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockConfig);
    });

    it('should handle accept-language header', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockConfig)),
      });

      await service.checkAppConfig('de-DE');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/about/check',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept-Language': 'de-DE',
          }),
        }),
      );
    });
  });
});
