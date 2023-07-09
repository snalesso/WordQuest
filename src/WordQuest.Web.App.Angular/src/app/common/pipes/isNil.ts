import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'isNil', pure: true })
export class IsNilPipe implements PipeTransform {
    transform<T>(value: T | undefined | null): value is null | undefined {
        return value == null;
    }
}