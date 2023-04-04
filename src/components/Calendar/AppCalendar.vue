<template>
	<section class="calendar">
		<calendar-controls />
		<div class="calendar-days">
			<div
				class="calendar-days__item"
				v-for="dayName in this.week"
				:key="dayName"
			>
				{{ dayName.slice(0, 3).toUpperCase() }}
			</div>
		</div>
		<div class="calendar-body">
			<calendar-item
				class="calendar-body__item"
				v-for="day in getDays"
				:key="day"
				@click="setCheckedDate(day)"
				:class="
					day === getCurrenDate
						? 'calendar--current-day'
						: day === checkedDate
						? 'calendar--checked-day'
						: ''
				"
			>
				<div
					:class="{
						'calendar-body__item-content': day !== undefined,
					}"
				>
					{{ day != undefined ? day.split("-")[2] : "" }}
					<span
						:class="
							day in sheduledWorkouts &&
							sheduledWorkouts[day].length > 0
								? 'sheduled'
								: ''
						"
					></span>
				</div>
			</calendar-item>
		</div>
		<calendar-shedule />
		<calendar-shedule-modal />
	</section>
</template>

<script>
	import CalendarItem from "./CalendarItem.vue";
	import CalendarControls from "./CalendarControls.vue";
	import CalendarShedule from "./CalendarShedule.vue";
	import CalendarSheduleModal from "./CalendarSheduleModal.vue";
	import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

	export default {
		components: {
			CalendarItem,
			CalendarControls,
			CalendarShedule,
			CalendarSheduleModal,
		},
		created() {
			this.setCurrentDate(new Date());
			this.setChangingDate(new Date());
			this.setCurrentYear(this.currentDate.getFullYear());
			this.addDays();
			this.setWindowWidth(window.innerWidth);

			const sheduled = JSON.parse(localStorage.getItem("SheduledWorkouts"));
			if (sheduled != null) {
				this.setSheduledWorkouts(sheduled);
			}
		},
		mounted() {
			this.$store.watch(
				(state) => state.calendar.changingDate,
				() => {
					this.addDays();
				}
			);
		},
		methods: {
			...mapMutations({
				setCurrentDate: "calendar/setCurrentDate",
				setChangingDate: "calendar/setChangingDate",
				setCurrentYear: "calendar/setCurrentYear",
				setDays: "calendar/setDays",
				setCheckedDate: "calendar/setCheckedDate",
				setSheduledWorkouts: "calendar/setSheduledWorkouts",
				setWindowWidth: "calendar/setWindowWidth",
			}),
			...mapActions({
				addDays: "calendar/addDays",
			}),
		},
		computed: {
			...mapState({
				windowWidth: (state) => state.calendar.windowWidth,
				currentDate: (state) => state.calendar.currentDate,
				changingDate: (state) => state.calendar.changingDate,
				currentYear: (state) => state.calendar.currentYear,
				days: (state) => state.calendar.days,
				week: (state) => state.calendar.week,
				checkedDate: (state) => state.calendar.checkedDate,
				sheduledWorkouts: (state) => state.calendar.sheduledWorkouts,
			}),
			...mapGetters({
				getDays: "calendar/getDays",
				getCurrenDate: "calendar/getCurrenDate",
			}),
		},
	};
</script>
