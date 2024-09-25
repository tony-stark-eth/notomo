import { ContentType } from '$lib/database/enum/ContentType';
import { Note } from '$lib/database/schema/Note';
import { createNote, getNotes, removeNote } from '$lib/database/useCase';
import { lucia } from '$lib/server/auth';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

type OutputType = { count: number; notes: Array<Note> };

export const load: PageServerLoad<OutputType> = async function ({ locals }) {
  if (!locals.user) redirect(302, '/login');
  const [notes, count] = await getNotes(25, 0);

  return {
    count,
    notes: structuredClone(notes),
  };
};

export const actions = {
  createNote: async ({ request }: RequestEvent) => {
    const formData = await request.formData();
    const title = String(formData.get('title'));
    const content = String(formData.get('content'));
    const contentType = String(formData.get('contentType'));

    if (!title) {
      return fail(400, { missing: true, title });
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
  logout: async ({ cookies, locals }) => {
    if (!locals.session) {
      return fail(401);
    }
    await lucia.invalidateSession(locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
    });
    redirect(302, '/login');
  },
  removeNote: async ({ request }: RequestEvent) => {
    const formData = await request.formData();
    const noteUuid = formData.get('uuid');

    if (noteUuid === null) {
      return fail(400, { missing: true, noteUuid });
    }

    await removeNote(noteUuid.toString());

    return { success: true };
  },
};
