<script>
	export let label;
	export let isOpen;
	export let toggleOpen;
</script>

<div class="flex flex-col w-full">
	<button type="button" class="flex flex-row justify-between" on:click={toggleOpen}>
		<h3 class="text-primary-dark font-poppins text-base font-semibold">{label}</h3>
		<img
			src="assets/icons/chevron-left.svg"
			alt="dropdown icon"
			style="transform: {isOpen ? '' : 'scaleY(-1)'}; filter: grayscale(80%) brightness(3);"
		/>
	</button>

	{#if isOpen}
		<div class="mt-4">
			<slot />
		</div>
	{/if}
</div>
