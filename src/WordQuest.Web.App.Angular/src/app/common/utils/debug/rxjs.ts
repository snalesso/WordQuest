import { Observable } from "rxjs";
import { distinctUntilChanged, share, shareReplay, tap } from "rxjs/operators";
import { logEvent, LogEventSettings } from "./core";

export function tapLogEvent<TThis extends Object | string | (() => string), TValue>(
    thisArg: TThis,
    logOrFactory: string | ((value: TValue, context: TThis) => string),
    settings?: LogEventSettings<TValue>) {
    return (source$: Observable<TValue>) => {
        const enabled = settings?.enabled ?? true;
        if (!enabled)
            return source$;
        return source$
            .pipe(
                tap(value => {
                    const log = logOrFactory instanceof Function ? logOrFactory(value, thisArg) : logOrFactory;
                    logEvent(thisArg, log, value, settings);
                }));
    };
}

export function shareLog<TComponent extends Object, TValue>(
    thisArg: TComponent,
    logOrFactory: string | ((value: TValue, context: TComponent) => string),
    settings?: LogEventSettings<TValue>) {
    return (source$: Observable<TValue>) => {
        return source$
            .pipe(
                tapLogEvent(thisArg, logOrFactory, settings),
                share());
    };
}

export function shareChangeLog<TComponent extends Object, TValue>(
    thisArg: TComponent,
    logOrFactory: string | ((value: TValue, context: TComponent) => string),
    settings?: LogEventSettings<TValue>) {
    return (source$: Observable<TValue>) => {
        return source$
            .pipe(
                distinctUntilChanged(),
                shareLog(thisArg, logOrFactory, settings));
    };
}

export function shareReplayLog<TComponent extends object, TValue>(
    thisArg: TComponent,
    logOrFactory: string | ((value: TValue, context: TComponent) => string),
    settings?: LogEventSettings<TValue>) {
    return (source$: Observable<TValue>) => {
        return source$
            .pipe(
                tapLogEvent(thisArg, logOrFactory, settings),
                shareReplay({ bufferSize: 1, refCount: true }));
    };
}

export function shareReplayChangeLog<TComponent extends Object, TValue>(
    thisArg: TComponent,
    logOrFactory: string | ((value: TValue, context: TComponent) => string),
    settings?: LogEventSettings<TValue>) {
    return (source$: Observable<TValue>) => {
        return source$
            .pipe(
                distinctUntilChanged(),
                shareReplayLog(thisArg, logOrFactory, settings));
    };
}