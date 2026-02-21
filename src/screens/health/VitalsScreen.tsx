import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { LargeText } from '../../components/LargeText';
import { AudioButton } from '../../components/AudioButton';
import { theme } from '../../styles/theme';
import { Heart, Droplet, CheckCircle } from 'lucide-react-native';

export const VitalsScreen = () => {
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [glucose, setGlucose] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        Speech.speak("Aquí puedes registrar tu presión y tu nivel de azúcar. Toca los recuadros blancos para usar el teclado numérico.", { language: 'es-PE' });
        return () => { Speech.stop(); };
    }, []);

    const handleSave = () => {
        Speech.stop();
        setSaved(true);
        Speech.speak("He guardado tus datos de hoy. Todo parece estar en orden.", { language: 'es-PE' });

        // Check ranges (Simple MVP logic for Smart Alerts)
        const sys = parseInt(systolic);
        if (sys > 140) {
            setTimeout(() => {
                Speech.speak("Noté que tu presión está un poco alta. Por favor, descansa. Le avisaremos a tu contacto si esto se repite.", { language: 'es-PE' });
            }, 4000);
        }
    };

    if (saved) {
        return (
            <ScreenWrapper scrollable={false}>
                <View style={styles.successContainer}>
                    <CheckCircle color={theme.colors.primary} size={80} style={styles.successIcon} />
                    <LargeText size="xlarge" weight="bold" color={theme.colors.primary} center>
                        ¡Datos Guardados!
                    </LargeText>
                    <LargeText center style={styles.successSub}>
                        Gracias por cuidarte hoy.
                    </LargeText>
                    <AudioButton
                        title="Registrar nuevos datos"
                        audioText="Toca aquí si quieres corregir tus datos"
                        variant="outline"
                        onPress={() => setSaved(false)}
                        style={{ marginTop: theme.spacing.xl }}
                    />
                </View>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <LargeText size="xlarge" weight="bold" color={theme.colors.primary}>
                    Tus Indicadores
                </LargeText>
                <LargeText style={styles.subtitle}>
                    Registra tus datos diarios
                </LargeText>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Heart color={theme.colors.danger} size={32} />
                    <LargeText size="large" weight="bold" style={styles.sectionTitle}>
                        Presión Arterial
                    </LargeText>
                </View>
                <View style={styles.row}>
                    <View style={styles.inputWrapper}>
                        <LargeText style={styles.label}>Alta (Sistólica)</LargeText>
                        <TextInput
                            style={styles.input}
                            placeholder="Ej. 120"
                            placeholderTextColor={theme.colors.textLight}
                            keyboardType="number-pad"
                            maxLength={3}
                            value={systolic}
                            onChangeText={setSystolic}
                            accessibilityLabel="Ingresa tu presión alta"
                        />
                    </View>
                    <View style={styles.inputSpacer} />
                    <View style={styles.inputWrapper}>
                        <LargeText style={styles.label}>Baja (Diastólica)</LargeText>
                        <TextInput
                            style={styles.input}
                            placeholder="Ej. 80"
                            placeholderTextColor={theme.colors.textLight}
                            keyboardType="number-pad"
                            maxLength={3}
                            value={diastolic}
                            onChangeText={setDiastolic}
                            accessibilityLabel="Ingresa tu presión baja"
                        />
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Droplet color={theme.colors.secondary} size={32} />
                    <LargeText size="large" weight="bold" style={styles.sectionTitle}>
                        Azúcar / Glucosa
                    </LargeText>
                </View>
                <View style={styles.inputWrapper}>
                    <LargeText style={styles.label}>Nivel mg/dL</LargeText>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej. 100"
                        placeholderTextColor={theme.colors.textLight}
                        keyboardType="number-pad"
                        maxLength={3}
                        value={glucose}
                        onChangeText={setGlucose}
                        accessibilityLabel="Ingresa tu nivel de azúcar"
                    />
                </View>
            </View>

            <View style={styles.footer}>
                <AudioButton
                    title="Guardar Datos"
                    audioText="Toca aquí para guardar tu información"
                    onPress={handleSave}
                    icon={<CheckCircle color="#FFFFFF" size={24} />}
                    disabled={!systolic && !diastolic && !glucose}
                    style={(!systolic && !diastolic && !glucose) ? { opacity: 0.5 } : {}}
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: theme.spacing.xl,
    },
    subtitle: {
        color: theme.colors.textLight,
        marginTop: theme.spacing.s,
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: theme.layout.borderRadius,
        padding: theme.spacing.m,
        borderWidth: 2,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    sectionTitle: {
        marginLeft: theme.spacing.s,
    },
    row: {
        flexDirection: 'row',
    },
    inputWrapper: {
        flex: 1,
    },
    inputSpacer: {
        width: theme.spacing.m,
    },
    label: {
        marginBottom: theme.spacing.s,
        fontWeight: 'bold',
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
        textAlign: 'center',
    },
    footer: {
        marginTop: 'auto',
        paddingTop: theme.spacing.l,
    },
    successContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.l,
    },
    successIcon: {
        marginBottom: theme.spacing.l,
    },
    successSub: {
        marginTop: theme.spacing.m,
        color: theme.colors.textLight,
    },
});
