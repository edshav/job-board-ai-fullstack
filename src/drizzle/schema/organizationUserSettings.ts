import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { created_at, updated_at } from '../schemaHelpers';
import { OrganizationTable } from './organization';
import { UserTable } from './user';

export const OrganizationUserSettingsTable = pgTable(
  'organization_user_settings',
  {
    user_id: varchar()
      .notNull()
      .references(() => UserTable.id),
    organization_id: varchar()
      .notNull()
      .references(() => OrganizationTable.id),
    new_application_email_notifications: boolean().notNull().default(false),
    minimum_rating: integer(),
    created_at,
    updated_at,
  },
  (table) => [primaryKey({ columns: [table.user_id, table.organization_id] })]
);

export const organizationUserSettingsRelations = relations(
  OrganizationUserSettingsTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [OrganizationUserSettingsTable.user_id],
      references: [UserTable.id],
    }),
    organization: one(OrganizationTable, {
      fields: [OrganizationUserSettingsTable.organization_id],
      references: [OrganizationTable.id],
    }),
  })
);
