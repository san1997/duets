import React from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";

import queryString from 'query-string';
import { SERVER } from "../../../../../../constConfig/config";

class AccountScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      duetId: null,
      uid: (this.props) ? this.props.route.params.uid: 0
    };
  }

  addDuetsField() {
    const queryObj = {
      userId: this.state.uid
    }
    const url = `${SERVER}/test?${queryString.stringify(queryObj)}` ;
    fetch(url)
    .then((response) => response.text())
    .then((res) => {
      this.setState({ duetId: res });
      console.log("Successfully created a duet field with ID: " + res)
    })
    .catch((error) => console.error(error))
  }

  render() {
    return (
    <TouchableOpacity    style={{backgroundColor: "gold", marginTop: 300, margin: 100, width: 200}}
              onPress={() => this.addDuetsField()}>
              <Text style={{padding:5}}> Account Screen </Text>
              <Text style={{padding:5}}> Click to create a duet field!</Text>
    </TouchableOpacity>
    );
  }
}
export default AccountScreen;
