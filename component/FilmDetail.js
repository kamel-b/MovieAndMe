import React from 'react'
import{ StyleSheet, View, Text, Image, ActivityIndicator, ScrollView} from 'react-native'
import { getFilmDetailFromApi, getImageMovie } from '../Api/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'



class FilmDetail extends React.Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            film : undefined,
            isLoading: true
        }
    }
    
    componentDidMount() {
        
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film : data,
                isLoading : false
            })
            
        })       
    }
    
    _displayLoading() { // Handle loading 
        if(this.state.isLoading) {
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' color='#0000ff' />
                </View>
            )
        }
    }
    _displayFilm() {
        if(this.state.film != undefined) {
            const {film} = this.state

            const companies = film.production_companies.map(companie =>{
                return companie.name   
            }).join(' / ');

            const genres = film.genres.map(genre =>{
                return genre.name
            }).join(' / ');

            const realeaseDate = moment(film.release_date).format('DD/MM/YYYY')
            
            const budget = numeral(film.budget).format('0,0[.]00$')

            return(
                <ScrollView>

                    <Image 
                    style={styles.image}
                    source={{ uri: getImageMovie(film.backdrop_path) }}
                    />

                     <Text style={styles.title}>{film.title}</Text>
                     <Text style={styles.overview}>{film.overview}</Text>

                     <View style={styles.information}>
                         <Text>Sorti le {realeaseDate}</Text>
                         <Text>Note: {film.vote_average}/10</Text>
                         <Text>Nombre de votes: {film.vote_count}</Text>
                         <Text>Budget: {budget}</Text>
                         <Text>Genre(s): {genres}</Text>
                         <Text>Companie(s): {companies}</Text>
                     </View>
                
                </ScrollView>
            )
        }
    }


    render(){
        
        return(
            
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
            </View>
        )
        {/*We can also use this.props.navigation.getParam('idFilm')*/}
    }

}


const styles = StyleSheet.create({

    main_container : {
        flex: 1,
        
    },
    image :{
        height : 169,
        margin : 5,
        
    },
    title : {
        fontSize: 35,
        fontStyle: 'bold',
        textAlign: 'center',
        marginLeft : 5,
        marginRight: 5,
        marginBottom: 10,
        marginTop: 10
    },
    overview : {
        fontStyle: "italic",
        color:"#666666",
        margin : 5,

    },
    information :{
        marginTop : 15,
        marginLeft: 5,
        marginRight: 5,
        
    },
    
    loading_container : {
        position : 'absolute',
        left : 0,
        right : 0,
        top : 0,
        bottom : 0,
        alignItems : 'center',
        color: 'red',
        justifyContent : 'center'
    }

})


export default FilmDetail