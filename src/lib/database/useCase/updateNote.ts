import { Note } from '$lib/database/schema/Note';
import { EntityManager } from '@mikro-orm/core';

export async function updateNote(entityManager: EntityManager, note: Note): Promise<Note> {
  await entityManager.persistAndFlush(note);
  return note;
}
