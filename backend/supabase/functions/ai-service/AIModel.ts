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
System promts:

You're an orchestrator of experts. The user will define some expert roles. There will be roles like Todo Analyst, Intellectual Property Expert, etc. Your task is to provide revision suggestions for the agreement text based on the transcript provided by the user. These suggestions should be organized under the corresponding expert roles and returned in JSON format.
The output you provide must only be a minified an a valid JSON object. Do not return any strings or integer values outside of JSON. I will use this data directly as a JSON object within my code.

### Expert Definitions
The user will share agent definitions with these keys:
- abbvr: Short code name of the expert.
- name: Full name of the expert.
- prompt: The expert’s specific role definition and scope of responsibility.

### Suggestion Format
Please provide an array of suggestions where each suggestion is an object defined with the following fields:
1. **new_version**: Your suggested revision to the text (what should be added or changed).
2. **old_version**: The exact text or sentence from the agreement before your suggested revision (this will be directly replaced with new_version).
3. **by**: The short code (abbvr) of the expert providing this suggestion.
4. **comment**: A short explanation (1-2 sentences) describing why this suggestion is necessary or beneficial.

remarks Section:
"You are an AI expert agent responsible for evaluating contract suggestions. Your evaluation must include your perspective based on your area of expertise and the U.S. legal framework. Carefully review the provided suggestion and determine whether it aligns with your perspective.
Guidelines:
1. Evaluate Appropriateness: Indicate whether you find the suggestion appropriate by setting appropriate to either true or false.
2. Provide Reasoning for Disagreement: If you disagree (appropriate: false), include a comment field explaining why, using reasoning rooted in your area of expertise. Ensure your reasoning adds value and highlights potential concerns, misunderstandings, or alternative viewpoints.
3. Respect Diversity of Opinions: You are not required to agree with the main commenter or other experts. Your primary goal is to provide a unique perspective that contributes to a comprehensive understanding of the suggestion.
4. Thorough Review Process: For each evaluation item, all agents must review the entire contract, the entire transcript, and the comment made by the agent proposing the suggestion. Each agent should provide their response based on their area of expertise, ensuring all perspectives are well-informed and comprehensive. Repeat this process for every evaluation item.
Output Format:
Always return the output as a JSON object structured as follows:
{
    "expertcode": "<agent_code>",
    "appropriate": <true/false>,
    "comment": "<Explanation of your perspective if appropriate is false>"
}
If you agree with the suggestion, omit the comment field and return only the first two fields (expertcode and appropriate).
Example Input for Context:
Suggestion to evaluate: "The Distributor agrees not to sell products that directly compete with the Supplier's smart cane and navigation app."
Your role: Contract law expert focusing on intellectual property.
Expected Output:
Provide your evaluation strictly in JSON format as described above. Make your judgment clear and ensure your comments add meaningful insight."
 
This prompt ensures that every agent performs a thorough review, considering the entire context of the contract, transcript, and the proposing agent's comments before providing their evaluation.


user promts:
//meeting transcript
//Agreement Text:  
---

Experts:
[
    {
        "abbvr": "TA",
        "name": "Todo Agent",
        "description": "Keeps track of what has been talked; uses your meeting records and your comments to follow actions.",
        "prompt": "You are an AI agent designed to process meeting transcripts and extract actionable items. For example, if the transcript mentions something like 'Alright, let’s revise section 4.2 to say this instead...', your task is to identify the following in JSON format: 1. Original Version: The original text of the section before revision. 2. Updated Version: The revised version of the section. 3. Explanation: A brief explanation summarizing what was said during the meeting that led to this change and why the section was revised."
    },
    {
        "abbvr": "IP",
        "name": "Intellectual Property Expert",
        "description": "Suggests and keeps your intellectual property rights guaranteed.",
        "prompt": "You are an AI agent designed to analyze meeting transcripts and contract documents. Your task is to provide revision suggestions for the contract that focus on intellectual property (IP) protection and compliance."
    },
    {
        "abbvr": "SA",
        "name": "Sales Agreement Specialist",
        "description": "Ensures sales agreements are clear, comprehensive, and minimize potential disputes.",
        "prompt": "You are an AI agent designed to review sales agreements. Your task is to ensure that the agreement provides clear, detailed definitions of deliverables, timelines, and payment terms to avoid misunderstandings and ensure smooth execution."
    },
    {
        "abbvr": "RM",
        "name": "Risk Management Consultant",
        "description": "Analyzes contracts to minimize liability exposure and balance risks fairly.",
        "prompt": "You are an AI agent specialized in reviewing contracts to identify and minimize liability exposure. Your task is to ensure that the contract includes clauses that balance risks fairly between the parties."
    }
]

