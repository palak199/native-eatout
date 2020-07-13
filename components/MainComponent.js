import React, { Component } from 'react';
import Menu from './Menu';
import Dishdetail from './DishDetailComponent';
import { View , Platform} from 'react-native';
//import { createStackNavigator } from '@react-navigation/stack';

import {createAppContainer} from 'react-navigation'; 
import {createStackNavigator} from 'react-navigation-stack';
const Navigation=createStackNavigator({
  menu:{screen :Menu},
  Dishdetail:{screen: Dishdetail},
},
{
  initialRouteParams: 'Menu',
  navigationOptions: {
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      }
  }
})
const Ap = createAppContainer(Navigation);
class Main extends Component {
  
  render() {
 return(
    <View style={{ flex:1, paddingTop:Platform.OS==='ios'? 0: Expo.Constants.statusBarHeight }}>
    <Ap/>
    </View>
 )
}
}
export default Main;