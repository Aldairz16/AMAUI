import React from 'react';
import { TouchableOpacity, StyleSheet, View, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';
import * as Speech from 'expo-speech';
import { Volume2 } from 'lucide-react-native';
import { LargeText } from './LargeText';
import { theme } from '../styles/theme';

interface AudioButtonProps extends TouchableOpacityProps {
    title: string;
    audioText?: string; // What to read aloud. Defaults to title.
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    icon?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
    title,
    audioText,
    variant = 'primary',
    icon,
    style,
    containerStyle,
    onPress,
    ...props
}) => {
    const getColors = () => {
        switch (variant) {
            case 'secondary':
                return { bg: theme.colors.secondary, text: '#FFFFFF', border: theme.colors.secondary };
            case 'outline':
                return { bg: 'transparent', text: theme.colors.primary, border: theme.colors.border };
            case 'danger':
                return { bg: theme.colors.danger, text: '#FFFFFF', border: theme.colors.danger };
            case 'primary':
            default:
                return { bg: theme.colors.success, text: '#FFFFFF', border: theme.colors.success };
        }
    };

    const colors = getColors();
    const isOutline = variant === 'outline';

    const handlePress = (e: any) => {
        // Optional: Auto-play speech on press if desired, or let a separate voice button handle it.
        // For now, we'll let the button just execute its action.
        if (onPress) {
            onPress(e);
        }
    };

    const playAudio = () => {
        Speech.stop();
        Speech.speak(audioText || title, { language: 'es-PE' });
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: colors.bg, borderColor: colors.border },
                    !isOutline && theme.shadows.puffy,
                    style,
                ]}
                onPress={handlePress}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={title}
                {...props}
            >
                <View style={styles.content}>
                    <TouchableOpacity onPress={playAudio} style={styles.audioIcon} accessibilityLabel="Escuchar botón" accessibilityRole="button">
                        <Volume2 color={colors.text} size={24} />
                    </TouchableOpacity>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <LargeText weight="bold" color={colors.text} style={styles.title}>
                        {title}
                    </LargeText>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: theme.spacing.s,
        width: '100%',
    },
    button: {
        minHeight: theme.layout.touchTarget,
        borderRadius: theme.layout.borderRadius,
        borderWidth: 2,
        justifyContent: 'center',
        paddingHorizontal: theme.spacing.m,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    audioIcon: {
        padding: theme.spacing.s,
        marginRight: theme.spacing.s,
    },
    iconContainer: {
        marginRight: theme.spacing.s,
    },
    title: {
        flex: 1,
    },
});
