<script>
    import { Update } from "svelte-radix";

    let { text = "Loading" } = $props();
</script>

<div class="flex space-x-2 text-xs mb-2 mt-2">
    <Update class="animate-spin h-4"></Update>
    <span>{text}</span>
</div>
