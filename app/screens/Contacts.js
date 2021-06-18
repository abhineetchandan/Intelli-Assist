import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Text } from "react-native";
import SearchBar from "../components/MaterialSearchBar";

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: this.props.friends,
    };
  }

  render() {
    return (
      <View style={{ paddingTop: 25 }}>
        <SearchBar />
        <Text>{this.state.friends}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  friends: state.user.friends,
});

export default connect(mapStateToProps)(Contacts);
