import React from 'react'
import { StyleSheet, View , Text, Image ,TouchableOpacity} from 'react-native'
import {getImageMovie} from '../Api/TMDBApi'
import FadeIn from '../Animations/FadeIn'




class FilmItem extends React.Component {

    _displayFavoriteImage() {
        if(this.props.isFilmFavorite) {
            var sourceImage = require('../Images/ic_favorite.png')
            return (
                <Image style={styles.favorite_image}
                       source={sourceImage}>
                </Image>
            )
        }
    }


    render() {
        const { film, displayDetailForFilm, isFilmFavorite} = this.props
        
        return(
            <FadeIn>

                <TouchableOpacity style={styles.main_container}  onPress={()=> displayDetailForFilm(film.id)}>

                    <View>
                        <Image 
                        source={{uri: getImageMovie(film.poster_path)}}
                        style={styles.image}
                        />
                    </View>

                    <View style={styles.container}>

                        <View style={styles.header}>
                            {this._displayFavoriteImage()}
                            <Text style={styles.title_text}>{film.title}</Text>
                            <Text style={styles.vote_text}>{film.vote_average}</Text>
                        </View>

                        <View style={styles.body}>
                            <Text style={styles.text_body} numberOfLines={6}>{film.overview}</Text>
                        </View>

                        <View style={styles.footer}>
                            <Text>{film.release_date}</Text>
                        </View>
                        
                    </View>

                </TouchableOpacity>
                
            </FadeIn>
        )
    }
}


const styles = StyleSheet.create({
    main_container : {
        height : 190,
        flexDirection : 'row',
        marginBottom : 5,
    },
    image : {
        height : 180,
         width :120,
         margin : 5,
    },
    container :{
        flex : 3,
        flexDirection: 'column',
        marginLeft: 5,
        marginRight : 5
    },
    header : {
        flexDirection : 'row',
        flex: 3,
    },
    title_text:{
        fontWeight: 'bold',
        fontSize : 20,
        flexWrap :'wrap',
        flex: 1,
        paddingRight: 5,
    },
    vote_text:{
        color: '#666666',
        fontSize : 26,
        fontWeight: 'bold'
    },
    body :{
        flex: 7,
        justifyContent: 'flex-start',
    },
    text_body :{
        fontStyle: 'italic',
        color: '#666666'
    },
    footer :{
        flex: 1,
        alignItems: 'flex-end',
        paddingBottom: 5,
        fontSize: 14,
    },
    favorite_image :{
        width: 25,
        height: 25,
        margin: 5,

    }

})




export default FilmItem