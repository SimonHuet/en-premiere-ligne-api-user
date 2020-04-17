import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Blacklist, BlacklistRelations, User} from '../models';
import {PgDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class BlacklistRepository extends DefaultCrudRepository<
  Blacklist,
  typeof Blacklist.prototype.id,
  BlacklistRelations
> {

  public readonly student: BelongsToAccessor<User, typeof Blacklist.prototype.id>;

  constructor(
    @inject('datasources.pg') dataSource: PgDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Blacklist, dataSource);
    this.student = this.createBelongsToAccessorFor('student', userRepositoryGetter,);
    this.registerInclusionResolver('student', this.student.inclusionResolver);
  }
}
