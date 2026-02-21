import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import * as Speech from 'expo-speech';
import { theme } from '../styles/theme';

interface YachayFABProps {
    textToRead?: string;
}

export const YachayFAB: React.FC<YachayFABProps> = ({ textToRead }) => {
    const handlePress = () => {
        Speech.stop();
        if (textToRead) {
            Speech.speak(textToRead, { language: 'es-PE' });
        } else {
            Speech.speak("Hola, soy Yachay. Estoy aquí para ayudarte a leer la pantalla.", { language: 'es-PE' });
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.fab}
                onPress={handlePress}
                accessibilityLabel="Botón Yachay. Toca para que te lea la pantalla en voz alta."
                accessibilityRole="button"
            >
                {/* Placeholder image from assets - assuming Icono de Amaui was copied to assets/icon.png */}
                <Image
                    source={require('../../assets/icon.png')}
                    style={styles.avatar}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: theme.spacing.xl,
        right: theme.spacing.m,
        zIndex: 999, // Ensure it floats above everything
        ...theme.shadows.puffy,
    },
    fab: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: theme.colors.secondary,
        overflow: 'hidden',
    },
    avatar: {
        width: 80,
        height: 80,
    }
});
