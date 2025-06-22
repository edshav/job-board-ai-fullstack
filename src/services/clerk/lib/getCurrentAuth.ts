import { db } from '@/drizzle/db';
import { OrganizationTable, UserTable } from '@/drizzle/schema';
import { getOrganizationIdCacheTag } from '@/features/organizations/db/cache/organizations';
import { getUserIdCacheTag } from '@/features/users/db/cache/users';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';

export async function getCurrentUser({ allData = false } = {}) {
  const { userId } = await auth();

  return {
    userId,
    user: allData && userId != null ? await getUser(userId) : undefined,
  };
}

async function getUser(id: string) {
  'use cache';
  cacheTag(getUserIdCacheTag(id));

  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  });
}

export async function getCurrentOrganization({ allData = false } = {}) {
  const { orgId } = await auth();

  return {
    orgId,
    organization: allData && orgId != null ? await getOrganization(orgId) : undefined,
  };
}

async function getOrganization(id: string) {
  'use cache';
  cacheTag(getOrganizationIdCacheTag(id));

  return db.query.OrganizationTable.findFirst({
    where: eq(OrganizationTable.id, id),
  });
}
