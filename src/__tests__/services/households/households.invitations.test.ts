import { MealieClient } from '../../../client';
import { HouseholdsService } from '../../../services/households';
import type { CreateInviteToken, EmailInvitation } from '../../../types';

describe('HouseholdsService - Invitations API', () => {
  let service: HouseholdsService;

  beforeEach(() => {
    service = new HouseholdsService({ baseUrl: 'https://demo.mealie.io' });
  });

  const mockToken = { token: 'abc123', usesLeft: 5, groupId: '456', householdId: '789' };
  const mockEmaiResponse = { success: true };

  beforeEach(() => {
    service.get = jest.fn();
    service.post = jest.fn();
  });

  test('gets invite tokens', async () => {
    (service.get as jest.Mock).mockResolvedValue([mockToken]);
    
    const result = await service.getInviteTokens();
    
    expect(result).toEqual([mockToken]);
    expect(service.get).toHaveBeenCalledWith('/api/households/invitations');
  });

  test('creates invite token', async () => {
    (service.post as jest.Mock).mockResolvedValue(mockToken);
    
    const data: CreateInviteToken = { uses: 10 };
    const result = await service.createInviteToken(data);
    
    expect(result).toEqual(mockToken);
    expect(service.post).toHaveBeenCalledWith('/api/households/invitations', data);
  });

  test('sends email invitation', async () => {
    (service.post as jest.Mock).mockResolvedValue(mockEmaiResponse);
    
    const data: EmailInvitation = { email: 'test@example.com', token: 'abc123' };
    const result = await service.emailInvitation(data);
    
    expect(result).toEqual(mockEmaiResponse);
    expect(service.post).toHaveBeenCalledWith('/api/households/invitations/email', data);
  });
});
