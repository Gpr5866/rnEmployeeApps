/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import { createAppContainer, NavigationAction } from "react-navigation"

import ListMovies from "./screens/list_movies";
import DetailMovies from "./screens/detail_movies"

const HomeNavigator = createStackNavigator({
  ListMovies: { screen: ListMovies, navigationOptions: () => ({ headerShown: false, animationEnabled: false })},
  DetailMovies: { screen: DetailMovies, navigationOptions: () => ({ headerShown: false, animationEnabled: false })},
}, {
  initialRouteName: "ListMovies",
})

HomeNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index]
  let navigationOptions = {}
  
  if (routeName == 'ListMovies') {
      navigationOptions.tabBarVisible = true
  } else {
      navigationOptions.tabBarVisible = false
  }
  
  return navigationOptions
}

const Apps = createAppContainer(HomeNavigator)

export default function App() {
  return(
    <Apps />
  )
}
