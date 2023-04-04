<template>
	<section class="exercises block-style">
		<h2 class="section__title">Exercises Library</h2>
		<add-exercises-form />
		<ul class="exercises__list">
			<li
				class="exercises__list-item"
				v-for="exercise in exercises"
				:key="exercise.id"
				@click="
					!exercise.showInfo
						? (exercise.showInfo = true)
						: (exercise.showInfo = false)
				"
			>
				<span class="exercises__name">{{ exercise.name }}</span>
				<button
					class="exercises__delete-btn round-button"
					@click="deleteExercise(exercise.id)"
				>
					<trash-icon class="exercises__delete-btn-icon" />
				</button>

				<div class="exercise__info" v-show="exercise.showInfo">
					<div class="exercise__info-item">
						<span>Muscle group </span>{{ exercise.muscleGrup }}
					</div>
					<div class="exercise__info-item">
						<span>Equipment </span>{{ exercise.equipment }}
					</div>
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
	import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
	import AddExercisesForm from "../components/AddExercisesForm.vue";
	import TrashIcon from "../components/componentsIcons/TrashIcon.vue";

	export default {
		components: {
			AddExercisesForm,
			TrashIcon,
		},
		methods: {
			...mapMutations({}),
			...mapActions({
				deleteExercise: "exercises/deleteExercise",
			}),
		},
		computed: {
			...mapGetters({}),
			...mapState({
				exercises: (state) => state.exercises.exercises,
			}),
		},
	};
</script>