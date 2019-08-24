const initialState = {
    moviesSeen : []
}


const toggleMoviesSeen = (state = initialState , action) => {

    let nextState

    switch(action.type) {
        case 'TOGGLE_MOVIES_SEEN':
        const movieSeenIndex = state.moviesSeen.findIndex(item =>
            item.id === action.value.id)
            if(movieSeenIndex !== -1) {
                nextState = {
                    ...state,
                    moviesSeen : state.moviesSeen.filter((item , index) => index !== movieSeenIndex)
                }
            }
            else {
                nextState ={
                    ...state,
                    moviesSeen: [...state.moviesSeen, action.value]
                }
            }

        return nextState || state
    default:
        return state
                
            

    }
}


export default toggleMoviesSeen