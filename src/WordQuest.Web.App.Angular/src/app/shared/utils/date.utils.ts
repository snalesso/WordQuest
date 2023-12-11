import { endOfMonth, startOfMonth } from 'date-fns';

export type TrimestreNumber = 1 | 2 | 3 | 4;

export interface Trimestre {
  readonly number: TrimestreNumber;
  readonly startDate: Date;
  readonly endDate: Date;
}

export function getTrimestre(year: number, trimestre: TrimestreNumber): Trimestre {

  if (!Number.isInteger(year))
    throw new Error("Year must be an integer number");

  const s = new Date();
  s.setFullYear(year);
  s.setMonth((trimestre - 1) * 3);
  const e = new Date();
  e.setFullYear(year);
  e.setMonth((trimestre * 3) - 1);

  return {
    number: trimestre,
    startDate: startOfMonth(s),
    endDate: endOfMonth(e)
  };
}

export function getTrimestri(year: number): Trimestre[] {
  return [getTrimestre(year, 1), getTrimestre(year, 2), getTrimestre(year, 3), getTrimestre(year, 4)];
}

export const MIN_MSSQLS_DATE = new Date(1753, 1, 1);