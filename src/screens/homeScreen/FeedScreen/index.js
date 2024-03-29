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
  RefreshControl,
} from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import AntIcon from "react-native-vector-icons/AntDesign";

import strings from "../../../constConfig/strings";
import colors from "../../../constConfig/colors";
import CacheImage from "../../../constConfig/cacheImage";

import { feedPageStyles } from "./style.js";
import PopupMenu from "../../../../components/dropdownOptions";

import { SERVER } from "../../../constConfig/config";
import queryString from "query-string";

const refresh = 1;

class FeedScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      limit: 10,
      isLoading: false,
      uid: this.props ? this.props.route.params.uid : 0,
      refresh: !refresh,
      isRefreshing: false,
      icon: null,
    };
  }

  switchToFullImagePage(imgData, startFromBack) {
    this.props.navigation.navigate("FullDuetScreen", {
      imgDetails: imgData,
      startFromBack: startFromBack,
    });
  }

  switchToProfileFeedStacks(user_uid, profile_uid) {
    this.props.navigation.navigate("ProfileScreen", {
      navigationFromFeed: true,
      profile_uid: profile_uid ? profile_uid : user_uid, // change it to only profile_uid after once each duet has user_id
      users_uid: user_uid,
      isUsersProfile: profile_uid == user_uid,
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

  onPullRefresh = () => {
    this.setState({ isRefreshing: true, page: 1 }, () => {
      this.getDataFromFirebase(true);
    });
  };

  getDataFromFirebase = async (isPull) => {
    const queryObj = {
      userId: this.state.uid,
      page: this.state.page,
      limit: this.state.limit,
    };
    /* we can separate likes number and likers, we are getting likers in this call unnecessarily */
    const url = `${SERVER}/getDuets?${queryString.stringify(queryObj)}`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        var tempData = [];
        this.setState({
          data: isPull
            ? tempData.concat(responseJson)
            : this.state.data.concat(responseJson),
          isLoading: false,
          isRefreshing: false,
        });
      });
  };

  feedMoreHandling = () => {
    // this.setState({ page: this.state.page + 1, isLoading: true }, this.getData);
    this.setState(
      { page: this.state.page + 1, isLoading: true },
      this.getDataFromFirebase
    );
  };

  renderLoadMore = () => {
    return this.state.isLoading ? (
      <View style={feedPageStyles.renderLoadMoreStyle}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  renderCommentDiv = (item) => {
    return !item.caption ? null : (
      <Text style={feedPageStyles.duetCommentTextStyle}>
        <Text
          onPress={() => console.log("userName Pressed")}
          style={feedPageStyles.userNameCommentStyle}
        >
          {item.userName}
        </Text>{" "}
        {item.caption}
      </Text>
    );
  };

  likeClick(user, clickedImg, currentClick, duetId, item, index) {
    if (clickedImg == currentClick) {
      item.clickedDuet = 0;
      if (clickedImg == 1) item.firstLikesSize = item.firstLikesSize - 1;
      else if (clickedImg == 2) item.secondLikesSize = item.secondLikesSize - 1;
    } else {
      // incrementing the new click count
      item.clickedDuet = currentClick;
      if (currentClick == 1) item.firstLikesSize = item.firstLikesSize + 1;
      else if (currentClick == 2)
        item.secondLikesSize = item.secondLikesSize + 1;

      // decrementing the already clicked count
      if (clickedImg == 1) item.firstLikesSize = item.firstLikesSize - 1;
      else if (clickedImg == 2) item.secondLikesSize = item.secondLikesSize - 1;
    }
    this.state.data[index] = item;
    this.setState({
      data: this.state.data,
      refresh: !this.state.refresh,
    });

    const queryObj = {
      userId: user,
      clickedImg: clickedImg,
      currentClick: currentClick,
      duetId: duetId,
    };
    const url = `${SERVER}/isDuetClicked?${queryString.stringify(queryObj)}`;
    fetch(url)
      .then((response) => response.text())
      .then((res) => {
        // do nothing, it just a success response
      })
      .catch((error) => console.error(error));
  }

  removeDuet(item) {
    const url = `${SERVER}/duets-delete`;
    const data = {
      id: item.duetId,
      uid: item.userId,
    };
    const options = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((res) => {
        // do nothing, it just a success response
      })
      .catch((error) => console.error(error));
  }

  onPopupEvent = (eventName, index, item) => {
    if (eventName !== "itemSelected") return;
    if (index === 0) {
      // Removing duet
      item.deleted = true;
      this.removeDuet(item);
    }
  };

  renderDuet = ({ item, index }) => {
    let moreActions = [];
    console.log("aaaa", item.userId, this.state.uid);
    if (item.userId === this.state.uid) {
      moreActions.push("Remove");
    }
    if (item.deleted) {
      return null;
    }
    return (
      <View style={feedPageStyles.singleDuetStyle}>
        <View
          style={[feedPageStyles.flex_row, feedPageStyles.singleDuetHeader]}
        >
          <View style={feedPageStyles.userThumbnailContainer}>
            <TouchableOpacity>
              <Image
                source={{
                  uri: item.profilePicture
                    ? item.profilePicture
                    : "https://firebasestorage.googleapis.com/v0/b/duets-app-a40c0.appspot.com/o/logo%2FDuets-logo-02.png?alt=media&token=854cdad3-3578-4494-9758-c554ca386e7f",
                }}
                style={feedPageStyles.userThumbnail}
              />
            </TouchableOpacity>
          </View>

          <View style={feedPageStyles.userNameContainer}>
            <TouchableOpacity
              onPress={() =>
                this.switchToProfileFeedStacks(this.state.uid, item.userId)
              }
            >
              <Text style={feedPageStyles.userNameStyle}>{item.userName}</Text>
            </TouchableOpacity>
            <Text style={feedPageStyles.duetUploadTimeStyle}>
              {item.uploadTime}
            </Text>
          </View>
          {false && (
            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
              <PopupMenu
                actions={moreActions}
                onPress={(a, b) => this.onPopupEvent(a, b, item)}
              />
            </View>
          )}
        </View>
        <View
          style={[feedPageStyles.flex_row, feedPageStyles.singleDuetContainer]}
        >
          <TouchableOpacity
            style={feedPageStyles.duetImageContainer}
            activeOpacity={0.8}
            onPress={() =>
              this.switchToFullImagePage(
                [item.first.imageLink, item.second.imageLink],
                false
              )
            }
          >
            <CacheImage
              uri={item.first.imageLink}
              key={item.first.imageLink}
              // key change will help in pull refresh, don't remove it. https://stackoverflow.com/a/41618950
              style={feedPageStyles.duetLeftImageStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={feedPageStyles.duetImageContainer}
            activeOpacity={0.8}
            onPress={() =>
              this.switchToFullImagePage(
                [item.second.imageLink, item.first.imageLink],
                true
              )
            }
          >
            <CacheImage
              uri={item.second.imageLink}
              key={item.second.imageLink}
              // key change will help in pull refresh, don't remove it. https://stackoverflow.com/a/41618950
              style={feedPageStyles.duetRightImageStyle}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[feedPageStyles.flex_row, feedPageStyles.duetHeartsContainer]}
        >
          <View style={[feedPageStyles.flex_row, feedPageStyles.duetLeftHeart]}>
            <Text style={feedPageStyles.duetLeftHeartCounter}>
              {item.firstLikesSize}
            </Text>
            <TouchableOpacity
              style={[feedPageStyles.duetLeftHeartButton]}
              onPress={() =>
                this.likeClick(
                  this.state.uid,
                  item.clickedDuet,
                  1,
                  item.duetId,
                  item,
                  index
                )
              }
            >
              {item.clickedDuet == 1 ? (
                <AntIcon name="heart" size={25} />
              ) : (
                <AntIcon name="hearto" size={25} />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={[feedPageStyles.flex_row, feedPageStyles.duetRightHeart]}
          >
            <TouchableOpacity
              style={[feedPageStyles.duetRightHeartButton]}
              onPress={() =>
                this.likeClick(
                  this.state.uid,
                  item.clickedDuet,
                  2,
                  item.duetId,
                  item,
                  index
                )
              }
            >
              {item.clickedDuet == 2 ? (
                <AntIcon name="heart" size={25} />
              ) : (
                <AntIcon name="hearto" size={25} />
              )}
            </TouchableOpacity>
            <Text style={feedPageStyles.duetRightHeartCounter}>
              {item.secondLikesSize}
            </Text>
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
            extraData={this.state.refresh}
            renderItem={this.renderDuet}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={2}
            onEndReached={this.feedMoreHandling}
            ListFooterComponent={this.renderLoadMore}
            /* we can automate refresh icons using RefreshControl
            Refer - https://medium.com/enappd/refreshcontrol-pull-to-refresh-in-react-native-apps-dfe779118f75 */
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onPullRefresh}
              />
            }
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
