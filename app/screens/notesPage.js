import React from 'react'
import {Button, View,Text,StyleSheet, TouchableOpacity} from 'react-native'
import styles from './styles'
import store from '../store/store'
import { StatusBar } from 'expo-status-bar';
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { deleteNote } from '../store/actions'

class notes extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      notes: this.props.notes      
    }
  }
  
  NavigateToIndividualPage = item => {
    this.props.navigation.navigate("Add Note", {
      id: item.item.id,
      name: item.item.name,
      body: item.item.body,
    }, this.setState({selectedId: null})
    )
  }

  async componentDidMount(){
   this.setState({selectedId: null})
  }
  
  renderItem = item => {
    const backgroundColor = item.id === this.state.selectedId ? "#6e3b6e" : "#f9c2ff"
    return(
    <View style={[homeStyles.item, {backgroundColor: backgroundColor}, {paddingBottom: 10}]}>
      <TouchableOpacity onPress={() => {
        this.setState({selectedId: null}),
        this.NavigateToIndividualPage(item)
      }}>
        <Text style={[homeStyles.title, {fontWeight: 'bold', fontSize: 18}]}>{item.item.name}</Text>
        <Text style={homeStyles.title}>{item.item.body}</Text>
      </TouchableOpacity>
      <Button title='Delete This Note' onPress={() => {
	      store.dispatch(deleteNote({id : item.item.id}))
        }}/>
    </View>
  );
  };

  render(){
    return (
      <View style={styles.mainView}>
        <Text style={styles.boldTexting}>My Notes</Text>
        <Text>Total Notes: {this.props.notes.length}</Text>
        <FlatList
            data={this.props.notes}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id.toString()}
            extraData={this.props.notes}
          />
      <Button title={'Add Notes'} onPress={() => {this.setState({selectedId: null}),
          this.props.navigation.navigate("Add Note")}}/>
      </View>
    );
  }
}

const mapStatetoProps = state => ({
  notes: state.notes,
  id: state.notesId,
})

export default connect(mapStatetoProps)(notes)

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    paddingLeft: 10,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
});
