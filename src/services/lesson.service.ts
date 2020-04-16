/* eslint-disable @typescript-eslint/no-explicit-any */
import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ApiLessonDataSource} from '../datasources';

export interface Lesson {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.

  getUserTopics(userId: string): Promise<any[]>;
  getTopicUsers(topicId: string): Promise<any[]>;
}

export class LessonProvider implements Provider<Lesson> {
  constructor(
    // api_lesson must match the name property in the datasource json file
    @inject('datasources.api_lesson')
    protected dataSource: ApiLessonDataSource = new ApiLessonDataSource(),
  ) {}

  value(): Promise<Lesson> {
    return getService(this.dataSource);
  }
}
