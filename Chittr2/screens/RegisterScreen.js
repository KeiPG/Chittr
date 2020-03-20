import React, { Component } from 'react';
import { Text, View, Button , ActivityIndicator, TextInput} from 'react-native';
import LoginScreen from "react-native-login-screen";
class RegisterScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        this.state = {
            givenName:"",
            familyName:"",
            password:"",
            email:""

        }
        
    }
    Register(){
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user",
            {
                method: 'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    given_name: this.state.givenName,
                    family_name: this.state.familyName,
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((responseJson) => {
                if(responseJson){
                
                }
                else 
                {
                    console.log("error")
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <View>
                
                <TextInput
                placeholder = "Given Name"
                onChangeText={gn => this.setState({givenName:gn})}></TextInput>
                <TextInput 
                placeholder="Family Name"
                onChangeText={fn => this.setState({familyName:fn})}></TextInput>
                <TextInput
                placeholder = "Email"
                onChangeText={em => this.setState({email:em})}></TextInput>
                <TextInput 
                placeholder="Password"
                onChangeText={pass => this.setState({password:pass})}></TextInput>
                <Button title={"Register"} onPress={() => this.Register()} ></Button>
                <Text>{global.token}</Text>
                {/* <Text>Login Screen</Text> */}
                {/* <LoginScreen
                    spinnerEnable
                    spinnerVisibility
                    source={null}
                    logoText={"Chittr"}
                    // onPressLogin={this.login()}
                    // usernameOnChangeText={username => setUsername(username)}
                    // passwordOnChangeText={password => setPassword(password)}
                    disableSettings={true}
                    disableSwitch={true}
                /> */}
            </View>
        );
    }
}
export default RegisterScreen;