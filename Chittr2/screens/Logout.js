import React, { Component } from 'react';
import { Text, View, Button , ActivityIndicator, TextInput} from 'react-native';
class LogOutScreen extends Component {
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
    logout(){
        return fetch("http://10.0.2.2:3333/api/v0.0.5/logout",
            {
                method: 'POST',
                headers: {
                    'X-Authorization': global.token,
                },
                
            })
            .then((response) => {
                console.log(response);
                if(response.ok){
                    global.id = "";
                    global.token = "";
                    this.props.navigation.navigate('Home');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <View>
                
                <Button title={"Logout"} onPress={() => this.logout()} ></Button>
                
                
            </View>
        );
    }
}
export default LogOutScreen;