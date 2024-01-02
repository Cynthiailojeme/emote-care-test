<script>
	import { onMount } from 'svelte';
	import Tag from './Tag.svelte';
	import SearchInput from './SearchInput.svelte';
	import FilterItem from './FilterItem.svelte';
	import DoubleRangeSlider from './DoubleRangeSlider.svelte';
	import { filteredTherapistProfiles, selectedFilters, filterCount } from '../lib/store';

	export let isMobile = false;
	export let sortDisplayedItems;
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
			options: [
				{ label: '🇬🇧 UK', value: 'United Kingdom' },
				{ label: '🇪🇸 Spain', value: 'Spain' },
				{ label: '🇺🇸 USA', value: 'United States' },
				{ label: '🇦🇺 Australia', value: 'Australia' },
				{ label: '🇨🇦 Canada', value: 'Canada' }
			]
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

	function filteredItemCount() {
		const filters = $selectedFilters;
		let count = 0;

		const isNotEmpty = (value) => (Array.isArray(value) ? value.length > 0 : value !== '');

		count += isNotEmpty(filters.appointmentType);
		count += filters.price.min > 0 || filters.price.max < 200 ? 1 : 0;
		count += filters.yearsOfExperience.min > 0 || filters.yearsOfExperience.max < 25 ? 1 : 0;
		count += isNotEmpty(filters.sex);
		count += isNotEmpty(filters.helpNeeded);
		count += isNotEmpty(filters.therapistType);
		count += isNotEmpty(filters.country);
		count += isNotEmpty(filters.language);

		filterCount.update(() => count);
	}

	// Function to apply filters to the profiles
	function applyFilters() {
		let filteredProfiles = [...profiles];

		// Filter by appointment type
		if ($selectedFilters.appointmentType.length > 0) {
			filteredProfiles = filteredProfiles.filter((profile) =>
				$selectedFilters.appointmentType.includes(profile.appointmentType)
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
				profile.profile.therapyAreas.some((area) =>
					area.toLowerCase().includes($selectedFilters.helpNeeded.toLowerCase())
				)
			);
		}

		// Filter by therapist type
		if ($selectedFilters.therapistType) {
			filteredProfiles = filteredProfiles.filter((profile) =>
				profile.profile.therapyCategories.some((category) =>
					category.toLowerCase().includes($selectedFilters.therapistType.toLowerCase())
				)
			);
		}

		// Filter by country of residence
		if ($selectedFilters?.country?.length > 0) {
			filteredProfiles = filteredProfiles.filter((profile) =>
				$selectedFilters.country.includes(profile.demographic.location)
			);
		}

		// Filter by language
		if ($selectedFilters?.language?.length > 0) {
			filteredProfiles = filteredProfiles.filter((profile) => {
				const profileLanguages = Array.isArray(profile.demographic.mainLanguage)
					? profile.demographic.mainLanguage
					: [profile.demographic.mainLanguage];

				// Flatten the profileLanguages array for cases that contain strings with multiple languages
				const flattenedLanguages = profileLanguages.flatMap((language) =>
					language.split(',').map((lang) => lang.trim())
				);

				return flattenedLanguages.some((language) => $selectedFilters.language.includes(language));
			});
		}

		// Update filter count
		filteredItemCount();

		// Update the profiles variable with the filtered results
		filteredTherapistProfiles.update(() => filteredProfiles);

		// Apply current sort value
		sortDisplayedItems();
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
		applyFilters();
	}

	onMount(() => {
		applyFilters();
	});
</script>

<div
	class="{isMobile &&
		'filters-mobile-class'} w-full h-auto p-6 bg-white rounded-2xl border border-stroke-cards flex-col justify-start items-start gap-8 inline-flex"
