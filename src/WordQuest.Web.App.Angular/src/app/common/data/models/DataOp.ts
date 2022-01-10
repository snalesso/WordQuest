export enum DataOperationStatus {
    Loading,
    Loaded,
    Failed
}

export interface DataOp<T> {
    // readonly status: DataOperationStatus;
    readonly isLoading: boolean;
    readonly data: T;
    readonly error: Error | null;
}