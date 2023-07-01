import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
//import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = () => {

  const navigation = useNavigation()
  const [emailAdrress, setEmailAdrress] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")

  const handleRegister = () => {
    if (emailAdrress === "" || password === "" || phone === "") {
      Alert.alert('Invalid Details', 'Please fill all the details', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ], { cancelable: false }
      );
    }
    createUserWithEmailAndPassword(auth, emailAdrress, password).then((userCredential) => {
      console.log("user credential", userCredential);
      const user = userCredential._tokenResponse.email;
      const myUserUid = auth.currentUser.uid;

      setDoc(doc(db, "users", `${myUserUid}`), {
        email: user,
        phone: phone
      })
    })
    navigation.replace("Home")
  }

  return (
    <SafeAreaView style={styles.content}>
      <KeyboardAvoidingView>
        <View style={styles.contentView}>
          <Text style={styles.singIn}>Register</Text>
          <Text style={styles.text}>Create a new Account</Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={styles.inputContent}>
            <MaterialCommunityIcons name="email-outline" size={24} color="black" />
            <TextInput
              value={emailAdrress}
              onChangeText={(text) => setEmailAdrress(text)}
              style={styles.inputText}
              placeholder='Email Address' />
          </View>

          <View style={styles.inputContent}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.inputText}
              placeholder='Password' />
          </View>

          <View style={styles.inputContent}>
            <Feather name="phone" size={24} color="black" />
            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              style={styles.inputText}
              placeholder='Phone No' />
          </View>

          <TouchableOpacity onPress={() => handleRegister()} style={styles.buttonLogin}>
            <Text style={styles.textLogin}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
            <Text style={styles.noLogin}>Already have a account? Sing In</Text>
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10
  },
  contentView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  singIn: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#662d91'
  },
  text: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600'
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputText: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: 300,
    marginLeft: 13,
    marginVertical: 20
  },
  buttonLogin: {
    width: 200,
    backgroundColor: '#318ce7',
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  textLogin: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },
  noLogin: {
    textAlign: 'center',
    fontSize: 17,
    color: 'gray',
    fontWeight: '500'
  }
})