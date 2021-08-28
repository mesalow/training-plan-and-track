# training-plan-and-track
## Basis stack
The backend for this app should consist of a node.js-server written in typescript and a sqlite db for persistence.

Frontend should be a vue.js spa. Probably gonna start with a console api and do the frontend later in a separate project.

## Main Use Cases
Since we are implementing the training program "Jacked 'n Tan 2.0" for a start, the program itself will be hardcoded into the app. Can be made dynamic later to support different program.

The plan consists of a weekly progression between 4 training days. Each training day consists of several exercises, which should be performed for a certain amount of sets, where each set should be performed for a certain amount of repetitions (reps) and a certain weight. Progression over the weeks consists in increasing the weight but reducing the reps performed. This progression can be based on max effort attempts earlier in the day or on percentages of a chosen "Training Max" for a certain exercise.
E.g.: Week 1, Day 1, Exercise 1 is the Squat. The program calls for a 10RM (Rep Max) effort for the first set and then 3 sets of 6 reps at a certain percentage of the TM (Training Max). On Week 2, Reps decrease (8RM first set, 3x5 for a higher perc of TM). 
For exercises later in the program, there are different progression schemes, e.g.: find your 15RM and then do 3 sets with max reps with the same weight. Or: Do 4 sets of 10 reps minimum. 

* Plugin your chosen exercises, Training Maxes and progression schemes for each (you are free to a certain degree which exercise should get which progression scheme)
* App should generate a plan for a periodization period (6 or 12 weeks) with a detailed view for each day + the exerciese, see above
* App should allow you to input for each exercise the chosen weight (since for some ex the weight will only be determined on this day) and the reps completed. Number of sets will be determined in the plan, for some exercises, the weight will also be determined in the plan. For each day, there should be other fields like body weight, perceived performance ability and so on.
* Maybe implement some QoL features like a timer for rest periods or similar 
* App should save old, completed training plans with all the data
* Ideally, the app should allow for a certain reporting ability, that is, track progression of certain exercises over time, show Rep Maxes etc.

## API Design
- createNewPlan(name: string, startDay: Date, weekNumber: Number, config: PlanInput) 
  - PlanInput: array of 4 days, each day is an array of exerciseConfigs, with certain constraints
  - PlanInputExerciseConfig: { name: string, progressionType: ProgressionType, ?TM: Number }
- getPlan(name, startDay): Plan 
- inputExercise() // unclear: better to update only the set or the whole exercise?
