<template>
	<div class="workout-player__wrapper">
		<workout-timer />
		<div
			class="workout-player"
			v-for="(el, idx) in currentWorkout"
			:key="idx"
			v-show="idx === currentExercise"
		>
			<div class="container">
				<div
					class="workout-player__inner"
					v-if="!el.checked && !el.action"
				>
					<div class="workout-player__video">No Video Yet</div>
					<div class="workout-player__name">
						{{ el.name }}
					</div>
					<div v-if="el.reps != null" class="workout-player__need">
						<span> Need reps</span>
						{{ el.reps }}
					</div>
					<div class="workout-player__done">
						<span>Done reps</span>
						<input
							v-if="el.reps != null"
							placeholder="Done reps"
							:value="el.doneReps"
							@input="
								(e) =>
									addDoneRepsToExercise([idx, e.target.value])
							"
						/>
					</div>
				</div>
				<div
					v-if="el.checked && !el.action"
					class="workout-plyer__rest"
				>
					<div class="workout-plyer__rest-name">
						Rest: {{ el.rest }} sec
					</div>

					<counter-ticker />
				</div>
				<div class="workout-player__end-screen" v-if="el.action">
					{{ el.action }}
				</div>
				<button
					v-if="!el.checked && !el.action"
					class="big-red-btn workout-plyer__btn"
					:class="
						!el.doneReps || el.doneReps === '' ? 'disabled' : ''
					"
					@click="updateExerciseChecked(idx), setCounterValue(idx)"
				>
					compleated
				</button>
				<button
					class="big-red-btn workout-plyer__btn"
					v-if="
						el.checked ||
						el.action ||
						!el.rest ||
						idx === currentWorkout.length - 2
					"
					@click="nextExercise(), setRunCounter(false)"
				>
					{{
						idx === currentWorkout.length - 2
							? "compleated"
							: "continue"
					}}
				</button>
				<router-link
					class="big-red-btn workout-plyer__btn"
					@click="setIsTimerActive(false), saveResult()"
					v-if="el.action === 'Workout compleated'"
					:to="{ path: '/main' }"
				>
					Finish Workout
				</router-link>
				<router-link
					v-if="!el.action && el.checked != true"
					class="workout-plyer__btn-ended"
					@click="setIsTimerActive(false), saveResult()"
					:to="{ path: '/main' }"
				>
					Finish Workout Yet
				</router-link>
			</div>
		</div>
	</div>
</template>


<script>
	import { mapActions, mapMutations, mapState } from "vuex";
	import WorkoutTimer from "../components/WorkoutTimer.vue";
	import CounterTicker from "../components/CounterTicker.vue";
	export default {
		components: {
			WorkoutTimer,
			CounterTicker,
		},

		created() {
			this.createWorkoutPlan(this.checkedWorkout);
			this.setCurrentExercise(0);

			if (this.checkedWorkout.sheduled) {
				this.setIfSheduled(this.checkedWorkout.sheduled);
			}

			const workouts = JSON.parse(
				localStorage.getItem("CompleatedWorkoutsLibrary")
			);
			if (workouts != null) {
				this.loadCompleatedWorkouts(workouts);
			}

			const sheduled = JSON.parse(localStorage.getItem("SheduledWorkouts"));
			if (sheduled != null) {
				this.setSheduledWorkouts(sheduled);
			}
		},

		mounted() {
			this.$store.watch(
				(state) => state.workoutPlayer.compleatedWorkouts,
				() => {
					localStorage.setItem(
						"CompleatedWorkoutsLibrary",
						JSON.stringify(this.compleatedWorkouts)
					);
				}
			);
		},

		beforeUnmount() {
			localStorage.setItem(
				"SheduledWorkouts",
				JSON.stringify(this.sheduledWorkouts)
			);
		},

		computed: {
			...mapState({
				compleatedWorkouts: (state) =>
					state.workoutPlayer.compleatedWorkouts,
				checkedWorkout: (state) => state.workoutsLibrary.checkedWorkout,
				currentExercise: (state) => state.workoutPlayer.currentExercise,
				currentWorkout: (state) => state.workoutPlayer.currentWorkout,
				sheduledWorkouts: (state) => state.workoutPlayer.sheduledWorkouts,
			}),
		},
		methods: {
			...mapMutations({
				setCurrentExercise: "workoutPlayer/setCurrentExercise",
				setIsTimerActive: "workoutPlayer/setIsTimerActive",
				setCompleatedWorkouts: "workoutPlayer/setCompleatedWorkouts",
				setRunCounter: "workoutPlayer/setRunCounter",
				setCurrentWorkoutTime: "workoutPlayer/setCurrentWorkoutTime",
				loadCompleatedWorkouts: "workoutPlayer/loadCompleatedWorkouts",
				setIfSheduled: "workoutPlayer/setIfSheduled",
				setSheduledWorkouts: "workoutPlayer/setSheduledWorkouts",
			}),
			...mapActions({
				createWorkoutPlan: "workoutPlayer/createWorkoutPlan",
				updateExerciseChecked: "workoutPlayer/updateExerciseChecked",
				nextExercise: "workoutPlayer/nextExercise",
				setCounterValue: "workoutPlayer/setCounterValue",
				addDoneRepsToExercise: "workoutPlayer/addDoneRepsToExercise",
				saveResult: "workoutPlayer/saveResult",
			}),
		},
	};
</script>