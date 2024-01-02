<script>
	import dayjs from 'dayjs';
	import Dropdown from '../components/Dropdown.svelte';
	import Filters from '../components/Filters.svelte';
	import therapistsData from '../data/therapist-data.json'; // added new data items to each object: appointmentType, sex, rates, nextAvailableDate, nextAvailableTime
	import TherapistProfile from '../components/TherapistProfile.svelte';
	import { filteredTherapistProfiles, selectedFilters, filterCount, isLoading } from '../lib/store';
	import MobileFilterButtons from '../components/MobileFilterButtons.svelte';
	import Loader from '../components/Loader.svelte';
	import ScrollButtons from '../components/ScrollButtons.svelte';

	let isMobile;

	let sortOptions = [
		{ label: 'Name: A to Z', value: 'name-asc' },
		{ label: 'Name: Z to A', value: 'name-desc' },
		{ label: 'Rate: Low to High', value: 'rate-asc' },
		{ label: 'Rate: High to Low', value: 'rate-desc' },
		{ label: 'Year of experience: Low to High', value: 'exp-asc' },
		{ label: 'Year of experience: High to Low', value: 'exp-desc' },
		{ label: 'Next available date', value: 'next-date' }
	];

	let selectedSortOption = isMobile
		? null
		: { label: 'Year of experience: High to Low', value: 'exp-desc' };

	function clearAllFilters() {
		selectedFilters.set({
			appointmentType: [],
			price: { min: 0, max: 200 },
			yearsOfExperience: { min: 0, max: 25 },
			sex: '',
			helpNeeded: '',
			therapistType: '',
			country: [],
			language: []
		});
		filteredTherapistProfiles.update(() => therapistsData);
		filterCount.update(() => 0);
	}

	function clearAllSortings() {
		filteredTherapistProfiles.update(() => therapistsData);
		selectedSortOption = null;
	}

	function sortDisplayedItems() {
		// Set loading state to true
		isLoading.set(() => true);

		const sortKey = selectedSortOption.value;
		const profiles = [...$filteredTherapistProfiles];

		switch (sortKey) {
			case 'name-asc':
				profiles.sort((a, b) => a.firstName.localeCompare(b.firstName));
				break;
			case 'name-desc':
				profiles.sort((a, b) => b.firstName.localeCompare(a.firstName));
				break;
			case 'rate-asc':
				profiles.sort((a, b) => Number(a?.rates?.amount) - Number(b?.rates?.amount));
				break;
			case 'rate-desc':
				profiles.sort((a, b) => Number(b?.rates?.amount) - Number(a?.rates?.amount));
				break;
			case 'exp-asc':
				profiles.sort((a, b) => a.profile?.yearsOfExperience - b?.profile?.yearsOfExperience);
				break;
			case 'exp-desc':
				profiles.sort((a, b) => b?.profile?.yearsOfExperience - a?.profile?.yearsOfExperience);
				break;
			case 'next-date':
				profiles.sort((a, b) => dayjs(a?.nextAvailableDate).diff(dayjs(b?.nextAvailableDate)));
				break;
			default:
				break;
		}

		filteredTherapistProfiles.update(() => profiles);

		// Set loading state to false
		setTimeout(() => {
			isLoading.set(false);
		}, 200);
	}

	function handleSortChange(option) {
		selectedSortOption = option;
		sortDisplayedItems();
	}

	// Subscribe to changes in the store
	$: {
		$isLoading = $isLoading;
		$filteredTherapistProfiles = $filteredTherapistProfiles;
		$selectedFilters = $selectedFilters;
		$filterCount = $filterCount;
	}
</script>

<div
	class="w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[6.25rem] lg-screens:px-40 py-4 lg:py-10 flex flex-col lg:flex-row gap-6"
