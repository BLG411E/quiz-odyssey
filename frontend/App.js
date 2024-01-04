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
import ProfilePage from './pages/ProfilePage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import ProfileChangePage from './pages/ProfileChangePage';
import SubmitQuestionPage from './pages/SubmitQuestionPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ChooseCategoryPage from './pages/ChooseCategoryPage/ChooseCategoryPage';
import GameQuizPage from './pages/GameQuizPage/GameQuizPage';
import QuizSummaryPage from './pages/QuizSummaryPage/QuizSummaryPage';

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
                                    <Stack.Screen name="MainPage" component={MainPage} initialParams={{token: state.userToken}} />
                                    <Stack.Screen name="ProfilePage" component={ProfilePage} initialParams={{token: state.userToken}}/>
                                    <Stack.Screen name="ProfileSettingsPage" component={ProfileSettingsPage} initialParams={{token: state.userToken}} />
                                    <Stack.Screen name="ProfileChangePage" component={ProfileChangePage}/>
                                    <Stack.Screen name="SubmitQuestionPage" component={SubmitQuestionPage}  initialParams={{token: state.userToken}}/>
                                    <Stack.Screen name="LeaderboardPage" component={LeaderboardPage} initialParams={{token: state.userToken}}/>
                                    <Stack.Screen name="ChooseCategoryPage" component={ChooseCategoryPage}/>
                                    <Stack.Screen name="GameQuizPage" component={GameQuizPage}/>
                                    <Stack.Screen name="QuizSummaryPage" component={QuizSummaryPage}/>
                                </Stack.Navigator>
                            ) : (
                                <Stack.Navigator initialRouteName="LoginPage" screenOptions={{
                                    headerShown: false,
                                }}>
                                    <Stack.Screen name="LoginPage" component={LoginPage} />
                                    <Stack.Screen name="RegisterPage" component={RegisterPage} />
                                </Stack.Navigator>
                            )}
                        </>
                    )}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
