export const APP_NAME: string = "WordQuest";

export interface IEnvironment {
    readonly mode: {
        readonly code: 'dev' | 'prod';
        readonly label: string;
    },
    readonly website: {
        readonly displayName: string;
    };
    readonly api: {
        readonly getSignalRHostAddress: () => string;
        readonly getHostAddress: () => string;
    }
}
