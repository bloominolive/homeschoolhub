'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function addTodo(formData){
    const description = formData.get('description');

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user

    if (!user){
        console.error('User is not authenticated within addTodo server action')
        return;
    }

    const {data, error} = await supabase
        .from('todo')
        .insert([
            {   
                user_id: user.id,            
                description: description,
                is_complete: false
            }
        ])

    if (error){
        console.error('Error inserting data', error)
        return;
    }

    revalidatePath('/todo')

    return {message: 'Success'}
}