import { useNavigation } from '@react-navigation/native';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingViewComponent } from 'react-native';
import tw from 'tailwind-rn'
import { db } from '../../hooks/firebase';
import useAuth from '../../hooks/useAuth';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const ModalScreen = () => {

    const { user } = useAuth();

    // const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);
    const [image, setImage] = useState(null);

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

    // image:

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={tw('flex-1 items-center pt-1')} >
            {/* <KeyboardAvoidingViewComponent behavior='position'> */}
            <Image
                style={tw('h-20 w-full')}
                resizeMode="contain"
                source={{ uri: "https://links.papareact.com/2pf" }}
            />

            <Text
                style={tw('text-xl text-gray-500 p-2 font-bold')}>
                Oii, {user.displayName}
            </Text>


            {/* Picture */}
            <Text
                style={tw('text-center p-4 font-bold text-red-400')}>
                Foto de perfil
            </Text>
            <TouchableOpacity
                style={tw('inline-block h-16 w-16 rounded-full ring-2 ring-white display-flex items-center justify-center bg-gray-300')}
                onPress={pickImage}
            >
                {image ?
                    <Image source={{ uri: image }}
                        style={[{ width: 64, height: 64 },
                        tw('rounded-full')]} />
                    :
                    <MaterialIcons name="add-a-photo" size={24} color="black" />
                }
            </TouchableOpacity>


            {/* Job */}
            <Text
                style={tw('text-center p-4 font-bold text-red-400')}>
                Coisa preferida:
            </Text>
            <TextInput
                value={job}
                onChangeText={setJob}
                placeholder='Ex.: Música'
                style={tw('text-center text-xl w-100 pb-2 border-b-2 border-red-400')}
            />

            {/* Age */}
            <Text
                style={tw('text-center p-4 font-bold text-red-400')}>
                Idade:
            </Text>
            <TextInput
                value={age}
                onChangeText={setAge}
                placeholder='Ex.: 19'
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
            {/* </KeyboardAvoidingViewComponent> */}
        </View>
    );
}

export default ModalScreen;