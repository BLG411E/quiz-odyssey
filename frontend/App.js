import React, { useMemo, useReducer, useEffect } from 'react';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

import AuthContext from './utils/AuthContext';
import Register from './utils/Register';
import Login from './utils/Login';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import ProfileChangePage from './pages/ProfileChangePage';

const Stack = createNativeStackNavigator();

export default function App() {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case ("RESTORE_TOKEN"):
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case ("LOGIN"):
                    return {
                        ...prevState,
                        isLogout: false,
                        userToken: action.token,
                    };
                case ("LOGOUT"):
                    return {
                        ...prevState,
                        isLogout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isLogout: false,
            userToken: null,
        }
    );

    useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await SecureStore.getItemAsync("token");
            } catch (e) {
                console.error(e);
            }

            dispatch({ type: "RESTORE_TOKEN", token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = useMemo(
        () => ({
            SignIn: async (data) => {
                const token = await Login(data);
                dispatch({ type: "LOGIN", token: token });
            },
            Logout: async () => {
                SecureStore.deleteItemAsync("token");
                dispatch({ type: "LOGOUT" });
            },
            SignUp: async (data) => {
                const token = await Register(data);
                dispatch({ type: "LOGIN", token: token });
            },
        }),
        []
    );

    let [fontsLoaded] = useFonts({
        Inter_400Regular
    })

    if (!fontsLoaded) {
        return null;
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {state.isLoading ? null /* // TODO: Splash Page */ :
                    (
                        <>
                            {state.userToken != null ? (
                                <Stack.Navigator initialRouteName="MainPage" screenOptions={{
                                    headerShown: false,
                                }}>
                                    <Stack.Screen name="MainPage" component={MainPage} />
                                    <Stack.Screen name="ProfileSettingsPage" component={ProfileSettingsPage} />
                                    <Stack.Screen name="ProfileChangePage" component={ProfileChangePage} />
                                </Stack.Navigator>
                            ) : (
                                <Stack.Navigator initialRouteName="LoginPage" screenOptions={{
                                    headerShown: false,
                                }}>
                                    <Stack.Screen name="RegisterPage" component={RegisterPage} />
                                    <Stack.Screen name="LoginPage" component={LoginPage} />
                                </Stack.Navigator>
                            )}
                        </>
                    )}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
