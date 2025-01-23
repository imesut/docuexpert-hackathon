<script>
    import * as Select from "$lib/components/ui/select";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Button } from "$lib/components/ui/button";
    import { Value } from "svelte-radix";
    import { Constants } from "../Constants";
    
    let roles = {
        seller: {
            role_name: "Seller",
            prompt: "I want to be sure about my services can be sold.",
        },
        buyer: {
            role_name: "Buyer",
            prompt: "I want to be sure about my company can benefit from this purchase.",
        },
        legal_person: {
            role_name: "Legal Person",
            prompt: "I want to be sure about this agreement guarantees the legal compliance and preserve our rights.",
        },
    };

    var selectedRole = $state(Object.keys(roles)[0]);
</script>

<div class={Constants.sizes.onboardingContainerProp}>
    <Label>I'm a,</Label>

    <Select.Root
        onSelectedChange={(selection) => (selectedRole = selection.value)}
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

    <div class={Constants.sizes.onboardingWidth}>
        <Label for="persona-prompt">Your Perspective</Label>
        <Textarea
            id="persona-prompt"
            value={roles[selectedRole].prompt}
            rows="4"
        />
    </div>

    <Button>{Constants.text.continue_button}</Button>
</div>
