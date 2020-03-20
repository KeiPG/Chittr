// const list = [
//     {
//       name: 'Amy Farha',
//       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
//       subtitle: 'Vice President'
//     },
//     {
//       name: 'Chris Jackson',
//       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
//       subtitle: 'Vice Chairman'
//     }
//   ]
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native'
// import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'
class HomeScreen extends Component {


    render() {
        return (
            <View>
                {/* <Card
                    title='HELLO WORLD'
                    image={{ uri: 'https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s615/3_Beautiful-girl-with-a-gentle-smile.jpg' }}
                >
                    <Text style={{ marginBottom: 10 }}>
                        The idea with React Native Elements is more about component structure than actual design.
  </Text>
                    <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='VIEW NOW' />
                </Card>
                <Card containerStyle={{ padding: 0 }} >
                    {
                        list.map((l, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    leftAvatar={{ source: { uri: l.avatar_url } }}
                                    title={l.name}
                                    subtitle={l.subtitle}
                                    bottomDivider
                                />
                            );
                        })
                    }
                </Card> */}
            </View>
        );
    }
}
export default HomeScreen;