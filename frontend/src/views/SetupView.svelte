<script>
    import * as Select from "$lib/components/ui/select";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Card from "$lib/components/ui/card";

    import { Constants } from "../Constants";
    import CopyButton from "./CopyButton.svelte";
    import * as Collapsible from "$lib/components/ui/collapsible";
    import { CaretSort, Pencil2, Plus } from "svelte-radix";
    import { Badge } from "$lib/components/ui/badge";

    import { buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";

    import { Separator } from "$lib/components/ui/separator";
    import * as Accordion from "$lib/components/ui/accordion";

    var webhookUrl = Constants.base_url + "webhook";

    let experts = $state([
        {
            abbvr: "TA",
            name: "Todo Agent",
            description:
                "Keeps track of what has been talked; uses your meeting records and your comments to follow actions.",
            additionalPrompt: "",
            isDefaultExpert: true,
        },
        {
            abbvr: "CE",
            name: "Commercial Expert",
            description: "Suggests and keeps commercial focused suggestions.",
            additionalPrompt: "Always try to maximize profits.",
            isDefaultExpert: true,
        },
        {
            abbvr: "IP",
            name: "Intellectual Property Expert",
            description:
                "Suggests and keeps your intellectual property rights guarenteed.",
            additionalPrompt: "",
            isDefaultExpert: true,
        },
    ]);

    var shouldPopupBeOpen = $state(false);
    var warningMessage = $state("");
    var newExpertsAbbvr = $state("NE");
    var newExpertsName = $state("");
    var newExpertsRole = $state("");

    var newAgentAddAction = () => {
        if (newExpertsName.length > 3 && newExpertsRole.length > 20) {
            let object = {
                abbvr: newExpertsAbbvr,
                name: newExpertsName,
                description: "Defined by you.",
                additionalPrompt: newExpertsRole,
            };

            experts.push(object);
            console.log(object, experts);
            newExpertsAbbvr = "NE";
            newExpertsName = "";
            newExpertsRole = "";
            warningMessage = "";
            shouldPopupBeOpen = false;
        } else {
            warningMessage =
                "Please enter 3+ characters for name and 20+ for role definition.";
        }
    }
</script>

<div class={Constants.sizes.onboardingContainerProp}>
    <h1 class="text-3xl">Setup</h1>

    <h2 class="text-xl">Bind your Transcriber Agent</h2>

    <div>
        Here's your webhook:
        <p>
            <u>{webhookUrl}</u>
            <CopyButton text={webhookUrl} />
        </p>
    </div>

    <Separator class={Constants.sizes.onboardingWidth}></Separator>

    <h2 class="text-xl">Meet your Experts</h2>

    <div class={Constants.sizes.onboardingWidth}>
        <Accordion.Root class="w-full">
            {#each experts as expert}
                <Accordion.Item value={expert.abbvr}>
                    <Accordion.Trigger>
                        <div
                            class="flex-col justify-items-start space-y-0 mb-4"
                        >
                            <div
                                class={Constants.sizes.onboardingWidth +
                                    " flex items-center space-x-4 justify-between"}
                            >
                                <div>
                                    <Badge
                                        variant={expert.isDefaultExpert === true
                                            ? "default"
                                            : "secondary"}>{expert.abbvr}</Badge
                                    >
                                    <span> {expert.name} </span>
                                    {#if expert.isDefaultExpert}
                                        <span class="text-xs">System</span>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </Accordion.Trigger>
                    <Accordion.Content>
                        <div class=" mb-6 space-y-4">
                            <p class="text-sm">
                                {expert.description}
                            </p>
                            <h3>Want to customize more?</h3>
                            <Textarea
                                placeholder="If you want to fine-tune '{expert.name}'s suggestions, you can add a prompt. Otherwise system prompt will be applied."
                                value={expert.additionalPrompt}
                                rows="5"
                            ></Textarea>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            {/each}
        </Accordion.Root>
    </div>

    <h3 class="text-xl">Do you need more Experts?</h3>
    <div>
        <Dialog.Root bind:open={shouldPopupBeOpen}>
            <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
                Add a New Expert
            </Dialog.Trigger>

            <Dialog.Content class="sm:max-w-[425px]">
                <Dialog.Header>
                    <Dialog.Title>Add a New Expert</Dialog.Title>
                    <Dialog.Description>
                        Add a new AI powered expert or agent.
                    </Dialog.Description>
                </Dialog.Header>

                <div class="grid gap-4 py-4">
                    <div class="grid grid-cols-4 items-end gap-4">
                        <Label for="name" class="text-right">Symbol</Label>
                        <Badge class="w-10">{newExpertsAbbvr}</Badge>
                    </div>
                    <div class="grid grid-cols-4 items-end gap-4">
                        <Label for="name" class="text-right"
                            >Expert's Name</Label
                        >
                        <Input
                            id="name"
                            placeholder="New Expert"
                            class="col-span-3"
                            onchange={(e) => {
                                let value = e.target.value;
                                console.log(value);
                                let initials = value
                                    .trim()
                                    .split(/\s+/)
                                    .slice(0, 2)
                                    .map((word) => word.charAt(0).toUpperCase())
                                    .join("");
                                newExpertsName = value;
                                if (initials !== "") {
                                    newExpertsAbbvr = initials;
                                }
                            }}
                        />
                    </div>
                    <div class="grid grid-cols-4 items-top gap-4">
                        <Label for="persona-prompt" class="text-right"
                            >Expert's Role</Label
                        >
                        <Textarea
                            class="col-span-3"
                            id="persona-prompt"
                            placeholder="Please define your expert's role in a concise manner."
                            onchange={(e) => (newExpertsRole = e.target.value)}
                            rows="5"
                        />
                    </div>
                </div>

                <Dialog.Footer>
                    <span class="text-xs p-2" style="color:red">
                        {warningMessage}
                    </span>

                    <Button type="submit" onclick={ newAgentAddAction }>Add Expert</Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
    </div>

    <Separator class={Constants.sizes.onboardingWidth}></Separator>

    <Button>{Constants.text.save_button}</Button>
</div>
