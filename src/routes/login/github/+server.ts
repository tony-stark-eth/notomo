import type { RequestEvent } from '@sveltejs/kit';

import { Provider as github } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { generateState } from 'arctic';

export async function GET(event: RequestEvent): Promise<Response> {
  const state = generateState();
  const url = await github.createAuthorizationURL(state);

  event.cookies.set('github_oauth_state', state, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: '/',
    sameSite: 'lax',
    secure: import.meta.env.PROD,
  });

  redirect(302, url.toString());
}
