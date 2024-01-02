<script>
	import { page } from '$app/stores';
</script>

<div
	class="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[6.25rem] lg-screens:px-[13.75rem] py-4 sm:py-10 flex justify-between lg:flex-row flex-col gap-6"
>
	<h1
		class="mt-6 text-primary-dark font-poppins text-[1rem] lg-screens:text-[1.375rem] sm:text-[1.125rem] mb-1 font-medium leading-5"
	>
		{$page.status}: {$page.error.message}
	</h1>
</div>
