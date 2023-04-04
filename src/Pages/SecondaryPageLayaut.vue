<template>
	<header-bar />
	<div class="secondary-wrapper container">
		<router-view />
	</div>
</template>

<script>
	import HeaderBar from "../components/headerBars/HeaderBar.vue";
	export default {
		components: {
			HeaderBar,
		},
	};
</script>