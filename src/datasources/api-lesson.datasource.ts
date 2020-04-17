import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  ValueOrPromise,
} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'api_lesson',
  connector: 'rest',
  debug: 'true',
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url:
          process.env.API_LESSON_URL +
          '/topic-users?filter[include][][relation]=Topic&filter[where][userUUID]={userId}',
        headers: {
          customAllow: 'true',
        },
      },
      functions: {
        getUserTopics: ['userId'],
      },
    },
    {
      template: {
        method: 'GET',
        url:
          process.env.API_LESSON_URL +
          '/topic-users?filter[where][topicUUID]={topicId}',
        headers: {
          customAllow: 'true',
        },
      },
      functions: {
        getTopicUsers: ['topicId'],
      },
    },
  ],
};

@lifeCycleObserver('datasource')
export class ApiLessonDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'api_lesson';

  constructor(
    @inject('datasources.config.api_lesson', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

  /**
   * Start the datasource when application is started
   */
  start(): ValueOrPromise<void> {
    // Add your logic here to be invoked when the application is started
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}
