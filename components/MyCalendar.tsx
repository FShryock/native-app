import { StyleSheet, Text, View } from "react-native";
import React from 'react';
import { Calendar } from 'react-native-calendars';

export type events = {
    title: string,
    start: string,
    end?: string,
    info: string
}

interface MyCalendarProps {
    events: Array<events>,
    mode?: string
}


export default function MyCalendar(props: MyCalendarProps) {
    const datesArr = props.events.map((date: events) =>{
        return date.start
    });


    const tourneyDates: {} = {};

    datesArr.forEach(date => {
        tourneyDates[date] = {selected: true, marked: true, selectedColor: '#ff5722' }
    })


    return (
        <View style={styles.container}>
            <Calendar
            onDayPress={(day)=> {console.log('pressed day: ', day)}}
             // Mark specific dates
            markedDates={tourneyDates}
            />
            <View>
                <Text>Here is where the rest information will be!</Text>
            </View>
        </View>
    );
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
    }
})