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
    import * as Tabs from "$lib/components/ui/tabs";

    let selectedRole = $state(Object.keys(roles)[0]);
    let suggestedPrompt = $derived(roles[selectedRole].prompt);
</script>

<div class="flex flex-col w-full space-y-4 items-center">
    <center>
        <Label>Profile</Label>
    </center>

    <Tabs.Root value={Object.keys(roles)[0]}>
        <Tabs.List class="h-auto">
            {#each Object.keys(roles) as role_key}
                <Tabs.Trigger value={role_key} class="flex flex-col text-xs">
                    {roles[role_key].role_name}
                </Tabs.Trigger>
            {/each}
        </Tabs.List>
        <Tabs.Content value="account">
            Make changes to your account here.
        </Tabs.Content>
        <Tabs.Content value="password">Change your password here.</Tabs.Content>
    </Tabs.Root>

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
