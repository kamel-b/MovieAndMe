import React from 'react'
import {StyleSheet, View, Button, TextInput, ActivityIndicator ,Text, FlatList} from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText }from '../Api/TMDBApi'



class Search extends React.Component {


    constructor(props) {
        super(props)

        this.searchedText = ""

        this.state = { 
            films : [],
            isLoading : false
        }
        
    }



    _loadFilms() {
        this.setState({ isLoading : true })
        if(this.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchedText).then(data => 
                this.setState({ 
                    // films : data.results,
                    // isLoading : false 
                })
            )
            
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



    render() {
        console.log('ma state chargement',this.state.isLoading);
        
        return (
            
            <View style ={styles.main_container}>
                <TextInput style ={styles.textinput} placeholder='Titre du film' onSubmitEditing={() => this._loadFilms()}  onChangeText={(text) => this._searchTextInputChanged(text)}/>
                <Button style ={{ height: 50,}} title='Rechercher' onPress={() => this._loadFilms()} />
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item} />}
                />
                {this._displayLoading()}
            </View>

            )

        }

}

const styles = StyleSheet.create({

    main_container : {
        marginTop: 40,
        flex : 1,
    },
    
    textinput : {
        marginLeft : 5 ,
        marginRight: 5 ,
        marginBottom : 10,
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