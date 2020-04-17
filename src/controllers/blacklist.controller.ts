import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Blacklist} from '../models';
import {BlacklistRepository} from '../repositories';

export class BlacklistController {
  constructor(
    @repository(BlacklistRepository)
    public blacklistRepository : BlacklistRepository,
  ) {}

  @post('/blacklists', {
    responses: {
      '200': {
        description: 'Blacklist model instance',
        content: {'application/json': {schema: getModelSchemaRef(Blacklist)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blacklist, {
            title: 'NewBlacklist',
            exclude: ['id'],
          }),
        },
      },
    })
    blacklist: Omit<Blacklist, 'id'>,
  ): Promise<Blacklist> {
    return this.blacklistRepository.create(blacklist);
  }

  @get('/blacklists/count', {
    responses: {
      '200': {
        description: 'Blacklist model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Blacklist) where?: Where<Blacklist>,
  ): Promise<Count> {
    return this.blacklistRepository.count(where);
  }

  @get('/blacklists', {
    responses: {
      '200': {
        description: 'Array of Blacklist model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Blacklist, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Blacklist) filter?: Filter<Blacklist>,
  ): Promise<Blacklist[]> {
    return this.blacklistRepository.find(filter);
  }

  @patch('/blacklists', {
    responses: {
      '200': {
        description: 'Blacklist PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blacklist, {partial: true}),
        },
      },
    })
    blacklist: Blacklist,
    @param.where(Blacklist) where?: Where<Blacklist>,
  ): Promise<Count> {
    return this.blacklistRepository.updateAll(blacklist, where);
  }

  @get('/blacklists/{id}', {
    responses: {
      '200': {
        description: 'Blacklist model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Blacklist, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Blacklist, {exclude: 'where'}) filter?: FilterExcludingWhere<Blacklist>
  ): Promise<Blacklist> {
    return this.blacklistRepository.findById(id, filter);
  }

  @patch('/blacklists/{id}', {
    responses: {
      '204': {
        description: 'Blacklist PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blacklist, {partial: true}),
        },
      },
    })
    blacklist: Blacklist,
  ): Promise<void> {
    await this.blacklistRepository.updateById(id, blacklist);
  }

  @put('/blacklists/{id}', {
    responses: {
      '204': {
        description: 'Blacklist PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() blacklist: Blacklist,
  ): Promise<void> {
    await this.blacklistRepository.replaceById(id, blacklist);
  }

  @del('/blacklists/{id}', {
    responses: {
      '204': {
        description: 'Blacklist DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.blacklistRepository.deleteById(id);
  }
}
