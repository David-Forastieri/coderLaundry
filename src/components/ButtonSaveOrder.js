import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const ButtonSaveOrder = ({ placeOrder }) => {
  const CartState = useSelector((state) => state.cart.cart)

  const totalPrice = CartState.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)

  return (
    <>
      {totalPrice === 0 ? null : (
        <TouchableOpacity style={styles.button}>
          <TouchableOpacity onPress={() => placeOrder()}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Save Order
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </>
  )
}

export default ButtonSaveOrder

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#088F8F",
    marginTop: "auto",
    padding: 10,
    marginBottom: 40,
    margin: 15,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }
})