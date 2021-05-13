import React, {Component}from 'react';
import {View, Button, Text, Switch } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import { updateTask, updateNote } from '../store/actions'
import { connect } from 'react-redux';
import store from '../store/store'
import appNotif from '../handleNotification/notification'

class addNote extends Component{

  constructor(props){
    super(props)
    this.state={
      id : this.props.route.params.id,
      name: this.props.route.params.name,
      changedName: this.props.route.params.name,
      body: this.props.route.params.body,
      language: this.props.language,
    }
  }

  componentDidMount(){
  }

  checkButton = () => {
    if (this.state.name === ''){
      return true;
    }
    else{
      return false;
    }
  }

  
  UpdatingNote = () => {
    store.dispatch(updateNote({
        id: this.state.id,
        name: this.state.changedName,
        body: this.state.body,
      })),
  this.props.navigation.navigate('Tab', {screen: 'My Notes'}) 
  }

  render(){
  return(
    <View style={styles.mainView}>
      <Text style={styles.boldTexting}>{`${this.state.name}`}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.myText}>Name: </Text>
        <TextInput style={styles.inputting} maxLength={50} placeholder={'Enter the name of your note'} 
        value={this.state.changedName} onChangeText={(text) => this.setState({changedName: text})}/>
      </View>
      <Text>                                        </Text>
      <Text>                                        </Text>
      <View style={{flexDirection: 'row'}}>
        <Text>Body: </Text>
	<TextInput value={this.state.body} multiline={true} placeholder={'Enter the message of the note.'} onChangeText={(text) => this.setState({body: text})} />
      </View>
      <Text>                                        </Text>
      <Button color={'black'} title={'GO BACK'} onPress={() => {this.props.navigation.goBack()} }/>
      <Text>                                        </Text>
      <Text>                                        </Text>
      <Button title={'SAVE CHANGES'} disabled={this.checkButton()} 
      onPress={() => {
        this.UpdatingNote()
        }}/>
    </View>
  );
}}

const mapStateToProps = state => ({
  language: state.user.language
})


export default connect(mapStateToProps)(addNote)
