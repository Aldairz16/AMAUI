import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { LargeText } from '../../components/LargeText';
import { AudioButton } from '../../components/AudioButton';
import { theme } from '../../styles/theme';
import { User, ArrowRight } from 'lucide-react-native';

export const BasicInfoScreen = () => {
    const navigation = useNavigation<any>();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        Speech.speak("Por favor, dime cómo te llamas y cuántos años tienes. Toca el recuadro blanco para escribir.", { language: 'es-PE' });
        return () => { Speech.stop(); };
    }, []);

    const handleNext = () => {
        Speech.stop();
        if (name.trim() && age.trim()) {
            navigation.navigate('HealthConditions');
        } else {
            Speech.speak("Por favor, llena ambos campos para continuar.", { language: 'es-PE' });
        }
    };

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <User color={theme.colors.primary} size={48} />
                <LargeText size="xlarge" weight="bold" color={theme.colors.primary} style={styles.title}>
                    Tus Datos
                </LargeText>
            </View>

            <LargeText size="large" style={styles.subtitle}>
                Queremos conocerte mejor.
            </LargeText>

            <View style={styles.inputContainer}>
                <LargeText size="large" weight="bold" style={styles.label}>
                    ¿Cuál es tu nombre?
                </LargeText>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe tu nombre aquí"
                    placeholderTextColor={theme.colors.textLight}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    accessibilityLabel="Campo para ingresar tu nombre"
                />
                <AudioButton
                    title="Escuchar instrucción"
                    audioText="Toca el recuadro blanco de arriba para escribir tu nombre."
                    variant="outline"
                />
            </View>

            <View style={styles.inputContainer}>
                <LargeText size="large" weight="bold" style={styles.label}>
                    ¿Cuántos años tienes?
                </LargeText>
                <TextInput
                    style={styles.input}
                    placeholder="Ejemplo: 65"
                    placeholderTextColor={theme.colors.textLight}
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                    maxLength={3}
                    accessibilityLabel="Campo para ingresar tu edad en números"
                />
            </View>

            <View style={styles.footer}>
                <AudioButton
                    title="Siguiente"
                    audioText="Toca aquí para ir al siguiente paso"
                    onPress={handleNext}
                    icon={<ArrowRight color="#FFFFFF" size={24} />}
                    disabled={!name || !age}
                    style={(!name || !age) ? { opacity: 0.5 } : {}}
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
        fontSize: theme.typography.size.large, // Large text for input
        backgroundColor: '#FFFFFF',
        color: theme.colors.text,
        minHeight: theme.layout.touchTarget,
        marginBottom: theme.spacing.s,
    },
    footer: {
        marginTop: 'auto',
        paddingVertical: theme.spacing.l,
    },
});
