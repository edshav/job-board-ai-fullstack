type CacheTag =
  | 'users'
  | 'organizations'
  | 'jobListings'
  | 'userNotificationSettings'
  | 'userResumes'
  | 'jobListingApplications'
  | 'organizationUserSettings';

export function getGlobalCacheTag(tag: CacheTag) {
  return `global:${tag}` as const;
}

export function getJobListingCacheTag(tag: CacheTag, jobListingId: string) {
  return `jobListing:${jobListingId}-${tag}` as const;
}

export function getOrganizationCacheTag(tag: CacheTag, organizationId: string) {
  return `organization:${organizationId}-${tag}` as const;
}

export function getIdCacheTag(tag: CacheTag, id: string) {
  return `id:${id}-${tag}` as const;
}
