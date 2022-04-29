import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Keyboard,
    Platform,
    TextInput,
    Button,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    FlatList,
    Text
} from 'react-native';
import useAuth from '../../hooks/useAuth';
import getMatchedUserInfo from '../../lib/getMatcedUserInfo';
import Header from '../components/Header';
import tw from 'tailwind-rn';
import SenderMessage from '../components/SenderMessage';
import ReceiverMessage from '../components/ReceiverMessage';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../../hooks/firebase';

// import { Container } from './styles';

const MessageScreen = () => {
    const { user } = useAuth();
    const { params } = useRoute()
    const { matchDetails } = params;

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    const sendMessage = () => {
        if (input) {
            addDoc(collection(db, 'matches', matchDetails?.id, 'messages'), {
                timestamp: serverTimestamp(),
                userId: user?.uid,
                displayName: user?.displayName,
                photoURL: matchDetails?.users[user?.uid]?.photoURL,
                message: input,
            }
            );

            setInput('');
        } else {
            return
        }
    }

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, 'matches', matchDetails.id, 'messages'),
                    orderBy('timestamp', 'desc')
                ),
                (snapshot) =>
                    setMessages(snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    )
            ), [matchDetails, db])

    return (
        <SafeAreaView
            style={tw('flex-1')}
        >
            <Header
                title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
                callEnable
            >
            </Header>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={tw('flex-1')}
                keyboardVerticalOffset={10}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList
                        data={messages}
                        inverted={-1}
                        style={tw('pl-4 mt-8')}
                        keyExtractor={item => item.id}
                        renderItem={({ item: message }) =>
                            message.userId === user.uid ? (
                                <SenderMessage key={message.id} message={message} />
                            ) : (
                                <ReceiverMessage key={message.id} message={message} />
                            )
                        }
                    >
                    </FlatList>
                </TouchableWithoutFeedback>

                <View
                    style={tw('flex-row justify-between bg-white items-center border-t border-gray-200 px-5 py-2')}
                >
                    <TextInput
                        style={tw('h-10 text-lg')}
                        placeholder='Send Message...'
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                        value={input}
                    />
                    <Button
                        onPress={sendMessage}
                        title='Send'
                        color='#FF5864'
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default MessageScreen;