import { Note } from '$lib/database/schema/Note';
import { MikroORM } from '$lib/database/MikroORM';

export async function createNote(note: Note) {
  return MikroORM.em.fork().persistAndFlush(note);
}
