import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';
import useAuth from '../hooks/useAuth'

const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth()
  return (
    <View>
      <Text>eu sou a home yay</Text>
      <Button title="Go to chat screen" onPress={() => navigation.navigate('Chat')} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

export default HomeScreen;
