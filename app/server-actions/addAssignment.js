'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function addAssignment(formData){
    const title = formData.get('title');
    const description = formData.get('description');
    const student_id = formData.get('student');
    

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user

    if (!user){
        console.error('User is not authenticated within addAssignment server action')
        return;
    }

    const {data, error} = await supabase
        .from('assignments')
        .insert([
            {   
                user_id: user.id,
                student_id: student_id,            
                title: title,
                description : description
            }
        ])

    if (error){
        console.error('Error inserting data', error)
        return;
    }

    revalidatePath('/assignments')

    return {message: 'Success'}
}