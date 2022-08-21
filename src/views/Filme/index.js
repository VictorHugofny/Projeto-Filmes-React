import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './style.css';
import api from '../../services/api';
import { toast } from 'react-toastify';


function Filme(){
    const {id} = useParams();
    const navigation = useNavigate();

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
                navigation("/",{ replace:true})
                return;
            });
        }

        loadFilme();
    },[navigation, id])

    function salvarFilme(){
        //pega lista de filmes
        const minhaLista = localStorage.getItem("@primeflix");

        //tentar buscar e se não existir iniciar vazio
        let filmesSalvos = JSON.parse(minhaLista) || [];
        
        //verifica se ja existe esse filme na lista
        const hasFilme = filmesSalvos.some((filmesSalvos)=> filmesSalvos.id === filme.id)
        
        if(hasFilme){
            toast.warn("Filme ja existe");
            return;
        }

        filmesSalvos.push(filme);
        //cria lista de filmes
        localStorage.setItem("@primeflix",JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso");
    }

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
            <div className='buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <a target='blank' href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>
                    <button>Trailer</button>
                </a>
            </div>
        </div>
    )
}

export default Filme;