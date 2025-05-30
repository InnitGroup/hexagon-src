<script lang="ts">
	import * as Avatar from '$src/components/ui/avatar'
	import { Loader2 } from 'lucide-svelte'
	import { browser } from '$app/environment'
	import { Canvas, extend } from '@threlte/core'
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
	import Scene from '$src/components/_3d/Scene.svelte'
	import { Button } from '$src/components/ui/button'
	import { loadedImages } from '$src/stores'

	extend({
		OrbitControls
	})

	export let itemId: number // TODO: fetch
	export let itemName: string = ''

	export let css: string = ''

	let attempt = 0

	let dimension: '3D' | '2D' = '2D'

	export let disable3d = false

	if (browser && !disable3d) {
		dimension = localStorage?.getItem('itemAvatarMode') === '3D' ? '3D' : '2D' // get preferred dimension
	}

	let src: string | undefined

	$: itemId, (src = undefined)

	async function fetchAvatar(itemId: number) {
		if (attempt <= 3) {
			const foundImage = $loadedImages.find(
				(img) => img.assetid === itemId && img.asset === 'item' && img.type === 'avatar'
			)
			if (foundImage) {
				return foundImage.url
			}

			const thumbnailResponse = await fetch('/api/avatarthumbnail', {
				method: 'POST',
				body: JSON.stringify({
					assetid: itemId,
					type: 'avatar',
					asset: 'item'
				})
			})
			const thumbnail = await thumbnailResponse.json()

			if (thumbnail.success && thumbnail.data.url !== '') {
				$loadedImages.push({
					url: thumbnail.data.url,
					type: 'avatar',
					assetid: itemId,
					asset: 'item',
					time: new Date()
				})

				src = thumbnail.data.url
				return thumbnail.data.url
			}

			if (thumbnail.success && thumbnail.data.url === '') {
				//generating still
				await new Promise((resolve) => setTimeout(resolve, 5000))
				fetchAvatar(itemId)
				attempt += 1
			}
		}
	}

	async function fetchAvatarObj(itemId: number) {
		if (attempt <= 3) {
			const thumbnailResponse = await fetch('/api/avatarthumbnail', {
				method: 'POST',
				body: JSON.stringify({
					assetid: itemId,
					type: 'obj',
					asset: 'item'
				})
			})
			const thumbnail = await thumbnailResponse.json()

			if (thumbnail.success) {
				const objResponse = await fetch(thumbnail.data.url, {
					headers: {
						Accept: 'application/json'
					}
				})
				const objJson = await objResponse.json()

				return objJson
			}

			if (thumbnail.success && thumbnail.data.url === '') {
				//generating still
				await new Promise((resolve) => setTimeout(resolve, 500))
				fetchAvatarObj(itemId)
				attempt += 1
			}
		}
	}
</script>

<div class="flex gap-x-1 relative {css} bg-muted-foreground/5">
	<div class="h-full w-full mx-auto relative" id="int-target">
		{#if dimension === '2D'}
			{#if src}
				<Avatar.Root class="w-full mx-auto h-full rounded-xl">
					<Avatar.Image {src} alt={itemName} {...$$restProps} />
					<Avatar.Fallback />
				</Avatar.Root>
			{:else}
				{#await fetchAvatar(itemId)}
					<Loader2 class="w-full h-full animate-spin text-secondary " />
				{:then src}
					<Avatar.Root class="w-full mx-auto h-full rounded-xl">
						<Avatar.Image {src} alt={itemName} {...$$restProps} />
						<Avatar.Fallback />
					</Avatar.Root>
				{/await}
			{/if}
		{:else}
			{#await fetchAvatarObj(itemId)}
				<Loader2 class="w-full h-full animate-spin text-secondary" />
			{:then objManifest}
				<Canvas renderMode={'always'}>
					<Scene {objManifest} />
				</Canvas>
			{/await}
		{/if}
	</div>
	{#if !disable3d}
		<Button
			class="absolute right-2 top-2"
			on:click={() => {
				dimension === '3D' ? (dimension = '2D') : (dimension = '3D')
				if (localStorage) {
					localStorage.setItem('itemAvatarMode', dimension)
				}
				attempt = 0
			}}>{dimension === '2D' ? '3D' : '2D'}</Button
		>{/if}

	<slot />
</div>
