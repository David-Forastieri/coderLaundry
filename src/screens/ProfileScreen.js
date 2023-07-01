import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../../firebase'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'

const ProfileScreen = () => {

  const user = auth.currentUser
  const navigation = useNavigation()
  const singOutUser = () => {
    signOut(auth).then(() => {
      navigation.navigate("Login")
    }).catch(err => { console.log(err) })
  }

  return (
    <SafeAreaView style={styles.main}>
      <TouchableOpacity style={{ marginVertical: 10 }}>
        <Text>Welcome {user.email}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={singOutUser} >
        <Text>Sing Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})