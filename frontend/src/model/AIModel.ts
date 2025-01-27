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
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonSanitized
    })

    if (!response.ok) {
        const errorText = await response.text();
        console.error('AI model response failed:', errorText);
        return {error : errorText};
    }

    const result = await response.json();
    return result.suggestions as Suggestion[];
}