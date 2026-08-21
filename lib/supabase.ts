import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.https:tpmcwjpkevihoofsqaux.supabase.co/rest/v1;
const serviceRoleKey = process.env.sb_secret_0f0UW_MxhZVMvfSpGVrmqQ_Rqd3C-87;
export const supabase = supabaseUrl && serviceRoleKey ? createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } }) : null;
