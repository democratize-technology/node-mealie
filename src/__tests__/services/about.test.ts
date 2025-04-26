import { AboutService } from '../../services/about.js';
import type { AppInfo, AppStartupInfo, AppTheme } from '../../types/index.js';

describe('AboutService', () => {
  let service: AboutService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
    service = new AboutService({ baseUrl: 'https://test.mealie.io' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAppInfo', () => {
    it('should fetch app info', async () => {
      const mockResponse: AppInfo = {
        production: true,
        version: '1.0.0',
        demoStatus: false,
        allowSignup: true,
        enableOidc: false,
        oidcRedirect: '',
        oidcProviderName: '',
        enableOpenai: false,
        enableOpenaiImageServices: false,
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await service.getAppInfo();

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/app/about',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getStartupInfo', () => {
    it('should fetch startup info', async () => {
      const mockResponse: AppStartupInfo = {
        isFirstLogin: false,
        isDemo: true,
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await service.getStartupInfo();

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/app/about/startup-info',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAppTheme', () => {
    it('should fetch app theme', async () => {
      const mockResponse: AppTheme = {
        primaryColor: '#00897B',
        secondaryColor: '#FFB300',
        darkMode: true,
      };

      fetchMock.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });

      const result = await service.getAppTheme();

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test.mealie.io/api/app/about/theme',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
