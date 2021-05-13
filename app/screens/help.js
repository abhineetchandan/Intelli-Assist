import React from 'react'
import {View,Text} from 'react-native'
import styles from './styles'

export default class help extends React.Component{
  
  render(){
    return (
      <View style={styles.mainView}>
        <Text style={styles.boldTexting}>Help</Text>
        <Text>Welcome to the help section of </Text>
        <Text>the Reminder App. If you have queries</Text>
        <Text>or any doubts please read this</Text>
        <Text>section very carefully.</Text>
    </View>
  );
  }
}
