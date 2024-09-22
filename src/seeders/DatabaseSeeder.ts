import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { NoteFactory } from '$lib/database/factory/NoteFactory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const factory = new NoteFactory(em);
    factory.make(10);
  }
}
