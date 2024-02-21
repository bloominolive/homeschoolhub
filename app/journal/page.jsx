import { cookies } from "next/headers";
import EditJournal from "../components/EditJournal";
import JournalForm from "../components/JournalForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { deleteJournal } from "../server-actions/deleteJournal";
import Navbar from "../components/Navbar";

export default async function StudentList(){
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;

    const {data: entries, error} = await supabase
        .from('journal')
        .select('*')
        .eq('user_id', user.id)
    if (error){
        console.error('Error fetching journal entries')
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <div className="container mx-auto p-6 sm:p-12">
                <Navbar />
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">My Journal</h1>
                <JournalForm />
                <div className="mt-6"> 
                {entries && entries.length > 0 ?(
                    entries.map((entry) => (
                        <div key={entry.id} className="mb-4 mt-8 p-4 bg-gray-800 rounded-lg shadow">
                        <h2 className="text-xl text-white mb-2">{entry.date}</h2>
                        <h2 className="text-xl text-white mb-2">{entry.title}</h2>
                        <p className="text-xl text-white mb-2">{entry.entry}</p>
                        <div className="flex space-x-2">
                            <form action={deleteJournal}>
                            <input type="hidden" name="id" value={entry.id} />
                            <button 
                                type="submit"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Delete
                            </button>
                            </form>
                            <EditJournal entry={entry} /> 
                        </div>
                        </div>
                    )) 
) : (<p>No todos due today!</p>) }
                </div>
            </div>
        </div>
    )
}