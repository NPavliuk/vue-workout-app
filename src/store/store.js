import { createStore } from "vuex";
import { calendarModule } from "./modules/calendarModule.js";
import { exercisesModule } from "./modules/exercisesModule.js";
import { workoutModule } from "./modules/workoutModule.js";
import { workoutsLibraryModule } from './modules/workoutsLibraryModule.js'
import { workoutPlayerModule } from './modules/workoutPlayerModule.js'
import { profileModule } from "./modules/profileModule.js";

export default createStore({
    modules: {
        calendar: calendarModule,
        exercises: exercisesModule,
        workout: workoutModule,
        workoutsLibrary: workoutsLibraryModule,
        workoutPlayer: workoutPlayerModule,
        profile: profileModule
    }
})