<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import Avatar from '$src/components/catalog/avatar.svelte'
	import { Button } from '$src/components/ui/button'
	import { slugify } from '$src/lib/utils'
	import { toast } from 'svelte-sonner'

	export let itemName: string

	export let itemId: number

	export let wearing: boolean

	export let trig: boolean

	export let limited: string | null

	async function toggle() {
		const response = await fetch(`/api/avatar/setwearingassets`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ itemId, wear: !wearing })
		})

		const json = await response.json()

		if (json.success === false) {
			toast.error(json.message)
		} else {
			toast.success('Successfully updated avatar!')
			invalidateAll()
		}

		invalidateAll()

		trig = !trig
	}
</script>

<div class="w-24 2xl:w-32 relative">
	<button on:click={toggle}>
		<Avatar
			css="w-24 2xl:w-32 2xl:h-32 rounded-xl aspect-square"
			{itemId}
			{itemName}
			disable3d={true}
		>
			{#if limited}
				<div class="h-7 absolute left-0 bottom-0">
					<img class="w-full h-full" src="/Images/{limited}.svg" alt={limited} />
				</div>
			{/if}
		</Avatar>
	</button>
	<a href="/catalog/{itemId}/{slugify(itemName)}">
		<h1 class="line-clamp-2 tracking-tighter break-words text-xl hover:underline text-left">
			{itemName}
		</h1>
	</a>
	<Button class="absolute top-0 right-0 h-4" size="sm" variant="outline" on:click={toggle}
		>{wearing === false ? 'Wear' : 'Remove'}
	</Button>
</div>
