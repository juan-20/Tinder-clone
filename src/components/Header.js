import React, { useLayoutEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet, LogBox } from 'react-native';
import tw from 'tailwind-rn';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Foundation } from '@expo/vector-icons'

// import { Container } from './styles';

const Header = ({ title, callEnable }) => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View style={tw('p-2 flex-row items-center justify-between top-8')}>
            <View style={tw('flex flex-row items-center')}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={tw('p-2')}>
                    <Ionicons name='chevron-back-outline' size={34} color="#FF5864"></Ionicons>
                </TouchableOpacity>
                <Text style={tw('text-2xl font-bold pl-2')} >{title}</Text>
            </View>

            {callEnable && (
                <TouchableOpacity style={tw('rounded-full mr-4 p-3 bg-red-200')}>
                    <Foundation style={tw('')} name="telephone" size={20} color='red' />
                </TouchableOpacity>
            )}

        </View>
    );
}

export default Header;