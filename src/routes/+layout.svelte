<script>
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
	import Header from '../components/Header.svelte';
</script>

<div class="relative flex flex-col mx-auto w-full text-sm sm:text-base min-h-screen">
	<Header />
	<Navbar />
	<slot />
	<Footer />
</div>
