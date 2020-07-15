import React, { Component } from 'react';
import { View , Platform, StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; 

import Home from './Home';
import Menu from './Menu';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Icon} from 'react-native-elements'
import Dishdetail from './DishdetailComponent';
import {CustomDrawerComponent} from './CustomDrawer'
const Drawer=createDrawerNavigator();
const Stack=createStackNavigator();


function HomeNavigator({navigation}){
    return(
    <Stack.Navigator 
    >
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
        headerTintColor: "#fff" ,
        
        
      }}
      navigationOptions={{ 
        headerLeft: <Icon name="menu" size={24} 
        color= 'white'
        onPress={ () => navigation.toggleDrawer() }/>
       }}
     
      
      />
    </Stack.Navigator>
  )
};

function MenuNavigator ({navigation}){
    return(   
      <Stack.Navigator   
      initialRouteName='Menu'>
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
          }} 
          navigationOptions={{ 
            headerLeft: <Icon name="menu" size={24} 
            color= 'white'
            onPress={ () => navigation.toggleDrawer() }/>
           }}
        />
           <Stack.Screen name="Dishdetail"
           options={{
            title: 'dish detail',
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"            
            },
            headerTintColor: "#fff"  
          }} 
          navigationOptions={{ 
            headerLeft: <Icon name="menu" size={24} 
            color= 'white'
            onPress={ () => navigation.toggleDrawer() }/>
           }} 
          component={Dishdetail}/>
          
      </Stack.Navigator>
    )
  
};
function AboutNavigator ({navigation}){
    return(   
      <Stack.Navigator  
      >
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
          }} 
          navigationOptions={{ 
            headerLeft: <Icon name="menu" size={24} 
            color= 'white'
            onPress={ () => navigation.toggleDrawer() }/>
            
           }}/>
      </Stack.Navigator>
    )
  
};
function ContactNavigator ({navigation}){
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
          }} 
          navigationOptions={{ 
            headerLeft: <Icon name="menu" size={24} 
            color= 'white'
            onPress={ () => navigation.toggleDrawer() }/>
           }}/>
      </Stack.Navigator>
    )
  
};

function MainNavigation(){
  return(
    <SafeAreaProvider>
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home"   
    drawerContent={(props) => <CustomDrawerComponent {...props} />}
   drawerStyle={{
    backgroundColor: '#c6cbef',
   
   
  }}
  
   >
   
      <Drawer.Screen name="Home" 
      component={HomeNavigator} 
      options={{ 
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='home'
            type='font-awesome'            
            size={24}
            color={tintColor}
          />
        ),
       }}
       
      
     />
      <Drawer.Screen name="Menu" 
      component={MenuNavigator} 
      options={{
        drawerLabel: 'Menu',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='list'
            type='font-awesome'            
            size={22}
            color={tintColor}
          />
        ),
      }}/>
      <Drawer.Screen name="About" 
      component={AboutNavigator}
      options={{ 
        drawerLabel: 'About Us',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='info-circle'
            type='font-awesome'            
            size={24}
            color={tintColor}
          />
        ),

       }} />
      <Drawer.Screen name="Contact" 
      options={{ 
        drawerLabel: 'Contact Us',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='address-card'
            type='font-awesome'            
            size={22}
            color={tintColor}
          />
        ),
       }}
      component={ContactNavigator} />
      
    </Drawer.Navigator>
  </NavigationContainer>
  </SafeAreaProvider>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});
export default Main;