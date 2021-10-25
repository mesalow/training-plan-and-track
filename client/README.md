# training-app-and-track-client

## Basic frontend layout
We need the following pages:
* Start with Navigation
* create new plan -> fill in all the exercises for all the days, later: choose your program first (for now: only jnt)
* continue training -> go the next day in your current plan and fill out the exercises
* show plan -> overview over your current plan with all days and weeks (later: visualisation etc) and also with an "edit" link to each day, so that you can "skip" days and go right to the day you want

## Input elements
### create new plan
* we need a kind of template structure with modifiable presets
* this means for our jnt: 4 days with a list of exercises, each exercise needs to fill out exerciseName / progression / tm 
* it would be good to have sensible invariants, e.g. only one T1 exercise per day -> these invariants need to be kept server and client side -> IMPROV: do this later
### start a plan
* there should be an overview of all the plans, maybe add a status field (completed, planned, dropped etc) to distinguish between active and inactive
* there should only be one active plan possible
* switching to the input side of the plan should look like this: a full layout of all training weeks and days with info which training day is "completed" and which not -> this can be calculated from the actual sets of this plan OR we can represent a training day / training exercise with an extra entity (and persist it as such); the later would have the advantage that we could say: ok, I only did 3 sets instead of 4, but thats ok for today - alternatively, in the former approach, we could persist "dud" sets, that means sets not done, so we can always be sure that only one training day / exercise is the current one -> IMPROV: do this later, for now assume, that all sets are done always
* again, switching from the planOverview (all days in all weeks) to the trainingDayOverview we can see all the planned exercises with recommend reps / weights (if applicable) and also the actual sets, we may already have entered -> how to display that? 
*  
* clicking on a exercise, we would get to another view where the actual sets can be submitted (either all in one or one after another), there we can do a "next" to the next exercise or even the next training day / alternative: we do the input on the trainingDayOverview directly? -> try this one
### training day
* for each training day we need the following data: per exercise: actual weight and actual reps per set, also we should display the expected weight / rep targets 
* input with a basic number input field for all the sets of an exercise, then a submit button to save the values
* we should also support super sets ? maybe later

