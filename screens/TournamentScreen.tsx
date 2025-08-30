import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList } from '../navigation/MainTabs';
import TournamentCard from '../components/TournamentCard';
import getTournaments, { Tournament } from '../api/getTournaments';
import { ScrollView } from 'react-native-gesture-handler';

type Props = NativeStackScreenProps<MainTabParamList, 'Tournament'>;

export default function TournamentScreen(props: Props) {
  const [tournaments, setTournaments] = useState<Array<Tournament>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getTournaments();
      setTournaments(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size={'large'} style={{ marginTop: 50}}/>

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 0 }}>
        {
          tournaments.map((tourney) => {
            return <TournamentCard key={tourney.id} tournament={tourney} />
          })
        }

      </ScrollView>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1D21',
    color: '#f7f7f7'
  }
})