<script>
	import { onMount } from 'svelte';
	import therapistsData from '../../data/therapist-data.json';
	import {
		capitalizeFirstLetter,
		getGMTOffset,
		getCountryAcronym,
		scrollToTheTop,
		truncateText
	} from '$lib/helpers';
	import { isLoading } from '$lib/store';
	import { page } from '$app/stores';
	import Loader from '../../components/Loader.svelte';
	import Button from '../../components/Button.svelte';
	import SingleProfileRight from '../../components/SingleProfileRight.svelte';
	import SingleProfileLeft from '../../components/SingleProfileLeft.svelte';

	// Get therapist ID from the URL
	let therapistId = $page.url?.pathname?.substring(1);

	let therapist = null;
	let specialties = [];
	let therapyTypes = [];
	let showAll = false;

	let bioInfo = ['Cisgender', 'Athiest', 'White'];

	function getCurrentProfile() {
		isLoading.set(() => true);
		therapist = therapistsData.find((t) => t.id === therapistId);
		specialties = therapist?.profile?.therapyAreas;
		therapyTypes = therapist?.profile?.therapyCategories;
		bioInfo.unshift(therapist?.sex);
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
</script>

<div
	class="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[6.25rem] lg-screens:px-[13.75rem] py-4 sm:py-10 flex justify-between lg:flex-row flex-col gap-6"
>
	{#if $isLoading && !therapist}
		<Loader />
	{/if}

	{#if !$isLoading && !therapist}
		<p
			class="mt-6 text-primary-dark font-poppins text-[1rem] lg-screens:text-[1.375rem] sm:text-[1.125rem] mb-1 font-medium leading-5"
		>
			No matching profile was found
		</p>
	{/if}

	{#if !$isLoading && therapist}
		<section
			class="max-w-[51rem] md:w-full lg:min-w-[51rem] lg-screens:min-w-[59.8rem] w-full flex flex-col sm:gap-6 gap-4"
		>
			<!-- therapist details -->
			<div
				class="min-h-auto w-full p-4 sm:p-8 pb-0 rounded-2xl sm:border sm:border-stroke-cards sm:bg-white bg-warm sm:shadow-md flex-col justify-start items-start sm:gap-4 gap-0 inline-flex"
			>
				<div class="w-full flex justify-between items-center">
					<div class="flex gap-0 sm:gap-6 items-center flex-col sm:flex-row m-auto sm:m-0">
						<div
							class="sm:hidden absolute w-full h-[3.5rem] top-[57px] left-0 right-0 flex justify-between items-center bg-accent-green-light-brand p-4"
						>
							<div
								class=" text-primary-dark font-poppins font-medium text-[0.75rem] leading-5 inline-flex items-center"
							>
								<a href={'/'} class="inline-flex">
									<img
										src="assets/icons/arrow-left.svg"
										alt="back icon"
										class="w-5 h-5"
										style="transform: scaleX(-1); filter: grayscale(100%) brightness(0);"
									/>

									<span class="ml-[0.5rem]">Go back</span>
								</a>
							</div>
						</div>

						<div
							class="hidden relative top-[-20px] sm:top-0 w-[5rem] h-[5rem] rounded-full sm:w-[5rem] sm:h-[5rem] lg-screens:w-[6.25rem] lg-screens:h-[6.25rem] sm:inline-flex items-center justify-center"
						>
							<img
								src={therapist?.avatarUrl}
								alt={`Avatar of ${therapist?.firstName} ${therapist?.lastName}`}
								class="absolute w-full h-full rounded-full object-cover"
							/>
						</div>

						<div
							class="sm:hidden bg-gradient-to-t from-transparent to-white relative top-[-25px] w-[6rem] h-[6rem] rounded-full flex items-center justify-center"
						>
							<div
								class="relative top-0 w-[5rem] h-[5rem] rounded-full sm:w-[5rem] sm:h-[5rem] lg-screens:w-[6.25rem] lg-screens:h-[6.25rem] inline-flex items-center justify-center"
							>
								<img
									src={therapist?.avatarUrl}
									alt={`Avatar of ${therapist?.firstName} ${therapist?.lastName}`}
									class="absolute w-full h-full rounded-full object-cover"
								/>
							</div>
						</div>

						<h2
							class="relative top-[-20px] sm:top-0 text-primary-dark font-poppins text-[1.125rem] lg-screens:text-[1.75rem] mb-0 sm:text-[1.5rem] sm:mb-1 font-semibold leading-5 inline-flex gap-2"
						>
							<span>{capitalizeFirstLetter(therapist?.firstName)}</span>
							<span>{capitalizeFirstLetter(therapist?.lastName)}</span>
						</h2>
					</div>

					<div class="hidden sm:inline-flex items-center">
						<div class="sm:inline-flex items-center mr-6">
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
							class="lg-screens:w-[3.25rem] lg-screens:h-[3.125rem] sm:w-12 sm:h-12 h-[2.5rem] w-[2.5rem] sm:p-2 p-1 flex justify-center items-center rounded-full border border-solid border-stroke-medium bg-white shadow-md"
						>
							<img
								src="assets/icons/heart.svg"
								alt="favorite icon"
								class="sm:w-5 sm:h-5 w-[1.125rem] h-[1.125rem]"
							/>
						</div>
					</div>
				</div>

				<div class="w-full flex justify-between items-center relative top-[-20px] sm:top-0">
					<div class="flex flex-col m-auto mt-1 gap-1 sm:gap-0 sm:m-0 sm:mt-0">
						<div class="inline-flex items-center gap-2 m-auto sm:m-0 sm:mt-2">
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

						<div class="sm:hidden inline-flex items-center m-auto sm:m-0">
							<img
								src="assets/icons/check.svg"
								alt="check icon"
								class="sm:w-6 sm:h-6 w-[1.125rem] h-[1.125rem]"
							/><span
								class="text-accent-dark-blue font-poppins text-[0.75rem] sm:text-base leading-normal font-medium ml-2"
								>verified by emote Care</span
							>
						</div>

						<div class="inline-flex items-center gap-2 m-auto sm:mt-1">
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

				<div class="sm:hidden w-full inline-flex items-center justify-around">
					<Button
						theme="tertiary"
						text="Book a free 15-min session"
						style="padding: 0.5rem 1rem; box-shadow: none;"
					>
						<img
							slot="rightIcon"
							src={'assets/icons/arrow-left.svg'}
							alt="Arrow left icon"
							style="filter: grayscale(0%); brightness(0);"
						/>
					</Button>

					<div
						class="lg-screens:w-[3.25rem] lg-screens:h-[3.125rem] sm:w-12 sm:h-12 h-[2.5rem] w-[2.5rem] sm:p-2 p-1 flex justify-center items-center rounded-full border border-solid border-stroke-medium bg-white shadow-md"
					>
						<img
							src="assets/icons/heart.svg"
							alt="favorite icon"
							class="sm:w-5 sm:h-5 w-[1.125rem] h-[1.125rem]"
						/>
					</div>
				</div>
			</div>

			<!-- therapist bio -->
			<div
				class="relative min-h-auto w-full p-4 sm:p-8 rounded-2xl sm:border sm:border-stroke-cards bg-white sm:shadow-md flex-col justify-start items-start inline-flex"
			>
				<h4 class="text-primary-dark font-poppins text-lg font-semibold leading-140">My bio</h4>

				<p
					class="text-primary-dark font-poppins text-[0.875rem] font-normal sm:text-base sm:font-medium leading-140 tracking-tighter mt-6"
				>
					Welcome to my therapy profile!
				</p>

				<p
					class="hidden sm:block text-primary-dark font-poppins text-[0.875rem] font-normal sm:text-base sm:font-medium leading-140 tracking-tighter mt-6"
				>
					I'm {therapist?.firstName}, an experienced therapist dedicated to supporting individuals
					through life's challenges. With 19 years of expertise, I specialize in areas such as
					anxiety, depression, and relationship issues. My approach integrates evidence-based
					therapies with a client-centered focus, tailored to meet your unique needs.
				</p>

				<p
					class="block sm:hidden text-primary-dark font-poppins text-[0.875rem] font-normal sm:text-base sm:font-medium leading-140 tracking-tighter"
				>
					{truncateText(
						`I'm ${therapist?.firstName}, an experienced therapist dedicated to supporting individuals
					through life's challenges. With 19 years of expertise, I specialize in areas such as
					anxiety, depression, and relationship issues. My approach integrates evidence-based
					therapies with a client-centered focus, tailored to meet your unique needs.`,
						showAll ? 100 : 28
					)}
				</p>

				<p
					class="{showAll
						? 'block'
						: 'hidden'} sm:block text-primary-dark font-poppins text-[0.875rem] font-normal sm:text-base sm:font-medium leading-140 tracking-tighter mt-6"
				>
					In our sessions, I provide a safe and non-judgmental space for you to explore your
					thoughts and emotions. Together, we'll work towards building resilience, enhancing coping
					skills, and achieving positive changes.
				</p>

				<p
					class="{showAll
						? 'block'
						: 'hidden'} text-primary-dark font-poppins text-[0.875rem] font-normal sm:text-base sm:font-medium leading-140 tracking-tighter mt-6"
				>
					Availability: I offer flexible scheduling to accommodate your busy life. Whether you're
					seeking support for a specific issue or aiming for
				</p>

				<p
					class="{showAll
						? 'block'
						: 'hidden'} text-primary-dark font-poppins text-[0.875rem] font-normal sm:text-base sm:font-medium leading-140 tracking-tighter mt-6"
				>
					Let's Connect: Taking the first step towards therapy is a courageous decision. Feel free
					to reach out, and we can explore how we can work together to achieve your goals.
				</p>

				<p
					class="{showAll
						? 'block'
						: 'hidden'} text-primary-dark font-poppins text-[0.875rem] font-normal sm:text-base sm:font-medium leading-140 tracking-tighter mt-6"
				>
					Thank you for considering me as your partner in this transformative process. I look
					forward to the opportunity to collaborate with you on your path to healing and
					self-discovery. Warm regards, {capitalizeFirstLetter(therapist?.firstName)}.
				</p>

				<button
					class="inline-flex items-center text-accent-dark-blue cursor-pointer font-poppins text-[0.875rem] font-medium sm:text-base sm:font-semibold leading-140 tracking-tighter my-4 sm:my-6"
					on:click={() => (showAll = !showAll)}
				>
					{showAll ? 'Collapse' : 'Read more'}
					<img
						src="assets/icons/chevron-left.svg"
						alt="Chevron down icon"
						style="transform: {showAll ? 'scaleY(-1)' : ''}"
						class="ml-2"
					/>
				</button>

				<div class="flex items-center gap-2 sm:gap-4 flex-wrap">
					{#each bioInfo as info}
						<div
							class="flex px-4 py-1 justify-center items-center rounded-full bg-stroke-cards text-primary-dark font-poppins text-[0.75rem] sm:text-base font-medium"
						>
							{info}
						</div>
					{/each}
				</div>

				<div class="w-full h-[0.0625rem] bg-stroke-cards my-4 sm:my-8"></div>

				<div>
					<h3
						class="mb-4 sm:mb-8 text-primary-dark font-poppins text-base sm:text-[1.125rem] font-semibold leading-140"
					>
						Specialities and expertise
					</h3>
					<div class="flex items-center gap-2 sm:gap-4 flex-wrap">
						{#each specialties as specialty}
							<div
								class="flex px-4 py-1 justify-center items-center rounded-full bg-stroke-cards tracking-[-0.02rem] text-primary-dark font-poppins text-[0.75rem] sm:text-base font-medium"
							>
								{specialty}
							</div>
						{/each}
					</div>
				</div>

				<div class="w-full h-[0.0625rem] bg-stroke-cards my-4 sm:my-8"></div>

				<div
					class="w-full flex sm:flex-row flex-col justify-start sm:justify-between sm:items-center mb-4 sm:mb-8"
				>
					<h3
						class="text-primary-dark font-poppins text-base sm:text-[1.125rem] font-semibold leading-140"
					>
						Types of therapy
					</h3>
					<div class="inline-flex items-center mt-2 sm:mt-0">
						<img
							src="assets/icons/play-circle.svg"
							alt="play types of therapy video"
							class="w-4 h-4 sm:w-6 sm:h-6"
						/>
						<span class="ml-2">What is types of therapy</span>
					</div>
				</div>

				<div class="mb-4 sm:mb-8">
					<div class="flex items-center gap-2 sm:gap-4 flex-wrap">
						{#each therapyTypes as type}
							<div
								class="flex px-4 py-1 justify-center items-center rounded-full bg-stroke-cards underline text-primary-dark font-poppins text-[0.75rem] sm:text-base font-medium"
							>
								{type}
							</div>
						{/each}
					</div>
				</div>
			</div>

			<SingleProfileLeft />
		</section>

		<!-- profile right -->
		<SingleProfileRight {therapist} />
	{/if}
</div>
