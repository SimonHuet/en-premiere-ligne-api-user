import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  TopicUser,
} from '../models';
import {UserRepository} from '../repositories';

export class UserTopicUserController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/topic-users', {
    responses: {
      '200': {
        description: 'Array of User has many TopicUser',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TopicUser)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TopicUser>,
  ): Promise<TopicUser[]> {
    return this.userRepository.topicUsers(id).find(filter);
  }

  @post('/users/{id}/topic-users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(TopicUser)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TopicUser, {
            title: 'NewTopicUserInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) topicUser: Omit<TopicUser, 'id'>,
  ): Promise<TopicUser> {
    return this.userRepository.topicUsers(id).create(topicUser);
  }

  @patch('/users/{id}/topic-users', {
    responses: {
      '200': {
        description: 'User.TopicUser PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TopicUser, {partial: true}),
        },
      },
    })
    topicUser: Partial<TopicUser>,
    @param.query.object('where', getWhereSchemaFor(TopicUser)) where?: Where<TopicUser>,
  ): Promise<Count> {
    return this.userRepository.topicUsers(id).patch(topicUser, where);
  }

  @del('/users/{id}/topic-users', {
    responses: {
      '200': {
        description: 'User.TopicUser DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TopicUser)) where?: Where<TopicUser>,
  ): Promise<Count> {
    return this.userRepository.topicUsers(id).delete(where);
  }
}
