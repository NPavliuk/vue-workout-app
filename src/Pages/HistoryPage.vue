<template>
	<section class="profile block-style">
		<h2 class="section__title">History</h2>
		<span
			v-if="!historyWorkouts || historyWorkouts.length === 0"
			class="sheduled-clear"
		>
			not anything finished yet
		</span>
		<div
			class="profile__item"
			v-for="(item, idx) in historyWorkouts"
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
</template>

<script>
	import { mapActions, mapMutations, mapState } from "vuex";

	export default {
		components: {},
		created() {
			const library = JSON.parse(
				localStorage.getItem("CompleatedWorkoutsLibrary")
			);
			if (library != null) {
				this.setHistoryWorkouts(library);
			}
		},
		computed: {
			...mapState({
				historyWorkouts: (state) => state.profile.historyWorkouts,
			}),
		},
		methods: {
			...mapMutations({
				setHistoryWorkouts: "profile/setHistoryWorkouts",
			}),
			...mapActions({
				showInfo: "profile/showInfo",
			}),
		},
	};
</script>