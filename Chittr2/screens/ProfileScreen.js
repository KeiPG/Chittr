import React, { Component } from 'react';
import { Text, View, Button, Image ,StyleSheet} from 'react-native';
import { Card , ListItem } from 'react-native-elements';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
class ProfileScreen extends Component {
    static navigationOptions = {
        header: null
    }
    
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            user: {},
            currentState: "Followers",
            following: [],
            followers: [],
            chits: [],
            isLoading: false

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
    componentDidMount() {
        if(global.profileId != ""){
            this.state.id = global.profileId;
            global.profileId = "";
        }
        else if(global.id != ""){
            this.state.id = global.id;
        }
        else{
            this.props.navigation.navigate('Login');
            
        }
        this.getUser(this.state.id);
        this.getFollowing(this.state.id);
        this.getFollowers(this.state.id);
    }
    update(){
        if(global.profileId != ""){
            this.state.id = global.profileId;
            global.profileId = "";
        }
        else if(global.id != ""){
            this.state.id = global.id;
        }
        else{
            this.props.navigation.navigate('Login');
            
        }
        this.getUser(this.state.id);
        this.getFollowing(this.state.id);
        this.getFollowers(this.state.id);
    }
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
                if (this.state.chits.length == 0){
                    this.state.chits =[{chit_content: "No Chits Posted"}]
                }
                console.log(responseJson);

                // this.forceUpdate();
            })
            .catch((error) => {
                console.log(error);
            });
    }
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
                if (this.state.followers.length == 0){
                    this.state.followers =[{given_name: "No Followers"}]
                }
                console.log(responseJson);

                this.forceUpdate();
            })
            .catch((error) => {
                console.log(error);
            });
    }
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
                if (this.state.following.length == 0){
                    this.state.following =[{given_name: "Not Following Anyone"}]
                }
                console.log(responseJson);

                // this.forceUpdate();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
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