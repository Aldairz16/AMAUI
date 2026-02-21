import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { BasicInfoScreen } from '../screens/onboarding/BasicInfoScreen';
import { HealthConditionsScreen } from '../screens/onboarding/HealthConditionsScreen';
import { TrustedContactScreen } from '../screens/onboarding/TrustedContactScreen';
import { MainTabNavigator } from './MainTabNavigator';
import { WhatsappSimulatorScreen } from '../screens/learning/WhatsappSimulatorScreen';
import { YapeSimulatorScreen } from '../screens/learning/YapeSimulatorScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
                <Stack.Screen name="HealthConditions" component={HealthConditionsScreen} />
                <Stack.Screen name="TrustedContact" component={TrustedContactScreen} />
                <Stack.Screen name="MainTabs" component={MainTabNavigator} />
                <Stack.Screen name="WhatsappSimulator" component={WhatsappSimulatorScreen} />
                <Stack.Screen name="YapeSimulator" component={YapeSimulatorScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
