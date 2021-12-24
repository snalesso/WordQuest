import { APP_NAME, IEnvironment } from './environment.core';

export const environment: IEnvironment = {
    production: true,
    website: {
        displayName: APP_NAME
    },
    api: {
        getSignalRHostAddress: () => "",
        getHostAddress: () => window.location.origin + "/api"
    }
}
