import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { LargeText } from '../../components/LargeText';
import { AudioButton } from '../../components/AudioButton';
import { theme } from '../../styles/theme';
import { TrendingUp } from 'lucide-react-native';

const MOCK_DATA = [
    { day: 'Lun', value: 120, status: 'green' },
    { day: 'Mar', value: 130, status: 'yellow' },
    { day: 'Mié', value: 145, status: 'red' },
    { day: 'Jue', value: 125, status: 'green' },
    { day: 'Vie', value: 122, status: 'green' },
];

export const ProgressScreen = () => {

    useEffect(() => {
        Speech.speak("Aquí puedes ver cómo ha estado tu salud esta semana. Tienes 3 días en verde, muy bien. Pero el miércoles estuvo en rojo. Recuerda tomar tus pastillas.", { language: 'es-PE' });
        return () => { Speech.stop(); };
    }, []);

    const getColor = (status: string) => {
        if (status === 'green') return theme.colors.primary;
        if (status === 'yellow') return theme.colors.warning;
        return theme.colors.danger;
    };

    const speakChartInfo = () => {
        Speech.stop();
        Speech.speak("El color verde significa que tu presión está perfecta. El amarillo, que debes tener cuidado. El rojo, que estuvo alta. Si ves muchos rojos, llama a tu doctor.", { language: 'es-PE' });
    };

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <TrendingUp color={theme.colors.primary} size={48} />
                <LargeText size="xlarge" weight="bold" color={theme.colors.primary} style={styles.title}>
                    Tu Progreso
                </LargeText>
            </View>

            <LargeText style={styles.subtitle}>
                Resumen de tu Presión Arterial esta semana
            </LargeText>

            <View style={styles.chartContainer}>
                {MOCK_DATA.map((item, index) => {
                    // Normalize height for illustration
                    const barHeight = (item.value / 150) * 150;
                    const barColor = getColor(item.status);

                    return (
                        <View key={index} style={styles.barColumn}>
                            <View style={[styles.bar, { height: barHeight, backgroundColor: barColor }]} />
                            <LargeText weight="bold" style={styles.dayLabel}>{item.day}</LargeText>
                        </View>
                    );
                })}
            </View>

            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: theme.colors.primary }]} />
                    <LargeText>Normal</LargeText>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: theme.colors.warning }]} />
                    <LargeText>Alerta</LargeText>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: theme.colors.danger }]} />
                    <LargeText>Alta</LargeText>
                </View>
            </View>

            <View style={styles.actionContainer}>
                <AudioButton
                    title="¿Qué significan los colores?"
                    audioText="Toca aquí para escuchar la explicación de los colores."
                    variant="outline"
                    onPress={speakChartInfo}
                />
                <AudioButton
                    title="Compartir con el doctor"
                    audioText="Compartir gráfico con el doctor"
                    icon={<TrendingUp color="#FFFFFF" size={24} />}
                    onPress={() => {
                        Speech.stop();
                        Speech.speak("Al compartir, se genera un documento para tu doctor o cuidador.", { language: 'es-PE' });
                    }}
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
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 200,
        padding: theme.spacing.m,
        backgroundColor: '#FFFFFF',
        borderRadius: theme.layout.borderRadius,
        borderWidth: 2,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.l,
    },
    barColumn: {
        alignItems: 'center',
    },
    bar: {
        width: 40,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        marginBottom: theme.spacing.s,
    },
    dayLabel: {
        fontSize: 16, // slightly smaller to fit
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: theme.spacing.xl,
        padding: theme.spacing.m,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.layout.borderRadius,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: theme.spacing.s,
    },
    actionContainer: {
        marginTop: 'auto',
        paddingBottom: theme.spacing.l,
    },
});
