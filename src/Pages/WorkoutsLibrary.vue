<template>
	<section class="workouts block-style">
		<h2 class="section__title">
			{{ isCheckedWorkout ? checkedWorkout.name : "Workouts Library" }}
		</h2>
		<div class="workouts__list" v-show="!isCheckedWorkout">
			<div
				v-if="!workoutsLibrary || workoutsLibrary.length === 0"
				class="workouts__no-workouts"
			>
				No workouts Yet
			</div>
			<div
				class="workouts__item"
				v-for="(workout, idx) in workoutsLibrary"
				:key="idx"
				@click="
					updateCheckedWorkout(workout.id), setIsCheckedWorkout(true)
				"
			>
				<div class="workouts__name">{{ workout.name }}</div>
				<button
					class="workouts__delete-btn round-button"
					@click="removeWorkout(workout.id)"
				>
					<trash-icon class="exercises__delete-btn-icon" />
				</button>
			</div>
		</div>
		<workout-info />
	</section>
</template>

<script>
	import { mapActions, mapMutations, mapState } from "vuex";
	import TrashIcon from "../components/componentsIcons/TrashIcon.vue";
	import WorkoutInfo from "../components/WorkoutInfo.vue";

	export default {
		components: {
			TrashIcon,
			WorkoutInfo,
		},
		created() {
			const workouts = JSON.parse(localStorage.getItem("WorkoutsLibrary"));
			if (workouts != null) {
				this.setWorkoutsLibrary(workouts);
			}
			if (!this.workoutToStart) {
				this.setIsCheckedWorkout(false);
				this.setCheckedWorkout(null);
			} else {
				this.setIsCheckedWorkout(true);

				this.setCheckedWorkout(this.workoutToStart);
				this.setWorkoutToStart(null);
			}
		},
		mounted() {
			this.$store.watch(
				(state) => state.workoutsLibrary.workoutsLibrary,
				() => {
					localStorage.setItem(
						"WorkoutsLibrary",
						JSON.stringify(this.workoutsLibrary)
					);
				}
			);
		},
		computed: {
			...mapState({
				workoutsLibrary: (state) => state.workoutsLibrary.workoutsLibrary,
				checkedWorkout: (state) => state.workoutsLibrary.checkedWorkout,
				isCheckedWorkout: (state) => state.workoutsLibrary.isCheckedWorkout,
				workoutToStart: (state) => state.calendar.workoutToStart,
			}),
		},
		methods: {
			...mapMutations({
				setWorkoutsLibrary: "workoutsLibrary/setWorkoutsLibrary",
				setIsCheckedWorkout: "workoutsLibrary/setIsCheckedWorkout",
				setCheckedWorkout: "workoutsLibrary/setCheckedWorkout",
				setWorkoutToStart: "calendar/setWorkoutToStart",
			}),
			...mapActions({
				removeWorkout: "workoutsLibrary/removeWorkout",
				updateCheckedWorkout: "workoutsLibrary/updateCheckedWorkout",
			}),
		},
	};
</script>