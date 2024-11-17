import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { database, auth } from '../firebase'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { ListItem } from '@rneui/base'
import * as Location from 'expo-location'

import Ionicons from '@expo/vector-icons/Ionicons'

const LOCATION_TASK_NAME = 'background-location-task'

const FamilyMembersLocationScreen = ({ navigation }) => {
  const [familyMembers, setFamilyMembers] = useState([])

  /*TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      alert(error.message)
      return;
    }
    if (data) {
      const { locations } = data;
      //console.log(locations)
      let updatedLocation = {}
      updatedLocation.longitude = locations[0].coords.longitude
      updatedLocation.latitude = locations[0].coords.latitude
      //console.log(updatedLocation)
      updateCurrentLocation(updatedLocation)
    }
  });*/

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Family Locations",
      headerBackTitle: "Profile",
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity onPress={viewCurrentLocation}>
            <Ionicons
              name="pin-outline"
              size={25}
            />
          </TouchableOpacity>
        </View>
      )
    })
  })

  useEffect(() => {
    getFamilyMembers()
  }, [familyMembers])

  useEffect(() => {
    requestPermission()
    getLocation()
  }, [])

  const updateCurrentLocation = async (updatedLocation) => {
    try {
      const userReference = doc(database, "users", auth.currentUser.email)
      await updateDoc(userReference, {
        currentLocation: updatedLocation
      })
    } catch (error) {
      alert(error)
    }
  }

  const requestPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      alert('Permission not given')
      return
    }
  }

  const getLocation = async () => {
    try {
      Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      }, location => {
        let currentLocation = {}
        currentLocation.longitude = location.coords.longitude
        currentLocation.latitude = location.coords.latitude
        updateCurrentLocation(currentLocation)
      })
    } catch (error) {
      alert(error)
    }
  }

  const getFamilyMembers = async () => {
    try {
      const userReference = doc(database, "users", auth.currentUser.email)
      const userDocument = await getDoc(userReference)
      const userFamilyMembers = userDocument.data().familyMembers
      setFamilyMembers(userFamilyMembers)
      /*if (userFamilyMembers.lenght == 0) {
        setFamilyMembers([])
      } else {
        setFamilyMembers(userFamilyMembers)
      }*/
    } catch (error) {
      alert(error)
    }
  }

  const viewCurrentLocation = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({})
    if (currentLocation) {
      let location = {}
      location.longitude = currentLocation.coords.longitude
      location.latitude = currentLocation.coords.latitude
      console.log(location)
    }
    navigation.navigate("Map", {
      longitude: currentLocation.coords.longitude,
      latitude: currentLocation.coords.latitude
    })
  }

  const renderFlatListItem = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() => {
        navigation.navigate("Map", {
          user: item
        })
      }}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
              {item}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    </View>

  )

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <FlatList
          data={familyMembers}
          renderItem={renderFlatListItem}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 4
  }
});

export default FamilyMembersLocationScreen