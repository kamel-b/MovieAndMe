import axios from 'axios'


const API_TOKEN = 'e1c500986b7e04c85484fa4f3e3cb0ef'

export const getFilmsFromApiWithSearchedText =  async (text) => {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
    let res = await axios.get(url)

    return res.data
    
}

// With fetch method



// export const getFilmsFromApiWithSearchedText = (text) => {
//     const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text

//     return fetch(url)
//         .then((response) => response.json())
//         .catch((error) => console.error(error))
// }

