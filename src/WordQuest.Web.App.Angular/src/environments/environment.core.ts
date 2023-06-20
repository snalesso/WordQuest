export const APP_NAME: string = "WordQuest";

export interface IEnvironment {
    readonly isInProduction: boolean;
    readonly website: {
        readonly displayName: string;
    };
    readonly api: {
        readonly getSignalRHostAddress: () => string;
        readonly getHostAddress: () => string;
    }
}
