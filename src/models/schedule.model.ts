import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Schedule>) {
    super(data);
  }
}

export interface ScheduleRelations {
  // describe navigational properties here
}

export type ScheduleWithRelations = Schedule & ScheduleRelations;
