'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

class Header extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render() {

  	const { title } = this.props;

    return (
      <View style={styles.titleContain}>
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
	titleContain:{
    backgroundColor: '#009688',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    flex: 1,
    fontSize: 20,
    color: '#FFFFFF',
    alignItems: 'center',
  },
});


export default Header;