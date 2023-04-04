<template>
	<section class="shedule" v-if="checkedDate">
		<div class="shedule__title">
			Shedule on
			{{
				`${new Date(checkedDate).getDate()} ${new Date(
					checkedDate
				).toLocaleDateString("en-EN", { month: "long" })}`
			}}
		</div>
		<div class="shedule__list">
			<span
				v-if="
					getCheckedDaySheduledWorkouts === undefined ||
					getCheckedDaySheduledWorkouts.length === 0
				"
				class="sheduled-clear"
			>
				not anything sheduled yet
			</span>

			<div
				class="shedule-item"
				v-for="(workout, index) in getCheckedDaySheduledWorkouts"
				:key="index"
			>
				<div class="shedule-item__name">{{ workout.name }}</div>
				<!-- <div class="shedule-item__time">12:00</div> -->
				<div class="shedule-item__nav">
					<router-link
						@click="sheduleWorkoutStart(workout)"
						class="shedule-item__start"
						:to="{ path: '/workouts' }"
					>
						Start
					</router-link>
					<button
						class="shedule-item__remove"
						@click="removeFromShedule(index)"
					>
						Remove
					</button>
				</div>
			</div>
		</div>

		<button class="shedule__btn big-red-btn" @click="setIsModalOpen(true)">
			Shedule Workout
		</button>
	</section>
</template>


<script>
	import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
	export default {
		methods: {
			...mapMutations({
				setIsModalOpen: "calendar/setIsModalOpen",
				setIsCheckedWorkout: "workoutsLibrary/setIsCheckedWorkout",
				setCheckedWorkout: "workoutsLibrary/setCheckedWorkout",
				setWorkoutToStart: "calendar/setWorkoutToStart",
				setCheckedDate: "calendar/setCheckedDate",
			}),
			...mapActions({
				removeFromShedule: "calendar/removeFromShedule",
				sheduleWorkoutStart: "calendar/sheduleWorkoutStart",
			}),
		},
		mounted() {
			this.$store.watch(
				(state) => state.calendar.sheduledWorkouts,
				() => {
					localStorage.setItem(
						"SheduledWorkouts",
						JSON.stringify(this.sheduledWorkouts)
					);
				}
			);
		},
		computed: {
			...mapState({
				checkedDate: (state) => state.calendar.checkedDate,
				sheduledWorkouts: (state) => state.calendar.sheduledWorkouts,
			}),
			...mapGetters({
				getCheckedDaySheduledWorkouts:
					"calendar/getCheckedDaySheduledWorkouts",
			}),
		},
		beforeUnmount() {
			localStorage.setItem(
				"SheduledWorkouts",
				JSON.stringify(this.sheduledWorkouts)
			);

			this.setCheckedDate(null);
		},
	};
</script>