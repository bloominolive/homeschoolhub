import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <Link href='/home'><img src="/hhLogo.png" alt="logo" className="h-28 mb-4 md:mb-0 rounded-lg" /></Link>
            <div className="flex flex-col md:flex-row items-center gap-4">
                <Link href='/home' className="hover:italic">Home</Link>
                <Link href='/journal' className="hover:italic">Journal</Link>
                <Link href='/assignments' className="hover:italic">Assignments</Link>
                <Link href='/students' className="hover:italic">Students</Link>
                <Link href='/todos' className="hover:italic">Todo's</Link>
                <form action="/auth/signout" method="post">
                    <button 
                        type="submit" 
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                    >
                        Sign out
                    </button>
                </form>
            </div>
        </div>
    );
}
