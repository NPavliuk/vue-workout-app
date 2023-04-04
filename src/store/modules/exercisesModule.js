export const exercisesModule = {
    state: () => ({
        muscleGrups: ['Back', 'Biceps', 'Chest', 'Triceps', 'Shoulders', 'Abs', 'Legs', 'Whole Body', 'Chest & Bisceps', 'Chest & Triceps', "Chest & Abs", "Chest & Shoulders", 'Back & Biceps', 'Back & Triceps', 'Back & Shoulders', 'Biceps & Triceps', 'Biceps & Shoulders', 'Triceps & Shoulders', 'Legs & ABS',],
        equipment: ['No Equipment', 'Dumbbells', 'Box', 'Bench', 'Chair', 'Horizontal bar', 'Bars', 'Damn', 'Rubber band', 'Vest'],

        exercisesName: "",
        muscleGroupSelect: 'muscle group',
        equipmentSelect: 'equipment',

        isAddWindowActive: false,
        exercises: [{
            id: 1,
            name: 'Push ups',
            muscleGrup: 'Chest & Triceps',
            equipment: 'No Equipment',
            showInfo: false,
            checked: false,
        },
        {
            id: 2,
            name: 'Plank',
            muscleGrup: 'Whole Body',
            equipment: 'No Equipment',
            showInfo: false,
            checked: false,
        },
        {
            id: 3,
            name: 'Pull ups',
            muscleGrup: 'Whole Body',
            equipment: 'No Equipment',
            showInfo: false,
            checked: false,
        },
        {
            id: 4,
            name: 'Jumps',
            muscleGrup: 'Whole Body',
            equipment: 'No Equipment',
            showInfo: false,
            checked: false,
        },
        {
            id: 5,
            name: 'Squats',
            muscleGrup: 'Legs',
            equipment: 'No Equipment',
            showInfo: false,
            checked: false,
        }],
    }),
    mutations: {
        setMuscleGroupSelect(state, muscleGroupSelect) {
            state.muscleGroupSelect = muscleGroupSelect;
        },
        setEquipmentSelect(state, equipmentSelect) {
            state.equipmentSelect = equipmentSelect;
        },
        setExercisesName(state, exercisesName) {
            state.exercisesName = exercisesName;
        },
        setAddWindowActive(state, isAddWindowActive) {
            state.isAddWindowActive = isAddWindowActive;
        },
        setExercises(state, exercises) {
            state.exercises = [exercises, ...state.exercises];
        },
        setExercisesLibrary(state, exercisesLibrary) {
            state.exercises = exercisesLibrary;
        }
    },
    getters: {
    },
    actions: {
        openAddExercisesWindow({ state, commit }) {
            if (!state.isAddWindowActive) {
                commit('setAddWindowActive', true);
            } else {
                commit('setAddWindowActive', false);
            }
        },
        addExercises({ state, commit }) {
            if (state.exercisesName != '' && state.muscleGroupSelect != 'muscle group' && state.equipmentSelect != 'equipment') {
                let exercise = {
                    id: Date.parse(new Date()),
                    name: state.exercisesName,
                    muscleGrup: state.muscleGroupSelect,
                    equipment: state.equipmentSelect,
                    showInfo: false,
                    checked: false,
                }

                commit('setExercises', exercise);
                commit('setAddWindowActive', false);
                commit('setExercisesName', '');
                commit('setEquipmentSelect', 'equipment');
                commit('setMuscleGroupSelect', 'muscle group');
            } else {
                alert('Please fill in the blanks');
            }

        },
        deleteExercise({ state, commit }, elementToDelete) {
            const filtredArray = state.exercises.filter(ex => ex.id != elementToDelete);
            commit('setExercisesLibrary', filtredArray);
        },

    },
    namespaced: true,
}