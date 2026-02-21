import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { LargeText } from '../../components/LargeText';
import { AudioButton } from '../../components/AudioButton';
import { theme } from '../../styles/theme';
import { Heart, Droplet, Bone, ArrowRight, Activity } from 'lucide-react-native';

const CONDITIONS = [
    { id: 'hypertension', label: 'Presión Alta (Hipertensión)', icon: Heart },
    { id: 'diabetes', label: 'Diabetes (Azúcar en la sangre)', icon: Droplet },
    { id: 'arthritis', label: 'Artritis (Dolor en huesos)', icon: Bone },
];

export const HealthConditionsScreen = () => {
    const navigation = useNavigation<any>();
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        Speech.speak("Toca las opciones que correspondan a tu salud. Por ejemplo, presión alta o diabetes. Puedes elegir más de una.", { language: 'es-PE' });
        return () => { Speech.stop(); };
    }, []);

    const toggleCondition = (id: string, label: string) => {
        Speech.stop();
        setSelected((prev) => {
            const isSelected = prev.includes(id);
            if (isSelected) {
                Speech.speak(`Quitaste ${label}`, { language: 'es-PE' });
                return prev.filter(c => c !== id);
            } else {
                Speech.speak(`Seleccionaste ${label}`, { language: 'es-PE' });
                return [...prev, id];
            }
        });
    };

    const handleNext = () => {
        Speech.stop();
        navigation.navigate('TrustedContact');
    };

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <Activity color={theme.colors.primary} size={48} />
                <LargeText size="xlarge" weight="bold" color={theme.colors.primary} style={styles.title}>
                    Tu Salud
                </LargeText>
            </View>

            <LargeText size="large" style={styles.subtitle}>
                ¿Tienes alguna de estas condiciones? Esto nos ayudará a cuidarte mejor.
            </LargeText>

            <View style={styles.list}>
                {CONDITIONS.map((condition) => {
                    const IconComponent = condition.icon;
                    const isSelected = selected.includes(condition.id);

                    return (
                        <TouchableOpacity
                            key={condition.id}
                            style={[
                                styles.card,
                                isSelected && styles.cardSelected
                            ]}
                            onPress={() => toggleCondition(condition.id, condition.label)}
                            accessible={true}
                            accessibilityRole="checkbox"
                            accessibilityState={{ checked: isSelected }}
                            accessibilityLabel={condition.label}
                        >
                            <View style={[styles.iconWrapper, isSelected && styles.iconWrapperSelected]}>
                                <IconComponent color={isSelected ? '#FFFFFF' : theme.colors.primary} size={32} />
                            </View>
                            <LargeText
                                weight={isSelected ? 'bold' : 'normal'}
                                color={isSelected ? theme.colors.primary : theme.colors.text}
                                style={styles.cardText}
                            >
                                {condition.label}
                            </LargeText>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.footer}>
                <AudioButton
                    title={selected.length > 0 ? "Siguiente" : "No tengo ninguna, siguiente"}
                    audioText="Toca aquí para ir al siguiente paso"
                    onPress={handleNext}
                    icon={<ArrowRight color="#FFFFFF" size={24} />}
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
    list: {
        marginBottom: theme.spacing.xl,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.m,
        borderRadius: theme.layout.borderRadius,
        borderWidth: 2,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.m,
        backgroundColor: '#FFFFFF',
        minHeight: theme.layout.touchTarget,
    },
    cardSelected: {
        borderColor: theme.colors.primary,
        backgroundColor: '#F0FDF4', // Very light green
    },
    iconWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.m,
    },
    iconWrapperSelected: {
        backgroundColor: theme.colors.primary,
    },
    cardText: {
        flex: 1,
    },
    footer: {
        marginTop: 'auto',
        paddingVertical: theme.spacing.l,
    },
});
