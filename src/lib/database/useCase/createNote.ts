import { MikroORM } from '$lib/database/MikroORM';
import { Note } from '$lib/database/schema/Note';

export async function createNote(note: Note) {
  const entityManager = MikroORM.em.fork();
  entityManager.create(Note, note);
  return entityManager.flush();
}
