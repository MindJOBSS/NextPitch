import Link from "next/link";
import { auth, signOut, signIn } from "../../auth";

export default async function Navbar() {

    const session = await auth();

    return (
        <nav>
            <div className="navbar bg-base-100 shadow-sm px-4 text-2xl" >
                <div className="navbar-start font-semibold">
                    <Link href="/">
                        <span className="text-secondary" >Next</span><span className="text-neutral" >Pitch</span>
                    </Link>
                </div>
                <div className="navbar-end text-xl ">
                    {session && session?.user ? (
                        <>
                            <details className="dropdown dropdown-center">
                                <summary className="btn btn-ghost m-1 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                                </summary>
                                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-auto p-2 shadow-sm">
                                    <li><Link href="/startup/create" >Create</Link></li>
                                    <form action={async () => {
                                        "use server";
                                        await signOut({ redirectTo: "/" });
                                    }}>
                                        <button className="btn btn-error text-error-content btn-active" type="submit" >
                                            Logout
                                        </button>
                                    </form>
                                </ul>
                            </details>
                            <p className="text-sm text-neutral-600 font-semibold" >{session?.user?.name || ""}</p>
                            <Link href={`/user/${session?.id}`}>
                                <div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img
                                            src={session?.user?.image || ""}
                                            alt={session?.user?.name || ""}
                                        />
                                    </div>
                                </div>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            "use server";
                            await signIn("github");
                        }}>
                            <button className="btn btn-secondary text-neutral btn-outline" type="submit" >
                                Login
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
}