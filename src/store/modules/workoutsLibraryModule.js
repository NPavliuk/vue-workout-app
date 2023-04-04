export const workoutsLibraryModule = {
    state: () => ({
        workoutsLibrary: [
            {
                id: 1634824550000,
                name: "Default 2 | Short",
                body: [{
                    id: 111111,
                    sets: 1,
                    exercises: [{
                        checked: true,
                        equipment: "No Equipment",
                        id: 0.5227780638051926,
                        muscleGrup: "Whole Body",
                        name: "Plank",
                        reps: 1,
                        rest: 5,
                        showInfo: false,
                    }]
                },
                {
                    id: 1634824539000,
                    sets: 2,
                    exercises: [{
                        checked: true,
                        equipment: "No Equipment",
                        id: 0.4533568232404712,
                        muscleGrup: "Chest & Triceps",
                        name: "Diamonds push ups",
                        reps: 1,
                        rest: 5,
                        showInfo: false
                    }]
                }]

            },
            {
                id: 1635154270000,
                name: "Simple Workout | Whole Body",
                body: [
                    {
                        id: 111111,
                        sets: 2,
                        exercises: [
                            {
                                checked: true,
                                equipment: "No Equipment",
                                id: 0.9514083421640276,
                                muscleGrup: "Chest & Triceps",
                                name: "Push ups",
                                reps: 10,
                                rest: 60,
                                showInfo: false,
                            },
                            {
                                checked: true,
                                equipment: "No Equipment",
                                id: 0.3625399561026037,
                                muscleGrup: "Whole Body",
                                name: "Jumps",
                                reps: 10,
                                rest: 60,
                                showInfo: false,
                            }
                        ]
                    },
                    {
                        id: 1635154193000,
                        sets: 3,
                        exercises: [
                            {
                                checked: true,
                                equipment: "No Equipment",
                                id: 0.06816118401025717,
                                muscleGrup: "Whole Body",
                                name: "Pull ups",
                                reps: 10,
                                rest: 60,
                                showInfo: false,
                            },
                            {
                                checked: true,
                                equipment: "No Equipment",
                                id: 0.13665300704364758,
                                muscleGrup: "Whole Body",
                                name: "Jumps",
                                reps: 10,
                                rest: 60,
                                showInfo: false,
                            },
                            {
                                checked: true,
                                equipment: "No Equipment",
                                id: 0.5356406191283485,
                                muscleGrup: "Whole Body",
                                name: "Plank",
                                reps: 10,
                                rest: 60,
                                showInfo: false,
                            }
                        ]
                    }
                ]
            }
        ],
        checkedWorkout: null,
        isCheckedWorkout: false,
        isWorkoutStart: false,

    }),
    mutations: {
        setWorkoutsLibrary(state, workoutsLibrary) {
            state.workoutsLibrary = workoutsLibrary
        },
        setCheckedWorkout(state, checkedWorkout) {
            state.checkedWorkout = checkedWorkout;
        },
        setIsCheckedWorkout(state, isCheckedWorkout) {
            state.isCheckedWorkout = isCheckedWorkout;
        },
        setIsWorkoutStart(state, isWorkoutStart) {
            state.isWorkoutStart = isWorkoutStart;
        }
    },
    actions: {
        removeWorkout({ state, commit }, workoutId) {
            let res = state.workoutsLibrary;
            res = res.filter(wk => wk.id != workoutId);

            commit('setWorkoutsLibrary', res);
        },

        updateCheckedWorkout({ state, commit }, checkedId) {
            let res = state.workoutsLibrary;
            res = res.filter(wk => wk.id === checkedId);

            commit('setCheckedWorkout', res[0]);
        },
        startWorkout({ commit }) {

            commit('setIsCheckedWorkout', false);
            commit('setIsWorkoutStart', true);
        }
    },
    namespaced: true
}