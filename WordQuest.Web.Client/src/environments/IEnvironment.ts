export interface IEnvironment {
    production: boolean;
    website: {
        displayName: string;
    };
    api: {
        getHostAddress: () => string;
    }
}
