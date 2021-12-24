
export class ArgumentNullException extends Error {
    public constructor(paramName: string) {
        super(`Argument "${paramName}" cannot be null`);

        this.name = "ArgumentNullException";
    }
}