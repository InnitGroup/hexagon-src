<script lang="ts">
	import type { GearAttributes } from '$lib/types'
	import {
		Webhook,
		Sword,
		Crosshair,
		Bomb,
		Zap,
		Navigation2,
		Music4,
		Wrench,
		DoorOpen
	} from 'lucide-svelte'

	export let attribute: GearAttributes

	let icons = {
		'Melee weapons': Sword,
		'Ranged weapons': Crosshair,
		Explosives: Bomb,
		'Power ups': Zap,
		'Navigation enhancers': Navigation2,
		'Musical instruments': Music4,
		'Social items': Webhook,
		'Building tools': Wrench,
		'Personal transport': DoorOpen
	}

	export let showName = true
</script>

<h1 class="text-sm flex items-center gap-x-1">
	<svelte:component this={icons[attribute]} />
	{#if showName}
		{attribute}
	{/if}
</h1>
