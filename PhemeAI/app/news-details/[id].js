import React from "react";
import { useEffect } from "react";
import {
  Text,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import Hyperlink from "react-native-hyperlink";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { COLORS, SIZES } from "../../constants/index.js";
import { onValue, ref } from "firebase/database";
import { db } from "../../config/firebase.js";
import { ScrollView } from "react-native-gesture-handler";

const NewsDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const [articles, setArticles] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("News");
  const [refreshing, setRefreshing] = useState(false);

  const onrefresh = useCallback(() => {
    setRefreshing(true);
    getArticles();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // console.log("params: ", params.id);

  function getArticles() {
    setLoading(true);
    const articlesRef = ref(db, "articles/" + params.id);

    onValue(articlesRef, (snapshot) => {
      const article = snapshot.val();
      // console.log("article: ", article);
      setArticles(article);
      setLoading(false);
    });
  }

  useEffect(() => {
    try {
      getArticles();
    } catch (error) {
      console.log("Dynamic Route: ", error);
    }
  }, []);

  const onClickNews = () => {
    setPage("News");
  };
  const onClickDetails = () => {
    setPage("Details");
  };

  const styles = StyleSheet.create({
    activeView: {
      //   width: "50%",
      marginVertical: 5,
      backgroundColor: COLORS.white,
      paddingHorizontal: SIZES.xxLarge,
      borderRadius: SIZES.xxxLarge,
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    activeText: {
      color: COLORS.black,
      fontSize: SIZES.large,
      fontWeight: "bold",
      fontFamily: "DMBold",
      marginBottom: 5,
      flexWrap: "wrap",
      justifyContent: "center",
    },
    inactiveView: {
      //   width: "50%",
      // backgroundColor: COLORS.black2,
      paddingHorizontal: SIZES.xxLarge,
      justifyContent: "center",
      marginVertical: 5,
      borderRadius: SIZES.xxxLarge,
      textAlign: "center",
      alignItems: "center",
    },
    inactiveText: {
      color: COLORS.white,
      fontSize: SIZES.large,
      fontWeight: "bold",
      fontFamily: "DMBold",
      marginBottom: 5,
      flexWrap: "wrap",
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
          headerBackVisible: true,
          headerTitle: "",
          paddingTop: 0,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl />}
        refreshing={refreshing}
        onRefresh={onrefresh}
      >
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.White} />
        ) : data.length === 0 ? (
          <Text
            style={{
              color: COLORS.white,
              textAlign: "center",
              marginTop: SIZES.large,
            }}
          >
            No News Found
          </Text>
        ) : (
          <View
            style={{
              alignItems: "center",
              margin: 10,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: SIZES.xLarge,
                fontWeight: "bold",
                fontFamily: "DMBold",
                textAlign: "center",
              }}
            >
              {articles.title}
            </Text>
            <View
              style={{
                padding: 10,
                borderRadius: 20,
                alignItems: "center",
                width: "98%",
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: 200,
                  padding: 20,
                  borderRadius: 15,
                }}
                source={{
                  uri: articles.urlToImage,
                }}
              />
            </View>

            <View
              style={{
                // backgroundColor: COLORS.black2,
                padding: 10,
                borderRadius: 20,
                margin: 12,
                width: "100%",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  borderRightColor: COLORS.black4,
                  borderRightWidth: 2,
                  flex: 1,
                  paddingHorizontal: SIZES.xLarge,
                }}
              >
                <TouchableOpacity
                  style={[
                    page === "News" ? styles.activeView : styles.inactiveView,
                  ]}
                  onPress={onClickNews}
                >
                  <Text
                    style={[
                      page === "News" ? styles.activeText : styles.inactiveText,
                    ]}
                  >
                    News
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: SIZES.xLarge,
                }}
              >
                <TouchableOpacity
                  style={[
                    page === "Details"
                      ? styles.activeView
                      : styles.inactiveView,
                  ]}
                  onPress={onClickDetails}
                >
                  <Text
                    style={[
                      page === "Details"
                        ? styles.activeText
                        : styles.inactiveText,
                    ]}
                  >
                    Details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {page === "News" ? (
              <View
                style={{
                  padding: 15,
                  borderRadius: 20,
                  // alignItems: "center",
                  width: "98%",
                  backgroundColor: COLORS.black2,
                }}
              >
                {articles.bullet_points
                  ? articles.bullet_points.map((item) => {
                      return (
                        <View
                          style={{
                            marginVertical: 5,
                          }}
                        >
                          <Text
                            style={{
                              color: COLORS.black4,
                              fontSize: 14,
                              fontWeight: "regular",
                              fontFamily: "DMBold",
                              //   textAlign: "center",
                            }}
                          >
                            {item}
                          </Text>
                        </View>
                      );
                    })
                  : ""}
              </View>
            ) : (
              <View
                style={{
                  padding: 15,
                  borderRadius: 20,
                  // alignItems: "center",
                  width: "98%",
                  backgroundColor: COLORS.black2,
                }}
              >
                <Text
                  style={{
                    color: COLORS.black3,
                    fontSize: 14,
                    fontWeight: "regular",
                    fontFamily: "DMBold",
                    //   textAlign: "center",
                    marginBottom: 5,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                    }}
                  >
                    Description:
                  </Text>{" "}
                  {articles.description}
                </Text>
                <Text
                  style={{
                    color: COLORS.black3,
                    fontSize: 14,
                    fontWeight: "regular",
                    fontFamily: "DMBold",

                    //   textAlign: "center",
                    marginVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                    }}
                  >
                    Author:
                  </Text>{" "}
                  {articles.author}
                </Text>
                <Text
                  style={{
                    color: COLORS.black3,
                    fontSize: 14,
                    fontWeight: "regular",
                    fontFamily: "DMBold",

                    //   textAlign: "center",
                    marginVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                    }}
                  >
                    Category:
                  </Text>{" "}
                  {articles.category[0]} {articles.category[1] ? "," : ""}{" "}
                  {articles.category[1]} {articles.category[2] ? "," : ""}{" "}
                  {articles.category[2]} {articles.category[3] ? "," : ""}{" "}
                  {articles.category[3]}
                  {articles.category[4] ? "," : ""} {articles.category[4]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black3,
                    fontSize: 14,
                    fontWeight: "regular",
                    fontFamily: "DMBold",

                    //   textAlign: "center",
                    marginVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                    }}
                  >
                    Published At:
                  </Text>{" "}
                  {new Date(articles.publishedAt).toDateString()}
                </Text>
                <Text
                  style={{
                    color: COLORS.black3,
                    fontSize: 14,
                    fontWeight: "regular",
                    fontFamily: "DMBold",

                    //   textAlign: "center",
                    marginVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                    }}
                  >
                    Original Article:
                  </Text>{" "}
                        <Hyperlink onPress={() => { Linking.openURL(articles.url) }}>
                    <Text
                      style={{
                        color: COLORS.black3,
                        fontSize: 14,
                        fontWeight: "regular",
                        fontFamily: "DMBold",

                        //   textAlign: "center",
                        marginVertical: 5,
                      }}
                    >
                      {articles.url}
                    </Text>
                  </Hyperlink>
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetails;
