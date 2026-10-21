import React, { useState } from 'react';
import {
    Modal, View, Text, TextInput, TouchableOpacity,
    StyleSheet, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { patchBracketMatchScore } from '../api/patchBracketMatchScore';

interface EditBracketScoreModalProps {
    visible: boolean;
    matchId: number;
    version: number;
    teamAName: string;
    teamBName: string;
    initialScoreA: number;
    initialScoreB: number;
    onClose: () => void;
    onSaved: () => void;
}

export default function EditBracketScoreModal({
    visible,
    matchId,
    version,
    teamAName,
    teamBName,
    initialScoreA,
    initialScoreB,
    onClose,
    onSaved,
}: EditBracketScoreModalProps) {
    const [scoreA, setScoreA] = useState(String(initialScoreA));
    const [scoreB, setScoreB] = useState(String(initialScoreB));
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await patchBracketMatchScore(matchId, {
                score_a: parseInt(scoreA) || 0,
                score_b: parseInt(scoreB) || 0,
                version,
            });
            onSaved();
            onClose();
        } catch (error: any) {
            if (error?.response?.status === 409) {
                const msg = error?.response?.data?.message ?? 'This match was updated by someone else. Close and reopen to see the latest scores.';
                Alert.alert('Score Conflict', msg, [{ text: 'OK', onPress: onClose }]);
            } else {
                const msg = error?.response?.data?.detail ?? 'Failed to save scores.';
                Alert.alert('Error', msg);
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
            >
                <View style={styles.sheet}>
                    <Text style={styles.title}>Edit Score</Text>

                    <View style={styles.scoreRow}>
                        <View style={styles.scoreBlock}>
                            <Text style={styles.teamLabel} numberOfLines={1}>{teamAName}</Text>
                            <TextInput
                                style={styles.input}
                                value={scoreA}
                                onChangeText={setScoreA}
                                keyboardType="numeric"
                                maxLength={2}
                                selectTextOnFocus
                                autoFocus
                            />
                        </View>
                        <Text style={styles.dash}>—</Text>
                        <View style={styles.scoreBlock}>
                            <Text style={styles.teamLabel} numberOfLines={1}>{teamBName}</Text>
                            <TextInput
                                style={styles.input}
                                value={scoreB}
                                onChangeText={setScoreB}
                                keyboardType="numeric"
                                maxLength={2}
                                selectTextOnFocus
                            />
                        </View>
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={saving}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.saveButton, saving && styles.disabledButton]}
                            onPress={handleSave}
                            disabled={saving}
                        >
                            <Text style={styles.saveText}>{saving ? 'Saving…' : 'Save'}</Text>
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
        gap: 16,
    },
    title: {
        color: '#f7f7f7',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 4,
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    scoreBlock: {
        flex: 1,
        alignItems: 'center',
        gap: 6,
    },
    teamLabel: {
        color: '#9ca3af',
        fontSize: 12,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#1C1D21',
        color: '#f7f7f7',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 12,
        paddingVertical: 12,
        width: '100%',
        borderWidth: 1,
        borderColor: '#3a3b40',
    },
    dash: {
        color: '#6b7280',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 20,
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
    saveButton: {
        flex: 2,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#ff5722',
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.6,
    },
    saveText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
});
