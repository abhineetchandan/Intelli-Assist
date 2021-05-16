import React from 'react'
import {Button, View,Text,StyleSheet} from 'react-native'
import styles from './styles'
import store from '../store/store'
import { CHANGE_SHOW, removeUser } from '../store/actions';

export default class settings extends React.Component {
  render(){
    return (
      <View style={styles.mainView}>
        <Text style={styles.boldTexting}>Settings</Text>
        <Text style={{paddingBottom: 50}}>                 </Text>
        <Button title={'Edit preferences'} onPress={() => {
          store.dispatch({type: CHANGE_SHOW, payload: ''})
          this.props.navigation.navigate("FirstOpened")
        }}/>
        <Button title={'Log Out!'} onPress={() => {
		store.dispatch(removeUser({remove: true}))
          this.props.navigation.navigate('Opening Screen')
	}}/>
      </View>
    );
  }
}
