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
          uri="https://i.pinimg.com/474x/b7/a3/43/b7a3434f363c38d73611694b020a503e.jpg"
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
