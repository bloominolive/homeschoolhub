'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function updateJournal(formData){
    const id = formData.get('id');
    const title = formData.get('title');
    const entry = formData.get('entry');
    const date = formData.get('date');

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user

    if (!user){
        console.error('User is not authenticated within updateTodo server action')
        return;
    }

    const {data, error} = await supabase
        .from('journal')
        .update(
            {
                title: title,
                entry: entry,
                date : date
            }
        ).match({id})

    if (error){
        console.error('Error updating data', error)
        return;
    }

    revalidatePath('/journal')

    return {message: 'Success'}
}