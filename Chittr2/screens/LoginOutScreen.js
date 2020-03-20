import React, { Component } from 'react';
import { Text, View, Button , ActivityIndicator, TextInput} from 'react-native';
class LoginOutScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        this.state = {
            password:"",
            email:"",
            tokens:{}

        }
        
    }
    login(){
        return fetch("http://10.0.2.2:3333/api/v0.0.5/login",
            {
                method: 'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
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
                this.setState({tokens: responseJson})
                let authKey = this.state.tokens.token
                let authId = this.state.tokens.id
                global.token=authKey;
                global.id = authId;
                global.isLogedin = true;
                console.log(authKey,authId);
                this.props.navigation.navigate('Home');
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
                placeholder = "Email"
                onChangeText={em => this.setState({email:em})}></TextInput>
                <TextInput 
                placeholder="Password"
                onChangeText={pass => this.setState({password:pass})}></TextInput>
                <Button title={"Login"} onPress={() => this.login()} ></Button>
                <Button
                        title="Register"
                        onPress={() => this.props.navigation.navigate('Register')}
                    />
                <Text>{global.token}</Text>
                
            </View>
        );
    }
}
export default LoginOutScreen;