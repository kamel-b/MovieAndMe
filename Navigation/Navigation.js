import { createStackNavigator, createAppContainer } from 'react-navigation'
import Search from '../component/Search'
import FilmDetail from '../component/FilmDetail'
import NewWindow from '../component/NewWindow'



const SearchStackNavigator = createStackNavigator({
    Search : {
        screen : Search,
        navigationOptions : {
            title : 'Rechercher'
        }
    },
    FilmDetail : {
        screen : FilmDetail,
    },
   
})



export default createAppContainer(SearchStackNavigator)