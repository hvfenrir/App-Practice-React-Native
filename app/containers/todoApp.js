'use strict';

import React, { Component } from 'react';
import TodoList from './../components/todoList';
import * as todoActions from '../actions/todoActions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from '../components/header';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

class TodoApp extends Component {

   constructor(props) {
	    super(props);
	 }
	 
  render() {
    const { state, actions } = this.props;
    console.log(state);
    return (
      <View style={styles.todo}>
      <Header title='Toto App' />
      <TodoList todos={state} {...actions} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todo: {
    flex: 1
  }
});


export default connect(state => ({
    state: state.todo
  }),
  (dispatch) => ({
    actions: bindActionCreators(todoActions, dispatch)
  })
)(TodoApp);