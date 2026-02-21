import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import * as Speech from 'expo-speech';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { LargeText } from '../../components/LargeText';
import { AudioButton } from '../../components/AudioButton';
import { theme } from '../../styles/theme';
import { Users, Phone, ArrowRight } from 'lucide-react-native';

export const TrustedContactScreen = () => {
    const navigation = useNavigation();
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');

    useEffect(() => {
        Speech.speak("Finalmente, ¿quién te ayuda con el celular? Puede ser un hijo o nieto. Esto es para avisarle si tienes una emergencia.", { language: 'es-PE' });
        return () => { Speech.stop(); };
    }, []);

    const navigateToMain = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'MainTabs' }],
            })
        );
    };

    const handleNext = () => {
        Speech.stop();
        if (contactName.trim() && contactPhone.trim()) {
            Speech.speak("¡Excelente! Hemos terminado. Ahora vamos al menú principal.", { language: 'es-PE' });
            setTimeout(() => navigateToMain(), 3000);
        } else {
            Speech.speak("Por favor, llena ambos campos para continuar. O puedes saltar este paso si quieres.", { language: 'es-PE' });
        }
    };

    const skipStep = () => {
        Speech.stop();
        Speech.speak("Vamos al menú principal.", { language: 'es-PE' });
        setTimeout(() => navigateToMain(), 1500);
    }

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <Users color={theme.colors.primary} size={48} />
                <LargeText size="xlarge" weight="bold" color={theme.colors.primary} style={styles.title}>
                    Persona de Confianza
                </LargeText>
            </View>

            <LargeText size="large" style={styles.subtitle}>
                Agrega un familiar o cuidador. Le avisaremos si tus indicadores de salud no están bien.
            </LargeText>

            <View style={styles.inputContainer}>
                <LargeText size="large" weight="bold" style={styles.label}>
                    ¿Cómo se llama tu familiar?
                </LargeText>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de tu hijo/nieto"
                    placeholderTextColor={theme.colors.textLight}
                    value={contactName}
                    onChangeText={setContactName}
                    autoCapitalize="words"
                    accessibilityLabel="Campo para nombre del contacto"
                />
            </View>

            <View style={styles.inputContainer}>
                <LargeText size="large" weight="bold" style={styles.label}>
                    ¿Cuál es su número de celular?
                </LargeText>
                <View style={styles.phoneInputRow}>
                    <View style={styles.phoneIcon}>
                        <Phone color={theme.colors.textLight} size={24} />
                    </View>
                    <TextInput
                        style={[styles.input, styles.phoneInputFlex]}
                        placeholder="Ejemplo: 987 654 321"
                        placeholderTextColor={theme.colors.textLight}
                        value={contactPhone}
                        onChangeText={setContactPhone}
                        keyboardType="phone-pad"
                        maxLength={11}
                        accessibilityLabel="Campo para número de celular"
                    />
                </View>
            </View>

            <View style={styles.footer}>
                <AudioButton
                    title="Terminar"
                    audioText="Toca aquí para terminar el registro"
                    onPress={handleNext}
                    icon={<ArrowRight color="#FFFFFF" size={24} />}
                    disabled={!contactName || !contactPhone}
                    style={(!contactName || !contactPhone) ? { opacity: 0.5 } : {}}
                />
                <AudioButton
                    title="Saltar por ahora"
                    audioText="Saltar este paso por ahora"
                    variant="outline"
                    onPress={skipStep}
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    title: {
        marginLeft: theme.spacing.m,
    },
    subtitle: {
        marginBottom: theme.spacing.xl,
    },
    inputContainer: {
        marginBottom: theme.spacing.xl,
    },
    label: {
        marginBottom: theme.spacing.m,
    },
    input: {
        borderWidth: 2,
        borderColor: theme.colors.border,
        borderRadius: theme.layout.borderRadius,
        padding: theme.spacing.m,
        fontSize: theme.typography.size.large,
        backgroundColor: '#FFFFFF',
        color: theme.colors.text,
        minHeight: theme.layout.touchTarget,
        marginBottom: theme.spacing.s,
    },
    phoneInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    phoneIcon: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.m,
        borderWidth: 2,
        borderColor: theme.colors.border,
        borderRadius: theme.layout.borderRadius,
        minHeight: theme.layout.touchTarget,
        justifyContent: 'center',
        marginRight: theme.spacing.s,
        marginBottom: theme.spacing.s,
    },
    phoneInputFlex: {
        flex: 1,
    },
    footer: {
        marginTop: 'auto',
        paddingVertical: theme.spacing.l,
    },
});
