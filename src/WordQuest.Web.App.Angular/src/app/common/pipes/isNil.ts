import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'isNil', pure: true })
export class IsNilPipe implements PipeTransform {
    transform<T>(value: T | undefined | null): boolean {
        return value === undefined || value === null;
    }
}