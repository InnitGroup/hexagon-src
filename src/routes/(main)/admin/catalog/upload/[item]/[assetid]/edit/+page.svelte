<script lang="ts">
	import { depluralize } from '$lib/utils'
	import EditAssetFormPrimitive from '$src/components/develop/edit/admin/editAssetFormPrimitive.svelte'
	import EditGearFormPrimitive from '$src/components/develop/edit/admin/editGearFormPrimitive.svelte'
	import type { PageData } from './$types'

	export let data: PageData

	$: itemName = data.item.charAt(0).toUpperCase() + data.item.slice(1)
</script>

<div class="container p-8 flex flex-col gap-y-8">
	<h1 class="text-4xl leading-none tracking-tight font-semibold">
		Configure {depluralize(itemName)}
	</h1>

	{#if data.item === 'gears'}
		<EditGearFormPrimitive
			data={data.gearForm}
			friendlyName={data.friendlyName}
			name={data.assetname}
			description={data.description}
			onsale={data.onsale}
			price={data.price}
			genres={data.genres}
			gearattributes={data.gearattributes}
			limited={data.limited}
		/>
	{:else}
		<EditAssetFormPrimitive
			data={data.assetForm}
			friendlyName={data.friendlyName}
			name={data.assetname}
			description={data.description}
			onsale={data.onsale}
			price={data.price}
			genres={data.genres}
			limited={data.limited}
		/>
	{/if}
</div>
