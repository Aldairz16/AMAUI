import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { theme } from '../styles/theme';
import { YachayFAB } from './YachayFAB';

interface ScreenWrapperProps {
    children: React.ReactNode;
    scrollable?: boolean;
    yachayText?: string;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
    children,
    scrollable = true,
    yachayText,
}) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            {scrollable ? (
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    {children}
                </ScrollView>
            ) : (
                <View style={[styles.container, styles.contentContainer]}>
                    {children}
                </View>
            )}
            <YachayFAB textToRead={yachayText} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    contentContainer: {
        padding: theme.spacing.l,
        flexGrow: 1,
    },
});
