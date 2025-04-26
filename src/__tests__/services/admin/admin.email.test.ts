import { AdminService } from '../../../services/admin';
import type { 
  EmailReady,
  EmailTest,
  EmailSuccess,
} from '../../../types/admin';

describe('AdminService - Email API', () => {
  let service: AdminService;

  beforeEach(() => {
    service = new AdminService({ baseUrl: 'http://test.com' });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('checkEmailConfig', () => {
    const mockEmailReady: EmailReady = {
      ready: true,
    };

    it('should check email configuration successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockEmailReady)),
      });

      const result = await service.checkEmailConfig();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/email',
        expect.objectContaining({
          method: 'GET',
        }),
      );
      expect(result).toEqual(mockEmailReady);
    });

    it('should handle accept-language header', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockEmailReady)),
      });

      await service.checkEmailConfig('ja-JP');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/email',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept-Language': 'ja-JP',
          }),
        }),
      );
    });
  });

  describe('sendTestEmail', () => {
    const mockEmailTest: EmailTest = {
      email: 'test@example.com',
    };

    const mockEmailSuccess: EmailSuccess = {
      success: true,
    };

    it('should send test email successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockEmailSuccess)),
      });

      const result = await service.sendTestEmail(mockEmailTest);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/email',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(mockEmailTest),
        }),
      );
      expect(result).toEqual(mockEmailSuccess);
    });

    it('should handle email not ready', async () => {
      const mockEmailFailure: EmailSuccess = {
        success: false,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockEmailFailure)),
      });

      const result = await service.sendTestEmail(mockEmailTest);

      expect(result.success).toBe(false);
    });
  });
});
