import { identity, Observable } from "rxjs";
import { delay } from "rxjs/operators";
import { environment } from "src/environments/environment.dev";
import { isNil } from "./core.utils";

export const IS_LOGGING_ENABLED = true;
export const DEV_FORCED_DELAY: number = 750;

export function getCtorName<T extends Object>(componentOrLabel: T): string | null {

    if (isNil(componentOrLabel))
        throw new Error('Parameter "component" is not defined.');

    const ctorName = Object.getPrototypeOf(componentOrLabel)?.constructor?.name as string;

    if (!ctorName)
        return null;

    if (!ctorName.endsWith('Component'))
        return ctorName;

    return ctorName.substring(0, ctorName.length - 9);
}

export function logEvent<TObj extends Object, TValue>(
    componentOrName: TObj | string,
    eventName: string,
    value?: TValue,
    logUndefined: boolean = true) {

    if (!IS_LOGGING_ENABLED)
        return;

    const contextName = (typeof componentOrName === 'string')
        ? componentOrName
        : getCtorName(componentOrName);

    if (value !== undefined || logUndefined)
        console.log(`[${contextName}] ${eventName}`, value);
    else
        console.log(`[${contextName}] ${eventName}`);
}

export function forceDelayInDev(delayMs: number = DEV_FORCED_DELAY) {
    if (environment.mode.code === 'prod' || delayMs <= 0)
        return identity;
    return <T>(source$: Observable<T>) => source$.pipe(delay(delayMs));
}