import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { LargeText } from '../../components/LargeText';
import { theme } from '../../styles/theme';
import { User, Phone, Settings, Activity, ArrowLeft } from 'lucide-react-native';

export const ProfileScreen = () => {
    const navigation = useNavigation();
    const audioGreeting = "Este es tu perfil. Aquí puedes ver tu información, tus males registrados, y el número de tu persona de confianza.";

    const handleOptionPress = (optionName: string) => {
        Speech.stop();
        Speech.speak(`Has tocado la opción: ${optionName}`, { language: 'es-PE' });
        // Future: Navigate to specific edit screens
    };

    return (
        <ScreenWrapper yachayText={audioGreeting}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        Speech.stop();
                        navigation.goBack();
                    }}
                    accessibilityLabel="Volver al inicio"
                    style={styles.backButton}
                >
                    <ArrowLeft color={theme.colors.primary} size={32} />
                </TouchableOpacity>
                <LargeText size="xlarge" weight="bold" color={theme.colors.primary}>
                    Mi Perfil
                </LargeText>
                <View style={{ width: 32 }} />
            </View>

            <View style={styles.topCard}>
                <View style={styles.avatarCircle}>
                    <User color="#FFFFFF" size={50} />
                </View>
                <LargeText size="xlarge" weight="bold" color={theme.colors.primary} style={styles.nameText}>
                    Amable (Tú)
                </LargeText>
                <LargeText size="large" color={theme.colors.textLight}>
                    65 años
                </LargeText>
            </View>

            <View style={styles.settingsList}>
                <LargeText weight="bold" color={theme.colors.textLight} style={styles.sectionTitle}>
                    Información Médica
                </LargeText>

                <TouchableOpacity
                    style={styles.settingCard}
                    onPress={() => handleOptionPress('Mis condiciones de salud')}
                    accessibilityRole="button"
                >
                    <View style={[styles.iconBox, { backgroundColor: '#E8F6F3' }]}>
                        <Activity color={theme.colors.secondary} size={28} />
                    </View>
                    <View style={styles.settingTextContent}>
                        <LargeText weight="bold" size="large">Condiciones</LargeText>
                        <LargeText color={theme.colors.textLight}>Presión Alta, Diabetes</LargeText>
                    </View>
                </TouchableOpacity>

                <LargeText weight="bold" color={theme.colors.textLight} style={styles.sectionTitle}>
                    Seguridad
                </LargeText>

                <TouchableOpacity
                    style={styles.settingCard}
                    onPress={() => handleOptionPress('Persona de Confianza')}
                    accessibilityRole="button"
                >
                    <View style={[styles.iconBox, { backgroundColor: '#FDEBD0' }]}>
                        <Phone color={theme.colors.warning} size={28} />
                    </View>
                    <View style={styles.settingTextContent}>
                        <LargeText weight="bold" size="large">Familiar (Nieto)</LargeText>
                        <LargeText color={theme.colors.textLight}>987 654 321</LargeText>
                    </View>
                </TouchableOpacity>

                <LargeText weight="bold" color={theme.colors.textLight} style={styles.sectionTitle}>
                    Ajustes
                </LargeText>

                <TouchableOpacity
                    style={styles.settingCard}
                    onPress={() => handleOptionPress('Ajustes de la aplicación')}
                    accessibilityRole="button"
                >
                    <View style={[styles.iconBox, { backgroundColor: '#EAECEE' }]}>
                        <Settings color={theme.colors.textLight} size={28} />
                    </View>
                    <View style={styles.settingTextContent}>
                        <LargeText weight="bold" size="large">Ajustes</LargeText>
                        <LargeText color={theme.colors.textLight}>Voz, Notificaciones</LargeText>
                    </View>
                </TouchableOpacity>

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
        paddingTop: theme.spacing.m,
    },
    backButton: {
        padding: theme.spacing.s,
    },
    topCard: {
        alignItems: 'center',
        marginBottom: theme.spacing.xxl,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
        ...theme.shadows.puffy,
    },
    nameText: {
        marginBottom: theme.spacing.s,
    },
    sectionTitle: {
        marginBottom: theme.spacing.m,
        marginTop: theme.spacing.l,
        marginLeft: theme.spacing.s,
    },
    settingsList: {
        paddingBottom: theme.spacing.xxl,
    },
    settingCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: theme.spacing.m,
        borderRadius: theme.layout.borderRadius,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.m,
        ...theme.shadows.puffy,
        minHeight: 80,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.m,
    },
    settingTextContent: {
        flex: 1,
    },
});
