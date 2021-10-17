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
* it would be good to have sensible invariants, e.g. only one T1 exercise per day -> these invariants need to be kept server and client side -> do this later
### training day
* for each training day we need the following data: per exercise: actual weight and actual reps per set, also we should display the expected weight / rep targets 
* input with a basic number input field for all the sets of an exercise, then a submit button to save the values
* we should also support super sets ? maybe later

