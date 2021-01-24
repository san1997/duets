import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
  Alert
} from "react-native";
import { AppLoading } from "expo";
import { useScrollToTop } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import AntIcon from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { Avatar, Title, Caption } from "react-native-paper";

import { SERVER } from "../../../constConfig/config.js";
import queryString from "query-string";

import colors from "../../../constConfig/colors";
import images from "../../../constConfig/images";
import strings from "../../../constConfig/strings";
import CacheImage from "../../../constConfig/cacheImage";

import { profilePageStyles } from "./style.js";

const refresh = 1;

class ProfileScreen extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      userDetails: null,
      profile_uid: this.props.route.params.profile_uid,
      users_uid: this.props.route.params.users_uid,
      isUsersProfile: this.props.route.params.isUsersProfile,
      data: [{}],
      page: 1,
      limit: 4,
      refresh: !refresh,
      isRefreshing: false,
      isLoading: true,
      isUserDataLoading: true,
      initialFollowState: false,
      followBackgroundColor: null,
      currentPos: 0
    };
  }

  backAction = () => {
    // Alert.alert("Hold on!", "Are you sure you want to go back?", [
    //   {
    //     text: "Cancel",
    //     onPress: () => null,
    //     style: "cancel"
    //   },
    //   { text: "YES", onPress: () => BackHandler.exitApp() }
    // ]);
    if(this.state.currentPos === 0) {
      return;
    }
    this.myRef.current.scrollToOffset({x: 0, y: 0, animated: true})
    this.setState({currentPos: 0});
    return true;
  };

  _handleScroll = (event) =>{
    this.setState({currentPos: event.nativeEvent.contentOffset.y})
  }

  switchToEditProfileScreenHandler = () => {
    this.props.navigation.navigate("EditProfileScreen", {
      userDetails: this.state.userDetails,
      profile_uid: this.state.profile_uid,
      updateUserDetails: this.updateUserDetails,
    });
  };

  switchToFullImagePage(imgData, startFromBack) {
    this.props.navigation.navigate("FullDuetScreen", {
      imgDetails: imgData,
      startFromBack: startFromBack,
    });
  }

  componentDidMount() {
    // this.setState(this.setUploadAsFirstData);
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
    if(this.props.route.params.navigationFromFeed){
      this.props.route.params.swiperStateChange(false);
    }
    this._isMounted = true;
    this.setState({ isUserDataLoading: true }, this.fetchUserDetails);
    this.getInitialFollowState();
    this.setState({ isLoading: true }, this.getDataFromFirebase);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    this._isMounted = false;
    if(this.props.route.params.navigationFromFeed){
      this.props.route.params.swiperStateChange(true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.route.params.navigationFromFeed){
      this.props.route.params.swiperStateChange(false);
    }
    if((prevState.profile_uid !== this.props.route.params.profile_uid) || (prevState.users_uid !== this.props.route.params.users_uid) || (prevState.isUsersProfile !== this.props.route.params.isUsersProfile)){
      this.setState({profile_uid: this.props.route.params.profile_uid,
        users_uid: this.props.route.params.users_uid,
        isUsersProfile: this.props.route.params.isUsersProfile,
        data: [{}],
        page: 1,
        limit: 3,
        refresh: !refresh,
        isRefreshing: false,
        isLoading: true,
        isUserDataLoading: true,
        initialFollowState: false,
        followBackgroundColor: null});
      this.setState({ isUserDataLoading: true }, this.fetchUserDetails);
      this.getInitialFollowState();
      this.setState({ isLoading: true }, this.getDataFromFirebase);
    } 
  }

  onPullRefresh = () => {
    this.setState({ isRefreshing: true, page: 1 }, () => {
      this.getDataFromFirebase(true);
      this.getLatestDuets();
    });
  };

  updateUserDetails = (profile_uid, props, CommonActions) => {
    this.setState({ isUserDataLoading: true });
    const queryObj = {
      userId: profile_uid,
    };
    const url = `${SERVER}/user-details?${queryString.stringify(queryObj)}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ userDetails: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState(
          { isUserDataLoading: false },
          props.navigation.dispatch(CommonActions.goBack())
        );
      });
  };

  getLatestDuets = () => {
    const queryObj = {
      userId: this.state.profile_uid,
    };
    const url = `${SERVER}/getUpdatedDuets?${queryString.stringify(queryObj)}`;
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        this.state.userDetails.duets = res;
        this.setState({ userDetails: this.state.userDetails });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState(
          { isUserDataLoading: false }
        );
      });
  }

  fetchUserDetails() {
    const queryObj = {
      userId: this.state.profile_uid,
    };
    const url = `${SERVER}/user-details?${queryString.stringify(queryObj)}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ userDetails: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isUserDataLoading: false });
      });
  }

  getInitialFollowState = () => {
    const queryObj = {
      userId: this.state.users_uid,
      profileId: this.state.profile_uid,
      getInitialState: 0,
      followClick: 0,
    };
    const url = `${SERVER}/followHandler?${queryString.stringify(queryObj)}`;
    fetch(url)
      .then((response) => response.text())
      .then((res) => {
        if (res == "1") {
          this.setState({
            initialFollowState: true,
            followBackgroundColor: colors.followButtonColor,
          });
        } else {
          this.setState({
            initialFollowState: false,
            followBackgroundColor: colors.followingButtonColor,
          });
        }
      })
      .catch((error) => console.error(error));
  };

  followButtonClickHandler = () => {
    const queryObj = {
      userId: this.state.users_uid,
      profileId: this.state.profile_uid,
      getInitialState: this.state.initialFollowState ? 1 : 0,
      followClick: 1,
    };
    const url = `${SERVER}/followHandler?${queryString.stringify(queryObj)}`;
    fetch(url)
      .then((response) => response.text())
      .then((res) => {
        if (this.state.initialFollowState) {
          const idx = this.state.userDetails.follower.indexOf(
            this.state.users_uid
          );
          this.state.userDetails.follower.splice(idx, 1);
          this.setState({
            userDetails: this.state.userDetails,
            initialFollowState: !this.state.initialFollowState,
            followBackgroundColor: colors.followingButtonColor,
          });
        } else {
          this.state.userDetails.follower.push(this.state.users_uid);
          this.setState({
            userDetails: this.state.userDetails,
            initialFollowState: !this.state.initialFollowState,
            followBackgroundColor: colors.followButtonColor,
          });
        }
      })
      .catch((error) => console.error(error));
  };

  getDataFromFirebase = async (isPull) => {
    const queryObj = {
      userId: this.state.profile_uid,
      page: this.state.page,
      limit: this.state.limit,
    };
    /* we can separate likes number and likers, we are getting likers in this call unnecessarily */
    const url = `${SERVER}/getUserDuets?${queryString.stringify(queryObj)}`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        var tempData = [{}];
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
          {this.state.userDetails.userId}
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
                {this.state.userDetails.userId}
              </Text>
            </TouchableOpacity>
            <Text style={profilePageStyles.duetUploadTimeStyle}>{item.uploadTime}</Text>
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
                  this.state.profile_uid,
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
                  this.state.profile_uid,
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
      <View style={profilePageStyles.profilePageHeaderContainer}>
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
            {(this.state.isUsersProfile && !this.props.route.params.navigationFromFeed) ? (
              <TouchableOpacity
                style={[profilePageStyles.editProfileIconContainer]}
                onPress={this.switchToEditProfileScreenHandler}
              >
                <Icon name="edit" color={colors.black} size={15} />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={profilePageStyles.profileUserNameContainer}>
            <View style={profilePageStyles.NameContainer}>
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
            </View>
            <View style={profilePageStyles.FollowContainer}>
              {!this.state.isUsersProfile ? (
                <TouchableOpacity
                  style={[
                    profilePageStyles.followButtonContainer,
                    { backgroundColor: this.state.followBackgroundColor },
                  ]}
                  onPress={() => this.followButtonClickHandler()}
                >
                  {this.state.initialFollowState ? (
                    <Text style={profilePageStyles.followingButtonTextStyle}>
                      {strings.following}
                    </Text>
                  ) : (
                    <Text style={profilePageStyles.followButtonTextStyle}>
                      {strings.follow}
                    </Text>
                  )}
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={profilePageStyles.userBio}>
              {this.state.userDetails.bio ? (
                <Text style={profilePageStyles.bioTextStyle}>
                  {this.state.userDetails.bio}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
        <View style={profilePageStyles.infoBoxWrapperContainer}>
          <View style={profilePageStyles.infoBoxWrapper}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.flatListRef.scrollToIndex({ index: 0 })}
            >
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
    if (this.state.isUserDataLoading) {
      return <AppLoading />;
    }
    return (
      <SafeAreaView style={profilePageStyles.androidSafeArea}>
        <View style={profilePageStyles.profilePageContainer}>
          <View style={profilePageStyles.duetsContainer}>
            <FlatList
              style={profilePageStyles.duetContainer}
              onScroll={this._handleScroll}   
              ref={this.myRef}
              // ref={(ref) => {
              //   this.flatListRef = ref;
              // }}
              data={this.state.data}
              extraData={this.state.refresh}
              renderItem={this.renderDuet}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={2}
              onEndReached={this.feedMoreHandling}
              ListFooterComponent={this.renderLoadMore}
              ListHeaderComponent={this.renderHeader}
              stickyHeaderIndices={[1]}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onPullRefresh}
                />
              }
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default ProfileScreen;
