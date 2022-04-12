import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet, LogBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';
import Swiper from 'react-native-deck-swiper'
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';

import useAuth from '../../hooks/useAuth'
import { collection, doc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../hooks/firebase';

const DUMMY_DATA = [
  {
    firstName: "Juan",
    lastName: "Andrade",
    occupation: 'Dev',
    photoURL: "https://pbs.twimg.com/profile_images/1428180830271201285/_KOGlUz7_400x400.jpg",
    age: 19,
    id: 1,
  },
  {
    firstName: "Sabrina",
    lastName: "Kudo",
    occupation: 'Moda',
    photoURL: "https://pbs.twimg.com/media/FK8gbcsWYAQUAAb?format=jpg&name=small",
    age: 20,
    id: 2,
  },
  {
    firstName: "Pedro",
    lastName: "Monteiro",
    occupation: 'História',
    photoURL: "https://instagram.fdiq5-1.fna.fbcdn.net/v/t51.2885-19/218736818_1626782224190839_5959746500303627566_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fdiq5-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=Ujh_ULKIr28AX_r59Jy&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_HQZq1pFvIE_rg5KX4QqYbOvfkWo9gudhHcujvEzqstw&oe=62251633&_nc_sid=7bff83",
    age: 20,
    id: 2,
  },
]

const HomeScreen = () => {

  // um useEffect de quando o componente aparece na tela
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [profiles, setProfiles] = useState([])
  const swipeRef = useRef(null)

  // se seu usuario nção estiver setado ele abre o modal
  useLayoutEffect(() =>
    onSnapshot(doc(db, 'users', user.uid), snapshot => {
      if (!snapshot.exists()) {
        navigation.navigate("Modal")
      }
    }),
    []
  );

  LogBox.ignoreLogs(['Setting']);
  LogBox.ignoreLogs(['Unsupported']);

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(collection(db, "users", user.uid, "passes"))
        .then((snapshot) => snapshot.docs.map((doc) => doc.id)
        );
      const swipes = await getDocs(collection(db, "users", user.uid, "swipes"))
        .then((snapshot) => snapshot.docs.map((doc) => doc.id)
        );

      const passedUserIds = passes.length > 0 ? passes : ['test'];
      const swipedUserIds = swipes.length > 0 ? swipes : ['test'];
      // console.log(passedUserIds,"1", swipedUserIds, "2")
      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])), (snapshot) => {
            setProfiles(
              snapshot.docs.filter(doc => doc.id !== user.uid).map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
          });
    };

    fetchCards();
    return unsub;
  }, [db]);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return

    const userSwiped = profiles[cardIndex];
    console.log(`${user.displayName} passou ${userSwiped.displayName}`)

    // ele coloca no db o id do usuario que foi swipado
    setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id),
      userSwiped);
  }
  const swipeRight = async () => {

  }
  // console.log(profiles);
  return (
    <SafeAreaView style={tw("flex-1")}>

      {/* nav: */}
      <View style={tw("items-center relative")}>
        <TouchableOpacity onPress={logout} style={tw("absolute left-5 top-3")}>
          <Image
            style={tw('h-10 w-10 rounded-full')}
            source={{ uri: user.photoURL }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
          <Image style={tw('h-14 w-14')} source={require("../../assets/logo.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={tw("absolute right-5 top-3")} >
          <Ionicons name='chatbubbles-sharp' size={30} color="#FF5864" />
        </TouchableOpacity>

      </View>

      {/* Card: */}

      <View style={tw("flex-1 -mt-6")}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: 'transparent' }}
          // cards={DUMMY_DATA}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          backgroundColor='#4fd0e9'
          onSwipedLeft={(cardIndex) => {
            console.log('Swipe  PASS');
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log('Swipe  MATCH')
            swipeRight(cardIndex)
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                }
              }
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                }
              }
            },
          }}
          renderCard={(card) => card ? (
            <View
              key={card.id}
              style={tw("relative bg-white h-3/4 rounded-xl")}
            >
              <Image
                style={tw('absolute top-0 h-full w-full rounded-xl')}
                source={{ uri: card.photoURL }}
              />
              <View
                style={[tw(
                  'absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl'
                ),
                style.cardShadow
                ]}>
                <View>
                  <Text style={tw("text-xl font-bold")} >
                    {card.displayName}
                  </Text>
                  <Text>{card.job}</Text>
                </View>
                <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
              </View>
            </View>
          ) : (
            <View
              style={[tw(
                'relative bg-white h-3/4 rounded-xl justify-center items-center'
              ),
              style.cardShadow,
              ]}>
              <Text style={tw('font-bold pb-5')}>
                No more profiles
              </Text>

              <Image
                style={tw('h-20 w-20')}
                height={100}
                width={100}
                source={{ uri: "https://links.papareact.com/6gb" }} />
            </View>
          )}
        />
      </View>

      <View style={tw('flex flex-row justify-evenly bottom-10')}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw('items-center justify-center rounded-full w-16 h-16 bg-red-200')}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeBack()}
          style={tw('items-center justify-center rounded-full w-16 h-16 bg-gray-200')}
        >
          <Entypo name="back-in-time" size={24} color="grey" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw('items-center justify-center rounded-full w-16 h-16 bg-green-200')}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>

      </View>

    </SafeAreaView >
  );
}

export default HomeScreen;

const style = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
// const CardShadow = {
//   '-webkit-box-shadow': '0px 3px 12px -2px rgba(0,0,0,0.71)',
//   'box-shadow': '0px 3px 12px -2px rgba(0,0,0,0.71)'
// };