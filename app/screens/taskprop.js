import React, {Component}from 'react';
import {View, Button, Text, Switch } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import { updateTask } from '../store/actions'
import { connect } from 'react-redux';
import store from '../store/store'
import appNotif from '../handleNotification/notification'

Date.prototype.getCurrentTime = function(){
  return ((this.getHours() < 10)?"0":"") + ((this.getHours()>12)?(this.getHours()-12):this.getHours()) +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + ((this.getHours()>12)?(' PM'):' AM');
};

class TaskProp extends Component{

  constructor(props){
    super(props)
    this.state={
      id : this.props.route.params.id,
      name: this.props.route.params.name,
      changedName: this.props.route.params.name,
      Propdate: this.props.route.params.defaultDate,
      Proptime: this.props.route.params.time,
      isDaily: this.props.route.params.isDaily,
      date: new Date(this.props.route.params.defaultDate),
      mode: 'date',
      show: false,
      language: this.props.language,
      tdate: '',
      tmonth: '',
      tyear: '',
      ttime: '',
    }
  }

  componentDidMount(){
this.setState({
      tdate: this.state.date.getDate(),
      tmonth: this.state.date.getMonth()+1,
      tyear: this.state.date.getFullYear(),
      ttime: this.state.date.getCurrentTime(),
  })}

  onChange = (event, selectedDate) => {
    const changedDate = selectedDate || this.state.date
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
    });
    this.setState({date: changedDate})
    this.setState({tdate: changedDate.getDate()})
    this.setState({tmonth: changedDate.getMonth()+1})
    this.setState({tyear: changedDate.getFullYear()})
    this.setState({ttime: changedDate.getCurrentTime()})
    this.setState({show: false})
  };

  checkButton = () => {
    if (this.state.name === ''){
      return true;
    }
    else{
      return false;
    }
  }

  showMode = (currentMode) => {
    this.setState({show: true})
    this.setState({mode: currentMode})
  };
  
  UpdatingTask = () => {
    appNotif.scheduleNotification(this.state.count, this.state.date, this.state.name, this.state.isDaily);
    store.dispatch(updateTask({
        id: this.state.id,
        name: this.state.changedName,
        date: this.state.tdate+"/"+this.state.tmonth+"/"+this.state.tyear, 
        time: this.state.ttime,
        defaultDate: this.state.date,
        isDaily: this.state.isDaily,
      })),
  this.props.navigation.navigate('Tab', {screen: 'Home'}) 
  }

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
  };

  render(){
  return(
    <View style={styles.mainView}>
      <Text style={styles.boldTexting}>Change Properties</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.myText}>Name: </Text>
        <TextInput style={styles.inputting} maxLength={50} 
        value={this.state.changedName} onChangeText={(text) => this.setState({changedName: text})}/>
      </View>
      <Text style={styles.myText}>Date: {this.state.tdate+"/"+this.state.tmonth+"/"+this.state.tyear}</Text>
      
      <Text>                                        </Text>
      <Text>                                        </Text>
      <Button color={'purple'} onPress={this.showDatepicker} title={'Change Date!'}/>
      <Text style={styles.myText}>Time: {this.state.ttime}</Text>
      <Text>                                        </Text>
      <Text>                                        </Text>
      <Button color={'purple'} onPress={this.showTimepicker} title={'Change Time!'} />
      <Text>                                        </Text>
      <View style={{flexDirection: 'row'}}>
        <Text>Is Daily</Text>
        <Switch value={this.state.isDaily} onValueChange={() => this.setState({isDaily: !this.state.isDaily})}/>
      </View>
      <Text>                                        </Text>
      <Button color={'black'} title={'GO BACK!'} onPress={() => {this.props.navigation.goBack()} }/>
      {this.state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          mode={this.state.mode}
          is24Hour={true}
          display="default"
          onChange={this.onChange}
          minimumDate={Date.now()}
        />
      )}
      <Text>                                        </Text>
      <Text>                                        </Text>
      <Button title={'SAVE CHANGES'} disabled={this.checkButton()} 
      onPress={() => {
        this.UpdatingTask()
        }}/>
    </View>
  );
}}

const mapStateToProps = state => ({
  language: state.user.language
})


export default connect(mapStateToProps)(TaskProp)
