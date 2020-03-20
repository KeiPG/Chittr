

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// import HomeScreen from './screens/HomeScreen';
// import LoginOutScreen from './screens/LoginOutScreen';
// import SearchScreen from './screens/SearchScreen';
// import ProfileScreen from './screens/ProfileScreen';

const AppTabNav = createBottomTabNavigator({
  Home: {
  screen: HomeScreen
  },
  Login: {
  screen: LoginOutScreen
  },
  Search: {
  screen: SearchScreen
  },
  Profile: {
  screen: ProfileScreen
  }
 });
 
 const AppContainer = createAppContainer(AppTabNav);
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

export default AppContainer;
