<template>
	<section
		class="c-workout__mod-wrapper"
		@click="
			(e) =>
				e.target.classList.contains('c-workout__mod-wrapper')
					? setOpenModal(fasle)
					: ''
		"
	>
		<div class="c-workout__mod-exercises">
			<div class="container">
				<h2 class="mod-exercises__title">Choose Exercises</h2>
				<div class="mod-exercises__list">
					<div
						class="mod-exercise__item"
						v-for="ex in exercises"
						:key="ex.id"
						:class="ex.checked === true ? 'checked' : ''"
						@click="chooseExercise(ex.id)"
					>
						<div class="mod-exercise__name">{{ ex.name }}</div>
						<div class="mod-exercise__item-block">
							{{ ex.muscleGrup }}
						</div>
						<div class="mod-exercise__item-block">
							{{ ex.equipment }}
						</div>
					</div>
				</div>
				<div class="mod-exercise__add-wrapper">
					<button
						type="button"
						@click="addToRound"
						class="mod-exercise__add big-red-btn"
					>
						Add Exercise
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapActions, mapMutations, mapState } from "vuex";
	export default {
		computed: {
			...mapState({
				exercises: (state) => state.workout.exercises,
			}),
		},
		methods: {
			...mapActions({
				chooseExercise: "workout/chooseExercise",
				addToRound: "workout/addToRound",
			}),
			...mapMutations({
				setOpenModal: "workout/setOpenModal",
			}),
		},
	};
</script>