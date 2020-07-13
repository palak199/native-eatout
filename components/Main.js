import React, { Component } from 'react';
import Menu from './Menu';
import { View , Platform} from 'react-native';
import Home from './Home';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer=createDrawerNavigator();
const Stack=createStackNavigator();

function HomeNavigator(){
    return(
    <Stack.Navigator>
      <Stack.Screen name="Home" 
      component={Home} 
      options={{
        title: 'Home',
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"            
        },
        headerTintColor: "#fff"  
      }}
      />
    </Stack.Navigator>
  )
};

function MenuNavigator (){
    return(   
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu}
        options={{
            title: 'Menu',
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"            
            },
            headerTintColor: "#fff"  
          }} />
      </Stack.Navigator>
    )
  
};
function AboutNavigator (){
    return(   
      <Stack.Navigator>
        <Stack.Screen name="About" component={About}
        options={{
            title: 'About',
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"            
            },
            headerTintColor: "#fff"  
          }} />
      </Stack.Navigator>
    )
  
};
function ContactNavigator (){
    return(   
      <Stack.Navigator>
        <Stack.Screen name="Contact" component={Contact}
        options={{
            title: 'Contact',
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"            
            },
            headerTintColor: "#fff"  
          }} />
      </Stack.Navigator>
    )
  
};

function MainNavigation(){
  return(
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home"  
    screenOptions={{
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"            
        },
        headerTintColor: "#fff"  
      }}>
      <Drawer.Screen name="Home" component={HomeNavigator} 
     />
      <Drawer.Screen name="Menu" component={MenuNavigator} />
      <Drawer.Screen name="About" component={AboutNavigator} />
      <Drawer.Screen name="Contact" component={ContactNavigator} />
    </Drawer.Navigator>
  </NavigationContainer>
  )
};

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