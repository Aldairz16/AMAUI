import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { LargeText } from '../../components/LargeText';
import { theme } from '../../styles/theme';
import { BookOpen, Lock, CheckCircle, Smartphone, MessageCircle, Wallet } from 'lucide-react-native';

const LEVELS = [
    {
        id: 1,
        title: 'Nivel 1: Primeros Pasos',
        description: 'Aprende a usar lo básico de tu celular.',
        icon: Smartphone,
        status: 'unlocked', // 'completed', 'unlocked', 'locked'
        lessons: ['Volumen y Brillo', 'Conectarse a WiFi', 'Hacer una llamada'],
    },
    {
        id: 2,
        title: 'Nivel 2: Comunicación',
        description: 'Aprende a usar WhatsApp y enviar fotos.',
        icon: MessageCircle,
        status: 'completed', // Marcamos el 2 como completado para propósitos de demo
        lessons: ['Enviar mensaje', 'Enviar foto', 'Llamada por WhatsApp'],
    },
    {
        id: 3,
        title: 'Nivel 3: Trámites y Finanzas',
        description: 'Aprende a usar Yape con seguridad.',
        icon: Wallet,
        status: 'unlocked', // Desbloqueado para la demo
        lessons: ['Enviar con Yape', 'Detectar estafas'],
    }
];

export const LessonsScreen = () => {
    const navigation = useNavigation<any>();

    useEffect(() => {
        Speech.speak("Bienvenido a tu escuela digital. Aquí aprenderás a usar tu celular mientras cuidas tu salud. El nivel 1 está desbloqueado para ti.", { language: 'es-PE' });
        return () => { Speech.stop(); };
    }, []);

    const handleLessonPress = (level: any) => {
        Speech.stop();
        if (level.status === 'locked') {
            Speech.speak(`El ${level.title} está bloqueado. Usa la aplicación de salud unos días más para desbloquearlo.`, { language: 'es-PE' });
        } else {
            Speech.speak(`Vamos a empezar el ${level.title}.`, { language: 'es-PE' });
            if (level.id === 2) {
                navigation.navigate('WhatsappSimulator');
            } else if (level.id === 3) {
                navigation.navigate('YapeSimulator');
            }
        }
    };

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <BookOpen color={theme.colors.primary} size={48} />
                <LargeText size="xlarge" weight="bold" color={theme.colors.primary} style={styles.title}>
                    Aprender
                </LargeText>
            </View>

            <LargeText style={styles.subtitle}>
                Tus logros y clases para usar mejor tu celular.
            </LargeText>

            <View style={styles.progressCard}>
                <LargeText weight="bold" size="large" style={styles.progressTitle}>
                    Tu Nivel Actual: Principiante
                </LargeText>
                <LargeText style={styles.progressText}>
                    Sigue tomando tus medicinas para ganar puntos y desbloquear nuevos cursos.
                </LargeText>
            </View>

            <View style={styles.levelsContainer}>
                {LEVELS.map((level) => {
                    const Icon = level.icon;
                    const isLocked = level.status === 'locked';
                    const isCompleted = level.status === 'completed';

                    return (
                        <TouchableOpacity
                            key={level.id}
                            style={[
                                styles.levelCard,
                                isLocked && styles.levelCardLocked,
                                isCompleted && styles.levelCardCompleted,
                            ]}
                            onPress={() => handleLessonPress(level)}
                            accessible={true}
                            accessibilityLabel={`${level.title}. ${isLocked ? 'Bloqueado' : 'Desbloqueado'}`}
                        >
                            <View style={styles.levelHeader}>
                                <View style={[styles.iconBox, isLocked && styles.iconBoxLocked]}>
                                    {isLocked ? (
                                        <Lock color={theme.colors.textLight} size={32} />
                                    ) : isCompleted ? (
                                        <CheckCircle color="#FFFFFF" size={32} />
                                    ) : (
                                        <Icon color={theme.colors.primary} size={32} />
                                    )}
                                </View>
                                <View style={styles.levelTextContainer}>
                                    <LargeText weight="bold" size="large" color={isLocked ? theme.colors.textLight : theme.colors.text}>
                                        {level.title}
                                    </LargeText>
                                    <LargeText style={[styles.levelDesc, isLocked && { color: theme.colors.textLight }]}>
                                        {level.description}
                                    </LargeText>
                                </View>
                            </View>

                            {!isLocked && (
                                <View style={styles.lessonList}>
                                    {level.lessons.map((lesson, idx) => (
                                        <View key={idx} style={styles.lessonItem}>
                                            <View style={styles.bullet} />
                                            <LargeText size="base">{lesson}</LargeText>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
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
        color: theme.colors.textLight,
    },
    progressCard: {
        backgroundColor: '#F0FDF4', // Light green
        padding: theme.spacing.m,
        borderRadius: theme.layout.borderRadius,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        marginBottom: theme.spacing.xl,
    },
    progressTitle: {
        color: theme.colors.primary,
        marginBottom: theme.spacing.s,
    },
    progressText: {
        color: theme.colors.text,
    },
    levelsContainer: {
        paddingBottom: theme.spacing.xl,
    },
    levelCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: theme.layout.borderRadius,
        borderWidth: 2,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.l,
        padding: theme.spacing.m,
    },
    levelCardLocked: {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
    },
    levelCardCompleted: {
        borderColor: theme.colors.primary,
    },
    levelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.m,
    },
    iconBoxLocked: {
        backgroundColor: '#E0E0E0',
    },
    levelTextContainer: {
        flex: 1,
    },
    levelDesc: {
        marginTop: theme.spacing.s,
    },
    lessonList: {
        marginTop: theme.spacing.m,
        paddingTop: theme.spacing.m,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    lessonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.s,
    },
    bullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
        marginRight: theme.spacing.m,
    },
});
