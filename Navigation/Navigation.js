import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Search from '../component/Search'
import FilmDetail from '../component/FilmDetail'
import Favorites from '../component/Favorites'



const SearchStackNavigator = createStackNavigator({
    Search : {
        screen : Search,
        navigationOptions : {
            title : 'Rechercher'
        }
    },
    FilmDetail : {
        screen : FilmDetail,
    },
   
})

const MoviesTabNavigator = createBottomTabNavigator(

    {
      Search: {
        screen: SearchStackNavigator,
        navigationOptions: {
          tabBarIcon: () => { 
            return <Image
              source={require('../Images/ic_search.png')}
              style={styles.icon}/> 
          }
        }
      },

      Favorites: {
        screen: Favorites,
        navigationOptions: {
          tabBarIcon: () => {
            return <Image
              source={require('../Images/ic_favorite.png')}
              style={styles.icon}/>
          }
        }
      }
    },

    {
      tabBarOptions: {
        activeBackgroundColor: '#DDDDDD', 
        inactiveBackgroundColor: '#FFFFFF', 
        showLabel: false,
      }

    }
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(MoviesTabNavigator)