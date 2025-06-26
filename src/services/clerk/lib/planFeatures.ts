import { auth } from '@clerk/nextjs/server';

type PlanFeature =
  | 'post_1_job_listings'
  | 'post_3_job_listings'
  | 'post_15_job_listings'
  | 'unlimited_featured_job_listings'
  | '1_featured_job_listing';

export async function hasOrgUserPlanFeature(feature: PlanFeature): Promise<boolean> {
  const { has } = await auth();
  return has({ feature });
}
