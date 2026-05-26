import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CalendarItemProps {
  // id: string,
  name: string,
  date: string
}

export default function CalendarItem({ name, date }: CalendarItemProps) {
  return (
    <View style={styles.calendarItems}>
      <Text style={styles.calendarTitle}>{name}</Text>
      <Text style={styles.calendarDate}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarItems: {
    backgroundColor: '#ababab4a',
    width: 100,
    height: 80,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 10,
  },
  calendarTitle: {
    fontWeight: '700',
    fontSize: 12,
    marginTop: 3,
    padding: 8,
    color: '#fff',
  },
  calendarDate: {
    paddingLeft: 8,
    fontWeight: '600',
    color: '#ff5722',
  },
});
