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
        Update,
    } from "svelte-radix";
    import * as Drawer from "$lib/components/ui/drawer";
    import * as Card from "$lib/components/ui/card";
    import { Badge } from "$lib/components/ui/badge";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import * as Popover from "$lib/components/ui/popover";
    import { user } from "../model/User.svelte";
    import SuggestionCard from "./subviews/SuggestionCard.svelte";
    import {
        transcripts,
        selectedTranscript,
        fetchTranscripts,
    } from "../model/Transcript.svelte";
    import Loading from "./subviews/Loading.svelte";
    import EsignatureAuthView from "./subviews/EsignatureAuthView.svelte";

    import { inquireAI } from "../model/AIModel";
    import { bridgeGetAgreementText } from "../model/Bridge";

    let suggestions = $state({ suggestions: [] });

    let onAgreementTextReceived = async (value) => {
        // console.log(
        //     "ReviewView",
        //     "onAgreementTextReceived",
        //     "agreementText",
        //     value,
        // );

        let transcriptText = transcripts[selectedTranscript.index].body;
        let suggestionsResult = await inquireAI(
            value,
            user.custom_agents,
            transcriptText,
        );

        console.log("suggestionsResult", suggestionsResult)

        // console.log( "ReviewView", "onAgreementTextReceived", "json stringify", JSON.stringify({
        //         transcriptText: transcriptText,
        //         agreementText: agreementText,
        //     }),
        // );

        // console.log("ReviewView", "onAgreementTextReceived", "agents / transcript", transcriptText)

        if (suggestionsResult) {
            suggestions.suggestions = suggestionsResult;
        }
    };

    let didUserInquiredAI = $state(false);

    let expertList =
        user.custom_agents && user.custom_agents.length > 0
            ? user.custom_agents
            : defaultExperts;

    const expertNames = expertList.reduce((acc, agent) => {
        acc[agent.abbvr] = agent.name;
        return acc;
    }, {});

    let promise = fetchTranscripts();
</script>

<!-- Select from Transcripts -->

<div class="w-full flex flex-col space-y-4">
    <div id="select-transcript" class="flex flex-col space-y-2 mb-4">
        {#await promise}
            <Loading id="fetch_transcriptions_loading" text="Fetching Transcriptions"></Loading>
        {:then loadedData}
            <h2 class="text-xl">Select a transcript</h2>
            <i class="text-xs">
                Use a transcript from a meeting to generate insights and control
                revisions about this agreement
            </i>

            <div class="flex flex-col space-y-1 w-full space-between">
                <Select.Root
                    selected={{
                        label: transcripts[selectedTranscript.index]
                            .transcript_title,
                        value: selectedTranscript.index,
                    }}
                    onSelectedChange={(selection) => {
                        selectedTranscript.index = selection.value;
                    }}
                >
                    <Select.Trigger class="w-full">
                        <Select.Value placeholder={selectedTranscript} />
                    </Select.Trigger>
                    <Select.Content>
                        {#each transcripts as transcript, index}
                            <Select.Item value={index}>
                                {transcript.transcript_title}
                            </Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>

                <span class="text-xs">
                    You met at {new Date(
                        transcripts[selectedTranscript.index].created_at,
                    ).toLocaleString()}

                    <!-- A preview of transcript -->

                    <Drawer.Root>
                        <Drawer.Trigger>
                            <Button class="text-xs" variant="ghost">
                                View Transcript
                            </Button>
                        </Drawer.Trigger>
                        <Drawer.Content>
                            <Drawer.Header>
                                <Drawer.Title>
                                    <span class="m-4">Transcript</span>
                                </Drawer.Title>
                                <Drawer.Description>
                                    <div>
                                        <ScrollArea
                                            orientation="horizontal"
                                            class="h-[60vh] w-[80vw] mx-auto rounded-md border"
                                        >
                                            <pre>
                                                {transcripts[
                                                    selectedTranscript.index
                                                ].body}
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
                </span>
            </div>
        {:catch}
            <span class="text-xs p-2" style="color:red">
                Error while fetching transcirpts.
            </span>
        {/await}
    </div>

    {#if !didUserInquiredAI}
        <div id="sign-button-area" class="flex flex-col space-y-4">
            <h2 class="text-xl">Generate Insights</h2>
            <p class="text-sm">
                Generate actionable insights from defined experts (AI Agents)
            </p>

            <Button
                class="p-6"
                on:click={() => {
                    didUserInquiredAI = true;
                    console.log(
                        user.custom_agents,
                        $state.snapshot(
                            transcripts[selectedTranscript.index].body,
                        ),
                    );
                    bridgeGetAgreementText(onAgreementTextReceived);
                }}
            >
                Generate Expert Insights
            </Button>
        </div>

        <!-- TODOS view -->
    {:else}
        <div id="actionable-insights" class="pt-4 space-y-2">
            <h2 class="text-xl">Experts' Insights</h2>

            {#if suggestions.suggestions.length > 0}
                {#each suggestions.suggestions as suggestion}
                    <SuggestionCard {expertNames} {suggestion}></SuggestionCard>
                {/each}
            {:else}
                <Loading id="actionable-insight_loading"></Loading>
            {/if}
        </div>
    {/if}

    <!-- Ready to Sign Document -->

    <div id="send-to-signature" class="flex flex-col pt-6 pb-8 space-y-4">
        <h2 class="text-xl">Ready to Sign?</h2>
        <p>If the revisions are done, send agreement to signers.</p>

        <EsignatureAuthView></EsignatureAuthView>
    </div>
</div>