>
	<section class="max-w-[53.5rem] xl:max-w-[53.5rem] xl:min-w-[48.5rem] lg-screens:min-w-[68.5rem] w-full">
		<!-- therapists section header -->
		<div class="flex sm:items-center justify-between flex-col sm:flex-row sm:mb-6">
			<p
				class="hidden lg:block text-primary-dark font-poppins text-[1.25rem] font-semibold leading-normal"
			>
				Let’s discover your next therapist
			</p>

			<div class="hidden lg:flex">
				<Dropdown
					options={sortOptions}
					selectedOption={selectedSortOption}
					onSelectionChange={handleSortChange}
				/>
			</div>
		</div>

		<div class="lg:hidden flex lg:items-center justify-between flex-col">
			<p class="text-primary-dark font-poppins text-[1.25rem] font-semibold leading-normal">
				Discover your next therapist
			</p>
			<!-- mobile filter buttons -->
			<MobileFilterButtons
				resetAllFilters={clearAllFilters}
				resetAllSortings={clearAllSortings}
				onSelectionChange={handleSortChange}
				options={sortOptions}
				{sortDisplayedItems}
			/>
		</div>

		<!-- therapists section avatar -->
		<div
			class="relative min-h-auto w-full p-4 sm:p-8 rounded-lg sm:border sm:border-stroke-cards bg-warm sm:bg-white sm:shadow-md flex-col justify-start items-start gap-4 inline-flex"
		>
			<div class="text-primary-dark text-base font-semibold font-poppins">
				30 second introduction videos
			</div>
			<div
				class="flex w-full min-h-auto overflow-x-auto overflow-y-hidden sm:overflow-x-hidden"
				id="introVideosContainer"
			>
				<div
					class="min-w-[3.75rem] h-[3.75rem] lg-screens:min-w-[6.25rem] lg-screens:h-[6.25rem] sm:min-w-20 sm:h-20 mr-5 lg-screens:mr-8 sm:mr-8"
				>
					<div class="w-full h-full bg-lime-300 rounded-full flex items-center justify-center">
						<button>
							<img
								src="assets/icons/rotate-cw.svg"
								alt="Refresh button"
								class="h-5 w-5 sm:w-6 sm:h-6"
							/>
						</button>
					</div>
					<p
						class="text-primary-dark text-center mt-2 font-poppins text-[0.875rem] sm:text-1rem font-medium"
					>
						Refresh
					</p>
				</div>

				<div class="animate__animated animate__fadeInUp flex gap-5 lg-screens:gap-8 sm:gap-8">
					{#each therapistsData as profile, index (profile.id)}
						<div class="w-max">
							<div
								class="relative w-[3.75rem] h-[3.75rem] lg-screens:w-[6.25rem] lg-screens:h-[6.25rem] rounded-full sm:w-20 sm:h-20 inline-flex items-center justify-center"
							>
								<img
									src={profile?.avatarUrl}
									alt={`Avatar ${index + 1}`}
									class="absolute w-full h-full rounded-full object-cover"
								/>
								<img
									src={'assets/images/video-play.png'}
									alt={`Play profile video ${index + 1}`}
									class="absolute bottom-0 right-0 cursor-pointer w-[18px] h-[18px] sm:w-5 sm:h-5"
								/>
							</div>
							<p
								class="text-primary-dark font-poppins text-center text-[0.875rem] capitalize sm:text-1rem font-medium"
							>
								{profile?.firstName}
								{profile?.lastName[0]}.
							</p>
						</div>
					{/each}
				</div>

				<ScrollButtons
					containerId="introVideosContainer"
					btnId="scrollSectionToLeft"
					top="50%"
					left="1rem"
					right="1rem"
				/>
			</div>
		</div>

		<!-- therapists section (profiles) -->
		{#if $isLoading}
			<Loader />
		{/if}

		{#if !$isLoading && $filteredTherapistProfiles?.length > 0}
			{#each $filteredTherapistProfiles as therapist (therapist.id)}
				<TherapistProfile {therapist} />
			{/each}
		{/if}

		{#if !$isLoading && $filteredTherapistProfiles?.length === 0}
			<p
				class="mt-6 text-primary-dark font-poppins text-[1rem] lg-screens:text-[1.375rem] sm:text-[1.125rem] mb-1 font-medium leading-5"
			>
				No matching profile found
			</p>
		{/if}
	</section>

	<section
		class="hidden max-w-[22.5rem] xl:min-w-[18rem] xl:max-w-[22.5rem] lg-screens:min-w-[30rem] lg:flex flex-col"
	>
		<!-- filter section header -->
		<div class="flex items-center justify-between sm:mb-6">
			<button
				type="button"
				class=" h-11 px-6 gap-2 py-2 bg-white rounded-full shadow-md border border-stone-300 justify-center items-center inline-flex"
				id="options-menu"
				aria-haspopup="true"
				aria-expanded="true"
			>
				Filter by
			</button>

			<button
				on:click={() => {
					clearAllFilters();
					clearAllSortings();
				}}
				class="hover:underline">Clear all</button
			>
		</div>

		<!-- filter section options -->
		<div class="static">
			<Filters profiles={therapistsData} {sortDisplayedItems} />
		</div>
	</section>
</div>

<svelte:head>
	<title>Therapists Profiles</title>
</svelte:head>

<style>
	.animate__animated {
		animation-duration: 1s;
	}
	.animate__fadeInUp {
		animation-name: fadeInUp;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translate3d(0, 20px, 0);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
</style>
