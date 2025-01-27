import type { Suggestion } from "./Types";

function replaceNewlines(text) {
    return text.replace(/\n/g, 'NEWLINE');
   }


export let inquireAI = async (agreementText : string, experts : [], transcriptText : string) => {
    const aiBaseUrl = "https://iskmjdptvowmwziqiiqg.supabase.co/functions/v1/ai-service";


    let jsonText = JSON.stringify({
        agreementText : agreementText,
        experts : experts,
        transcriptText : transcriptText
    })

    let jsonSanitized = replaceNewlines(jsonText)

    const response = await fetch(aiBaseUrl, {
        mode: "no-cors",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonSanitized
    })

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Envelope creation failed:', errorText);
        return undefined;
    }

    const result = await response.json();
    return result.response as Suggestion[];
}