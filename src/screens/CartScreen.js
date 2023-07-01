import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ButtonsCounter from '../components/ButtonsCounter';
import CardDetail from '../components/CardDetail';
import ButtonSaveOrder from '../components/ButtonSaveOrder';
import { cleanCart } from '../Redux/CartReducer';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const CartScreen = () => {

  const CartState = useSelector((state) => state.cart.cart)
  const navigation = useNavigation()
  const userUid = auth.currentUser.uid
  const dispatch = useDispatch()
  const route = useRoute()
  const user = auth.currentUser
  const totalPrice = CartState.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)

  const placeOrder = async () => {
    navigation.navigate("Order")
    dispatch(cleanCart())
    await setDoc(doc(db, "orders", `${userUid}`), {
      user: user.email,
      orders: { ...CartState },
      pickUpDetails: route.params,
    },
      {
        merge: true
      })
  }
  return (
    <>
      <ScrollView style={{ marginTop: 50 }}>
        {totalPrice === 0 ?
          <View style={styles.text}>
            <Text>Your cart is empty</Text>
          </View>
          :
          <>
            <View style={styles.arrowBack}>
              <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
              <Text>Your Bucket</Text>
            </View>

            <TouchableOpacity style={styles.itemCard}>
              {CartState.map((item) => (
                <View style={styles.content} key={item.id}>
                  <Text style={styles.info}>{item.name}</Text>
                  <ButtonsCounter item={item} />
                  <Text style={styles.info}>$ {item.price * item.quantity}</Text>
                </View>
              ))}
            </TouchableOpacity>

            <CardDetail totalPrice={totalPrice} />
          </>
        }
      </ScrollView>

      <ButtonSaveOrder placeOrder={placeOrder} />
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  arrowBack: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginLeft: 10,
    marginRight: 10,
    padding: 14
  },
  content: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  info: {
    width: 100,
    fontSize: 16,
    fontWeight: '500'
  },

})