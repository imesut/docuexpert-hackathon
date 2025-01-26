import docusign from "docusign-esign"
const integrationKey = import.meta.env.VITE_DOCUSIGN_ESIGNATURE_INTEGRATION_KEY
const accountId = import.meta.env.VITE_DOCUSIGN_ESIGNATURE_ACCOUNT_ID
const userId = import.meta.env.VITE_DOCUSIGN_ESIGNATURE_USERID
const docusignBaseUrl = import.meta.env.VITE_DOCUSIGN_ESIGNATURE_ACCOUNT_BASE_URI
const keyB64 = import.meta.env.VITE_DOCUSIGN_KEY_B64
import * as jose from 'jose'

import { updateDocusignCredentials, user } from "../model/User.svelte"

let key = `
-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCD0AKMW9z6Ic+q
Su78bLt0qSvkpxbKCrapWHfUAhq53dZ0NQnAdtOBD9GlcoQWnFYRwtFENEzMYox0
k/oB1Ut1E2VYqzdPFyHNx97kEcNV0vnIfP/+75cixa+P0BH0yp+SWzQ+Q5RWqdMv
OqotnuvpyrF3HMwK/9cvtV5C4gzYiC9ipAPZDtYEzpYs0Z9201US51V5yQG0qwyD
CTruotpQCWb7qB2IlEXWRk4SjOXHA80h7PNmCtIh0WTe0f5HOVP/CoQOO5a6fIZ/
5HlMwfbkDcG+OPKasmHnupBZPQ8EFNK24m97Z+LN8V1S+xVUKXMnjOCg9dc2WWvH
HEXr3qC9AgMBAAECggEAHQjgxtIlZuOzvqsq4WeCEzyAcqlrl62sdrkKDCU6hd6b
spVMRJzoEfHOGEeVWPWu79KeDgwHLq42iideVrEJIgzXsiRk1oMd6xovusU+5dTH
OKZwLVPRUtOAzIjkq6tGYxK7+0sfjcdywWCGw+3RwXnohXhOac3ZNKUa0ljAw6FK
+bRqYVbb0S9/fwcSm3rBuaJDCWrp/+R8FDw81mtFOo3mNWBuxHljFKAXiNnSpJMn
opIXJ0oop4LqxFrjskFNy85jYBD8pNZzkxXQdbdkBNnnUVmuKUJ9h6EqWBiTWg+p
mKta+oMrE/NtPbDj04RMhEwCuM0WROIUmN99W8mzgQKBgQC8xOZgzyuDvWZqW5nD
w9AvTIR9IeSxelwLF/4bqNBPsLzze3S1Jl0CMIjrTfOXuNiI9k7q7XMUavW4v1Z8
GVpxDJWXT4J/KwC+bZkrlg8sqz4Y7dNLXlCDxEIuH94Kau8pA3z2TJvKB4Rac/6N
fZXWXri6yhgl6vtgbMJOJ+dpOQKBgQCywhHVcQDzgrg+SUN2XE6ZiC1riV54wIrN
n6uye/FnaCCr5+4aVyXAYl4MSHDPibQqLZKnMkYrEIanPdAPh6ey+ebJuyt+4O55
YO9hp4Vutorr7j4UtJp+jZw9veUFi2dIX616NrQp9On5s2UztBm/Y70cmoE2HlF2
e0NfDtFHpQKBgHGZzUrVYkqV4NyA47h8Tv0n/1OO4iIskNfcSIA8x6AtrIia81FR
FQgMTVnOP5o/E5DZKgUXgPn4pIfaHiHw4AzIlf3JS69cIcZ4DoW8eMVZCLXX6iCh
UbL6mRlI9Ecws1zrTHitAdRDUdNdmwNrYJDx0BoZJQ8sqrsMuKJwQUOBAoGAaF8J
vJ7rWELVwoBSZHRG7DvnkSc2wrhhEugMfv0BGUhh8x1LF5QUlbyZfwB45aRYTlwn
iXnAIHrYtCNSLQ8eqlBhIR4oqj843iPsAQ+nx9nLSS/kjYBZyFR0ilQquU8Isegz
SO1RykGWr1XAXCzm76mTjHTlxqxzEgOsdX8YUIUCgYA4SwCcpyNvUWNKmFUI+SV0
CtHEt44OHBaQKrQOErIzw7g9vxzKPshYtT8wuYCqyZXdCl9sTZIqqx1FTltb/2w9
YSMemomUroDECxkZSrEtMc7thFz/UeX0AvuA5xa7R9bk4rIaeauQd5rcWh5OCB1U
QKqshmQwuCWxi4uR9WE97g==
-----END PRIVATE KEY-----
`
    .trim();

