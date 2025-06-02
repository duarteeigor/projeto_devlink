import { useEffect, useState, type ReactNode } from "react"
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "../services/firebaseConnection" 
import { Navigate} from "react-router-dom"

interface PrivateProps{
    children: ReactNode
}

export function Private({children}:PrivateProps): any{
    const [signed, setSigned] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            //esse user retorna os dados do usuario se ele estiver logado, userdata armazena essas informaçoes no localstorage caso queira utilizar para alguma coisa
            if(user){
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }
    
                localStorage.setItem("@reactlinks", JSON.stringify(userData))
                setSigned(true)
            } else {
                setSigned(false)
            }
            setLoading(false)
        })

        //Encerrando o listener do authstatechanged, ao sair da pagina
        return ()=>{
            unsub();
        }
        
    }, [])

    if (loading) {
        return <div>Carregando...</div>; // ou um spinner bonito aqui
    }    

    if(!signed){
        return <Navigate to="/login" />
    }

    return children;
}