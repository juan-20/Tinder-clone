import React, { createContext, useContext } from 'react';
import { View } from 'react-native';
import * as Google from 'expo-google-app-auth';

const AuthContext = createContext({});

let config = {
    androidClientId: '48890232946-1b0c7305quaqgapkreto63od487n9bii.apps.googleusercontent.com',
    iosClientId: '48890232946-tu91kigifdml4lgh2pgtl55c3bo1qarc.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"]
}

export const AuthProvider = ({ children }) => {
    const signInWithGoogle = async () => {
        Google.logInAsync(config).then(async (logInResult) => {
            if (logInResult.type === "sucess") {
                //login...
            }
        });
    }

    return (
        <AuthContext.Provider value={{
            user: null,
            signInWithGoogle,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    return useContext(AuthContext)
}