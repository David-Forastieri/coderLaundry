import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import deliveryDays from './../constanst/DeliveryDays';

const DeliveryDaysSelected = ({ setSelectedDay, selectedDay }) => {
  return (
    <>
      <Text style={styles.title}>Delivery Date</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        {deliveryDays.map((day) => (
          <TouchableOpacity
            key={day.id}
            onPress={() => setSelectedDay(day.name)}
            style={selectedDay.includes(day.name) ?
              { ...styles.buttonTime, borderColor: '#088f8f', borderWidth: 1 }
              : styles.buttonTime
            }>
            <Text>{day.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  )
}

export default DeliveryDaysSelected

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