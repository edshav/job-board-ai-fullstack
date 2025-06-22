import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { created_at, updated_at } from '../schemaHelpers';
import { OrganizationUserSettingsTable } from './organizationUserSettings';
import { UserNotificationSettingsTable } from './userNotificationSettings';
import { UserResumeTable } from './userResume';

export const UserTable = pgTable('users', {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  image_url: varchar(),
  email: varchar().notNull().unique(),
  created_at,
  updated_at,
});

export const userRelations = relations(UserTable, ({ many, one }) => ({
  notificationSettings: one(UserNotificationSettingsTable),
  resume: one(UserResumeTable),
  organizationUserSettings: many(OrganizationUserSettingsTable),
}));
