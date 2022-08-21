import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import api from '../../services/api';

function Filme(){
    const {id} = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        //esperar requisição
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: 'afd04b3461ee0639ed947de89b70e915',
                    language: "pt-BR"
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch((erro)=>{
                console.log('erro')
            });
        }

        loadFilme();
    },[])

    if(loading){
        return(
            <div>
                <h1>Carregando filme</h1>
            </div>
        )
    }
    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src= {`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title}></img>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} /10</strong>
        </div>
    )
}

export default Filme;