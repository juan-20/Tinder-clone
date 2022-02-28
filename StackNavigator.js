import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

import useAuth from './hooks/useAuth'
import ModalScreen from './screens/ModalScreen';

const Stack = createNativeStackNavigator();

// import { Container } from './styles';

const StackNavigator = () => {
    const { user } = useAuth();
    return (
        <Stack.Navigator >
            {user ? (
                <>
                    <Stack.Group>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Chat" component={ChatScreen} />
                    </Stack.Group>
                    <Stack.Group screenOptions={{ presentation: "modal" }}>
                        <Stack.Screen name="Modal" component={ModalScreen} />
                    </Stack.Group>
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