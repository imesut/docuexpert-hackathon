import { supabase } from "./BaseModel"
import type { DocusingCredentials, OnboardingPhase, User } from "./Types"

export let user = $state<User>({
    id: 0,
    // Let's initialize with out sample developer email address, during the app lifecycle, actual user will be fetched.
    email: "wehackt@gmail.com",
    onboarding_phase: "",
    custom_agents: [],
    occupation: "",
    perspective: "",
    docusign_credentials: {
        accessToken: "",
        accessTokenExpirationDate: 0,
        usersAccountId: "",
        usersBaseUri: "",
    }
})



export const fetchUser = async () => {
    console.log("called, fetchUser")
    let { data: users, error } = await supabase()
        .from('users')
        .select('*')
        .eq('email', user.email)

    console.log("fetchUser", "service called", users, error)

    let result = users[0] as User
    Object.keys(user).forEach(key => {
        user[key] = result[key]
    });

    console.log("fetched user and updated user object", user)
}

export const updateUserObject = async (new_phase: OnboardingPhase) => {
    const { data, error } = await supabase()
        .from('users')
        .update({
            onboarding_phase: new_phase,
            occupation: user.occupation,
            perspective: user.perspective,
            custom_agents: user.custom_agents
        })
        .eq('email', user.email)
        .select()

    return data[0] as User
}

export const updateDocusignCredentials = async () => {
    const { data, error } = await supabase()
        .from('users')
        .update({
            docusign_credentials: user.docusign_credentials
        })
        .eq('email', user.email)
        .select()

    return data[0] as User
}