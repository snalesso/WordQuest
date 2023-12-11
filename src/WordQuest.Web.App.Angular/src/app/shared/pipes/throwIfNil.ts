import { Pipe, PipeTransform } from "@angular/core";
import { formatStr } from "../utils/string.utils";

@Pipe({ name: 'throwIfNil', pure: true })
export class ThrowIfNilPipe implements PipeTransform {
    transform<T>(value: NonNullable<T> | undefined, format?: string): NonNullable<T>;
    transform<T>(value: NonNullable<T> | null, format?: string): NonNullable<T>;
    transform<T>(value: NonNullable<T> | undefined | null, format?: string): NonNullable<T> {
        if (value == null) {
            const exMsg = (format == null)
                ? 'Value cannot be nil.'
                : formatStr(format, value);
            throw new Error(exMsg);
        }
        return value;
    }
}