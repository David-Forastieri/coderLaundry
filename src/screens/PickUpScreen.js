import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker'
import DeliveryTimeSelected from '../components/DeliveryTimeSelected'
import DeliveryDaysSelected from '../components/DeliveryDaysSelected';
import { useSelector } from 'react-redux'
import ButtonProceedToCart from '../components/ButtonProceedToCart'
import { useNavigation } from '@react-navigation/native'

const PickUpScreen = () => {

  const navigation = useNavigation()
  const CartState = useSelector((state) => state.cart.cart)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedDay, setSelectedDay] = useState([])
  const [selectedTime, setSelectedTime] = useState([])

  const totalPrice = CartState.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)

  const ProcessToCart = () => {
    if (!selectedDate || !selectedDay || !selectedTime) {
      Alert.alert('Empty or invalid', 'Please select all the fields', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ], { cancelable: false });
    }

    if (selectedDate && selectedDay && selectedTime) {
      navigation.replace("Cart", {
        pickUpDate: selectedDate,
        selectedTime: selectedTime,
        no_Of_days: selectedDay
      })
    }

  }
  return (
    <>
      <SafeAreaView style={{ marginTop: 50 }}>
        <Text style={styles.title} >Enter Address</Text>
        <TextInput style={styles.input} />

        <Text style={styles.title}>Pick Up Date</Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date('2023-06-29')}
          endDate={new Date('2023-07-05')}
          //  initialSelectedDate={new Date('2023-06-26')}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        <DeliveryTimeSelected setSelectedTime={setSelectedTime} selectedTime={selectedTime} />

        <DeliveryDaysSelected setSelectedDay={setSelectedDay} selectedDay={selectedDay} />

      </SafeAreaView>

      {
        totalPrice === 0 ?
          null :
          (
            <ButtonProceedToCart cart={CartState} total={totalPrice} processToCart={ProcessToCart} />
          )
      }
    </>
  )
}

export default PickUpScreen

const styles = StyleSheet.create({
  input: {
    padding: 40,
    borderColor: 'gray',
    borderWidth: 0.7,
    paddingVertical: 80,
    borderRadius: 9,
    margin: 10
  },
})