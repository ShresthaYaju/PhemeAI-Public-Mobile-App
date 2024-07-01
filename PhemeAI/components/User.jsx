import React, { Component, useState, useEffect } from "react";
import { db } from "../config/firebase.js";
import { Text, View } from "react-native";
import { COLORS, icons, SIZES } from "../constants/index.js";
import NewsList from "../components/NewsList.jsx";
import {
  get,
  onValue,
  ref,
  query,
  orderByValue,
  orderByChild,
} from "firebase/database";
import Icons from "react-native-vector-icons/FontAwesome";

const User = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <View showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
            marginVertical: 0,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.xxLarge,
              fontWeight: "bold",
              fontFamily: "DMBold",
            }}
          >
            User
          </Text>
        </View>
        {/* <View
          style={{
            flex: 1,
            backgroundColor: COLORS.black,
            padding: SIZES.medium,
          }}
        ></View> */}
      </View>

      <View
        style={{
          flex: 1,
        }}
        padding={SIZES.large}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.black2,
              borderRadius: SIZES.xxxLarge,
              width: 80,
              height: 80,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icons
              name="user"
              style={{
                color: COLORS.white,
              }}
              size={60}
            />
          </View>
          <View>
            <Text
              style={{
                color: COLORS.white,
                fontSize: SIZES.xLarge,
                fontWeight: "bold",
                fontFamily: "DMBold",
                marginBottom: 5,
                flexWrap: "wrap",
                marginLeft: 14,
              }}
            >
              Yaju Shrestha
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            borderBottomWidth: 1,
                      borderBottomColor: COLORS.white,
            marginTop: 40,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.xLarge,
              fontWeight: "bold",
              fontFamily: "DMBold",
              marginBottom: 5,
              flexWrap: "wrap",
              padding: 10,
              marginLeft: 14,
            }}
          >
            Profile
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: COLORS.white,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.xLarge,
              fontWeight: "bold",
              fontFamily: "DMBold",
              marginBottom: 5,
              flexWrap: "wrap",
              padding: 10,
              marginLeft: 14,
            }}
          >
            Setting
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: COLORS.white,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.xLarge,
              fontWeight: "bold",
              fontFamily: "DMBold",
              marginBottom: 5,
              flexWrap: "wrap",
              padding: 10,
              marginLeft: 14,
            }}
          >
            Storage
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: COLORS.white,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.xLarge,
              fontWeight: "bold",
              fontFamily: "DMBold",
              marginBottom: 5,
              flexWrap: "wrap",
              padding: 10,
              marginLeft: 14,
            }}
          >
            Logout
          </Text>
        </View>
      </View>
    </>
  );
};

export default User;
