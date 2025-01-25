<script>
    // @ts-nocheck
    import * as Select from "$lib/components/ui/select";
    import {
        defaultExperts,
        exampleSuggestions,
        exampleTranscriptionText,
    } from "../model/Data";
    import { Label } from "$lib/components/ui/label/index.js";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
    import { Button } from "$lib/components/ui/button";
    import {
        Check,
        CheckCircled,
        CrossCircled,
        InfoCircled,
        Size,
    } from "svelte-radix";
    import * as Drawer from "$lib/components/ui/drawer";
    import * as Card from "$lib/components/ui/card";
    import { Badge } from "$lib/components/ui/badge";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import * as Popover from "$lib/components/ui/popover";
    import { user } from "../model/User.svelte";
    import SuggestionCard from "./subviews/SuggestionCard.svelte";

    let expertList =
        user.custom_agents && user.custom_agents.length > 0
            ? user.custom_agents
            : defaultExperts;
    const expertNames = expertList.reduce((acc, agent) => {
        acc[agent.abbvr] = agent.name;
        return acc;
    }, {});

    let selectedTranscript = $state("Last Transcript");
    const transcriptList = ["Last Transcript", "a", "b", "c"];
</script>

<!-- Select from Transcripts -->

<div class="w-full flex flex-col space-y-4">
    <div class="flex flex-col space-y-2 mb-4">
        <Label>Select a transcript</Label>
        <i class="text-xs"
            >Use a transcript from a meeting to generate insights and control
            revisions about this agreement</i
        >

        <div class="flex space-x-2">
            <Select.Root
                selected={{
                    label: selectedTranscript,
                    value: selectedTranscript,
                }}
                onSelectedChange={(selection) => {
                    selectedTranscript = selection.value;
                }}
            >
                <Select.Trigger class="w-full">
                    <Select.Value placeholder={selectedTranscript} />
                </Select.Trigger>
                <Select.Content>
                    {#each transcriptList as transcript}
                        <Select.Item value={transcript}
                            >{transcript}</Select.Item
                        >
                    {/each}
                </Select.Content>
            </Select.Root>

            <!-- A preview of transcript -->

            <Drawer.Root>
                <Drawer.Trigger>
                    <Button class="text-xs">View Transcript</Button>
                </Drawer.Trigger>
                <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Title>
                            <center class="m-4">Transcript</center>
                        </Drawer.Title>
                        <Drawer.Description>
                            <div class="w[100vw]">
                                <ScrollArea
                                    class="h-[60vh] w-[80vw] mx-auto rounded-md border"
                                >
                                    <pre>
                            {exampleTranscriptionText}
                        </pre>
                                </ScrollArea>
                            </div>
                        </Drawer.Description>
                    </Drawer.Header>
                    <Drawer.Footer>
                        <Drawer.Close>Close</Drawer.Close>
                    </Drawer.Footer>
                </Drawer.Content>
            </Drawer.Root>
        </div>
    </div>

    <!-- TODOS view -->

    {#each exampleSuggestions as suggestion}
        <SuggestionCard {expertNames} {suggestion}></SuggestionCard>
    {/each}
</div>
