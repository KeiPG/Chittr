import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
//this is the profile screen due to not having alot of time i have had to write this badly sorry it is
//a mess of a screen
class ProfileScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            id: "",
            user: {},
            usersProfile: true,
            currentState: "Followers",
            following: [],
            followers: [],
            chits: [],
            isFollowing: false

        }

    }
    // componentDidUpdate(){
    //     if(global.profileId != ""){
    //         this.state.id = global.profileId;
    //         global.profileId = "";
    //     }
    //     else if(global.id != ""){
    //         this.state.id = global.id;
    //     }
    //     else{
    //         this.props.navigation.navigate('Login');

    //     }
    //     this.getUser(this.state.id);
    //     this.getFollowing(this.state.id);
    //     this.getFollowers(this.state.id);
    // }
    //the init that is sets up the file
    componentDidMount() {
        if (global.profileId != "") {
            this.state.id = global.profileId;
            if(this.state.id != global.id){
                this.state.usersProfile = false;
            }
            if(this.state.id == global.id){
                this.state.usersProfile = true;
            }
            console.log(this.state.id + "this is the id");
            global.profileId = "";
        }
        else if (global.id != "") {
            this.state.id = global.id;
            this.state.usersProfile = true;
        }
        else {
            this.props.navigation.navigate('Login');

        }
        this.getUser(this.state.id);
        this.getFollowing(this.state.id);
        this.getFollowers(this.state.id);
        this.checkFollowing();
    }
    //update is a function is used to reload the app as i couldnt have it auto refresh without it being super laggy.
    update() {
        if (global.profileId != "") {
            this.state.id = global.profileId;
            if(this.state.id != global.id){
                this.state.usersProfile = false;
            }
            if(this.state.id == global.id){
                this.state.usersProfile = true;
            }
            console.log(this.state.id + "this is the id");
            global.profileId = "";
        }
        else if (global.id != "") {
            this.state.id = global.id;
            this.state.usersProfile = true;
        }
        else {
            this.props.navigation.navigate('Login');

        }
        this.getUser(this.state.id);
        this.getFollowing(this.state.id);
        this.getFollowers(this.state.id);
    }
    //this function is used to see if the profile being looked at is already followed
    checkFollowing() {
        this.state.following.forEach(element => {
            if (element.user_id == global.id) {
                this.state.isFollowing = true;
            }
        });
    }
    //this is to unfollow from the account you are looking at
    unfollowUser = () => {
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.id + "/follow",
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Authorization': global.token,
                },
            })
            .then((response) => {
                console.log(response);
                this.state.isFollowing = false;
                this.forceUpdate();
            })
            .catch((error) => {
                console.error(error);
            });
    }
    //this is to follow the account you are looking at
    followUser = () => {
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + this.state.id + "/follow",
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Authorization': global.token,
                },
            })
            .then((response) => {
                console.log(response);
                this.state.isFollowing = true;
                this.forceUpdate();
            })
            .catch((error) => {
                console.error(error);
            });
    }
    //these functions set the states this was my quick work around im am sorry for bad practice
    setfollowersState = () => {
        this.setState({ currentState: "Followers" });
        console.log("follower");
    }
    setfollowingState = () => {
        this.setState({ currentState: "Following" });
        console.log("following");
    }
    setChitsState = () => {
        this.setState({ currentState: "Chits" });
        console.log("chit");
    }
    //this function gets the user details for the id you give it
    getUser(id) {
        console.log("helloworld");
        userList = [];
        fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    user: responseJson,
                    chits: responseJson.recent_chits
                });
                if (this.state.chits.length == 0) {
                    this.state.chits = [{ chit_content: "No Chits Posted" }]
                }
                console.log(responseJson);

                // this.forceUpdate();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    //this function get the followers for the id you give it
    getFollowers(id) {
        console.log("helloworld");
        userList = [];
        fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/followers')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    followers: responseJson,
                });
                if (this.state.followers.length == 0) {
                    this.state.followers = [{ given_name: "No Followers" }]
                }
                console.log(responseJson);

                this.forceUpdate();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    //this is a function the gets you the following of the id you give it
    getFollowing(id) {
        console.log("helloworld");
        userList = [];
        fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/following')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    following: responseJson,
                });
                if (this.state.following.length == 0) {
                    this.state.following = [{ given_name: "Not Following Anyone" }]
                }
                console.log(responseJson);

                // this.forceUpdate();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        if (this.state.usersProfile) {
            if (this.state.currentState == "Followers") {
                return (
                    <View>
                        <Button title="update" onPress={() => this.update()}></Button>
                        <Card>
                            <Image style={{ width: 100, height: 100, left: 125, borderRadius: 100 }} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.user.user_id + '/photo?timestamp=' + Date.now() }}>
                            </Image>
                            <Text style={{ fontSize: 20, left: 125 }}>{this.state.user.given_name + " " + this.state.user.family_name}</Text>
                            <Button
                                title="Edit"
                                onPress={() => this.props.navigation.navigate('ProfileEdit')}
                            />
                        </Card>
                        <Card>
                            <Button title="Followers" style={styles.button} onPress={this.setfollowersState}>

                            </Button>
                            <Button title="Following" style={styles.button} onPress={this.setfollowingState}>

                            </Button>
                            <Button title="Chits" style={styles.button} onPress={this.setChitsState}>

                            </Button>

                        </Card>
                        <Card containerStyle={{ padding: 0 }} >
                            {
                                this.state.followers.map((l, i) => {
                                    return (
                                        <ListItem
                                            key={i}
                                            leftAvatar={{ source: { uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + l.user_id + '/photo?timestamp=' + Date.now(), } }}
                                            title={l.given_name + " " + l.family_name}

                                            bottomDivider
                                        />
                                    );
                                })
                            }
                        </Card>


                    </View>
                );
            }
            else if (this.state.currentState == "Following") {
                return (
                    <View>
                        <Button title="update" onPress={() => this.update()}></Button>
                        <Card>
                            <Image style={{ width: 100, height: 100, left: 125, borderRadius: 100 }} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.user.user_id + '/photo?timestamp=' + Date.now() }}>
                            </Image>
                            <Text style={{ fontSize: 20, left: 125 }}>{this.state.user.given_name + " " + this.state.user.family_name}</Text>
                            <Button
                                title="Edit"
                                onPress={() => this.props.navigation.navigate('ProfileEdit')}
                            />
                        </Card>
                        <Card>
                            <Button title="Followers" style={styles.button} onPress={this.setfollowersState}>

                            </Button>
                            <Button title="Following" style={styles.button} onPress={this.setfollowingState}>

                            </Button>
                            <Button title="Chits" style={styles.button} onPress={this.setChitsState}>

                            </Button>

                        </Card>
                        <Card containerStyle={{ padding: 0 }} >
                            {
                                this.state.following.map((l, i) => {
                                    return (
                                        <ListItem
                                            key={i}
                                            leftAvatar={{ source: { uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + l.user_id + '/photo?timestamp=' + Date.now(), } }}
                                            title={l.given_name + " " + l.family_name}

                                            bottomDivider
                                        />
                                    );
                                })
                            }
                        </Card>

                    </View>
                );
            }
            else if (this.state.currentState == "Chits") {
                return (
                    <View>
                        <Button title="update" onPress={() => this.update()}></Button>
                        <Card>
                            <Image style={{ width: 100, height: 100, left: 125, borderRadius: 100 }} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.user.user_id + '/photo?timestamp=' + Date.now() }}>
                            </Image>
                            <Text style={{ fontSize: 20, left: 125 }}>{this.state.user.given_name + " " + this.state.user.family_name}</Text>
                            <Button
                                title="Edit"
                                onPress={() => this.props.navigation.navigate('ProfileEdit')}
                            />
                        </Card>
                        <Card>
                            <Button title="Followers" style={styles.button} onPress={this.setfollowersState}>

                            </Button>
                            <Button title="Following" style={styles.button} onPress={this.setfollowingState}>

                            </Button>
                            <Button title="Chits" style={styles.button} onPress={this.setChitsState}>

                            </Button>

                        </Card>
                        <Card containerStyle={{ padding: 0 }} >
                            {
                                this.state.chits.map((l, i) => {
                                    return (
                                        <ListItem
                                            key={i}
                                            leftAvatar={{ source: { uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.user.user_id + '/photo?timestamp=' + Date.now(), } }}
                                            title={this.state.user.given_name + " " + this.state.user.family_name}
                                            subtitle={l.chit_content}

                                        rightAvatar={{size:60,rounded:false,source: {uri: 'http://10.0.2.2:3333/api/v0.0.5/chits/' + l.chit_id + '/photo?timestamp=' + Date.now(), }}}
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
                        <Text>
                            hello
                        </Text>
                    </View>
                );
            }


        }
        else {
            if (this.state.isFollowing) {
                if (this.state.currentState == "Followers") {
                    return (
                        <View>
                            <Button title="update" onPress={() => this.update()}></Button>
                            <Card>
                                <Image style={{ width: 100, height: 100, left: 125, borderRadius: 100 }} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.user.user_id + '/photo?timestamp=' + Date.now() }}>
                                </Image>
                                <Text style={{ fontSize: 20, left: 125 }}>{this.state.user.given_name + " " + this.state.user.family_name}</Text>
                                <Button
                                    title="Unfollow"
                                    onPress={() => this.unfollowUser()}
                                />
                            </Card>
                            <Card>
                                <Button title="Followers" style={styles.button} onPress={this.setfollowersState}>

                                </Button>
                                <Button title="Following" style={styles.button} onPress={this.setfollowingState}>

                                </Button>
                                <Button title="Chits" style={styles.button} onPress={this.setChitsState}>

                                </Button>

                            </Card>
                            <Card containerStyle={{ padding: 0 }} >
                                {
                                    this.state.followers.map((l, i) => {
                                        return (
                                            <ListItem
                                                key={i}
                                                leftAvatar={{ source: { uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + l.user_id + '/photo?timestamp=' + Date.now(), } }}
                                                title={l.given_name + " " + l.family_name}

                                           bottomDivider
                                            />
                                        );
                                    })
                                }
                            </Card>


                        </View>
                    );
                }
                else if (this.state.currentState == "Following") {
                    return (
                        <View>
                            <Button title="update" onPress={() => this.update()}></Button>
                            <Card>
                                <Image style={{ width: 100, height: 100, left: 125, borderRadius: 100 }} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.user.user_id + '/photo?timestamp=' + Date.now() }}>
                                </Image>
                                <Text style={{ fontSize: 20, left: 125 }}>{this.state.user.given_name + " " + this.state.user.family_name}</Text>
                                <Button
                                    title="Unfollow"
                                    onPress={() => this.unfollowUser()}
                                />
                            </Card>
                            <Card>
                                <Button title="Followers" style={styles.button} onPress={this.setfollowersState}>

                                </Button>
                                <Button title="Following" style={styles.button} onPress={this.setfollowingState}>

                                </Button>
                                <Button title="Chits" style={styles.button} onPress={this.setChitsState}>

                                </Button>

                            </Card>
                            <Card containerStyle={{ padding: 0 }} >
                                {
                                    this.state.following.map((l, i) => {
                                        return (
                                            <ListItem
                                                key={i}
                                                leftAvatar={{ source: { uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + l.user_id + '/photo?timestamp=' + Date.now(), } }}
                                                title={l.given_name + " " + l.family_name}

                                                bottomDivider
                                            />
                                        );
                                    })
                                }
                            </Card>

                        </View>
                    );
                }
                else if (this.state.currentState == "Chits") {
                    return (
                        <View>
                            <Button title="update" onPress={() => this.update()}></Button>
                            <Card>
                                <Image style={{ width: 100, height: 100, left: 125, borderRadius: 100 }} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.user.user_id + '/photo?timestamp=' + Date.now() }}>
                                </Image>
                                <Text style={{ fontSize: 20, left: 125 }}>{this.state.user.given_name + " " + this.state.user.family_name}</Text>
                                <Button
                                    title="Unfollow"
                                    onPress={() => this.unfollowUser()}
                                />
                            </Card>
                            <Card>
                                <Button title="Followers" style={styles.button} onPress={this.setfollowersState}>

                                </Button>
                                <Button title="Following" style={styles.button} onPress={this.setfollowingState}>

                                </Button>
                                <Button title="Chits" style={styles.button} onPress={this.setChitsState}>

                                </Button>

                            </Card>
                            <Card containerStyle={{ padding: 0 }} >
                                {
                                    this.state.chits.map((l, i) => {
                                        return (
                                            <ListItem
                                                key={i}
                                                leftAvatar={{ source: { uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.user.user_id + '/photo?timestamp=' + Date.now(), } }}
                                                title={this.state.user.given_name + " " + this.state.user.family_name}
                                                subtitle={l.chit_content}

                                                rightAvatar={{size:60,rounded:false,source: {uri: 'http://10.0.2.2:3333/api/v0.0.5/chits/' + l.chit_id + '/photo?timestamp=' + Date.now(), }}}
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
                            <Text>
                                hello
                            </Text>
                        </View>
                    );
                }
            }
            else {
                if (this.state.currentState == "Followers") {
                    return (
                        <View>
                            <Button title="update" onPress={() => this.update()}></Button>
                            <Card>
                                <Image style={{ width: 100, height: 100, left: 125, borderRadius: 100 }} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.user.user_id + '/photo?timestamp=' + Date.now() }}>
                                </Image>
                                <Text style={{ fontSize: 20, left: 125 }}>{this.state.user.given_name + " " + this.state.user.family_name}</Text>
                                <Button
                                    title="Follow"
                                    onPress={() => this.followUser()}
                                />
                            </Card>
                            <Card>
                                <Button title="Followers" style={styles.button} onPress={this.setfollowersState}>

                                </Button>
                                <Button title="Following" style={styles.button} onPress={this.setfollowingState}>

                                </Button>
                                <Button title="Chits" style={styles.button} onPress={this.setChitsState}>

                                </Button>

                            </Card>
                            <Card containerStyle={{ padding: 0 }} >
                                {
                                    this.state.followers.map((l, i) => {
                                        return (
                                            <ListItem
                                                key={i}
                                                leftAvatar={{ source: { uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + l.user_id + '/photo?timestamp=' + Date.now(), } }}
                                                title={l.given_name + " " + l.family_name}

                                               bottomDivider
                                            />
                                        );
                                    })
                                }
                            </Card>


                        </View>
                    );
                }
                else if (this.state.currentState == "Following") {
                    return (
                        <View>
                            <Button title="update" onPress={() => this.update()}></Button>
                            <Card>
                                <Image style={{ width: 100, height: 100, left: 125, borderRadius: 100 }} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.user.user_id + '/photo?timestamp=' + Date.now() }}>
                                </Image>
                                <Text style={{ fontSize: 20, left: 125 }}>{this.state.user.given_name + " " + this.state.user.family_name}</Text>
                                <Button
                                    title="Follow"
                                    onPress={() => this.followUser()}
                                />
                            </Card>
                            <Card>
                                <Button title="Followers" style={styles.button} onPress={this.setfollowersState}>

                                </Button>
                                <Button title="Following" style={styles.button} onPress={this.setfollowingState}>

                                </Button>
                                <Button title="Chits" style={styles.button} onPress={this.setChitsState}>

                                </Button>

                            </Card>
                            <Card containerStyle={{ padding: 0 }} >
                                {
                                    this.state.following.map((l, i) => {
                                        return (
                                            <ListItem
                                                key={i}
                                                leftAvatar={{ source: { uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + l.user_id + '/photo?timestamp=' + Date.now(), } }}
                                                title={l.given_name + " " + l.family_name}

                                                bottomDivider
                                            />
                                        );
                                    })
                                }
                            </Card>

                        </View>
                    );
                }
                else if (this.state.currentState == "Chits") {
                    return (
                        <View>
                            <Button title="update" onPress={() => this.update()}></Button>
                            <Card>
                                <Image style={{ width: 100, height: 100, left: 125, borderRadius: 100 }} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.user.user_id + '/photo?timestamp=' + Date.now() }}>
                                </Image>
                                <Text style={{ fontSize: 20, left: 125 }}>{this.state.user.given_name + " " + this.state.user.family_name}</Text>
                                <Button
                                    title="Follow"
                                    onPress={() => this.followUser()}
                                />
                            </Card>
                            <Card>
                                <Button title="Followers" style={styles.button} onPress={this.setfollowersState}>

                                </Button>
                                <Button title="Following" style={styles.button} onPress={this.setfollowingState}>

                                </Button>
                                <Button title="Chits" style={styles.button} onPress={this.setChitsState}>

                                </Button>

                            </Card>
                            <Card containerStyle={{ padding: 0 }} >
                                {
                                    this.state.chits.map((l, i) => {
                                        return (
                                            <ListItem
                                                key={i}
                                                leftAvatar={{ source: { uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.user.user_id + '/photo?timestamp=' + Date.now(), } }}
                                                title={this.state.user.given_name + " " + this.state.user.family_name}
                                                subtitle={l.chit_content}

                                                rightAvatar={{size:60,rounded:false,source: {uri: 'http://10.0.2.2:3333/api/v0.0.5/chits/' + l.chit_id + '/photo?timestamp=' + Date.now(), }}}
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
                            <Text>
                                hello
                            </Text>
                        </View>
                    );
                }
            }


        }

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    countContainer: {
        alignItems: 'center',
        padding: 10
    },
    countText: {
        color: '#FF00FF'
    }
})
export default ProfileScreen;