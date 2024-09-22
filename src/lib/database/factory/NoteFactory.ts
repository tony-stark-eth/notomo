import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { Note } from '$lib/database/schema/Note';
import { ContentType } from '$lib/database/enum/ContentType';

export class NoteFactory extends Factory<Note> {
  model = Note;

  definition(): Partial<Note> {
    return {
      title: faker.string.alpha(180),
      content: faker.string.sample(1000),
      contentType: faker.helpers.enumValue(ContentType),
    };
  }
}
