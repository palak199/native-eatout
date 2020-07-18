
import { SafeAreaView } from 'react-native-safe-area-context'; 
import React from 'react';
import { DrawerItemList } from '@react-navigation/drawer';
import { View , Text, Image,StyleSheet} from 'react-native';
export const CustomDrawerComponent=(props)=>{
    
    return(
  
    <SafeAreaView 
    style={styles.container} 
    forceInset={{ top:'always', horizontal:'never' }}> 
      <View style={styles.drawerHeader}>
        <View style={{ flex:1 }}>
          <Image source={require('./images/logo.png')}
          style={styles.drawerImage}        />
  
        </View>
        <View style={{flex: 2}}>
              <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
            </View>
      </View>
      <DrawerItemList {...props}></DrawerItemList>
    </SafeAreaView>
  )
  }
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 100,
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
      margin: 2,
      width: 80,
      height: 60
    }
  });