<script lang="ts">
	import Check from "lucide-svelte/icons/check";
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import { tick } from "svelte";
	import * as Command from "$lib/components/ui/command/index";
	import * as Popover from "$lib/components/ui/popover/index";
	import { Button } from "$lib/components/ui/button/index";
	import { cn } from "$lib/utils";
	import { currencies } from "$lib/currencies";

	let open = $state(false);
	let { currencyData } = $props();
	let triggerRef = $state<HTMLButtonElement>(null!);
	
	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger() {
	 open = false;
	 tick().then(() => {
	  triggerRef.focus();
	 });
	}
   </script>
	
   <Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
	 {#snippet child({ props })}
	  <Button
	   variant="outline"
	   class="w-[200px] justify-between"
	   {...props}
	   role="combobox"
	   aria-expanded={open}
	  >
	   {currencyData.selectedBase || "Select a framework..."}
	   <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
	  </Button>
	 {/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
	 <Command.Root>
	  <Command.Input placeholder="Search Currency Code..." />
	  <Command.List>
	   <Command.Empty>No framework found.</Command.Empty>
	   <Command.Group>
		{#each currencies as currency}
		 <Command.Item
		  value={currency.code}
		  onSelect={() => {
			currencyData.currencyBase = currency.code;
			currencyData.selectedBase = currency.name;
		   closeAndFocusTrigger();
		  }}
		 >
		  <Check
		   class={cn(
			"mr-2 size-4",
			currencyData.currencyBase !== currency.code && "text-transparent"
		   )}
		  />
		  {currency.name + " (" + currency.code + ")"}
		 </Command.Item>
		{/each}
	   </Command.Group>
	  </Command.List>
	 </Command.Root>
	</Popover.Content>
   </Popover.Root>