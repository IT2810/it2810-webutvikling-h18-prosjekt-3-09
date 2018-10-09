import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={
            __DEV__
              ? require("../assets/images/robot-dev.png")
              : require("../assets/images/robot-prod.png")
          }
          style={styles.welcomeImage}
        />
        <Text style={styles.mainText}>Welcome to Personal Manager</Text>
        <Text style={styles.mainText}>We provide you with</Text>
        <MonoText>Calendar, TODO, Motivation Manager</MonoText>

        <TouchableOpacity
          onPress={this.handleRepoPress}
          style={styles.repoLink}
        >
          <Text style={styles.repoLinkText}>
            Check out the project's repository
          </Text>
        </TouchableOpacity>

        <View style={styles.withLoveContainer}>
          <MonoText>{"<>"} with ♥ by</MonoText>
          <Text />
        </View>
        <View>
          <Text>Kristian Huse</Text>
          <Text>Håvard Bergheim Olsen</Text>
          <Text>Balázs Orbán</Text>
        </View>
      </View>
    );
  }

  handleRepoPress = () => {
    WebBrowser.openBrowserAsync(
      "https://github.com/IT2810/it2810-webutvikling-h18-prosjekt-3-09"
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginBottom: 15,
    marginLeft: -10
  },
  mainText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  repoLink: {
    paddingVertical: 32
  },
  repoLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  withLoveContainer: {
    alignItems: "center",
    marginTop: 32
  }
});
