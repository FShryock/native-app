import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList } from '../navigation/MainTabs';

type Props = NativeStackScreenProps<MainTabParamList, 'Teams'>;

export default function TeamScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Team Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1D21',
    color: '#f7f7f7'
  }
})