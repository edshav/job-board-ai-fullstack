import { getGlobalCacheTag, getIdCacheTag, getOrganizationCacheTag } from '@/lib/dataCache';
import { revalidateTag } from 'next/cache';

export function getJobListingsGlobalCacheTag() {
  return getGlobalCacheTag('jobListings');
}

export function getJobListingOrganizationIdCacheTag(organizationId: string) {
  return getOrganizationCacheTag('jobListings', organizationId);
}

export function getJobListingIdCacheTag(id: string) {
  return getIdCacheTag('jobListings', id);
}

export function revalidateJobListingIdCache({ id, orgId }: { id: string; orgId: string }) {
  revalidateTag(getJobListingsGlobalCacheTag());
  revalidateTag(getJobListingOrganizationIdCacheTag(orgId));
  revalidateTag(getJobListingIdCacheTag(id));
}
