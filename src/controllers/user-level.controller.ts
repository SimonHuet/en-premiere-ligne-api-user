import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  Level,
} from '../models';
import {UserRepository} from '../repositories';

export class UserLevelController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/level', {
    responses: {
      '200': {
        description: 'Level belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Level)},
          },
        },
      },
    },
  })
  async getLevel(
    @param.path.string('id') id: typeof User.prototype.id,
  ): Promise<Level> {
    return this.userRepository.level(id);
  }
}
