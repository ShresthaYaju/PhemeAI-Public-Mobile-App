import React, { Component, useState, useEffect } from "react";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import { db } from "../config/firebase.js";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { COLORS, icons, SIZES } from "../constants/index.js";
import NewsList from "../components/NewsList.jsx";
import {
  get,
  onValue,
  ref,
  query,
  orderByValue,
  orderByChild,
  set,
} from "firebase/database";
import { News_API_Key, OpenAI_API_Key, API_Key } from "@env";
import { Audio } from "expo-av";

const Microphone = () => {
  const [articles, setArticles] = useState([]);
  const [podcasts, setPodcasts] = useState("");
  const [podcast, setPodcast] = useState({});
  const [audioList, setAudioList] = useState([
    "Bitcoin",
    "Kathmandu",
    "Tech",
    "Syria",

  ]);

  const supabaseUrl = "https://sgmejhdzljpwdyahzmix.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnbWVqaGR6bGpwd2R5YWh6bWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMjM2NjEsImV4cCI6MjAxNTU5OTY2MX0.x8hUXPDHUw1TgrGDqfGqmQD7B2yQXn5aNzlj9ZvyzCQ";

  const supabase = createClient(supabaseUrl, supabaseKey);

  
  const [loading, setLoading] = useState(false);
  const [searchItem, setSerachItem] = useState("");

  // const openai = new OpenAI();

  async function createPodcast() {
    setLoading(true);
    fetch(`http://10.16.25.41:3000/podcast/${searchItem}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setPodcast(data);
        setAudioList([...audioList, searchItem]);
        setLoading(false);
      });

    console.log("start");
  }

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
  };

  const [sound, setSound] = React.useState();

  async function playSound(item) {

    const { data } = supabase.storage
      .from("Pheme")
      .getPublicUrl(`audio/${item}.mp3`);

    console.log("URL is suppose to be", data.publicUrl);


    console.log("Loading Sound");
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
    });
    const { sound } = await Audio.Sound.createAsync(
      { uri: data.publicUrl },
      { shouldPlay: true }
    );
    setSound(sound);


    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleAudio = (item) => {
    playSound(item);
  };

  // const CreatePodcast = () => {
  //   setLoading(true);
  //   fetch(`http://10.16.25.41:3000/podcast/${searchItem}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setPodcast(data);
  //     });
  //   // console.log(podcast["podcast"][3]);

  // };

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
            Podcast
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
          <TouchableOpacity
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => createPodcast()}
          >
            <View
              style={{
                width: "50%",
                paddingVertical: 5,

                marginVertical: 5,
                backgroundColor: COLORS.white,
                paddingHorizontal: SIZES.xxLarge,
                borderRadius: SIZES.xxxLarge,
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: SIZES.large,
                  fontWeight: "bold",
                  fontFamily: "DMBold",
                  marginBottom: 5,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                Create Podcast
              </Text>
            </View>
          </TouchableOpacity>
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
          backgroundColor: COLORS.black,
        }}
      >
        {loading && <ActivityIndicator size="large" color={COLORS.white} />}

        {audioList.map((item, index) => {
          return (
            <TouchableOpacity
              style={{
                width: "100%",
                justifyContent: "center",
                padding: 12,
              }}
              onPress={() => handleAudio(item)}
            >
              <View
                style={{
                  backgroundColor: COLORS.black2,
                  marginHorizontal: 12,
                  marginVertical: 0,
                  padding: 12,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
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
                  }}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default Microphone;
