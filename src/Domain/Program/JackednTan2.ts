export class JackednTan2 {
  constructor() {}

  getExpectedSets(weekNumber, progressionType, tm): ExpectedSet[] {
    switch (progressionType) {
      case "T1":
        return T1(weekNumber, tm);
        break;
      default:
        return [];
    }
  }
}

function T1(weekNumber, tm): ExpectedSet[] {
  const progressionTable = [0.7, 0.75, 0.8, 0.825, 0.85];
  const repTable = [10, 8, 6, 4, 2, 1];
  const set1Reps = repTable[weekNumber - 1];
  const firstSet: ExpectedSet = { weight: "RM", reps: set1Reps };
  const backOffRepTable = [6, 5, 4, 3, 2];
  const currentFactor = progressionTable[weekNumber - 1];
  const currentReps = backOffRepTable[weekNumber - 1];
  const weight = tm * currentFactor;
  if (weekNumber < 5) {
    return [
      firstSet,
      { weight, reps: currentReps },
      { weight, reps: currentReps },
      { weight, reps: "MR" },
    ];
  } else if (weekNumber < 6) {
    return [
      firstSet,
      { weight, reps: currentReps },
      { weight, reps: currentReps },
      { weight, reps: currentReps },
      { weight, reps: "MR" },
    ];
  } else if (weekNumber === 6) {
    return [firstSet];
  } else {
    throw new Error("no definition for weeks larger than 6");
  }
}

export type ExpectedSet = RepMaxSet | StraightSet | MaxRepSet;

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
