var list = [
]
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native'
// import { createStackNavigator } from 'react-navigation-stack';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'
class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chits: {},
            followingUsers:[],
            isLoading: false

        }

    }
    // componentDidUpdate(){
    //     this.getChits();
    // }
    componentDidMount() {
        this.getChits();
    }
    // componentDidUpdate() {
    //     this.getChits();
    // }
    getChits() {
        if (global.token != "") {
            console.log("we in");
            fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + global.id + "/following")
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        followingUsers: responseJson,
                    });
                    console.log(responseJson);
                    if (this.state.followingUsers.length == 0) {
                        this.state.chits = [{ user:{given_name:"",family_name:"",user_id:''},chit_content: "No Chits Posted" }];
                        list = [];
                        console.log(this.state.chits);
                        this.state.chits.forEach(element => {
                            console.log(element);
                            list.push(
                                {
                                    name: element.user.given_name + " " + element.user.family_name,
                                    avatar_url: 'http://10.0.2.2:3333/api/v0.0.5/user/' + element.user.user_id + '/photo?timestamp=' + Date.now(),
                                    data: element.chit_content
                                })
                        });
                    }
                    else {
                        this.state.followingUsers.forEach(element => {
                            fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + element.user_id)
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    this.setState({
                                        isLoading: false,
                                        chits: responseJson.recent_chits,
                                    });
                                    console.log(responseJson);
                                    list = [];
                                    this.state.chits.forEach(element => {
                                        list.push(
                                            {
                                                name: element.user.given_name + " " + element.user.family_name,
                                                avatar_url: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.chits.user.user_id + '/photo?timestamp=' + Date.now(),
                                                data: element.chit_content
                                            })
                                    });
                                })
                        });

                    }


                    this.forceUpdate();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            console.log("helloworld");
            fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        chits: responseJson,
                    });
                    console.log(responseJson);
                    list = [];
                    this.state.chits.forEach(element => {
                        list.push(
                            {
                                name: element.user.given_name + " " + element.user.family_name,
                                avatar_url: 'http://10.0.2.2:3333/api/v0.0.5/user/' + element.user.user_id + '/photo?timestamp=' + Date.now(),
                                data: element.chit_content
                            })
                    });
                    this.forceUpdate();
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }
    // getProfilePic(id) {
    //     console.log("pic");
    //     fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+id+'/photo')
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             this.setState({
    //                 isLoading: false,
    //                 photo: responseJson,
    //             });
    //             console.log(responseJson);

    //             this.forceUpdate();
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }


    render() {
        if (global.token != "") {
            return (
                <View>
                    <Button onPress={() => this.getChits()}></Button>
                    <Card containerStyle={{ padding: 0 }} >
                        {
                            list.map((l, i) => {
                                return (
                                    <ListItem
                                        key={i}
                                        leftAvatar={{ source: { uri: l.avatar_url } }}
                                        title={l.name}
                                        subtitle={l.data}
                                        bottomDivider
                                    />
                                );
                            })
                        }
                    </Card>
                </View>
            );
        }
        else {
            return (
                <View>
                    <Card>
                        <Text style={{ marginBottom: 10 }}>
                            Please Login
      </Text>
                        <Button
                            title="Login"
                            onPress={() => this.props.navigation.navigate('Login')}
                        />
                    </Card>
                    <Button onPress={() => this.getChits()}></Button>
                    <Card containerStyle={{ padding: 0 }} >
                        {
                            list.map((l, i) => {
                                return (
                                    <ListItem
                                        key={i}
                                        leftAvatar={{ source: { uri: l.avatar_url } }}
                                        title={l.name}
                                        subtitle={l.data}
                                        bottomDivider
                                    />
                                );
                            })
                        }
                    </Card>
                </View>
            );
        }
    }
}
export default HomeScreen;