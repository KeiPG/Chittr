
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
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
function Profile(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen}/>
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen}/>
      <Stack.Screen name="Camera" component={CameraScreen}/>
    </Stack.Navigator>
  );
}
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
