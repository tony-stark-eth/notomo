import { MikroORM } from '$lib/database/MikroORM';
import { Note } from '$lib/database/schema/Note';

export async function getNotes(limit: number, offset: number) {
  const entityManager = MikroORM.em.fork();
  return await entityManager.findAndCount(Note, {}, { limit: limit, offset: offset, orderBy: { updatedAt: -1 } });
}
