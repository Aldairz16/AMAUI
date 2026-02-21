import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MedicationScreen } from '../screens/health/MedicationScreen';
import { ProgressScreen } from '../screens/health/ProgressScreen';
import { LessonsScreen } from '../screens/learning/LessonsScreen';
import { Home, HeartPulse, BookOpen } from 'lucide-react-native';
import { theme } from '../styles/theme';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textLight,
                tabBarStyle: {
                    height: 80, // Taller tab bar for accessibility
                    paddingBottom: 20,
                    paddingTop: 12,
                    backgroundColor: theme.colors.surface,
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.border,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginTop: 4,
                }
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={MedicationScreen}
                options={{
                    tabBarIcon: ({ color }) => <Home color={color} size={28} />
                }}
            />
            <Tab.Screen
                name="Aprender"
                component={LessonsScreen}
                options={{
                    tabBarIcon: ({ color }) => <BookOpen color={color} size={28} />
                }}
            />
            <Tab.Screen
                name="Mi Salud"
                component={ProgressScreen}
                options={{
                    tabBarIcon: ({ color }) => <HeartPulse color={color} size={28} />
                }}
            />
        </Tab.Navigator>
    );
};
