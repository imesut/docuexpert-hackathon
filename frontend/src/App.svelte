<script>
  import "./app.css";
  import { Button } from "$lib/components/ui/button";
  import * as Select from "$lib/components/ui/select";
  import { ModeWatcher } from "mode-watcher";

  import OnboardingPersonaStage from "./views/OnboardingPersonaStage.svelte";
  import SetupView from "./views/SetupView.svelte";
    import ReviewView from "./views/ReviewView.svelte";
</script>

<ModeWatcher />
<main class="container mx-auto p-6 space-y-12">

  <ReviewView></ReviewView>
  <hr>
  <SetupView />
  <hr />
  <OnboardingPersonaStage />
</main>
