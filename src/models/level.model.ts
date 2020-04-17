import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Level extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => User)
  users: User[];

  constructor(data?: Partial<Level>) {
    super(data);
  }
}

export interface LevelRelations {
  // describe navigational properties here
}

export type LevelWithRelations = Level & LevelRelations;
