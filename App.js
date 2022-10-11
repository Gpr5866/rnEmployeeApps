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

import ListEmployee from "./screens/employee_list"
import DetailEmployee from "./screens/employee_detail"
import CreateEmployee from "./screens/employee_create"
import EditEmployee from './screens/employee_edit';

const HomeNavigator = createStackNavigator({
  ListEmployee: { screen: ListEmployee, navigationOptions: () => ({ headerShown: false, animationEnabled: false })},
  DetailEmployee: { screen: DetailEmployee, navigationOptions: () => ({ headerShown: false, animationEnabled: false })},
  CreateEmployee: { screen: CreateEmployee, navigationOptions: () => ({ headerShown: false, animationEnabled: false })},
  EditEmployee: { screen: EditEmployee, navigationOptions: () => ({ headerShown: false, animationEnabled: false })},
}, {
  initialRouteName: "ListEmployee",
})

HomeNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index]
  let navigationOptions = {}
  
  if (routeName == 'ListEmployee') {
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
