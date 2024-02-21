import { cookies } from "next/headers";
import EditTodo from "../components/EditTodo";
import TodoForm from "../components/TodoForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { deleteTodo } from "../server-actions/deleteTodo";
import { completeTodo} from "../server-actions/completeTodo";
import Navbar from "../components/Navbar";

export default async function TodoList(){
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;

    const {data: todos, error} = await supabase
        .from('todo')
        .select('*')
        .eq('user_id', user.id)
        .order('date', {ascending: true})
    if (error){
        console.error('Error fetching todos')
    }
    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <div className="container mx-auto p-6 sm:p-12">
                <Navbar />
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">My Todos</h1>
                <TodoForm />
                <div className="mt-6"> 
                    {todos && todos.length > 0 ? todos.map((todo) => (
                        <div key={todo.id} className="mb-4 mt-8 p-4 bg-gray-800 rounded-lg shadow w-96">
                            <h2 className="text-xl text-white mb-2">{todo.description}</h2>
                            <h2 className="text-xl text-white mb-2">{todo.is_complete ? "Complete" : "Incomplete"}</h2>
                            <div className="flex space-x-2">
                            <form action={completeTodo}>
                                <input type="hidden" name="id" value={todo.id} />
                                <button
                                    disabled={todo.is_complete}
                                    className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-700"
                                >
                                    Complete
                                </button>
                            </form>
                            <form action={deleteTodo}>
                                <input type="hidden" name="id" value={todo.id} />
                                <button 
                                    type="submit"
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </form>
                                <EditTodo todo={todo} />
                            </div>
                        </div>
                    )) : (
                        <p>No todos!</p>
                    )}
                </div>
            </div>
        </div>
    )
}