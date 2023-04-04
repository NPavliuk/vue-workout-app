<template>
	<nav class="nav">
		<router-link
			:to="{ path: '/main' }"
			active-class="nav-active"
			class="nav__item"
		>
			Home
		</router-link>
		<router-link
			:to="{ path: '/history' }"
			class="nav__item"
			active-class="nav-active"
		>
			History
		</router-link>
		<router-link
			:to="{ path: '/today' }"
			class="nav__item"
			active-class="nav-active"
		>
			Today
		</router-link>
	</nav>
</template>

