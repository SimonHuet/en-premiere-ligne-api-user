import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Level, LevelRelations, User} from '../models';
import {PgDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class LevelRepository extends DefaultCrudRepository<
  Level,
  typeof Level.prototype.id,
  LevelRelations
> {

  public readonly users: HasManyRepositoryFactory<User, typeof Level.prototype.id>;

  constructor(
    @inject('datasources.pg') dataSource: PgDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Level, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
