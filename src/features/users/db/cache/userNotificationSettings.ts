import { getGlobalCacheTag, getIdCacheTag } from '@/lib/dataCache';
import { revalidateTag } from 'next/cache';

export function getUserNotificationSettingsGlobalCacheTag() {
  return getGlobalCacheTag('userNotificationSettings');
}

export function getUserNotificationSettingsIdCacheTag(id: string) {
  return getIdCacheTag('userNotificationSettings', id);
}

export function revalidateUserNotificationSettingsIdCache(id: string) {
  revalidateTag(getUserNotificationSettingsGlobalCacheTag());
  revalidateTag(getUserNotificationSettingsIdCacheTag(id));
}
