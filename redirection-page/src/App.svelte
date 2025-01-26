<script lang="ts">
  import { createClient } from "@supabase/supabase-js";
  import "./app.css";
  import { onMount } from "svelte";
  import type { DocusingCredentials } from "../../frontend/src/model/Types";

  const supabaseUrl = "https://iskmjdptvowmwziqiiqg.supabase.co";
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const updateDocusignCredentials = async (
    email: string,
    credentials: DocusingCredentials,
  ) => {
    const { data, error } = await supabase
      .from("users")
      .update({ docusign_credentials: credentials })
      .eq("email", email)
      .select();
  };

  // let email = $state<string>("");
  let didUpdatedTokenInDb = $state(false);

  function getUrlParams(url: string) {
    const hash = url.split("#")[1];
    return Object.fromEntries(new URLSearchParams(hash));
  }

  onMount(() => {
    // Todo : add dynamic user email fetch method.
    let email = "wehackt@gmail.com";
    let currentUrl = window.location.href;
    let params = getUrlParams(currentUrl);
    let token = params["access_token"];
    let expirationTime =
      Date.now() + (params["expires_in"] as unknown as number) * 1000;

    if (token && expirationTime) {
      updateDocusignCredentials(email, {
        accessToken: token,
        accessTokenExpirationDate: expirationTime,
      }).then((userData) => {
        didUpdatedTokenInDb = true;
      });
    }

    // var url = new URL(currentUrl);
    // var emailInUrl = url.searchParams.get("email");
    // email = emailInUrl ? emailInUrl! : "";
  });
</script>

<main>
  <div class="flex flex-col w-full h-screen">
    <div class="m-auto flex flex-col items-center space-y-4">
      <span class="text-2xl mt-4 mb-4">
        docu<span class="text-purple-600">expert</span>
      </span>

      {#if didUpdatedTokenInDb}
        <span>Welcome</span>

        <span class="mt-4 mb-4">
          You may close the window, and continue your process from Google Docs
          addon.
        </span>
      {:else}
        Loading...
      {/if}

      <hr class="mt-4 mb-4 w-full" />

      <span class="text-sm">A hackathon project</span>
      <a
        class="text-sm underline"
        href="https://github.com/imesut/docusign-transcript-agent"
        >View at Github</a
      >
    </div>
  </div>
</main>
