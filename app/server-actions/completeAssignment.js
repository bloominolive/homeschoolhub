'use server';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function completeAssignment(formData) {
    const id = formData.get('id')
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
        console.error('User is not authenticated within completeAssignment server action');
        return;
    }

    // Perform the update operation
    const { data: updateData, error: updateError } = await supabase
        .from('assignments')
        .update({ is_complete: true })
        .match({ id: id });

    if (updateError) {
        console.error('Error updating data', updateError);
        return;
    }

    revalidatePath('/assignments');
    return { message: 'Success' };
}
