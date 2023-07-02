import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'keep', pure: true })
export class KeepPipe implements PipeTransform {
    transform(value: boolean, valueToKeep: boolean): boolean | undefined {
        return value === valueToKeep ? value : undefined;
    }
}