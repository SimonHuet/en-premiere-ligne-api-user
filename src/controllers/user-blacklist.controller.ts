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
  Blacklist,
} from '../models';
import {UserRepository} from '../repositories';

export class UserBlacklistController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/blacklists', {
    responses: {
      '200': {
        description: 'Array of User has many Blacklist',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Blacklist)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Blacklist>,
  ): Promise<Blacklist[]> {
    return this.userRepository.blacklists(id).find(filter);
  }

  @post('/users/{id}/blacklists', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Blacklist)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blacklist, {
            title: 'NewBlacklistInUser',
            exclude: ['id'],
            optional: ['parentId']
          }),
        },
      },
    }) blacklist: Omit<Blacklist, 'id'>,
  ): Promise<Blacklist> {
    return this.userRepository.blacklists(id).create(blacklist);
  }

  @patch('/users/{id}/blacklists', {
    responses: {
      '200': {
        description: 'User.Blacklist PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blacklist, {partial: true}),
        },
      },
    })
    blacklist: Partial<Blacklist>,
    @param.query.object('where', getWhereSchemaFor(Blacklist)) where?: Where<Blacklist>,
  ): Promise<Count> {
    return this.userRepository.blacklists(id).patch(blacklist, where);
  }

  @del('/users/{id}/blacklists', {
    responses: {
      '200': {
        description: 'User.Blacklist DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Blacklist)) where?: Where<Blacklist>,
  ): Promise<Count> {
    return this.userRepository.blacklists(id).delete(where);
  }
}
