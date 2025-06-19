import { integer, pgEnum, pgTable, primaryKey, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { created_at, updated_at } from '../schemaHelpers';
import { JobListingTable } from './jobListing';
import { UserTable } from './user';

export const applicationStages = ['denied', 'applied', 'interested', 'hired'] as const;
export type ApplicationStage = (typeof applicationStages)[number];
export const applicationStageEnum = pgEnum('job_listing_application_stage', applicationStages);

export const JobListingApplicationTable = pgTable(
  'job_listing_applications',
  {
    job_listing_id: uuid()
      .references(() => JobListingTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    user_id: varchar()
      .references(() => UserTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    cover_letter: text(),
    rating: integer(),
    stage: applicationStageEnum().notNull(),
    created_at,
    updated_at,
  },
  (table) => [primaryKey({ columns: [table.job_listing_id, table.user_id] })]
);

export const jobListingApplicationRelations = relations(JobListingApplicationTable, ({ one }) => ({
  jobListing: one(JobListingTable, {
    fields: [JobListingApplicationTable.job_listing_id],
    references: [JobListingTable.id],
  }),
  user: one(UserTable, {
    fields: [JobListingApplicationTable.user_id],
    references: [UserTable.id],
  }),
}));
