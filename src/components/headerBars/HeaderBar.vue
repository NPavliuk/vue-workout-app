<template>
	<header class="header">
		<div class="container">
			<div class="header__inner">
				<router-link :to="{ path: '/main' }" class="header__logo">
					<logo-icon class="header__logo-icon" />
				</router-link>
				<nav-bar />
			</div>
		</div>
	</header>
</template>

<script>
	import LogoIcon from "../componentsIcons/LogoIcon.vue";
	import NavBar from "../NavBar.vue";
	export default {
		components: {
			LogoIcon,
			NavBar,
		},
	};
</script>