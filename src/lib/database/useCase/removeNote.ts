import type { EntityManager } from '@mikro-orm/core';

import { Note } from '$lib/database/schema/Note';

export async function removeNote(entityManager: EntityManager, uuid: string) {
  return entityManager.removeAndFlush(entityManager.getReference(Note, uuid));
}
