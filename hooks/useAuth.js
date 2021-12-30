import React, { createContext, useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import * as Google from 'expo-google-app-auth';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut,

} from '@firebase/auth';
import { auth } from './firebase'

const AuthContext = createContext({});

let config = {
    androidClientId: '48890232946-1b0c7305quaqgapkreto63od487n9bii.apps.googleusercontent.com',
    iosClientId: '48890232946-tu91kigifdml4lgh2pgtl55c3bo1qarc.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"]
}

export const AuthProvider = ({ children }) => {

    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false)

    useEffect(() =>
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }

            setLoadingInitial(false);
        }),
        []
    )

    const logout = () => {
        setLoading(true);

        signOut(auth)
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    const signInWithGoogle = async () => {
        setLoading(true);
        console.log("entrou")
        await Google.logInAsync(config).then(async (logInResult) => {
            console.log("entrou2")
            if (logInResult.type === "success") {
                const { idToken, acessToken } = logInResult;
                const credential = GoogleAuthProvider.credential(idToken, acessToken);

                console.log("quase logado")
                await signInWithCredential(auth, credential);
                console.log("logado")
            }

            return Promise.reject();
        }).catch(error => setError(error))
            // muda o estado do loading pra quando a requisição acabar
            .finally(() => setloading(false));
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            signInWithGoogle,
            logout
        }}>
            {/* faz um lazy loading pra aparecer o splash antes do app em si */}
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    return useContext(AuthContext)
}