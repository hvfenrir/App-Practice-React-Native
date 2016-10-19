'use strict';

import React, { Component } from 'react';
import ButtonLoginGG from '../components/buttonLoginGG';
import LoginGG from '../components/loginGG';
import ListSheets from '../components/listSheets';
import DetailSheet from '../components/detailSheet';

import {
  StyleSheet,
  View,
  Navigator

} from 'react-native';

class GoogleApp extends Component {

  renderScene(route, navigator){
    if(route.name == 'Login'){
      return <LoginGG navigator={navigator}/>
    }else if(route.name=='DetailSheet'){
      return <DetailSheet navigator={navigator} idSheet={route.passProps.idSheet} user={route.passProps.user} title={route.passProps.title} />
    }
    else if(route.name=='ListSheets'){
      return <ListSheets navigator={navigator} user={route.passProps.user}/>
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
      	<Navigator
          initialRoute={{name: 'Login', index: 0}}
          renderScene={this.renderScene}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	
});


export default GoogleApp;