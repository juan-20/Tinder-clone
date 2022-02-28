import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper'

import useAuth from '../hooks/useAuth'

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
    firstName: "Juanzin",
    lastName: "Andrade",
    occupation: 'Dev',
    photoURL: "https://pbs.twimg.com/profile_images/1428180830271201285/_KOGlUz7_400x400.jpg",
    age: 19,
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

  return (
    <SafeAreaView style={tw("flex-1")}>

      <View style={tw("items-center relative")}>
        <TouchableOpacity onPress={logout} style={tw("absolute left-5 top-3")}>
          <Image
            style={tw('h-10 w-10 rounded-full')}
            source={{ uri: user.photoURL }} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image style={tw('h-14 w-14')} source={require("../assets/logo.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={tw("absolute right-5 top-3")} >
          <Ionicons name='chatbubbles-sharp' size={30} color="#FF5864" />
        </TouchableOpacity>

      </View>

      {/* Card: */}

      <View style={tw("flex-1 -mt-6")}>
        <Swiper
          containerStyle={{ backgroundColor: 'transparent' }}
          cards={DUMMY_DATA}
          renderCard={(card) => (
            <View key={card.id} style={tw("bg-red-500 h-3/4 rounded-xl")}>
              <Text>{card.firstName}</Text>
            </View>
          )}
        />
      </View>

    </SafeAreaView >
  );
}

export default HomeScreen;
