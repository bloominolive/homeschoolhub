import { cookies } from "next/headers";
import EditAssignment from "../components/EditAssignment";
import AssignmentForm from "../components/AssignmentForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { deleteAssignment } from "../server-actions/deleteAssignment";
import Navbar from "../components/Navbar";

export default async function AssignmentList(){
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;
    const {data: assignments, errorAssignments} = await supabase
        .from('assignments')
        .select('*, students(name)')
        .eq('user_id', user.id)
    if (errorAssignments){
        console.error('Error fetching assignments')
    }
    const {data: students, errorStudents} = await supabase
        .from('students')
        .select('*')
        .eq('parent_id', user.id)
    if (errorStudents){
        console.error('Error fetching students')
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <div className="container mx-auto p-6 sm:p-12">
                <Navbar />
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">Assignments</h1>
                <AssignmentForm students={students} />
                <div className="mt-6"> 
                {assignments && assignments.length > 0 ?(
                    assignments.map((assignment) => (
                        <div key={assignment.id} className="mb-4 mt-8 p-4 bg-gray-800 rounded-lg shadow">
                        <h2 className="text-xl text-white mb-2">{assignment.title}</h2>
                        <h3 className="text-lg text-white mb-2">Student: {assignment.students.name}</h3>
                        <p className="text-xl text-white mb-2">{assignment.description}</p>
                        <div className="flex space-x-2">
                            <form action={deleteAssignment}>
                            <input type="hidden" name="id" value={assignment.id} />
                            <button 
                                type="submit"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Delete
                            </button>
                            </form>
                            <EditAssignment assignment={assignment} students={students} /> 
                        </div>
                        </div>
                    )) 
) : (<p>No assignments!</p>) }
                </div>
            </div>
        </div>
    )
}