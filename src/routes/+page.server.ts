import { ContentType } from '$lib/database/enum/ContentType';
import { MikroORM } from '$lib/database/MikroORM';
import { Note } from '$lib/database/schema/Note';
import { createNote, getNotes, removeNote } from '$lib/database/useCase';
import { lucia } from '$lib/server/auth';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

type OutputType = { count: number; notes: Array<Note> };

export const load: PageServerLoad<OutputType> = async function ({ locals }) {
  if (locals.session === null) {
    redirect(302, '/login');
  }

  const [notes, count] = await getNotes(MikroORM.em.fork(), locals.session.userId, 25, 0);

  return {
    count,
    notes: structuredClone(notes),
  };
};

export const actions = {
  createNote: async ({ locals, request }: RequestEvent) => {
    if (locals.session === null) {
      return fail(401);
    }
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

    const note = new Note(locals.session.userId, title, content, contentType as ContentType);

    await createNote(MikroORM.em.fork(), note);

    return { success: true };
  },
  logout: async ({ cookies, locals }) => {
    if (locals.session === null) {
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
  removeNote: async ({ locals, request }: RequestEvent) => {
    if (locals.session === null) {
      return fail(401);
    }

    const formData = await request.formData();
    const noteUuid = formData.get('uuid');

    if (noteUuid === null) {
      return fail(400, { missing: true, noteUuid });
    }

    await removeNote(MikroORM.em.fork(), noteUuid.toString());

    return { success: true };
  },
};
