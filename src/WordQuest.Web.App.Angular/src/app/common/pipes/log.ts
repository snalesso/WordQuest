import { Pipe, PipeTransform } from "@angular/core";
import { formatStr } from "../utils/string.utils";

@Pipe({ name: 'log', pure: true })
export class LogPipe implements PipeTransform {

    transform<T>(value: T, logFn?: <T>(value: T) => void): T;
    transform<T>(value: T, format?: string): T;
    transform<T>(value: T, logFnOrFormat?: (<T>(value: T) => void) | string, format?: string): T {
        const logFnOrFormatType = typeof logFnOrFormat;
        const logFn = logFnOrFormat != null && typeof logFnOrFormat === 'function'
            ? logFnOrFormat
            : console.log;
        const frmt = logFnOrFormat != null && typeof logFnOrFormat === 'string'
            ? logFnOrFormat
            : format != null && typeof format === 'string'
                ? format
                : '{0}';
        const msg = formatStr(frmt, null);
        logFn(msg);
        return value;
    }

    private logViaConsole<T>(format: string, value: T): void {
        console.log(format, value);
    }
}