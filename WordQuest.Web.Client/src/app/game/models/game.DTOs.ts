import { Dictionary } from "src/app/root/models/core";
import { Alphabet, Char, Language } from "src/app/root/models/culture.DTOs";

export enum MatchMode {
    TimeOut = 1,
    Rush = 2
}

// export enum MatchVisibility {
//     Public = 1,
//     LinkOnly = 2
// }

export interface MatchSettingsDto {
    readonly alphabetId: Alphabet["id"];
    readonly categoryIds: ReadonlySet<CategoryDto["id"]>;
    readonly chars: ReadonlySet<Char>;
    readonly secondsPerWord: number;
    readonly roundsCount: number;
    readonly matchMode: MatchMode;
    readonly isPublic: boolean;
}

export interface CategoryDto {
    readonly id: number;
    readonly languageId: Language["id"];
    readonly alphabetId: Alphabet["id"];
    // readonly alphabetFamily: AlphabetFamily;
    readonly name: string;
    readonly description?: string;
    // readonly tags?: ReadonlyArray<Tag>;
    readonly isCustom?: boolean;
}
export type CategoriesDict = Dictionary<CategoryDto["id"], CategoryDto>;
export type CategoryHeaderDto = Pick<CategoryDto, "id" | "name" | "description">;
export type CategoryHeadersDict = Dictionary<CategoryHeaderDto["id"], CategoryHeaderDto>;

export interface WordDto {
    value: string;
    votes: Map<string, boolean>; // player id, vote
}
export interface MatchRoundDto {
    startDateTime: Date;
    playerWords: Map<string, WordDto>;
}

// export interface IMatchRound {
//     readonly category: ICategory;
// }

// export interface IMatchRoundPhase { }
// export interface IWordsPhase extends IMatchRoundPhase { }
// export interface IValidationPhase extends IMatchRoundPhase { }

export interface MatchSnapshot {
    readonly id: string;
    readonly settings: MatchSettingsDto;

    readonly creationDateTime: Date;
    readonly startDateTime: Date;
    readonly endDateTime: Date;

    readonly currentRound: MatchRoundSnapshot;

    // readonly rounds: Array<Map<ICategory, Map<string, IWord>>>; // [] of category --> player --> word

    // readonly players: string;
    // readonly words: IWord[][][]; // 3D array by round
}

export interface MatchRoundSnapshot {
    readonly index: number;
    readonly char: Char;
    readonly categories: ReadonlyArray<CategoryDto>;
    readonly wordsPhase: WordsPhase;
    readonly validationPhase: ValidationPhase;
}
export enum MatchRoundPhaseType {
    Words = 1,
    Validation = 2
}
export interface MatchRoundPhase {
    readonly type: MatchRoundPhaseType;
    readonly startDateTime: Date;
    readonly endDateTime?: Date;
    // readonly grantedSeconds: number;
}
export interface WordsPhase extends MatchRoundPhase { }
export interface ValidationPhase extends MatchRoundPhase { }

export interface MatchEvent {
    readonly playerId?: unknown;
}
export interface ReadyboardUpdated {
    readonly readyMap: Dictionary<string, boolean>;
}
export interface MatchStarted {
    readonly startDateTime: Date;
}
export interface MatchEnded {
    readonly endDateTime: Date;
}
export interface RoundStarted {
    readonly startDateTime: Date;
    readonly roundSnapshot: MatchRoundSnapshot;
}
export interface RoundStarted {
    readonly startDateTime: Date;
    readonly roundSnapshot: MatchRoundSnapshot;
}
export interface RoundEnded {
    readonly endDateTime: Date;
}