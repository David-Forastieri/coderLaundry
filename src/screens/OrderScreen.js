import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native"
import { useNavigation } from '@react-navigation/native'

const OrderScreen = () => {

  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <LottieView
        source={require('../../assets/thumbs.json')}
        style={styles.animation}
        autoPlay
        loop={false}
        speed={0.7}
      />

      <Text style={styles.text}>Your order has been</Text>

      <LottieView
        source={require('../../assets/sparkle.json')}
        style={styles.image}
        autoPlay
        loop={false}
        speed={0.7}
      />

      <TouchableOpacity style={styles.Buttom} onPress={() => navigation.replace("Home")}>
        <Text style={styles.textButton}>Go to Home</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  animation: {
    height: 360,
    width: 300,
    alignSelf: 'center',
    marginTop: 40,
    justifyContent: 'center'
  },
  text: {
    marginTop: 40,
    fontSize: 19,
    fontWeight: "600",
    textAlign: 'center'
  },
  image: {
    height: 300,
    position: 'absolute',
    top: 100,
    width: 300,
    alignSelf: 'center'
  },
  Buttom: {
    backgroundColor: '#088f8f',
    padding: 10,
    marginVertical: 100,
    marginHorizontal: 50,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center'
  },
  textButton: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
  }
})