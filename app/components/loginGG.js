'use strict';

import React, { Component } from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

class loginGG extends Component {

  constructor(props) {
    super(props);
  
    this.state = {};
  }
  
  componentWillMount() {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
    
    console.log('working');

	    GoogleSignin.configure({
		  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
		  webClientId: '59262062655-altfgut38djsfngdleaql8khl6aeum9k.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
		  offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
		})
		.then(() => {
		 	GoogleSignin.currentUserAsync().then((user) => {
		      console.log('USER', user);
		      if(user){
		      	// this.setState({user: user});
	  			this._navigate(user);
				
		      }
		      
		    }).done();
		});
	})
	.catch((err) => {
	  console.log("Play services error", err.code, err.message);
	})
   
  }

  render() {
    return (
       <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: 'https://www.appenate.com/wp-content/uploads/2016/04/google-sheets-logo-300x100.png'}}
        />
        <Text style={styles.welcome}>
          Welcome to Your World!
        </Text>
        <GoogleSigninButton
		    style={{width: 48, height: 48}}
		    size={GoogleSigninButton.Size.Icon}
		    color={GoogleSigninButton.Color.Dark}
		    onPress={() => this._signIn()}
		   />
      </View>
    );
  }
  
  _navigate(property){
    this.props.navigator.push({
      name: 'ListSheets', // Matches route.name
      passProps: {
        user: property
      }
    })
  }

  _signIn(){
  	GoogleSignin.signIn()
	.then((user) => {
	  console.log('ok');
	  // this.setState({user: user});
	  this._navigate(user);
	})
	.catch((err) => {
	  console.log('WRONG SIGNIN', err);
	})
	.done();
  }
}

const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#F5FCFF',
	  },
	  welcome: {
	    fontSize: 18,
	    textAlign: 'center',
	    margin: 5,
	  },
	  instructions: {
	    textAlign: 'center',
	    color: '#333333',
	    marginBottom: 5,
	  },
	  image: {
	  	width: 300,
	  	height: 100,
	  }
});


export default loginGG;