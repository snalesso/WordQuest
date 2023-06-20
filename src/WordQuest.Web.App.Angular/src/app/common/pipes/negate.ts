import { Pipe, PipeTransform } from "@angular/core";

// TODO: rename into negate
@Pipe({ name: 'negate', pure: true })
export class NegatePipe implements PipeTransform {
    transform(value: boolean): boolean {
        return value === false ? true : false;
    }
}