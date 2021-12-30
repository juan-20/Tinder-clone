import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';

import useAuth from '../hooks/useAuth'


const HomeScreen = () => {

  // um useEffect de quando o componente aparece na tela
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const navigation = useNavigation();
  const { user, logout } = useAuth();
  // console.log(user);
  return (
    <SafeAreaView>

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
    </SafeAreaView >
  );
}

export default HomeScreen;
