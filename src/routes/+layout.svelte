<script>
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
	import Header from '../components/Header.svelte';

	let y;
	let innerWidth = 0;
	let innerHeight = 0;

	function scrollToTheTop() {
		document.body.scrollIntoView();
	}
</script>

<div class="relative flex flex-col mx-auto w-full text-sm sm:text-base min-h-screen">
	<!-- Scroll to top button: starts -->
	<div
		class={'fixed bottom-0 w-full duration-200 flex p-10 z-[10] ' +
			(y > 0 ? ' opacity-full pointer-events-auto' : ' pointer-events-none opacity-0')}
	>
		<button
			on:click={() => scrollToTheTop()}
			class="ml-auto rounded-md bg-white px-1 sm:px-2 shadow-md cursor-pointer aspect-square flex items-center justify-center"
		>
			<img
				src="assets/icons/arrow-down.svg"
				alt="scroll up"
				class="w-5 h-5"
				style="transform: scaleY(-1);"
			/>
		</button>
	</div>
	<!-- Scroll to top button: ends -->

	<Header />
	<Navbar />
	<slot />
	<Footer />
</div>

<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />
