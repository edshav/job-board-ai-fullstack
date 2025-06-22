import { getGlobalCacheTag, getIdCacheTag } from '@/lib/dataCache';
import { revalidateTag } from 'next/cache';

export function getUsersGlobalCacheTag() {
  return getGlobalCacheTag('users');
}

export function getUserIdCacheTag(id: string) {
  return getIdCacheTag('users', id);
}

export function revalidateUserIdCache(id: string) {
  revalidateTag(getUsersGlobalCacheTag());
  revalidateTag(getUserIdCacheTag(id));
}
