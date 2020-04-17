import {DefaultCrudRepository} from '@loopback/repository';
import {TopicUser, TopicUserRelations} from '../models';
import {PgDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TopicUserRepository extends DefaultCrudRepository<
  TopicUser,
  typeof TopicUser.prototype.id,
  TopicUserRelations
> {
  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
  ) {
    super(TopicUser, dataSource);
  }
}
