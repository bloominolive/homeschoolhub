import { cookies } from "next/headers";
import Link from "next/link";
import EditTodo from "../components/EditTodo";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { completeTodo } from "../server-actions/completeTodo";
import { deleteTodo } from "../server-actions/deleteTodo";
import Navbar from "../components/Navbar";
import FactsCard from "../components/FactsCard";


export default async function Home(){
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;

    const {data: todo, error} = await supabase
    .from('todo')
    .select('*')
    .eq('user_id', user.id)

    if (error){
        console.error('Error fetching todos')
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <div className="container mx-auto p-6 sm:p-12">
                <Navbar />                
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">My Hub</h1>
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full lg:w-2/3 px-3 mb-6">
                        <h1 className="text-3xl mt-6">Upcoming Todos</h1>
                        <div className="mt-6"> 
                            {todo && todo.length > 0 ? (
                                todo.map((todo) => (
                                    <div key={todo.id} className="mb-4 mt-8 p-4 bg-gray-800 rounded-lg shadow w-96">
                                        <h2 className="text-xl text-white mb-2">{todo.description}</h2>
                                        <div className="flex space-x-2">
                                            <form action={completeTodo}>
                                                <input type="hidden" name="id" value={todo.id} />
                                                <button 
                                                    type="submit"
                                                    className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Complete
                                                </button>
                                            </form>
                                            <EditTodo todo={todo} />
                                            <form action={deleteTodo}>
                                                <input type="hidden" name="id" value={todo.id} />
                                                <button 
                                                    type="submit"
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No todos!</p>
                            )}
                        <Link href='/todos'><button type='submit' className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded my-5">Add a todo</button></Link>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3 px-3 mt-16 ">
                        <FactsCard />
                    </div>
                </div>
            </div>
            
        </div>
    )
}