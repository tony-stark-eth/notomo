import { Entity, Enum, PrimaryKey, Property, types } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { ContentType } from '$lib/database/enum/ContentType';

@Entity()
export class Note {
  @PrimaryKey({ type: types.uuid })
  uuid: string = v4();

  @Property({ type: types.string, length: 180 })
  title: string;

  @Property({ type: types.text })
  content: string;

  @Enum({ items: () => ContentType, default: ContentType.Text, nativeEnumName: 'content_type' })
  contentType: ContentType;

  constructor(title: string, content: string, contentType: ContentType) {
    this.title = title;
    this.content = content;
    this.contentType = contentType;
  }
}
