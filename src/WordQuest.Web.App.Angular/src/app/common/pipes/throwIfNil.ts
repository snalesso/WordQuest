import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'throwIfNil', pure: true })
export class ThrowIfNilPipe implements PipeTransform {
    transform<T>(value: NonNullable<T> | undefined): NonNullable<T>;
    transform<T>(value: NonNullable<T> | null): NonNullable<T>;
    transform<T>(value: NonNullable<T> | undefined | null): NonNullable<T> {
        if (value == null)
            throw new Error('Value cannot be nil.');
        return value;
    }
}