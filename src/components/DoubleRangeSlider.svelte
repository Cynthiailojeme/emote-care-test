<script>
	import RangeSlider from 'svelte-range-slider-pips';

	export let values;
	export let max = 200;
</script>

<div>
	<RangeSlider bind:values range min={0} {max} float ariaLabels={['Min', 'Max']} />
</div>
