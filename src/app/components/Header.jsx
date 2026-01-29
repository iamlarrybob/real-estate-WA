import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
function Header () {
    return(
        <header className="bg-slate-200 shadow-md">
           <div className="flex items-center justify-between mx-auto max-w-6xl p-3">
           
                <Link href="/">
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-slate-500">Real</span>
                    <span className="text-slate-700">Estate</span>
                </h1>
                </Link>

                <form className="bg-slate-100 p-3 rounded-lg flex items-center">
                    <input type="text"
                    placeholder="search..."
                    className="bg-transparent focus:outline-none w-24 sm:w-64" 
                    />
                    <button>
                        <FaSearch className="text-slate-600" />
                    </button>
                </form>
                <ul className="flex gap-4">
                    <Link href="/">
                        <li className="hidden md:inline text-slate-700 hover:underline">
                            Home
                        </li>
                    </Link>
                    <Link href="/about">
                        <li className="hidden md:inline text-slate-700 hover:underline">
                            About
                        </li>
                    </Link>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>

                    <SignedOut>

                    <Link href="/sign-in">
                        <li className="hidden md:inline text-slate-700 hover:underline">
                            Sign in 
                        </li>
                    </Link>
                    </SignedOut>

                </ul>

           </div>
        </header>
    )
}

export default Header;