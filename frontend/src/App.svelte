<script>
  import "./app.css";
  import { Button } from "$lib/components/ui/button";
  import { ModeWatcher } from "mode-watcher";
  import SetupView from "./views/SetupView.svelte";
  import ReviewView from "./views/ReviewView.svelte";
  import { fetchUser, user, updateUserObject } from "./model/User.svelte";
  import { OnboardingPhase } from "./model/Types";
  import RoleSelection from "./views/RoleSelection.svelte";
  import { onMount } from "svelte";
  import Loading from "./views/subviews/Loading.svelte";
  import Bar from "./views/subviews/Bar.svelte";
  import { bridgeGetEmail } from "./model/Bridge";

  // Google App Script Binded callback method
  const onUserEmailReceived = async (value) => {
    console.log("onUserEmailReceived", value);
    user.email = value;
    await fetchUser();
  };

  // Fetching initial variables from Google App Script.
  onMount(async () => {
    console.log("mounted");
    // @ts-ignore
    let config = window.globalConfig;
    // if config is set on the intial frame while app script creating the window for us.
    if (config) {
      user.email = config.email;
      // no need to await, can be removable after a regression test
      await fetchUser();
    } else {
      // Sometimes Apps Script cannot inject the user info, so trigger a retrieve method, then update the user object globally.
      bridgeGetEmail(onUserEmailReceived);
    }
  });
</script>

<ModeWatcher />
<Bar></Bar>

<main class="container mx-auto p-6 space-y-12">
  {#if user.onboarding_phase === ""}
    <Loading></Loading>
  {:else if user.onboarding_phase === OnboardingPhase.not_onboarded}
    <RoleSelection></RoleSelection>
  {:else if user.onboarding_phase === OnboardingPhase.role_selected}
    <SetupView></SetupView>
  {:else if user.onboarding_phase === OnboardingPhase.onboarding_completed}
    <ReviewView></ReviewView>
  {/if}
</main>

<Button
  on:click={() => {
    let newPhase = OnboardingPhase.not_onboarded;
    updateUserObject(newPhase).then((userResponse) => {
      user.onboarding_phase = newPhase;
    });
  }}
>
  Reset Flow</Button
>
<!-- <pre>
  {JSON.stringify(user, null, 2)}
</pre> -->

<!-- <Button on:click={() => {
  createDocuSignAgreement("Hello", "Sample Agreement Text", "im.mesut.yilmaz@gmail.com", "Mesut Yılmaz")
}}>Send to Sign</Button> -->
