import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://qihjupqhnbyqxeufexud.supabase.co'
const supabaseKey = 'sb_publishable_8hng6Oa-kwm8CgpFsf6e8A_95FOoSRl'
export const supabase = createClient(supabaseUrl, supabaseKey)