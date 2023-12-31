<script>
	import { onMount } from 'svelte';
	import therapistsData from '../../data/therapist-data.json';
	import {
		capitalizeFirstLetter,
		getGMTOffset,
		getCountryAcronym,
		scrollToTheTop
	} from '$lib/helpers';
	import { isLoading } from '$lib/store';
	import { page } from '$app/stores';

	// Get therapist ID from the URL
	let therapistId = $page.url?.pathname?.substring(1);

	let therapist = null;

	function getCurrentProfile() {
		isLoading.set(() => true);
		therapist = therapistsData.find((t) => t.id === therapistId);

		// Set loading state to false
		setTimeout(() => {
			isLoading.set(false);
		}, 200);
	}

	onMount(() => {
		getCurrentProfile();

		setTimeout(() => {
			// Scroll to the top of the page
			scrollToTheTop();
		}, 300);
	});

	console.log({ therapist, therapistId, id: $page.url.pathname.substring(1) });
</script>

<div
	class="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[6.25rem] lg-screens:px-[13.75rem] py-4 sm:py-10 flex justify-between gap-6"
>
	<section
		class="max-w-[51rem] md:min-w-[51rem] lg-screens:min-w-[59.8rem] w-full flex flex-col gap-6"
	>
		<!-- therapist details -->
		<div
			class="relative min-h-auto w-full p-4 sm:p-8 rounded-lg sm:border sm:border-stroke-cards bg-white sm:shadow-md flex-col justify-start items-start gap-4 inline-flex"
		>
			<div class="w-full flex justify-between items-center">
				<div class="flex gap-4 sm:gap-6 items-center">
					<div
						class="relative w-[5rem] h-[5rem] rounded-full sm:w-[5rem] sm:h-[5rem] lg-screens:w-[6.25rem] lg-screens:h-[6.25rem] inline-flex items-center justify-center"
					>
						<img
							src={therapist?.avatarUrl}
							alt={`Avatar of ${therapist?.firstName} ${therapist?.lastName}`}
							class="absolute w-full h-full rounded-full object-cover"
						/>
					</div>

					<h2
						class="text-primary-dark font-poppins text-[1.125rem] lg-screens:text-[1.75rem] mb-0 sm:text-[1.5rem] sm:mb-1 font-semibold leading-5 inline-flex gap-2 flex-col sm:flex-row"
					>
						<span>{capitalizeFirstLetter(therapist?.firstName)}</span>
						<span>{capitalizeFirstLetter(therapist?.lastName)}</span>
					</h2>
				</div>

				<div class="inline-flex items-center">
					<div class="hidden sm:inline-flex items-center mr-6">
						<img
							src="assets/icons/check.svg"
							alt="check icon"
							class="sm:w-6 sm:h-6 w-[1.125rem] h-[1.125rem]"
						/><span
							class="text-accent-dark-blue font-poppins text-base leading-normal font-medium ml-2"
							>verified by emote Care</span
						>
					</div>

					<div
						class="lg-screens:w-[3.25rem] lg-screens:h-[3.125rem] sm:w-12 sm:h-12 p-4 flex justify-center items-center rounded-full border border-solid border-stroke-medium bg-white shadow-md"
					>
						<img
							src="assets/icons/heart.svg"
							alt="check icon"
							class="sm:w-6 sm:h-6 w-[1.125rem] h-[1.125rem]"
						/>
					</div>
				</div>
			</div>

			<div class="w-full flex justify-between items-center">
				<div class="flex flex-col">
					<div class="inline-flex items-center gap-2 mt-2">
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

					<div class="inline-flex items-center gap-2 mt-1">
						<div class="inline-flex items-center gap-2">
							<img
								src="assets/icons/map-pin.svg"
								alt="map icon"
								class="h-[0.9375rem] w-[0.9375rem] sm:h-5 sm:w-5"
							/>
							<p
								class="text-stroke-dark font-poppins text-[0.75rem] sm:text-[1rem] font-medium leading-5"
							>
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

				<div class="hidden sm:inline-flex items-center">
					<img
						src="assets/icons/message-square.svg"
						alt="Message square icon"
						class="w-4 h-4 sm:w-6 sm:h-6"
					/><span class="text-primary-dark font-poppins text-base font-medium ml-2"
						>Ask a question</span
					>
				</div>
			</div>
		</div>

		<!-- therapist bio -->
		<div
			class="relative min-h-auto w-full p-4 sm:p-8 rounded-lg sm:border sm:border-stroke-cards bg-white sm:shadow-md flex-col justify-start items-start gap-4 inline-flex"
		>
			<h4 class="text-primary-dark font-poppins text-lg font-semibold leading-140">My bio</h4>

			<p
				class="text-primary-dark font-poppins text-[0.875rem] font-normal sm:text-base sm:font-medium leading-140 tracking-tighter mb-2"
			>
				Welcome to my therapy profile!
			</p>

			<p
				class="text-primary-dark font-poppins text-[0.875rem] font-normal sm:text-base sm:font-medium leading-140 tracking-tighter mb-2"
			>
				I'm {therapist?.firstName}, an experienced therapist dedicated to supporting individuals
				through life's challenges. With 19 years of expertise, I specialize in areas such as
				anxiety, depression, and relationship issues. My approach integrates evidence-based
				therapies with a client-centered focus, tailored to meet your unique needs.
			</p>

			<p
				class="text-primary-dark font-poppins text-[0.875rem] font-normal sm:text-base sm:font-medium leading-140 tracking-tighter"
			>
				In our sessions, I provide a safe and non-judgmental space for you to explore your thoughts
				and emotions. Together, we'll work towards building resilience, enhancing coping skills, and
				achieving positive changes.
			</p>

			<p
				class="inline-flex items-center text-accent-dark-blue font-poppins text-[0.875rem] font-medium sm:text-base sm:font-semibold leading-140 tracking-tighter mt-2"
			>
				Read more <img src="assets/icons/chevron-left.svg" alt="Chevron down icon" class="ml-2" />
			</p>
		</div>
	</section>

	<section
		class="hidden max-w-[25rem] md:min-w-[25rem] lg-screens:min-w-[31.1rem] sm:flex flex-col"
	></section>
</div>
