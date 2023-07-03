import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'isNotNil', pure: true })
export class IsNotNilPipe implements PipeTransform {
    transform<T>(value: T | undefined | null): boolean {
        return value != null;
    }
}