import { auth } from '@clerk/nextjs/server';

type UserPermission =
  | 'org:job_listing_applications:change_rating'
  | 'org:job_listing_applications:change_stage'
  | 'org:job_listings:change_status'
  | 'org:job_listings:create'
  | 'org:job_listings:delete'
  | 'org:job_listings:update';

export async function hasOrgUserPermissions(permission: UserPermission): Promise<boolean> {
  const { has } = await auth();
  return has({ permission });
}
