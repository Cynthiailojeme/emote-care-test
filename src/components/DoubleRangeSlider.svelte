<script>
	import RangeSlider from 'svelte-range-slider-pips';

	export let values;
	export let change;
	export let min = 0;
	export let max = 200;
</script>

<div class="mt-12">
	<RangeSlider
		bind:values
		range
		on:change={change}
		{min}
		{max}
		float
		ariaLabels={['Min', 'Max']}
	/>
</div>
