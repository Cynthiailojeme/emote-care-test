<script>
	import Dropdown from '../components/Dropdown.svelte';
	import Filters from '../components/Filters.svelte';
	// Added new data to each object: appointmentType, sex, rates
	import therapistsData from '../data/therapist-data.json';
	import TherapistProfile from '../components/TherapistProfile.svelte';

	let sortOptions = [
		{ label: 'Name: A to Z', value: 'name-asc' },
		{ label: 'Name: Z to A', value: 'name-desc' },
		{ label: 'Rate: Low to High', value: 'rate-asc' },
		{ label: 'Rate: High to Low', value: 'rate-desc' },
		{ label: 'Year of experience: Low to High', value: 'exp-asc' },
		{ label: 'Year of experience: High to Low', value: 'exp-desc' },
		{ label: 'Next available date', value: 'next-date' }
	];

	let selectedSortOption = { label: 'Year of experience: High to Low', value: 'exp-desc' };

	function handleSortChange(option) {
		selectedSortOption = option;
	}

	let startIndex = 0;
	let itemsPerPage = 7; // Number of items to show at a time

	function scrollRight() {
		const newIndex = startIndex + itemsPerPage;
		startIndex = newIndex;
	}

	function scrollLeft() {
		const newIndex = startIndex - itemsPerPage;
		startIndex = Math.max(0, newIndex);
	}
</script>

<div
	class="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[6.25rem] lg-screens:px-40 py-4 sm:py-10 flex justify-between gap-6"
>
	<section class="max-w-[53.5rem] md:min-w-[53.5rem] lg-screens:min-w-[68.5rem] w-full">
		<!-- therapists section header -->
		<div class="flex sm:items-center justify-between flex-col sm:flex-row sm:mb-6">
			<p
				class="hidden sm:block text-primary-dark font-poppins text-[1.25rem] font-semibold leading-normal"
			>
				Let’s discover your next therapist
			</p>

			<p
				class="sm:hidden text-primary-dark font-poppins text-[1.25rem] font-semibold leading-normal"
			>
				Discover your next therapist
			</p>

			<div class="hidden sm:flex">
				<Dropdown
					options={sortOptions}
					selectedOption={selectedSortOption}
					onSelectionChange={handleSortChange}
				/>
			</div>

			<div class="flex justify-between gap-3 sm:hidden my-4">
				<button
					type="button"
					class="inline-flex w-full h-10 px-6 gap-2 flex-1 rounded-full py-2 bg-white shadow-md border border-stone-300 justify-center items-center"
					id="options-menu"
					aria-haspopup="true"
					aria-expanded="true"
				>
					Sort by
				</button>
				<button
					type="button"
					class="inline-flex w-full h-10 px-6 gap-2 flex-1 rounded-full py-2 bg-white shadow-md border border-stone-300 justify-center items-center"
					id="options-menu"
					aria-haspopup="true"
					aria-expanded="true"
				>
					Filter by
				</button>
			</div>
		</div>

		<!-- therapists section avatar -->
		<div
			class="relative min-h-auto w-full p-4 sm:p-8 rounded-lg sm:border sm:border-stroke-cards bg-warm sm:bg-white sm:shadow-md flex-col justify-start items-start gap-4 inline-flex overflow-x-auto sm:overflow-x-hidden"
		>
			<div class="text-primary-dark text-base font-semibold font-poppins">
				30 second introduction videos
			</div>
			<div class="flex">
				<div
					class="w-[3.75rem] h-[3.75rem] lg-screens:w-[6.25rem] lg-screens:h-[6.25rem] sm:w-20 sm:h-20 mr-5 lg-screens:mr-8 sm:mr-8"
				>
					<div class="w-full h-full bg-lime-300 rounded-full flex items-center justify-center">
						<button>
							<img src="assets/icons/rotate-cw.svg" alt="Refresh button" />
						</button>
					</div>
					<p
						class="text-primary-dark text-center mt-2 font-poppins text-[0.875rem] sm:text-1rem font-medium"
					>
						Refresh
					</p>
				</div>

				<div
					class="animate__animated animate__fadeInUp flex overflow-x-auto gap-5 lg-screens:gap-8 sm:gap-8"
				>
					{#each therapistsData.slice(startIndex, startIndex + itemsPerPage) as profile, index}
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

				<button
					class="hidden sm:inline-flex absolute top-1/2 transform scale-x-[-1] right-4 w-8 h-8 p-1 origin-top-left -rotate-90 bg-white bg-opacity-70 rounded-lg shadow backdrop-blur-sm flex-col justify-end items-center gap-2.5"
					on:click={startIndex + itemsPerPage >= therapistsData.length ? scrollLeft : scrollRight}
				>
					<img
						src="assets/icons/chevron-left.svg"
						style="transform: {startIndex + itemsPerPage >= therapistsData.length
							? `scaleY(-1)`
							: ``}"
						alt="Scroll button"
					/>
				</button>
			</div>
		</div>

		<!-- therapists section (profiles) -->
		{#each therapistsData as therapist}
			<TherapistProfile {therapist} />
		{/each}
	</section>

	<section
		class="hidden max-w-[22.5rem] md:min-w-[22.5rem] lg-screens:min-w-[30rem] sm:flex flex-col"
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

			<button>Clear all</button>
		</div>

		<!-- filter section options -->
		<Filters profiles={therapistsData} />
	</section>
</div>

<svelte:head>
	<title>Therapists Profiles</title>
</svelte:head>

<style>
	.animate__animated {
		animation-duration: 1s; /* Adjust duration as needed */
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
