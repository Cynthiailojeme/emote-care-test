<script>
	import Button from './Button.svelte';

	export let tabs = [
		{ name: 'For Therapist', link: '/' },
		{ name: 'Who are we', link: '/' },
		{ name: 'How it works', link: '/' },
		{ name: 'Blog', link: '/' }
	];
</script>

<nav
	class="flex px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[7.5rem] py-4 sm:py-6 justify-between items-center gap-4 self-stretch bg-white"
>
	<a href="/">
		<div class="text-center">
			<div
				class="text-black font-poppins text-[0.8125rem] font-semibold leading-[0.88988rem] sm:text-[1.12719rem] sm:font-medium sm:leading-[1.409rem]"
			>
				emote
			</div>
			<div
				class="text-black font-poppins text-[0.4375rem] font-extrabold leading-[0.55619rem] tracking-[0.0875rem] sm:text-[0.648rem] sm:font-semibold sm:leading-[0.88063rem] sm:tracking-[0.12963rem]"
			>
				CARE
			</div>
		</div>
	</a>

	<div class="flex sm:hidden gap-4">
		<img src="assets/icons/bell.svg" alt="An icon of a bell" />
		<img src="assets/icons/message-circle.svg" alt="An icon of a message" />
		<img src="assets/images/profile.jpeg" alt="A user profile pic" />
	</div>

	<ul class="hidden lg:flex items-center justify-between gap-8">
		{#each tabs as tab (tab.name)}
			<li>
				<a
					href={tab.link}
					class="text-black font-poppins text-base font-medium leading-normal duration-200 hover:text-accent-green-light-brand"
					target=""
				>
					{tab.name}
				</a>
			</li>
		{/each}
	</ul>

	<div class="hidden sm:flex items-center justify-between gap-6">
		<Button text="Browse our Therapists">
			<img slot="leftIcon" src={'assets/icons/users.svg'} alt="icon of multiple users" />
		</Button>
		<a href="/" target="_blank" rel="noopener noreferrer" class="flex gap-2">
			<img src={'assets/icons/user.svg'} alt="icon of single user" />
			Login</a
		>
	</div>
</nav>
