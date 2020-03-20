//This is a twitter clone
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import LoginOutScreen from './screens/LoginOutScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProfileEditScreen from './screens/ProfileEditScreen';
import RegisterScreen from './screens/RegisterScreen';
import CameraScreen from './screens/CameraScreen';
import ChitCameraScreen from './screens/CameraChitScreen';
import LogoutScreen from './screens/Logout.js';
//import all the screens
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
//this is a tab navigation it is also the main nav
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
//the is a stack navigation of the home screen(this includes login, logout, register and upload chit image)
function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginOutScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ChitCamera" component={ChitCameraScreen}/>
      <Stack.Screen name="Logout" component={LogoutScreen}/>
    </Stack.Navigator>
  );
}
//this is a stack nav of profile which includes profile edit and change profile image
function Profile(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen}/>
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen}/>
      <Stack.Screen name="Camera" component={CameraScreen}/>
    </Stack.Navigator>
  );
}
//search is a stack nav that allows a user to search for other users
function Search(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

//  const AppContainer = createAppContainer(AppTabNav);
// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           style={styles.scrollView}>
//           <View style={styles.body}>
//             <Text></Text>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: "#2d2d2d",
//     height: "100%",
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: "#ababab",
//     width: "80%",
//     left: "10%",
//   },

// });

// export default App;
