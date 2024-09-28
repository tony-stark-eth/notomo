import { Session } from '@tony-stark-eth/lucia-mikro-orm-adapter';

import type { PageServerLoad } from './$types';

type OutputType = { session: Session };

export const load: PageServerLoad<OutputType> = async function ({ locals }) {
  return {
    session: locals.session,
  };
};
