import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Child, ChildRelations, User} from '../models';
import {PgDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class ChildRepository extends DefaultCrudRepository<
  Child,
  typeof Child.prototype.id,
  ChildRelations
> {

  public readonly child: BelongsToAccessor<User, typeof Child.prototype.id>;

  constructor(
    @inject('datasources.pg') dataSource: PgDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Child, dataSource);
    this.child = this.createBelongsToAccessorFor('child', userRepositoryGetter,);
    this.registerInclusionResolver('child', this.child.inclusionResolver);
  }
}
