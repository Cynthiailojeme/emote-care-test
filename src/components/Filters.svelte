<!-- Filter.svelte -->
<script>
	import { writable } from 'svelte/store';
	import SearchInput from './SearchInput.svelte';
	import DoubleRangeSlider from './DoubleRangeSlider.svelte';

	export let profiles;
	export let filters = {
		appointmentType: {
			isOpen: true,
			options: ['15-min free consultation (coming soon)', 'Individual 50-min session']
		},
		price: {
			isOpen: true
		},
		yearsOfExperience: {
			isOpen: true
		},
		sex: {
			isOpen: true
		},
		helpNeeded: {
			isOpen: true
		},
		therapistType: {
			isOpen: true
		},
		country: {
			isOpen: true,
			options: ['🇬🇧 UK', '🇪🇸 Spain', '🇺🇸 USA', '🇦🇺 Australia', '🇨🇦 Canada']
		},
		language: {
			isOpen: true,
			options: [
				'English',
				'Mandarin',
				'French',
				'Italian',
				'Punjabi',
				'Russian',
				'Spanish',
				'German'
			]
		}
	};

	// Writable store for selected filters
	let selectedFilters = writable({
		appointmentType: [],
		price: { min: 0, max: 200 },
		yearsOfExperience: { min: 0, max: 25 },
		sex: '',
		helpNeeded: '',
		therapistType: '',
		country: ['Spain'],
		language: ['English']
	});

	// Function to apply filters to the profiles
	function applyFilters() {
		// Clone the original profiles array to avoid modifying it directly
		let filteredProfiles = [...profiles];

		// Filter by appointment type
		console.log({ appointmentType: $selectedFilters.appointmentType });
		if ($selectedFilters.appointmentType.length > 0) {
			filteredProfiles = filteredProfiles.filter((profile) =>
				profile.appointmentType.some((type) => $selectedFilters.appointmentType.includes(type))
			);
		}

		// Filter by price range
		filteredProfiles = filteredProfiles.filter(
			(profile) =>
				Number(profile.rates.amount) >= $selectedFilters.price.min &&
				Number(profile.rates.amount) <= $selectedFilters.price.max
		);

		// Filter by years of experience range
		filteredProfiles = filteredProfiles.filter(
			(profile) =>
				profile.profile.yearsOfExperience >= $selectedFilters.yearsOfExperience.min &&
				profile.profile.yearsOfExperience <= $selectedFilters.yearsOfExperience.max
		);

		// Filter by sex
		if ($selectedFilters.sex) {
			filteredProfiles = filteredProfiles.filter(
				(profile) => profile.sex.toLowerCase() === $selectedFilters.sex.toLowerCase()
			);
		}

		// Filter by what help is needed
		if ($selectedFilters.helpNeeded) {
			filteredProfiles = filteredProfiles.filter((profile) =>
				profile.profile.therapyAreas.includes($selectedFilters.helpNeeded)
			);
		}

		// Filter by therapist type
		if ($selectedFilters.therapistType) {
			filteredProfiles = filteredProfiles.filter((profile) =>
				profile.profile.therapyCategories.includes($selectedFilters.therapistType)
			);
		}

		// Filter by country of residence
		if ($selectedFilters?.country?.length > 0) {
			filteredProfiles = filteredProfiles.filter((profile) =>
				$selectedFilters.country.includes(profile.demographic.location)
			);
		}

		// Filter by language
		console.log({ lang: $selectedFilters });
		if ($selectedFilters?.language?.length > 0) {
			filteredProfiles = filteredProfiles.filter((profile) => {
				const profileLanguages = Array.isArray(profile.demographic.mainLanguage)
					? profile.demographic.mainLanguage
					: [profile.demographic.mainLanguage];

				return profileLanguages.some((language) => $selectedFilters.language.includes(language));
			});
		}
		// Update the profiles variable with the filtered results

		console.log({ filteredProfiles, profiles });
		return filteredProfiles;
	}

	// Function to toggle a filter value
	function toggleFilter(filterArray, value) {
		const index = filterArray.indexOf(value);
		if (index === -1) {
			// Value not present, add it
			filterArray.push(value);
		} else {
			// Value present, remove it
			filterArray.splice(index, 1);
		}
	}

	console.log({ profiles, selectedFilters });
</script>

<div
	class="h-full p-6 bg-white rounded-2xl border border-stroke-cards flex-col justify-start items-start gap-8 inline-flex"
