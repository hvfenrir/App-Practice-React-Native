'use strict';

import React, { Component } from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ListView
} from 'react-native';

class ButtonLoginGG extends Component {
	constructor(props) {
	  super(props);
	const ds = new ListView.DataSource({rowHasChanged: (row1,row2) => row1 !== row2});
	  this.state = {
	  	dataSource: ds
	  };
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
		      	this.setState({user: user});
				 this._getFileGoogleDrive(this.state.user.accessToken).then((responseJson) => {      
				 		
		      			this.setState(
		      				{
		      					dataSource: this.state.dataSource.cloneWithRows(responseJson.items)
		      				});
		      			console.log(responseJson.items);
				    }).catch((error) => {
				        console.error(error);
				    });
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
      <View style={{flex: 1}}>
      	 <GoogleSigninButton
		    style={{width: 48, height: 48}}
		    size={GoogleSigninButton.Size.Icon}
		    color={GoogleSigninButton.Color.Dark}
		    onPress={() => this._signIn()}
		   />
		  <TouchableOpacity 
		   style={{ height: 48}} 
		   onPress={() => this._signOut()} 
		   > 
		  	<Text>
		  	  Sign Out
		  	</Text>

		  </TouchableOpacity>
		  <TouchableOpacity>
		  	<Text>
		  	  Get files Drive 
		  	</Text>
		  </TouchableOpacity>
		   <ListView
				   dataSource={this.state.dataSource}
				   renderRow={this.listSheets} 
				   />
      </View>
    );
  }
  
  componentDidMount() {
   
  }

  listSheets(property){
  	return(
  		<View style={styles.view}>
  			<Text style={styles.text}>
  			  {property.title}
  			</Text>
  		</View>
  	)
  }

  _signIn(){
  	GoogleSignin.signIn()
	.then((user) => {
	  console.log('ok');
	  this.setState({user: user});
	   this._getFileGoogleDrive(this.state.user.accessToken).then((responseJson) => {      
	     console.log(responseJson);

	    }).catch((error) => {
	        console.error(error);
	    });
	})
	.catch((err) => {
	  console.log('WRONG SIGNIN', err);
	})
	.done();
  }

  _signOut(){
  	GoogleSignin.signOut()
	.then(() => {
	  console.log('out');
	})
	.catch((err) => {

	});
  }
  _getFileGoogleDrive(accessToken){
  	var url = "https://www.googleapis.com/drive/v2/files?corpus=DOMAIN&maxResults=10&projection=FULL&q=mimeType+%3D+'application%2Fvnd.google-apps.spreadsheet'&fields=items";
  	var url2 = "https://sheets.googleapis.com/v4/spreadsheets/1ApOIQEaBkmWuZj_3MzQFxwHUVk4zcIuL_POm3w5qsXc/values/Sheet1!A1:D5";
  	var obj = {
  		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + accessToken
		  },
  	}
  	return fetch(url,obj)
      .then((response) => response.json());
  }
}

const styles = StyleSheet.create({

});


export default ButtonLoginGG;