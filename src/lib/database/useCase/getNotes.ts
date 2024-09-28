import type { EntityManager } from '@mikro-orm/core';

import { Note } from '$lib/database/schema/Note';

export async function getNotes(entityManager: EntityManager, limit: number, offset: number) {
  return await entityManager.findAndCount(Note, {}, { limit: limit, offset: offset, orderBy: { updatedAt: -1 } });
}
