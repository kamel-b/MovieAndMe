import React from 'react'
import { StyleSheet , View , Text, Image, TouchableOpacity } from 'react-native'
import {getImageMovie} from '../Api/TMDBApi'
import moment from 'moment'





class MoviesSeenItem extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            valueChange : this.props.movieSeen.title,
            dateIsShow : false
        }
    }


    _handleLOngPress(){
        this._displayRealeaseDate()

    }
    
    
    _displayRealeaseDate(){

            if(!this.state.dateIsShow) {
                this.setState({
                    valueChange : moment(this.props.movieSeen.release_date).format('DD/MM/YYYY'),
                    dateIsShow : true
                })
              
            }
            else{
                this.setState({
                    valueChange : this.props.movieSeen.title,
                    dateIsShow: false
                })
            }        
        
    }
    

    _displayDetailForFilm =(idFilm)=>{
        console.log('id: ' ,idFilm);
        this.props.navigation.navigate('FilmDetail',{
            idFilm : idFilm
        })
        
    }

    render(){
        const{ movieSeen } = this.props
        
        return(
            

            <View style={styles.main_container}>

                <TouchableOpacity onPress={()=> this._displayDetailForFilm(movieSeen.id)}>
                    <Image 
                        source={{uri: getImageMovie(movieSeen.poster_path)}}
                        style={styles.image}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container} onLongPress={()=> this._handleLOngPress()} activeOpacity={0.6}>
                    <Text style={styles.valueChange}>
                        {this.state.dateIsShow ? "Sorti le " : ''}
                        {this.state.valueChange}
                    
                    </Text>
                </TouchableOpacity>

            </View>

            
           
        )
    }
}



const styles = StyleSheet.create({
    main_container:{
        flex: 1,
        flexDirection: 'row',
        margin : 5,
    }
    ,
    image:{
        width: 100,
        height: 100,
        borderRadius: 140/2
    },
    container:{
        justifyContent:'center',
        flex:1
    },
    valueChange: {
        fontSize: 20,
        paddingLeft: 10,

    }
})


export default MoviesSeenItem