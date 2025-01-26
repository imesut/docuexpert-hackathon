
export const processAgreement = async (
    userUrl: string,
    envelopeObject: object,
    token: string
) => {

    const result = await fetch(userUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(envelopeObject),
    });

    if (!result.ok) {
        let errorText = await result.text()
        console.log(result, errorText)
        return { error: "Problem while getting response from AI", detail: errorText }
    }

    let json = await result.json()
    return json

}