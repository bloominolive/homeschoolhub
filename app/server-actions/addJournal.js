'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function addJournal(formData){
    const title = formData.get('title');
    const entry = formData.get('entry');
    const date = formData.get('date');

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user

    if (!user){
        console.error('User is not authenticated within addJournal server action')
        return;
    }

    const {data, error} = await supabase
        .from('journal')
        .insert([
            {   
                user_id: user.id,            
                title: title,
                entry: entry,
                date : date
            }
        ])

    if (error){
        console.error('Error inserting data', error)
        return;
    }

    revalidatePath('/journal')

    return {message: 'Success'}
}