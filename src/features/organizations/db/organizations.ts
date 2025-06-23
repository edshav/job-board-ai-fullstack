import { db } from '@/drizzle/db';
import { OrganizationTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { revalidateOrganizationIdCache } from './cache/organizations';

export async function insertOrganization(organization: typeof OrganizationTable.$inferInsert) {
  await db.insert(OrganizationTable).values(organization).onConflictDoNothing();
  revalidateOrganizationIdCache(organization.id);
}

export async function updateOrganization(
  id: string,
  organization: Partial<typeof OrganizationTable.$inferInsert>
) {
  await db.update(OrganizationTable).set(organization).where(eq(OrganizationTable.id, id));
  revalidateOrganizationIdCache(id);
}

export async function deleteOrganization(id: string) {
  await db.delete(OrganizationTable).where(eq(OrganizationTable.id, id));
  revalidateOrganizationIdCache(id);
}
