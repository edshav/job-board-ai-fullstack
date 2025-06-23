import { DeletedObjectJSON, OrganizationJSON, UserJSON } from '@clerk/nextjs/server';
import { EventSchemas, Inngest } from 'inngest';

type WebhookData<T> = {
  data: {
    data: T;
    raw: string;
    headers: Record<string, string>;
  };
};

type Events = {
  'clerk/user.created': WebhookData<UserJSON>;
  'clerk/user.updated': WebhookData<UserJSON>;
  'clerk/user.deleted': WebhookData<DeletedObjectJSON>;
  'clerk/organization.created': WebhookData<OrganizationJSON>;
  'clerk/organization.updated': WebhookData<OrganizationJSON>;
  'clerk/organization.deleted': WebhookData<DeletedObjectJSON>;
};

export const inngest = new Inngest({
  id: 'job-board-wds',
  schemas: new EventSchemas().fromRecord<Events>(),
});
