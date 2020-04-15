import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Level>) {
    super(data);
  }
}

export interface LevelRelations {
  // describe navigational properties here
}

export type LevelWithRelations = Level & LevelRelations;
