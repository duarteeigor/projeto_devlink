import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { Social } from "../../components/social/index"
import {
    getDocs,
    query,
    orderBy,
    collection,
    getDoc,
    doc
} from "firebase/firestore"
import { db } from "../../services/firebaseConnection";
import { useState, useEffect } from "react";

export interface LinksProps {
    id: string,
    url: string,
    texto: string,
    cor: string,
    background: string
}

interface SocialLinksProps {
    facebook: string,
    instagram: string,
    youtube: string
}

export function Home() {

    const [links, setLinks] = useState<LinksProps[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()


    //FAZENDO A BUSCA NO BANCO DE DADOS AO ENTRAR NO SITE, E ARMAZENANDO DENTRO DO USESTATE SEM USAR UM LISTENER (onSnapshot)
    useEffect(() => {
        const dados = collection(db, "links")
        const queryRef = query(dados, orderBy("created", "asc"))

        getDocs(queryRef).then((snapshot) => {
            let lista = [] as LinksProps[]

            snapshot.forEach((doc) => {

                lista.push({
                    id: doc.id,
                    url: doc.data().url,
                    texto: doc.data().texto,
                    cor: doc.data().cor,
                    background: doc.data().background
                })
            })
            setLinks(lista)
        }).catch((error) => (
            console.log(error)
        ))

    }, [])

    useEffect(() => {
        const docRef = doc(db, "social", "urls")

        getDoc(docRef).then((snapshot) => {
            if (snapshot.data() !== undefined) {
                setSocialLinks({
                    facebook: snapshot.data()?.urlFacebook,
                    instagram: snapshot.data()?.urlInstagram,
                    youtube: snapshot.data()?.urlYoutube
                })
            }
        }).catch((error) => (
            console.log(error)
        ))
    }, [])

    return (
        <div className="flex flex-col w-full max-w-md px-4 py-4 items-center justify-center gap-4 mx-auto pt-30">
            <h1 className="md:text-4xl text-3xl text-white font-bold text-center">Igor Duarte</h1>
            <span className="text-white my-3">Veja meus links 👇</span>

            {links.map((data) => (
                <button
                    key={data.id}
                    className="p-2 w-full rounded-sm font-semibold cursor-pointer hover:opacity-70"
                    style={{ backgroundColor: data.background, color: data.cor }}>
                    {data.texto}
                </button>
            ))}



            {/* <div className="flex flex-row gap-5 mt-4">
                <FaFacebook color="white" size={30} className="hover:opacity-70 cursor-pointer" />
                <FaYoutube color="white" size={30} className="hover:opacity-70 cursor-pointer" />
                <FaInstagram color="white" size={30} className="hover:opacity-70 cursor-pointer" />
            </div> */}


            {socialLinks && Object.keys(socialLinks).length > 0 && (
                <footer className="flex flex-row gap-5 mt-4">
                    <Social url={socialLinks?.facebook}>
                        <FaFacebook color="white" size={30} className="hover:opacity-70 cursor-pointer" />
                    </Social>

                    <Social url={socialLinks?.youtube}>
                        <FaYoutube color="white" size={30} className="hover:opacity-70 cursor-pointer" />
                    </Social>

                    <Social url={socialLinks?.instagram}>
                        <FaInstagram color="white" size={30} className="hover:opacity-70 cursor-pointer" />
                    </Social>
                </footer>
            )}

        </div>
    );
}