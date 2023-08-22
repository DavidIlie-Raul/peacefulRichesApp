import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavigationBar from "./Navigation/NavBar";
import * as Font from "expo-font";
import AuthNav from "./Navigation/AuthNav";

let customFonts = {
  "Nimbus-Sans-Regular": require("../assets/NimbusSanL-Reg.otf"),
  "Nimbus-Sans-BoldItalic": require("../assets/NimbusSanL-BolIta.otf"),
  "Nimbus-Sans-Bold": require("../assets/NimbusSanL-Bol.otf"),
  "Nimbus-Sans-RegularItalic": require("../assets/NimbusSanL-RegIta.otf"),
};

let isAuthenticated;

class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return null; // Or a loading screen
    }

    isAuthenticated = false;

    if (isAuthenticated === true) {
      return (
        <NavigationContainer>
          <NavigationBar />
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <AuthNav />
        </NavigationContainer>
      );
    }
  }
}

export default App;
