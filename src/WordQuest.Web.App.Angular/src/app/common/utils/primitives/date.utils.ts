import { endOfMonth, startOfDay, startOfMonth } from 'date-fns';

export type TrimestreNumber = 1 | 2 | 3 | 4;
export type SemestreNumber = 1 | 2;

export interface Trimestre {
  readonly number: TrimestreNumber;
  readonly startDate: Date;
  readonly endDate: Date;
}
export interface Semestre {
  readonly number: SemestreNumber;
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
    startDate: startOfDay(startOfMonth(s)),
    endDate: startOfDay(endOfMonth(e))
  };
}

export function getSemestre(year: number, semestreNumber: SemestreNumber): Semestre {

  if (!Number.isInteger(year))
    throw new Error("Year must be an integer number");

  const s = new Date();
  s.setFullYear(year);
  s.setMonth((semestreNumber - 1) * 6);
  const e = new Date();
  e.setFullYear(year);
  e.setMonth((semestreNumber * 6) - 1);

  return {
    number: semestreNumber,
    startDate: startOfDay(startOfMonth(s)),
    endDate: startOfDay(endOfMonth(e))
  };
}

export function getTrimestri(year: number): Trimestre[] {
  return [getTrimestre(year, 1), getTrimestre(year, 2), getTrimestre(year, 3), getTrimestre(year, 4)];
}

export function getSemestri(year: number): Semestre[] {
  return [getSemestre(year, 1), getSemestre(year, 2)];
}

export function getSemestreByDate(date: Date): Semestre {
  const sem: SemestreNumber = date.getMonth() <= 6 ? 1 : 2;
  return {
    number: sem,
    startDate: startOfDay(startOfMonth(new Date(date.getFullYear(), sem - 1))),
    endDate: startOfDay(endOfMonth(new Date(date.getFullYear(), (sem * 6) - 1))),
  };
}

export const MIN_MSSQLS_DATE = new Date(1753, 1, 1);