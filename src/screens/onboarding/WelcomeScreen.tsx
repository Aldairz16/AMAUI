import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as Speech from 'expo-speech';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { LargeText } from '../../components/LargeText';
import { AudioButton } from '../../components/AudioButton';
import { theme } from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { HeartPulse } from 'lucide-react-native';

export const WelcomeScreen = () => {
    const navigation = useNavigation<any>();
    const welcomeText = "Hola, soy VidaPlateada. Voy a ayudarte a cuidar tu salud. Solo tienes que tocar los botones que brillan en verde.";

    useEffect(() => {
        // Small timeout to ensure screen is rendered before speaking
        const timer = setTimeout(() => {
            Speech.speak(welcomeText, {
                language: 'es-PE',
                rate: 0.9, // Slightly slower for better comprehension
            });
        }, 500);

        return () => {
            clearTimeout(timer);
            Speech.stop();
        };
    }, []);

    const handleNext = () => {
        Speech.stop();
        // Navigate to next onboarding step (Basic Info)
        navigation.navigate('BasicInfo');
    };

    return (
        <ScreenWrapper scrollable={false}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <HeartPulse color={theme.colors.primary} size={80} />
                </View>

                <LargeText size="xlarge" weight="bold" color={theme.colors.primary} center style={styles.title}>
                    VidaPlateada
                </LargeText>

                <LargeText size="large" center style={styles.subtitle}>
                    Aprende tecnología mientras cuidas tu salud.
                </LargeText>

                <LargeText size="base" center style={styles.instructions}>
                    {welcomeText}
                </LargeText>
            </View>

            <View style={styles.footer}>
                <AudioButton
                    title="Empezar"
                    audioText="Toca aquí para empezar"
                    onPress={handleNext}
                    icon={<HeartPulse color="#FFFFFF" size={24} />}
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: theme.spacing.xl,
        padding: theme.spacing.l,
        backgroundColor: theme.colors.surface,
        borderRadius: 60,
    },
    title: {
        marginBottom: theme.spacing.m,
    },
    subtitle: {
        marginBottom: theme.spacing.xl,
        color: theme.colors.textLight,
    },
    instructions: {
        paddingHorizontal: theme.spacing.m,
        lineHeight: 32,
    },
    footer: {
        marginTop: 'auto',
        paddingVertical: theme.spacing.l,
    },
});
