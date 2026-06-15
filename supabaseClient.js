import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://fixlicaqgkxjmwvijmro.supabase.co'
const supabaseAnonKey = 'sb_publishable__eb_jqbTh2A5O7eLH0YUig_kcrnsKPu'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)