import React from "react";
import shortHash from "shorthash";
import { Image } from "react-native";
import * as FileSystem from "expo-file-system";
/* https://docs.expo.io/versions/latest/sdk/filesystem/
  - with this cacheImage component call please add key as well to update componentDidMount. 
  - Need to add cache removal logic as well.
*/
class CacheImage extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      source: null,
    };
  }

  componentDidMount = async () => {
    this._isMounted = true;
    const { uri } = this.props;
    const name = shortHash.unique(uri);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists) {
      this.setState({
        source: {
          uri: image.uri,
        },
      });
      return;
    }

    const newImage = await FileSystem.downloadAsync(uri, path);
    this.setState({
      source: {
        uri: newImage.uri,
      },
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return <Image style={this.props.style} source={this.state.source} />;
  }
}

export default CacheImage;
