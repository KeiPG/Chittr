var list = [
]
import React, { Component } from 'react';
import { View, Text, Image, TextInput, Alert , PermissionsAndroid} from 'react-native'
// import { createStackNavigator } from 'react-navigation-stack';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'
import Geolocation from 'react-native-geolocation-service';
class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chits: {},
            chit: "",
            userChits: {},
            user: {},
            followingUsers: [],
            location1: null,
            locationPermission:false

        }

    }
    // componentDidUpdate(){
    //     this.getChits();
    // }
    componentDidMount() {
        this.getChits();
        this.findCoordinates();
    }
    // componentDidUpdate() {
    //     this.getChits();
    // }
    
    findCoordinates = () => {
        
        
           if(!this.state.locationPermission){
            this.state.locationPermission = requestLocationPermission();
            }
        Geolocation.getCurrentPosition(
            (position) => {
                const location = JSON.stringify(position);
                this.setState({ location1: position});
            },
            (error) => {
                Alert.alert(error.message)
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
            
        );
        async function requestLocationPermission(){
            try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
            title: 'Lab04 Location Permission',
            message:
            'This app requires access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
            },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can access location');
            return true;
            } else {
            console.log('Location permission denied');
            return false;
            }
            } catch (err) {
            console.warn(err);
            }
           }
    };
    getUser() {
        console.log("helloworld");
        fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + global.id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    user: responseJson,
                    userChits: responseJson.recent_chits
                });
                console.log(responseJson);

                // this.forceUpdate();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    getChits() {
        if (global.token != "") {
            this.getUser();
            console.log("we in");
            fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + global.id + "/following")
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        followingUsers: responseJson,
                    });
                    console.log(responseJson+"following");
                    if (this.state.followingUsers.length == 0 && this.state.userChits.length == 0) {
                        this.state.chits = [{ user: { given_name: "", family_name: "", user_id: '' }, chit_content: "No Chits Posted" }];
                        list = [];
                        console.log(this.state.chits+"following2");
                        this.state.chits.forEach(element => {
                            console.log(element);
                            list.push(
                                {
                                    name: element.user.given_name + " " + element.user.family_name,
                                    avatar_url: 'http://10.0.2.2:3333/api/v0.0.5/user/' + element.user.user_id + '/photo?timestamp=' + Date.now(),
                                    Image: 'http://10.0.2.2:3333/api/v0.0.5/chits/' + element.chit_id + '/photo?timestamp=' + Date.now(),
                                    data: element.chit_content,
                                    Location:{
                                        longitude:element.location.longitude,
                                        latitude:element.location.latitude

                                    }
                                })
                        });
                    }
                    else {
                        list = [];
                        console.log("adadasdasdas");
                        this.state.followingUsers.forEach(element => {
                            fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + element.user_id)
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    this.setState({
                                        isLoading: false,
                                        chits: responseJson,
                                    });
                                    console.log(responseJson + "following3");
                                    this.state.chits.recent_chits.forEach(element => {
                                        console.log(element.chit_id+"follow4");
                                        console.log(element+"follow5");
                                        if(element.location){
                                            list.push(
                                                {
                                                    name: this.state.chits.given_name + " " + this.state.chits.family_name,
                                                    avatar_url: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.chits.user_id + '/photo?timestamp=' + Date.now(),
                                                    Image: 'http://10.0.2.2:3333/api/v0.0.5/chits/' + element.chit_id + '/photo?timestamp=' + Date.now(),
                                                    data: element.chit_content,
                                                    Location:{
                                                        longitude:element.location.longitude,
                                                        latitude:element.location.latitude
                
                                                    }
                                                })
                                        }
                                        else{
                                            list.push(
                                                {
                                                    name: this.state.chits.given_name + " " + this.state.chits.family_name,
                                                    avatar_url: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.chits.user_id + '/photo?timestamp=' + Date.now(),
                                                    Image: 'http://10.0.2.2:3333/api/v0.0.5/chits/' + element.chit_id + '/photo?timestamp=' + Date.now(),
                                                    data: element.chit_content,
                                                    Location:{
                                                        longitude:"0",
                                                        latitude:"0"
                
                                                    }
                                                })
                                        }
                                        this.forceUpdate();
                                        
                                    });
                                })
                        });
                        console.log(this.state.user);
                        if (this.state.userChits) {
                            this.state.userChits.forEach(element => {
                                list.push(
                                    {
                                        name: this.state.user.given_name + " " + this.state.user.family_name,
                                        avatar_url: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.user.user_id + '/photo?timestamp=' + Date.now(),
                                        Image: 'http://10.0.2.2:3333/api/v0.0.5/chits/' + element.chit_id + '/photo?timestamp=' + Date.now(),
                                        data: element.chit_content,
                                        Location:{
                                            longitude:element.location.longitude,
                                            latitude:element.location.latitude
    
                                        }
                                    })
                            });
                        }

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
                                Image: 'http://10.0.2.2:3333/api/v0.0.5/chits/' + element.chit_id + '/photo?timestamp=' + Date.now(),
                                data: element.chit_content,
                                Location:{
                                    longitude:element.location.longitude,
                                    latitude:element.location.latitude

                                }
                            })
                    });
                    this.forceUpdate();
                })
                .catch((error) => {
                    console.log(error);
                });
                this.forceUpdate();
        }

    }
    PostChit() {
        if (this.state.chit.length >= 142) {
            Alert.alert(
                'Error',
                'Chit is too Long',
                [
                    { text: 'ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                ],
                { cancelable: true }
            )
        }
        else if (this.state.chit.length <= 0) {
            Alert.alert(
                'Error',
                'Chit is too Short',
                [
                    { text: 'ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                ],
                { cancelable: true }
            )
        }
        else {
            console.log("posting "+ this.state.location1.coords.longitude);
            return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'X-Authorization': global.token,
                    },
                    body: JSON.stringify({
                        chit_id: 0,
                        timestamp: Date.now(),
                        chit_content: this.state.chit,
                        location: {
                            longitude: this.state.location1.coords.longitude,
                            latitude: this.state.location1.coords.latitude
                        },
                        user: {
                            user_id: global.id,
                            given_name: "string",
                            family_name: "string",
                            email: "string"
                        }
                    })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson + "asdasd");
                    Alert.alert(
                        'Chit Photo',
                        'Do You Want To Add A Photo',
                        [
                            { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                            { text: 'Yes', onPress: () => this.addPhotoToChit(responseJson.chit_id) },
                        ],
                        { cancelable: true }
                    )
                    this.forceUpdate();
                    this.getChits();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
    addPhotoToChit(chit) {
        console.log(chit + "asdasdada");
        global.chitId = chit;
        this.props.navigation.navigate('ChitCamera');

    }
    showLocation(long,lat){
        Alert.alert(
            'Location',
            'Longitude='+long+' Latitude='+lat,
            [
                { text: 'ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: true }
        )
    }

    render() {
        if (global.token != "") {
            return (
                <View>
                    <Button title="update" onPress={() => this.getChits()}></Button>
                    <Button
                        title="Logout"
                        onPress={() => this.props.navigation.navigate('Logout')}
                    />
                    <Card>
                        <TextInput
                            placeholder="Chit Max 141 Character"
                            onChangeText={em => this.setState({ chit: em })}
                        >
                        </TextInput>
                        <Button title="Post" onPress={() => this.PostChit()}></Button>
                    </Card>
                    <Card containerStyle={{ padding: 0 }} >
                        {
                            list.map((l, i) => {
                                return (
                                    <ListItem
                                        key={i}
                                        leftAvatar={{ source: { uri: l.avatar_url } }}
                                        rightAvatar={{ size: 60, rounded: false, source: { uri: l.Image } }}
                                        title={l.name}
                                        subtitle={l.data}
                                        onPress={() => this.showLocation(l.Location.longitude,l.Location.latitude)}
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
                    <Button title="update" onPress={() => this.getChits()}></Button>
                    <Card containerStyle={{ padding: 0 }} >
                        {
                            list.map((l, i) => {
                                return (
                                    <ListItem
                                        key={i}
                                        leftAvatar={{ source: { uri: l.avatar_url } }}

                                        rightAvatar={{ size: 60, rounded: false, source: { uri: l.Image } }}
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