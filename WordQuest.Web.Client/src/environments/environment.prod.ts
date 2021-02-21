import { IEnvironment } from './IEnvironment';

export const environment: IEnvironment = {
    production: true,
    website: {
        displayName: "SaltinSEDIA"
    },
    api: {
        getHostAddress: () => window.location.origin + "/api"
    }
}
