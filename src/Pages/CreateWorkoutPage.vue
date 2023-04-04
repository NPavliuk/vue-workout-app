<template>
	<section class="c-workout">
		<div class="c-workout__name">
			<input
				v-model="updateWorkoutName"
				type="text"
				placeholder="Enter workout name"
			/>
		</div>

		<create-workout-round />

		<button class="c-workout__add-round" @click="setNewRound">
			Add Round
		</button>

		<router-link
			class="big-red-btn c-workout__save-btn"
			:class="workoutName === '' && rounds.length > 0 ? 'disabled' : ''"
			@click="saveWorkout"
			:to="{ path: '/main' }"
		>
			Save Workout
		</router-link>

		<create-workout-exercise-modal v-show="isOpenModal" />
	</section>
</template>

<script>
	import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
	import CreateWorkoutRound from "../components/CreateWorkoutRound.vue";
	import CreateWorkoutExerciseModal from "../components/CreateWorkoutExerciseModal.vue";

	export default {
		state: () => ({}),
		components: {
			CreateWorkoutRound,
			CreateWorkoutExerciseModal,
		},
		created() {
			this.setWorkoutName("");
			this.setRounds([
				{
					id: 111111,
					exercises: [],
					sets: 1,
				},
			]);
			const workouts = JSON.parse(localStorage.getItem("WorkoutsLibrary"));
			if (workouts != null) {
				this.loadWorkouts(workouts);
			}
		},
		mounted() {
			this.$store.watch(
				(state) => state.workout.workouts,
				() => {
					localStorage.setItem(
						"WorkoutsLibrary",
						JSON.stringify(this.workouts)
					);
				}
			);
		},
		computed: {
			...mapState({
				workoutName: (state) => state.workout.workoutName,
				isOpenModal: (state) => state.workout.isOpenModal,
				rounds: (state) => state.workout.rounds,
				workouts: (state) => state.workout.workouts,
			}),
			...mapGetters({}),

			updateWorkoutName: {
				get() {
					return this.workoutName;
				},
				set(value) {
					this.setWorkoutName(value);
				},
			},
		},
		methods: {
			...mapMutations({
				setWorkoutName: "workout/setWorkoutName",
				setNewRound: "workout/setNewRound",
				setRounds: "workout/setRounds",
				loadWorkouts: "workout/loadWorkouts",
			}),
			...mapActions({
				addRound: "workout/addRound",
				saveWorkout: "workout/saveWorkout",
			}),
		},
	};
</script>