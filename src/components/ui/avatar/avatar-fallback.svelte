<script lang="ts">
	import { Avatar as AvatarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";

	type $$Props = AvatarPrimitive.FallbackProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<AvatarPrimitive.Fallback
	class={cn(
		"flex h-full w-full items-center justify-center bg-muted animate-pulse",
		className
	)}
	{...$$restProps}
>
	<slot />
</AvatarPrimitive.Fallback>
