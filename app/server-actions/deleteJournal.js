'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function deleteJournal(formData){
    const id = formData.get('id')

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user

    if (!user){
        console.error('User is not authenticated within deleteTodo server action')
        return;
    }

    const {error} = await supabase
        .from('journal')
        .delete()
        .match({id: id})

    if (error){
        console.error('Error deleting data', error)
        return;
    }

    revalidatePath('/journal')

    return {message: 'Success'}
}