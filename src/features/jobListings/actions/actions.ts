'use server';

import { db } from '@/drizzle/db';
import { JobListingTable } from '@/drizzle/schema';
import { getCurrentOrganization } from '@/services/clerk/lib/getCurrentAuth';
import { hasOrgUserPermissions } from '@/services/clerk/lib/orgUserPermissions';
import { and, eq } from 'drizzle-orm';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import { redirect } from 'next/navigation';
import { z } from 'zod/v4';
import { getJobListingIdCacheTag } from '../db/cache/jobListings';
import { insertJobListing, updateJobListing as updateJobListingDb } from '../db/jobListings';
import { jobListingSchema } from './schemas';

export async function createJobListing(unsafeData: z.infer<typeof jobListingSchema>) {
  const { orgId } = await getCurrentOrganization();

  if (orgId == null || !(await hasOrgUserPermissions('org:job_listings:create'))) {
    return {
      error: true,
      message: "You don't have permission to create a job listing",
    };
  }

  const { success, data } = jobListingSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: 'There was an error creating your job listing',
    };
  }

  const jobListing = await insertJobListing({
    ...data,
    organization_id: orgId,
    status: 'draft',
  });

  redirect(`/employer/job-listings/${jobListing.id}`);
}

export async function updateJobListing(id: string, unsafeData: z.infer<typeof jobListingSchema>) {
  const { orgId } = await getCurrentOrganization();

  if (orgId == null || !(await hasOrgUserPermissions('org:job_listings:update'))) {
    return {
      error: true,
      message: "You don't have permission to update this job listing",
    };
  }

  const { success, data } = jobListingSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: 'There was an error updating your job listing',
    };
  }

  const jobListing = await getJobListing(id, orgId);
  if (jobListing == null) {
    return {
      error: true,
      message: 'There was an error updating your job listing',
    };
  }

  const updatedJobListing = await updateJobListingDb(id, data);

  redirect(`/employer/job-listings/${updatedJobListing.id}`);
}

async function getJobListing(id: string, orgId: string) {
  'use cache';
  cacheTag(getJobListingIdCacheTag(id));

  return db.query.JobListingTable.findFirst({
    where: and(eq(JobListingTable.id, id), eq(JobListingTable.organization_id, orgId)),
  });
}
