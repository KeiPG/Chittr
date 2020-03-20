var userList = [

]
import React, { Component } from 'react';
import { View, Text, Image , TextInput} from 'react-native'
// import { createStackNavigator } from 'react-navigation-stack';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'
class SearchScreen extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            seachName: "",
            users: {},
            isLoading: false

        }

    }

    componentDidMount() {
        this.getUsers("");
    }
    getUsers(name) {
        console.log("helloworld");
        fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+name)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    users: responseJson,
                });
                console.log(responseJson);
                userList = [

                ]
                this.state.users.forEach(element => {
                    userList.push(
                        {
                            id: element.user_id,
                            name: element.given_name + " " + element.family_name,
                            avatar_url: 'http://10.0.2.2:3333/api/v0.0.5/user/' + element.user_id + '/photo?timestamp=' + Date.now()
                        })
                });
                this.forceUpdate();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    goToProfile(id){
        global.profileId = id;
        this.props.navigation.navigate("Profile");
    }


    render() {
        return (
            <View>
                <TextInput
                    placeholder="Name"
                    onChangeText={name => this.getUsers(name)}></TextInput>


                <Card containerStyle={{ padding: 0 }} >
                    {
                        userList.map((l, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    leftAvatar={{ source: { uri: l.avatar_url } }}
                                    title={l.name}
                                    bottomDivider
                                    onPress={() => this.goToProfile(l.id)}
                                />
                            );
                        })
                    }
                </Card>
            </View>
        );
    }
}
export default SearchScreen;