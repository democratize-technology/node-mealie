import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { AboutService } from "./src/services/about.ts";
import { FoodsService } from "./src/services/foods.ts";

// Mock fetch for Deno
const originalFetch = globalThis.fetch;
const mockFetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const url = typeof input === 'string' ? input : (input instanceof Request ? input.url : input.toString());
  
  if (url.endsWith('/api/app/about')) {
    return Promise.resolve(new Response(JSON.stringify({
      production: true,
      version: '1.0.0',
      demoStatus: false,
      allowSignup: true,
      enableOidc: false,
      oidcRedirect: '',
      oidcProviderName: '',
      enableOpenai: false,
      enableOpenaiImageServices: false,
    }), { status: 200 }));
  }
  
  return originalFetch(input, init);
};

Deno.test("AboutService works in Deno", async () => {
  globalThis.fetch = mockFetch;
  
  try {
    const service = new AboutService();
    const appInfo = await service.getAppInfo();
    
    assertEquals(appInfo.version, '1.0.0');
    assertEquals(appInfo.production, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
