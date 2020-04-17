import {ApplicationConfig} from '@loopback/core';
import {ApiUserApplication} from './application';

export {ApiUserApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new ApiUserApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
