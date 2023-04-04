<template>
	<div class="today block-style">
		<div class="today__date">
			{{
				`${currentDate.getDate()} ${currentDate.toLocaleDateString(
					"en-EN",
					{ month: "long" }
				)} ${currentDate.getFullYear()}`
			}}
		</div>
		<div class="today__list">
			<div class="today__list-name">Sheduled today</div>
			<span
				v-if="!getTodaySheduled || getTodaySheduled.length === 0"
				class="sheduled-clear"
			>
				not anything sheduled yet
			</span>
			<div
				class="today-item"
				v-for="(workout, index) in getTodaySheduled"
				:key="index"
			>
				<h3 class="today-item__name">
					{{ workout.name }}
				</h3>

				<div class="today-item__nav">
					<router-link
						@click="sheduleWorkoutStart(workout)"
						class="today-item__start"
						:to="{ path: '/workouts' }"
					>
						Start
					</router-link>
					<button
						class="today-item__remove"
						@click="removeFromShedule(index)"
					>
						<trash-icon class="icon" />
					</button>
				</div>
			</div>
		</div>
		<section class="profile">
			<div class="today__list-name">Finished today</div>

			<span v-if="getHistoryToday.length === 0" class="sheduled-clear">
				not finished workout today
			</span>
			<div
				class="profile__item"
				v-for="(item, idx) in getHistoryToday"
				:key="idx"
				@click="showInfo(item.date)"
			>
				<div class="profile__content">
					<div class="pofile__date">
						{{
							`${new Date(item.date).getDate()} ${new Date(
								item.date
							).toLocaleString("eng", {
								month: "short",
							})} ${new Date(item.date).getFullYear()}`
						}}
					</div>
					<div class="profile__info">
						Compleated at
						{{ `${new Date(item.date).getHours()}` }}:{{
							10 > new Date(item.date).getMinutes()
								? `0${new Date(item.date).getMinutes()}`
								: new Date(item.date).getMinutes()
						}}
						<span>{{ item.time }}</span>
					</div>
					<div class="profile__name">
						{{ item.name }}
					</div>
				</div>
				<div class="profile__progress">
					{{ item.progress }} <span>%</span>
				</div>
				<div class="profile-description" v-if="item.checked">
					<div
						class="profile-description__item"
						v-for="(el, index) in item.body"
						:key="index"
					>
						<div class="profile-description__item-name">
							{{ el.name }}
						</div>

						<div class="profile-description__item-reps">
							Needed: <span>{{ el.reps }}</span>
						</div>
						<div class="profile-description__item-reps">
							Done:
							<span>{{
								el.doneReps ? el.doneReps : "not done"
							}}</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
	import TrashIcon from "../components/componentsIcons/TrashIcon.vue";
	export default {
		components: {
			TrashIcon,
		},
		created() {
			this.setCurrentDate(new Date());
			this.setCurentDate(this.currentDate);

			const sheduled = JSON.parse(localStorage.getItem("SheduledWorkouts"));
			if (sheduled != null) {
				this.setSheduledWorkouts(sheduled);
			}

			const library = JSON.parse(
				localStorage.getItem("CompleatedWorkoutsLibrary")
			);
			if (library != null) {
				this.setHistoryWorkouts(library);
			}
		},
		computed: {
			...mapState({
				sheduledWorkouts: (state) => state.calendar.sheduledWorkouts,
				currentDate: (state) => state.calendar.currentDate,
			}),

			...mapGetters({
				getTodaySheduled: "calendar/getTodaySheduled",
				getHistoryToday: "profile/getHistoryToday",
			}),
		},
		methods: {
			...mapMutations({
				setCurrentDate: "calendar/setCurrentDate",
				setSheduledWorkouts: "calendar/setSheduledWorkouts",
				setCurentDate: "profile/setCurentDate",
				setHistoryWorkouts: "profile/setHistoryWorkouts",
			}),

			...mapActions({
				removeFromShedule: "calendar/removeFromShedule",
				sheduleWorkoutStart: "calendar/sheduleWorkoutStart",
				showInfo: "profile/showInfo",
			}),
		},
	};
</script>