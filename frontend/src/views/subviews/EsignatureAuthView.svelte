<script>
    import { Button } from "$lib/components/ui/button";
    import { exampleTranscriptionText } from "../../model/Data";

    import {
        accessTokenUri,
        createEnvelope,
        getLatestDocusignCredentials,
    } from "../../model/Esignature";
    import { user } from "../../model/User.svelte";

    let didClickedRedirectionLink = $state(false);
    let didClickedToSend = $state(false);
</script>

<!-- Checking if object has required values and the token is still valid. -->
{#if user.docusign_credentials && user.docusign_credentials.accessToken && user.docusign_credentials.usersAccountId && Date.now() < user.docusign_credentials.accessTokenExpirationDate}
    <Button
        class="p-6"
        on:click={() => {
            didClickedToSend = true;
            createEnvelope(
                "im.mesut.yilmaz@gmail.com",
                "Mesut Yılmaz",
                "Sozlesme",
                `<strong>SOZLEME BASLADI.</strong>${exampleTranscriptionText}`,
            );
        }}
    >
        Send to Signature
    </Button>
    {#if didClickedToSend}
        <p class="text-xs">The agreement has been sent!</p>
    {/if}
{:else}
    <!-- Expired : renew token -->
    {#if !user.docusign_credentials || Date.now() > user.docusign_credentials.accessTokenExpirationDate}
        <a
            href={accessTokenUri}
            target="_blank"
            on:click={() => {
                console.log("clicked a tag");
                didClickedRedirectionLink = true;
            }}
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
