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
  Level,
  User,
} from '../models';
import {LevelRepository} from '../repositories';

export class LevelUserController {
  constructor(
    @repository(LevelRepository) protected levelRepository: LevelRepository,
  ) { }

  @get('/levels/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Level has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.levelRepository.users(id).find(filter);
  }

  @post('/levels/{id}/users', {
    responses: {
      '200': {
        description: 'Level model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Level.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInLevel',
            exclude: ['id'],
            optional: ['levelId']
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.levelRepository.users(id).create(user);
  }

  @patch('/levels/{id}/users', {
    responses: {
      '200': {
        description: 'Level.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.levelRepository.users(id).patch(user, where);
  }

  @del('/levels/{id}/users', {
    responses: {
      '200': {
        description: 'Level.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.levelRepository.users(id).delete(where);
  }
}
