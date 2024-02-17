import React, { useState, useEffect } from "react"
import socketio from "socket.io-client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { View, Text, Image, StyleSheet, ScrollView, Alert } from "react-native"
import SpotList from "../components/SpotList"
import logo from "../assets/logo.png"

export default function List() {
  const [techs, setTechs] = useState([])

  useEffect(() => {
    AsyncStorage.getItem("user").then((user_id) => {
      const socket = socketio("http://192.168.0.74:3333", {
        query: { user_id },
      })

      socket.on("booking_response", (booking) => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        )
      })
    })
  }, [])

  useEffect(() => {
    AsyncStorage.getItem("techs").then((storagedTechs) => {
      const techsArray = storagedTechs.split(",").map((tech) => tech.trim())
      setTechs(techsArray)
    })
  }, [])

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.img} />
      <Text style={styles.labelLogo}>AirBnB Tech</Text>

      <ScrollView>
        {techs.map((tech) => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    alignSelf: "center",
    width: 60,
    height: 60,
  },

  labelLogo: {
    color: "#f05a5b",
    marginTop: 10,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
})
