<template>
	<form class="add-exercises">
		<div v-show="isAddWindowActive" class="add-exercises__window">
			<input
				v-model="updateName"
				placeholder="Exercises name"
				class="add-exercises__input-name"
				type="text"
			/>
			<select
				class="add-exercises__select"
				name="muscle group"
				v-model="updateMuscleGroupSelect"
			>
				<option disabled selected>muscle group</option>
				<option v-for="muscle in muscleGrups" :key="muscle">
					{{ muscle }}
				</option>
			</select>
			<select
				class="add-exercises__select"
				name="equipment"
				v-model="updateEquipmentSelect"
			>
				<option disabled selected>equipment</option>
				<option v-for="el in equipment" :key="el">
					{{ el }}
				</option>
			</select>
		</div>
		<button
			@click="
				isAddWindowActive ? addExercises() : openAddExercisesWindow()
			"
			type="button"
			class="add-exercises__btn"
		>
			add exercises
		</button>
	</form>
</template>

<script>
	import { mapActions, mapMutations, mapState } from "vuex";
	export default {
		created() {
			const exerciseLibrary = JSON.parse(
				localStorage.getItem("ExercisesLibrary")
			);
			if (exerciseLibrary != null) {
				this.setExercisesLibrary(exerciseLibrary);
			}
		},
		mounted() {
			this.$store.watch(
				(state) => state.exercises.exercises,
				() => {
					localStorage.setItem(
						"ExercisesLibrary",
						JSON.stringify(this.exercises)
					);
				}
			);
		},
		methods: {
			...mapMutations({
				setExercisesName: "exercises/setExercisesName",
				setExercises: "exercises/setExercises",
				setMuscleGroupSelect: "exercises/setMuscleGroupSelect",
				setEquipmentSelect: "exercises/setEquipmentSelect",
				setExercisesLibrary: "exercises/setExercisesLibrary",
			}),
			...mapActions({
				openAddExercisesWindow: "exercises/openAddExercisesWindow",
				addExercises: "exercises/addExercises",
			}),
		},
		computed: {
			...mapState({
				exercisesName: (state) => state.exercises.exercisesName,
				isAddWindowActive: (state) => state.exercises.isAddWindowActive,
				muscleGrups: (state) => state.exercises.muscleGrups,
				equipment: (state) => state.exercises.equipment,
				muscleGroupSelect: (state) => state.exercises.muscleGroupSelect,
				equipmentSelect: (state) => state.exercises.equipmentSelect,
				exercises: (state) => state.exercises.exercises,
			}),
			updateName: {
				get() {
					return this.exercisesName;
				},
				set(value) {
					this.setExercisesName(value);
				},
			},
			updateMuscleGroupSelect: {
				get() {
					return this.muscleGroupSelect;
				},
				set(value) {
					this.setMuscleGroupSelect(value);
				},
			},
			updateEquipmentSelect: {
				get() {
					return this.equipmentSelect;
				},
				set(value) {
					this.setEquipmentSelect(value);
				},
			},
		},
	};
</script>