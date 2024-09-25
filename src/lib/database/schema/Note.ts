import { ContentType } from '$lib/database/enum/ContentType';
import { Entity, Enum, PrimaryKey, Property, types } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Note {
  @Property({ type: types.text })
  content: string;

  @Enum({ default: ContentType.Text, items: () => ContentType, nativeEnumName: 'content_type' })
  contentType: ContentType;

  @Property()
  createdAt = new Date();

  @Property({ length: 180, type: types.string })
  title: string;

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @PrimaryKey({ type: types.uuid })
  uuid: string = v4();

  constructor(title: string, content: string, contentType: ContentType) {
    this.title = title;
    this.content = content;
    this.contentType = contentType;
  }
}
