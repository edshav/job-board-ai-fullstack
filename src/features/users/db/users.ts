import { db } from '@/drizzle/db';
import { UserTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { revalidateUserIdCache } from './cache/users';

export async function insertUser(user: typeof UserTable.$inferInsert) {
  await db.insert(UserTable).values(user).onConflictDoNothing();
  revalidateUserIdCache(user.id);
}

export async function updateUser(id: string, user: Partial<typeof UserTable.$inferInsert>) {
  await db.update(UserTable).set(user).where(eq(UserTable.id, id));
  revalidateUserIdCache(id);
}

export async function deleteUser(id: string) {
  await db.delete(UserTable).where(eq(UserTable.id, id));
  revalidateUserIdCache(id);
}
