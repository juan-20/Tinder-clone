import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import tw from 'tailwind-rn';

import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import getMatchedUserInfo from '../../lib/getMatcedUserInfo';
import { db } from '../../hooks/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const ChatRow = ({ matchDetails }) => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null)

    const [lastMessage, setLastMessage] = useState('');

    useEffect(() => onSnapshot(
        query(collection(db, 'matches', matchDetails.id, 'messages'),
            orderBy('timestamp', 'desc')
        ), snapshot => setLastMessage(snapshot.docs[0]?.data()?.message)
    ), [matchDetails, db])

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
    }, [matchDetails, user])
    useEffect(() => {

    }, [])
    return (
        <TouchableOpacity
            style={tw('flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg mt-8')}
            onPress={() => navigation.navigate('Message', {
                matchDetails
            })}
        >
            <Image
                style={tw('rounded-full h-16 w-16 mr-4')}
                source={{ uri: matchedUserInfo?.photoURL }}
            />
            <View>
                <Text style={tw('text-lg font-semibold')}>
                    {matchedUserInfo?.displayName}
                </Text>
                <Text>
                    {lastMessage || "Diga Oi"}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default ChatRow;