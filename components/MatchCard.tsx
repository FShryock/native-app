import React from "react";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

export default function MatchCard() {
    const [selectedTab, setSelectedTab] = useState('Live');

    //test data
    const matches = [
        {
        id: 1,
        court: 'Court 3',
        status: 'In Progress',
        statusColor: '#22c55e',
        team1: { name: 'Spike Squad', score: 21 },
        team2: { name: 'Block Busters', score: 18 },
        currentGame: 'Game 1',
        games: ['Game 1', 'Game 2'],
        },
        {
        id: 2,
        court: 'Court 1',
        status: 'Starting in 15min',
        statusColor: '#fbbf24',
        team1: { name: 'Net Ninjas', score: 0 },
        team2: { name: 'Ace Attackers', score: 0 },
        currentGame: 'Game 1',
        games: ['Game 1', 'Game 2'],
        },
        {
        id: 3,
        court: 'Court 2',
        status: 'Final',
        statusColor: '#6b7280',
        team1: { name: 'Dig Dynasty', score: 25, game2Score: 19 },
        team2: { name: 'Power Passers', score: 23, game2Score: 25 },
        currentGame: 'Game 1',
        games: ['Game 1', 'Game 2'],
        showMultipleGames: true,
        },
    ];

    const renderMatchCard = (match: match) => (
        <View key={match.id} style={styles.matchCard}>
            {/* Court and Status Header */}
            <View style={styles.matchHeader}>
                <Text style={styles.courtText}>{match.court}</Text>
                <View style={[styles.statusBadge, { backgroundColor: match.statusColor}]}>
                    <Text style={styles.statusText}>{match.status}</Text>
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
                    <Text style={styles.scoreText}>{match.team1.score}</Text>
                    <Text style={styles.vsText}>vs</Text>
                    <Text style={styles.scoreText}>{match.team2.score}</Text>
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
                            index === 0 && styles.gameTabActive,
                        ]}
                    >
                      <Text
                        style={[
                            styles.gameTabText,
                            index === 0 && styles.gameTabTextActive,
                        ]}
                      >
                        {game}
                      </Text>
                    </TouchableOpacity>
                ))};
            </View>

            {/* Additional Game Score for Completed Matches */}
            {match.showMultipleGames && (
                <View style={styles.additionalScore}>
                    <Text style={styles.additionalScoreText}>
                        {match.team1.game2Score} vs {match.team2.game2Score}
                    </Text>
                    <Text style={styles.additionalGameLabel}>Game 2</Text>
                </View>
            )}

        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Tab navigation */}
            <View style={styles.tabContainer}>
                {['Live', 'Upcoming', 'Completed'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tab,
                            selectedTab === tab && styles.tabActive
                        ]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedTab === tab && styles.tabTextActive
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Matches list */}
            <ScrollView
                style={styles.scrollView}            
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {matches.map((match) => renderMatchCard(match))}
            </ScrollView>
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
        backgroundColor: '#8851e063',
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
        fontSize: 12,
        fontWeight: '600',
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