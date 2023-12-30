<script>
	export let width = 'auto';
	export let theme = 'primary';
	export let text = '';

	function getBackgroundColor() {
		switch (theme) {
			case 'primary':
				return 'bg-accent-green-light-brand text-primary-dark';
			case 'secondary':
				return 'bg-primary-dark text-white';
			case 'tertiary':
				return 'bg-white border border-stroke-medium shadow';
			default:
				return 'bg-accent-green-light-brand text-primary-dark';
		}
	}
</script>

<button
	class="{getBackgroundColor()} flex items-center justify-center min-w-48 text-[0.875rem] sm:text-base lg-screens:text-[1.125rem] font-medium leading-5 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-11 sm:h-13"
	style="width: {width}; padding: 0.625rem 3rem; border-radius: 3.125rem;"
>
	{#if $$slots.leftIcon}
		<span class="mr-2">
			<slot name="leftIcon" />
		</span>
	{/if}

	<span>{text}</span>

	{#if $$slots.rightIcon}
		<span class="ml-2">
			<slot name="rightIcon" />
		</span>
	{/if}
</button>
