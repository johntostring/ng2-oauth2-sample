import { FactoryProvider } from '@angular/core';

export function configFactory() {
  return {
    authServer: 'http://localhost:9999/sso',
    resServer: 'http://localhost:8081/'
  };
}

/**
 * Created by John Zhang on 16/12/26.
 */
export function provideAppConfig(): FactoryProvider {
  return {
    provide: 'appConfig',
    useFactory: configFactory
  };
}
