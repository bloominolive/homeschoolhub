'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function addStudent(formData){
    const name = formData.get('name')

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user

    if (!user){
        console.error('User is not authenticated within addStudent server action')
        return;
    }

    const {data, error} = await supabase
        .from('students')
        .insert([
            {
                name: name,                
                parent_id: user.id
            }
        ])

    if (error){
        console.error('Error inserting data', error)
        return;
    }

    revalidatePath('/students')

    return {message: 'Success'}
}