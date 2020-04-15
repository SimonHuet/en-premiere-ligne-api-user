import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Role, Child, Blacklist, Level, Schedule, TopicUser} from '../models';
import {PgDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RoleRepository} from './role.repository';
import {ChildRepository} from './child.repository';
import {BlacklistRepository} from './blacklist.repository';
import {LevelRepository} from './level.repository';
import {ScheduleRepository} from './schedule.repository';
import {TopicUserRepository} from './topic-user.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly role: BelongsToAccessor<Role, typeof User.prototype.id>;

  public readonly children: HasManyRepositoryFactory<Child, typeof User.prototype.id>;

  public readonly blacklists: HasManyRepositoryFactory<Blacklist, typeof User.prototype.id>;

  public readonly level: BelongsToAccessor<Level, typeof User.prototype.id>;

  public readonly schedules: HasManyRepositoryFactory<Schedule, typeof User.prototype.id>;

  public readonly topicUsers: HasManyRepositoryFactory<TopicUser, typeof User.prototype.id>;

  constructor(
    @inject('datasources.pg') dataSource: PgDataSource, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>, @repository.getter('ChildRepository') protected childRepositoryGetter: Getter<ChildRepository>, @repository.getter('BlacklistRepository') protected blacklistRepositoryGetter: Getter<BlacklistRepository>, @repository.getter('LevelRepository') protected levelRepositoryGetter: Getter<LevelRepository>, @repository.getter('ScheduleRepository') protected scheduleRepositoryGetter: Getter<ScheduleRepository>, @repository.getter('TopicUserRepository') protected topicUserRepositoryGetter: Getter<TopicUserRepository>,
  ) {
    super(User, dataSource);
    this.topicUsers = this.createHasManyRepositoryFactoryFor('topicUsers', topicUserRepositoryGetter,);
    this.registerInclusionResolver('topicUsers', this.topicUsers.inclusionResolver);
    this.schedules = this.createHasManyRepositoryFactoryFor('schedules', scheduleRepositoryGetter,);
    this.registerInclusionResolver('schedules', this.schedules.inclusionResolver);
    this.level = this.createBelongsToAccessorFor('level', levelRepositoryGetter,);
    this.registerInclusionResolver('level', this.level.inclusionResolver);
    this.blacklists = this.createHasManyRepositoryFactoryFor('blacklists', blacklistRepositoryGetter,);
    this.registerInclusionResolver('blacklists', this.blacklists.inclusionResolver);
    this.children = this.createHasManyRepositoryFactoryFor('children', childRepositoryGetter,);
    this.registerInclusionResolver('children', this.children.inclusionResolver);
    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter,);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
  }
}
