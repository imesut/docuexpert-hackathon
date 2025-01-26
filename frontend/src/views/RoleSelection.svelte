<script>
    // @ts-nocheck

    import * as Select from "$lib/components/ui/select";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Button } from "$lib/components/ui/button";
    import { Check, Value } from "svelte-radix";
    import { Constants } from "../Constants";

    import { roles } from "../model/Data";
    import { updateUserObject, user } from "../model/User.svelte";
    import { OnboardingPhase } from "../model/Types";

    let selectedRole = $state(Object.keys(roles)[0]);
    let suggestedPrompt = $derived(roles[selectedRole].prompt);
</script>

<div class="flex flex-col w-full space-y-4 items-center">
    <center>
        <Label>Profile</Label>
    </center>

    <Select.Root
        onSelectedChange={(selection) => {
            selectedRole = selection.value;
            user.occupation = selection.value;
            user.perspective = roles[selectedRole].prompt;
        }}
    >
        <Select.Trigger>
            <Select.Value
                placeholder={roles[Object.keys(roles)[0]].role_name}
            />
        </Select.Trigger>
        <Select.Content>
            {#each Object.keys(roles) as role}
                <Select.Item value={role}>{roles[role].role_name}</Select.Item>
            {/each}
        </Select.Content>
    </Select.Root>

    <div class="space-y-4 w-full flex flex-col">
        <Label for="persona-prompt">Provide your Profile and Goals</Label>
        <span class="text-xs">
            Your contract will be edited based on the prompt you provide.
            Therefore, please write a text introducing your profile and
            outlining your goals.
        </span>
        <Textarea
            class="w-full"
            id="persona-prompt"
            value={suggestedPrompt}
            rows="4"
            on:input={(e) => {
                let value = e.target.value;
                user.perspective = value;
            }}
        />
    </div>

    <Button
        on:click={() => {
            let newPhase = OnboardingPhase.role_selected;
            updateUserObject(newPhase).then((userResponse) => {
                user.onboarding_phase = newPhase;
            });
        }}
    >
        {Constants.text.continue_button}
    </Button>
</div>
