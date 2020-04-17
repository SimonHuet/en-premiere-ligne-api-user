import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Schedule, ScheduleRelations, User} from '../models';
import {PgDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class ScheduleRepository extends DefaultCrudRepository<
  Schedule,
  typeof Schedule.prototype.id,
  ScheduleRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Schedule.prototype.id>;

  constructor(
    @inject('datasources.pg') dataSource: PgDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Schedule, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
