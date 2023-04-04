<template>
	<section
		class="shedule-modal__wrapper"
		@click="
			(e) =>
				e.target.classList.contains('shedule-modal__wrapper')
					? setISOpenModal(fasle)
					: ''
		"
		v-show="isModalOpen"
	>
		<div class="shedule-modal">
			<div class="container">
				<div class="shedule-modal__inner">
					<h2 class="shedule-modal__title">Choose Workout</h2>
					<div class="shedule-modal__list">
						<div
							class="shedule-modal__item"
							v-for="(workout, idx) in workoutsLibrary"
							:key="idx"
							@click="checkedWorkout(workout.id)"
							:class="workout.checked === true ? 'checked' : ''"
						>
							<h3 class="shedule-modal__item-name">
								{{ workout.name }}
							</h3>
						</div>
					</div>
					<div class="shedule-modal__save-btn">
						<button class="big-red-btn" @click="sheduleWorkout()">
							Shedule
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>


<script>
	import { mapActions, mapMutations, mapState } from "vuex";
	export default {
		created() {
			const workouts = JSON.parse(localStorage.getItem("WorkoutsLibrary"));
			if (workouts != null) {
				this.setWorkoutsLibrary(workouts);
			}
		},

		methods: {
			...mapMutations({
				setWorkoutsLibrary: "calendar/setWorkoutsLibrary",
				setIsModalOpen: "calendar/setIsModalOpen",
			}),
			...mapActions({
				checkedWorkout: "calendar/checkedWorkout",
				sheduleWorkout: "calendar/sheduleWorkout",
			}),
		},
		computed: {
			...mapState({
				workoutsLibrary: (state) => state.calendar.workoutsLibrary,
				isModalOpen: (state) => state.calendar.isModalOpen,
			}),
		},
	};
</script>