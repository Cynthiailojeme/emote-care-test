<script>
	export let options = [];
	export let selectedOption = null;
	export let onSelectionChange;

	let isOpen = false;

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectOption(option) {
		selectedOption = option;
		isOpen = false;
		onSelectionChange(selectedOption);
	}

	function getLabelText(option) {
		// Extract text before the colon
		return option.label.split(':')[0].trim();
	}
</script>

<div class="relative inline-block text-left">
	<div>
		<button
			type="button"
			class="w-full min-w-40 h-11 px-6 py-2 bg-white rounded-[60px] shadow border border-stone-300 justify-center items-center gap-4 inline-flex"
			id="options-menu"
			aria-haspopup="true"
			aria-expanded="true"
			on:click={toggleDropdown}
		>
			{selectedOption ? `Sort by: ${getLabelText(selectedOption)}` : 'Sort by'}
			{#if selectedOption?.value.includes('desc')}
				<img
					src="/assets/icons/arrow-down.svg"
					alt="Decending order"
					title={selectedOption.label}
				/>
			{/if}

			{#if selectedOption?.value.includes('asc')}
				<img
					src="/assets/icons/arrow-down.svg"
					alt="Ascending order"
					title={selectedOption.label}
					style="transform: scaleY(-1);"
				/>
			{/if}

			<img
				src={'/assets/icons/chevron-left.svg'}
				alt={isOpen ? 'Dropdown opened' : 'Dropdown closed'}
				style={`transform: ${isOpen ? 'scaleY(-1)' : ''}`}
			/>
		</button>
	</div>

	<!-- Dropdown menu -->
	{#if isOpen}
		<div
			class="absolute right-0 w-full mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[200]"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="options-menu"
		>
			{#each options as option (option.value)}
				<button
					class="w-full px-4 py-2 flex flex-row items-center justify-between text-sm text-left text-gray-700 cursor-pointer hover:bg-gray-100"
					on:click={() => selectOption(option)}
				>
					<span>{option.label}</span>
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
	{/if}
</div>
