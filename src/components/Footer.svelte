<script>
	import Button from './Button.svelte';

	export let tabs = [
		{ name: 'For Therapist', link: '/' },
		{ name: 'Who are we', link: '/' },
		{ name: 'How it works', link: '/' },
		{ name: 'Blog', link: '/' }
	];

	export let socialIcons = [
		{
			src: 'assets/icons/telegram.svg',
			alt: 'Telegram app icon'
		},
		{
			src: 'assets/icons/twitter.svg',
			alt: 'Twitter app icon'
		},
		{
			src: 'assets/icons/linkedin.svg',
			alt: 'LinkedIn app icon'
		}
	];
</script>

<footer
	class="hidden lg:flex flex-col px-4 sm:px-6 md:px-12 lg:px-16 xl:px-28 xl:py-[3.75rem] sm:py-6 gap-4 self-stretch mt-auto bg-accent-green-light-brand"
>
	<div class="flex justify-between items-center">
		<div class="text-center">
			<div
				class="text-primary-dark font-poppins text-[2.40725rem] font-medium leading-[3.00913rem]"
			>
				emote
			</div>
			<div
				class="text-primary-dark font-poppins text-[1.38394rem] font-bold leading-[1.88069rem] tracking-[0.27681rem]"
			>
				CARE
			</div>
		</div>

		<ul class="flex items-center justify-between gap-8">
			{#each tabs as tab (tab.name)}
				<li>
					<a
						href={tab.link}
						class=" text-primary-dark font-poppins text-1.125rem font-medium leading-normal duration-200 hover:underline"
						target="_self"
					>
						{tab.name}
					</a>
				</li>
			{/each}
		</ul>

		<div class="flex items-center justify-between gap-6">
			<Button text="Browse our Therapists" theme="secondary">
				<img
					slot="leftIcon"
					src={'assets/icons/users.svg'}
					alt="icon of multiple users"
					class="filter invert"
				/>
			</Button>
			<a href="/" target="_blank" rel="noopener noreferrer" class="flex gap-2">Login</a>
		</div>
	</div>

	<div class="flex items-center justify-between mt-[3.75rem]">
		<div>
			<p class="text-primary-dark font-inter text-lg leading-6">
				© 2023 emote Care. All rights reserved.
			</p>
			<p class="text-primary-dark font-inter text-lg leading-6 mt-2">
				This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service
				apply.
			</p>
		</div>

		<div class="flex items-center gap-6">
			{#each socialIcons as socialIcon (socialIcon.src)}
				<div
					class="w-[3.87863rem] h-[3.87863rem] flex justify-center items-center rounded-full bg-white shadow-box-circle"
				>
					<img src={socialIcon.src} alt={socialIcon.alt} />
				</div>
			{/each}
		</div>
	</div>
</footer>
