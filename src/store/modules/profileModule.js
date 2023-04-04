export const profileModule = {
    state: () => ({
        historyWorkouts: [],
        curentDate: null,
    }),
    mutations: {
        setHistoryWorkouts(state, historyWorkouts) {
            state.historyWorkouts = historyWorkouts;
        },
        setCurentDate(state, curentDate) {
            state.curentDate = curentDate;
        },
    },
    getters: {
        getHistoryToday(state) {
            let wk = state.historyWorkouts;
            let date = `${state.curentDate.getFullYear()}-${state.curentDate.getMonth() + 1}-${state.curentDate.getDate()}`;

            wk = wk.filter(el => el.date.split('T')[0] === date);

            return wk;
        }
    },
    actions: {
        showInfo({ state, commit }, exDate) {
            let res = state.historyWorkouts;
            res.map(workout => {
                if (workout.date === exDate && workout.checked === false) {
                    workout.checked = true;
                } else {
                    workout.checked = false;
                }
            })
            commit('setHistoryWorkouts', res)
        }
    },
    namespaced: true,
}