import { cookies } from "next/headers";
import EditStudent from "../components/EditStudent";
import StudentForm from "../components/StudentForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { deleteStudent } from "../server-actions/deleteStudent";
import Navbar from "../components/Navbar";

export default async function StudentList(){
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;

    const {data: students, error} = await supabase
        .from('students')
        .select('*')
        .eq('parent_id', user.id)
    if (error){
        console.error('Error fetching students')
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <div className="container mx-auto p-6 sm:p-12">
                <Navbar />
                <img src="/kids-waving.jpg" alt="kids-waving" className="h-48 ms-auto me-auto rounded-lg mb-5" />
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">My Students</h1>
                <StudentForm />
                <div className="mt-6"> 
                    {students.map((student) => (
                        <div key={student.id} className="mb-4 mt-8 p-4 bg-gray-800 rounded-lg shadow w-96">
                        <h2 className="text-xl text-white mb-2">{student.name}</h2>
                        <div className="flex space-x-2">
                            <form action={deleteStudent}>
                            <input type="hidden" name="id" value={student.id} />
                            <button 
                                type="submit"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Delete
                            </button>
                            </form>
                            <EditStudent student={student} />
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}