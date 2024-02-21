import { addStudent } from "../server-actions/addStudent";

export default function StudentForm(){
    return (
        <form action={addStudent} className="mb-8 w-96">
            <div className="mb-4">
                <label htmlFor="name" className="block text-white mb-2">Name</label>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            
            <button type="submit" className="bg-gray-600 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded">
                Add Student
            </button>
        </form>     
    )
}