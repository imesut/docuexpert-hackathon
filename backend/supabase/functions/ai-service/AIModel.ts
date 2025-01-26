type Expert = {
    abbvr: string;
    name: string;
    prompt: string;
}

const generateUserPrompt = (agreement: string, experts: Expert[], transcriptText: string) => {
    var prompt = "Here is my definition of experts:\n"

    experts.forEach(expert => {
        prompt += `
        Expert:
        abbvr : ${expert.abbvr}
        name : ${expert.name}
        prompt : ${expert.prompt}
        ---
        `
    });

    prompt += "\n\nHere is my transcript:\n"
    prompt += transcriptText
    prompt += "\nEND OF TRANSCRIPT\n\n"

    prompt += "Here is my agreement text:\n"
    prompt += agreement
    prompt += "\nEND OF AGREEMENT"

    return prompt
}

const countWords = (str) => {
    return str.trim().split(/\s+/).length;
}

const apiKey = Deno.env.get('ANTHROPIC_API_KEY')

const systemPrompt = `
You're an orchestrator of experts, user will define some experts roles. There will be some roles like Todo analyst, intellectual property expert etc. Please give suggestions about the agreement text according to transcript added gathered from the disussions about this agreement. So please offer your suggestions by under these roles for each and provide me a json response. The user will share agent definitions with these keys: 
abbvr : is a short code name of the agent
name : expert's name
prompt : You can consider the prompt as the definition of this expert's role.

Let's talk about the output.
Please give us an array of suggestion where suggestion would be an object defined with these fields:
new_version : Your suggestion on the text, what should be added or revised in the text?
old_version : What was the text before your suggestion? Plese provide the exact sentences or words from the text, because, we'll replace this old_version with new_version directly.
by : which expert suggested this suggestion? Provide its abbvr value.
comment: why the expert give this suggestion, please describe with 1 or 2 sentences.

remarks: Remarks is the place of other expert's comments. Please provide the brief remarks of other experts' evaluation regarding the suggestion. Remarks should be an array which contains objects as below;

expertcode: which expert is commention on the suggestion, please provide its abbvr
appropriate : if other expert don't see a problem with the suggestion according to its definition, this area should be true, if an expert doesn't find the suggestion appropriate this area should be false
comment: only provide the comment of an expert if it doesn't find the suggestion appropriate. if expert find it appropriate, don't include this field in the object.

Please give the outcome just as json response, don't add a beginning comment sentence. 
`

export const getAIresponse = async (agreement: string, experts: [], transcript: string, additionalSystemPrompt: string) => {

    let userPrompt = generateUserPrompt(agreement, experts, transcript)

    let maxOutputWordSize = countWords(agreement + transcript)

    let systemPromptWithAddition = `
    ${systemPrompt}

    ${additionalSystemPrompt}
    `

    let result = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: maxOutputWordSize,
            system: systemPromptWithAddition,
            messages: [{ role: 'user', content: userPrompt }]
        })
    })

    if (!result.ok) {
        let errorText = await result.text()
        console.log(result, errorText)
        return { error: "Problem while getting response from AI", detail : errorText }
    }

    let json = await result.json()
    return json
} 
