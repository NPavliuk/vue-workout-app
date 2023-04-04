<template>
	<section
		class="create-btn"
		:class="isCreateButtonActive ? '_active' : ''"
		@click="isCreateButtonActive = false"
	>
		<div
			class="create-btn__window"
			v-show="isCreateButtonActive ? '_active' : ''"
		>
			<router-link
				:to="{ path: '/create-workout' }"
				class="create-btn__item"
			>
				<span>Create Workout</span>
				<div class="create-btn__btn-icon-wrapper">W</div>
			</router-link>
			<router-link :to="{ path: '/exercises' }" class="create-btn__item">
				<span>Create Exercises</span>
				<div class="create-btn__btn-icon-wrapper">E</div>
			</router-link>
		</div>
	</section>
	<button
		type="button"
		:class="isCreateButtonActive ? '_active' : ''"
		class="create-btn__btn"
		@click="isCreateButtonActive = !isCreateButtonActive"
	>
		<span></span>
	</button>
</template>

<script>
	export default {
		data: () => ({
			isCreateButtonActive: false,
		}),
	};
</script>