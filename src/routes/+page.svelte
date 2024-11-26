<script lang="ts">
	import Input from "$lib/components/ui/input/input.svelte";
	import ComboboxBase from "$lib/components/ui/combobox/comboboxBase.svelte";
	import ComboboxTarget from "$lib/components/ui/combobox/comboboxTarget.svelte";

	let currencyData = $state({
		currencyBase: "USD",
		currencyTarget: "SGD",
		selectedBase: "United States Dollar",
		selectedTarget: "Singapore Dollar"
	});
	let baseValue = $state(null);
	let targetValue = $state(null);
	let exchangeRate = $state({
		unit: null,
		mid: null
	});
	$effect( () => {
		fetch(`https://hexarate.paikama.co/api/rates/latest/${currencyData.currencyBase}?target=${currencyData.currencyTarget}`)
		.then((response) => response.json())
		.then((data) => {
			exchangeRate.unit = data.data.unit;
			exchangeRate.mid = data.data.mid;
		}).catch((error) => {
			console.error('Error:', error);
		});
	});

	$effect(() => {
		if (baseValue !== null && exchangeRate.unit !== null && exchangeRate.mid !== null) {
			targetValue = baseValue * exchangeRate.unit * exchangeRate.mid;
		}
	});
</script>

<div class="grid place-content-center pt-16 gap-10">
	<h1 class="scroll-m-20 text-xl font-medium tracking-tight lg:text-2xl pb-10">Currency Exchange</h1>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<ComboboxBase {currencyData}/>
		<Input type="text" id="base" placeholder="100" bind:value={baseValue} />
		<p class="text-muted-foreground text-sm">Enter the currency to convert form (Base Currency).</p>
	</div>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<ComboboxTarget {currencyData}/>
		<Input type="text" id="target" placeholder="100" bind:value={targetValue} />
		<p class="text-muted-foreground text-sm">Enter the currency to convert to (Target Currency).</p>
	</div>
</div>