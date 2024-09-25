import { Session } from '@tony-stark-eth/lucia-mikro-orm-adapter';

export const load: ({ locals }: { locals: { session: null | Session } }) => Promise<{ session: null | Session }> = async function ({ locals }) {
  return {
    session: locals.session,
  };
};
