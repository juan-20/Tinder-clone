import { useNavigation } from '@react-navigation/native';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import tw from 'tailwind-rn'
import { db } from '../hooks/firebase';
import useAuth from '../hooks/useAuth';

const ModalScreen = () => {

    const { user } = useAuth();

    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);

    const incompleteForm = !image || !job || !age;

    const updateUserProfile = () => {
        console.log(image, job, age)
        setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            displayName: user.displayName,
            photoURL: image,
            job: job,
            age: age,
            timestamp: serverTimestamp()
        }).then(() => {
            navigation.navigate("Home")
        }).catch(error => {
            alert(error.message)
        })
    }
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Editar perfil'
        });
    }, []);

    return (
        <View style={tw('flex-1 items-center pt-1')} >
            <Image
                style={tw('h-20 w-full')}
                resizeMode="contain"
                source={{ uri: "https://links.papareact.com/2pf" }}
            />

            <Text
                style={tw('text-xl text-gray-500 p-2 font-bold')}>
                Welcome {user.displayName}
            </Text>


            {/* Picture */}
            <Text
                style={tw('text-center p-4 font-bold text-red-400')}>
                Profile Pic
            </Text>
            <TextInput
                value={image}
                onChangeText={(text) => setImage(text)}
                placeholder='Enter a Profile Pic URL'
                style={tw('text-center text-xl pb-2  border-b-2 border-red-400')}
            />


            {/* Job */}
            <Text
                style={tw('text-center p-4 font-bold text-red-400')}>
                Job:
            </Text>
            <TextInput
                value={job}
                onChangeText={setJob}
                placeholder='Enter your job'
                style={tw('text-center text-xl pb-2 border-b-2 border-red-400')}
            />

            {/* Age */}
            <Text
                style={tw('text-center p-4 font-bold text-red-400')}>
                Age:
            </Text>
            <TextInput
                value={age}
                onChangeText={setAge}
                placeholder='Enter your age'
                style={tw('text-center text-xl pb-2  border-b-2 border-red-400')}
                maxLength={2}
                keyboardType="numeric"
            />

            <TouchableOpacity
                disabled={incompleteForm}
                style={[tw('w-64 p-3 rounded-xl absolute bottom-10'),
                incompleteForm ? tw('bg-gray-400') : tw('bg-red-400')
                ]}
                onPress={updateUserProfile}
            >
                <Text style={tw('text-center text-white text-xl')}>
                    Update profile
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default ModalScreen;