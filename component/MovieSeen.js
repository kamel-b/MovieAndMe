import React from 'react'
import {StyleSheet, FlatList ,Text} from 'react-native'
import MovieSeenItem from './MovieSeenItem'
import { connect } from 'react-redux'




class MovieSeen extends React.Component {



    render(){
        
        return(
          
            <FlatList
                data={this.props.moviesSeen}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) =>(
                    <MovieSeenItem
                        movieSeen={item}
                        navigation={this.props.navigation}
                    />
                )}/>
    
        )
    }
}


const styles = StyleSheet.create({

})


const mapStateToProps = (state) => {
    return {
        moviesSeen : state.toggleMoviesSeen.moviesSeen
    }
}

export default connect(mapStateToProps)(MovieSeen)