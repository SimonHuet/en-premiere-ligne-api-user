import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Schedule extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fin: string;

  @property({
    type: 'date',
    required: true,
  })
  debut: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Schedule>) {
    super(data);
  }
}

export interface ScheduleRelations {
  // describe navigational properties here
}

export type ScheduleWithRelations = Schedule & ScheduleRelations;
