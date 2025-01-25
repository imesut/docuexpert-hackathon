import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://iskmjdptvowmwziqiiqg.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const client = createClient(supabaseUrl, supabaseKey)

export let supabase = () => client