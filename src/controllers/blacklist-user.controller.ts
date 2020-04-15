import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Blacklist, User} from '../models';
import {BlacklistRepository} from '../repositories';

export class BlacklistUserController {
  constructor(
    @repository(BlacklistRepository)
    public blacklistRepository: BlacklistRepository,
  ) {}

  @get('/blacklists/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Blacklist',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Blacklist.prototype.id,
  ): Promise<User> {
    return this.blacklistRepository.student(id);
  }
}
