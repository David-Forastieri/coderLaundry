import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../Redux/CartReducer'
import { incrementQty } from '../Redux/ProductsReducer'
import ButtonsCounter from './ButtonsCounter'

const DressItem = ({ item }) => {

  const Cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  const addItemToCart = () => {
    dispatch(addToCart(item))
    dispatch(incrementQty(item))
  }
  return (
    <View>
      <TouchableOpacity style={styles.cardProducts}>
        <View>
          <Image
            style={styles.image}
            source={{ uri: item.image }}
          />
        </View>
        <View>
          <Text style={styles.textName}>{item.name}</Text>
          <Text style={styles.textPrice}>${item.price}</Text>
        </View>

        {Cart.some((c) => c.id === item.id) ?
          <ButtonsCounter item={item} />
          :
          <TouchableOpacity onPress={addItemToCart} style={{ width: 80 }}>
            <Text style={styles.textBottom} >Add</Text>
          </TouchableOpacity>
        }
      </TouchableOpacity>

    </View>
  )
}

export default DressItem

const styles = StyleSheet.create({
  cardProducts: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 14
  },
  image: {
    width: 70,
    height: 70
  },
  textName: {
    width: 83,
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 7
  },
  textPrice: {
    width: 60,
    color: 'gray',
    fontSize: 15
  },
  textBottom: {
    borderColor: 'gray',
    borderRadius: 4,
    fontWeight: 'bold',
    borderWidth: 0.8,
    marginVertical: 10,
    color: '#088f8f',
    padding: 5,
    textAlign: "center",
  }
})