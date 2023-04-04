<template>
	<div
		class="c-workout__round round warm-up"
		v-for="(round, index) in rounds"
		:key="index"
	>
		<div class="round__name">
			<div
				class="round__delete-btn round-button"
				@click="removeRound(round.id)"
			>
				<span></span>
			</div>
			<div class="round__title">
				{{ index == 0 ? "Warm-up" : `Round ${index}` }}
			</div>
		</div>

		<div class="round-counter">
			<div
				class="round-cunter__btn round-button"
				@click="decrementSets(round.id)"
			>
				-
			</div>
			<div class="round-control__count">
				{{ round.sets }}
				<span>set</span>
			</div>
			<div
				class="round-cunter__btn round-button"
				@click="incrementSets(round.id)"
			>
				+
			</div>
		</div>

		<div class="round__exercises">
			<div class="round__list">
				<div
					v-for="(ex, idx) in round.exercises"
					:key="idx"
					class="round__list-item"
				>
					<div class="round-list__head">
						<button
							@click="removeExerciseFromRound([round.id, ex.id])"
							class="round__list-remove round-button"
						>
							<span></span>
						</button>
						<div class="round__list-name">{{ ex.name }}</div>
					</div>

					<div class="round-list__counter-wrapper">
						<div class="round__list-counter">
							<span>Reps:</span
							><input
								class="round__list-input"
								type="number"
								:value="ex.reps"
								@input="
									(e) =>
										addRepsToExercise([
											round.id,
											ex.id,
											e.target.value,
										])
								"
							/>
						</div>
						<div class="round__list-counter">
							<span>Rest:</span
							><input
								class="round__list-input"
								type="number"
								:value="ex.rest"
								@input="
									(e) =>
										addRestToExercise([
											round.id,
											ex.id,
											e.target.value,
										])
								"
							/>
						</div>
					</div>
					<div class="round__list-block">
						<span>{{ ex.muscleGrup }}</span>
						<span>{{ ex.equipment }}</span>
					</div>
				</div>
			</div>
			<button class="round__add-exercise" @click="openModal(round.id)">
				+ Add Exercise
			</button>
		</div>
	</div>
</template>


<script>
	import { mapActions, mapMutations, mapState } from "vuex";

	export default {
		created() {
			const exerciseLibrary = JSON.parse(
				localStorage.getItem("ExercisesLibrary")
			);
			this.setExercises(exerciseLibrary);
		},
		computed: {
			...mapState({
				rounds: (state) => state.workout.rounds,
				isOpenModal: (state) => state.workout.isOpenModal,
			}),
		},
		methods: {
			...mapMutations({
				setExercises: "workout/setExercises",
				setOpenModal: "workout/setOpenModal",
				setCurentRound: "workout/setCurentRound",
			}),
			...mapActions({
				removeRound: "workout/removeRound",
				incrementSets: "workout/incrementSets",
				decrementSets: "workout/decrementSets",
				openModal: "workout/openModal",
				removeExerciseFromRound: "workout/removeExerciseFromRound",
				addRepsToExercise: "workout/addRepsToExercise",
				addRestToExercise: "workout/addRestToExercise",
			}),
		},
	};
</script>