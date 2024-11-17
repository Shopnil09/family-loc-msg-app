import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { database } from '../firebase'
import { getDoc, doc } from 'firebase/firestore'

const MapScreen = ({ navigation, route }) => {
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)

  useEffect(() => {
    /*TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
      if (error) {
        alert(error.message)
        return;
      }
      if (data) {
        const { locations } = data;
        console.log(locations)
        let updatedLocation = {}
        updatedLocation.longitude = locations[0].coords.longitude
        updatedLocation.latitude = locations[0].coords.latitude
        console.log(updatedLocation)
        updateCurrentLocation(updatedLocation)
      }
    });*/

    /*(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        alert('Foreground location permission denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      if (location) {
        setLatitude(location.coords.latitude)
        setLongitude(location.coords.longitude)
      }
    })()*/

    // check if task is defined or not --  if not, define it again and proceed with the code below
    // this needs to be written inside the family locations page before they enter the map screen
    /*Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
      deferredUpdatesDistance: 1000
    })*/

    getCurrentLocation()
  }, [])

  const getCurrentLocation = async () => {
    try {
      if (route.params.latitude || route.params.longitude) {
        setLongitude(route.params.longitude)
        setLatitude(route.params.latitude)
      } else {
        const userReference = doc(database, "users", route.params.user)
        const userDocument = await getDoc(userReference)
        const userLocation = userDocument.data().currentLocation
        setLongitude(userLocation.longitude)
        setLatitude(userLocation.latitude)
      }
    } catch (error) {
      alert(error)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitle: 'Family Locations'
    })
  })

  return (
    <MapView
      style={{
        flex: 1
      }}
      mapType="mutedStandard"
      region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        title={route.params.user}
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
      />
    </MapView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapScreen