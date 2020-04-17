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
import {Level} from '../models';
import {LevelRepository} from '../repositories';

export class LevelController {
  constructor(
    @repository(LevelRepository)
    public levelRepository : LevelRepository,
  ) {}

  @post('/levels', {
    responses: {
      '200': {
        description: 'Level model instance',
        content: {'application/json': {schema: getModelSchemaRef(Level)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Level, {
            title: 'NewLevel',
            exclude: ['id'],
          }),
        },
      },
    })
    level: Omit<Level, 'id'>,
  ): Promise<Level> {
    return this.levelRepository.create(level);
  }

  @get('/levels/count', {
    responses: {
      '200': {
        description: 'Level model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Level) where?: Where<Level>,
  ): Promise<Count> {
    return this.levelRepository.count(where);
  }

  @get('/levels', {
    responses: {
      '200': {
        description: 'Array of Level model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Level, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Level) filter?: Filter<Level>,
  ): Promise<Level[]> {
    return this.levelRepository.find(filter);
  }

  @patch('/levels', {
    responses: {
      '200': {
        description: 'Level PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Level, {partial: true}),
        },
      },
    })
    level: Level,
    @param.where(Level) where?: Where<Level>,
  ): Promise<Count> {
    return this.levelRepository.updateAll(level, where);
  }

  @get('/levels/{id}', {
    responses: {
      '200': {
        description: 'Level model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Level, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Level, {exclude: 'where'}) filter?: FilterExcludingWhere<Level>
  ): Promise<Level> {
    return this.levelRepository.findById(id, filter);
  }

  @patch('/levels/{id}', {
    responses: {
      '204': {
        description: 'Level PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Level, {partial: true}),
        },
      },
    })
    level: Level,
  ): Promise<void> {
    await this.levelRepository.updateById(id, level);
  }

  @put('/levels/{id}', {
    responses: {
      '204': {
        description: 'Level PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() level: Level,
  ): Promise<void> {
    await this.levelRepository.replaceById(id, level);
  }

  @del('/levels/{id}', {
    responses: {
      '204': {
        description: 'Level DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.levelRepository.deleteById(id);
  }
}
