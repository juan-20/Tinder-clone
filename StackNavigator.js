import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import useAuth from './hooks/useAuth'
import ModalScreen from './src/screens/ModalScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import LoginScreen from './src/screens/LoginScreen';
import MatchedScreen from './src/screens/MatchedScreen';

const Stack = createNativeStackNavigator();


const StackNavigator = () => {
    const { user } = useAuth();
    return (
        <Stack.Navigator>
            {user ? (
                <>
                    <Stack.Group>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Chat" component={ChatScreen} />
                    </Stack.Group>
                    <Stack.Group screenOptions={{ presentation: "modal" }}>
                        <Stack.Screen name="Modal" component={ModalScreen} />
                    </Stack.Group>
                    <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
                        <Stack.Screen name="Modal" component={MatchedScreen} />
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