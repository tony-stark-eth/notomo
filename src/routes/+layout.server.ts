import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import { Session } from '@tony-stark-eth/lucia-mikro-orm-adapter';

export const load: ({ locals, url }: { locals: { session: null | Session }; url: URL }) => Promise<{ session: null | Session }> = async function ({ locals, url }) {
  if (url.pathname.startsWith('/stats')) {
    throw redirect(308, `${env.UMAMI_URL}/script.js`);
  }

  return {
    session: locals.session,
  };
};
