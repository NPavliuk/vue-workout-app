<template>
	<section class="main-library">
		<router-link
			:to="{ path: '/exercises' }"
			class="main-library__btn"
			active-class="main-library__btn-active"
		>
			<exercises-icon class="main-library__icon" />
			<span class="main-library__text">Exercises</span>
		</router-link>
		<router-link
			type="button"
			class="main-library__btn"
			active-class="main-library__btn-active"
			:to="{ path: '/workouts' }"
		>
			<workout-icon class="main-library__icon" />
			<span class="main-library__text">Workouts</span>
		</router-link>
	</section>
	<div class="bottom-wrapper">
		<router-view />
	</div>
</template>

<script>
	import WorkoutIcon from "../components/componentsIcons/WorkoutIcon.vue";
	import ExercisesIcon from "../components/componentsIcons/ExercisesIcon.vue";

	export default {
		components: {
			WorkoutIcon,
			ExercisesIcon,
		},
		created() {
			if (!localStorage.getItem("ExercisesLibrary")) {
				localStorage.setItem(
					"ExercisesLibrary",
					JSON.stringify(this.$store.state.exercises.exercises)
				);
				console.log(1);
			}
			if (!localStorage.getItem("WorkoutsLibrary")) {
				localStorage.setItem(
					"WorkoutsLibrary",
					JSON.stringify(
						this.$store.state.workoutsLibrary.workoutsLibrary
					)
				);
				console.log(2);
			}
		},
	};
</script>