import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'empty', pure: true })
export class EmptyPipe implements PipeTransform {
    transform<T>(value: Array<T> | ReadonlyArray<T> | Set<T> | ReadonlySet<T>): boolean {

        let count: number | undefined = undefined;

        if (value instanceof Array)
            count = value.length;
        else if (value instanceof Set)
            count = value.size;
        else if (value instanceof Map)
            count = value.size;

        if (count === undefined)
            throw new Error('Could not determine items count');

        return count <= 0;
    }
}