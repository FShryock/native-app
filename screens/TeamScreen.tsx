import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList } from '../navigation/MainTabs';
import BottomSheetModal from '../components/BottomSheetModal';

type Props = NativeStackScreenProps<MainTabParamList, 'Teams'>;

export default function TeamScreen({ navigation }: Props) {
  const [isModalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={styles.container}>

      <Button title="Open Bottom Sheet" onPress={() => setModalVisible(true)} />

      <BottomSheetModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      >
        <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 40 }}>
          Hello from generic Bottom Sheet!
        </Text>
      </BottomSheetModal>
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

