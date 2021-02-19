export enum RuleDataType {
    Literal,
    Numeric
}

export enum LiteralRuleCheck {
    Is,
    Is_Not,

    StartsWith,
    EndsWith,
    Contains,

    StartsWith_Not,
    EndsWith_Not,
    Contains_Not,
}

export enum NumericRuleCheck {
    Is,
    Is_Not,

    IsGreaterThan,
    IsLowerThan,

    // IsBetween
}

export enum RulesCorrelationType {
    Any,
    All
}

export interface IRule<T> {
    path: string;
    checkType: NumericRuleCheck | LiteralRuleCheck;
    value: string;
}

export interface INumericRule<T> extends IRule<T> {
    // path: string;
    checkType: NumericRuleCheck;
    // value: string;
}

export interface ILiteralRule<T> extends IRule<T> {
    // path: string;
    checkType: LiteralRuleCheck;
    // value: string;
}

export interface IRulesGroup<T> {
    correlation: RulesCorrelationType;
    rules: rule<T>[];
}

export type rule<T> = INumericRule<T> | ILiteralRule<T> | IRulesGroup<T>
