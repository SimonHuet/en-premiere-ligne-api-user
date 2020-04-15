import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Schedule,
  User,
} from '../models';
import {ScheduleRepository} from '../repositories';

export class ScheduleUserController {
  constructor(
    @repository(ScheduleRepository)
    public scheduleRepository: ScheduleRepository,
  ) { }

  @get('/schedules/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Schedule',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Schedule.prototype.id,
  ): Promise<User> {
    return this.scheduleRepository.user(id);
  }
}
