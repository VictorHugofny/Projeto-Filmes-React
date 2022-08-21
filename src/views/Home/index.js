import { useEffect, useState} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './style.css'
//movie/now_playing?api_key=afd04b3461ee0639ed947de89b70e915&language=pt-BR

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    //hoje foi so tristeza
    //Toda vez que roda a aplica
    //consumindo API com axios
    useEffect(()=>{
        //rodar função de forma asincrona
        async function loadFilmes(){
            //await para ele esperar a busca na api e evitar erro
            const response = await api.get("movie/now_playing",{
                params: {
                    api_key: 'afd04b3461ee0639ed947de89b70e915',
                    language: "pt-BR",
                    page:1
                }
            })

            //console.log(response.data.results.slice(0,10));
            setFilmes(response.data.results.slice(0,10))
            setLoading(false)
        }

        loadFilmes();
    },[])

    //controlador de load
    if(loading){
        return(
            <div class='loading'>
                <h2>Carregando filmes</h2>
            </div>
        )
    }
    return(
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme)=>{
                    return(
                        <article key ={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src= {`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title}></img>
                            <Link to ={`/filme/${filme.id}`}> Acessar</Link>
                        </article>
                    )
                })
            }
                    
            </div>
            
        </div>
    )
}

export default Home;