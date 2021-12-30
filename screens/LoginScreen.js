import React from 'react';
import { View, Text, Button } from 'react-native';
import useAuth from '../hooks/useAuth'

// import { Container } from './styles';

const LoginScreen = () => {
    const { signInWithGoogle } = useAuth();

    return (
        <View>
            <Text>Login to the app 🇧🇷</Text>
            <Button title="Login" onPress={signInWithGoogle} />
        </View>
    );
}

export default LoginScreen;