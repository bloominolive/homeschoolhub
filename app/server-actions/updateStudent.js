'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function updateStudent(formData){
    const id = formData.get('id');
    const name = formData.get('name');

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user

    if (!user){
        console.error('User is not authenticated within updateStudent server action')
        return;
    }

    const {data, error} = await supabase
        .from('students')
        .update(
            {
                name: name,
            }
        ).match({id, parent_id: user.id})

    if (error){
        console.error('Error updating data', error)
        return;
    }

    revalidatePath('/students')

    return {message: 'Success'}
}