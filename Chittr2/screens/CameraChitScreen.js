import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
class profileEditScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        this.state = {
            photo:""

        }

    }
    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            this.setState({photo:data});
            this.picture();
        }
    }
    picture(){
        console.log(global.chitId+"this is the chits");
        return fetch("http://10.0.2.2:3333/api/v0.0.5/chits/"+global.chitId+"/photo",
            {
                method: 'POST',
                headers:{
                    // Accept:'application/json',
                    // 'Content-Type': 'application/json',
                    'X-Authorization': global.token,
                },
                body: this.state.photo
            })
            .then((response) => {
                console.log(response);
                if(response.ok){

                    this.props.navigation.navigate('Home');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style={styles.capture}
                    >
                        <Text style={{ fontSize: 16 }}>
                            CAPTURE
 </Text>
                    </TouchableOpacity>
                </View>
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