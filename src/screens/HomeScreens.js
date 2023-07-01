import { StyleSheet, Text, View, Alert, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from "expo-location"
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';
import Services from '../components/Services';
import ProductsServices from '../constanst/ProductsServices';
import DressItem from '../components/DressItem';
import { getProducts } from '../Redux/ProductsReducer';
import { useDispatch, useSelector } from 'react-redux';
import ItemsToCheckout from '../components/ItemsToCheckout';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const HomeScreens = () => {

  const CartState = useSelector((state) => state.cart.cart)
  const ProductState = useSelector((state) => state.product.products)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [itemsDB, setItemsDB] = useState([])
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState("We are loading your location")
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false)

  useEffect(() => {
    checkIfLOcationEnabled()
    getCurrentLocation()

    if (ProductState.length > 0) return

    const fetchProducts = async () => {
      const colRef = collection(db, "types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        itemsDB.push(doc.data())
      })
      itemsDB?.map((services) => dispatch(getProducts(services)))
    }
    fetchProducts()
  }, [])

  const checkIfLOcationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert('Location services not enabled', 'Please enable the location services', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ], { cancelable: false }
      );
    } else {
      setLocationServicesEnabled(enabled)
    }
  }

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Allow the app to use the location services', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ], { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync()

    if (coords) {
      const { latitude, longitude } = coords

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      })

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`
        setDisplayCurrentAddress(address)
      }
    }
  }

  const totalPrice = CartState.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)

  return (
    <>
      <ScrollView vertical style={{ backgroundColor: '#f0f0f0', marginTop: 50, flex: 1 }}>

        {/*------LOCATION----------------------- */}
        <View style={styles.locationMain} >
          <MaterialIcons name="location-on" size={30} color={colors.red} />
          <View>
            <Text style={styles.textHome} >Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.touchBotom} >
            <Image
              style={styles.image}
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/6326/6326055.png" }} />
          </TouchableOpacity>
        </View>

        {/*--------SEARCH-BAR------------------ */}
        <View style={styles.searchBar}>
          <TextInput placeholder='Search for items or More' />
          <Feather name="search" size={24} color={colors.red} />
        </View>

        {/*-----IMAGE BANNER----------------- */}

        <View style={{ width: '100%', height: 210 }}>
          <Image style={styles.imageBanner} source={{
            uri: 'https://img.freepik.com/vector-gratis/mujer-que-llevaba-canasta-lavanderia_1308-71203.jpg',
          }} />
        </View>

        {/*-----SERVICES------------------------*/}
        <Services />

        {ProductState.map((item) => (
          <DressItem item={item} key={item.id} />
        ))}

      </ScrollView>

      {/*-------ITEMS TO CART---------------------- */}
      {
        totalPrice === 0 ?
          null :
          (
            <ItemsToCheckout cart={CartState} total={totalPrice} />
          )
      }


    </>
  )
}

export default HomeScreens

const styles = StyleSheet.create({
  locationMain: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  touchBotom: {
    marginLeft: 'auto',
    marginRight: 7
  },
  textHome: {
    fontSize: 18,
    fontWeight: '600'
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.8,
    borderColor: '#c0c0c0',
    borderRadius: 7
  },
  imageBanner: {
    width: '100%',
    height: '100%'
  },
})