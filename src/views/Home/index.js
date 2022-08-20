import { useEffect, useState} from 'react';
import api from '../../services/api'

//movie/now_playing?api_key=afd04b3461ee0639ed947de89b70e915&language=pt-BR

function Home(){
    const [filmes, setFilmes] = useState([]);
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
        }

        loadFilmes();
    },[])
    return(
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme)=>{
                    return(
                        <article>
                            <strong>{filme.title}</strong>
                            <img src={filme.poster_path}></img>
                        </article>
                    )
                })
            }
                    
            </div>
            
        </div>
    )
}

export default Home;