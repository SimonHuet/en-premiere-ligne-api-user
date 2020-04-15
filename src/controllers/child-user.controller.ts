import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Child, User} from '../models';
import {ChildRepository} from '../repositories';

export class ChildUserController {
  constructor(
    @repository(ChildRepository)
    public childRepository: ChildRepository,
  ) {}

  @get('/children/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Child',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Child.prototype.id,
  ): Promise<User> {
    return this.childRepository.child(id);
  }
}
