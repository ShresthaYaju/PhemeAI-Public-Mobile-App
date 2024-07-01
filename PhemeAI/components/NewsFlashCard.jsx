import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants";
import { router, useRouter } from "expo-router";

const NewsFlashCard = ({ prop }) => {
  // const title = prop.title;
  // const imgSrc = prop.imgSrc;
  // const text = prop.text;
  // console.log(prop)

  const handleNavigation = () => {
    router.push(`/news-details/${prop.id}`);
    // console.log(prop.id);
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.black2,
        padding: 10,
        borderRadius: 20,
        margin: 12,
        flexDirection: "row",
        justifyContent: "space- between",
      }}
      onPress={ handleNavigation}
    >
      <View
        style={{
          width: 260,
          padding: SIZES.xsmall,
          paddingRight: SIZES.small,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: SIZES.medium,
            fontWeight: "bold",
            fontFamily: "DMBold",
            marginBottom: 5,
            flexWrap: "wrap",
          }}
        >
          {prop.title}
        </Text>
        <Text
          style={{
            marginVertical: 5,
            color: COLORS.black4,
            fontSize: SIZES.small,
            fontWeight: "bold",
            fontFamily: "DMBold",
          }}
        >
          {prop.author}
        </Text>

        <Text
          style={{
            // marginVertical: 5,
            color: COLORS.black3,
            fontSize: SIZES.small,
            fontWeight: "bold",
            fontFamily: "DMBold",
          }}
        >
        
            {prop.category[0]} {prop.category[1] ? "," : ""} {prop.category[1]}{" "}
            {prop.category[2] ? "," : ""} {prop.category[2]}
          
        </Text>
      </View>

      <Image
        style={{
          width: 120,
          height: 120,
          borderRadius: 10,
        }}
        source={{
          uri: prop.urlToImage,
        }}
      />
    </TouchableOpacity>
  );
};

export default NewsFlashCard;
