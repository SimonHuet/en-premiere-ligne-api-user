import {DefaultCrudRepository} from '@loopback/repository';
import {Schedule, ScheduleRelations} from '../models';
import {PgDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ScheduleRepository extends DefaultCrudRepository<
  Schedule,
  typeof Schedule.prototype.id,
  ScheduleRelations
> {
  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
  ) {
    super(Schedule, dataSource);
  }
}
