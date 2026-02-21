import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as Speech from 'expo-speech';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { LargeText } from '../../components/LargeText';
import { AudioButton } from '../../components/AudioButton';
import { theme } from '../../styles/theme';
import { CheckCircle, Clock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const MOCK_MEDICATION = {
    id: '1',
    name: 'Losartán 50mg',
    time: '08:00 AM',
    condition: 'Presión Alta',
};

export const MedicationScreen = () => {
    const navigation = useNavigation<any>();
    const [taken, setTaken] = useState(false);
    const audioGreeting = `Hola, Amable! ¿Ya tomaste tu pastilla de las ${MOCK_MEDICATION.time}?`;

    useEffect(() => {
        if (!taken) {
            Speech.speak(audioGreeting, { language: 'es-PE' });
        }
        return () => { Speech.stop(); };
    }, [taken]);

    const handleTakePill = () => {
        Speech.stop();
        setTaken(true);
        Speech.speak("¡Excelente! He registrado que tomaste tu medicina. Sigue así.", { language: 'es-PE' });
    };

    const handleRemindLater = () => {
        Speech.stop();
        Speech.speak("De acuerdo, te recordaré en 15 minutos.", { language: 'es-PE' });
    };

    return (
        <ScreenWrapper scrollable={false} yachayText={audioGreeting}>
            <View style={styles.header}>
                <LargeText size="xxlarge" weight="bold" color={theme.colors.primary} style={styles.headerTitle}>
                    ¡Hola, Amable!
                </LargeText>
                <View style={styles.avatarContainer}>
                    <Image source={require('../../assets/icon.png')} style={styles.avatar} />
                </View>
            </View>

            <View style={styles.centerZone}>
                <LargeText size="xlarge" weight="bold" color={theme.colors.text} center style={styles.questionText}>
                    ¿Ya tomaste tu pastilla de las {MOCK_MEDICATION.time}?
                </LargeText>

                <View style={styles.pillCard}>
                    <LargeText size="xlarge" weight="bold" center color={theme.colors.primary}>
                        {MOCK_MEDICATION.name}
                    </LargeText>
                    <LargeText size="large" center color={theme.colors.textLight} style={{ marginTop: theme.spacing.s }}>
                        {MOCK_MEDICATION.condition}
                    </LargeText>
                </View>
            </View>

            <View style={styles.actionZone}>
                {!taken ? (
                    <>
                        <AudioButton
                            title="SÍ, YA LA TOMÉ"
                            audioText="Confirmo que ya tomé mi medicina."
                            onPress={handleTakePill}
                            icon={<CheckCircle color="#FFFFFF" size={32} />}
                            style={styles.buttonGiant}
                        />
                        <AudioButton
                            title="RECORDAR EN 15 MIN"
                            audioText="Recordarme más tarde."
                            variant="secondary"
                            onPress={handleRemindLater}
                            icon={<Clock color="#FFFFFF" size={32} />}
                            style={styles.buttonGiantSecondary}
                        />
                    </>
                ) : (
                    <View style={[styles.successContainer, theme.shadows.puffy]}>
                        <CheckCircle color={theme.colors.success} size={80} />
                        <LargeText size="xlarge" weight="bold" color={theme.colors.success} center style={styles.successText}>
                            ¡Pastilla tomada!
                        </LargeText>
                        <LargeText size="large" center color={theme.colors.textLight} style={{ marginTop: theme.spacing.m }}>
                            Buen trabajo cuidando tu salud hoy.
                        </LargeText>
                    </View>
                )}
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.xl,
        marginTop: theme.spacing.m,
    },
    headerTitle: {
        flex: 1,
    },
    avatarContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: theme.colors.secondary,
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    centerZone: {
        flex: 1,
        justifyContent: 'center',
    },
    questionText: {
        marginBottom: theme.spacing.xl,
    },
    pillCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: theme.layout.borderRadius,
        padding: theme.spacing.xl,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.puffy,
    },
    actionZone: {
        paddingBottom: theme.spacing.xxl,
    },
    buttonGiant: {
        minHeight: 100, // BIG Action Button
        marginBottom: theme.spacing.m,
        borderRadius: theme.layout.borderRadius,
    },
    buttonGiantSecondary: {
        minHeight: 80,
        borderRadius: theme.layout.borderRadius,
    },
    successContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.xxl,
        backgroundColor: '#FFFFFF',
        borderRadius: theme.layout.borderRadius,
        borderWidth: 2,
        borderColor: theme.colors.success,
    },
    successText: {
        marginTop: theme.spacing.m,
    },
});
