import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { incrementQuantity, decrementQuantity } from '../Redux/CartReducer'
import { incrementQty, decrementQty } from '../Redux/ProductsReducer'

const ButtonsCounter = ({ item }) => {

  const dispatch = useDispatch()

  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.selecButton}
        onPress={() => {
          dispatch(decrementQuantity(item));
          dispatch(decrementQty(item));
        }} >
        <Text style={styles.text}>-</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.textQuantity}>{item.quantity}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.selecButton}
        onPress={() => {
          dispatch(incrementQuantity(item));
          dispatch(incrementQty(item));
        }} >
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default ButtonsCounter

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  selecButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: '#bebebe',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: "center"
  },
  textQuantity: {
    fontSize: 19,
    color: '#088f8f',
    paddingHorizontal: 8,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    color: "#088f8f",
    paddingHorizontal: 6,
    fontWeight: "600",
    textAlign: 'center'
  }
})
