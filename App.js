import React, { useState, useEffect, useRef } from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Locate from './assets/nav.png';
import { FAB } from 'react-native-elements';
import ViewShot from 'react-native-view-shot';
import axios from 'axios';
import * as ImageManipulator from 'expo-image-manipulator';

 

export default function App() {
  const ref = useRef();
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [ScreenShotImage, setScreenShotImage] = useState(null);

  const captureScreenshot = () => {

    ref.current.capture().then(uri=> {
      console.log("here is the screenshot", uri);
      setScreenShotImage(uri);        
    })
      

    axios.post("https://jsonplaceholder.typicode.com/posts",
     {
      "file": manipResult
    })
    .then(function (response) {
      console.log( "here is the image",JSON.stringify(response.data));
      console.log(manipResult);
    })
    .catch(function (error) {
      console.log(error);
    });

   
}
 
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
    
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location)
     
    })();
  }, []);



  return (
 
  <View style={styles.container}>
        <ViewShot ref={ref} style={{width: '100%', height: '100%'}} options={{  fileName: "",format: "jpg", quality: 0.9 }}> 
     <MapView style={styles.map} region={{latitude:location?.coords?.latitude, longitude:location?.coords?.longitude,  latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,}}>
         <Marker coordinate={{latitude: location?.coords?.latitude, longitude: location?.coords?.longitude}} image={Locate}/>
      </MapView>
      </ViewShot> 
    <FAB title="Take Screenshot" placement='center' size='small' color='black' onPress={captureScreenshot}    
    />   
          
   </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  },
 
});
