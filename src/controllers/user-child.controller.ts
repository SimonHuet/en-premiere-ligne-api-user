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
  Child,
} from '../models';
import {UserRepository} from '../repositories';

export class UserChildController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/children', {
    responses: {
      '200': {
        description: 'Array of User has many Child',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Child)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Child>,
  ): Promise<Child[]> {
    return this.userRepository.children(id).find(filter);
  }

  @post('/users/{id}/children', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Child)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Child, {
            title: 'NewChildInUser',
            exclude: ['id'],
            optional: ['parentId']
          }),
        },
      },
    }) child: Omit<Child, 'id'>,
  ): Promise<Child> {
    return this.userRepository.children(id).create(child);
  }

  @patch('/users/{id}/children', {
    responses: {
      '200': {
        description: 'User.Child PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Child, {partial: true}),
        },
      },
    })
    child: Partial<Child>,
    @param.query.object('where', getWhereSchemaFor(Child)) where?: Where<Child>,
  ): Promise<Count> {
    return this.userRepository.children(id).patch(child, where);
  }

  @del('/users/{id}/children', {
    responses: {
      '200': {
        description: 'User.Child DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Child)) where?: Where<Child>,
  ): Promise<Count> {
    return this.userRepository.children(id).delete(where);
  }
}
