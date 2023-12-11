import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { TdsErrorMessageFactories } from "@terranova-tds/forms";
import compareAsc from "date-fns/compareAsc";
import { Observable } from "rxjs";
import { distinctUntilChanged, shareReplay, startWith } from "rxjs/operators";

export interface ICustomValidator<TErrorKey extends keyof typeof CustomValidators> {
    readonly key: TErrorKey;
    readonly fn: (control: AbstractControl) => ValidationErrors | null;
    readonly composeErrorMsg: () => TdsErrorMessageFactories;
}
export class CustomValidator<T, TErrorKey extends keyof typeof CustomValidators> {

    public readonly errorMsgs;

    constructor(
        public readonly key: TErrorKey,
        public readonly fn: (control: AbstractControl) => ValidationErrors | null,
        public readonly composeErrorMsg: (limit: T) => TdsErrorMessageFactories) { }
}

export class CustomValidators {
    static notIncludedIn<TIn, TOut>(transform: (value: TIn) => TOut, values: TOut[]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const transformedValue = transform(control.value as TIn);
            if (!values.includes(transformedValue))
                return null;
            return { isIncludedIn: { value: control.value } };
        }
    }
    static integer(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value: number | null | undefined = control.value;
            if (value == null)
                return null;
            if (Number.isInteger(value))
                return null;
            return { integer: { value: control.value } };
        }
    }
    static greaterThan(limit: number): ICustomValidator<'greaterThan'> {
        return ({
            key: 'greaterThan',
            fn: (control: AbstractControl): ValidationErrors | null => {
                const value: number | null | undefined = control.value;
                if (value == null)
                    return null;
                if (value > limit)
                    return null;
                return { greaterThan: control.value };
            },
            composeErrorMsg: () => ({ greaterThan: () => `Il valore deve essere superiore a: ${limit}.` })
        });
    }
    static lowerThan(limit: number): ICustomValidator<'lowerThan'> {
        return ({
            key: 'lowerThan',
            fn: ((control: AbstractControl): ValidationErrors | null => {
                const value: number | null | undefined = control.value;
                if (value == null)
                    return null;
                if (value < limit)
                    return null;
                return { lowerThan: control.value };
            }) as ValidatorFn,
            composeErrorMsg: () => ({ lowerThan: () => `Il valore deve essere inferiore a: ${limit}.` })
        });
    }
    static lowerThan2(limit: number): ICustomValidator<'lowerThan'> {
        return ({
            key: 'lowerThan',
            fn: ((control: AbstractControl): ValidationErrors | null => {
                const value: number | null | undefined = control.value;
                if (value == null)
                    return null;
                if (value < limit)
                    return null;
                return { lowerThan: control.value };
            }) as ValidatorFn,
            composeErrorMsg: () => ({ lowerThan: () => `Il valore deve essere inferiore a: ${limit}.` })
        });
    }

    static chainError(errors: ValidationErrors, errorKey: string, condition: boolean, errorMessage: string): ValidationErrors {
        if (!!errors) {
            // modifico una copia shallow
            errors = { ...errors };
            delete errors[errorKey];
        }
        if (!!condition)
            errors = { ...errors, [errorKey]: errorMessage };
        return errors;
    }

    static fromToDate(fromDateControlName: string, toDateControlName: string, errorMessage: string, errorName: string = 'fromToDate'): ValidatorFn {

        return (formControl: AbstractControl) => {

            const fromDate = formControl.parent?.get(fromDateControlName).value;
            const toDate = formControl.parent?.get(toDateControlName).value;

            const isFromSet = fromDate !== null && fromDate !== undefined;
            const isToSet = toDate !== null && toDate !== undefined;

            if (isFromSet && isToSet && compareAsc(fromDate, toDate) > 0)
                return { [errorName]: errorMessage };

            return null;
        };
    }
}

export function observeFormCtrlValue<T>(control: AbstractControl): Observable<T> {
    return (control.valueChanges as Observable<T>).pipe(
        startWith(control.value as T),
        shareReplay({ bufferSize: 1, refCount: true }),
        distinctUntilChanged());
}

export class EntityValidators {
    public static readonly IntId = [
        CustomValidators.integer,
        Validators.min(1),
        Validators.max(Number.MAX_SAFE_INTEGER)
    ];
}