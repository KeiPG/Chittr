import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import LoginScreen from "react-native-login-screen";
class profileEditScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        this.state = {
            givenName: "",
            familyName: "",
            password: "",
            email: ""

        }

    }
    
    Edit() {
        console.log(global.id);
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + global.id,
            {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Authorization': global.token,
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
                this.props.navigation.navigate('Profile')
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <View>
                
                <TextInput
                    placeholder="Given Name"
                    onChangeText={gn => this.setState({ givenName: gn })}></TextInput>
                <TextInput
                    placeholder="Family Name"
                    onChangeText={fn => this.setState({ familyName: fn })}></TextInput>
                <TextInput
                    placeholder="Email"
                    onChangeText={em => this.setState({ email: em })}></TextInput>
                <TextInput
                    placeholder="Password"
                    onChangeText={pass => this.setState({ password: pass })}></TextInput>
                <Button title={"Edit"} onPress={() => this.Edit()} ></Button>
                <Button
                            title="Change Profile Picture"
                            onPress={() => this.props.navigation.navigate('Camera')}
                        />
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
const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'column' },
    preview: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
    capture: {
        flex: 0, borderRadius: 5, padding: 15, paddingHorizontal: 20,
        alignSelf: 'center', margin: 20,
    }
});
export default profileEditScreen;