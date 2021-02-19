import { Pipe, PipeTransform } from "@angular/core";
import { merge, Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";

@Pipe({ name: 'falsyToNull', pure: true })
export class FalsyToNull implements PipeTransform {

    transform<T>(sourceOrValue: T | Observable<T>) {

        if (sourceOrValue instanceof Observable)
            return sourceOrValue.pipe(map(this.falsyToNull));

        return this.falsyToNull(sourceOrValue);
    }

    private falsyToNull<T>(value: T) {
        if (!value)
            return null;
        return true;
    }
}