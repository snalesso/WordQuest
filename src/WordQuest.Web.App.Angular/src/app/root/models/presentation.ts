import { Data } from '@angular/router';
// import { Language, ISelectable } from 'src/app/root/models/core';

// export const getUnicodeFlag = (lang: Language): string | null => {
//     switch (lang) {
//         case Language.Italian:
//             return "🇮🇹";
//         case Language.English:
//             return "🇬🇧";
//         case Language.Spanish:
//             return "🇪🇸";
//         case Language.French:
//             return "🇫🇷";
//         case Language.German:
//             return "🇩🇪";
//         default:
//             return null;
//     }
// };

// export interface ISelectOption<T> extends ISelectable<T> {
//     label: string;
// }

export interface RouteData extends Data {
    UI: {
        // navbar?: {
        //     isVisible?: boolean,
        //     labelKey?: string
        // },
        pageTitleKey?: string;
    };
}