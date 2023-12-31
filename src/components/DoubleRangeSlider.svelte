<script>
	import RangeSlider from 'svelte-range-slider-pips';

	export let values;
	export let change;
	export let max = 200;
</script>

<div class="mt-12">
	<RangeSlider
		bind:values
		range
		on:change={change}
		min={0}
		{max}
		float
		ariaLabels={['Min', 'Max']}
	/>
</div>
