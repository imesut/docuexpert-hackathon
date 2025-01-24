<script>
    import { writable } from "svelte/store";
    import { Button } from "$lib/components/ui/button";
    import { Check } from "svelte-radix";

    export let text = "";

    const copied = writable(false);

    // Function to copy text
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            copied.set(true);
            setTimeout(() => copied.set(false), 1500); // Reset after 2 seconds
        } catch (error) {
            console.error("Failed to copy text: ", error);
        }
    };
</script>

<Button onclick={handleCopy}>
    {#if $copied}
        <Check /> Copied
    {:else}
        Copy
    {/if}
</Button>