// export let consentURL = `https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature+impersonation&client_id=${integrationKey}&redirect_uri=mesut.me`

const baseUri = "https://account-d.docusign.com"
const authBaseUrl = `${baseUri}/oauth/auth`
const redirectUrl = "https://mesut.me/docusign-hackathon";
const userInfoUri = `${baseUri}/oauth/userinfo`

// if credential is expired show a button for expiration
// access token with Implicit Grant
export let accessTokenUri = `${authBaseUrl}?response_type=token&scope=signature%20cors&client_id=${integrationKey}&redirect_uri=${redirectUrl}`

export const getLatestDocusignCredentials = async () => {
    console.log("getLatestDocusignCredentials", Date.now(), user)
    // Credential didn't expired.
    if (Date.now() < user.docusign_credentials.accessTokenExpirationDate) {
        console.log("Credential didn't expired.")
        console.log("checking user related info")
        // user account data and base uri exists
        if (user.docusign_credentials.usersAccountId && user.docusign_credentials.usersBaseUri && user.docusign_credentials.usersAccountId !== "" && user.docusign_credentials.usersBaseUri !== "") {
            console.log("found user credentials", user.docusign_credentials.usersAccountId, user.docusign_credentials.usersBaseUri)
            return user.docusign_credentials
        } else {
            // docusign user related info is missing.
            await getDocusignUserCredentials();
            return user.docusign_credentials
        }
    } else {
        // Should redirect user to refresh token with redirection. -> EsignatureAuthView.svelte
    }
}

const getDocusignUserCredentials = async () => {
    console.log("getDocusignUserCredentials")
    // there is a rate limit, so we just want to run per 8h with the request above, and keep the record of tokens.
    let response = await fetch(userInfoUri, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${user.docusign_credentials.accessToken}`,
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        return
    }
    let data = await response.json()

    // modifying the first level of key of the object to have the mutation effective.
    user.docusign_credentials = {
        accessToken: user.docusign_credentials.accessToken,
        accessTokenExpirationDate: user.docusign_credentials.accessTokenExpirationDate,
        usersAccountId: data["accounts"][0]["account_id"],
        usersBaseUri: data["accounts"][0]["base_uri"]
    }

    await updateDocusignCredentials()

}

export const createEnvelope = async (recipientEmail: string, recipientFullName: string, documentTitle: string, htmlContent: string) : Promise<object|undefined> => {
    console.log("creating envelope with user credentials")
    const base64Document = btoa(htmlContent);

    const envelope = {
        emailSubject: documentTitle,
        documents: [{
            documentBase64: base64Document,
            name: documentTitle,
            fileExtension: 'html',
            documentId: '1'
        }],
        recipients: {
            signers: [{
                email: recipientEmail,
                name: recipientFullName,
                recipientId: '1',
                routingOrder: '1',
                tabs: {
                    signHereTabs: [{
                        anchorString: '/signature/',
                        anchorUnits: 'pixels',
                        anchorXOffset: '20',
                        anchorYOffset: '10'
                    }]
                }
            }]
        },
        status: 'sent'
    };

    let url = `${user.docusign_credentials.usersBaseUri}/restapi/v2.1/accounts/${user.docusign_credentials.usersAccountId}/envelopes`

    const response = await fetch("https://iskmjdptvowmwziqiiqg.supabase.co/functions/v1/finalize-agreement", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userUrl : url,
            envelopeObject : envelope,
            token : user.docusign_credentials.accessToken
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Envelope creation failed:', errorText);
        return undefined;
    }

    const result = await response.json();
    return result;
}