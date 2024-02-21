import { addJournal} from "../server-actions/addJournal";

export default function JournalForm(){
    return (
        <form action={addJournal} className="mb-8 w-96">
            <div className="mb-4">
                <label htmlFor="title" className="block text-white mb-2">Title</label>
                <input 
                    type="text"
                    id="title"
                    name="title"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
                <label htmlFor="date" className="block text-white mb-2">Date</label>
                <input 
                    type="date"
                    id="date"
                    name="date"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
                <label htmlFor="entry" className="block text-white mb-2">Entry</label>
                <input 
                    type="textarea"
                    id="entry"
                    name="entry"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            
            <button type="submit" className="bg-gray-600 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded">
                Add Entry
            </button>
        </form>     
    )
}