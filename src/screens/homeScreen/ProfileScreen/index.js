import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import AntIcon from "react-native-vector-icons/AntDesign";
import { Avatar, Title, Caption } from "react-native-paper";

import { SERVER } from "../../../constConfig/config.js";
import queryString from "query-string";

import colors from "../../../constConfig/colors";
import images from "../../../constConfig/images";
import strings from "../../../constConfig/strings";
import CacheImage from "../../../constConfig/cacheImage";

import { profilePageStyles } from "./style.js";

class ProfileScreen extends React.PureComponent {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      userDetails: this.props.route.params.userDetails,
      profile_uid: this.props.route.params.profile_uid,
      users_uid: this.props.route.params.users_uid,
      isUsersProfile: this.props.route.params.isUsersProfile,
      data: [{}],
      page: 1,
      limit: 10,
      isLoading: false,
    };
  }

  switchToEditProfileScreenHandler = () => {
    this.props.navigation.navigate("EditProfileScreen");
  };

  switchToFullImagePage(imgData, startFromBack) {
    this.props.navigation.navigate("FullDuetScreen", {
      imgDetails: imgData,
      startFromBack: startFromBack,
    });
  }

  componentDidMount() {
    // this.setState(this.setUploadAsFirstData);
    this._isMounted = true;
    this.setState({ isLoading: true }, this.getDataFromFirebase);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getDataFromFirebase = async () => {
    const queryObj = {
      userId: this.state.profile_uid,
      page: this.state.page,
      limit: this.state.limit,
    };
    /* we can separate likes number and likers, we are getting likers in this call unnecessarily */
    const url = `${SERVER}/getDuets?${queryString.stringify(queryObj)}`;
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
    this.setState(
      { page: this.state.page + 1, isLoading: true },
      this.getDataFromFirebase
    );
  };

  renderLoadMore = () => {
    return this.state.isLoading ? (
      <View style={profilePageStyles.renderLoadMoreStyle}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  renderCommentDiv = (item) => {
    return !item.caption ? null : (
      <Text style={profilePageStyles.duetCommentTextStyle}>
        <Text
          onPress={() => console.log("userName Pressed")}
          style={profilePageStyles.userNameCommentStyle}
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

  renderDuet = ({ item, index }) => {
    return index == 0 ? (
      <View style={profilePageStyles.uploadContainer}>
        <View style={profilePageStyles.uploadTextContainer}>
          <Text style={profilePageStyles.uploadText}>Uploads</Text>
          <Text style={profilePageStyles.duetDividerTextStyle}>
            {strings.dividerLine}
          </Text>
        </View>
      </View>
    ) : (
      <View style={profilePageStyles.singleDuetStyle}>
        <View
          style={[
            profilePageStyles.flex_row,
            profilePageStyles.singleDuetHeader,
          ]}
        >
          <View style={profilePageStyles.userThumbnailContainer}>
            <TouchableOpacity>
              <Image
                source={{
                  uri: item.profilePicture
                    ? item.profilePicture
                    : "https://i.pinimg.com/474x/b7/a3/43/b7a3434f363c38d73611694b020a503e.jpg",
                }}
                style={profilePageStyles.userThumbnail}
              />
            </TouchableOpacity>
          </View>

          <View style={profilePageStyles.userNameContainer}>
            <TouchableOpacity>
              <Text style={profilePageStyles.userNameStyle}>
                {item.userName}
              </Text>
            </TouchableOpacity>
            <Text style={profilePageStyles.duetUploadTimeStyle}>10h</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row-reverse" }}>
            <TouchableOpacity style={[profilePageStyles.singleDuetOptionIcon]}>
              <Icon name="more-horizontal" color={colors.black} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            profilePageStyles.flex_row,
            profilePageStyles.singleDuetContainer,
          ]}
        >
          <TouchableOpacity
            style={profilePageStyles.duetImageContainer}
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
              style={profilePageStyles.duetLeftImageStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={profilePageStyles.duetImageContainer}
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
              style={profilePageStyles.duetRightImageStyle}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            profilePageStyles.flex_row,
            profilePageStyles.duetHeartsContainer,
          ]}
        >
          <View
            style={[
              profilePageStyles.flex_row,
              profilePageStyles.duetLeftHeart,
            ]}
          >
            <Text style={profilePageStyles.duetLeftHeartCounter}>
              {item.firstLikesSize}
            </Text>
            <TouchableOpacity
              style={[profilePageStyles.duetLeftHeartButton]}
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
            style={[
              profilePageStyles.flex_row,
              profilePageStyles.duetRightHeart,
            ]}
          >
            <TouchableOpacity
              style={[profilePageStyles.duetRightHeartButton]}
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
            <Text style={profilePageStyles.duetRightHeartCounter}>
              {item.secondLikesSize}
            </Text>
          </View>
        </View>
        <View
          style={[
            profilePageStyles.flex_row,
            profilePageStyles.duetCommentContainer,
          ]}
        >
          {this.renderCommentDiv(item)}
        </View>
        <View>
          <View style={profilePageStyles.duetsDividerContainer}>
            <Text style={profilePageStyles.duetDividerTextStyle}>
              {strings.dividerLine}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View style={profilePageStyles.profilePageContainer}>
        <View style={profilePageStyles.userInfoSection}>
          <View style={profilePageStyles.userProfilePic}>
            <Avatar.Image
              source={{
                uri: this.state.userDetails.profilePicture
                  ? this.state.userDetails.profilePicture
                  : "https://i.pinimg.com/474x/b7/a3/43/b7a3434f363c38d73611694b020a503e.jpg",
              }}
              size={Dimensions.get("window").height / 9}
            />
            {this.state.isUsersProfile ? (
              <TouchableOpacity
                style={[profilePageStyles.editProfileIconContainer]}
                onPress={this.switchToEditProfileScreenHandler}
              >
                <Icon name="edit" color={colors.black} size={15} />
              </TouchableOpacity>
            ) : (
              {}
            )}
            {/* <TouchableOpacity
          style={[profilePageStyles.editProfileIconContainer]}
          onPress={this.switchToEditProfileScreenHandler}
        >
          <Icon name="edit" color={colors.black} size={15} />
        </TouchableOpacity> */}
          </View>
          <View style={profilePageStyles.profileUserNameContainer}>
            <Title style={profilePageStyles.title}>
              {this.state.userDetails.firstName
                ? this.state.userDetails.firstName + " "
                : "Happy Dueter "}

              {this.state.userDetails.lastName
                ? this.state.userDetails.lastName
                : ""}
            </Title>
            <View style={profilePageStyles.captionContainer}>
              <Caption style={profilePageStyles.caption}>
                {this.state.userDetails.userId
                  ? "@" + this.state.userDetails.userId
                  : ""}
              </Caption>
            </View>
            <View style={profilePageStyles.userBio}>
              <Text>19 yr old Fashion Blogger</Text>
              <Text>Stream Young and Free ❤️</Text>
            </View>
          </View>
        </View>
        <View style={profilePageStyles.infoBoxWrapperContainer}>
          <View style={profilePageStyles.infoBoxWrapper}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
              <View style={profilePageStyles.infoBox}>
                <Title style={profilePageStyles.infoBoxNumbers}>
                  {this.state.userDetails.duets.length}
                </Title>
                <Caption style={{ marginTop: -2 }}>Posts</Caption>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
              <View style={profilePageStyles.infoBox}>
                <Title style={profilePageStyles.infoBoxNumbers}>
                  {this.state.userDetails.follower.length}
                </Title>
                <Caption style={{ marginTop: -2 }}>Followers</Caption>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
              <View style={profilePageStyles.infoBox}>
                <Title style={profilePageStyles.infoBoxNumbers}>
                  {this.state.userDetails.following.length}
                </Title>
                <Caption style={{ marginTop: -2 }}>Following</Caption>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={profilePageStyles.androidSafeArea}>
        <View style={profilePageStyles.profilePageContainer}>
          <View style={profilePageStyles.duetsContainer}>
            <FlatList
              style={profilePageStyles.duetContainer}
              // ref={this.props.flatListRef}
              data={this.state.data}
              // extraData={this.state.refresh}
              renderItem={this.renderDuet}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={2}
              onEndReached={this.feedMoreHandling}
              ListFooterComponent={this.renderLoadMore}
              /* we can automate refresh icons using RefreshControl 
            Refer - https://medium.com/enappd/refreshcontrol-pull-to-refresh-in-react-native-apps-dfe779118f75 */
              // refreshControl={
              //   <RefreshControl
              //     refreshing={this.state.isRefreshing}
              //     onRefresh={this.onPullRefresh}
              //   />
              // }
              ListHeaderComponent={this.renderHeader}
              stickyHeaderIndices={[1]}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default ProfileScreen;
