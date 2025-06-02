import { useState, useEffect, type FormEvent } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FiTrash2 } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    deleteDoc,
    doc
} from "firebase/firestore"

//INTERAFACE
export interface LinksProps{
    id: string,
    url: string,
    texto: string,
    cor: string,
    background: string
}

export function Admin() {
    const [url, setUrl] = useState("");
    const [nome, setNome] = useState("");
    const [textColor, setTextColor] = useState("#121212")
    const [bgColor, setBgColor] = useState("#f1f1f1")
    const [links, setLinks] = useState<LinksProps[]>([])

    useEffect(()=> {
        const dados = collection(db, "links")
        const queryRef = query(dados, orderBy("created", "asc"))

        const unsub = onSnapshot(queryRef, (snapshot)=>{
            let lista = [] as LinksProps[]

            snapshot.forEach((dados)=>{
                lista.push({
                    id: dados.id,
                    url: dados.data().url,
                    texto: dados.data().texto,
                    cor: dados.data().cor,
                    background: dados.data().background
                })
            })

            setLinks(lista)
        });

        //Removendo o snapshot(listener) para economizar recurso
        return () => {
            unsub();
        }
    },[])

    //FUNCAO QUE REMOVE DO BANCO DE DADOS OS VALORES SALVOS, atraves do id recebido dos dados no map

    function handleDelete(id: string){
        const docRef = doc(db, "links", id)

        deleteDoc(docRef).then(()=>{
            alert("Link Excluido com sucesso!")
        }).catch((error)=>(
            console.log(error)
        ))
    }


    //FUNCAO QUE CADASTRA NO BANCO DE DADOS OS VALORES DIGITADOS
    function handleRegister(e: FormEvent) {
        e.preventDefault()

        if (nome === "" || url === "") {
            return alert("Preencha todos os campos!")
        }

        addDoc(collection(db, "links"), {
            url: url,
            texto: nome,
            cor: textColor,
            background: bgColor,
            created: new Date()

        }).then(() => {
                alert("CADASTRADO COM SUCESSO!")
                setUrl("")
                setNome("")
                setTextColor("#121212")
                setBgColor("#f1f1f1")

            }).catch((error) => (
                console.log(error)
            ))
    }

    return (

        <div className="flex flex-col items-center pt-12 min-h-screen">
            <Header />

            <div className="mt-10">
                <form className="flex flex-col gap-3">
                    <label className="text-white font-medium">Nome do link</label>
                    <Input
                        placeholder="Nome do seu link"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <label className="text-white font-medium">URL do link</label>
                    <Input
                        placeholder="Digite a url..."
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />

                    <section className="flex gap-8 mt-4">
                        <div>
                            <label className="text-white font-medium mr-4">Fundo do link</label>
                            <input
                                className="h-12 p-1 bg-white rounded-sm cursor-pointer"
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-white font-medium mr-4">Cor do link</label>
                            <input
                                className="h-12 p-1 bg-white rounded-sm cursor-pointer"
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                            />
                        </div>
                    </section>

                    {nome !== "" && (
                        <div className="flex flex-col items-center justify-start mb-7 p-1 border border-gray-100/25 rounded-md">
                            <label className="text-white font-medium mt-2 mb-3">Veja como está ficando: </label>
                            <article
                                className="w-11/12 max-w-lg flex flex-col items-center justify-between mb-2 rounded px-1 py-3"
                                style={{ backgroundColor: bgColor }}>
                                <p className="font-medium" style={{ color: textColor }}>{nome}</p>
                            </article>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="mt-20 bg-blue-600 h-10 rounded text-white font-medium cursor-pointer"
                        onClick={handleRegister}
                    >Cadastrar
                    </button>

                </form>

                <h2 className="text-white font-bold text-2xl flex flex-col items-center justify-center mt-15">
                    Meus links
                </h2>

                {links.map((data)=>(
                    <article 
                        key={data.id}
                        className="w-11/12 max-w-xl py-3 flex items-center justify-between px-6 ml-6 mt-4" 
                        style={{ backgroundColor: data.background, color: data.cor }}>

                    <p>{data.texto}</p>

                    <div>
                        <button 
                            className="border border-dashed p-1 cursor-pointer bg-black"
                            onClick={() => handleDelete(data.id)}>
                            <FiTrash2 size={18} color="#fff" />
                        </button>
                    </div>
                </article>
                ))}
            </div>
        </div>
    )
}