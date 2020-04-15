import {Entity, model, property} from '@loopback/repository';

@model()
export class TopicUser extends Entity {
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
  topicId: string;


  constructor(data?: Partial<TopicUser>) {
    super(data);
  }
}

export interface TopicUserRelations {
  // describe navigational properties here
}

export type TopicUserWithRelations = TopicUser & TopicUserRelations;
