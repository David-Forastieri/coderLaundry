import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ItemsToCheckout = ({ cart, total }) => {

  const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.cartButtom}>
      <View>
        <Text style={{ ...styles.textCart, fontSize: 16 }}>{cart.length} items | ${total} </Text>
        <Text style={styles.textCart}>extra charges might apply</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("PickUp")}>
        <Text style={styles.textPickup}>Poceed to pickup</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default ItemsToCheckout

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