import { createWebHashHistory, createRouter } from 'vue-router'
import PageLayaut from '../Pages/PageLayaut'
import StartPage from '../Pages/StartPage'
import MainPage from '../Pages/MainPage'
import ExerciseLibrary from '../Pages/ExerciseLibrary'
import CreateWorkoutPage from '../Pages/CreateWorkoutPage'
import WorkoutsLibrary from '../Pages/WorkoutsLibrary'
import WorkoutPlayer from '../Pages/WorkoutPlayer'
import HistoryPage from '../Pages/HistoryPage'
import TodayPage from '../Pages/TodayPage'
import SecondaryPageLayaut from '../Pages/SecondaryPageLayaut'



const routes = [
    {
        path: '/main',
        name: 'LayautPage',
        component: PageLayaut,
        children: [
            {
                path: '',
                name: 'MainPage',
                component: MainPage,
                children: [
                    {
                        path: '/exercises',
                        name: 'ExerciseLibrary',
                        component: ExerciseLibrary,
                    },
                    {
                        path: '/workouts',
                        name: 'WorkoutsLibrary',
                        component: WorkoutsLibrary
                        ,
                    },
                ]
            },
        ]
    },
    {
        path: '/create',
        name: 'SecondaryPageLayaut',
        component: SecondaryPageLayaut,
        children: [
            {
                path: '/create-workout',
                name: 'CreateWorkoutPage',
                component: CreateWorkoutPage,
            },
            {
                path: '/history',
                name: 'HistoryPage',
                component: HistoryPage,
            },
            {
                path: '/today',
                name: 'TodayPge',
                component: TodayPage,
            },
        ]
    },
    {
        path: '/',
        name: 'StartPage',
        component: StartPage,
    },
    {
        path: '/workout-player',
        name: 'workoutPlayer',
        component: WorkoutPlayer,
    },
]


const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
})

export default router;