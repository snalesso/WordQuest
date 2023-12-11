import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'trueToUndef', pure: true })
export class TrueToUndefinedPipe implements PipeTransform {
    transform(value: boolean): false | undefined {
        return value === false ? false : undefined;
    }
}