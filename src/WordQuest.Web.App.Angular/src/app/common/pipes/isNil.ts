import { Pipe, PipeTransform } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { isNil } from "../utils/core.utils";

@Pipe({ name: 'isNil', pure: true })
export class IsNil implements PipeTransform {

    transform<T>(sourceOrValue: T | Observable<T>) {

        if (sourceOrValue instanceof Observable)
            return sourceOrValue.pipe(map(isNil));

        return isNil(sourceOrValue);
    }
}