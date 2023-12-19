import React, { useMemo, useReducer, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

import AuthContext from './utils/AuthContext';

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
              const token = null // await Login(data); // TODO: Login function
              dispatch({ type: "LOGIN", token: token });
          },
          Logout: async () => {
              SecureStore.deleteItemAsync("token");
              dispatch({ type: "LOGOUT" });
          },
          SignUp: async (data) => {
              const token = null // await Register(data); // TODO: Register function
              dispatch({ type: "LOGIN", token: token });
          },
      }),
      []
  );

  return (
      <AuthContext.Provider value={authContext}>
          <NavigationContainer>
              {/* // TODO: Write screen-specific navigator, include splash screen if loading */}
          </NavigationContainer>
      </AuthContext.Provider>
  );
}
