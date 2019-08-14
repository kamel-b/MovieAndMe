import React from 'react'
import {StyleSheet, View, Button, TextInput, ActivityIndicator ,Text, FlatList} from 'react-native'
import FilmItem from './FilmItem'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText }from '../Api/TMDBApi'



class Search extends React.Component {


    constructor(props) {
        super(props)

        this.searchedText = ""
        this.page = 0
        this.totalPages = 0

        this.state = { 
            films : [],
            isLoading : false
        }
        
    }



    _loadFilms = () => {
        this.setState({ isLoading : true })
        if(this.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page //  get page
                this.totalPages = data.total_pages // get total page 1 page = 20 items(movie)
                // console.log('Page : ' + this.page);
                // console.log('Total page : ' +this.totalPages);
                
                this.setState({ 
                    films : [...this.state.films, ...data.results], // or we can use film : this.state.film.concat(data.results)
                    isLoading : false 
                })
            })
            
        }
                 
        
    }
    
    _searchTextInputChanged(text) {
        this.searchedText = text
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

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({ 
            films : [] 
        },()=>{
            this._loadFilms()
        })
    }

    _displayDetailForFilm = (idFilm) => {

        // console.log('Display film avec id' + idFilm);
        this.props.navigation.navigate("FilmDetail", {
             idFilm : idFilm,  
            })        
    }

    

    render() {       
        
        return (
            
            <View style ={styles.main_container}>

                <TextInput style ={styles.textinput} 
                placeholder='Titre du film' 
                onSubmitEditing={() => this._searchFilms()}  
                onChangeText={(text) => this._searchTextInputChanged(text)}
                />
                <Button style ={{ height: 50,}} title='Rechercher' onPress={() => this._searchFilms()} />

                <FilmList 
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms}
                    page={this.page}
                    totalPages={this.totalPages}
                    favoriteList={false}
                />

                {this._displayLoading()}
                
            </View>

            )

        }

}

const styles = StyleSheet.create({

    main_container : {
        flex : 1,
    },
    
    textinput : {
        marginLeft : 5 ,
        marginRight: 5 ,
        marginBottom : 10,
        marginTop: 10,
        height : 50,
        borderColor :'#000000',
        borderWidth: 1,
        paddingLeft:5
    },

    loading_container : {
        position : 'absolute',
        left : 0,
        right : 0,
        top : 90,
        bottom : 0,
        alignItems : 'center',
        color: 'red',
        justifyContent : 'center'
    }
})


export default Search