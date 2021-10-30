import "mocha";
import { assert } from "chai";

import { getProgress } from "./Progression";
import { ExpectedSet, JackednTan2 } from "./Program/JackednTan2";
import { ActualSetDTO } from "../Infrastructure/TrainingRepository";

describe("getProgress", () => {
  it("should get just the expected if no actual sets done", () => {
    const completePlan = [
      {
        dayNumber: 1,
        exercises: [
          { name: "High Bar Squat", progression: "T1", tm: 120, id: 1 },
        ],
      },
    ];
    const actualSets = [];
    const result = getProgress(completePlan, actualSets);
    assert.deepEqual(result[0], {
      weekNumber: 1,
      days: [
        {
          dayNumber: 1,
          exercises: [
            {
              name: "High Bar Squat",
              progression: "T1",
              tm: 120,
              id: 1,
              sets: [
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 10, weight: "RM" } as ExpectedSet,
                },
                { weight: null, reps: null, expected: { reps: 6, weight: 84 } },
                { weight: null, reps: null, expected: { reps: 6, weight: 84 } },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: "MR", weight: 84 },
                },
              ],
            },
          ],
        },
      ],
    });
    assert.deepEqual(result[1], {
      weekNumber: 2,
      days: [
        {
          dayNumber: 1,
          exercises: [
            {
              name: "High Bar Squat",
              progression: "T1",
              tm: 120,
              id: 1,
              sets: [
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 8, weight: "RM" } as ExpectedSet,
                },
                { weight: null, reps: null, expected: { reps: 5, weight: 90 } },
                { weight: null, reps: null, expected: { reps: 5, weight: 90 } },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: "MR", weight: 90 },
                },
              ],
            },
          ],
        },
      ],
    });
    assert.deepEqual(result[2], {
      weekNumber: 3,
      days: [
        {
          dayNumber: 1,
          exercises: [
            {
              name: "High Bar Squat",
              progression: "T1",
              tm: 120,
              id: 1,
              sets: [
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 6, weight: "RM" } as ExpectedSet,
                },
                { weight: null, reps: null, expected: { reps: 4, weight: 96 } },
                { weight: null, reps: null, expected: { reps: 4, weight: 96 } },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: "MR", weight: 96 },
                },
              ],
            },
          ],
        },
      ],
    });
    assert.deepEqual(result[3], {
      weekNumber: 4,
      days: [
        {
          dayNumber: 1,
          exercises: [
            {
              name: "High Bar Squat",
              progression: "T1",
              tm: 120,
              id: 1,
              sets: [
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 4, weight: "RM" } as ExpectedSet,
                },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 3, weight: 99 },
                },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 3, weight: 99 },
                },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: "MR", weight: 99 },
                },
              ],
            },
          ],
        },
      ],
    });
    assert.deepEqual(result[4], {
      weekNumber: 5,
      days: [
        {
          dayNumber: 1,
          exercises: [
            {
              name: "High Bar Squat",
              progression: "T1",
              tm: 120,
              id: 1,
              sets: [
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 2, weight: "RM" } as ExpectedSet,
                },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 2, weight: 102 },
                },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 2, weight: 102 },
                },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 2, weight: 102 },
                },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: "MR", weight: 102 },
                },
              ],
            },
          ],
        },
      ],
    });
    assert.deepEqual(result[5], {
      weekNumber: 6,
      days: [
        {
          dayNumber: 1,
          exercises: [
            {
              name: "High Bar Squat",
              progression: "T1",
              tm: 120,
              id: 1,
              sets: [
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 1, weight: "RM" } as ExpectedSet,
                },
              ],
            },
          ],
        },
      ],
    });
  });
  it("should fill exercises with actual sets", () => {
    const completePlan = [
      {
        dayNumber: 1,
        exercises: [
          { name: "High Bar Squat", progression: "T1", tm: 120, id: 1 },
        ],
      },
    ];
    const actualSets: ActualSetDTO[] = [
      {
        pl_pl_id: 7,
        ex_ex_id: 1,
        actual_set_id: 1,
        week: 1,
        day: 1,
        weight: 95,
        reps: 10,
        set_number: 1,
      },
      {
        pl_pl_id: 7,
        ex_ex_id: 1,
        actual_set_id: 1,
        week: 1,
        day: 1,
        weight: 85,
        reps: 6,
        set_number: 2,
      },
    ];
    const result = getProgress(completePlan, actualSets);
    assert.deepEqual(result[0], {
      weekNumber: 1,
      days: [
        {
          dayNumber: 1,
          exercises: [
            {
              name: "High Bar Squat",
              progression: "T1",
              tm: 120,
              id: 1,
              sets: [
                {
                  weight: 95,
                  reps: 10,
                  expected: { reps: 10, weight: "RM" } as ExpectedSet,
                },
                { weight: 85, reps: 6, expected: { reps: 6, weight: 84 } },
                { weight: null, reps: null, expected: { reps: 6, weight: 84 } },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: "MR", weight: 84 },
                },
              ],
            },
          ],
        },
      ],
    });
    assert.deepEqual(result[1], {
      weekNumber: 2,
      days: [
        {
          dayNumber: 1,
          exercises: [
            {
              name: "High Bar Squat",
              progression: "T1",
              tm: 120,
              id: 1,
              sets: [
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 8, weight: "RM" } as ExpectedSet,
                },
                { weight: null, reps: null, expected: { reps: 5, weight: 90 } },
                { weight: null, reps: null, expected: { reps: 5, weight: 90 } },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: "MR", weight: 90 },
                },
              ],
            },
          ],
        },
      ],
    });
    assert.deepEqual(result[2], {
      weekNumber: 3,
      days: [
        {
          dayNumber: 1,
          exercises: [
            {
              name: "High Bar Squat",
              progression: "T1",
              tm: 120,
              id: 1,
              sets: [
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 6, weight: "RM" } as ExpectedSet,
                },
                { weight: null, reps: null, expected: { reps: 4, weight: 96 } },
                { weight: null, reps: null, expected: { reps: 4, weight: 96 } },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: "MR", weight: 96 },
                },
              ],
            },
          ],
        },
      ],
    });
    assert.deepEqual(result[3], {
      weekNumber: 4,
      days: [
        {
          dayNumber: 1,
          exercises: [
            {
              name: "High Bar Squat",
              progression: "T1",
              tm: 120,
              id: 1,
              sets: [
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 4, weight: "RM" } as ExpectedSet,
                },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 3, weight: 99 },
                },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 3, weight: 99 },
                },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: "MR", weight: 99 },
                },
              ],
            },
          ],
        },
      ],
    });
    assert.deepEqual(result[4], {
      weekNumber: 5,
      days: [
        {
          dayNumber: 1,
          exercises: [
            {
              name: "High Bar Squat",
              progression: "T1",
              tm: 120,
              id: 1,
              sets: [
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 2, weight: "RM" } as ExpectedSet,
                },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 2, weight: 102 },
                },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 2, weight: 102 },
                },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 2, weight: 102 },
                },
                {
                  weight: null,
                  reps: null,
                  expected: { reps: "MR", weight: 102 },
                },
              ],
            },
          ],
        },
      ],
    });
    assert.deepEqual(result[5], {
      weekNumber: 6,
      days: [
        {
          dayNumber: 1,
          exercises: [
            {
              name: "High Bar Squat",
              progression: "T1",
              tm: 120,
              id: 1,
              sets: [
                {
                  weight: null,
                  reps: null,
                  expected: { reps: 1, weight: "RM" } as ExpectedSet,
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
