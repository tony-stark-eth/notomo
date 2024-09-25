import type { RequestEvent } from '@sveltejs/kit';

import { MikroORM } from '$lib/database/MikroORM';
import { Provider as github, lucia } from '$lib/server/auth';
import { User } from '@tony-stark-eth/lucia-mikro-orm-adapter';
import { OAuth2RequestError } from 'arctic';
import { v4 } from 'uuid';

export async function GET(event: RequestEvent): Promise<Response> {
  const entityManager = MikroORM.em.fork();
  const code = event.url.searchParams.get('code');
  const state = event.url.searchParams.get('state');
  const storedState = event.cookies.get('github_oauth_state') ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    const providerAttributes = { providerId: 'github', providerUserId: String(githubUser.id) };

    // Replace this with your own DB client.
    const existingUser = await entityManager.findOne(User, { attributes: providerAttributes });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, { avatar: githubUser.avatar_url, username: githubUser.login }, { sessionId: v4() });
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes,
      });
    } else {
      const userEntity = entityManager.create(User, new User(providerAttributes));
      const userId = userEntity.id;
      await entityManager.persistAndFlush(userEntity);

      const session = await lucia.createSession(userId, { avatar: githubUser.avatar_url, username: githubUser.login }, { sessionId: v4() });
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes,
      });
    }
    return new Response(null, {
      headers: {
        Location: '/',
      },
      status: 302,
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GitHubUser {
  avatar_url: string;
  id: number;
  login: string;
}
