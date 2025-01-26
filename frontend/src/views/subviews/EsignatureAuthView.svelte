<script>
    import { Button } from "$lib/components/ui/button";

    import {
        accessTokenUri,
        createEnvelope,
        getLatestDocusignCredentials,
    } from "../../model/Esignature";
    import { user } from "../../model/User.svelte";

    let didClickedRedirectionLink = $state(false);
</script>

<!-- Checking if object has required values and the token is still valid. -->
{#if user.docusign_credentials.accessToken && user.docusign_credentials.usersAccountId && Date.now() < user.docusign_credentials.accessTokenExpirationDate}
    <Button class="p-6" on:click={() => createEnvelope()}>
        Send to Signature
    </Button>
{:else}
    <!-- Expired : renew token -->
    {#if Date.now() > user.docusign_credentials.accessTokenExpirationDate}
        <a
            href={accessTokenUri}
            target="_blank"
            onclick={() => (didClickedRedirectionLink = true)}
        >
            Start with docusign
        </a>
    {:else}
        <!-- Didn't expired, so user related items should be not existing; so get user related info -->
        {#if didClickedRedirectionLink}
            <p class="text-xs">Did you see a success message?</p>
        {/if}
        <Button class="p-6" on:click={() => getLatestDocusignCredentials()}>
            Prepare for Signing
        </Button>
    {/if}
{/if}
