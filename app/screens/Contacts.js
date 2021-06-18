import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Text } from "react-native";

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: this.props.friends,
    };
  }

  render() {
    return (
      <View>
        <Text>{this.state.friends}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  friends: state.user.friends,
});

export default connect(mapStateToProps)(Contacts);
