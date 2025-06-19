import { boolean, pgTable, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { created_at, updated_at } from '../schemaHelpers';
import { UserTable } from './user';

export const UserNotificationSettingsTable = pgTable('user_notification_settings', {
  user_id: varchar()
    .primaryKey()
    .references(() => UserTable.id, { onDelete: 'cascade' }),
  new_job_email_notifications: boolean().notNull().default(false),
  ai_prompt: varchar({ length: 1000 }), // used to personalize AI-filtered job alerts
  created_at,
  updated_at,
});

export const userNotificationSettingsRelations = relations(
  UserNotificationSettingsTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserNotificationSettingsTable.user_id],
      references: [UserTable.id],
    }),
  })
);
