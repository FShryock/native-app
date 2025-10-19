import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Tournament } from '../api/getTournaments'
import { Ionicons } from "@expo/vector-icons";

interface TournamentCardProps {
  tournament: Tournament;
}

export default function TournamentCard(props: TournamentCardProps) {

  const getStatus = (status: string) => { 
    switch (status) {
      case 'Open':
        return '#10b981';
      case 'Almost Full':
        return '#f59e0b';
      case 'Closed':
        return '#ef4444';
      default :
        return '#6b7280';
    }
  };

  const getLevelStyle = (level: string) => {
    switch (level) {
      case 'B':
        return { color: '#059669', backgroundColor: '#d1fae5'}
      case 'BB':
        return { color: '#2563EB', backgroundColor: '#DBEAFE' };
      case 'A' :
        return { color: '#DC2626', backgroundColor: '#ffa50673' };
      case 'AA':
        return { color: '#DC2626', backgroundColor: '#FEE2E2' };
      case 'Open':
        return { color: '#DC2626', backgroundColor: '#FEE2E2' };
      default: 
        return { color: '#6B7280', backgroundColor: '#F3F4F6' };
    }
  }

  const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
  }

  const formatRegistrationDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return `Reg. ends ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  }

  const isRegistrationClosed = props.tournament.status === 'closed';


  return(
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
          <View style={styles.titleSection}>
              <Text style={styles.emoji}>🏐</Text>
              <View style={styles.titleContent}>
                  <Text style={styles.title}>{props.tournament.name}</Text>
                  <View style={styles.badgeRow}>
                      <View style={[styles.difficultyBadge, getLevelStyle(props.tournament.level)]}>
                          <Text style={[styles.difficultyText, {color: getLevelStyle(props.tournament.level).color} ]}>
                              {props.tournament.level}
                          </Text>
                      </View>
                      <View style={[styles.statusDot, {backgroundColor: getStatus(props.tournament.status)}]} />
                      <Text style={styles.statusText}>{props.tournament.status}</Text>
                  </View>
              </View>
              <View style={styles.prizeSection}>
                  <Text style={styles.prizeAmount}>{props.tournament.prize_pool}</Text>
                  <Text style={styles.prizeLabel}>Prize Pool</Text>
              </View>
          </View>
      </View>

      {/* Details */}
      {/* DATE */}
      <View style={styles.detailsSection}>
          <Ionicons name={'calendar-outline'} size={16} color={'#6b7280'} />
          <Text style={styles.detailText}>{formatDate(props.tournament.date)}</Text>
      </View>
      {/* LOCATION */}
      <View style={styles.detailRow}>
          <Ionicons name={'location-outline'} size={16} color={'#6b7280'} />
          <Text style={styles.detailText}>{props.tournament.location}</Text>
      </View>

      {/* TEAMS & DEADLINE */}
      <View style={styles.bottomDetailsRow}>
          <View style={styles.detailRow}>
              <Ionicons name={'people-outline'} size={16} color={'#6b7280'} />
              <Text style={styles.detailText}>{`${props.tournament.teams_limit.toString()} Teams`} </Text>
          </View>

          <View style={styles.detailRow}>
              <Ionicons name={'time-outline'} size={16} color={'#6b7280'} />
              <Text style={styles.detailText}>{formatRegistrationDeadline(props.tournament.registration_deadline)}</Text>
          </View>
      </View>

      {/* REGISTRATION & DETAILS */}
      {/* <View style={styles.buttonSection}>
          <TouchableOpacity
          style={[
              styles.registerButton,
              isRegistrationClosed && styles.disabledButton
          ]}
          onPress={() => {console.log("Register function")}}
          disabled={isRegistrationClosed}
          >
          <Text style={[
              styles.registerButtonText,
              isRegistrationClosed && styles.disabledButtonText
          ]}>
              {isRegistrationClosed ? 'Closed' : 'Register Now'}
          </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => {console.log("details function")}}
          >
          <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
      </View> */}


    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  emoji: {
    fontSize: 24,
    marginRight: 12,
  },
  titleContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 22,
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
  },
  prizeSection: {
    alignItems: 'flex-end',
  },
  prizeAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: '#F97316',
    color: '#ff5722',
  },
  prizeLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  detailsSection: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  detailRow: {
    flexDirection: 'row',
    // alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  bottomDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    // flex: 1,
  },
  buttonSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#ff5722',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#F3F4F6',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
  detailsButton: {
    // backgroundColor: '#663ab7b5',
    // backgroundColor: '#F3F4F6',
    backgroundColor: '#a7a7c38c',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#663ab7',
    borderWidth: 2
  },
  detailsButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});
