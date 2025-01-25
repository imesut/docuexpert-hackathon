import { supabase } from "./BaseModel"
import type { OnboardingPhase, User } from "./Types"

export let user = $state<User>({
    id: 0,
    email: "",
    onboarding_phase: "",
    custom_agents: [],
    occupation: "",
    perspective: ""
})



export const fetchUser = async () => {
    let { data: users, error } = await supabase()
        .from('users')
        .select('*')
        .eq('email', user.email)

    let result = users[0] as User
    Object.keys(user).forEach(key => {
        user[key] = result[key]
    });
}

export const updateUserObject = async (new_phase : OnboardingPhase) => {
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