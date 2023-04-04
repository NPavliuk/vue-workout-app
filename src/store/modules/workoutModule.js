
export const workoutModule = {
    state: () => ({
        workoutName: '',
        workouts: [],
        exercises: [],
        curentRound: null,
        isOpenModal: false,
        rounds: [],
    }),
    mutations: {
        setWorkoutName(state, workoutName) {
            state.workoutName = workoutName;
        },
        setNewRound(state) {
            const newRound = {
                id: Date.parse(new Date()),
                exercises: [],
                sets: 1,
            }

            state.rounds = [...state.rounds, newRound];
        },
        setRounds(state, rounds) {
            state.rounds = rounds;
        },
        setOpenModal(state, isOpenModal) {
            state.isOpenModal = isOpenModal;
        },
        setCurentRound(state, curentRound) {
            state.curentRound = curentRound;
        },
        setExercises(state, exercises) {
            state.exercises = exercises;
        },
        setWorkouts(state, workouts) {
            state.workouts = [workouts, ...state.workouts];
        },
        loadWorkouts(state, workouts) {
            state.workouts = workouts
        }

    },
    getters: {
        checkedExercises(state) {
            let exercises = state.exercises.filter(ex => ex.checked === true);
            const res = [];

            exercises.forEach(ex => {
                let newEx = JSON.parse(JSON.stringify(ex));

                newEx.id = Math.random();
                newEx.reps = 10;
                newEx.rest = 60;

                res.push(newEx);
            })
            return res;
        }
    },
    actions: {
        removeRound({ state, commit }, roundToRemove) {
            const result = state.rounds.filter(r => r.id != roundToRemove);

            commit('setRounds', result);
        },
        incrementSets({ state, commit }, roundId) {
            let res = state.rounds;
            res.map(r => {
                if (r.id === roundId) {
                    r.sets += 1;
                }
            })

            commit('setRounds', res);
        },
        decrementSets({ state, commit }, roundId) {
            let res = state.rounds;
            res.map(r => {
                if (r.id === roundId && r.sets >= 2) {
                    r.sets -= 1;
                }
            })

            commit('setRounds', res);
        },
        chooseExercise({ state, commit }, elementToChoose) {
            let res = state.exercises;
            res.map(ex => {
                if (ex.id === elementToChoose) {
                    if (ex.checked === false) {
                        ex.checked = true;
                    } else {
                        ex.checked = false;
                    }
                }
            })

            commit('setExercises', res);
        },
        addToRound({ getters, commit, state }) {
            const res = state.rounds;

            res.map(r => {
                if (r.id === state.curentRound) {
                    if (r.exercises.length != 0) {
                        r.exercises = [...r.exercises, ...getters.checkedExercises]
                    } else {
                        r.exercises = [...getters.checkedExercises];
                    }
                }
            })

            let ex = state.exercises;
            ex.map(el => el.checked = false);

            commit('setRounds', res);
            commit('setExercises', ex);
            commit('setOpenModal', false);
        },

        openModal({ commit }, roundId) {
            commit('setCurentRound', roundId)
            commit('setOpenModal', true)
        },

        removeExerciseFromRound({ state, commit }, [curentRound, exerciseToRemove]) {
            let res = state.rounds;
            res.map(r => {
                if (r.id === curentRound) {
                    r.exercises = r.exercises.filter(ex => ex.id != exerciseToRemove);
                }
            })
            commit('setRounds', res);
        },

        addRepsToExercise({ state, commit }, [roundId, exId, value]) {
            let res = state.rounds;
            res.map(r => {
                if (r.id === roundId) {
                    r.exercises.map(ex => {
                        if (ex.id === exId) {
                            ex.reps = parseInt(value);
                        }
                    });
                }
            })

            commit('setRounds', res);
        },

        addRestToExercise({ state, commit }, [roundId, exId, value]) {
            let res = state.rounds;
            res.map(r => {
                if (r.id === roundId) {
                    r.exercises.map(ex => {
                        if (ex.id === exId) {
                            ex.rest = parseInt(value);
                        }
                    });
                }
            })

            commit('setRounds', res);
        },
        saveWorkout({ state, commit }) {
            const workout = {
                id: Date.parse(new Date()),
                name: state.workoutName,
                body: state.rounds
            }

            commit('setWorkouts', workout);
        },
    },
    namespaced: true,
}