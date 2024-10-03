import { ContentType } from '$lib/database/enum/ContentType';
import { Note } from '$lib/database/schema/Note';
import { faker } from '@faker-js/faker';
import { Factory } from '@mikro-orm/seeder';
import { v4 } from 'uuid';

export class NoteFactory extends Factory<Note> {
  model = Note;

  definition(): Partial<Note> {
    return {
      content: faker.string.sample(1000),
      contentType: faker.helpers.enumValue(ContentType),
      title: faker.string.alpha(180),
      userId: v4(),
    };
  }
}
