import type { EntityManager } from '@mikro-orm/core';

import { Note } from '$lib/database/schema/Note';

export async function createNote(entityManager: EntityManager, note: Note): Promise<Note> {
  const noteEntity = entityManager.create(Note, note);
  await entityManager.flush();
  return noteEntity;
}
