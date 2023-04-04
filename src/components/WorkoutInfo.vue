<template>
	<div class="workout-info" v-if="isCheckedWorkout">
		<div class="workout-info__list">
			<div
				class="workout-info__round"
				v-for="(round, index) in checkedWorkout.body"
				:key="index"
			>
				<div class="workout-info__round-name">
					{{
						checkedWorkout.body.indexOf(round) === 0
							? "Warm-up"
							: `Round ${checkedWorkout.body.indexOf(round)}`
					}}
				</div>
				<div class="workout-info__round-sets">
					Sets {{ round.sets }}
				</div>
				<div class="workout-info__exercises-wrapper">
					<div
						class="workout-info__exercises"
						v-for="(ex, index) in round.exercises"
						:key="index"
					>
						<div class="workout-info__exercises-name">
							{{ ex.name }}
						</div>
						<div class="workout-info__exercises-reps">
							Reps: <span>{{ ex.reps }}</span>
						</div>
						<div class="workout-info__exercises-rest">
							Rest: <span>{{ ex.rest }}</span>
						</div>
						<div class="workout-info__exercises-equip">
							<span>{{ ex.equipment }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<router-link
			:to="{ path: '/workout-player' }"
			class="big-red-btn workout-info__start-btn"
			>Start Workout</router-link
		>
	</div>
</template>


<script>
	import { mapState } from "vuex";
	export default {
		computed: {
			...mapState({
				checkedWorkout: (state) => state.workoutsLibrary.checkedWorkout,
				isCheckedWorkout: (state) => state.workoutsLibrary.isCheckedWorkout,
			}),
		},
	};
</script>