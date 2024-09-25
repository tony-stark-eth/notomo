import type { EntityManager } from '@mikro-orm/core';

import { Note } from '$lib/database/schema/Note';

export async function getNotes(entityManager: EntityManager, userId: string, limit: number, offset: number) {
  return await entityManager.findAndCount(Note, { userId: userId }, { limit: limit, offset: offset, orderBy: { updatedAt: -1 } });
}
