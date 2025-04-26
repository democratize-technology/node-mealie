/**
 * Types for Households: Webhooks endpoints
 * https://demo.mealie.io/openapi.json
 */

export type WebhookType = 'mealplan';

export interface CreateWebhook {
  scheduledTime: string;
  name?: string;
  url?: string;
  webhookType?: WebhookType;
  enabled?: boolean;
}

export interface ReadWebhook {
  scheduledTime: string;
  groupId: string;
  householdId: string;
  id: string;
  name?: string;
  url?: string;
  webhookType?: WebhookType;
  enabled?: boolean;
}

export interface WebhookPagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  items: ReadWebhook[];
  next?: string;
  previous?: string;
}
