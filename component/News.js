import React from 'react'
import {StyleSheet, View , Text} from 'react-native'
import { getNewMovies } from '../Api/TMDBApi'
import FilmList from './FilmList'




class News extends React.Component {

    constructor(props){
        super(props)

        this.page = 0
        this.totalPages= 0

        this.state = {
            newMovies : [],
            isLoading : false
        }
    }

    _loadNewsMovie = () =>{
        this.setState({ isLoading : true })
        getNewMovies(this.page+1).then(data => {            
            this.page = data.page
            this.totalPages = data.total_pages
            this.setState({
                newMovies : [...this.state.newMovies, ...data.results],
                isLoading : false
            })
        })
    }

    componentDidMount(){
        this._loadNewsMovie();
        
    }

    render(){
        
        
        return(
            
            <FilmList
                films={this.state.newMovies}
                navigation={this.props.navigation}
                loadFilms={this._loadNewsMovie}
                page={this.page}
                totalPages={this.totalPages}
                favoriteList={false}
                />
        
        )
    }
}

const styles = StyleSheet.create({

})


export default News