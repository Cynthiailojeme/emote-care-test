<script>
	import { capitalizeFirstLetter, getGMTOffset } from '$lib/helpers';
	import dayjs from 'dayjs';
	import Button from './Button.svelte';

	export let therapist;

	const lgScreenDisplay = therapist?.profile?.therapyAreas?.slice(0, 2).length;
	const displayedTherapistAreas =
		therapist?.profile?.therapyAreas?.length <= 3 ? lgScreenDisplay : 1;
	const undisplayedTherapistAreas =
		therapist?.profile?.therapyAreas.length - displayedTherapistAreas;

	function getCountryAcronym(country) {
		const countryMappings = {
			'United States': 'USA',
			'United Kingdom': 'UK'
		};

		const countryName = countryMappings[country] || country;
		return countryName;
	}
</script>

<div
	class="flex flex-col sm:flex-row mt-6 shadow-md rounded-2xl sm:shadow-none transform hover:scale-102"
>
	<!-- therapist profile information -->
	<div
		class="p-4 sm:p-8 bg-white border-stroke-cards w-full shadow-none sm:shadow-md rounded-t-2xl sm:rounded-2xl"
	>
		<div class="flex justify-between items-start">
			<div class="flex gap-4 sm:gap-6 items-center">
				<div
					class="relative w-[3.75rem] h-[3.75rem] rounded-full sm:w-[5.5625rem] sm:h-[5.5625rem] inline-flex items-center justify-center"
				>
					<img
						src={therapist.avatarUrl}
						alt={`Avatar of ${therapist.firstName} ${therapist.lastName}`}
						class="absolute w-full h-full rounded-full object-cover"
					/>
					<img
						src={'assets/images/video-play.png'}
						alt={`Play profile video ${therapist.firstName} ${therapist.lastName}`}
						class="absolute bottom-0 right-0 cursor-pointer w-[18px] h-[18px] sm:w-5 sm:h-5"
					/>
				</div>

				<div class="flex flex-col">
					<h2
						class="text-primary-dark font-poppins text-[1.125rem] lg-screens:text-[1.5rem] mb-0 sm:text-[1.375rem] sm:mb-1 font-semibold leading-5 inline-flex gap-2 flex-col sm:flex-row"
					>
						<span>{capitalizeFirstLetter(therapist?.firstName)}</span>
						<span>{capitalizeFirstLetter(therapist?.lastName)}</span>
					</h2>

					<div class="hidden sm:inline-flex items-center gap-2 mt-2">
						<img
							src="assets/icons/check-circle.svg"
							alt="favorite icon"
							class="w-4 h-4 sm:w-5 sm:h-5"
						/>
						<p
							class="text-primary-dark font-poppins text-[0.75rem] lg-screens:text-[1.125rem] sm:text-[1rem] font-medium leading-5"
						>
							{therapist?.profile?.yearsOfExperience
								? `${therapist?.profile?.yearsOfExperience} year${
										therapist?.profile?.yearsOfExperience > 0 && 's'
									} of experience`
								: 'N/A'}
						</p>
					</div>

					<div class="hidden sm:inline-flex items-center gap-2 mt-1">
						<div class="inline-flex items-center gap-2">
							<img
								src="assets/icons/map-pin.svg"
								alt="map icon"
								class="h-[0.9375rem] w-[0.9375rem] sm:h-5 sm:w-5"
							/>
							<p>
								{getCountryAcronym(therapist?.demographic?.location) ?? 'N/A'},
								{getGMTOffset(therapist?.demographic?.location)}
							</p>
						</div>

						<div class="inline-flex items-center gap-2">
							<img
								src="assets/icons/globe.svg"
								alt="globe icon"
								class="h-[0.9375rem] w-[0.9375rem] sm:h-5 sm:w-5"
							/>
							<p
								class="text-stroke-dark font-poppins text-[0.75rem] sm:text-[1rem] font-medium leading-5"
							>
								{therapist?.demographic?.mainLanguage ?? 'N/A'}
							</p>
						</div>
					</div>
				</div>
			</div>

			<img
				src="assets/icons/heart.svg"
				alt="favorite icon"
				class="w-4 h-4 sm:w-[1.375rem] sm:h-[1.19rem]"
			/>
		</div>

		<div class="flex item-center flex-col">
			<div class="sm:hidden inline-flex items-center gap-2 mt-4 sm:mt-0">
				<img
					src="assets/icons/check-circle.svg"
					alt="favorite icon"
					class="w-4 h-4 sm:w-5 sm:h-5"
				/>
				<p
					class="text-primary-dark font-poppins text-[0.75rem] sm:text-[1rem] font-medium leading-5"
				>
					{therapist?.profile?.yearsOfExperience
						? `${therapist?.profile?.yearsOfExperience} years of experience`
						: 'N/A'}
				</p>
			</div>

			<div class="sm:hidden inline-flex items-center gap-2 mt-1">
				<div class="inline-flex items-center gap-2">
					<img
						src="assets/icons/map-pin.svg"
						alt="map icon"
						class="h-[0.9375rem] w-[0.9375rem] sm:h-5 sm:w-5"
					/>
					<p
						class="text-stroke-dark font-poppins text-[0.75rem] sm:text-[1rem] font-medium leading-5"
					>
						{getCountryAcronym(therapist?.demographic?.location) ?? 'N/A'}, {getGMTOffset(
							therapist?.demographic?.location
						)}
					</p>
				</div>

				<div class="sm:hidden inline-flex items-center gap-2">
					<img
						src="assets/icons/globe.svg"
						alt="globe icon"
						class="h-[0.9375rem] w-[0.9375rem] sm:h-5 sm:w-5"
					/>
					<p
						class="text-stroke-dark font-poppins text-[0.75rem] sm:text-[1rem] font-medium leading-5"
					>
						{therapist?.demographic?.mainLanguage ?? 'N/A'}
					</p>
				</div>
			</div>
		</div>

		<p
			class="mt-4 mb-2 overflow-hidden line-clamp-2 max-h-[2.75rem] sm:max-h-[3rem] sm:my-6 text-primary-dark font-poppins text-[0.875rem] sm:text-base font-normal sm:leading-[1.25rem] tracking[-0.02rem]"
		>
			{therapist?.profile?.bio}
		</p>

		<div class="sm:flex gap-6">
			<div class="flex gap-2 lg-screens:gap-0">
				<div class="hidden lg-screens:block">
					{#if therapist?.profile?.therapyAreas?.length <= 3}
						{#each therapist?.profile?.therapyAreas?.slice(0, 2) as area}
							<div
								class="inline-flex mr-2 bg-stroke-cards w-auto px-2 sm:px-4 py-1 sm:bg-accent-green-light-bg text-primary-dark font-poppins text-[0.75rem] sm:text-base font-normal leading-normal rounded-2xl"
							>
								{area}
							</div>
						{/each}
					{:else}
						<div
							class="lg-screens:mr-2 bg-stroke-cards w-auto px-2 sm:px-4 py-1 sm:bg-accent-green-light-bg text-primary-dark font-poppins text-[0.75rem] sm:text-base font-normal leading-normal rounded-2xl"
						>
							{therapist?.profile?.therapyAreas[0]}
						</div>
					{/if}
				</div>

				<div
					class="lg-screens:hidden bg-stroke-cards w-auto px-2 sm:px-4 py-1 sm:bg-accent-green-light-bg text-primary-dark font-poppins text-[0.75rem] sm:text-base font-normal leading-normal rounded-2xl"
				>
					{therapist?.profile?.therapyAreas[0]}
				</div>
				{#if undisplayedTherapistAreas > 0}
					<div
						class="bg-stroke-cards w-auto px-2 sm:px-4 py-1 sm:bg-accent-green-light-bg text-primary-dark font-poppins text-[0.75rem] sm:text-base font-normal leading-normal rounded-2xl"
					>
						<span class="inine-flex sm:hidden">Show</span> +{undisplayedTherapistAreas}
					</div>
				{/if}
			</div>

			<button
				type="button"
				class="text-accent-dark-blue font-poppins text-[0.875rem] mt-4 sm:text-base sm:mt-0"
				><a href="/{therapist?.id}"
					>View <span class="hidden lg-screens:inline-flex">full</span> profile</a
				></button
			>
		</div>
	</div>

	<!-- therapist profile session rates -->
	<div
		class="p-4 pt-0 sm:p-8 bg-white sm:border-stroke-cards rounded-b-2xl shadow-none sm:shadow-md sm:rounded-2xl sm:min-w-[17.5rem] flex flex-col sm:justify-center"
	>
		<div class="flex flex-row gap-4 sm:flex-col">
			<div class="text-left sm:text-center">
				<p
					class="text-primary-dark text-base font-semibold mb-1 sm:mb-0 font-poppins leading-[1.3125rem] lg-screens:text-[1.75rem] sm:text-[1.375rem] sm:font-medium"
				>
					<span class="hidden sm:inline-flex">£{therapist.rates.amount} GBP</span>
					<span class="sm:hidden inline-flex">£{therapist.rates.amount}.00</span>
				</p>
				<p
					class="hidden text-primary-dark font-poppins text-base font-medium leading-normal tracking-tight sm:block"
				>
					per session
				</p>
				<p class="text-stroke-dark font-poppins text-xs font-medium leading-normal sm:hidden">
					per adult session
				</p>
			</div>

			<div class="block w-[0.0625rem] h-[2.1875rem] bg-gray-300 sm:hidden" />

			<div class="text-left sm:text-center">
				<h5
					class="text-stroke-dark font-poppins text-[0.75rem] mb-1 sm:mb-0 sm:text-base font-medium leading-normal tracking-wide"
				>
					Next available <span class="inline-flex sm:hidden">date</span>
				</h5>
				<div class="flex items-center justify-center">
					<img
						src="assets/icons/calendar.svg"
						alt="calendar icon"
						class="hidden sm:inline-flex mr-2"
					/>
					<span
						>{dayjs(therapist?.nextAvailableDate).isSame(dayjs(), 'day')
							? 'Today'
							: therapist?.nextAvailableDate}
						{therapist?.nextAvailableTime}</span
					>
				</div>
			</div>
		</div>

		<div class="mt-4 sm:mt-6 w-full">
			<Button theme="secondary" text="Book now" width="inherit">
				<img slot="rightIcon" src={'assets/icons/arrow-left.svg'} alt="left arrow icon" />
			</Button>
		</div>
	</div>
</div>

<style>
	.hover\:scale-102:hover {
		transform: scale(1.02);
		transition: transform 0.3s ease;
	}
</style>
