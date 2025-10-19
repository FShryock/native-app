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
            <Ionicons name="close" size={24} color="#333" />
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
    // backgroundColor: 'rgba(0,0,0,0.3)',
    backgroundColor: 'rgba(89, 74, 255, 0.3)',
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 1,
    borderWidth: 3,
    borderTopColor: 'rgba(89, 74, 255, 0.92)',
    borderLeftColor: 'rgba(89, 74, 255, 0.92)',
    borderRightColor:'rgba(89, 74, 255, 0.92)'
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
});
