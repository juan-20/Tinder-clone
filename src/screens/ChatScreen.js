import React, { useLayoutEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import Header from '../components/Header';
import tw from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
import ChatList from '../components/ChatList';

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title='Chat' callEnable />

      <ChatList />

    </SafeAreaView>
  );
}

export default ChatScreen;
