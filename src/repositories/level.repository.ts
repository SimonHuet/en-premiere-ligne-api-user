import {DefaultCrudRepository} from '@loopback/repository';
import {Level, LevelRelations} from '../models';
import {PgDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LevelRepository extends DefaultCrudRepository<
  Level,
  typeof Level.prototype.id,
  LevelRelations
> {
  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
  ) {
    super(Level, dataSource);
  }
}
