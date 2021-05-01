/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  View,
  Dimensions,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Carousel from 'react-native-snap-carousel';




const App = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    SplashScreen.hide();
    getData();
  }, [])


  const getData = async () => {
    let response = await fetch(
      'https://api.npoint.io/37b45696930569b078e1'
    );
    let json = await response.json();
    setData(json)
    setLoading(true)
  }

  console.log('api', data);

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.wrapper}>
        <Image style={styles.image} source={{ uri: item.bg }} />
        <Text style={styles.company}>{item.company}</Text>
        <Text style={styles.design}>{item.designation}</Text>
      </View>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      {loading ?
        <View style={styles.containerInner}>
          <Text style={styles.title}>Welcome</Text>
          <View style={styles.carouselWrapper}>
            <Carousel
              ref={(c) => { _carousel = c; }}
              data={data}
              layout={'default'}
              renderItem={_renderItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={300}
            />
          </View>
        </View> :
        <ActivityIndicator size="large" color="#00ff00" />
      }

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent:'center',

  },
  containerInner: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
  },
  wrapper: {
    backgroundColor: '#424242',
    width: '100%',
    height: 270,
    borderRadius:10,
  },
  company: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  design: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 15
  },
  carouselWrapper:{
    marginTop:100
  },
});

export default App;
