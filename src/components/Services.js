import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Services = () => {

  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
    },
    {
      id: "1",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Laundry",
    },
    {
      id: "2",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Wash & Iron",
    },
    {
      id: "3",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    }
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Services Available</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          services.map((services) => (
            <TouchableOpacity key={services.id} style={styles.servicesBottom}>
              <Image source={{ uri: services.image }} style={styles.image} />
              <Text style={styles.textName}>{services.name}</Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 7
  },
  image: {
    width: 70,
    height: 70,
  },
  servicesBottom: {
    margin: 10,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 7
  },
  textName: {
    textAlign: 'center',
    marginTop: 10
  }
})