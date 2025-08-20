import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from "@react-navigation/native";


type Props = NativeStackScreenProps<RootStackParamList, 'ScoreKeeper'>;

export default function ScoreKeeperScreen({ navigation }: Props) {
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);

   useEffect(() => {
    // Lock landscape when entering
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      // Unlock Landscape view and lock portrait
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

    };
  }, []);

  

  return (
    <View style={styles.container}>
        {/* Team A */}
        <View style={styles.teamA}>
            <TouchableOpacity style={styles.scoreButton} onPress={() => {setScoreA(scoreA + 1)}}>
                <Ionicons name={'add-circle'} size={60} color={'#673ab7'}></Ionicons>
            </TouchableOpacity>
            <Text style={styles.teamAScore}>{scoreA}</Text>
            <TouchableOpacity style={styles.scoreButton} onPress={() => {setScoreA(scoreA - 1)}}>
                <Ionicons name={'remove-circle'} size={60} color={'#673ab7'}></Ionicons>
            </TouchableOpacity>
        </View>
        {/* Team B */}
        <View style={styles.teamB}>
            <TouchableOpacity style={styles.scoreButton} onPress={() => {setScoreB(scoreB + 1)}}>
                <Ionicons name={'add-circle'} size={60} color={'#ff5722'}></Ionicons>
            </TouchableOpacity>
            <Text style={styles.teamBScore}>{scoreB}</Text>
            <TouchableOpacity style={styles.scoreButton} onPress={() => {setScoreB(scoreB - 1)}}>
                <Ionicons name={'remove-circle'} size={60} color={'#ff5722'}></Ionicons>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  teamA: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "space-between", // spread top-btn, score, bottom-btn
    paddingVertical: 20,
  },
  teamB: {
    flex: 1,
    backgroundColor: "#181818",
    alignItems: "center",
    justifyContent: "space-between", 
    paddingVertical: 20,
  },
  scoreButton: {
    width: "80%",
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    // borderWidth: 3,
    // borderColor: 'white',
    // backgroundColor: '#f7f7f7'
  },
  teamAScore: {
    color: "#181818",
    fontSize: 150, 
    fontWeight: "bold",
  },
  teamBScore: {
    color: "#f7f7f7",
    fontSize: 150,
    fontWeight: "bold",
  },
});
