import React from 'react'
import {StyleSheet, View, Button, TextInput, Image , FlatList} from 'react-native'
import filmsData from '../Helpers/filmsData'
import FilmItem from './FilmItem'



class Search extends React.Component {
    render() {
        return (
            
            <View style ={styles.main_container}>
                <TextInput style ={styles.textinput} placeholder='Titre du film'/>
                <Button style ={{ height: 50,}} title='Rechercher' onPress={() => {}}/>
                <FlatList
                    data={filmsData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item} />}
                />
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
    }
})



export default Search