import { MikroORM } from '$lib/database/MikroORM';
import { Session } from '$lib/database/schema/Session';
import { User } from '$lib/database/schema/User';
import { type Adapter, type UserId } from 'lucia';

export class MikroOrmAdapter implements Adapter {
  async deleteExpiredSessions(): Promise<void> {
    const entityManager = MikroORM.em.fork();

    await entityManager.nativeDelete(Session, { expiresAt: { $lte: new Date() } });
    entityManager.clear();

    return;
  }

  async deleteSession(sessionId: string): Promise<void> {
    const entityManager = MikroORM.em.fork();

    return entityManager.removeAndFlush(entityManager.getReference(Session, sessionId));
  }

  async deleteUserSessions(userId: UserId): Promise<void> {
    const entityManager = MikroORM.em.fork();

    await entityManager.nativeDelete(Session, { userId: userId });
    entityManager.clear();

    return;
  }

  async getSessionAndUser(sessionId: string): Promise<[session: null | Session, user: null | User]> {
    const entityManager = MikroORM.em.fork();
    const session = await entityManager.findOne(Session, { id: sessionId });
    const user = await entityManager.findOne(User, { id: session?.userId });

    console.log(user);

    return [session, user];
  }

  async getUserSessions(userId: UserId): Promise<Session[]> {
    const entityManager = MikroORM.em.fork();

    return await entityManager.find(Session, { userId: userId });
  }

  async setSession(session: Session): Promise<void> {
    const entityManager = MikroORM.em.fork();
    const sessionEntity = entityManager.create(Session, session);

    return await entityManager.persistAndFlush(sessionEntity);
  }

  async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
    const entityManager = MikroORM.em.fork();
    const session = await entityManager.findOne(Session, { id: sessionId });

    if (session === null) {
      return;
    }

    session.expiresAt = expiresAt;

    return await entityManager.flush();
  }
}
