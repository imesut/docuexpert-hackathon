export let roles = {
    seller: {
        role_name: "Seller",
        prompt: "I want to be sure about my services can be sold.",
    },
    buyer: {
        role_name: "Buyer",
        prompt: "I want to be sure about my company can benefit from this purchase.",
    },
    legal_person: {
        role_name: "Legal Person",
        prompt: "I want to be sure about this agreement guarantees the legal compliance and preserve our rights.",
    },
};


export let defaultExperts = [
    {
        abbvr: "TA",
        name: "Todo Agent",
        description:
            "Keeps track of what has been talked; uses your meeting records and your comments to follow actions.",
        prompt: "Summarize the todos from transcript.",
        isDefaultExpert: true,
    },
    {
        abbvr: "CE",
        name: "Commercial Expert",
        description: "Suggests and keeps commercial focused suggestions.",
        prompt: "Always try to maximize profits.",
        isDefaultExpert: true,
    },
    {
        abbvr: "IP",
        name: "Intellectual Property Expert",
        description: "Suggests and keeps your intellectual property rights guarenteed.",
        prompt: "You're an expert in IP law, offer or weighten the items which will preserve the intellectual properties.",
        isDefaultExpert: true,
    },
]