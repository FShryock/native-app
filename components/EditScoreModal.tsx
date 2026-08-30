import React, { useState } from 'react';
import {
    Modal, View, Text, TextInput, TouchableOpacity,
    StyleSheet, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { patchMatchScore } from '../api/patchMatchScore';

interface EditScoreModalProps {
    visible: boolean;
    matchId: number;
    team1Name: string;
    team2Name: string;
    initialScores: {
        score_a_g1: number;
        score_b_g1: number;
        score_a_g2: number;
        score_b_g2: number;
    };
    onClose: () => void;
    onSaved: () => void;
}

export default function EditScoreModal({
    visible,
    matchId,
    team1Name,
    team2Name,
    initialScores,
    onClose,
    onSaved,
}: EditScoreModalProps) {
    const [scoreA1, setScoreA1] = useState(String(initialScores.score_a_g1));
    const [scoreB1, setScoreB1] = useState(String(initialScores.score_b_g1));
    const [scoreA2, setScoreA2] = useState(String(initialScores.score_a_g2));
    const [scoreB2, setScoreB2] = useState(String(initialScores.score_b_g2));
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        const payload = {
            score_a_g1: parseInt(scoreA1) || 0,
            score_b_g1: parseInt(scoreB1) || 0,
            score_a_g2: parseInt(scoreA2) || 0,
            score_b_g2: parseInt(scoreB2) || 0,
        };

        setSaving(true);
        try {
            await patchMatchScore(matchId, payload);
            onSaved();
            onClose();
        } catch (error: any) {
            const msg = error?.response?.data?.detail ?? 'Failed to save scores.';
            Alert.alert('Error', msg);
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
                    <Text style={styles.title}>Edit Scores</Text>

                    {/* Game 1 */}
                    <Text style={styles.gameLabel}>Game 1</Text>
                    <View style={styles.scoreRow}>
                        <View style={styles.scoreBlock}>
                            <Text style={styles.teamLabel} numberOfLines={1}>{team1Name}</Text>
                            <TextInput
                                style={styles.input}
                                value={scoreA1}
                                onChangeText={setScoreA1}
                                keyboardType="numeric"
                                maxLength={2}
                                selectTextOnFocus
                            />
                        </View>
                        <Text style={styles.dash}>—</Text>
                        <View style={styles.scoreBlock}>
                            <Text style={styles.teamLabel} numberOfLines={1}>{team2Name}</Text>
                            <TextInput
                                style={styles.input}
                                value={scoreB1}
                                onChangeText={setScoreB1}
                                keyboardType="numeric"
                                maxLength={2}
                                selectTextOnFocus
                            />
                        </View>
                    </View>

                    {/* Game 2 */}
                    <Text style={styles.gameLabel}>Game 2</Text>
                    <View style={styles.scoreRow}>
                        <View style={styles.scoreBlock}>
                            <Text style={styles.teamLabel} numberOfLines={1}>{team1Name}</Text>
                            <TextInput
                                style={styles.input}
                                value={scoreA2}
                                onChangeText={setScoreA2}
                                keyboardType="numeric"
                                maxLength={2}
                                selectTextOnFocus
                            />
                        </View>
                        <Text style={styles.dash}>—</Text>
                        <View style={styles.scoreBlock}>
                            <Text style={styles.teamLabel} numberOfLines={1}>{team2Name}</Text>
                            <TextInput
                                style={styles.input}
                                value={scoreB2}
                                onChangeText={setScoreB2}
                                keyboardType="numeric"
                                maxLength={2}
                                selectTextOnFocus
                            />
                        </View>
                    </View>

                    {/* Actions */}
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={saving}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.saveButton, saving && styles.disabledButton]} onPress={handleSave} disabled={saving}>
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
    gameLabel: {
        color: '#ff5722',
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
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
