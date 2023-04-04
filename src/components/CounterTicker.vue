<template>
	<div class="counter">
		<span>{{ counter }}</span>
	</div>
</template>

<script>
	import { mapActions, mapMutations, mapState } from "vuex";
	export default {
		mounted() {
			let interval = setInterval(() => {
				this.counterStep();
				if (this.counter === 0) {
					this.nextExercise();
					this.setRunCounter(false);
					clearInterval(interval);
				} else if (this.runCounter === false) {
					clearInterval(interval);
				}
			}, 1000);
		},

		computed: {
			...mapState({
				counter: (state) => state.workoutPlayer.counter,
				runCounter: (state) => state.workoutPlayer.runCounter,
			}),
		},
		methods: {
			...mapMutations({
				setRunCounter: "workoutPlayer/setRunCounter",
				setCounter: "workoutPlayer/setCounter",
			}),
			...mapActions({
				nextExercise: "workoutPlayer/nextExercise",
				counterStep: "workoutPlayer/counterStep",
			}),
		},
	};
</script>