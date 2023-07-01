import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ButtonProceedToCart = ({ cart, total, processToCart }) => {

  return (
    <TouchableOpacity style={styles.cartButtom}>
      <View>
        <Text style={{ ...styles.textCart, fontSize: 16 }}>{cart.length} items | ${total} </Text>
      </View>

      <TouchableOpacity onPress={() => processToCart()}>
        <Text style={styles.textPickup}>Poceed to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default ButtonProceedToCart

const styles = StyleSheet.create({
  cartButtom: {
    backgroundColor: '#088f8f',
    marginTop: 'auto',
    padding: 10,
    marginBottom: 40,
    margin: 15,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between'
  },
  textCart: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 3
  },
  textPickup: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
  }
})