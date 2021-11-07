export class JackednTan2 {
  constructor() {}

  getExpectedSets(
    weekNumber: number,
    progressionType: string,
    tm: number
  ): ExpectedSet[] {
    if (weekNumber > 6 || weekNumber < 1) {
      throw new Error("no definition for weeks larger than 6");
    }
    switch (progressionType) {
      case "T1":
        return T1(weekNumber, tm);
      case "T2a":
        return T2a(weekNumber, tm);
      case "T2b":
        return T2b(weekNumber, tm);
      case "T3":
        return T2b(weekNumber, tm);
      default:
        return [];
    }
  }
}

function T1(weekNumber: number, tm: number): ExpectedSet[] {
  const progressionTable = [0.7, 0.75, 0.8, 0.825, 0.85]; // progressions should be varied depending on ex, maybe use different progression type? T1 lower and T1 upper?
  const repTable = [10, 8, 6, 4, 2, 1];
  const set1Reps = repTable[weekNumber - 1];
  const firstSet: ExpectedSet = { weight: "RM", reps: set1Reps };
  const backOffRepTable = [6, 5, 4, 3, 2];
  const currentFactor = progressionTable[weekNumber - 1];
  const currentReps = backOffRepTable[weekNumber - 1];
  const weight = tm * currentFactor;

  if (weekNumber === 6) {
    return [firstSet];
  }
  const straightSets =
    weekNumber === 5
      ? times({ weight, reps: currentReps }, 3)
      : times({ weight, reps: currentReps }, 2);
  return [firstSet, ...straightSets, { weight, reps: "MR" }];
}

function T2a(weekNumber, tm): ExpectedSet[] {
  if (weekNumber === 6) {
    return [];
  }
  const repTable = [10, 8, 6, 4, 2];
  const progressionTable = [0.65, 0.7, 0.75, 0.8, 0.85];
  const numberOfSets = weekNumber === 5 ? 7 : weekNumber === 4 ? 5 : 4;
  const weight = progressionTable[weekNumber - 1] * tm;
  const reps = repTable[weekNumber - 1];
  return times({ weight, reps }, numberOfSets);
}
function T2b(weekNumber, tm): ExpectedSet[] {
  if (weekNumber === 6) {
    return [];
  }
  const repTable = [15, 12, 10, 8, 6];
  const weight = "Set1";
  const reps = repTable[weekNumber - 1];
  return [{ weight, reps }, ...times({ weight, reps: "MR" } as ExpectedSet, 3)];
}

function T3(weekNumber, tm) {
  if (weekNumber === 6) {
    return [];
  }
  const repTable = [20, 18, 16, 14, 12];
  const reps = repTable[weekNumber - 1];
  return [{ weight: "RM", reps }, ...times({ weight: "Set1", reps: "MR" }, 4)];
}

function times<T>(element: T, number): T[] {
  return Array(number).fill(element);
}
export type ExpectedSet =
  | RepMaxSet
  | StraightSet
  | MaxRepSet
  | FoundWeightStraightSet
  | FoundWeightAndMaxRepSet;

interface RepMaxSet {
  weight: "RM";
  reps: number;
}

interface StraightSet {
  weight: number;
  reps: number;
}

interface MaxRepSet {
  weight: number;
  reps: "MR";
}
interface FoundWeightStraightSet {
  weight: "Set1";
  reps: number;
}

interface FoundWeightAndMaxRepSet {
  weight: "Set1";
  reps: "MR";
}
