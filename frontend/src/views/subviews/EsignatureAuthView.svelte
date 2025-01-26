<script>
    import { Button } from "$lib/components/ui/button";
    import { exampleTranscriptionText } from "../../model/Data";

    import {
        accessTokenUri,
        createEnvelope,
        getLatestDocusignCredentials,
    } from "../../model/Esignature";
    import { user } from "../../model/User.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Loading from "./Loading.svelte";

    let didClickedRedirectionLink = $state(false);
    let serviceResult = $state({ didSentToService: false, result: false });
</script>

<!-- Checking if object has required values and the token is still valid. -->
{#if user.docusign_credentials && user.docusign_credentials.accessToken && user.docusign_credentials.usersAccountId && Date.now() < user.docusign_credentials.accessTokenExpirationDate}
    <div id="finalize-agreement" class="space-y-2">
        <div class="flex">
            <span class="text-xs">Recipient Mail:</span>
            <Input placeholder="recipient's mail address" value={user.email}
            ></Input>
        </div>
        <div class="flex">
            <span class="text-xs">Recipient name:</span>
            <Input value="Recipient Name"></Input>
        </div>

        <Button
            class="p-6"
            on:click={async () => {
                serviceResult.didSentToService = true;

                let result = await createEnvelope(
                    "im.mesut.yilmaz@gmail.com",
                    "Mesut Yılmaz",
                    "Sozlesme",
                    `<strong>SOZLEME BASLADI.</strong>${exampleTranscriptionText}`,
                );
                if (result) {
                    serviceResult.result = true;
                } else {
                }
            }}
        >
            Send Agreement to Signature
        </Button>

        {#if serviceResult.didSentToService && !serviceResult.result}
            <Loading></Loading>
            {:else if serviceResult.didSentToService && serviceResult.result}
            <p class="text-xs" style="color:green">The agreement has been sent!</p>
            {:else if serviceResult.didSentToService && !serviceResult.result}
            <p class="text-xs" style="color:red">Couldn't send the agreement.</p>
        {/if}
    </div>
{:else}
    <!-- Expired : renew token -->
    {#if !user.docusign_credentials || Date.now() > user.docusign_credentials.accessTokenExpirationDate}
        <a
        class="underline"
            href={accessTokenUri}
            target="_blank"
            onclick={() => {
                console.log("clicked a tag");
                didClickedRedirectionLink = true;
            }}
        >
            Sign in with Docusign
        </a>
    {:else}
        <!-- Didn't expired, so user related items should be not existing; so get user related info -->
        {#if didClickedRedirectionLink}
            <p class="text-xs">Did you see a success message?</p>
        {/if}
        <Button class="p-6" on:click={() => getLatestDocusignCredentials()}>
            Prepare Document for Signing
        </Button>
    {/if}
{/if}
