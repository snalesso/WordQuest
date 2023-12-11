import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'coalesce', pure: true })
export class CoalescePipe implements PipeTransform {
    transform<T, NNT = NonNullable<T>>(value: NNT | undefined, fallbackValue: NNT): NNT;
    transform<T, NNT = NonNullable<T>>(value: NNT | null, fallbackValue: NNT): NNT;
    transform<T, NNT = NonNullable<T>>(value: NNT | undefined | null, fallbackValue: NNT): NNT {
        if (value === undefined || value === null)
            return fallbackValue;
        return value;
    }
}