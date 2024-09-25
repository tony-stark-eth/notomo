import { MikroORM } from '$lib/database/MikroORM';
import { Note } from '$lib/database/schema/Note';

export async function removeNote(uuid: string) {
  const entityManager = MikroORM.em.fork();
  return entityManager.removeAndFlush(entityManager.getReference(Note, uuid));
}
