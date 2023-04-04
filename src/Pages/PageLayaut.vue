<template>
	<header-bar />
	<div class="main-wrapper container">
		<app-calendar></app-calendar>
		<router-view />
		<create-button />
	</div>
</template>

<script>
	import AppCalendar from "../components/Calendar/AppCalendar.vue";
	import HeaderBar from "../components/headerBars/HeaderBar.vue";
	import CreateButton from "../components/CreateButton.vue";
	export default {
		components: {
			AppCalendar,
			HeaderBar,
			CreateButton,
		},
	};
</script>