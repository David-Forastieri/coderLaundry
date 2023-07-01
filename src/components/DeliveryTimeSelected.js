import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import deliveryTime from '../constanst/DeliveryTime'

const DeliveryTimeSelected = ({ setSelectedTime, selectedTime }) => {
  return (
    <>
      <Text style={styles.title}>Select Time</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        {deliveryTime.map((time) => (
          <TouchableOpacity
            key={time.id}
            onPress={() => setSelectedTime(time.time)}
            style={selectedTime.includes(time.time) ?
              { ...styles.buttonTime, borderColor: '#088f8f', borderWidth: 1 }
              : styles.buttonTime
            }>
            <Text>{time.time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  )
}

export default DeliveryTimeSelected

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 10
  },
  buttonTime: {
    margin: 10,
    borderRadius: 7,
    padding: 15,
    borderColor: "gray",
    borderWidth: 0.7
  },
})