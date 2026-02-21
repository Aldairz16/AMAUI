import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

interface LargeTextProps extends TextProps {
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';
    size?: 'small' | 'base' | 'large' | 'xlarge' | 'xxlarge';
    color?: string;
    center?: boolean;
}

export const LargeText: React.FC<LargeTextProps> = ({
    style,
    weight = 'normal',
    size = 'base',
    color = theme.colors.text,
    center,
    ...props
}) => {
    return (
        <Text
            style={[
                styles.text,
                {
                    fontSize: theme.typography.size[size],
                    fontWeight: theme.typography.weight[weight],
                    color,
                    textAlign: center ? 'center' : 'left',
                },
                style,
            ]}
            // Accessibility defaults
            accessible={true}
            allowFontScaling={true}
            maxFontSizeMultiplier={1.5}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    text: {
        // Basic text styles apply here, overridden by inline styles
    },
});
