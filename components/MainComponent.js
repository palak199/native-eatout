import React, { Component } from 'react';
import Menu from './Menu';
import { View , Platform} from 'react-native';
import Home from './Home';
import {createAppContainer,} from 'react-navigation'; 
import {createStackNavigator, createDrawerNavigator} from 'react-navigation-stack';

const HomeNavigator = createStackNavigator({
  Home: { screen: Home }
}, {
  navigationOptions: ({ navigation }) => ({
  
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff"  
  })
});

const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff"  
  })
});

const MainNavigation=createDrawerNavigator({
  Home: 
    { screen: HomeNavigator,
      navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home'
      }
    },
  Menu: 
    { screen: MenuNavigator,
      navigationOptions: {
        title: 'Menu',
        drawerLabel: 'Menu'
      }, 
    }
}, 
  {
drawerBackgroundColor: '#D1C4E9'
});

// const MenuNav = createAppContainer(MenuNavigator);
// const HomeNav = createAppContainer(HomeNavigator);
// const MainNav=createAppContainer(MainNavigation);
class Main extends Component {
  
  render() {
 return(
    <View style={{ flex:1, paddingTop:Platform.OS==='ios'? 0: Expo.Constants.statusBarHeight }}>
    <MainNavigation/>
    </View>
 )
}
}
export default Main;