import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    mainView: {
      flex:1,
      paddingTop: 20 + 2.5,
      alignContent: 'center',
    },
    boldTexting:{
      fontSize: 25,
      fontWeight: 'bold',
      color: 'cyan',
      borderColor: 'black',
      borderWidth: 2,
      backgroundColor: 'black',
      opacity: 80,
      alignSelf: 'center',
      paddingTop: 5,
      paddingBottom: 10,
    },
    smalltexting:{
      fontSize: 26,
      fontWeight: 'normal',
      color: 'green',
      borderColor: 'red',
      borderWidth: 2,
      backgroundColor: 'black',
      opacity: 80,
      alignSelf: 'center',
    }, 
  myText: {
    fontSize: 20,
    fontWeight: '300',
    paddingBottom: 15,
    marginTop: 15,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 5,
    color: 'yellow',
    backgroundColor: 'black',
    opacity: 0.7,
  },
    
  inputting: {
    fontSize: 15,
    margin: 10,
    borderWidth: 3,
    borderColor: 'red',
    color: 'black',
    width: 270,
    paddingLeft: 5,
  },

  frontPageView: {
      flex:1,
      paddingTop: 20 + 2.5,
      alignContent: 'center',
      backgroundColor: 'crimson',
      justifyContent: 'center'
  },
  firstPageInput: {
    fontSize: 15,
    margin: 10,
    borderWidth: 3,
    paddingLeft: 10,
    borderColor: 'red',
    width: 270,
    color: 'white',
  },
})

export default styles;