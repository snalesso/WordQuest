import { Observable } from "rxjs";
import { delay } from "rxjs/operators";
import { environment } from "src/environments/environment";

const IS_LOGGING_ENABLED = environment.mode.code === 'dev' && true;
const IS_RESPONSES_DELAY_ENABLED = environment.mode.code === 'dev' && false;

export function delayInDev(ms: number = 1500) {
    return function <T>(source$: Observable<T>) {
        if (IS_RESPONSES_DELAY_ENABLED === false)
            return source$;
        return source$.pipe(delay(ms));
    }
}

export function getCtorName<TComponent extends Object>(component: TComponent): string | null {

    if (!component)
        throw new Error("Parameter 'component' is not defined");

    const ctorName = Object.getPrototypeOf(component)?.constructor?.name as string;

    if (!ctorName)
        return null;

    if (!ctorName.endsWith('Component'))
        return ctorName;

    return ctorName.substring(0, ctorName.length - 9);
}

export interface LogEventSettings<TValue> {
    readonly enabled?: boolean;
    readonly logValue?: boolean;
    readonly ignoreUndefined?: boolean;
    readonly transform?: (value: TValue | undefined) => any
};
export function logEvent<TComponent extends Object | string, TValue>(
    componentOrNameOrNameFactory: TComponent | string | (() => string),
    eventName: string,
    value?: TValue,
    settings?: LogEventSettings<TValue>) {

    if (!IS_LOGGING_ENABLED)
        return;

    if (!(settings?.enabled ?? true))
        return;

    const contextName = (typeof componentOrNameOrNameFactory === 'string')
        ? componentOrNameOrNameFactory
        : (typeof componentOrNameOrNameFactory === 'function')
            ? (componentOrNameOrNameFactory as (() => string))()
            : getCtorName(componentOrNameOrNameFactory);

    const shouldLogValue = settings?.logValue ?? true;
    const ignoreUndefined = settings?.ignoreUndefined ?? false;
    const logValue = settings?.transform?.(value) ?? value;

    if (arguments.length >= 3 && shouldLogValue && (logValue !== undefined || !ignoreUndefined))
        console.log(`[${contextName}] ${eventName}`, logValue);
    else
        console.log(`[${contextName}] ${eventName}`);
}

export function logPropChanged<TComponent extends Object | string, PropKey extends keyof TComponent & string>(
    componentOrNameOrNameFactory: TComponent | string | (() => string),
    propName: PropKey,
    value?: TComponent[PropKey],
    settings?: LogEventSettings<TComponent[PropKey]>) {
    return logEvent(componentOrNameOrNameFactory, propName, value, settings);
}