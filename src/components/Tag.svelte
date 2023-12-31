<script>
	import { scrollToTheTop } from '$lib/helpers';

	export let selectedFilters;
	export let filterValue;
	export let label;
	export let toggleFilter;

	function handleClick() {
		toggleFilter(selectedFilters, filterValue);

		setTimeout(() => {
			// Scroll to the top of the page
			scrollToTheTop();
		}, 200);
	}
</script>

<button
	class="{selectedFilters.includes(filterValue)
		? 'selected'
		: ''} flex px-5 py-1 w-auto justify-center items-center min-h-8 gap-[0.625rem] rounded-full border border-gray-300 text-stroke-dark font-poppins text-base font-medium leading-6 hover:border-[bg-accent-green-light-brand]"
	class:active={selectedFilters.includes(filterValue)}
	on:click={() => handleClick()}
>
	{label}
</button>

<style>
	.selected {
		background-color: #bfd962 !important;
		color: #000 !important;
	}
</style>
