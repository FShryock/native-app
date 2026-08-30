import React, { useState } from 'react';
import {
    Modal, View, Text, TextInput, TouchableOpacity,
    StyleSheet, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { postTournamentRegistration } from '../api/postTournamentRegistration';

interface RegisterTeamModalProps {
    visible: boolean;
    tournamentId: number;
    tournamentName: string;
    onClose: () => void;
    onRegistered: () => void;
}

export default function RegisterTeamModal({
    visible,
    tournamentId,
    tournamentName,
    onClose,
    onRegistered,
}: RegisterTeamModalProps) {
    const [teamName, setTeamName] = useState('');
    const [saving, setSaving] = useState(false);

    const handleRegister = async () => {
        const trimmed = teamName.trim();
        if (!trimmed) {
            Alert.alert('Team name required', 'Please enter a name for your team.');
            return;
        }

        setSaving(true);
        try {
            await postTournamentRegistration(tournamentId, trimmed);
            setTeamName('');
            onRegistered();
            onClose();
        } catch (error: any) {
            const msg = error?.response?.data?.detail ?? 'Registration failed. You may already be registered.';
            Alert.alert('Error', msg);
        } finally {
            setSaving(false);
        }
    };

    const handleClose = () => {
        setTeamName('');
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
            >
                <View style={styles.sheet}>
                    <Text style={styles.title}>Register Team</Text>
                    <Text style={styles.subtitle}>{tournamentName}</Text>

                    <Text style={styles.label}>Team Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Sand Sharks"
                        placeholderTextColor="#6b7280"
                        value={teamName}
                        onChangeText={setTeamName}
                        maxLength={50}
                        autoFocus
                        returnKeyType="done"
                        onSubmitEditing={handleRegister}
                    />

                    <Text style={styles.hint}>
                        You will be set as team captain. Members can be added later.
                    </Text>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleClose} disabled={saving}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.registerButton, (!teamName.trim() || saving) && styles.disabledButton]}
                            onPress={handleRegister}
                            disabled={!teamName.trim() || saving}
                        >
                            <Text style={styles.registerText}>{saving ? 'Registering…' : 'Register'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: '#2a2b30',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        gap: 12,
    },
    title: {
        color: '#f7f7f7',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
    },
    subtitle: {
        color: '#9ca3af',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 8,
    },
    label: {
        color: '#ff5722',
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    input: {
        backgroundColor: '#1C1D21',
        color: '#f7f7f7',
        fontSize: 16,
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#3a3b40',
    },
    hint: {
        color: '#6b7280',
        fontSize: 12,
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#3a3b40',
        alignItems: 'center',
    },
    cancelText: {
        color: '#9ca3af',
        fontSize: 16,
        fontWeight: '600',
    },
    registerButton: {
        flex: 2,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#ff5722',
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.5,
    },
    registerText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
});
