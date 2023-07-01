import { SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const LoginScreen = () => {

  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [emailAdrress, setEmailAdrress] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    setLoading(true)
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false)
      }
      if (authUser) {
        navigation.navigate("Home")
      }
    })
    return unsubscribe
  }, [])

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, emailAdrress, password).then((userCredential) => {
      console.log("user credential", userCredential);
      const user = userCredential.user;
      console.log("user details", user)
    })
  }

  return (
    <SafeAreaView style={styles.content}>

      {
        loading ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flex: 1 }}>
            <Text></Text>
            <ActivityIndicator size={'large'} color={'red'} />
          </View>
        ) :
          <KeyboardAvoidingView>
            <View style={styles.contentView}>
              <Text style={styles.singIn}>Sing In</Text>
              <Text style={styles.text}>Sing In to your account</Text>
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

              <TouchableOpacity onPress={() => handleLogin()} style={styles.buttonLogin}>
                <Text style={styles.textLogin}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
                <Text style={styles.noLogin}>Don't have a account? Sing UP</Text>
              </TouchableOpacity>
            </View>

          </KeyboardAvoidingView>
      }

    </SafeAreaView>
  )
}

export default LoginScreen

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