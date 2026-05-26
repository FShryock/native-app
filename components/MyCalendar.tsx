import { StyleSheet, Text, View } from "react-native";
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { CalendarItemType } from "../types";

interface MyCalendarProps {
    events: Array<CalendarItemType>,
    mode?: string
}

export default function MyCalendar(props: MyCalendarProps) {
    const [info, setInfo] = useState('');
    const datesArr = props.events.map((date: CalendarItemType) =>{
        return date
    });

    const tourneyDates: Record<string, { selected: boolean; marked: boolean; selectedColor: string }> = {};
    datesArr.forEach(date => {
        tourneyDates[date.tournament.date] = {selected: true, marked: true, selectedColor: '#ff5722' }
    });

    const displayTourneyInfo = (dateString: string) => {
        const match = datesArr.find((date: CalendarItemType) =>date.tournament.date === dateString);

        if (match) {
            const tourneyInfo =
                `You are registered to play ${match.tournament.name} Tournament, Division ${match.tournament.level} at ${match.tournament.location}`;
            setInfo(tourneyInfo);
        } else {
            setInfo('');
        }
    }


    return (
        <View style={styles.container}>
            <Calendar
            onDayPress={(day)=> {displayTourneyInfo(day.dateString)}}
             // Mark specific dates
            markedDates={tourneyDates}
            />
            <View style={info? styles.info : null}>
                <Text style={styles.info_text}>{info}</Text>
            </View>
        </View>
    );
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
    },
    info: {
        // flex: 3,
        backgroundColor: '#ff5722',
        height: 60,
        margin: 8,
        borderRadius: 15,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    info_text: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600'
    }
})