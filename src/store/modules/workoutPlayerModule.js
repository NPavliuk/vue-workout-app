export const workoutPlayerModule = {
    state: () => ({
        currentWorkout: null,
        currentExercise: 0,
        compleatedWorkouts: [],
        counter: null,
        runCounter: false,
        minutes: 0,
        seconds: 0,
        hours: 0,
        workoutName: '',
        isTimerActive: false,
        ifSheduled: null,
        sheduledWorkouts: null,
    }),
    mutations: {
        setWorkoutName(state, workoutName) {
            state.workoutName = workoutName;
        },
        setCompleatedWorkouts(state, compleatedWorkouts) {
            if (state.compleatedWorkouts === []) {
                state.compleatedWorkouts = [compleatedWorkouts]
            } else {
                state.compleatedWorkouts = [compleatedWorkouts, ...state.compleatedWorkouts];
            }
        },
        setCurrentWorkout(state, currentWorkout) {
            state.currentWorkout = currentWorkout;
        },
        setCurrentExercise(state, currentExercise) {
            state.currentExercise = currentExercise;
        },
        setCounter(state, counter) {
            state.counter = counter;
        },
        setRunCounter(state, runCounter) {
            state.runCounter = runCounter;
        },
        setMinutes(state, minutes) {
            state.minutes = minutes;
        },
        setSeconds(state, seconds) {
            state.seconds = seconds;
        },
        setHours(state, hours) {
            state.hours = hours;
        },
        setIfSheduled(state, ifSheduled) {
            state.ifSheduled = ifSheduled;
        },
        setIsTimerActive(state, isTimerActive) {
            state.isTimerActive = isTimerActive;
        },
        loadCompleatedWorkouts(state, compleatedWorkouts) {
            state.compleatedWorkouts = compleatedWorkouts;
        },
        setSheduledWorkouts(state, sheduledWorkouts) {
            state.sheduledWorkouts = sheduledWorkouts;
        }
    },
    getters: {
        calcCounterStep(state) {
            return state.counter - 1;
        },
        exerciseOnly(state) {
            return state.currentWorkout.filter(ex => !ex.action);
        },
        progress(state) {
            let exercise = state.currentWorkout.filter(ex => !ex.action);
            const exNumber = exercise.length;
            exercise = exercise.filter(el => el.doneReps);
            const compleatedExNumber = exercise.length;
            return Math.floor((compleatedExNumber / exNumber) * 100);

        }
    },
    actions: {
        createWorkoutPlan({ commit }, workout) {
            const newArr = [];
            const workoutBody = workout.body;
            for (let i = 0; i < workoutBody.length; i++) {
                const sets = workoutBody[i].sets;
                let exercises = workoutBody[i].exercises;
                for (let j = 0; j < sets; j++) {
                    for (let k = 0; k < exercises.length; k++) {
                        exercises[k].checked = false;
                        const el = { ...exercises[k] }
                        newArr.push(el)
                    }
                    if (j < sets - 1) {
                        newArr.push({ action: `Set ${j + 1} compleated`, rest: 60 })
                    }
                }
                if (i === 0) {
                    newArr.push({ action: 'finish warm-up', rest: 120 })
                } else if (i === workoutBody.length - 1) {
                    newArr.push({ action: 'Workout compleated' })
                } else {
                    newArr.push({ action: `Round ${i} compleated`, rest: 120 })
                }
            }

            commit('setWorkoutName', workout.name)
            commit('setCurrentWorkout', newArr);
        },
        updateExerciseChecked({ state, commit }, checkedExerciseIdx) {
            let res = state.currentWorkout;
            res.map(ex => {
                if (res.indexOf(ex) === checkedExerciseIdx) {
                    ex.checked = true
                }
            })

            commit('setCurrentWorkout', res);
        },
        nextExercise({ state, commit }) {
            let exerciseIndex = state.currentExercise;
            exerciseIndex += 1;

            let res = state.currentWorkout;
            res.map(ex => ex.checked ? ex.checked = false : '')

            commit('setCurrentWorkout', res);
            commit('setCurrentExercise', exerciseIndex);
        },
        counterStep({ getters, commit }) {
            let c = getters.calcCounterStep;

            commit('setCounter', c);
            if (c === 0) {
                commit('setRunCounter', false)
            }
        },
        setCounterValue({ state, commit }, exerciseIdx) {
            let w = state.currentWorkout;

            w.map(ex => {
                if (w.indexOf(ex) === exerciseIdx) {
                    commit('setCounter', ex.rest)
                }
            })

            commit('setRunCounter', true)
        },
        addDoneRepsToExercise({ state, commit }, [exerciseIdx, repsCount]) {
            let w = state.currentWorkout;

            w.map(ex => {
                if (w.indexOf(ex) === exerciseIdx) {
                    ex.doneReps = repsCount;
                }
            })

            commit('setCurrentWorkout', w);
        },

        saveResult({ state, getters, commit }) {
            let res = {
                date: new Date(),
                time: `${state.minutes}min ${state.seconds}s`,
                body: getters.exerciseOnly,
                name: state.workoutName,
                checked: false,
                progress: getters.progress,
            }

            if (state.ifSheduled) {
                let sheduled = state.sheduledWorkouts;
                let wS = state.ifSheduled;
                if (wS in sheduled) {
                    sheduled[wS] = sheduled[wS].filter(el => el.name != state.workoutName)
                }
                commit('setSheduledWorkouts', sheduled);
            }

            commit('setCompleatedWorkouts', res)
        },

        timer({ state, commit }) {
            let s = state.seconds;
            s += 1;
            commit('setSeconds', s)
            if (s === 60) {
                let m = state.minutes;
                m += 1;
                commit('setMinutes', m)
                commit('setSeconds', 0)

                if (m === 60) {
                    let h = state.hours;
                    h += 1;

                    commit('setHours', h)
                    commit('setMinutes', 0)
                    commit('setSeconds', 0)
                }
            }
        }

    },
    namespaced: true
}