<script>
	import Button from './Button.svelte';
	import { scrollToTopOrBottom, scrollToLeftOrRight } from '$lib/helpers';
	import dayjs from 'dayjs';

	export let therapist;

	// dummy calendar dates
	let calendarDates = [
		{
			day: 'Mon',
			value: '6',
			month: '09'
		},
		{
			day: 'Tue',
			value: '7',
			month: '0.9'
		},
		{
			day: 'Wed',
			value: '8',
			month: '0.9'
		},
		{
			day: 'Thurs',
			value: '9',
			month: '0.9'
		},
		{
			day: 'Fri',
			value: '10',
			month: '0.9'
		},
		{
			day: 'Sat',
			value: '11',
			month: '0.9'
		}
	];

	let times = [
		'9:00',
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00',
		'16:00',
		'17:00',
		'18:00'
	];

	// mock dummy disabled state
	function disabled(index, time) {
		return (
			(index === 0 && time === '11:00') ||
			(index === 0 && time === '12:00') ||
			(index === 1 && time === '9:00') ||
			(index === 2 && time === '10:00') ||
			(index === 2 && time === '11:00')
		);
	}

	let scrollDirection = -1; // 1 for right, -1 for left

	function handleScrollButtonClick() {
		scrollToLeftOrRight('calendarScrollContainer', scrollDirection);
	}
</script>

<section
	class="max-w-[25rem] md:min-w-[25rem] lg-screens:min-w-[31.1rem] flex flex-col sm:gap-6 gap-4"
