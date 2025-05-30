<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

	import FriendAvatar from '$src/components/home/friendAvatar.svelte'

	import GameCard from '$src/components/games/gameCard.svelte'

	import { pageName } from '$src/stores'
	import { interpolate } from '$lib/poly-i18n/interpolate'

	pageName.set(data.t('generic.home'))

	import EmptyCard from '$src/components/emptyCard.svelte'
	import SeeAll from '$src/components/seeAll.svelte'
	import Avatar from '$src/components/users/avatar.svelte'
	import UserImage from '$src/components/userimage.svelte'

	$: recentlyPlayed = data.recentlyPlayed
</script>

<div class="flex mx-auto gap-x-8">
	<div class="w-full h-[600px] max-w-[160px] flex-col xl:flex hidden shrink-0 my-24">
		<UserImage type="skyscraper" />
	</div>

	<div class="container p-8 flex flex-col">
		<div class="flex">
			<a class="pr-[25px]" href="/users/{data.user.userid}/profile">
				<Avatar
					state={data.status}
					userid={data.user.userid}
					username={data.user.username}
					css="w-48 h-48 !rounded-none"
				/>
			</a>

			<h1 class="text-5xl leading-none tracking-tight font-semibold my-auto">
				{data.welcomeMessage}, {data.user.username}...
			</h1>
		</div>

		<div class="pt-24 flex flex-col gap-y-4">
			<div class="flex flex-row justify-between px-4">
				<h1 class="text-3xl">
					{interpolate(data.t('home.friends'), { count: data.friendCount.toString() })}
				</h1>

				<SeeAll href="/friends" />
			</div>

			<div
				class="supports-backdrop-blur:bg-background/60 w-full border-b bg-muted-foreground/5 shadow-sm backdrop-blur flex flex-row overflow-x-auto p-4 gap-x-10 outline-dashed outline-muted-foreground/20 rounded-xl"
			>
				{#if data.friendCount === 0}
					<EmptyCard />
				{:else}
					{#each data.friends as friend}
						<a href="/users/{friend.userid}/profile">
							<FriendAvatar
								state={friend.status}
								username={friend.username}
								userid={friend.userid}
							/>
						</a>
					{/each}
				{/if}
				<!--TODO: FINISH this...-->
			</div>

			<div class="flex flex-row justify-between px-4 mt-6">
				<h1 class="text-3xl">{data.t('home.recentlyPlayed')}</h1>

				<SeeAll href="/home/recentlyplayed" />
			</div>

			<div class="flex flex-row gap-x-5 w-full">
				{#if recentlyPlayed.length > 0}
					{#each recentlyPlayed as game}
						<GameCard
							gameId={game.place.placeid}
							gameName={game.place.placename}
							playerCount={game.active}
							assetUrl={game.icon?.simpleasseturl}
							moderationState={game.icon?.moderationstate}
						/>
					{/each}
				{:else}
					<EmptyCard class="p-8 m-auto">
						<h5 class="text-center">
							Maybe play some <a href="/games" class="hover:underline font-semibold">games</a>?
						</h5>
					</EmptyCard>
				{/if}
			</div>
		</div>
	</div>

	<div class="w-full h-[600px] max-w-[160px] flex-col xl:flex hidden shrink-0 my-24">
		<UserImage type="skyscraper" />
	</div>
</div>
