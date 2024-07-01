import React, { Component, useState, useEffect } from "react";
import { db } from "../config/firebase.js";
import { Text, View, TextInput } from "react-native";
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

const Search = () => {
    const [articles, setArticles] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [searchItem, setSerachItem] = useState("");

  function getArticles() {
    const articlesRef = ref(db, "articles");

    const orderedArticlesQuery = query(
      articlesRef,
      orderByChild("publishedAt", "decs")
    );

    onValue(orderedArticlesQuery, (snapshot) => {
      const articles = [];
      snapshot.forEach((childSnapshot) => {
        articles.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      articles.reverse();
      setArticles(articles);
      setLoading(false);
    });
  }

  useEffect(() => {
    try {
      getArticles();
    } catch (error) {
      console.log(error);
    }
  }, []);

    const onChangeSearch = (query) => {
        setSerachItem(query);
        // console.log(query);
        
    }
    

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
            Search
          </Text>
        </View>
        <View>
          <TextInput
                      style={{
                          backgroundColor: COLORS.black2,
                          padding: 12,
                          borderRadius: 20,
                          margin: 12,
                          color: COLORS.white,
                          fontSize: SIZES.medium,
                          placeholderTextColor: COLORS.black4,
                            
            }}
            onChangeText={onChangeSearch}
            value={searchItem}
            placeholder="Search"
 
          />
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
      >
        <NewsList filter={searchItem}  prop={(data = articles)} />
      </View>
    </>
  );
};

export default Search;
