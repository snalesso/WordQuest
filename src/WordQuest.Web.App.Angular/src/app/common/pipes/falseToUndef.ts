import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'falseToUndef', pure: true })
export class FalseToUndefinedPipe implements PipeTransform {
    transform(value: boolean): true | undefined {
        return value === true ? true : undefined;
    }
}