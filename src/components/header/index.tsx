import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth"

export function Header() {

    async function handleLogout() {
        try {
            await signOut(auth)
        } catch (error: any) {
            return console.log(error.message)
        }
    }

    return (
        <header className="bg-white h-12 max-w-2xl w-2xl rounded-md">
            <nav className="h-13 flex px-6 items-center">
                <div className="flex gap-8 w-full font-medium">
                    <button onClick={handleLogout}>
                        <Link to="/login">
                            <BiLogOut size={28} color="#db2629" />
                        </Link>
                    </button>
                    <Link to="/">
                        Links
                    </Link>
                    <Link to="/admin/social">
                        Redes Sociais
                    </Link>
                </div>
            </nav>
        </header>
    )
}