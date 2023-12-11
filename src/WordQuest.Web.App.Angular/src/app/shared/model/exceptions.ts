import { getCtorName } from "../utils/debug/core";
import { joinStringsSafe } from "../utils/primitives/array.utils";

export class ArgumentNullException extends Error {
    public constructor(paramName: string) {
        super(`Argument "${paramName}" cannot be null`);

        this.name = "ArgumentNullException";
    }
}

export class NotImplementedError<T = never> extends Error {

    public readonly typeName?: string | null | undefined;

    constructor(
        public readonly memberName: string,
        ownerOrTypeName?: T | string | null | undefined) {

        const typeName = ownerOrTypeName == null
            ? undefined
            : typeof ownerOrTypeName === 'string'
                ? ownerOrTypeName
                : getCtorName(ownerOrTypeName);
        const fullMemberName = joinStringsSafe([typeName, memberName], '.');
        const msg = joinStringsSafe([fullMemberName, 'not implemented']);

        super(`${msg}.`);

        this.typeName = typeName;
    }
}

export class EntityNotFoundError<TIdentity> extends Error {
    constructor(
        public readonly id: TIdentity,
        entityInfo?: {
            name: string,
            gender: 'F' | 'M' | 'N',
            counting: 'single' | 'multiple'
        }) {
        const gender = entityInfo?.gender ?? 'N';
        const found = gender === 'F'
            ? (entityInfo?.counting === 'single' ? 'trovata' : 'trovate')
            : gender === 'M'
                ? (entityInfo?.counting === 'single' ? 'trovato' : 'trovati')
                : (entityInfo?.counting === 'single' ? 'trovata/o' : 'trovate/i');
        const entityName = entityInfo?.name ?? 'Elemento';
        super(`${entityName} ${id} non ${found}.`);
    }
}
