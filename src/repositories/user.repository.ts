import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Role, Child, Blacklist} from '../models';
import {PgDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RoleRepository} from './role.repository';
import {ChildRepository} from './child.repository';
import {BlacklistRepository} from './blacklist.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly role: BelongsToAccessor<Role, typeof User.prototype.id>;

  public readonly children: HasManyRepositoryFactory<Child, typeof User.prototype.id>;

  public readonly blacklists: HasManyRepositoryFactory<Blacklist, typeof User.prototype.id>;

  constructor(
    @inject('datasources.pg') dataSource: PgDataSource, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>, @repository.getter('ChildRepository') protected childRepositoryGetter: Getter<ChildRepository>, @repository.getter('BlacklistRepository') protected blacklistRepositoryGetter: Getter<BlacklistRepository>,
  ) {
    super(User, dataSource);
    this.blacklists = this.createHasManyRepositoryFactoryFor('blacklists', blacklistRepositoryGetter,);
    this.registerInclusionResolver('blacklists', this.blacklists.inclusionResolver);
    this.children = this.createHasManyRepositoryFactoryFor('children', childRepositoryGetter,);
    this.registerInclusionResolver('children', this.children.inclusionResolver);
    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter,);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
  }
}
