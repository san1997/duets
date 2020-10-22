import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { SERVER } from "../../../../constConfig/config";
import facebookLogo from "../../../../assets/facebook.png";

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

  uploadDuet(){
    const images = this.props.route.params.images;
    const url = `${SERVER}/duets-upload`;
    let image1URL, image2URL;
    let randomString = Math.random().toString(36).slice(2);
    const metadata = { contentType: 'image/jpeg' };


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
        caption: 'Catchy caption here.'
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
    })
    .catch(err => {
      console.log('error', err);
    })


    // console.log('url', url);
    // fetch(url, options)
    // .then((response) => response.json())
    // .then(res => {
    //   console.log('this is resp', res);
    // })
    // .catch(err => {
    //   console.log('err', err);
    // })
  }

  render(){
    console.log('prosp', this.props);
    return (
      <TouchableOpacity
        style={{alignItems: 'center', top: '50%'}}
        onPress={() => {
          this.uploadDuet()
        }}>
        <Text style={{backgroundColor: 'pink'}}>UPLOAD DUET</Text>
      </TouchableOpacity>
    );
  }
}

export default DuetPreview;
