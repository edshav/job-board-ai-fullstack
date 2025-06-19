import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { created_at, updated_at } from '../schemaHelpers';
import { UserTable } from './user';

export const UserResumeTable = pgTable('user_resumes', {
  user_id: varchar()
    .primaryKey()
    .references(() => UserTable.id, { onDelete: 'cascade' }),
  resume_file_url: varchar().notNull(),
  resume_file_key: varchar().notNull(),
  ai_summary: varchar(),
  created_at,
  updated_at,
});

export const userResumeRelations = relations(UserResumeTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [UserResumeTable.user_id],
    references: [UserTable.id],
  }),
}));
