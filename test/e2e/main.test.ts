import type { PreviewServer } from 'vite';

import { MikroORM } from '$lib/database/MikroORM';
import { lucia } from '$lib/server/auth';
import { expect, type Page } from '@playwright/test';
import { User } from '@tony-stark-eth/lucia-mikro-orm-adapter';
import path from 'node:path';
import process from 'node:process';
// @vitest-environment node
import { type Browser, chromium, firefox, webkit } from '@playwright/test';
import { v4 } from 'uuid';
import { preview } from 'vite';
import { afterAll, beforeAll, describe, it, onTestFailed } from 'vitest';

const browserTypes = process.env.ALL_BROWSERS ? [chromium, firefox, webkit] : [chromium];

const BASE_URL = 'http://localhost:4173';

const login = async function (page: Page): Promise<void> {
  const entityManager = MikroORM.em.fork();
  const user = entityManager.create(User, new User({ providerId: 'github', providerUserId: 'github-user' }));
  await entityManager.persistAndFlush(user);

  const session = await lucia.createSession(user.id, { username: 'github-username' }, { sessionId: v4() });

  const sessionCookie = lucia.createSessionCookie(session.id);
  const cookieData = {
    httpOnly: sessionCookie.attributes.httpOnly,
    name: sessionCookie.name,
    secure: sessionCookie.attributes.secure,
    url: BASE_URL,
    value: sessionCookie.value,
  };

  await page.context().addCookies([cookieData]);
};

for (const browserType of browserTypes) {
  describe(`browser:${browserType.name()}`, () => {
    let previewServer: PreviewServer;
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
      previewServer = await preview({
        configFile: path.resolve(__dirname, '../../vite.config.ts'),
        mode: 'test',
      });
      browser = await browserType.launch({ headless: true });
    });

    afterAll(async () => {
      browser?.close();
      await previewServer?.close();
    });

    it('has title', async () => {
      const page = await browser.newPage();

      await page.goto(BASE_URL);

      expect(await page.title()).toBe('Notomo');
    });

    it('no login redirect with existing login session', async () => {
      const page = await browser.newPage();
      await login(page);

      await page.goto(BASE_URL);
      await expect(page).toHaveURL(BASE_URL + '/');
    });

    it('can create note', async () => {
      onTestFailed(async () => {
        await page.screenshot({ fullPage: true, path: 'test-results/screenshot.png' });
      });
      page = await browser.newPage();
      await login(page);

      await page.goto(BASE_URL);

      const titleField = page.getByPlaceholder('Write note...');
      await titleField.click();
      await titleField.fill('Test Title');

      const textarea = page.getByPlaceholder('Describing your note...');
      expect(textarea.isVisible()).toBeTruthy();

      await textarea.click();
      await textarea.fill('Test Description');

      const submitButton = page.getByRole('button', { name: 'Add note' });
      await submitButton.click();

      const noteContainer = page.locator('#note-container');
      await noteContainer.waitFor({ state: 'visible' });

      const note = noteContainer.getByText('Test Title');
      expect(await note.isVisible()).toBeTruthy();
    });
  });
}
