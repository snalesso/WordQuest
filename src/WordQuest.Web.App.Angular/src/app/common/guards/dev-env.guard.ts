import { CanActivateFn } from '@angular/router';
import { environment } from 'src/environments/environment';

export const devEnvGuard: CanActivateFn = (route, state) => {
  return environment.mode.code === 'dev';
};
