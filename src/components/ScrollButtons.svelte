<script>
	import { scrollToLeftOrRight } from '$lib/helpers';

	export let containerId;
	export let btnId;
	export let top;
	export let right;
	export let left;
	export let styles =
		'hidden sm:inline-flex absolute transform scale-x-[-1] w-8 h-8 p-1 origin-top-left -rotate-90 bg-white bg-opacity-70 rounded-lg shadow backdrop-blur-sm flex-col justify-end items-center gap-2.5 z-[100]';
</script>

<div>
	<button
		id={btnId}
		style="display: none; top: {top}; left: {left}"
		class={styles ??
			'hidden leftButton sm:inline-flex absolute transform scale-x-[-1] w-8 h-8 p-1 origin-top-left -rotate-90 bg-white bg-opacity-70 rounded-lg shadow backdrop-blur-sm flex-col justify-end items-center gap-2.5 z-[100]'}
		on:click={() => scrollToLeftOrRight(containerId, true, btnId)}
	>
		<img src="assets/icons/chevron-left.svg" style="transform: scaleY(-1)" alt="Scroll button" />
	</button>
	<button
		class={styles ??
			'hidden sm:inline-flex absolute transform scale-x-[-1] w-8 h-8 p-1 origin-top-left -rotate-90 bg-white bg-opacity-70 rounded-lg shadow backdrop-blur-sm flex-col justify-end items-center gap-2.5 z-[100]'}
		style="top: {top}; right: {right}"
		on:click={() => scrollToLeftOrRight(containerId, false, btnId)}
	>
		<img src="assets/icons/chevron-left.svg" alt="Scroll button" />
	</button>
</div>
