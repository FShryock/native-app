import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';
import { Ionicons } from "@expo/vector-icons";
import BottomSheetModal from '../components/BottomSheetModal';
import MyCalendar from '../components/MyCalendar';
import { useUser } from "../contexts/UserContext";
import CreateTourney from './CreateTournamentScreen';


// ******************* Props ****************************************
type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;
interface ComponentProps {
  handleLogin: (value: boolean) => void
}
type HomeScreenProps = Props & ComponentProps
// ******************************************************************

export default function HomeScreen(props: HomeScreenProps) {
  const [isCaledarOpen, setIsCalendarOpen] = useState(false);
  const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);
  const [isTeamsOpen, setIsTeamsOpen] =  useState(false);
  const [isAddingOpen, setIsAddingOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const calendarTest = [
    {title: 'Smackdown 1', start: '2025-10-05', info: 'This us a vert difficult tournament'},
    {title: 'Smackdown 2', start: '2025-10-15', info: 'This us a vert difficult tournament'},
    {title: 'Smackdown 3', start: '2025-10-25', info: 'This us a vert difficult tournament'},
  ];

  const { userInfo } = useUser();



  return (
      <View style={styles.container}>

        {/* Profile Pic Icon */}
        <View style={styles.profilePic}>
          <Image
            source={userInfo?.profile?.profile_pic ?
              {uri: userInfo?.profile.profile_pic} :
              require('../assets/panda.png')
            }
            style={styles.profileImage}
          />
        </View>

        {/* Welcome Banner */}
        <View style={styles.welcomeBanner}>
          <Text style={styles.welcomeText}>Welcome {userInfo?.first_name} {userInfo?.last_name} 👋🏼</Text>
        </View>
        
        <Text style={styles.label}>Registered Tournaments!!</Text>
        <ScrollView horizontal style={styles.tournaments} contentContainerStyle={{ alignItems: 'center' }}>
          <View style={styles.calendarItems}>
            <Text style={styles.calendarTitle}>Beach Bash</Text>
            <Text style={styles.calendarDate}>Jan 5</Text>
          </View>
          <View style={styles.calendarItems}>
            <Text style={styles.calendarTitle}>BoomTown</Text>
            <Text style={styles.calendarDate}>May 15</Text>
          </View>
          <View style={styles.calendarItems}>
            <Text style={styles.calendarTitle}>SmackDown</Text>
            <Text style={styles.calendarDate}>Oct 3</Text>
          </View>
          <View style={styles.calendarItems}>
            <Text style={styles.calendarTitle}>Last Dig</Text>
            <Text style={styles.calendarDate}>Aug 8</Text>
          </View>
          <View style={styles.calendarItems}>
            <Text style={styles.calendarTitle}>Dig or Die</Text>
            <Text style={styles.calendarDate}>Feb 28</Text>
          </View>
          <View style={styles.calendarItems}>
            <Text style={styles.calendarTitle}>Bear Browl</Text>
            <Text style={styles.calendarDate}>Apr 30</Text>
          </View>
        </ScrollView>

        <Text style={styles.label}>Quick Actions!!</Text>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('ScoreKeeper')} >
            <Ionicons name="bar-chart-outline" size={24} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setIsCalendarOpen(true)} >
            <Ionicons name="calendar-outline" size={24} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setIsFavoriteOpen(true)} >
            <Ionicons name="heart-outline" size={24} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setIsTeamsOpen(true)} >
            <Ionicons name="people-outline" size={24} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setIsAddingOpen(true)} >
            <Ionicons name="add-circle-outline" size={24} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setIsSettingsOpen(true)} >
            <Ionicons name="settings-outline" size={24} color='#fff' />
          </TouchableOpacity>
        </View>

        <BottomSheetModal visible={isCaledarOpen} onClose={() => setIsCalendarOpen(false)}>
            <View style={styles.calendar}>
                <MyCalendar events={calendarTest}/>
            </View>
        </BottomSheetModal>
        <BottomSheetModal visible={isFavoriteOpen} onClose={() => setIsFavoriteOpen(false)}>
           <Text>
            Favorites!!
           </Text>
        </BottomSheetModal>
        <BottomSheetModal visible={isTeamsOpen} onClose={() => setIsTeamsOpen(false)}>
            <Text>
              Teams!!
            </Text>
        </BottomSheetModal>
        <BottomSheetModal visible={isAddingOpen} onClose={() => setIsAddingOpen(false)}>
            <View style={styles.calendar}>
              <CreateTourney/>
            </View>
        </BottomSheetModal>
        <BottomSheetModal visible={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
            <Text>
              Settings!!
            </Text>
        </BottomSheetModal>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1D21',
    alignItems: 'center',
    padding: 20
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#ff5722',
    alignItems: 'center',
    paddingTop: 18,
    marginHorizontal: 10,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 15,
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: '#ff5722'
  },
  profilePic: {
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 100,
    marginBottom: 20,
    overflow: 'hidden', // ensures image stays within the circle
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // makes the image fill the circle nicely
  },
  welcomeBanner: {
    width: '100%',
    height: 60,
    backgroundColor:  '#7e787874',
    marginBottom:20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize:20,
    fontWeight: 'bold',
    color: '#fff'
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10
  },
  tournaments: {
    width: '100%',
    height: 80,
    maxHeight: 80,
    marginBottom:20,
    borderRadius: 10,
  },
  calendarItems: {
    backgroundColor: '#ababab4a',
    width: 100,
    height: 60,
    borderRadius: 10,
    marginRight: 5, 
    marginLeft: 10,
  },
  calendarTitle: {
    fontWeight: '700',
    fontSize: 12,
    marginTop: 3,
    padding:8,
    color: '#fff'
  },
  calendarDate: {
    paddingLeft: 8,
    fontWeight: '600',
    color: '#ff5722'
  },
  quickActions: {
    flex: 1,
    width: '100%',
    height: 80,
    maxHeight: 80,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: "center",
  },
  calendar: {
    flex: 1,
    marginTop: 60
  }
})