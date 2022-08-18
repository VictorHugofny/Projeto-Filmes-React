//URL API 
// https://api.themoviedb.org/3/movie/now_playing?api_key=afd04b3461ee0639ed947de89b70e915&language=pt-BR
// BASE https://api.themoviedb.org/3/

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;