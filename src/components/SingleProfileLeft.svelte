<script>
	import { scrollToLeftOrRight } from '$lib/helpers';

	let overview = [
		{
			icon: 'assets/images/join.png',
			title: 'Joined emote Care',
			detail: '1 year ago'
		},
		{
			icon: 'assets/images/emote-illustration.svg',
			title: 'Respond time',
			detail: '4 hours'
		},
		{
			icon: 'assets/images/emote-illustration-1.svg',
			title: 'Total sessions',
			detail: '123 session'
		},
		{
			icon: 'assets/images/refresh-symbol.png',
			title: 'Return clients',
			detail: '23 clients'
		}
	];

	let rates = [
		{
			age_range: 'FREE',
			detail: '15-min free consultation',
			amount: '0'
		},
		{
			age_range: '18+',
			detail: 'Adults/18+ Individual 50-min session',
			amount: '64'
		},
		{
			age_range: '16-18',
			detail: 'Young adults (16-18)',
			amount: '80',
			coming_soon: true
		}
	];

	let clientFocus = [
		{
			theme: '#BFD962',
			title: 'Age',
			detail: 'Children, Preteen, Teen, Adults, Elders'
		},
		{
			theme: '#ACE7F2',
			title: 'Participants',
			detail: 'Individuals, Couples'
		},
		{
			theme: '#425DB6',
			title: 'Communities',
			detail:
				'Bisexual Allied, Body Positivity, Cancer, Gay Allied, HIV/AIDS Allied, Intersex Allied, Lesbian Allied, Non-Binary Allied'
		}
	];

	let photos = [
		'assets/images/photo-1.png',
		'assets/images/photo-2.png',
		'assets/images/photo-3.png',
		'assets/images/photo-4.png',
		'assets/images/photo-5.png',
		'assets/images/photo-1.png',
		'assets/images/photo-2.png',
		'assets/images/photo-3.png'
	];

	let themes = ['#BFD962', '#ACE7F2', '#FDBD48', '#425DB6'];
	let colors = ['#fff', '#203136', '#203136', '#fff'];

	let ratings = [
		{
			title: 'Heartfelt Harmony',
			count: '500+'
		},
		{
			title: 'Empathy Explorer',
			count: '10'
		},
		{
			title: 'Soulful Connection',
			count: '100'
		},
		{
			title: 'Inspiration Instigator',
			count: '250'
		},
		{
			title: 'Caring Catalyst',
			count: '500+'
		},
		{
			title: 'Mindful Maestro',
			count: '10'
		},
		{
			title: 'Healing Artisan',
			count: '100'
		},
		{
			title: 'Joyful Guidepost',
			count: '250'
		},
		{
			title: 'Gratitude Guru',
			count: '500+'
		},
		{
			title: 'Resilience Maestro',
			count: '10'
		},
		{
			title: 'Mindful Muse',
			count: '100'
		},
		{
			title: 'Soulful Symphony',
			count: '250'
		},
		{
			title: 'Vulnerability Virtuoso',
			count: '500+'
		},
		{
			title: 'Mind-Map Maestro',
			count: '10'
		},
		{
			title: 'Energetic Empath',
			count: '100'
		},
		{
			title: 'Authenticity Architect',
			count: '250'
		}
	];

	// Scroll implementation
	let scrollDirection = -1; // 1 for right, -1 for left

	function handleScrollButtonClick() {
		scrollDirection *= -1; // Toggle between 1 and -1
		scrollToLeftOrRight('photosContainer', scrollDirection);
	}
</script>

