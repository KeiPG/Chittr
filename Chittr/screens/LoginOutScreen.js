import React, { Component } from 'react';
import { Text, View , Button} from 'react-native';
// import LoginScreen from "react-native-login-screen";
class LoginOutScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <View>
                <Text>Login Screen</Text>
                {/* <LoginScreen 
                source={null}
                logoText={"Chittr"}
                logoComponent={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'}}
                disableSettings={true}
                disableSwitch={true}
                /> */}
            </View>
        );
    }
}
export default LoginOutScreen;