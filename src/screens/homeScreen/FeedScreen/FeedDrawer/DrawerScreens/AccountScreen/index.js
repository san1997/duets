// import React from "react";
// import { Text, Image, TouchableOpacity, View } from "react-native";

// import queryString from 'query-string';
// import { SERVER } from "../../../../../../constConfig/config";

// class AccountScreen extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       duetId: null,
//       uid: (this.props) ? this.props.route.params.uid: 0,
//       userDetails: this.props.route.params.userDetails
//     };
//   }

//   addDuetsField() {
//     const queryObj = {
//       userId: this.state.uid,
//       userName: this.state.userDetails.userId,
//       profilePicture: this.state.userDetails.profilePicture,
//     }
//     const url = `${SERVER}/test?${queryString.stringify(queryObj)}` ;
//     fetch(url)
//     .then((response) => response.text())
//     .then((res) => {
//       this.setState({ duetId: res });
//       console.log("Successfully created a duet field with ID: " + res)
//     })
//     .catch((error) => console.error(error))
//   }

//   render() {
//     return (
//     <TouchableOpacity    style={{backgroundColor: "gold", marginTop: 300, margin: 100, width: 200}}
//               onPress={() => this.addDuetsField()}>
//               <Text style={{padding:5}}> Account Screen </Text>
//               <Text style={{padding:5}}> Click to create a duet field!</Text>
//     </TouchableOpacity>
//     );
//   }
// }
// export default AccountScreen;

import React from "react";
import { StyleSheet, View } from "react-native";

import CacheImage from "../../../../../../constConfig/cacheImage";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CacheImage
          style={styles.image}
          uri="https://firebasestorage.googleapis.com/v0/b/duets-app-a40c0.appspot.com/o/logo%2FDuets-logo-02.png?alt=media&token=854cdad3-3578-4494-9758-c554ca386e7f"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 200,
    width: 200,
  },
});
