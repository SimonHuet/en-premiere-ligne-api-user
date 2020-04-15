import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Blacklist extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  parentId?: string;

  @belongsTo(() => User)
  studentId: string;

  constructor(data?: Partial<Blacklist>) {
    super(data);
  }
}

export interface BlacklistRelations {
  // describe navigational properties here
}

export type BlacklistWithRelations = Blacklist & BlacklistRelations;
