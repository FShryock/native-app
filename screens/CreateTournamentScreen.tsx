import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Dropdown  from "../components/Dropdown";
import axios from "axios";
import { API_BASE_URL } from "@env";
import { postTournament }  from '../api/postTournament';

interface TourneyParams  {
    tourneyName: string,
    level: string,
    surface: string,
    format: string,
    gender: string,
    location: string,
    status: string,
    teams: number,
    prize_pool: string,
    date: string,
    registration_deadline: string
}

const INITIAL_TOURNEY_PARAMS: TourneyParams = {
    tourneyName: '',
    level: '',
    surface: '',
    format: '',
    gender: '',
    location: '',
    status: '',
    teams: 0,
    prize_pool:'1000',
    date: '2026-05-14',
    registration_deadline: '2026-05-10'
}

type TournamentOptions = {
  label: string;
  value: string;
}[];

export default function CreateTourney() {
    const [tourneyForm, setTourneyForm] = useState<TourneyParams>(INITIAL_TOURNEY_PARAMS);
    const [level, setLevel] = useState<TournamentOptions>([{label: "", value: ""}]);
    const [surface, setSurface] = useState<TournamentOptions>([{label: "", value: ""}]);
    const [format, setFormat] = useState<TournamentOptions>([{label: "", value: ""}]);
    const [gender, setGender] = useState<TournamentOptions>([{label: "", value: ""}]);
    const [status, setStatus] = useState<TournamentOptions>([{label: "", value: ""}]);
    const createNumberOptions = (max: number): TournamentOptions =>
    Array.from({ length: max }, (_, i) => ({
        label: (i + 1).toString(),
        value: (i + 1).toString(),
    }));

    

    const teamOptions = createNumberOptions(100);

    useEffect(() => {
        async function fetchOptions() {
            try {
                const response = await axios.get(`${API_BASE_URL}/tournament-options/`);
                setLevel(response.data.levels);
                setSurface(response.data.surface);
                setFormat(response.data.format);
                setGender(response.data.gender);
                setStatus(response.data.status);
            } catch (error) {
                console.error('Error fetching local tournaments: ', error);
                return [];
            }
        }
        fetchOptions();
    }, [])

    const handleUpdateField = <Key extends keyof TourneyParams>(key: Key, value: TourneyParams[Key]) => {
        setTourneyForm( prevState => ({
            ... prevState,
            [key]: value
        }));
    }

   

    const handleCreateTourney = () => {
        // TODO: Add logic to send request to backend:
        // maybe hardcode some of the values like prize
        // "prize_pool": "5000.00", Hardcode 0
        // "date": "2024-09-14",
        // "registration_deadline": "2024-08-31"
        console.log(`Here is your Tournament info: ${tourneyForm.tourneyName} ${tourneyForm.level}
                     ${tourneyForm.format} ${tourneyForm.surface} ${tourneyForm.gender}`)
        postTournament({ payload: tourneyForm })
    }

    return(
        <View style={styles.container}>
            <ScrollView style={{}}>
                <Text style={styles.title}>Create Tournament</Text>
                <TextInput style={styles.input} placeholder={'Name'} value={tourneyForm.tourneyName} onChangeText={(text) => handleUpdateField('tourneyName', text)} placeholderTextColor="white"/>
                {/* Row 1 */}
                <View style={styles.row}>
                    <View style={styles.half}>
                        <Dropdown placeHolder={'Level'} options={level}  onChange={(value) => handleUpdateField('level', value )}></Dropdown>
                    </View>
                    <View style={styles.half}>
                        <Dropdown placeHolder={'Surface'} options={surface} onChange={(value) => handleUpdateField('surface', value)}></Dropdown>
                    </View>
                </View>
                {/* Row 2 */}
                <View style={styles.row}>
                    <View style={styles.half}>
                        <Dropdown placeHolder={'Format'} options={format}  onChange={(value) => handleUpdateField('format', value)}></Dropdown>
                    </View>
                    <View style={styles.half}>
                        <Dropdown placeHolder={'Gender'} options={gender}  onChange={(value) => handleUpdateField('gender', value)}></Dropdown>
                    </View>
                </View>
                {/* Row 3 */}
                <View style={styles.row}>
                    <View style={styles.half}>
                        <Dropdown placeHolder={'Status'} options={status}  onChange={(value) => handleUpdateField('status', value)}></Dropdown>
                    </View>
                    <View style={styles.half}>
                        <Dropdown placeHolder={'Teams'} options={teamOptions}  onChange={(value) => handleUpdateField('teams', value)}></Dropdown>
                    </View>
                </View>

                <TextInput style={styles.input} placeholder={'Location'} value={tourneyForm.location} onChangeText={(text) => handleUpdateField('location', text)} placeholderTextColor="white"/>
                <TouchableOpacity style={styles.button} onPress={handleCreateTourney}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1c1d21ff",
        padding: 30,
        // alignItems: "center",
        borderRadius: 20
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#fff",
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#2C2F36",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: "#fff",
        marginBottom: 15,
        marginTop: 16,
        borderWidth: 2,
        borderColor: '#ff6b3580'
    },
    button: {
        width: '100%',
        marginBottom: 30
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
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 5
    },
    half: {
        flex: 1,
        marginHorizontal: 6, 
    }
  
})