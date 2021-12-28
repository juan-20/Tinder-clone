import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

// import { Container } from './styles';

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
    );
}

export default StackNavigator;