<div class="flex flex-col gap-4 sm:gap-8">
	<!-- overview -->
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6">
		{#each overview as item}
			<div
				class="w-full flex items-center sm:items-start m-auto sm:m-0 flex-col p-4 sm:p-6 lg-screens:p-8 rounded-2xl bg-white"
			>
				<div class="mb-4 sm:mb-6 h-14 w-14 sm:h-24 sm:w-24">
					<img src={item.icon} alt="an image of ${item.title}" class="h-full w-full" />
				</div>

				<p
					class="mb-0 sm:mt-1 font-medium text-stroke-dark sm:text-primary-dark text-[0.75rem] sm:text-[0.875rem]"
				>
					{item.title}
				</p>

				<p class="font-medium text-primary-dark text-[0.75rem] sm:text-[1.125rem]">{item.detail}</p>
			</div>
		{/each}
	</div>

	<!-- rates -->
	<div
		class="min-h-auto w-full p-4 sm:p-8 rounded-2xl sm:border sm:border-stroke-cards bg-white sm:shadow-md flex-col items-start gap-4 sm:gap-6 inline-flex"
	>
		<div class="w-full flex items-center justify-between">
			<h3
				class="text-primary-dark font-poppins text-base sm:text-[1.125rem] font-semibold leading-normal"
			>
				Rates
			</h3>
			<h4
				class="text-stroke-dark font-poppins text-[0.875rem] sm:text-base font-medium leading-normal"
			>
				GBP £
			</h4>
		</div>

		<div class="w-full flex gap-4 sm:gap-6 flex-col">
			{#each rates as rate}
				<div class="w-full flex justify-between flex-wrap items-center">
					<div class="inline-flex items-center">
						<div
							class="hidden sm:flex w-[4.375rem] h-8 p-1 justify-center items-center gap-1.5 rounded-[3.125rem] bg-primary-dark text-white font-poppins sm:text-base font-medium"
						>
							{rate.age_range}
						</div>

						<div class="flex items-start sm:items-center flex-col sm:flex-row ml-0 sm:ml-6">
							<span
								class="text-primary-dark font-poppins text-[0.875rem] sm:text-base font-medium leading-normal"
								>{rate.detail}</span
							>

							{#if rate.coming_soon}
								<p
									class="ml-0 sm:ml-6 flex items-center text-primary-dark font-poppins text-[0.75rem] sm:text-[0.875rem] font-medium leading-normal"
								>
									<img src="assets/icons/timer.svg" alt="timer icon" />
									<span class="ml-2">Coming soon</span>
								</p>
							{/if}
						</div>
					</div>

					<div
						class="text-primary-dark font-poppins text-[0.875rem] sm:text-base font-semibold leading-normal"
					>
						£{rate.amount}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- client focus -->
	<div
		class="min-h-auto w-full p-4 sm:p-8 rounded-2xl sm:border sm:border-stroke-cards bg-white sm:shadow-md flex-col items-start gap-4 sm:gap-6 inline-flex"
	>
		<div class="w-full flex items-center justify-between">
			<h3
				class="text-primary-dark font-poppins text-base sm:text-[1.125rem] font-semibold leading-normal"
			>
				Client focus
			</h3>
		</div>

		<div class="w-full flex gap-4 sm:gap-6 flex-col">
			{#each clientFocus as focus}
				<div
					class="w-full flex flex-col flex-wrap px-4 py-1 sm:px-6 sm:py-2 gap-1 sm:gap-2 sm:border-l-[6px] border-l-[4px]"
					style="border-color: {focus.theme}"
				>
					<h5
						class="text-primary-dark font-poppins text-[0.875rem] sm:text-[1.125rem] font-semibold leading-[1.25rem]"
					>
						{focus.title}
					</h5>
					<p
						class="text-primary-dark font-poppins text-[0.875rem] sm:text-base font-normal leading-[1.25rem]"
					>
						{focus.detail}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- photos -->
	<div
		class="relative min-h-auto w-full p-4 sm:p-8 rounded-2xl sm:border sm:border-stroke-cards bg-white sm:shadow-md flex-col items-start gap-4 sm:gap-6 inline-flex"
	>
		<div class="w-full flex items-center justify-between">
			<h3
				class="text-primary-dark font-poppins text-base sm:text-[1.125rem] font-semibold leading-normal"
			>
				Photos
			</h3>
		</div>

		<div
			class="animate__animated animate__fadeInUp w-full flex overflow-x-auto gap-2 sm:gap-1"
			id="photosContainer"
		>
			{#each photos as photo, index}
				<div
					class="min-w-[12.5rem] h-[12.5rem] sm:min-w-[9rem] sm:h-[6rem] inline-flex items-center justify-center"
				>
					<img
						src={photo}
						alt={`Photo ${index + 1}`}
						class="w-full h-full rounded-2xl object-cover"
					/>
				</div>
			{/each}

			<button
				class="hidden sm:inline-flex absolute top-[55%] transform scale-x-[-1] right-4 w-8 h-8 p-1 origin-top-left -rotate-90 bg-white bg-opacity-70 rounded-lg shadow backdrop-blur-sm flex-col justify-end items-center gap-2.5 z-[100]"
				on:click={() => handleScrollButtonClick()}
			>
				<img
					src="assets/icons/chevron-left.svg"
					style="transform: {scrollDirection === 1 ? `scaleY(-1)` : ``}"
					alt="Scroll button"
				/>
			</button>
		</div>
	</div>

	<!-- ratings -->
	<div
		class="min-h-auto w-full p-4 sm:p-8 rounded-2xl sm:border sm:border-stroke-cards bg-white sm:shadow-md flex-col items-start gap-4 sm:gap-6 inline-flex"
	>
		<div class="w-full flex items-center justify-between">
			<h3
				class="text-primary-dark font-poppins text-base sm:text-[1.125rem] font-semibold leading-normal"
			>
				Ratings
			</h3>
		</div>

		<div
			class="animate__animated animate__fadeInUp w-full flex overflow-x-auto sm:grid sm:grid-cols-4 gap-4 sm:gap-y-8"
		>
			{#each ratings as rating, index}
				<div class="w-full flex flex-col items-center">
					<div
						class="relative w-[3.26769rem] h-[3.26769rem] sm:w-[5.375rem] sm:h-[5.375rem] rounded-full border-[3px] sm:border-[5px] inline-flex items-center justify-center"
						style="border-color: {themes[index % themes.length]}"
					>
						<div
							class="absolute px-1 bottom-0 right-0 cursor-pointer rounded-full min-w-[18px] h-[18px] sm:min-w-auto sm:h-5 text-white text-[0.5rem] sm:text-[0.75rem] flex items-center justify-center"
							style="background-color: {themes[index % themes.length]}; color: {colors[
								index % colors.length
							]}"
						>
							{rating?.count}
						</div>
					</div>
					<p
						class="mt-1 sm:mt-4 text-primary-dark font-poppins text-center text-[0.75rem] capitalize sm:text-base font-medium"
					>
						{rating.title}
					</p>
				</div>
			{/each}
		</div>
	</div>
</div>
