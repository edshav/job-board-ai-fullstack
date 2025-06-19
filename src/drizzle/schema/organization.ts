import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { created_at, updated_at } from '../schemaHelpers';
import { JobListingTable } from './jobListing';
import { OrganizationUserSettingsTable } from './organizationUserSettings';

export const OrganizationTable = pgTable('organizations', {
  id: varchar().primaryKey(),
  name: varchar().notNull().unique(),
  image_url: varchar().notNull(),
  email: varchar().notNull().unique(),
  created_at,
  updated_at,
});

export const organizationRelations = relations(OrganizationTable, ({ many }) => ({
  jobListings: many(JobListingTable),
  organizationUserSettings: many(OrganizationUserSettingsTable),
}));
