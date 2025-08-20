import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';

// ******************* Props ****************************************
type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;
interface ComponentProps {
  handleLogin: (value: boolean) => void
}
type HomeScreenProps = Props & ComponentProps
// ******************************************************************

export default function HomeScreen(props: HomeScreenProps) {
  return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('ScoreKeeper')} >
          <Text style={styles.buttonText}>ScoreKeeper</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1D21',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  button: {
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 15,
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: '#ff5722'
  }
})