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
import Icon from "react-native-vector-icons/Feather";
import AntIcon from "react-native-vector-icons/AntDesign";

import strings from "../../../constConfig/strings";
import colors from "../../../constConfig/colors";
import images from "../../../constConfig/images";

import { feedPageStyles } from "./style.js";

class FeedScreen extends React.Component {
  constructor() {
    super();
    this.state = { data: [], page: 1, isLoading: false };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, this.getData);
  }

  getData = async () => {
    const url =
      "https://jsonplaceholder.typicode.com/photos?_limit=3&_page=" +
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

  feedMoreHandling = () => {
    this.setState({ page: this.state.page + 1, isLoading: true }, this.getData);
  };

  renderLoadMore = () => {
    return this.state.isLoading ? (
      <View style={feedPageStyles.renderLoadMoreStyle}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  renderDuet = ({ item }) => {
    return (
      <View style={feedPageStyles.singleDuetStyle}>
        <View
          style={[feedPageStyles.flex_row, feedPageStyles.singleDuetHeader]}
        >
          <View style={feedPageStyles.userThumbnailContainer}>
            <TouchableOpacity>
              <Image
                source={{ uri: item.url }}
                style={feedPageStyles.userThumbnail}
              />
            </TouchableOpacity>
          </View>

          <View style={feedPageStyles.userNameContainer}>
            <TouchableOpacity>
              <Text style={feedPageStyles.userNameStyle}>suyashrg</Text>
            </TouchableOpacity>
            <Text style={feedPageStyles.duetUploadTimeStyle}>10h</Text>
          </View>
          <View style={{ left: 205, top: 15 }}>
            <TouchableOpacity style={[feedPageStyles.singleDuetOptionIcon]}>
              <Icon name="more-horizontal" color={colors.black} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[feedPageStyles.flex_row, feedPageStyles.singleDuetContainer]}
        >
          <Image
            source={{ uri: item.url }}
            style={feedPageStyles.duetLeftImageStyle}
          />
          <Image
            source={{ uri: item.url }}
            style={feedPageStyles.duetRightImageStyle}
          />
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
          <TouchableOpacity>
            <Text style={feedPageStyles.userNameCommentStyle}>suyashrg</Text>
          </TouchableOpacity>
          <Text style={feedPageStyles.duetCommentTextStyle}>
            {item.id} {item.title}
          </Text>
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
        <View style={feedPageStyles.feedPageContainer}>
          <View style={[feedPageStyles.headerContainer]}>
            <View style={feedPageStyles.flex_row}>
              <View style={feedPageStyles.logoContainer}>
                <Image
                  style={feedPageStyles.loginLogo}
                  source={images.logoImage}
                />
              </View>
              <TouchableOpacity
                style={[feedPageStyles.sideDrawerIconContainer]}
              >
                <Icon name="menu" color={colors.black} size={30} />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            style={feedPageStyles.duetContainer}
            data={this.state.data}
            renderItem={this.renderDuet}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0}
            onEndReached={this.feedMoreHandling}
            ListFooterComponent={this.renderLoadMore}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default FeedScreen;
