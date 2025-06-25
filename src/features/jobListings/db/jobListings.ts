import { db } from '@/drizzle/db';
import { JobListingTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { revalidateJobListingIdCache } from './cache/jobListings';

export async function insertJobListing(jobListing: typeof JobListingTable.$inferInsert) {
  const [newListing] = await db.insert(JobListingTable).values(jobListing).returning({
    id: JobListingTable.id,
    orgId: JobListingTable.organization_id,
  });

  revalidateJobListingIdCache(newListing);

  return newListing;
}

export async function updateJobListing(
  id: string,
  jobListing: Partial<typeof JobListingTable.$inferInsert>
) {
  const [updatedListing] = await db
    .update(JobListingTable)
    .set(jobListing)
    .where(eq(JobListingTable.id, id))
    .returning({
      id: JobListingTable.id,
      orgId: JobListingTable.organization_id,
    });

  revalidateJobListingIdCache(updatedListing);

  return updatedListing;
}

export async function deleteJobListing(id: string) {
  const [deletedJobListing] = await db
    .delete(JobListingTable)
    .where(eq(JobListingTable.id, id))
    .returning({
      id: JobListingTable.id,
      orgId: JobListingTable.organization_id,
    });

  revalidateJobListingIdCache(deletedJobListing);

  return deletedJobListing;
}
