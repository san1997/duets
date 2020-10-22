import React from "react";
import fetch from "isomorphic-fetch";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import AntIcon from "react-native-vector-icons/AntDesign";

import strings from "../../../constConfig/strings";
import colors from "../../../constConfig/colors";

import { feedPageStyles } from "./style.js";

import { SERVER } from "../../../constConfig/config";

class FeedScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: [], page: 1, isLoading: false, uid: (this.props) ? this.props.route.params.uid: 0 };
  }

  switchToFullImagePage(imgData, startFromBack) {
    this.props.navigation.navigate("FullDuetScreen", {
      imgDetails: imgData,
      startFromBack: startFromBack,
    });
  }

  componentDidMount() {
    // this.setState({ isLoading: false }, this.getData);
    this.setState({ isLoading: false }, this.getDataFromFirebase);
  }

  // remove this once feed will be fully automated
  getData = async () => {
    const url =
      "https://jsonplaceholder.typicode.com/photos?_limit=5&_page=" +
      this.state.page;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: this.state.data.concat(responseJson),
          isLoading: false,
        });
      });
  };

  getDataFromFirebase = async () => {
    // const queryObj = {
    //   userId: this.state.uid
    // }
    const url = `${SERVER}/getDuets`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: this.state.data.concat(responseJson),
          isLoading: false,
        });
      });
  };

  feedMoreHandling = () => {
    // this.setState({ page: this.state.page + 1, isLoading: true }, this.getData);
    this.setState({ page: this.state.page + 1, isLoading: true }, this.getDataFromFirebase);
  };

  renderLoadMore = () => {
    return this.state.isLoading ? (
      <View style={feedPageStyles.renderLoadMoreStyle}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  renderCommentDiv = (item) => {
    return !item.comment ? null : (
      <Text style={feedPageStyles.duetCommentTextStyle}>
          <Text onPress={() => console.log('userName Pressed')} style={feedPageStyles.userNameCommentStyle}>{item.userName}</Text> {item.comment}
          </Text>
    )};

  renderDuet = ({ item }) => {
    return (
      <View style={feedPageStyles.singleDuetStyle}>
        <View
          style={[feedPageStyles.flex_row, feedPageStyles.singleDuetHeader]}
        >
          <View style={feedPageStyles.userThumbnailContainer}>
            <TouchableOpacity>
              <Image
                source={{ uri: (item.profilePicture ? item.profilePicture : "https://i.pinimg.com/474x/b7/a3/43/b7a3434f363c38d73611694b020a503e.jpg")}}
                style={feedPageStyles.userThumbnail}
              />
            </TouchableOpacity>
          </View>

          <View style={feedPageStyles.userNameContainer}>
            <TouchableOpacity>
                <Text style={feedPageStyles.userNameStyle}>{item.userName}</Text>
            </TouchableOpacity>
            <Text style={feedPageStyles.duetUploadTimeStyle}>10h</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row-reverse"}}>
            <TouchableOpacity style={[feedPageStyles.singleDuetOptionIcon]}>
              <Icon name="more-horizontal" color={colors.black} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[feedPageStyles.flex_row, feedPageStyles.singleDuetContainer]}
        >
          <TouchableOpacity
            style={feedPageStyles.duetImageContainer}
            activeOpacity={0.8}
            onPress={() =>
              this.switchToFullImagePage([item.first.imageLink, item.second.imageLink], false)
            }
          >
            <Image
              source={{ uri: item.first.imageLink }}
              style={feedPageStyles.duetLeftImageStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={feedPageStyles.duetImageContainer}
            activeOpacity={0.8}
            onPress={() =>
              this.switchToFullImagePage([item.second.imageLink, item.first.imageLink], true)
            }
          >
            <Image
              source={{ uri: item.second.imageLink }}
              style={feedPageStyles.duetRightImageStyle}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[feedPageStyles.flex_row, feedPageStyles.duetHeartsContainer]}
        >
          <View style={[feedPageStyles.flex_row, feedPageStyles.duetLeftHeart]}>
            <Text style={feedPageStyles.duetLeftHeartCounter}>1920</Text>
            <TouchableOpacity style={[feedPageStyles.duetLeftHeartButton]}>
              <AntIcon name="heart" size={25} />
            </TouchableOpacity>
          </View>
          <View
            style={[feedPageStyles.flex_row, feedPageStyles.duetRightHeart]}
          >
            <TouchableOpacity style={[feedPageStyles.duetRightHeartButton]}>
              <AntIcon name="hearto" size={25} />
            </TouchableOpacity>
            <Text style={feedPageStyles.duetRightHeartCounter}>396</Text>
          </View>
        </View>
        <View
          style={[feedPageStyles.flex_row, feedPageStyles.duetCommentContainer]}
        >
          {this.renderCommentDiv(item)}
        </View>
        <View>
          <View style={feedPageStyles.duetsDividerContainer}>
            <Text style={feedPageStyles.duetDividerTextStyle}>
              {strings.dividerLine}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={feedPageStyles.androidSafeArea}>
        {/* Duets Feed page header */}
        <View style={feedPageStyles.feedPageContainer}>
          {/* Duets feed page loader */}
          <FlatList
            style={feedPageStyles.duetContainer}
            ref={this.props.flatListRef}
            data={this.state.data}
            renderItem={this.renderDuet}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={2}
            onEndReached={this.feedMoreHandling}
            ListFooterComponent={this.renderLoadMore}
            // onRefresh={this.handleRefresh}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default function (props) {
  const ref = React.useRef(null);
  useScrollToTop(ref);
  return <FeedScreen {...props} flatListRef={ref} />;
}
