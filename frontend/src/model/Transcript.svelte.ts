import { supabase } from "./BaseModel"
import type { Transcript, User } from "./Types"
import { user } from "./User.svelte";

export let transcripts = $state<Transcript[]>([
    {
        id: 0,
        transcript_title: "Fetching Transcripts",
        body: "Empty Transcript",
        agreement_id: 0,
        created_at: 1710000000000
    }
])


export let selectedTranscript = $state({index : 0})


export const fetchTranscripts = async () => {
    return new Promise(async (resolve, reject) => {
        let { data: transcriptsData, error } = await supabase()
            .from('transcripts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10)

        if (error) {
            reject()
        }

        let result = transcriptsData as Transcript[]
        if (result.length > 0) {
            Object.keys(transcripts[0]).forEach(key => {
                transcripts[0][key] = result[0][key]
            });
        }

        // Drop first result, because it's written.
        result.shift()

        result.forEach(transcript => {
            transcripts.push(transcript as Transcript)
        });

        resolve("")
    })

}
