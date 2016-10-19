'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Navigator,
  TouchableOpacity,
  Text,
  StatusBar
} from 'react-native';

import App from './app';
import CounterApp from './counterApp';
import TodoApp from './todoApp';
import GoogleApp from './googleApp';


class NavigatorMain extends Component {


  renderScene(route, navigator){
		if(route.name == 'Counter'){
			return <CounterApp navigator={navigator} />
		}else if(route.name == 'ToDo'){
			return <TodoApp navigator={navigator} />
		}
    else if(route.name == 'Google'){
      return <GoogleApp navigator={navigator} />
    }
	}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
             backgroundColor="#691A99"
             barStyle="light-content"
           />
      	<Navigator
      	  initialRoute={{name: 'Google', index: 0}}
      	  renderScene={this.renderScene}
      	/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});

export default NavigatorMain;