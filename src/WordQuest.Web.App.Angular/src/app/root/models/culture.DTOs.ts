// unicode blocks: https://en.wikipedia.org/wiki/List_of_Unicode_characters

import { Dictionary } from "src/app/common/data/models/Dictionary";

export type LatinChar = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
export type CirillicChar = 'А' | 'Б' | 'В' | 'Г' | 'Д' | 'Е' | 'Ж' | 'З' | 'И' | 'Й' | 'К' | 'Л' | 'М' | 'Н' | 'О' | 'П' | 'Р' | 'С' | 'Т' | 'У' | 'Ф' | 'Х' | 'Ц' | 'Ч' | 'Ш' | 'Щ' | 'Ъ' | 'Ы' | 'Ь' | 'Э' | 'Ю' | 'Я';
export type GreekChar = 'Α' | 'Β' | 'Γ' | 'Δ' | 'Ε' | 'Ζ' | 'Η' | 'Θ' | 'Ι' | 'Κ' | 'Λ' | 'Μ' | 'Ν' | 'Ξ' | 'Ο' | 'Π' | 'Ρ' | 'Σ' | 'Τ' | 'Υ' | 'Φ' | 'Χ' | 'Ψ' | 'Ω';
export type Char = LatinChar | CirillicChar | GreekChar;

// export enum LCID {
//     German = 1031,
//     English = 1033,
//     Spanish = 1034,
//     French = 1036,
//     Italian = 1040,
//     Russian = 1049
// }

// export enum AlphabetFamily {
//     Latin,
//     Cyrillic,
//     Greek, // Α-Ω/ω-α
//     Armenian,
//     Georgian,
//     Hangul
// }

export interface Language {
    readonly id: number;
    readonly nativeName: string;
}
export interface LanguageHeader {
    readonly id: number;
    readonly nativeName: string;
}
export interface CharMetadata {
    readonly isUncommon?: boolean;
}
export interface CharInfo {
    readonly char: Char;
    readonly isRare?: boolean;
}
export interface Alphabet {
    readonly id: number;
    readonly language: Language;
    // readonly alphabetFamily: AlphabetFamily;
    readonly nativeName: string;
    readonly charInfos: ReadonlyArray<CharInfo>; // TODO: use dict/set?
}
export interface AlphabetVariantOption {
    readonly id: number;
    readonly languageNativeName: string;
    readonly alphabetFamilyInvariantCultureName: string;
    // readonly language: LanguageHeader;
    readonly charMetadataMap: Dictionary<Char, CharMetadata>;
}

export type LanguagesDict = Dictionary<Language["id"], Language>;
export type CharInfosDict = Dictionary<CharInfo["char"], CharInfo>;
export type AlphabetsDict = Dictionary<Alphabet["id"], Alphabet>;