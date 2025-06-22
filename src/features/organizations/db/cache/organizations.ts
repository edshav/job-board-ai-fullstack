import { getGlobalCacheTag, getIdCacheTag } from '@/lib/dataCache';
import { revalidateTag } from 'next/cache';

export function getOrganizationsGlobalCacheTag() {
  return getGlobalCacheTag('organizations');
}

export function getOrganizationIdCacheTag(id: string) {
  return getIdCacheTag('organizations', id);
}

export function revalidateOrganizationIdCache(id: string) {
  revalidateTag(getOrganizationsGlobalCacheTag());
  revalidateTag(getOrganizationIdCacheTag(id));
}
