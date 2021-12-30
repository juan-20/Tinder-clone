import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

import useAuth from './hooks/useAuth'

const Stack = createNativeStackNavigator();

// import { Container } from './styles';

const StackNavigator = () => {
    const { user } = useAuth();
    return (
        <Stack.Navigator >
            {user ? (
                <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                </>
            ) : (
                <Stack.Screen name="Login" component={LoginScreen}
                // tira a header:
                // options={{ headerShown: false }} 
                />
            )}
        </Stack.Navigator >
    );
}

export default StackNavigator;