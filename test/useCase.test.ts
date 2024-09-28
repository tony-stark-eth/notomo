import { ContentType } from '$lib/database/enum/ContentType';
import { Note } from '$lib/database/schema/Note';
import { createNote, getNotes, removeNote, updateNote } from '$lib/database/useCase';
import { MikroORM } from '@mikro-orm/postgresql';
import process from 'node:process';

const env = process.env;

describe('useCase', () => {
  let ORM: MikroORM;
  beforeAll(async () => {
    // Initialize the Mikro-ORM instance with the test database
    ORM = await MikroORM.init({
      dbName: env.DATABASE_NAME_TEST,
      entities: ['./src/lib/database/schema/**/*.{ts,js}', './node_modules/@tony-stark-eth/lucia-mikro-orm-adapter/dist/**/*.{ts,js}'],
      host: env.DATABASE_HOST,
      password: env.DATABASE_PASSWORD_TEST,
      schema: env.DATABASE_NAME_TEST,
      user: env.DATABASE_USER_TEST,
    });
  });

  afterAll(async () => {
    // Close the Mikro-ORM instance
    await ORM?.close();
  });

  describe('createNote', () => {
    it('should create a new note', async () => {
      const note = new Note('Test Note', 'This is a test note', ContentType.Text);
      const createdNote = await createNote(ORM.em.fork(), note);
      expect(createdNote).toBeDefined();
      expect(createdNote.title).toBe('Test Note');
      expect(createdNote.content).toBe('This is a test note');
      expect(createdNote.contentType).toBe(ContentType.Text);
    });
  });

  describe('getNotes', () => {
    it('should retrieve all notes', async () => {
      const notes = await getNotes(ORM.em.fork(), 10, 0);
      expect(notes).toBeDefined();
      expect(notes).toBeInstanceOf(Array);
    });

    it('should retrieve notes with pagination', async () => {
      const notes = await getNotes(ORM.em.fork(), 5, 5);
      expect(notes).toBeDefined();
      expect(notes).toBeInstanceOf(Array);
      expect(notes.length).toBeLessThanOrEqual(5);
    });
  });

  describe('removeNote', () => {
    it('should remove a note by UUID', async () => {
      const note = new Note('Test Note', 'This is a test note', ContentType.Text);
      const createdNote = await createNote(ORM.em.fork(), note);
      await removeNote(ORM.em.fork(), createdNote.uuid);
      const notes = await getNotes(ORM.em.fork(), 10, 0);
      expect(notes).not.toContainEqual(createdNote);
    });
  });

  describe('updateNote', () => {
    it('should update a note', async () => {
      const note = new Note('Test Note', 'This is a test note', ContentType.Text);
      const createdNote = await createNote(ORM.em.fork(), note);
      createdNote.title = 'Updated Test Note';
      const updatedNote = await updateNote(ORM.em.fork(), createdNote);
      expect(updatedNote).toBeDefined();
      expect(updatedNote.title).toBe('Updated Test Note');
    });
  });
});
