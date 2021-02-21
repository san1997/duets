import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import AppLoading from 'expo-app-loading';
import { notificationScreenStyle } from "./style.js";
import CacheImage from "../../../../constConfig/cacheImage";

import { SERVER } from "../../../../constConfig/config";
import queryString from "query-string";
import colors from "../../../../constConfig/colors";

const refresh = 1;

class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      limit: 40,
      isLoading: false,
      uid: this.props
        ? this.props.route.params.uid
        : "lDjbCXZC02bECatjaiyFRDr08SN2",
      refresh: !refresh,
      isRefreshing: false,
      noMoreLoad: false,
      tabClick: this.props.tabClick,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, this.getNotificationDataFromFirebase);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.tabClick && prevProps.tabClick !== this.props.tabClick) {
      this.setState({ isLoading: true }, () =>
        this.getNotificationDataFromFirebase(true)
      );
      this.setState({ tabClick: false });
    }
  };

  getNotificationDataFromFirebase = async (isPull) => {
    const queryObj = {
      userId: this.state.uid,
      page: this.state.page,
      limit: this.state.limit,
    };
    /* we can separate likes number and likers, we are getting likers in this call unnecessarily */
    const url = `${SERVER}/getNotifications?${queryString.stringify(queryObj)}`;
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
          noMoreLoad: responseJson.length < this.state.limit ? true : false,
        });
      })
      .finally(() => {});
  };

  onPullRefresh = () => {
    this.setState({ isRefreshing: true, page: 1 }, () => {
      this.getNotificationDataFromFirebase(true);
    });
  };

  feedMoreHandling = () => {
    if (this.state.noMoreLoad) {
      return null;
    }
    this.setState(
      { page: this.state.page + 1, isLoading: true },
      this.getNotificationDataFromFirebase
    );
  };

  renderLoadMore = () => {
    return this.state.isLoading ? (
      <View style={notificationScreenStyle.renderLoadMoreStyle}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  renderNotifications = ({ item, index }) => {
    return (
      <View style={notificationScreenStyle.singleNotificationSectionStyle}>
        <Text style={notificationScreenStyle.notificationTextStyle}>
          {item}
        </Text>
      </View>
    );
  };

  _listEmptyComponent = () => {
    return (
      <View
        style={{
          width: "100%",
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={notificationScreenStyle.notificationTextStyle}>
          No Notifications yet!
        </Text>
      </View>
    );
  };

  render() {
    if (this.state.isLoading) {
      return <AppLoading />;
    }
    return (
      <SafeAreaView style={notificationScreenStyle.androidSafeArea}>
        <View style={notificationScreenStyle.notificationPageContainer}>
          <FlatList
            style={notificationScreenStyle.notificationContainer}
            ref={this.props.flatListRef}
            data={this.state.data}
            extraData={this.state.refresh}
            renderItem={this.renderNotifications}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0}
            ListEmptyComponent={this._listEmptyComponent}
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

export default NotificationScreen;
