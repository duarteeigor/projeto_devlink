import { useState, type FormEvent } from "react"
import logo from "../../assets/Logo.png"
import { Input } from "../../components/input/index"
import { Link } from "react-router-dom"
import { auth } from "../../services/firebaseConnection"
import {signInWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from "react-router-dom"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if(email === "" || password === ""){
            alert("Preencha todos os campos!")
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(()=> {
            navigate("/admin", {replace: true})
            console.log("Logado com sucesso")
        })
        .catch((error)=>{
            console.log(error)
            setEmail("")
            setPassword("")
        })


    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <Link to="/">
                <img className="h-[107px] w-[276px]" src={logo} alt="logo-img" />
            </Link>
            <form className="flex flex-col items-center justify-center gap-3" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                 <Input
                    type="password"
                    placeholder="*********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-[600px] h-[36px] bg-[#3366FF] text-center text-white" type="submit">Acessar</button>
            </form>
        </div>
    )
}