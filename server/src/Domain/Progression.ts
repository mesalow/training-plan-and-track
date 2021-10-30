import { JackednTan2 } from "./Program/JackednTan2";

import { domainDebug as debug } from "../Helpers/debuggers";
import { ExerciseDTO } from "../Infrastructure/PlanRepository";
import { ActualSetDTO } from "../Infrastructure/TrainingRepository";

interface PlannedDayDTO {
    dayNumber: number,
    exercises: ExerciseDTO[],
}

export const getProgress = (completePlan: PlannedDayDTO[], allActualSets: ActualSetDTO[]) => {
  const trainingModel = new JackednTan2();
  const weeks = [1, 2, 3, 4, 5, 6];
  return weeks.map((weekNumber) => {
    const weekExercises = completePlan.map((day) => {
      const { dayNumber, exercises } = day;
      const expectedSets = exercises.map((ex) => {
        const actualSetsForExercise = allActualSets.filter((actualSet) => {
          return (
            actualSet.week === weekNumber &&
            actualSet.day === dayNumber &&
            actualSet.ex_ex_id === ex.id
          );
        });
        debug(
          "TrainingController, actualSets found: %o",
          actualSetsForExercise
        );
        const expectedSets = trainingModel.getExpectedSets(
          weekNumber,
          ex.progression,
          ex.tm
        );
        const sets = expectedSets.map((expectedSet, idx) => {
          let weight = null;
          let reps = null;
          const actualSet = actualSetsForExercise[idx];
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
      });
      return {
        dayNumber,
        exercises: expectedSets,
      };
    });
    return {
      weekNumber,
      days: weekExercises,
    };
  });
};
