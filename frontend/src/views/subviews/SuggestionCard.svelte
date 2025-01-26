<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button";
    import { CheckCircled, ChevronDown, CrossCircled } from "svelte-radix";
    import * as Card from "$lib/components/ui/card";
    import { Badge } from "$lib/components/ui/badge";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import * as Popover from "$lib/components/ui/popover";
    import type { Suggestion } from "../../model/Types";
    import { bridgeFocusToText } from "../../model/Bridge";

    let { expertNames, suggestion } = $props();
    let collapse = $state(false);
</script>

<Card.Root
    class={collapse ? "opacity-60" : ""}
    on:click={() => {
        // Clicked to the suggestion
        bridgeFocusToText(suggestion.old_version, ()=>{})
        console.log("Clicked to the suggestion", suggestion.old_version);
    }}
>
    <Card.Content class="space-y-2 p-4">
        <div class="flex justify-between">
            <div class="flex flex-col">
                <div class="space-x-2">
                    <Badge class="w-10 h-6">{suggestion.by}</Badge>
                    <Label>{expertNames[suggestion.by]}</Label>
                </div>

                {#if !collapse}
                    <div class="flex space-x-2 pt-4">
                        <span class="font-semibold text-sm">OLD:</span>
                        <strike class="text-sm">{suggestion.old_version}</strike
                        >
                    </div>

                    <div class="flex space-x-2">
                        <span class="font-semibold text-sm">NEW:</span>
                        <p class="text-sm">{suggestion.new_version}</p>
                    </div>
                {/if}
            </div>

            <!-- apply / done states -->
            <div class="flex flex-col space-y-2">
                {#if !collapse}
                    <Button class="text-xs w-full">Apply</Button>
                    <Button
                        class="text-xs w-full"
                        variant="outline"
                        on:click={() => (collapse = true)}
                    >
                        Discard
                    </Button>
                {:else}
                    <Button
                        class="text-xs p-0 m-0"
                        variant="outline"
                        on:click={() => (collapse = false)}
                    >
                        <ChevronDown class="h-2"></ChevronDown>
                    </Button>
                {/if}
            </div>
        </div>

        {#if !collapse}
            <Separator></Separator>

            <div class="flex space-x-4">
                {#each suggestion.remarks as remark}
                    <Popover.Root>
                        <Popover.Trigger class="text-xs">
                            <div class="flex space-x-2 items-center">
                                {#if remark.appropriate}
                                    <CheckCircled class="w-4"></CheckCircled>
                                {:else}
                                    <CrossCircled class="w-4"></CrossCircled>
                                {/if}
                                <span>
                                    {remark.expertcode}
                                    <!-- Comments for each suggestion -->
                                </span>
                            </div>
                        </Popover.Trigger>
                        <Popover.Content class="text-sm">
                            <!-- Expert Name -->
                            <strong>
                                {expertNames[remark.expertcode]}
                            </strong>
                            <br />
                            {#if remark.comment}
                                <i>{remark.comment}</i>
                            {/if}
                        </Popover.Content>
                    </Popover.Root>

                    <Separator orientation="vertical"></Separator>
                {/each}
            </div>
        {/if}
    </Card.Content>
</Card.Root>
