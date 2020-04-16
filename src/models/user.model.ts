import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Blacklist} from './blacklist.model';
import {Child} from './child.model';
import {Level} from './level.model';
import {Role} from './role.model';
import {Schedule} from './schedule.model';
import {TopicUser} from './topic-user.model';

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
  })
  biography?: string;

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

  @belongsTo(() => Level)
  levelId: string;

  @hasMany(() => Schedule)
  schedules: Schedule[];

  @hasMany(() => TopicUser)
  topicUsers: TopicUser[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
