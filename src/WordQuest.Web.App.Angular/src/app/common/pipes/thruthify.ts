import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'thrutify', pure: true })
export class ThrutifyPipe implements PipeTransform {
    transform(value: unknown): boolean {
        return !!value;
    }
}