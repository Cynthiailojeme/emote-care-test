<script>
	export let value;
	export let onChange;
</script>

<div class="w-full">
	<input
		type="text"
		{value}
		class="w-full h-10 p-3 pl-10 flex flex-col justify-center items-start gap-2 self-stretch rounded-md border border-gray-300 bg-white focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 shadow-inner"
		placeholder="Search"
		style="background-image: url('assets/icons/search.svg'); background-repeat: no-repeat; background-size: 20px 20px; background-position: 10px center;"
		on:input={onChange}
	/>
</div>
