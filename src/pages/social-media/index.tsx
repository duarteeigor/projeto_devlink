import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { db } from "../../services/firebaseConnection";
import {
    doc,
    setDoc,
    getDoc
} from "firebase/firestore"
export function SocialMedia() {
    const [linkFacebook, setLinkFacebook] = useState("")
    const [linkInstagram, setLinkInstagram] = useState("")
    const [linkYoutube, setLinkYoutube] = useState("")

    useEffect(()=>{
        function loadLinks(){
            const docRef = doc(db, "social", "urls")

            getDoc(docRef).then((snapshot)=>{
                if(snapshot.data() !== undefined){
                    setLinkFacebook(snapshot.data()?.urlFacebook)
                    setLinkInstagram(snapshot.data()?.urlInstagram)
                    setLinkYoutube(snapshot.data()?.urlYoutube)
                }
            }).catch((error)=>(
                console.log(error)
            ))
        }

        loadLinks()
    },[])

    function handleRegister(e: FormEvent) {
        e.preventDefault()

        if (linkFacebook === "" || linkYoutube === "" || linkInstagram === "") {
            return alert("Preencha todos os campos!")
        }

        //USANDO SETDOC AO INVES DO addDoc para ATUALIZAR O VALOR DO CAMPO NO BANCO DE DADDOS, AO INVES DE CRIAR UM NOVO
        setDoc(doc(db, "social", "urls"), {
            urlFacebook: linkFacebook,
            urlInstagram: linkInstagram,
            urlYoutube: linkYoutube
        }).then(() => {
            alert("Links atualizados com sucesso!")
        }).catch((error) => (
            console.log(error)
        ))



    }
    return (
        <div className="flex flex-col w-full max-w-md px-4 py-4 items-center justify-center gap-4 mx-auto pt-10">
            <Header />

            <h2 className="text-white text-3xl font-semibold pt-8">Suas redes sociais</h2>

            <form>
                <div className="flex flex-col gap-3">
                    <span className="text-white">Link Facebook</span>
                    <Input
                        placeholder="Digite a url..."
                        value={linkFacebook}
                        onChange={(e) => setLinkFacebook(e.target.value)}
                    />

                    <span className="text-white">Link Instagram</span>
                    <Input 
                        placeholder="Digite a url..." 
                        value={linkInstagram}
                        onChange={(e)=> setLinkInstagram(e.target.value)}
                    />

                    <span className="text-white">Link Youtube</span>
                    <Input 
                        placeholder="Digite a url..." 
                        value={linkYoutube}
                        onChange={(e)=> setLinkYoutube(e.target.value)}
                    />

                    <button
                        className="bg-sky-700 w-full py-3 text-white cursor-pointer"
                        onClick={handleRegister}>Salvar links</button>
                </div>

            </form>
        </div>
    )
}