import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { LargeText } from '../../components/LargeText';
import { theme } from '../../styles/theme';
import { ArrowLeft, Send, Search, CheckCircle } from 'lucide-react-native';

export const YapeSimulatorScreen = () => {
    const navigation = useNavigation();
    const [amount, setAmount] = useState('');
    const [step, setStep] = useState(1); // 1 = monto, 2 = exito

    useEffect(() => {
        Speech.speak("Vamos a practicar usar Yape. Digita el monto que quieres enviar usando el teclado de abajo, y luego toca el botón morado que dice Yapear.", { language: 'es-PE' });
        return () => { Speech.stop(); };
    }, []);

    const handleYapeo = () => {
        if (amount && parseFloat(amount) > 0) {
            Speech.stop();
            setStep(2);
            Speech.speak("¡Excelente! Has hecho tu primer Yapeo de práctica. Ahora sabes cómo enviar dinero de forma segura.", { language: 'es-PE' });
        } else {
            Speech.stop();
            Speech.speak("Por favor, ingresa un monto mayor a cero para continuar.", { language: 'es-PE' });
        }
    };

    if (step === 2) {
        return (
            <View style={[styles.container, styles.successBg]}>
                <View style={styles.successContent}>
                    <CheckCircle color="#FFFFFF" size={80} style={styles.successIcon} />
                    <LargeText size="xlarge" weight="bold" color="#FFFFFF" center>
                        ¡Yapeo Exitoso!
                    </LargeText>
                    <LargeText size="large" color="#FFFFFF" center style={styles.amountSuccess}>
                        S/ {parseFloat(amount).toFixed(2)}
                    </LargeText>
                    <LargeText color="#FFFFFF" center style={styles.destinationSuccess}>
                        Para: Tu Nieto
                    </LargeText>

                    <View style={styles.successBadge}>
                        <LargeText weight="bold" color={theme.colors.primary} center>
                            🏆 ¡Lección Superada!
                        </LargeText>
                    </View>

                    <TouchableOpacity
                        style={styles.finishButton}
                        onPress={() => navigation.goBack()}
                        accessibilityLabel="Terminar práctica y volver"
                    >
                        <LargeText weight="bold" color="#7B22D3">
                            Volver a Lecciones
                        </LargeText>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Fake Yape Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Volver">
                    <ArrowLeft color="#FFFFFF" size={28} />
                </TouchableOpacity>
                <LargeText weight="bold" color="#FFFFFF" style={styles.headerTitle}>
                    Yapear
                </LargeText>
                <View style={{ width: 28 }} />
            </View>

            <ScreenWrapper scrollable={true}>
                {/* Fake Contact Selector */}
                <View style={styles.contactSection}>
                    <LargeText weight="bold" style={styles.label}>¿A quién deseas yapear?</LargeText>
                    <View style={styles.contactCard}>
                        <View style={styles.avatar}>
                            <LargeText weight="bold" color="#FFFFFF">TN</LargeText>
                        </View>
                        <View style={styles.contactInfo}>
                            <LargeText weight="bold">Tu Nieto</LargeText>
                            <LargeText color={theme.colors.textLight}>987 654 321</LargeText>
                        </View>
                    </View>
                </View>

                {/* Amount Input */}
                <View style={styles.amountSection}>
                    <LargeText color={theme.colors.primary} weight="bold" style={styles.currencyPrefix}>
                        S/
                    </LargeText>
                    <TextInput
                        style={styles.amountInput}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="decimal-pad"
                        placeholder="0.00"
                        placeholderTextColor={theme.colors.textLight}
                        maxLength={6}
                        accessibilityLabel="Ingresa el monto a yapear en soles"
                    />
                </View>

                {/* Message Input (Optional) */}
                <View style={styles.messageSection}>
                    <TextInput
                        style={styles.messageInput}
                        placeholder="Agregar un mensaje (opcional)"
                        placeholderTextColor={theme.colors.textLight}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.yapeButton, (!amount || parseFloat(amount) <= 0) && styles.yapeButtonDisabled]}
                    onPress={handleYapeo}
                    disabled={!amount || parseFloat(amount) <= 0}
                    accessibilityLabel="Botón para confirmar envío de dinero"
                >
                    <LargeText weight="bold" color="#FFFFFF">
                        Yapear
                    </LargeText>
                </TouchableOpacity>

            </ScreenWrapper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    successBg: {
        backgroundColor: '#7B22D3', // Yape purple
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#7B22D3', // Yape purple
        paddingTop: 50,
        paddingBottom: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 20,
    },
    contactSection: {
        marginBottom: theme.spacing.xl,
    },
    label: {
        marginBottom: theme.spacing.m,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: theme.spacing.m,
        borderRadius: theme.layout.borderRadius,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.m,
    },
    contactInfo: {
        flex: 1,
    },
    amountSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: theme.spacing.xl,
        paddingVertical: theme.spacing.l,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    currencyPrefix: {
        fontSize: 40,
        marginRight: theme.spacing.s,
        color: '#7B22D3',
    },
    amountInput: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#7B22D3',
        minWidth: 150,
    },
    messageSection: {
        marginBottom: theme.spacing.xl,
    },
    messageInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: theme.layout.borderRadius,
        padding: theme.spacing.m,
        fontSize: 18,
        borderWidth: 1,
        borderColor: theme.colors.border,
        minHeight: theme.layout.touchTarget,
    },
    yapeButton: {
        backgroundColor: '#7B22D3',
        borderRadius: theme.layout.borderRadius,
        paddingVertical: theme.spacing.m,
        alignItems: 'center',
        minHeight: theme.layout.touchTarget,
        justifyContent: 'center',
        marginTop: theme.spacing.xl,
    },
    yapeButtonDisabled: {
        opacity: 0.5,
    },
    successContent: {
        alignItems: 'center',
        width: '100%',
        padding: theme.spacing.l,
    },
    successIcon: {
        marginBottom: theme.spacing.l,
    },
    amountSuccess: {
        fontSize: 48,
        marginVertical: theme.spacing.m,
    },
    destinationSuccess: {
        marginBottom: theme.spacing.xl,
    },
    successBadge: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        marginBottom: theme.spacing.xxl,
    },
    finishButton: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.m,
        borderRadius: 24,
        minHeight: theme.layout.touchTarget,
        justifyContent: 'center',
    },
});
