import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BracketMatch } from '../types';
import { teamIcon } from '../utils/teamIcon';
import EditBracketScoreModal from './EditBracketScoreModal';

interface BracketMatchCardProps {
    match: BracketMatch;
    matchLabel: string;
    onScoreSaved: () => void;
}

export default function BracketMatchCard({ match, matchLabel, onScoreSaved }: BracketMatchCardProps) {
    const [editing, setEditing] = useState(false);

    const teamA = match.team_a_name ?? 'TBD';
    const teamB = match.team_b_name ?? 'TBD';
    const scoreA = match.score_a ?? 0;
    const scoreB = match.score_b ?? 0;
    const iconA = teamIcon(match.team_a);
    const iconB = teamIcon(match.team_b);
    const isComplete = match.winner != null;

    return (
        <>
            <View style={styles.card}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.matchLabel}>{matchLabel}</Text>
                    {isComplete && (
                        <View style={styles.finalBadge}>
                            <Text style={styles.finalBadgeText}>Final</Text>
                        </View>
                    )}
                    <TouchableOpacity onPress={() => setEditing(true)} style={styles.editButton}>
                        <Ionicons name="create-outline" size={20} color="#9ca3af" />
                    </TouchableOpacity>
                </View>

                {/* Team A */}
                <View style={[styles.teamRow, match.winner === match.team_a && styles.winnerRow]}>
                    <View style={[styles.iconCircle, { borderColor: iconA.color }]}>
                        <Ionicons name={iconA.name as any} size={16} color={iconA.color} />
                    </View>
                    <Text
                        style={[styles.teamName, match.winner === match.team_a && styles.winnerName]}
                        numberOfLines={1}
                    >
                        {teamA}
                    </Text>
                    {match.winner === match.team_a && (
                        <Ionicons name="checkmark-circle" size={16} color="#ff5722" style={styles.winnerIcon} />
                    )}
                    <Text style={[styles.score, match.winner === match.team_a && styles.winnerScore]}>
                        {match.score_a ?? '—'}
                    </Text>
                </View>

                <View style={styles.divider} />

                {/* Team B */}
                <View style={[styles.teamRow, match.winner === match.team_b && styles.winnerRow]}>
                    <View style={[styles.iconCircle, { borderColor: iconB.color }]}>
                        <Ionicons name={iconB.name as any} size={16} color={iconB.color} />
                    </View>
                    <Text
                        style={[styles.teamName, match.winner === match.team_b && styles.winnerName]}
                        numberOfLines={1}
                    >
                        {teamB}
                    </Text>
                    {match.winner === match.team_b && (
                        <Ionicons name="checkmark-circle" size={16} color="#ff5722" style={styles.winnerIcon} />
                    )}
                    <Text style={[styles.score, match.winner === match.team_b && styles.winnerScore]}>
                        {match.score_b ?? '—'}
                    </Text>
                </View>
            </View>

            {editing && (
                <EditBracketScoreModal
                    visible={true}
                    matchId={match.id}
                    version={match.version}
                    teamAName={teamA}
                    teamBName={teamB}
                    initialScoreA={scoreA}
                    initialScoreB={scoreB}
                    onClose={() => setEditing(false)}
                    onSaved={() => {
                        setEditing(false);
                        onScoreSaved();
                    }}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#2a2b30',
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    matchLabel: {
        flex: 1,
        color: '#ff5722',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.6,
    },
    finalBadge: {
        backgroundColor: '#1C1D21',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 8,
    },
    finalBadgeText: {
        color: '#9ca3af',
        fontSize: 11,
        fontWeight: '600',
    },
    editButton: {
        padding: 4,
    },
    teamRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 8,
        gap: 10,
    },
    winnerRow: {
        backgroundColor: '#1C1D21',
    },
    iconCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        backgroundColor: '#1C1D21',
        alignItems: 'center',
        justifyContent: 'center',
    },
    teamName: {
        flex: 1,
        color: '#9ca3af',
        fontSize: 14,
        fontWeight: '500',
    },
    winnerName: {
        color: '#f7f7f7',
        fontWeight: '700',
    },
    winnerIcon: {
        marginRight: 4,
    },
    score: {
        color: '#9ca3af',
        fontSize: 18,
        fontWeight: '700',
        minWidth: 28,
        textAlign: 'right',
    },
    winnerScore: {
        color: '#ff5722',
    },
    divider: {
        height: 1,
        backgroundColor: '#3a3b40',
        marginHorizontal: 4,
    },
});
