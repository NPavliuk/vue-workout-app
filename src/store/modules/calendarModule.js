export const calendarModule = {
    state: () => ({
        currentDate: 0,
        changingDate: 0,
        currentMonth: 0,
        checkedDate: null,
        currentYear: 0,
        days: [],
        week: [
            "Monday",
            "Tueasday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
        workoutToStart: null,
        isModalOpen: false,
        workoutsLibrary: [],
        sheduledWorkouts: {},
        windowWidth: null,
    }),
    mutations: {
        setWindowWidth(state, windowWidth) {
            state.windowWidth = windowWidth;
        },
        setCurrentDate(state, currentDate) {
            state.currentDate = currentDate;
        },
        setCurrentMonth(state, currentMonth) {
            state.currentMonth = currentMonth;
        },
        setCurrentYear(state, currentYear) {
            state.currentYear = currentYear;
        },
        setChangingDate(state, changingDate) {
            state.changingDate = changingDate;
        },
        setDays(state, days) {
            state.days = days;
        },
        setCheckedDate(state, checkedDate) {
            state.checkedDate = checkedDate;
        },
        setWorkoutsLibrary(state, workoutsLibrary) {
            state.workoutsLibrary = workoutsLibrary;
        },
        setIsModalOpen(state, isModalOpen) {
            state.isModalOpen = isModalOpen;
        },
        setSheduledWorkouts(state, sheduledWorkouts) {
            state.sheduledWorkouts = sheduledWorkouts;
        },
        setWorkoutToStart(state, workoutToStart) {
            state.workoutToStart = workoutToStart;
        }
    },
    getters: {
        getDaysOfMonth(state) {
            return new Date(state.changingDate.getFullYear(), state.changingDate.getMonth() + 1, 0).getDate();
        },
        getFirstMonthDay(state) {
            return new Date(
                state.changingDate.getFullYear(),
                state.changingDate.getMonth(),
                1
            ).getUTCDay();
        },
        getDays(state) {
            return state.days.map(date => {
                if (date != undefined) {
                    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                }
            })
        },
        getCurrenDate(state) {
            return `${state.currentDate.getFullYear()}-${state.currentDate.getMonth() + 1}-${state.currentDate.getDate()}`
        },
        getMonthIndex(state) {
            return state.changingDate.getMonth();
        },
        getMonthTitle(state, getters) {
            const d = new Date(2021, getters.getMonthIndex, 1);
            return d.toLocaleDateString("en-EN", { month: "long" });
        },
        getCheckedDaySheduledWorkouts(state) {
            let res = state.sheduledWorkouts;
            let date = state.checkedDate;
            if (date in res) {
                return res[date]
            }
        },
        getTodaySheduled(state, getters) {
            let res = state.sheduledWorkouts;
            let date = getters.getCurrenDate;

            if (date in res) {
                return res[date]
            }
        }
    },

    actions: {
        nextMonth({ state, commit }) {
            const date = new Date(state.changingDate);
            date.setMonth(date.getMonth() + 1);
            commit('setChangingDate', date);
        },
        prevMonth({ state, commit }) {
            const date = new Date(state.changingDate);
            date.setMonth(date.getMonth() - 1);
            commit('setChangingDate', date);
        },
        addDays({ state, commit, getters }) {
            const daysArray = [];
            for (
                let i = getters.getFirstMonthDay;
                i < getters.getDaysOfMonth + getters.getFirstMonthDay;
                i++
            ) {
                daysArray[i] =
                    new Date(state.changingDate.getFullYear(), state.changingDate.getMonth(), i + 1 - getters.getFirstMonthDay);

            }
            commit('setDays', daysArray);
        },

        checkedWorkout({ state, commit }, workoutID) {
            let workouts = state.workoutsLibrary;
            workouts.map(w => {
                if (w.id === workoutID) {
                    if (!w.checked || w.checked === false) {
                        w.checked = true
                    } else {
                        w.checked = false
                    }
                }
            })

            commit('setWorkoutsLibrary', workouts)
        },

        sheduleWorkout({ state, commit }) {
            let checkedWorkouts = state.workoutsLibrary;
            checkedWorkouts = checkedWorkouts.filter(w => w.checked === true);
            const sheduledDate = state.checkedDate;
            let sw = new Object;
            sw = state.sheduledWorkouts;

            if (sheduledDate in sw) {
                sw[sheduledDate] = [...sw[sheduledDate], ...checkedWorkouts]
            } else {
                sw[sheduledDate] = checkedWorkouts;
            }

            let workouts = state.workoutsLibrary;
            workouts.map(w => w.checked = false)

            commit('setWorkoutsLibrary', workouts)
            commit('setIsModalOpen', false)
            commit('setSheduledWorkouts', sw)
        },

        removeFromShedule({ state, getters, commit }, workoutIDX) {
            let res = getters.getCheckedDaySheduledWorkouts;
            res = res.filter(el => res.indexOf(el) != workoutIDX);

            let sheduled = state.sheduledWorkouts;
            if (state.checkedDate in sheduled) {
                sheduled[state.checkedDate] = res;
            }

            commit('setSheduledWorkouts', sheduled)
        },

        sheduleWorkoutStart({ state, commit }, workout) {
            workout.sheduled = state.checkedDate;

            commit('setWorkoutToStart', workout)
        }
    },
    namespaced: true,
}