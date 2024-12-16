<script lang="ts">
	import Input from "$lib/components/ui/input/input.svelte";
	import ComboboxBase from "$lib/components/ui/combobox/comboboxBase.svelte";
	import ComboboxTarget from "$lib/components/ui/combobox/comboboxTarget.svelte";
	import Button from "$lib/components/ui/button/button.svelte";

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
	function swapCurrency() {
		console.log("Swapping currency");
		[currencyData.currencyBase, currencyData.currencyTarget] = [currencyData.currencyTarget, currencyData.currencyBase];
		[currencyData.selectedBase, currencyData.selectedTarget] = [currencyData.selectedTarget, currencyData.selectedBase];
		[baseValue, targetValue] = [targetValue, baseValue];
	}
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
	<div class="grid place-content-center grid-cols-3">
		<div class="flex w-full max-w-sm flex-col gap-1.5">
			<ComboboxBase {currencyData}/>
			<Input type="text" id="base" placeholder="100" bind:value={baseValue} />
			<p class="text-muted-foreground text-sm">The currency to convert form (Base Currency).</p>
		</div>
		<div class="flex justify-center items-center content-center">
			<Button onclick={swapCurrency}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M32 96l320 0 0-64c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6l0-64L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32l-320 0 0 64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64 320 0z"/></svg></Button>
		</div>
		<div class="flex w-full max-w-sm flex-col gap-1.5">
			<ComboboxTarget {currencyData}/>
			<Input type="text" id="target" placeholder="100" bind:value={targetValue} readonly/>
			<p class="text-muted-foreground text-sm">The currency that is converted to (Target Currency).</p>
		</div>
	</div>
</div>