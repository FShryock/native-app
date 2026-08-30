import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    ScrollView, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../contexts/UserContext';
import { getPools, Pool } from '../api/getPools';
import { getMyTournaments } from '../api/getMyTournaments';
import MatchCard from '../components/MatchCard';
import { CalendarItemType, poolMatch } from '../types';

type TopTab = 'Pools' | 'My Matches' | 'My Pool';

interface ActiveTournament {
    id: number;
    name: string;
}

export default function TeamScreen() {
    const { userInfo } = useUser();
    const [activeTab, setActiveTab] = useState<TopTab>('Pools');

    // Tournament discovery state
    const [discovering, setDiscovering] = useState(true);
    const [activeTournaments, setActiveTournaments] = useState<ActiveTournament[]>([]);
    const [selectedTournamentId, setSelectedTournamentId] = useState<number | null>(null);

    // Pool/match state for the selected tournament
    const [pools, setPools] = useState<Pool[]>([]);
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState<poolMatch[]>([]);

    useEffect(() => {
        findActiveTournaments();
    }, []);

    // When the selected tournament changes, reload its pools
    useEffect(() => {
        if (selectedTournamentId !== null) {
            fetchPools(selectedTournamentId);
        }
    }, [selectedTournamentId]);

    async function findActiveTournaments() {
        setDiscovering(true);
        try {
            const myTourneys: CalendarItemType[] = await getMyTournaments();

            // Check each registered tournament for pools in parallel
            const results = await Promise.all(
                myTourneys.map(async (entry) => {
                    try {
                        const pools = await getPools(entry.tournament.id);
                        return pools.length > 0
                            ? { id: entry.tournament.id, name: entry.tournament.name }
                            : null;
                    } catch {
                        return null;
                    }
                })
            );

            const active = results.filter((r): r is ActiveTournament => r !== null);
            setActiveTournaments(active);

            if (active.length === 1) {
                setSelectedTournamentId(active[0].id);
            } else if (active.length === 0) {
                setDiscovering(false);
            } else {
                // 2+ — let user pick; stop the spinner
                setDiscovering(false);
            }
        } catch {
            setDiscovering(false);
        }
    }

    async function fetchPools(tournamentId: number) {
        setLoading(true);
        setDiscovering(false);
        try {
            const data = await getPools(tournamentId);
            setPools(data);
            const myPool = data.find((pool) =>
                pool.teams.some((member) => member.captain === userInfo?.username)
            );
            setMatches(myPool?.matches ?? []);
        } catch {
            // pools unavailable
        } finally {
            setLoading(false);
        }
    }

    // ── Renders ──────────────────────────────────────────────────────────────

    const renderTournamentPicker = () => (
        <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Multiple active tournaments — select one:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pickerRow}>
                {activeTournaments.map((t) => (
                    <TouchableOpacity
                        key={t.id}
                        style={[styles.pickerChip, selectedTournamentId === t.id && styles.pickerChipActive]}
                        onPress={() => setSelectedTournamentId(t.id)}
                    >
                        <Text style={[styles.pickerChipText, selectedTournamentId === t.id && styles.pickerChipTextActive]}>
                            {t.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderPools = () => (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {loading && <ActivityIndicator size="large" color="#ff5722" style={{ marginTop: 30 }} />}
            {!loading && pools.map((pool) => (
                <View key={pool.id} style={styles.poolCard}>
                    <Text style={styles.poolName}>{`Pool ${pool.name}`}</Text>
                    {pool.teams.map((member) => (
                        <View key={member.id} style={styles.teamRow}>
                            <Ionicons name="people-outline" size={16} color="#ff5722" />
                            <Text style={styles.teamName}>{member.team_name}</Text>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );

    const renderMyMatches = () => {
        if (loading) return <ActivityIndicator size="large" color="#ff5722" style={{ marginTop: 30 }} />;

        const myPool = pools.find((pool) =>
            pool.teams.some((member) => member.captain === userInfo?.username)
        );

        if (!myPool) {
            return (
                <View style={styles.emptyState}>
                    <Ionicons name="people-outline" size={48} color="#9ca3af" />
                    <Text style={styles.emptyText}>You are not assigned to a pool yet.</Text>
                </View>
            );
        }

        const myTeamId = myPool.teams.find((member) => member.captain === userInfo?.username)?.team;
        const myMatches = myPool.matches.filter((m) => m.team_a === myTeamId || m.team_b === myTeamId);

        const adaptedMatches = myMatches.map((m) => ({
            id: m.id,
            court: `Pool ${myPool.name}`,
            status: m.is_complete ? 'Final' : 'In Progress',
            statusColor: m.is_complete ? '#e70f0f' : '#71ce1f',
            team1: { name: m.team_a_name || `Team ${m.team_a}`, score: m.score_a_g1 ?? 0, game2Score: m.score_a_g2 ?? 0 },
            team2: { name: m.team_b_name || `Team ${m.team_b}`, score: m.score_b_g1 ?? 0, game2Score: m.score_b_g2 ?? 0 },
            currentGame: 'Game 1',
            games: ['Game 1', 'Game 2'],
            showMultipleGames: false,
        }));

        return (
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.poolCard}>
                    <Text style={styles.poolName}>{`Pool ${myPool.name}`}</Text>
                    {myPool.teams.map((member) => (
                        <View
                            key={member.id}
                            style={[styles.teamRow, member.captain === userInfo?.username && styles.myTeamRow]}
                        >
                            <Ionicons
                                name="people-outline"
                                size={16}
                                color={member.captain === userInfo?.username ? '#ffeb3b' : '#ff5722'}
                            />
                            <Text style={[styles.teamName, member.captain === userInfo?.username && styles.myTeamName]}>
                                {member.team_name}
                            </Text>
                            {member.captain === userInfo?.username && (
                                <Text style={styles.youBadge}>You</Text>
                            )}
                        </View>
                    ))}
                </View>

                {adaptedMatches.length > 0 && (
                    <MatchCard matches={adaptedMatches} onScoreSaved={() => fetchPools(selectedTournamentId!)} />
                )}
            </ScrollView>
        );
    };

    const renderMyPool = () => {
        if (loading) return <ActivityIndicator size="large" color="#ff5722" style={{ marginTop: 30 }} />;

        if (matches.length === 0) {
            return (
                <View style={styles.emptyState}>
                    <Ionicons name="calendar-outline" size={48} color="#9ca3af" />
                    <Text style={styles.emptyText}>No schedule yet.</Text>
                </View>
            );
        }

        return (
            <MatchCard
                matches={matches.map((m) => ({
                    id: m.id,
                    court: `Pool ${m.pool}`,
                    status: m.is_complete ? 'Final' : 'Upcoming',
                    statusColor: m.is_complete ? '#6b7280' : '#fbbf24',
                    team1: { name: m.team_a_name || `Team ${m.team_a}`, score: m.score_a_g1 ?? 0, game2Score: m.score_a_g2 ?? 0 },
                    team2: { name: m.team_b_name || `Team ${m.team_b}`, score: m.score_b_g1 ?? 0, game2Score: m.score_b_g2 ?? 0 },
                    currentGame: 'Game 1',
                    games: ['Game 1', 'Game 2'],
                    showMultipleGames: false,
                }))}
                onScoreSaved={() => fetchPools(selectedTournamentId!)}
            />
        );
    };

    // ── Loading / empty states ────────────────────────────────────────────────

    if (discovering) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#ff5722" style={{ marginTop: 60 }} />
                <Text style={styles.discoveringText}>Looking for active tournaments…</Text>
            </SafeAreaView>
        );
    }

    if (activeTournaments.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.emptyState}>
                    <Ionicons name="trophy-outline" size={48} color="#9ca3af" />
                    <Text style={styles.emptyText}>No active tournaments yet.{'\n'}Check back after the admin starts pool play.</Text>
                </View>
            </SafeAreaView>
        );
    }

    // ── Main view ─────────────────────────────────────────────────────────────

    return (
        <SafeAreaView style={styles.container}>
            {/* Tournament picker — only shown when 2+ active */}
            {activeTournaments.length > 1 && renderTournamentPicker()}

            {/* Top Tabs */}
            <View style={styles.tabContainer}>
                {(['Pools', 'My Matches', 'My Pool'] as TopTab[]).map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.tabActive]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {activeTab === 'Pools' && renderPools()}
            {activeTab === 'My Matches' && renderMyMatches()}
            {activeTab === 'My Pool' && renderMyPool()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1D21',
    },
    discoveringText: {
        color: '#9ca3af',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 16,
    },
    pickerContainer: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 4,
        gap: 8,
    },
    pickerLabel: {
        color: '#9ca3af',
        fontSize: 12,
    },
    pickerRow: {
        gap: 8,
        paddingVertical: 4,
    },
    pickerChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#93939363',
    },
    pickerChipActive: {
        backgroundColor: '#ff5722',
    },
    pickerChipText: {
        color: '#f7f7f7',
        fontSize: 13,
        fontWeight: '600',
    },
    pickerChipTextActive: {
        color: '#ffffff',
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        gap: 12,
    },
    tab: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#93939363',
    },
    tabActive: {
        backgroundColor: '#ff5722',
    },
    tabText: {
        color: '#f7f7f7',
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
        gap: 12,
    },
    poolCard: {
        backgroundColor: '#2a2b30',
        borderRadius: 16,
        padding: 16,
        gap: 10,
    },
    poolName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff5722',
        marginBottom: 4,
    },
    teamRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    myTeamRow: {
        backgroundColor: '#3a3b40',
        borderRadius: 8,
        padding: 6,
    },
    teamName: {
        color: '#f7f7f7',
        fontSize: 14,
    },
    myTeamName: {
        color: '#ffeb3b',
        fontWeight: '700',
    },
    youBadge: {
        marginLeft: 'auto',
        fontSize: 11,
        fontWeight: '700',
        color: '#ffeb3b',
        backgroundColor: '#3d3820',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginTop: 60,
        paddingHorizontal: 32,
    },
    emptyText: {
        color: '#9ca3af',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 22,
    },
});
