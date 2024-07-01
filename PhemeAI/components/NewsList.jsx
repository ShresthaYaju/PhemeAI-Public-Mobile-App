import { Text, View } from "react-native";
import React, { Component } from "react";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../constants";
import NewsFlashCard from "./NewsFlashCard";

const NewsList = ({ filter, prop }) => {
  const filterData = (item) => {
    if (item && filter === "") {
      return <NewsFlashCard prop={item} />;
    }
    if (item.title && item.title.includes(filter)) {
      return <NewsFlashCard prop={item} />;
    }
    if (item.category && item.category.includes(filter)) {
      return <NewsFlashCard prop={item} />;
    }
    if (item.author && item.author.includes(filter)) {
      return <NewsFlashCard prop={item} />;
    }
  };
  // console.log(prop.id)
  return (
    <FlatList
      data={prop}
      renderItem={({ item }) => filterData(item)}
      keyExtractor={(item) => item.id }
    />
  );
};

export default NewsList;
