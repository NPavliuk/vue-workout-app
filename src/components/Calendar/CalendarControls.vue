<template>
	<div class="calendar-controls">
		<my-button
			@click="prevMonth"
			class="calendar-controls__button button-left"
		>
			<arrow-icon />
		</my-button>
		<span class="calendar-controls__text">{{ getMonthTitle }}</span>
		<my-button
			@click="nextMonth"
			class="calendar-controls__button button-right"
		>
			<arrow-icon />
		</my-button>
	</div>
</template>

<script>
	import myButton from "../componentsUI/myButton.vue";
	import ArrowIcon from "../componentsIcons/ArrowIcon.vue";
	import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

	export default {
		data: () => ({}),
		components: {
			myButton,
			ArrowIcon,
		},

		methods: {
			...mapMutations({}),
			...mapActions({
				nextMonth: "calendar/nextMonth",
				prevMonth: "calendar/prevMonth",
			}),
		},
		computed: {
			...mapGetters({
				getMonthTitle: "calendar/getMonthTitle",
				getDays: "calendar/getDays",
			}),
			...mapState({
				month: (state) => state.calendar.month,
			}),
		},
	};
</script>
