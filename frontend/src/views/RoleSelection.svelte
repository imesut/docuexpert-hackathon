<script>
    // @ts-nocheck

    import * as Select from "$lib/components/ui/select";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Button } from "$lib/components/ui/button";
    import { Value } from "svelte-radix";
    import { Constants } from "../Constants";

    import { roles } from "../model/Data";
    import { updateUserObject, user } from "../model/User.svelte";
    import { OnboardingPhase } from "../model/Types";

    let selectedRole = $state(Object.keys(roles)[0]);
    let suggestedPrompt = $derived(roles[selectedRole].prompt);

</script>

<div class="w-full">
    <Label>I'm a,</Label>

    <Select.Root
        onSelectedChange={(selection) => {
            selectedRole = selection.value;
            user.occupation = selection.value;
            user.perspective = roles[selectedRole].prompt
        }}
    >
        <Select.Trigger class={Constants.sizes.onboardingWidth}>
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

    <div class="w-full">
        <Label for="persona-prompt">Your Perspective</Label>
        <Textarea
            id="persona-prompt"
            value={suggestedPrompt}
            rows="4"
            on:input={(e) => {
                let value = e.target.value;
                user.perspective = value;
                console.log(e);
            }}
        />
    </div>

    <Button
        on:click={() => {
            updateUserObject().then((userResponse) => {
                user.onboarding_phase = OnboardingPhase.role_selected;
            });
        }}
    >
        {Constants.text.continue_button}
    </Button>
</div>
