import { fail, type RequestEvent } from '@sveltejs/kit';

import { createNote, getNotes, removeNote } from '$lib/database/useCase';
import { Note } from '$lib/database/schema/Note';
import { ContentType } from '$lib/database/enum/ContentType';
import type { PageServerLoad } from './$types';

type OutputType = { notes: Array<Note>; count: number };

export const load: PageServerLoad<OutputType> = async function () {
  const [notes, count] = await getNotes(10, 0);

  return { notes: structuredClone(notes), count };
};

export const actions = {
  createNote: async ({ request }: RequestEvent) => {
    const formData = await request.formData();
    const title = String(formData.get('title'));
    const content = String(formData.get('content'));
    const contentType = String(formData.get('contentType'));

    if (!title) {
      return fail(400, { title, missing: true });
    }

    if (!content) {
      return fail(400, { content, missing: true });
    }

    if (!contentType) {
      return fail(400, { contentType, missing: true });
    }

    const note = new Note(title, content, contentType as ContentType);

    await createNote(note);

    return { success: true };
  },
  removeNote: async ({ request }: RequestEvent) => {
    const formData = await request.formData();
    const noteUuid = formData.get('uuid');

    if (noteUuid === null) {
      return fail(400, { noteUuid, missing: true });
    }

    await removeNote(noteUuid.toString());

    return { success: true };
  },
};
