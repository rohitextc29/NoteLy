/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NoteList from './src/container/NoteList';
import axiosMiddleware from 'redux-axios-middleware';
import createStore from './src/store';
import { Provider } from 'react-redux';
import {SafeAreaView} from 'react-navigation';
import AppNavigator from './src/navigations/AppNavigator';
import NavigationService from './src/navigations/NavigationService';

const store = createStore();
global.store = store;

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#3c3d3c' }}>
          <View style={styles.container}>
            <AppNavigator ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef) }/>
          </View>
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
