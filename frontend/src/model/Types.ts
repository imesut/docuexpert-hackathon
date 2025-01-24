
export type User = {
    id: number;
    email: string;
    onboarding_phase: string;
    custom_agents: Agent[];
    occupation : string;
    perspective : string;
};

export enum OnboardingPhase {
    not_onboarded = "not_onboarded",
    role_selected = "role_selected",
    onboarding_completed = "onboarding_completed",
}

export type Agent = {
    abbvr: string;
    name: string;
    description: string;
    isDefaultExpert: boolean;
    prompt: string;
}