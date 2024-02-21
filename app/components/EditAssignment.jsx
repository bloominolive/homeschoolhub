'use client'

import { useState } from "react"
import { updateAssignment } from "../server-actions/updateAssignment"

export default function EditAssignment({ assignment, students }){
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        title: assignment.title,
        description: assignment.description,
        student_id: assignment.student_id,
        id: assignment.id
    })
    
    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})


    return (
        <div>
            <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center px-4">
                    <div className="modal-content bg-gray-900 p-6 rounded-lg w-full max-w-md">
                    <span className="close text-white text-xl leading-none hover:text-gray-300 cursor-pointer float-right" onClick={() => setShowModal(false)}>&times;</span>
                    <form action={updateAssignment} onSubmit={() => setShowModal(false)} className="mt-4">
                        <input 
                            type="hidden" 
                            name="id" 
                            value={formData.id} 
                        />
                        
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-300 mb-2">Title</label>
                            <input 
                                type="text" 
                                id="title"
                                name="title" 
                                value={formData.title} 
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500" 
                            />
                            <label htmlFor="description" className="block text-gray-300 mb-2">Description</label>
                            <input 
                                type="text" 
                                id="description"
                                name="description" 
                                value={formData.description} 
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500" 
                            />
                            <label htmlfor="student" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Student</label>
                            <select value={formData.student_id}  id="student" name="student" required onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option disabled selected>Choose a Student</option>
                                {students && students.length > 0 ?(
                                    students.map((student) => (
                                <option value={student.id}>{student.name}</option>
                                    ))): (<option disabled value=''>No Students Found</option>)
                                }
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Update Assignment
                        </button>
                    </form>
                    </div>
                </div>
            )}
        </div>
    )
}