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
import EntypoIcon from "react-native-vector-icons/Entypo";

import strings from "../../../constConfig/strings";
import colors from "../../../constConfig/colors";
import images from "../../../constConfig/images";

import { feedPageStyles } from "./style.js";

class FeedScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: [], page: 1, isLoading: false };
  }

  switchToFullImagePage(imgData, startFromBack) {
    this.props.navigation.navigate("FullDuetScreen", {
      imgDetails: imgData,
      startFromBack: startFromBack,
    });
  }

  componentDidMount() {
    this.setState({ isLoading: false }, this.getData);
  }

  scrollToTop = () => {
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
  };

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
          <TouchableOpacity
            style={feedPageStyles.duetImageContainer}
            activeOpacity={0.8}
            onPress={() =>
              this.switchToFullImagePage([item.url, item.url], false)
            }
          >
            <Image
              source={{ uri: item.url }}
              style={feedPageStyles.duetLeftImageStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={feedPageStyles.duetImageContainer}
            activeOpacity={0.8}
            onPress={() =>
              this.switchToFullImagePage([item.url, item.url], true)
            }
          >
            <Image
              source={{ uri: item.url }}
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
        {/* Duets Feed page header */}
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

          {/* Duets feed page loader */}
          <FlatList
            style={feedPageStyles.duetContainer}
            ref={(ref) => {
              this.flatListRef = ref;
            }}
            data={this.state.data}
            renderItem={this.renderDuet}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={2}
            onEndReached={this.feedMoreHandling}
            ListFooterComponent={this.renderLoadMore}
            // onRefresh={this.handleRefresh}
          />

          {/* Duets feed page footer */}
          <View style={[feedPageStyles.footerContainer]}>
            <View style={feedPageStyles.flex_row}>
              <View style={feedPageStyles.footerCameraContainer}>
                <TouchableOpacity style={[feedPageStyles.footerIconContainer]}>
                  <EntypoIcon name="camera" color={colors.black} size={30} />
                </TouchableOpacity>
              </View>
              <View style={feedPageStyles.footerHomeContainer}>
                <TouchableOpacity
                  style={[feedPageStyles.footerIconContainer]}
                  onPress={this.scrollToTop}
                >
                  <EntypoIcon name="home" color={colors.black} size={30} />
                </TouchableOpacity>
              </View>
              <View style={feedPageStyles.footerNotificationContainer}>
                <TouchableOpacity style={[feedPageStyles.footerIconContainer]}>
                  <EntypoIcon
                    name="notification"
                    color={colors.black}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              <View style={feedPageStyles.footerSearchContainer}>
                <TouchableOpacity style={[feedPageStyles.footerIconContainer]}>
                  <Icon name="search" color={colors.black} size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default FeedScreen;
