import { useEffect, useState } from 'react';
import './style.css';
import {Link} from 'react-router-dom';

function Favoritos(){

    const [filmes, setFilmes] = useState([])

    useEffect(()=>{
        //puxando do localstorage
        const minhaLista = localStorage.getItem('@primeflix');
        //recebendo a lista de filmes
        setFilmes(JSON.parse(minhaLista) || [])
    },[])

    function excluirFilme(id){
        //filtrando todos os filmes menos o com mesmo id clicado
        let filtroFilmes = filmes.filter((filme)=>{
            return (filme.id !== id)
        })
        setFilmes(filtroFilmes)
        localStorage.setItem("@primeflix",JSON.stringify(filtroFilmes));
    }
    return(
        <div className='meus-filmes'>
            <h1>Meus filmes favoritos</h1>

            <ul>
                {filmes.map((filme)=>{
                    return(
                        <li ket = {filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <Link to= {`/filme/${filme.id}`}>
                                    <button>Ver detalhes</button>
                                </Link>
                                <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default Favoritos;