>
	<!-- Appointment Type Filter -->
	<div class="flex flex-col w-full">
		<button
			type="button"
			class="flex flex-row justify-between"
			on:click={() => (filters.appointmentType.isOpen = !filters.appointmentType.isOpen)}
		>
			<h3>Appointment Type</h3>
			<img
				src="assets/icons/chevron-left.svg"
				alt="dropdown icon"
				style="transform: {filters.appointmentType.isOpen ? `` : 'scaleY(-1)'}"
			/>
		</button>

		{#if filters.appointmentType.isOpen}
			<div class="mt-4 flex flex-col">
				{#each filters.appointmentType.options as type}
					<label for={type} class="flex items-start">
						<input
							id={type}
							type="checkbox"
							class="w-5 h-5 rounded-md border mr-4 border-gray-300 bg-white cursor-pointer hover:bg-[#E6F3FB] focus:border-[#0076C3]"
							checked={$selectedFilters?.appointmentType?.includes(type)}
							on:change={() => toggleFilter($selectedFilters.appointmentType, type)}
						/>
						{type}
					</label>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Price Range Filter -->
	<div class="flex flex-col w-full">
		<button
			type="button"
			class="flex flex-row justify-between"
			on:click={() => (filters.price.isOpen = !filters.price.isOpen)}
			><h3>Price (£ GBP)</h3>
			<img
				src="assets/icons/chevron-left.svg"
				alt="dropdown icon"
				style="transform: {filters.price.isOpen ? `` : 'scaleY(-1)'}"
			/>
		</button>

		{#if filters.price.isOpen}
			<div>
				<div class="w-full inline-flex flex-row gap-4 mt-4">
					<label
						for="minPrice"
						class="w-full text-stroke-dark font-poppins text-base font-medium leading-6 flex items-center justify-between gap-0.5 p-3 h-10 flex-1 border border-solid border-stroke-cards bg-base-white rounded-md shadow-box"
					>
						min
						<input
							id="minPrice"
							type="number"
							class="text-primary-dark w-8 text-base text-right border-0 outline-none"
							bind:value={$selectedFilters.price.min}
							on:input={applyFilters}
						/>
					</label>
					<label
						for="maxPrice"
						class="w-full text-stroke-dark font-poppins text-base font-medium leading-6 flex items-center justify-between gap-0.5 p-3 h-10 flex-1 border border-solid border-stroke-cards bg-base-white rounded-md shadow-box"
					>
						max
						<input
							id="maxPrice"
							type="number"
							class="text-primary-dark w-8 text-base text-right border-0 outline-none"
							bind:value={$selectedFilters.price.max}
							on:input={applyFilters}
						/>
					</label>
				</div>

				<DoubleRangeSlider values={[$selectedFilters.price.min, $selectedFilters.price.max]} />
				<div class="w-full inline-flex flex-row justify-between px-2">
					<span class="text-primary-dark font-poppins text-base font-medium leading-6">0</span>
					<span class="text-primary-dark font-poppins text-base font-medium leading-6">200</span>
				</div>
			</div>
		{/if}
	</div>

	<!-- Years of Experience Range Filter -->
	<div class="flex flex-col w-full">
		<button
			type="button"
			class="flex flex-row justify-between"
			on:click={() => (filters.yearsOfExperience.isOpen = !filters.yearsOfExperience.isOpen)}
		>
			<h3>Year of Experience</h3>
			<img
				src="assets/icons/chevron-left.svg"
				alt="dropdown icon"
				style="transform: {filters.yearsOfExperience.isOpen ? `` : 'scaleY(-1)'}"
			/>
		</button>

		{#if filters.yearsOfExperience.isOpen}
			<div class="mt-4">
				<div class="w-full inline-flex flex-row gap-4">
					<label
						for="minExperience"
						class="w-full text-stroke-dark font-poppins text-base font-medium leading-6 flex items-center justify-between gap-0.5 p-3 h-10 flex-1 border border-solid border-stroke-cards bg-base-white rounded-md shadow-box"
					>
						min
						<input
							id="minExperience"
							type="number"
							class="text-primary-dark w-8 text-base text-right border-0 outline-none"
							bind:value={$selectedFilters.yearsOfExperience.min}
							on:input={applyFilters}
						/>
					</label>
					<label
						for="maxExperience"
						class="w-full text-stroke-dark font-poppins text-base font-medium leading-6 flex items-center justify-between gap-0.5 p-3 h-10 flex-1 border border-solid border-stroke-cards bg-base-white rounded-md shadow-box"
					>
						max
						<input
							id="maxExperience"
							type="number"
							class="text-primary-dark w-8 text-base text-right border-0 outline-none"
							bind:value={$selectedFilters.yearsOfExperience.max}
							on:input={applyFilters}
						/>
					</label>
				</div>

				<DoubleRangeSlider
					values={[$selectedFilters.yearsOfExperience.min, $selectedFilters.yearsOfExperience.max]}
					max={25}
				/>
				<div class="w-full inline-flex flex-row justify-between px-2">
					<span class="text-primary-dark font-poppins text-base font-medium leading-6">0</span>
					<span class="text-primary-dark font-poppins text-base font-medium leading-6">25+</span>
				</div>
			</div>
		{/if}
	</div>

	<!-- Sex Filter -->
	<div class="flex flex-col w-full">
		<button
			type="button"
			class="flex flex-row justify-between"
			on:click={() => (filters.sex.isOpen = !filters.sex.isOpen)}
		>
			<h3>Sex</h3>
			<img
				src="assets/icons/chevron-left.svg"
				alt="dropdown icon"
				style="transform: {filters.sex.isOpen ? `` : 'scaleY(-1)'}"
			/>
		</button>

		{#if filters.sex.isOpen}
			<div class="mt-4">
				<SearchInput value={$selectedFilters.sex} onChange={applyFilters} />
			</div>
		{/if}
	</div>

	<!-- Help Needed Filter -->
	<div class="flex flex-col w-full">
		<button
			type="button"
			class="flex flex-row justify-between"
			on:click={() => (filters.helpNeeded.isOpen = !filters.helpNeeded.isOpen)}
		>
			<h3>What do you need help with?</h3>
			<img
				src="assets/icons/chevron-left.svg"
				alt="dropdown icon"
				style="transform: {filters.helpNeeded.isOpen ? `` : 'scaleY(-1)'}"
			/>
		</button>

		{#if filters.helpNeeded.isOpen}
			<div class="mt-4">
				<SearchInput value={$selectedFilters.helpNeeded} onChange={applyFilters} />
			</div>
		{/if}
	</div>

	<!-- Therapist Type Filter -->
	<div class="flex flex-col w-full">
		<button
			type="button"
			class="flex flex-row justify-between"
			on:click={() => (filters.therapistType.isOpen = !filters.therapistType.isOpen)}
		>
			<h3>Therapist Type</h3>
			<img
				src="assets/icons/chevron-left.svg"
				alt="dropdown icon"
				style="transform: {filters.therapistType.isOpen ? `` : 'scaleY(-1)'}"
			/>
		</button>
		{#if filters.therapistType.isOpen}
			<div class="mt-4">
				<SearchInput value={$selectedFilters.therapistType} onChange={applyFilters} />
			</div>
		{/if}
	</div>

	<!-- Country Filter -->
	<div class="flex flex-col w-full">
		<button
			type="button"
			class="flex flex-row justify-between"
			on:click={() => (filters.country.isOpen = !filters.country.isOpen)}
		>
			<h3>Country of Residence</h3>
			<img
				src="assets/icons/chevron-left.svg"
				alt="dropdown icon"
				style="transform: {filters.country.isOpen ? `` : 'scaleY(-1)'}"
			/>
		</button>

		{#if filters.country.isOpen}
			<div class="flex flex-wrap gap-2 mt-4">
				{#each filters.country.options as country}
					<button
						class="flex px-5 py-1 w-auto justify-center items-center min-h-8 gap-[0.625rem] rounded-full border border-gray-300 text-stroke-dark font-poppins text-base font-medium leading-6 active:bg-accent-green-light-brand active:text-black"
						class:active={$selectedFilters.country.includes(country)}
						on:click={() => toggleFilter($selectedFilters.country, country)}
					>
						{country}
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Language Filter -->
	<div class="flex flex-col w-full">
		<button
			type="button"
			class="flex flex-row justify-between"
			on:click={() => (filters.language.isOpen = !filters.language.isOpen)}
		>
			<h3>Language</h3>
			<img
				src="assets/icons/chevron-left.svg"
				alt="dropdown icon"
				style="transform: {filters.language.isOpen ? `` : 'scaleY(-1)'}"
			/>
		</button>

		{#if filters.language.isOpen}
			<div class="flex flex-wrap gap-2 mt-4">
				{#each filters.language.options as language}
					<button
						class="flex px-5 py-1 w-auto justify-center items-center min-h-8 gap-[0.625rem] rounded-full border border-gray-300 text-stroke-dark font-poppins text-base font-medium leading-6 active:bg-accent-green-light-brand active:text-black"
						class:active={$selectedFilters.language.includes(language)}
						on:click={() => toggleFilter($selectedFilters.language, language)}
					>
						{language}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
