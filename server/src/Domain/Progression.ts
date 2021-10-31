import { ExpectedSet, JackednTan2 } from "./Program/JackednTan2";

import { domainDebug as debug } from "../Helpers/debuggers";
import { ExerciseDTO } from "../Infrastructure/PlanRepository";
import { ActualSetDTO } from "../Infrastructure/TrainingRepository";

interface PlannedDayDTO {
  dayNumber: number;
  exercises: ExerciseDTO[];
}

interface ActualDay {
  dayNumber: number;
  exercises: ActualExercise[];
}

interface ActualExercise {
  name: string;
  progression: progression;
  tm: number | null;
  id: number;
  sets: MaybeDoneSet[];
}
type progression = "T1" | "T2a" | "T2b" | "T3";
type MaybeDoneSet = NotDoneYetSet | ActualSet;

interface NotDoneYetSet {
  weight: null;
  reps: null;
  expected: ExpectedSet;
}

export interface ActualSet {
  weight: number;
  reps: number;
  expected: ExpectedSet;
}
const trainingModel = new JackednTan2();

export const getProgress = (
  completePlan: PlannedDayDTO[],
  allActualSets: ActualSetDTO[]
): { weekNumber: number; days: ActualDay[] }[] => {
  const weeks = [1, 2, 3, 4, 5, 6];
  return weeks.map((weekNumber) => {
    const weekExercises = completePlan.map((day) => {
      const { dayNumber, exercises } = day;
      const getActualExercise = getActualExerciseFactory(allActualSets)(weekNumber)(dayNumber);
      const expectedSetsForDay = exercises.map((ex) => getActualExercise(ex));
      return {
        dayNumber,
        exercises: expectedSetsForDay as ActualExercise[],
      };
    });
    return {
      weekNumber,
      days: weekExercises,
    };
  });
};

const getActualExerciseFactory =
  (allActualSets) => (weekNumber) => (dayNumber) => (ex: ExerciseDTO) => {
    const actualSetsForExercise = allActualSets.filter((actualSet) => {
      return (
        actualSet.week === weekNumber &&
        actualSet.day === dayNumber &&
        actualSet.ex_ex_id === ex.id
      );
    });
    debug("TrainingController, actualSets found: %o", actualSetsForExercise);
    const expectedSets = trainingModel.getExpectedSets(
      weekNumber,
      ex.progression as progression,
      ex.tm
    );
    const sets = expectedSets.map((expectedSet, idx) => {
      let weight = null;
      let reps = null;
      const actualSet = actualSetsForExercise.find(actualSet => actualSet.set_number === idx+1);;
      if (actualSet) {
        weight = actualSet.weight;
        reps = actualSet.reps;
      }
      return {
        expected: expectedSet,
        weight,
        reps,
      };
    });
    return {
      ...ex,
      sets,
    };
  };