>
	<!-- session rates -->
	<div
		class="min-h-auto w-full p-4 sm:p-8 rounded-2xl sm:border sm:border-stroke-cards bg-white sm:shadow-md flex-col items-start gap-4 sm:gap-6 inline-flex"
	>
		<div class="w-full flex justify-between items-center">
			<div class="w-full flex flex-col">
				<div class="flex">
					<s
						class="hidden sm:inline-flex text-stroke-dark font-poppins text-base font-medium leading-normal"
						>£{therapist?.rates?.amount} GBP</s
					>
					<span
						class="inline-flex sm:hidden text-primary-dark font-poppins text-[1.25rem] sm:text-[2.25rem] font-semibold leading-normal"
						>£{therapist?.rates?.amount} GBP</span
					>
				</div>
				<p
					class="hidden sm:block text-primary-dark font-poppins text-[1.25rem] sm:text-[2rem] lg-screens:text-[2.25rem] font-semibold leading-normal"
				>
					£23
				</p>
			</div>

			<div class="flex min-w-[70%] w-full gap-2 justify-end">
				<span
					class="sm:hidden inline-flex text-primary-dark font-poppins text-right text-[0.875rem] sm:text-[1rem] tracking-[-0.0175rem] font-medium sm:tracking-[-0.02rem]"
				>
					per individual session
				</span>
				<span
					class="hidden sm:inline-flex text-primary-dark font-poppins text-right text-[0.875rem] sm:text-[1rem] tracking-[-0.0175rem] font-medium sm:tracking-[-0.02rem]"
				>
					per individual session using Credits
				</span>
				<img src="assets/icons/chevron-left.svg" alt="arrow down icon" />
			</div>
		</div>

		<div
			class="w-full text-left lg:text-center flex sm:flex-col flex-row gap-1 justify-between sm:justify-start"
		>
			<div
				class="text-stroke-dark font-poppins text-[0.875rem] mb-1 sm:mb-0 sm:text-base font-medium leading-normal tracking-wide flex items-center"
			>
				<img
					src="assets/icons/calendar.svg"
					alt="calendar icon"
					class="hidden lg:inline-flex mr-2"
					style="filter: grayscale(100%) brightness(3);"
				/>
				Next available date
			</div>
			<div class="flex items-center">
				<span
					class="text-primary-dark font-poppins text-[0.875rem] mb-1 sm:mb-0 lg:text-[1.125rem] sm:text-[1rem] font-medium flex items-center"
					>{dayjs(therapist?.nextAvailableDate).isSame(dayjs(), 'day')
						? 'Today'
						: therapist?.nextAvailableDate}
					{therapist?.nextAvailableTime}</span
				>
			</div>
		</div>

		<div class="sm:block hidden w-full">
			<Button
				theme="tertiary"
				text="Book a free 15-min session"
				width="100%"
				style="padding: 0.5rem 1rem; box-shadow: none;"
			>
				<img
					slot="rightIcon"
					src={'assets/icons/arrow-left.svg'}
					alt="left arrow icon"
					style="filter: grayscale(100%) brightness(0);"
				/>
			</Button>
		</div>

		<div class="sm:hidden w-full flex justify-between items-center">
			<div class="inline-flex items-center">
				<img
					src="assets/icons/message-square.svg"
					alt="Message square icon"
					class="w-4 h-4 sm:w-6 sm:h-6"
				/><span class="text-primary-dark font-poppins text-[0.875rem] font-medium ml-2"
					>Ask a question</span
				>
			</div>
			<Button
				theme="secondary"
				text="Book now"
				style="padding: 0.5rem 1rem; box-shadow: none; min-width: 9rem"
			>
				<img slot="rightIcon" src={'assets/icons/arrow-left.svg'} alt="left arrow icon" />
			</Button>
		</div>
	</div>

	<!-- video play -->
	<div
		class="relative h-[20rem] sm:h-[36.75rem] w-full rounded-2xl flex-col gap-4 sm:gap-6 inline-flex justify-center items-center"
	>
		<img
			src="https://s3-alpha-sig.figma.com/img/6276/fa2c/55511cc5a5342527ab62f21ef5ac7fda?Expires=1704672000&Signature=mrna3WDenVQhJDndKe3f5qlD~2b1wcSsrnUzfWQZyTFTzIidsxMt8qCSdUvwkGMf-~T0daF33BJ8lpz74h6kM4bDj23ZcOE9hrg6HuyLTRFyPPyXYLGBwzJ3FmHC~obVdjmZV5x0R7gOelZYhhZSD3Q7bMH7hw-avLAeY~E11UlJEcAuGmCxD0Y7-cOCmeK6dPBwF2~spKfeZed9P-kM9UcF2Txdiir1EDTo5k2mOoAP61r2NSN78dnGptWIcEXcL9aeqRLbyqrgwU4pkTn~NISoyg9nDyT-7IBbdFjjn52B-5IyieXBOJYAp3TZL8qFaOpui0h7~UdPKKJvRxBCOA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
			alt="Video play"
			class="w-full h-full rounded-2xl object-cover"
		/>

		<img src="assets/icons/play-video.svg" alt="Video play" class="absolute" />
	</div>

	<!-- book a session -->
	<div
		class="min-h-auto w-full p-4 sm:p-8 rounded-2xl sm:border sm:border-stroke-cards bg-white sm:shadow-md flex-col items-start gap-4 sm:gap-6 inline-flex"
	>
		<div class="w-full flex items-center justify-between">
			<h3
				class="text-primary-dark font-poppins text-base sm:text-[1.125rem] font-semibold leading-normal"
			>
				Book a session with {therapist?.firstName}
			</h3>
		</div>

		<div class="flex gap-2 items-start justify-start">
			<img
				src="assets/icons/alert-circle.svg"
				alt="alert icon"
				class="w-[1rem] h-[1rem] sm:w-[1.25rem] sm:h-[1.25rem]"
			/>
			<p
				class="text-stroke-dark font-poppins sm:text-[0.875rem] text-[0.75rem] font-semibold leading-normal"
			>
				All times listed are in your local timezone
			</p>
		</div>

		<div class="relative w-full">
			<button
				class="hidden sm:inline-flex absolute top-[50%] transform scale-x-[-1] right-0 w-8 h-8 p-1 origin-top-left -rotate-90 rounded-lg border border-solid border-stroke-medium bg-white shadow-md backdrop-blur-2 flex-col justify-end items-center gap-2.5 z-[100]"
				on:click={() => handleScrollButtonClick()}
			>
				<img src="assets/icons/chevron-left.svg" alt="Scroll button" />
			</button>

			<div
				class="max-h-[25rem] w-full flex flex-row gap-4 sm:gap-6 overflow-auto sm:overflow-hidden"
				id="calendarScrollContainer"
			>
				{#each calendarDates as calendar, index}
					<div class="w-full flex flex-col gap-4 sm:gap-6">
						<div
							class="{index === 1 &&
								'selected'} w-[6.25rem] h-[3.75rem] rounded-[1rem] py-2 px-6 bg-stroke-cards flex flex-col items-center justify-center"
						>
							<span>{calendar.value}.{calendar.month}</span> <span>{calendar.day}</span>
						</div>

						<div class="w-full flex flex-col gap-4 sm:gap-6">
							{#each times as time}
								<div
									class="{disabled(index, time)
										? 'disabled'
										: ''} cursor-pointer w-[6.25rem] h-[2.25rem] rounded-[1rem] py-2 px-6 bg-white border border-stroke-medium flex items-center justify-center"
								>
									{time}
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<button
				class="hidden sm:inline-flex absolute bottom-[10%] transform scale-x-[-1] right-[50%] w-8 h-8 p-1 rounded-lg border border-solid border-stroke-medium bg-white shadow-md backdrop-blur-2 flex-col justify-end items-center gap-2.5 z-[100]"
				on:click={() => scrollToTopOrBottom('calendarScrollContainer')}
			>
				<img src="assets/icons/chevron-left.svg" alt="Scroll button" />
			</button>

			<button class="flex m-auto items-center text-accent-dark-blue text-base font-semibold"
				><img src="assets/icons/calendar-blue.svg" alt="calendar icon" class="w-5 h-5 mr-2" /> Open full
				calendar
			</button>
		</div>

		<div class="w-full h-[0.0625rem] bg-stroke-cards my-1 sm:my-2"></div>

		<div class="w-full">
			<h3
				class="text-primary-dark font-poppins text-base sm:text-[1.125rem] leading-[0.9rem] font-semibold"
			>
				Your selection
			</h3>

			<div class="w-full mt-4 flex items-end justify-between">
				<p class="text-primary-dark font-poppins text-[0.75rem] sm:text-base font-medium text-wrap">
					Friday, <br /> September 6, 2023
				</p>

				<p class="text-primary-dark font-poppins text-[0.75rem] sm:text-base font-medium text-wrap">
					10:00-10:50 am
				</p>
			</div>

			<div class="w-full mt-4 sm:mt-8">
				<Button text="Book now" theme="secondary" width="100%">
					<img slot="rightIcon" src={'assets/icons/arrow-left.svg'} alt="left arrow icon" />
				</Button>
			</div>
		</div>
	</div>

	<!-- cancellation policy -->
	<div
		class="min-h-auto w-full p-4 sm:p-8 rounded-2xl sm:border sm:border-stroke-cards bg-white sm:shadow-md flex-col items-start gap-4 sm:gap-6 inline-flex"
	>
		<div class="w-full flex items-center justify-between">
			<h3
				class="text-primary-dark font-poppins text-base sm:text-[1.125rem] font-semibold leading-normal"
			>
				Cancellation policy
			</h3>

			<h3
				class="text-[#FD813B] font-poppins text-base sm:text-[1.125rem] font-semibold leading-normal"
			>
				Within 48 hours
			</h3>
		</div>

		<p
			class="text-primary-dark font-poppins text-[0.75rem] sm:text-base font-medium leading-normal"
		>
			Balanced flexibility with reasonable refunds for your convenience within 48 hours prior the
			session time
		</p>

		<div class="flex gap-2 items-start justify-start">
			<img
				src="assets/icons/alert-circle.svg"
				alt="alert icon"
				class="w-[1rem] h-[1rem] sm:w-[1.25rem] sm:h-[1.25rem]"
			/>
			<p
				class="text-stroke-dark font-poppins sm:text-[0.875rem] text-[0.75rem] font-semibold leading-normal"
			>
				<a href="/" class="text-accent-dark-blue">Click here</a> to read our cancellation and payment
				terms and conditions
			</p>
		</div>
	</div>
</section>

<style>
	.selected {
		background-color: #bfd962;
	}

	.disabled {
		color: #dddad0;
		border: none;
		cursor: not-allowed;
	}
</style>
