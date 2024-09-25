import { MikroORM } from '$lib/database/MikroORM';
import { Note } from '$lib/database/schema/Note';

export async function updateNote(note: Note) {
  const entityManager = MikroORM.em.fork();
  return entityManager.persistAndFlush(note);
}
