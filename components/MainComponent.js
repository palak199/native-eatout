import React, { Component } from 'react';
import { View , Platform} from 'react-native';
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
import {CustomDrawerComponent} from './CustomDrawer';
import Reservation from './ReservationComponent';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
const Drawer=createDrawerNavigator();
const Stack=createStackNavigator();

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

function HomeNavigator({navigation}){
    return(
    <Stack.Navigator >
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
        headerLeft: <Icon name="menu" size={22} 
        color= 'white'
        onPress={ () => navigation.toggleDrawer() }/>
       }}
     
      
      />
    </Stack.Navigator>
  )
};
function ReservationNavigator({ navigation }) {
  return (
    <Stack.Navigator  initialRouteName='Reservation' >
      <Stack.Screen  name="Reservation" component={Reservation}
      NavigationOptions = {{
      headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }} 
      onPress={ () => navigation.navigate('DrawerToggle') } />    
  }}>
        
        </Stack.Screen>
      </Stack.Navigator>)
     
 
}

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
            headerLeft: <Icon name="menu" size={22} 
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
            headerLeft: <Icon name="menu" size={22} 
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
            headerLeft: <Icon name="menu" size={22} 
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
            headerLeft: <Icon name="menu" size={22} 
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
    backgroundColor: '#D1C4E9',
   
   
  }}
  
   >
   
   <Drawer.Screen name="Home" 
      component={HomeNavigator} 
      options={{ 
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='home'
            type='font-awesome'            
            size={22}
            color={tintColor}
          />
        ),
       }}   
     />
   
     <Drawer.Screen name="reservation" 
      component={ReservationNavigator} 
      options={{ 
        drawerLabel: 'Reserve a table',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='cutlery'
            type='font-awesome'            
            size={22}
            color={tintColor}
          />
        ),
       }}   
     />
     
      <Drawer.Screen name="Menu" 
      component={MenuNavigator} 
      options={{
        drawerLabel: 'Menu',
        drawerIcon: ({ tintColor }) => (
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
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='info-circle'
            type='font-awesome'            
            size={22}
            color={tintColor}
          />
        ),

       }} />
      <Drawer.Screen name="Contact" 
      options={{ 
        drawerLabel: 'Contact Us',
        drawerIcon: ({ tintColor }) => (
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
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  
  render() {
 return(
    <View style={{ flex:1, paddingTop:Platform.OS==='ios'? 0: Expo.Constants.statusBarHeight }}>
    <MainNavigation/>
    </View>
 )
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);