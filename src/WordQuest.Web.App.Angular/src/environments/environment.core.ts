export const APP_NAME: string = "WordQuest";

export interface IEnvironment {
    production: boolean;
    website: {
        displayName: string;
    };
    api: {
        getSignalRHostAddress: () => string;
        getHostAddress: () => string;
    }
}
