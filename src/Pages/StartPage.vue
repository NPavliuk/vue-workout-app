<template>
	<router-link class="start-page" :to="{ name: 'MainPage' }">
		<div class="start-page__content">
			<logo-icon class="start-page__logo" />
			<span class="start-page__button">Let's Go</span>
		</div>
	</router-link>
</template>

<script>
	import LogoIcon from "../components/componentsIcons/LogoIcon.vue";
	export default {
		components: {
			LogoIcon,
		},
	};
</script>