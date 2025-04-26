import { AdminService } from '../../../services/admin';
import type { DebugResponse } from '../../../types/admin';

describe('AdminService - Debug API', () => {
  let service: AdminService;

  beforeEach(() => {
    service = new AdminService({ baseUrl: 'http://test.com' });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('debugOpenAI', () => {
    const mockDebugResponse: DebugResponse = {
      success: true,
      message: 'OpenAI debug successful',
      data: {
        model: 'gpt-4',
        status: 'connected',
      },
    };

    it('should debug OpenAI without file', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockDebugResponse)),
      });

      const result = await service.debugOpenAI();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/debug/openai',
        expect.objectContaining({
          method: 'POST',
        }),
      );
      expect(result).toEqual(mockDebugResponse);
    });

    it('should debug OpenAI with file', async () => {
      const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockDebugResponse)),
      });

      const result = await service.debugOpenAI(mockFile);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/debug/openai',
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData),
        }),
      );
      expect(result).toEqual(mockDebugResponse);
    });

    it('should handle accept-language header', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockDebugResponse)),
      });

      await service.debugOpenAI(undefined, 'zh-CN');

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/admin/debug/openai',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept-Language': 'zh-CN',
          }),
        }),
      );
    });

    it('should handle debug failure', async () => {
      const mockFailureResponse: DebugResponse = {
        success: false,
        message: 'OpenAI connection failed',
        data: {
          error: 'Invalid API key',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockFailureResponse)),
      });

      const result = await service.debugOpenAI();

      expect(result.success).toBe(false);
      expect(result.data?.error).toBe('Invalid API key');
    });
  });
});
