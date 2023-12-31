<script>
	export let value = '';
	export let placeholder = 'Search';
	export let applyFilters;

	let debounceTimer;

	// Wait for user to stop typing before calling filter function
	function handleInput() {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			applyFilters();
		}, 200);
	}
</script>

<div class="w-full relative">
	<input
		type="text"
		bind:value
		class="w-full h-10 p-3 pl-10 flex flex-col justify-center items-start gap-2 self-stretch rounded-md border border-gray-300 bg-white focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 shadow-inner"
		{placeholder}
		on:input={handleInput}
		style="background-image: url('assets/icons/search.svg'); background-repeat: no-repeat; background-size: 20px 20px; background-position: 10px center;"
	/>
</div>