>
	<!-- Appointment Type Filter -->
	<FilterItem
		label="Appointment Type"
		isOpen={filters.appointmentType.isOpen}
		toggleOpen={() => (filters.appointmentType.isOpen = !filters.appointmentType.isOpen)}
	>
		<div class="flex flex-col gap-4">
			{#each filters.appointmentType.options as type (type)}
				<label for={type} class="flex items-start">
					<input
						id={type}
						type="checkbox"
						class="w-5 h-5 min-w-5 rounded-md border mr-4 border-gray-300 bg-white cursor-pointer hover:bg-[#E6F3FB] focus:border-[#0076C3]"
						checked={$selectedFilters?.appointmentType?.includes(type)}
						on:change={() => toggleFilter($selectedFilters.appointmentType, type)}
					/>
					<span class="max-w-full sm:max-w-[70%] lg-screens:max-w-full">
						{type}
					</span>
				</label>
			{/each}
		</div>
	</FilterItem>

	<!-- Price Range Filter -->
	<FilterItem
		label="Price (£ GBP)"
		isOpen={filters.price.isOpen}
		toggleOpen={() => (filters.price.isOpen = !filters.price.isOpen)}
	>
		<div>
			<div class="w-full inline-flex flex-row gap-4">
				<label
					for="minPrice"
					class="w-full text-stroke-dark font-poppins text-base font-medium leading-6 flex items-center justify-between gap-0.5 p-3 h-10 flex-1 border border-solid border-stroke-cards bg-base-white rounded-md shadow-box"
				>
					min
					<input
						id="minPrice"
						type="number"
						max="200"
						class="text-primary-dark w-8 text-base text-right border-0 appearance-none outline-none"
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
						max="200"
						class="text-primary-dark w-8 text-base text-right border-0 appearance-none outline-none"
						bind:value={$selectedFilters.price.max}
						on:input={applyFilters}
					/>
				</label>
			</div>

			<!-- range slider -->
			<DoubleRangeSlider
				values={[$selectedFilters.price.min, $selectedFilters.price.max]}
				change={(e) => {
					$selectedFilters.price.min = e?.detail?.values[0];
					$selectedFilters.price.max = e?.detail?.values[1];
					applyFilters();
				}}
			/>

			<div class="w-full inline-flex flex-row justify-between px-2">
				<span class="text-primary-dark font-poppins text-base font-medium leading-6">0</span>
				<span class="text-primary-dark font-poppins text-base font-medium leading-6">200</span>
			</div>
		</div>
	</FilterItem>

	<!-- Years of Experience Range Filter -->
	<FilterItem
		label="Year of Experience"
		isOpen={filters.yearsOfExperience.isOpen}
		toggleOpen={() => (filters.yearsOfExperience.isOpen = !filters.yearsOfExperience.isOpen)}
	>
		<div class="w-full inline-flex flex-row gap-4">
			<label
				for="minExperience"
				class="w-full text-stroke-dark font-poppins text-base font-medium leading-6 flex items-center justify-between gap-0.5 p-3 h-10 flex-1 border border-solid border-stroke-cards bg-base-white rounded-md shadow-box"
			>
				min
				<input
					id="minExperience"
					type="number"
					class="text-primary-dark w-8 text-base text-right border-0 appearance-none outline-none"
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
					class="text-primary-dark w-8 text-base text-right border-0 appearance-none outline-none"
					bind:value={$selectedFilters.yearsOfExperience.max}
					on:input={applyFilters}
				/>
			</label>
		</div>

		<DoubleRangeSlider
			values={[$selectedFilters.yearsOfExperience.min, $selectedFilters.yearsOfExperience.max]}
			max={25}
			change={(e) => {
				$selectedFilters.yearsOfExperience.min = e?.detail?.values[0];
				$selectedFilters.yearsOfExperience.max = e?.detail?.values[1];
				applyFilters();
			}}
		/>
		<div class="w-full inline-flex flex-row justify-between px-2">
			<span class="text-primary-dark font-poppins text-base font-medium leading-6">0</span>
			<span class="text-primary-dark font-poppins text-base font-medium leading-6">25+</span>
		</div>
	</FilterItem>

	<!-- Sex Filter -->
	<FilterItem
		label="Sex"
		isOpen={filters.sex.isOpen}
		toggleOpen={() => (filters.sex.isOpen = !filters.sex.isOpen)}
	>
		<SearchInput bind:value={$selectedFilters.sex} {applyFilters} />
	</FilterItem>

	<!-- Help Needed Filter -->
	<FilterItem
		label="What do you need help with?"
		isOpen={filters.helpNeeded.isOpen}
		toggleOpen={() => (filters.helpNeeded.isOpen = !filters.helpNeeded.isOpen)}
	>
		<SearchInput bind:value={$selectedFilters.helpNeeded} {applyFilters} />
	</FilterItem>

	<!-- Therapist Type Filter -->
	<FilterItem
		label="Therapist Type"
		isOpen={filters.therapistType.isOpen}
		toggleOpen={() => (filters.therapistType.isOpen = !filters.therapistType.isOpen)}
	>
		<SearchInput bind:value={$selectedFilters.therapistType} {applyFilters} />
	</FilterItem>

	<!-- Country Filter -->
	<FilterItem
		label="Country of Residence"
		isOpen={filters.country.isOpen}
		toggleOpen={() => (filters.country.isOpen = !filters.country.isOpen)}
	>
		<div class="flex flex-wrap gap-y-4 gap-x-2">
			{#each filters.country.options as country (country.value)}
				<Tag
					selectedFilters={$selectedFilters.country}
					filterValue={country.value}
					label={country.label}
					{toggleFilter}
				/>
			{/each}
		</div>
	</FilterItem>

	<!-- Language Filter -->
	<FilterItem
		label="Language"
		isOpen={filters.language.isOpen}
		toggleOpen={() => (filters.language.isOpen = !filters.language.isOpen)}
	>
		<div class="flex flex-wrap gap-y-4 gap-x-2">
			{#each filters.language.options as language (language)}
				<Tag
					selectedFilters={$selectedFilters.language}
					filterValue={language}
					label={language}
					{toggleFilter}
				/>
			{/each}
		</div>
	</FilterItem>
</div>

<style>
	.filters-mobile-class {
		height: 100%;
		overflow-y: scroll;
		border: none;
		max-height: 100%;
		padding-top: 0;
		padding-bottom: 100px;
	}
</style>
