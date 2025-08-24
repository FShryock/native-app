import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tournament } from '../api/getTournaments'

interface TournamentCardProps {
    tournament: Tournament;
}

export default function TournamentCard(props: TournamentCardProps) {
    return(
        <View style={styles.card}>
            <Text style={styles.title}>{props.tournament.name}</Text>
            <Text>{new Date (props.tournament.date).toLocaleString()}</Text>
            <Text>{props.tournament.location}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1f2937', 
        padding: 16,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f9fafb',
        marginBottom: 4,
    }
});