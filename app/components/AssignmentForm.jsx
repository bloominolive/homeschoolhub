import { addAssignment} from "../server-actions/addAssignment";

export default function AssignmentForm({students}){

    return (
        <form action={addAssignment} className="mb-8 w-96">
            <div className="mb-4">
            <label htmlfor="student" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Student</label>
            <select id="student" name="student" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected>Choose a Student</option>
                {students && students.length > 0 ?(
                    students.map((student) => (
                <option value={student.id}>{student.name}</option>
                    ))): (<option disabled value=''>No Students Found</option>)
                }
            </select>
                <label htmlFor="title" className="block text-white mb-2">Title</label>
                <input 
                    type="text"
                    id="title"
                    name="title"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
                
                <label htmlFor="description" className="block text-white mb-2">Assignment Description, Links, and Notes:</label>
                <input 
                    type="textarea"
                    id="description"
                    name="description"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            
            <button type="submit" className="bg-gray-600 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded">
                Add Assignment
            </button>
        </form>     
    )
}