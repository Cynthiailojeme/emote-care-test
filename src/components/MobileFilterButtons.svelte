<script>
	import Filters from './Filters.svelte';
	import therapistsData from '../data/therapist-data.json';

	export let resetAllSortings;
	export let resetAllFilters;
	export let selectedOption = null;
	export let onSelectionChange;
	export let options = [];

	let showSortModal = false;
	let showFilterModal = false;

	const openSortModal = () => {
		showSortModal = true;
	};

	const openFilterModal = () => {
		showFilterModal = true;
	};

	function selectOption(option) {
		selectedOption = option;
		showSortModal = false;
		onSelectionChange(selectedOption);
	}

	function getDisplayedSelection(selectedOption) {
		let val = selectedOption.value;
		if (val === 'exp-asc' || val === 'exp-desc') {
			return `Exp: ${val === 'exp-asc' ? 'Low to High' : 'High to Low'}`;
		} else {
			return selectedOption.label;
		}
	}
</script>

<div class="relative">
	<div class="flex justify-between gap-3 sm:hidden my-4">
		<button
			on:click={openSortModal}
			class="inline-flex w-full h-10 px-2 gap-2 flex-1 rounded-full py-2 bg-white shadow-md border border-stone-300 justify-center items-center"
		>
			{selectedOption ? getDisplayedSelection(selectedOption) : 'Sort by'}

			<img src={'/assets/icons/chevron-left.svg'} alt="Open dropdown" />
		</button>
		<button
			on:click={openFilterModal}
			class="inline-flex w-full h-10 px-6 gap-2 flex-1 rounded-full py-2 bg-white shadow-md border border-stone-300 justify-center items-center"
		>
			Filter by
		</button>
	</div>

	{#if showSortModal}
		<!-- Sort Options -->
		<div class="fixed top-0 left-0 w-full h-full z-[100] bg-white">
			<div class="flex justify-between items-center bg-accent-green-light-brand p-4">
				<div
					class="text-primary-dark font-poppins font-semibold text-base leading-5 inline-flex items-center"
				>
					<button on:click={() => (showSortModal = false)} class="mr-[0.625rem]">
						<img
							src="assets/icons/arrow-left.svg"
							alt="back icon"
							class="w-5 h-5"
							style="transform: scaleX(-1); filter: grayscale(100%) brightness(0);"
						/>
					</button>
					Sort by
				</div>
				<button
					class="text-black"
					on:click={() => {
						showSortModal = false;
						resetAllSortings;
					}}>Reset all</button
				>
			</div>

			<div class="p-4">
				<div
					class="w-full bg-white focus:outline-none z-10"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="options-menu"
				>
					{#each options as option (option.value)}
						<button
							class="w-full min-h-12 px-4 py-2 flex flex-row items-center justify-between text-sm text-left text-gray-700 cursor-pointer rounded-[0.5625rem] hover:bg-[#f8f8f8]"
							style="background-color: {selectedOption?.value === option.value
								? '#f8f8f8'
								: 'white'}"
							on:click={() => selectOption(option)}
						>
							<span>
								{option.label}
							</span>

							{#if selectedOption?.value === option.value}
								<img
									src="/assets/icons/check.svg"
									alt="checked item"
									style="filter: grayscale(100%) brightness(0); margin-left: 0.5rem"
								/>
							{/if}
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	{#if showFilterModal}
		<!-- Filter Options -->
		<div class="fixed top-0 left-0 w-full h-full z-[100] bg-white">
			<div class="flex justify-between items-center mb-4 bg-accent-green-light-brand p-4">
				<div
					class="text-primary-dark font-poppins font-semibold text-base leading-5 inline-flex items-center"
				>
					<button on:click={() => (showFilterModal = false)} class="mr-[0.625rem]">
						<img
							src="assets/icons/arrow-left.svg"
							alt="back icon"
							class="w-5 h-5"
							style="transform: scaleX(-1); filter: grayscale(100%) brightness(0);"
						/>
					</button>
					Filters
				</div>
				<button class="text-black" on:click={resetAllFilters}>Reset all</button>
			</div>

			<Filters profiles={therapistsData} isMobile={true} />
		</div>
	{/if}
</div>
