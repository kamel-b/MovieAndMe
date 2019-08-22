import React from 'react'
import{ StyleSheet, View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity, Share, Platform } from 'react-native'
import { getFilmDetailFromApi, getImageMovie } from '../Api/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import EnlargeShrink from '../Animations/EnlargeShrink'



class FilmDetail extends React.Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            film : undefined,
            isLoading: false
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state

        if(params.film != undefined && Platform.OS === 'ios') {
            return{
                headerRight: 
                <TouchableOpacity>
                    <Image 
                        style={styles.share_image}
                        source={require('../Images/ic_share.png')}
                    />
                </TouchableOpacity>
            }
        }
    }
    
    _updateNavigationParams(){
        this.props.navigation.setParams({
            shareFilm : this._shareFilm,
            film: this.state.film
        })
    }


    componentDidMount() {

        const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)

        if(favoriteFilmIndex !== -1){
            this.setState({
                film : this.props.favoritesFilm[favoriteFilmIndex]
            },()=>{this._updateNavigationParams()})
            return
        }

        this.setState({ isLoading: true })
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

    _shareFilm = () => {
        const {film } = this.state
        Share.share({
            title : film.title,
            message: film.overview
        })
    }

    _displayFloattingActionButton() {
        const { film }= this.state
        if(film != undefined && Platform.OS === 'android') {
            return(
                <TouchableOpacity 
                    style={styles.share_touchable_floatingactionbutton}
                    onPress={() => this._shareFilm()}>
                    <Image 
                        style={styles.share_image}
                        source={require('../Images/ic_share.png')}
                    />
                </TouchableOpacity>
            )
        }
    }


    _toggleFavorite() {
        const action ={
            type:'TOGGLE_FAVORIT',
            value: this.state.film
        }
        this.props.dispatch(action)
    }


    
    _displayFavoriteImage (){
        var sourceImage = require('../Images/ic_favorite_border.png')
        var shouldEnlarge = false
        if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../Images/ic_favorite.png')
            shouldEnlarge = true
        }
        return (
            <EnlargeShrink shouldEnlarge={shouldEnlarge}>
                <Image style={styles.favorite_image}
                       source={sourceImage}  
                />
            </EnlargeShrink>
        )
    }


    _displayFilm() {
        const {film} = this.state
        if(film != undefined) {

            const companies = film.production_companies.map(companie =>{
                return companie.name   
            }).join(' / ');

            const genres = film.genres.map(genre =>{
                return genre.name
            }).join(' / ');

            const realeaseDate = moment(film.release_date).format('DD/MM/YYYY')
            
            const budget = numeral(film.budget).format('0,0[.]00$')

            return(
                <ScrollView style={styles.scrollview_container}>

                    <Image 
                    style={styles.image}
                    source={{ uri: getImageMovie(film.backdrop_path) }}
                    />

                     <Text style={styles.title}>{film.title}</Text>
                     <TouchableOpacity style={styles.favorite_container} onPress={()=> this._toggleFavorite()}>
                         {this._displayFavoriteImage()}
                     </TouchableOpacity>
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
                {this._displayFloattingActionButton()}
            </View>
        )
        {/*We can also use this.props.navigation.getParam('idFilm')*/}
    }

}


const styles = StyleSheet.create({

    main_container : {
        flex: 1,
        
    },
    scrollview_container : {
        flex :1
    },
    image :{
        height : 169,
        margin : 5,
        
    },
    title : {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginLeft : 5,
        marginRight: 5,
        marginBottom: 10,
        marginTop: 10
    },
    favorite_container: {
        alignItems: 'center',
        flex : 1
    },
    favorite_image : {
        flex : 1,
        width: null,
        height: null,
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
        justifyContent : 'center'
    },
    share_touchable_floatingactionbutton : {
        position: 'absolute',
        width : 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems : 'center'
    },
    share_image: {
        width: 30,
        height: 30
    }

})


const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmDetail)