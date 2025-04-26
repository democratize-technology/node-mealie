/**
 * Types for Households: Invitations endpoints
 * https://demo.mealie.io/openapi.json
 */

export interface CreateInviteToken {
  uses: number;
}

export interface ReadInviteToken {
  token: string;
  usesLeft: number;
  groupId: string;
  householdId: string;
}

export interface EmailInvitation {
  email: string;
  token: string;
}

export interface EmailInitationResponse {
  success: boolean;
  error?: string;
}
