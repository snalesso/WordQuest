import { IEnvironment } from './IEnvironment';

export const environment: IEnvironment = {
    production: true,
    website: {
        displayName: "SaltinSEDIA"
    },
    api: {
        getHostAddress: () => 'http://' + window.location.host + "/api"
    }
}
