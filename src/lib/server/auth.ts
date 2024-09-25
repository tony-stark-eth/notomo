import type { OAuthProviderAttributes } from '@tony-stark-eth/lucia-mikro-orm-adapter';

import { dev } from '$app/environment';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { MikroORM } from '$lib/database/MikroORM';
import { MikroOrmAdapter } from '@tony-stark-eth/lucia-mikro-orm-adapter';
import { GitHub as GithubProvider } from 'arctic';
import { Lucia } from 'lucia';
export const lucia = new Lucia(new MikroOrmAdapter(MikroORM.em.fork()), {
  getSessionAttributes: (attributes) => {
    return attributes;
  },
  getUserAttributes: (attributes) => {
    return {
      providerId: attributes.providerId,
      providerUserId: attributes.providerUserId,
    };
  },
  sessionCookie: {
    attributes: {
      secure: !dev,
    },
  },
});

declare module 'lucia' {
  interface Register {
    DatabaseUserAttributes: OAuthProviderAttributes;
    Lucia: typeof lucia;
  }
}

export const Provider = new GithubProvider(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);
