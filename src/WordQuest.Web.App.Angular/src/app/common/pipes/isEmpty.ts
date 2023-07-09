import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'isEmpty', pure: true })
export class IsEmptyPipe implements PipeTransform {

    transform<TValueOrKey, TValue = never>(
        items: string
            | Array<TValueOrKey> | ReadonlyArray<TValueOrKey>
            | Set<TValueOrKey> | ReadonlySet<TValueOrKey>
            | Map<TValueOrKey, TValue> | ReadonlyMap<TValueOrKey, TValue>)
        : boolean {

        if (items === undefined)
            throw new Error('Could not determine items count');
        if (typeof items === 'string' || items instanceof Array)
            return this.check(items.length);
        if (items instanceof Set || items instanceof Map)
            return this.check(items.size);
        throw new Error('Unsuppoerted type.');
    }

    private check(count: number): boolean {
        if (count === undefined)
            throw new Error('Could not determine items count');
        return count <= 0;
    }
}