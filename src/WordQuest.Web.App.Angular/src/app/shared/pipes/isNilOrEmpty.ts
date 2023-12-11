import { Pipe, PipeTransform } from "@angular/core";
import { isNilOrEmpty } from "../utils/core.utils";

@Pipe({ name: 'isNilOrEmpty', pure: true })
export class IsNilOrEmptyPipe implements PipeTransform {
    transform<T>(value:
        Array<T> | ReadonlyArray<T>
        | Set<T> | ReadonlySet<T>
        | undefined | null)
        : boolean {
        return isNilOrEmpty(value);
    }
}