import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Child extends Entity {
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
  childId: string;

  constructor(data?: Partial<Child>) {
    super(data);
  }
}

export interface ChildRelations {
  // describe navigational properties here
}

export type ChildWithRelations = Child & ChildRelations;
