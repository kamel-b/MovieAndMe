import React from 'react'
import {StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'



class FilmList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films : []
        }
    }

    _displayDetailForFilm = (idFilm) => {
        // console.log('display fiml ' + idFilm)
        this.props.navigation.navigate('FilmDetail',{
            idFilm : idFilm
        })
    }




    render() {
            
        return (
            <FlatList 
                style={style.list}
                data={this.props.films}
                extraData={this.props.favoritesFilm}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <FilmItem
                        film={item}
                        isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                        displayDetailForFilm={this._displayDetailForFilm}
                        />
                )}
                onEndReachedThreshold={0.5}
                onEndReached={()=> {
                    if(!this.props.favoritesList && this.props.page < this.props.totalPages) {
                        this.props.loadFilms()
                    }
                }}
                />
        )
    }
}

const style = StyleSheet.create({
    list : {
        flex : 1
    }
})


const mapStateToProps = (state) => {

    return {
        favoritesFilm : state.toggleFavorite.favoritesFilm
    }
}




export default connect(mapStateToProps)(FilmList)