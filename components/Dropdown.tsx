import React, { useState } from 'react';
  import { StyleSheet, View, Text } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';

  interface DropdownComponentProps {
    options: Array<{label: string, value: string}> | [],
    placeHolder: string,
    onChange: (value: string ) => void
  }

  export default function DropdownComponent(props: DropdownComponentProps)  {
    const [value, setValue] = useState(null);

    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        </View>
      );
    };

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={props.options? props.options : []}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={props.placeHolder? props.placeHolder: "Select an Item..."}
        // searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
          props.onChange(item.value)
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="white" name="Safety" size={20} />
        )}
        renderItem={renderItem}
      />
    );
  };


  const styles = StyleSheet.create({
    dropdown: {
      marginTop: 10,
      marginBottom: 10,
      width: '100%',
      height: 50,
      backgroundColor: '#2C2F36',
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#ff6b3580',
      padding: 12,
      shadowColor: '#ff6b3580',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    icon: {
        marginRight: 5,
        color: '#ff6b3580'
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#2C2F36'
    },
    textItem: {
      flex: 1,
      fontSize: 16,
      color: 'white'
    },
    placeholderStyle: {
      fontSize: 16,
      color: 'white'
    },
    selectedTextStyle: {
      fontSize: 16,
      color: 'white'
    },
    iconStyle: {
      width: 20,
      height: 20,
     
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      backgroundColor: '#2C2F36'
    },
  });