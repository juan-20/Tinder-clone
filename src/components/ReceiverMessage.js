import React from 'react';
import tw from 'tailwind-rn';
import { View, Text, Image } from 'react-native';

const ReceiverMessage = ({ message }) => {
    return (
        <View
            style={[
                tw('bg-red-400 rounded-lg rounded-tl-none px-5 py-3 mx-3 my-2 ml-14'),
                { alignSelf: 'flex-start' },
            ]}
        >
            {/* fotinha do match */}
            <Image
                style={tw('h-12 w-12 rounded-full absolute top-0 -left-14')}
                source={{ uri: message?.photoURL }}
            />
            {/* mensagem */}
            <Text style={tw('text-white')}>{message?.message}</Text>
        </View>
    );
};

export default ReceiverMessage;
