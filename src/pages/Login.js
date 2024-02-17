import React, { useEffect, useState } from "react"
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet, 
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../services/api"
import logo from "../assets/logo.png"

export default function Login({navigation}) {
  const [email, setEmail] = useState("")
  const [techs, setTechs] = useState("")
  
  useEffect(() => {
    AsyncStorage.getItem('user').then(user=> {
    if (user){
      navigation.navigate('List');
    }
    })
  },[])

  async function handleSubmit() {
    const response= await api.post('/sessions', {
      email
    })

    const {_id} = response.data
    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs)
    navigation.navigate('List')
  }

  return (
    <View style={styles.container} behavior="padding">
      <Image source={logo} style={styles.img} />
      <Text style={styles.labelLogo}>AirBnB Tech</Text>

      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none" //tira função de letra maiuscula automatica
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words" //tira função de letra maiuscula automatica
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontre seus spots</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
  },

  labelLogo: {
    color: "#f05a5b",
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 20,
  },

  form: {
    marginTop: 35,
    alignSelf: "stretch",
    paddingHorizontal: 30,
  },

  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },

  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
})
