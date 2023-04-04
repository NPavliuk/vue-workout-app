<template>
	<div class="workout-player__time">
		<span>{{ 10 > minutes ? `0${minutes}` : minutes }}</span> :
		<span>{{ 10 > seconds ? `0${seconds}` : seconds }}</span>
	</div>
</template>

<script>
	import { mapActions, mapMutations, mapState } from "vuex";
	export default {
		mounted() {
			this.setIsTimerActive(true);
			let interval = setInterval(() => {
				this.timer();
				if (this.isTimerActive === false) {
					clearInterval(interval);
				}
			}, 1000);
		},
		computed: {
			...mapState({
				isTimerActive: (state) => state.workoutPlayer.isTimerActive,
				seconds: (state) => state.workoutPlayer.seconds,
				hours: (state) => state.workoutPlayer.hours,
				minutes: (state) => state.workoutPlayer.minutes,
			}),
		},
		methods: {
			...mapActions({
				timer: "workoutPlayer/timer",
			}),
			...mapMutations({
				setIsTimerActive: "workoutPlayer/setIsTimerActive",
			}),
		},
	};
</script>