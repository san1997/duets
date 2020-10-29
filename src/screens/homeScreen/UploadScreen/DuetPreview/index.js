import React, {Component} from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { showMessage, hideMessage } from "react-native-flash-message";

import { DuetPreviewStyles } from './style';

import { SERVER } from "../../../../constConfig/config";
import colors from "../../../../constConfig/colors";
import { feedPageStyles } from "../../FeedScreen/style";
import Loading from "../../../../../components/Loading";

import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDsUQKD5-aYCRYxfe0UoIhsbDZNdPLtvjc",
  authDomain: "duets-app-a40c0.firebaseapp.com",
  databaseURL: "https://duets-app-a40c0.firebaseio.com",
  projectId: "duets-app-a40c0",
  storageBucket: "duets-app-a40c0.appspot.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var storage = firebase.storage();

class DuetPreview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
  uploadDuet(){
    const images = this.props.route.params.images;
    const url = `${SERVER}/duets-upload`;
    let image1URL, image2URL;
    let randomString = Math.random().toString(36).slice(2);
    const metadata = { contentType: 'image/jpeg' };

    this.setState({ loading: true});
    fetch(images[0].uri)
    .then(response => {
      return response.blob();
    })
    .then(blob => {
      var storageRef = storage.ref().child(`/images/${randomString}-1.jpg`);
      return storageRef.put(blob, metadata);
    })
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
      image1URL = url;
      return fetch(images[1].uri);
    })
    .then(response => response.blob())
    .then(blob => {
      var storageRef = storage.ref().child(`/images/${randomString}-2.jpg`);
      return storageRef.put(blob, metadata);
    })
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        image2URL = url;
    })
    .then(() => {
      const data = {
        uid: this.props.route.params.uid,
        image1: image1URL,
        image2: image2URL,
        caption: this.state.caption,
        userName: this.props.route.params.userDetails.userId,
        profilePic: this.props.route.params.userDetails.profilePicture
      }
      let options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        }
      };
      return fetch(url, options)
    })
    .then((response) => response.json())
    .then(data => {
      console.log('data', data);
      this.showAlertMessage('Upload Successful!', 'success');
    })
    .catch(err => {
      console.log('error', err);
      this.showAlertMessage('Failed to upload Duet! Please try again.', 'fail')
    })

  }

  showAlertMessage(message, flag) {
    let type;
    if (flag === 'success') {
      type = 'success';
      this.setState({loading: false}, () => {
        showMessage({
        message,
        type,
        duration: 3000
        });
        this.props.navigation.goBack();
      });
    } else if (flag === 'fail') {
      type = 'warning';
      this.setState({loading: false}, () => showMessage({
        message,
        type,
        duration: 3000
      }));
    }

  }

  headerline() {
    return (
      <View>
        <View style={DuetPreviewStyles.topline}>
          <TouchableOpacity style={DuetPreviewStyles.backButton} onPress={() => {this.props.navigation.goBack()}}>
            <Ionicons name="ios-arrow-round-back" size={50} color="black" />
          </TouchableOpacity>
          <View style={DuetPreviewStyles.heading}>
            <Text style={DuetPreviewStyles.fontHeading}>You are a step away </Text>
          </View>
          <TouchableOpacity style={DuetPreviewStyles.shareButton} onPress={() => {this.uploadDuet()}}>
            <Text style={DuetPreviewStyles.fontShare}>Share</Text>
          </TouchableOpacity>

        </View>
        <View
        style={DuetPreviewStyles.headline}
        />
      </View>
    );
  }

  addCaption() {
    return (
      <View style={{ flex: 3}}>
        <Image
          style={DuetPreviewStyles.profilePic}
          source={{uri: this.props.route.params.userDetails.profilePicture}}
        />
        <TextInput
          placeholder={"Add a caption.."}
          placeholderTextColor={colors.textLightColor}
          style={DuetPreviewStyles.captionbox}
          onChangeText={(inputText) => this.setState({caption: inputText})}
          multiline={true}
        />
        <View
        style={DuetPreviewStyles.captionline}
        />
      </View>
    )
  }

  showDuet() {
    const image1 = this.props.route.params.images[0].uri;
    const image2 = this.props.route.params.images[1].uri;
    return (
      <View style={DuetPreviewStyles.showDuet}>
      <View
        style={[feedPageStyles.flex_row, feedPageStyles.singleDuetContainer]}
      >
        <TouchableOpacity
          style={feedPageStyles.duetImageContainer}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: image1 }}
            style={feedPageStyles.duetLeftImageStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={feedPageStyles.duetImageContainer}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: image2 }}
            style={feedPageStyles.duetRightImageStyle}
          />
        </TouchableOpacity>
      </View>
      </View>
    );
  }

  renderDuetNumber(){
    const previousDuets = this.props.route.params.userDetails.duets.length;
    const number = previousDuets + 1;
    let superScript = 'th';
    if (number%10 === 1) {
      superScript = 'st';
    } else if (number%10 === 2) {
      superScript = 'nd';
    } else if (number%10 === 3) {
      superScript = 'rd';
    }
    return (
      <View style={DuetPreviewStyles.duetNumber}>
        <Text style={DuetPreviewStyles.duetNumberText}>{number}</Text>
        <Text style={DuetPreviewStyles.duetNumberTextSuper}>{superScript}</Text>
      </View>
    )
  }

  render(){
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <View style={{flex: 1}}>
      {this.headerline()}
      {this.addCaption()}
      {this.showDuet()}
      {this.renderDuetNumber()}
      </View>
    )
  }
}

export default DuetPreview;
