<script lang="ts">
	import { goto } from '$app/navigation'
	import * as Pagination from '$src/components/ui/pagination'
	import { getPageNumber } from '$src/lib/utils'
	import { ChevronLeft, ChevronRight } from 'lucide-svelte'
	import { page } from '$app/stores'

	export let count: number

	$: if (count === 0) {
		count = 1
	}

	export let url: URL

	export let queryName = 'page'

	$: pageNumber = getPageNumber(url, queryName)

	$: if (count < (pageNumber - 1) * size) {
		pageNumber = 1
	}

	export let size: number

	function previousPage() {
		let query = new URLSearchParams(url.searchParams.toString())

		query.set(queryName, (pageNumber - 1).toString())

		goto(`?${query.toString()}`, { noScroll: true, keepFocus: true })
	}

	function nextPage() {
		let query = new URLSearchParams(url.searchParams.toString())

		query.set(queryName, (pageNumber + 1).toString())

		goto(`?${query.toString()}`, { noScroll: true, keepFocus: true })
	}

	function pagebutton(value: number) {
		let query = new URLSearchParams(url.searchParams.toString())

		query.set(queryName, value.toString())

		return query.toString()
	}
</script>

<Pagination.Root
	class="justify-self-end"
	{count}
	perPage={size}
	siblingCount={1}
	bind:page={pageNumber}
	let:pages
	let:currentPage
>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton on:click={previousPage}>
				<ChevronLeft class="h-4 w-4" />
				<span class="hidden sm:block">{$page.data.t('generic.previous')}</span>
			</Pagination.PrevButton>
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<a href="?{pagebutton(page.value)}" data-sveltekit-noscroll>
					<Pagination.Item>
						<Pagination.Link {page} isActive={currentPage === page.value}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item></a
				>
			{/if}
		{/each}
		<Pagination.Item>
			<Pagination.NextButton on:click={nextPage}>
				<span class="hidden sm:block">{$page.data.t('generic.next')}</span>
				<ChevronRight class="h-4 w-4" />
			</Pagination.NextButton>
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
