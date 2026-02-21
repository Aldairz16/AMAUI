import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { LargeText } from '../../components/LargeText';
import { theme } from '../../styles/theme';
import { Send, ArrowLeft, Camera, Mic } from 'lucide-react-native';

export const WhatsappSimulatorScreen = () => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState<{ id: string, text: string, sender: 'me' | 'other' }[]>([
        { id: '1', text: 'Hola, ¿cómo estás abuelo?', sender: 'other' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        Speech.speak("Vamos a practicar enviar un mensaje por WhatsApp. Toca el recuadro de abajo para escribir, y luego toca el botón verde con forma de flecha para enviar.", { language: 'es-PE' });
        return () => { Speech.stop(); };
    }, []);

    const handleSend = () => {
        if (inputText.trim()) {
            Speech.stop();
            setMessages([...messages, { id: Date.now().toString(), text: inputText, sender: 'me' }]);
            setInputText('');
            setIsSuccess(true);
            Speech.speak("¡Muy bien! Has enviado tu primer mensaje. Así es como te comunicas con tu familia.", { language: 'es-PE' });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Volver" style={styles.backButton}>
                    <ArrowLeft color="#FFFFFF" size={28} />
                </TouchableOpacity>
                <LargeText weight="bold" color="#FFFFFF" style={styles.headerTitle}>
                    Hijo (Práctica)
                </LargeText>
            </View>

            <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent}>
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        style={[
                            styles.messageBubble,
                            msg.sender === 'me' ? styles.messageMe : styles.messageOther
                        ]}
                    >
                        <LargeText color={msg.sender === 'me' ? '#FFFFFF' : '#000000'} size="base">
                            {msg.text}
                        </LargeText>
                    </View>
                ))}
                {isSuccess && (
                    <View style={styles.successBadge}>
                        <LargeText weight="bold" color={theme.colors.primary} center>
                            🏆 ¡Lección Superada!
                        </LargeText>
                    </View>
                )}
            </ScrollView>

            <View style={styles.inputArea}>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Escribe un mensaje..."
                        placeholderTextColor="#888"
                        value={inputText}
                        onChangeText={setInputText}
                        accessibilityLabel="Escribe tu mensaje aquí"
                    />
                    <TouchableOpacity style={styles.iconButton} accessibilityLabel="Enviar foto (solo práctica)">
                        <Camera color={theme.colors.textLight} size={24} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.sendButton, inputText ? styles.sendButtonActive : styles.sendButtonInactive]}
                    onPress={handleSend}
                    accessibilityLabel="Enviar mensaje"
                >
                    {inputText ? (
                        <Send color="#FFFFFF" size={24} />
                    ) : (
                        <Mic color="#FFFFFF" size={24} />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5DDD5', // Typical WhatsApp web background color mockup
    },
    header: {
        backgroundColor: '#075E54', // WhatsApp green
        paddingTop: 50,
        paddingBottom: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 22,
    },
    chatArea: {
        flex: 1,
    },
    chatContent: {
        padding: 16,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    messageOther: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
    },
    messageMe: {
        alignSelf: 'flex-end',
        backgroundColor: '#056162', // Darker green for me
    },
    successBadge: {
        marginTop: 24,
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: 'transparent',
    },
    inputRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingHorizontal: 16,
        minHeight: 48,
    },
    input: {
        flex: 1,
        fontSize: 18,
        minHeight: 48,
    },
    iconButton: {
        padding: 8,
    },
    sendButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    sendButtonActive: {
        backgroundColor: theme.colors.primary,
    },
    sendButtonInactive: {
        backgroundColor: '#00A884',
    },
});
