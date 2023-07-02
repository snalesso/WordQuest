export interface ObservableValueSourceSettings<TValue> {
    readonly loggingId?: string;
    readonly isLoggingEnabled?: boolean;
    readonly serializeValueFn?: (value: TValue) => string;
}