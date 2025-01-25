<script>
  import "./app.css";
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  import { Button } from "$lib/components/ui/button";
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  import * as Select from "$lib/components/ui/select";
  import { ModeWatcher } from "mode-watcher";

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  import OnboardingPersonaStage from "./views/RoleSelection.svelte";
  import SetupView from "./views/SetupView.svelte";
  import ReviewView from "./views/ReviewView.svelte";
  import { fetchUser, user } from "./model/User.svelte";
  import { OnboardingPhase } from "./model/Types";
  import RoleSelection from "./views/RoleSelection.svelte";
  import { onMount } from "svelte";
  import Loading from "./views/subviews/Loading.svelte";
    import Bar from "./views/subviews/Bar.svelte";

  // Fetching initial variables from Google App Script.
  onMount(() => {
    // @ts-ignore
    let config = window.globalConfig
    if (config) {
      user.email = config.email;
      fetchUser();
      console.log(config.documentId)
    }
  })
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

<!-- <pre>
  {JSON.stringify(user, null, 2)}
</pre> -->