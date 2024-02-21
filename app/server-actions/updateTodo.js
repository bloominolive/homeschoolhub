'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function updateTodo(formData){
    const id = formData.get('id');
    const description = formData.get('description');

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user

    if (!user){
        console.error('User is not authenticated within updateTodo server action')
        return;
    }

    const {data, error} = await supabase
        .from('todo')
        .update(
            {
                description: description,
            }
        ).match({id})

    if (error){
        console.error('Error updating data', error)
        return;
    }

    revalidatePath('/todos')

    return {message: 'Success'}
}