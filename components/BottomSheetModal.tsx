import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  topGap?: number; // optional top gap
}

export default function BottomSheetModal(props: BottomSheetModalProps) {
  return (
    <Modal
      visible={props.visible}
      animationType="slide"
      transparent
      onRequestClose={props.onClose}
    >
      <View style={[styles.modalOverlay, { paddingTop: props.topGap? props.topGap : 100 }]}>
        <View style={styles.bottomSheet}>
          {/* Close button top-right */}
          <TouchableOpacity style={styles.closeButton} onPress={props.onClose}>
            <Ionicons name="close" size={24} color="#dce6f8" />
          </TouchableOpacity>

          {/* Modal content */}
          {props.children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  bottomSheet: {
    flex: 1,
    padding: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
});
