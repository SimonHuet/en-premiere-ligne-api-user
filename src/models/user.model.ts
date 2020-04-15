import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Role} from './role.model';
import {Child} from './child.model';
import {Blacklist} from './blacklist.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
    required: true,
    default: 'en attente',
  })
  approuved: string;

  @belongsTo(() => Role)
  roleId: string;

  @hasMany(() => Child, {keyTo: 'parentId'})
  children: Child[];

  @hasMany(() => Blacklist, {keyTo: 'parentId'})
  blacklists: Blacklist[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
