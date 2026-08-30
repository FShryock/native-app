import React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import EditScoreModal from "./EditScoreModal";

type match = {
    id: number,
    court: string, 
    status: string, 
    statusColor: string, 
    team1: { name: string, score: number, game2Score: number },
    team2: { name: string, score: number, game2Score: number },
    currentGame: string,
    games: Array<string>,
    showMultipleGames: boolean
}

interface MatchCardProps {
    matches?: match[];
    onScoreSaved?: () => void;
}

export default function MatchCard({ matches: propMatches, onScoreSaved }: MatchCardProps = {}) {
    // const [selectedTab, setSelectedTab] = useState('Live');
    const [gameSelected, setGameSelected] = useState<Record<number, number>>({});
    const [selectedScore, setSelectedScore] = useState<Record<number, { t1: number; t2: number }>>({});
    const [editingMatch, setEditingMatch] = useState<match | null>(null);

    const matches = propMatches;

    const handleSelectedGame = (match: match, id: number, index: number) => {
        setGameSelected(prev => ({...prev, [id]: index}));
        displayGameSelectedScores(match, id, index);
    }

    const displayGameSelectedScores = (match: match, id: number, index: number) => {
        const t1 = (index === 0 ? match.team1.score : match.team1.game2Score) ?? 0;
        const t2 = (index === 0 ? match.team2.score : match.team2.game2Score) ?? 0;
        setSelectedScore(prev => ({...prev, [id]: { t1, t2}}));
    }

    const renderMatchCard = (match: match) => {
        const selIndex = gameSelected[match.id] ?? 0;
        const defaultT1 = ((selIndex === 0 ? match.team1.score : match.team1.game2Score) ?? 0);
        const defaultT2 = ((selIndex === 0 ? match.team2.score : match.team2.game2Score) ?? 0);
        const scores = selectedScore[match.id];
        const displayT1 = scores?.t1 ?? defaultT1;
        const displayT2 = scores?.t2 ?? defaultT2;
        return (
        <View key={match.id} style={styles.matchCard}>
            {/* Court and Status Header */}
            <View style={styles.matchHeader}>
                <Text style={styles.courtText}>{match.court}</Text>
                <View style={[styles.statusBadge, { backgroundColor: match.statusColor}]}>
                    <Text style={styles.statusText}>{match.status}</Text>
                </View>
                {/* <View style={[styles.statusBadge, { backgroundColor: match.statusColor}]}> */}
                <View style={styles.statusBadge}>
                    <TouchableOpacity onPress={() => setEditingMatch(match)}>
                        <Ionicons name={'create-outline'} size={25} color={'#fefeffff'} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Teams and Scores */}
            <View style={styles.scoreContainer}>
                {/* Team1 */}
                <View style={styles.teamSection}>
                    <View style={styles.shieldIcon}/>
                    <Text style={styles.teamName}>{match.team1.name}</Text>
                </View>
                {/* Score Display */}
                <View style={styles.scoreDisplay}>
                    <Text style={styles.scoreText}>{displayT1}</Text>
                    <Text style={styles.vsText}>vs</Text>
                    <Text style={styles.scoreText}>{displayT2}</Text>
                </View>
                 {/* Team2 */}
                <View style={styles.teamSection}>
                    <View style={styles.shieldIcon}/>
                    <Text style={styles.teamName}>{match.team2.name}</Text>
                </View>
            </View>

            {/* Game Tabs */}
            <View style={styles.gameTabs}>
                {match.games.map((game, index) => (
                    <TouchableOpacity
                        key={game}
                        style={[
                            styles.gameTab,
                            index === (gameSelected[match.id] ?? 0) && styles.gameTabActive,
                        ]}
                        onPress={() => handleSelectedGame(match, match.id, index)}
                    >
                      <Text
                        style={[
                            styles.gameTabText,
                            index === (gameSelected[match.id] ?? 0) && styles.gameTabTextActive,
                        ]}
                      >
                        {game}
                      </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Matches list */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {matches?.map((match) => renderMatchCard(match))}
            </ScrollView>

            {editingMatch && (
                <EditScoreModal
                    visible={true}
                    matchId={editingMatch.id}
                    team1Name={editingMatch.team1.name}
                    team2Name={editingMatch.team2.name}
                    initialScores={{
                        score_a_g1: editingMatch.team1.score,
                        score_b_g1: editingMatch.team2.score,
                        score_a_g2: editingMatch.team1.game2Score,
                        score_b_g2: editingMatch.team2.game2Score,
                    }}
                    onClose={() => setEditingMatch(null)}
                    onSaved={() => {
                        setEditingMatch(null);
                        onScoreSaved?.();
                    }}
                />
            )}
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1D21',
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        gap: 12,
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#93939363',
    },
    tabActive: {
        backgroundColor: '#ff5722',
    },
    tabText: {
        color: '#fafbfeff',
        fontSize: 14,
        fontWeight: '600',
    },
    tabTextActive: {
        color: '#ffffff',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    matchCard: {
        backgroundColor: '#7e787874',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#7e787874',
    },
    matchHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    courtText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '700',
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    teamSection: {
        alignItems: 'center',
        flex: 1,
    },
    shieldIcon: {
        width: 48,
        height: 48,
        backgroundColor: '#1C1D21',
        borderRadius: 24,
        marginBottom: 8,
        borderWidth: 2,
        borderColor: '#1C1D21',
    },
    teamName: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
    },
    scoreDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
    },
    scoreText: {
        color: '#ffffff',
        fontSize: 36,
        fontWeight: 'bold',
    },
    vsText: {
        color: '#6b7280',
        fontSize: 16,
        fontWeight: '500',
    },
    gameTabs: {
        flexDirection: 'row',
        gap: 8,
    },
    gameTab: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: '#1C1D21',
        borderRadius: 8,
        alignItems: 'center',
    },
    gameTabActive: {
        backgroundColor: '#f2f2f6ff',
    },
    gameTabText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '600',
    },
    gameTabTextActive: {
        color: 'black',
    },
    additionalScore: {
        marginTop: 12,
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#2d3748',
    },
    additionalScoreText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    additionalGameLabel: {
        color: '#6b7280',
        fontSize: 12,
        marginTop: 4,
    },
})