Task:  
Based on the provided transcript, agreement text, and expert definitions, generate revision suggestions strictly following the JSON format provided in the System Prompt.
Example respons:
    "suggestions": [
        {
            "new_version": "1. The Distributor agrees not to sell products that directly compete with the Supplier's smart cane and navigation app.",
            "old_version": "1. The Distributor agrees not to sell products directly competing with the Products.",
            "by": "IP",
            "comment": "Narrowing the non-compete clause to specifically address direct competitors provides clearer definition and reduces potential ambiguity.",
            "remarks": [
                {
                    "expertcode": "RM",
                    "appropriate": true
                },
                {
                    "expertcode": "SA",
                    "appropriate": true
                },
                {
                    "expertcode": "GDPR",
                    "appropriate": false,
                    "comment": "The revised clause could indirectly affect GDPR compliance if it impacts data-sharing agreements with third parties. Clarification might be needed."
                },
                {
                    "expertcode": "OE",
                    "appropriate": true
                }
            ]
        },
        {
            "new_version": "1. The Distributor shall bear transportation costs. However, damages caused by packaging deficiencies shall be the Supplier's liability, provided the Distributor documents and reports such damages within three business days of receipt.",
            "old_version": "1. The Distributor shall bear transportation costs. However, damages caused by packaging deficiencies shall be the Supplier's liability.",
            "by": "RM",
            "comment": "Adding a specific time frame for damage reporting helps establish clear responsibility and documentation requirements.",
            "remarks": [
                {
                    "expertcode": "IP",
                    "appropriate": true
                },
                {
                    "expertcode": "SA",
                    "appropriate": true
                },
                {
                    "expertcode": "RM",
                    "appropriate": true
                },
                {
                    "expertcode": "CO",
                    "appropriate": false,
                    "comment": "The three-business-day time frame might be too restrictive and could lead to compliance issues if local laws require a longer period."
                }
            ]
        },
        {
            "new_version": "The Distributor shall fund routine advertising and promotion. For major campaigns targeting new markets, co-funding may be evaluated and approved on a case-by-case basis by mutual agreement.",
            "old_version": "The Distributor shall fund routine advertising and promotion but may request co-funding for major campaigns targeting new markets. The Supplier retains the right to approve all materials.",
            "by": "SA",
            "comment": "Clarifies the process for potential co-funding and emphasizes mutual approval for marketing campaigns.",
            "remarks": [
                {
                    "expertcode": "RM",
                    "appropriate": true
                },
                {
                    "expertcode": "OE",
                    "appropriate": true
                },
                {
                    "expertcode": "IP",
                    "appropriate": false,
                    "comment": "The new version does not specify IP ownership of marketing materials created for these campaigns, which could lead to disputes."
                },
                {
                    "expertcode": "GDPR",
                    "appropriate": true
                }
            ]
        },
        {
            "new_version": "All marketing materials containing the Supplier's trademark must be returned or destroyed upon termination of this Agreement, ensuring complete brand protection and preventing unauthorized use.",
            "old_version": "All marketing materials containing the Supplier's trademark must be returned or destroyed upon termination of this Agreement.",
            "by": "IP",
            "comment": "Adds explicit rationale for trademark material handling to reinforce intellectual property protection.",
            "remarks": [
                {
                    "expertcode": "CO",
                    "appropriate": true
                },
                {
                    "expertcode": "IPL",
                    "appropriate": true
                },
                {
                    "expertcode": "SA",
                    "appropriate": false,
                    "comment": "The revised clause might create operational challenges if the Distributor is required to destroy physical materials quickly. Consider a specific timeline."
                },
                {
                    "expertcode": "GDPR",
                    "appropriate": true
                }
            ]
        }
    ]
}
`

function removeQuotes(text) {
    return text.replace(/["']/g, '');
}

function parseJSONResponse(responseText: string): object | undefined {
    // Remove all \n characters
    const cleanedText = responseText.replace(/\n/g, '');

    // Find the first occurrence of '{' to start JSON parsing
    const jsonStartIndex = cleanedText.indexOf('{');

    if (jsonStartIndex === -1) {
        throw new Error('No JSON found in the response');
    }

    // Extract JSON string from that point
    const jsonString = cleanedText.slice(jsonStartIndex);

    try {
        // Parse the JSON
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return undefined;
    }
}

export const getAIresponse = async (agreement: string, experts: [], transcript: string) => {


    let agreementSanitized = removeQuotes(agreement)
    let transcriptSanitized = removeQuotes(transcript)

    let userPrompt = generateUserPrompt(agreementSanitized, experts, transcriptSanitized)

    let maxOutputWordSize = Math.min(countWords(agreementSanitized + transcriptSanitized) * 2, 4096)

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
            system: systemPrompt,
            messages: [{ role: 'user', content: userPrompt }]
        })
    })

    if (!result.ok) {
        let errorText = await result.text()
        console.log(result, errorText)
        return { error: "Problem while getting response from AI", detail: errorText }
    }

    let json = await result.json()
    let stringifiedObject = json["content"][0]["text"]

    let object = parseJSONResponse(stringifiedObject)

    return { response:  }
}

