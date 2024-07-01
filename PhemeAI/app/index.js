import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";

import { collection, onSnapshot } from "firebase/firestore";

import { COLORS, icons, SIZES } from "../constants/index.js";

import Icons from "react-native-vector-icons/FontAwesome";
import { Colors } from "react-native/Libraries/NewAppScreen";

import Main from "../components/Main.jsx";
import Search from "../components/Search.jsx";
import Microphone from "../components/Microphone.jsx";
import User from "../components/User.jsx";

const Home = () => {
  // console.log("Home");
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Main");

  const handlePressHome = (e) => {
    e.preventDefault();
    setSelectedCategory("Main");
  };

  const handlePressSearch = (e) => {
    e.preventDefault();
    setSelectedCategory("Search");
  };

  const handlePressMicrophone = (e) => {
    e.preventDefault();
    setSelectedCategory("Microphone");
  };

  const handlePressUser = (e) => {
    e.preventDefault();
    setSelectedCategory("User");
  };

  const styles = StyleSheet.create({
    activeView: {
      backgroundColor: COLORS.black2,
      width: 55,
      height: 55,
      borderRadius: SIZES.xxLarge,
      justifyContent: "center",
      alignItems: "center",
    },
    activeIcon: {
      color: COLORS.white,
      
    },
    inactiveView: {
      backgroundColor: COLORS.white,
      width: 60,
      height: 60,
      borderRadius: SIZES.xxLarge,
      justifyContent: "center",
      alignItems: "center",
    },
    inactiveIcon: {
      color: COLORS.black,
  
    },
  });

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: COLORS.black }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.black },
          headerShadowVisible: false,
          headerTitle: "",
          paddingTop: 0,
        }}
      />

      {selectedCategory === "Main" && <Main />}
      {selectedCategory === "Search" && <Search />}
      {selectedCategory === "Microphone" && <Microphone />}
      {selectedCategory === "User" && <User/>}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingVertical: SIZES.xxSmall,
          paddingHorizontal: SIZES.xxSmall,
          backgroundColor: COLORS.white,
          marginHorizontal: SIZES.small,
          borderRadius: SIZES.xxxLarge,
          marginTop: SIZES.medium,
        }}
      >
        <TouchableOpacity onPress={handlePressHome} name="Home">
          <View>
            <View
              style={[
                selectedCategory === "Main"
                  ? styles.activeView
                  : styles.inactiveView,
              ]}
            >
              <Icons
                name="home"
                style={[
                  selectedCategory === "Main"
                    ? styles.activeIcon
                    : styles.inactiveIcon,
                ]}
                size={30}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressSearch}>
          <View>
            <View
              style={[
                selectedCategory === "Search"
                  ? styles.activeView
                  : styles.inactiveView,
              ]}
            >
              <Icons
                name="search"
                style={[
                  selectedCategory === "Search"
                    ? styles.activeIcon
                    : styles.inactiveIcon,
                ]}
                size={30}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressMicrophone}>
          <View>
            <View
              style={[
                selectedCategory === "Microphone"
                  ? styles.activeView
                  : styles.inactiveView,
              ]}
            >
              <Icons
                name="microphone"
                style={[
                  selectedCategory === "Microphone"
                    ? styles.activeIcon
                    : styles.inactiveIcon,
                ]}
                size={30}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressUser}>
          <View>
            <View
              style={[
                selectedCategory === "User"
                  ? styles.activeView
                  : styles.inactiveView,
              ]}
            >
              <Icons
                name="user"
                style={[
                  selectedCategory === "User"
                    ? styles.activeIcon
                    : styles.inactiveIcon,
                ]}
                size={30}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Home;
