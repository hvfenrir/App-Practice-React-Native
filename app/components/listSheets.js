'use strict';

import React, { Component } from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { Button, Card } from 'react-native-material-design';
import NavigationBar from 'react-native-navbar';


import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native';

class listSheets extends Component {
	
  constructor(props) {
	  super(props);
	 
	  const ds = new ListView.DataSource({rowHasChanged: (row1,row2) => row1 !== row2});
	 
	  this.state = {
	  	user: [],
	  	dataSource: ds
	  };
	  this._navigate = this._navigate.bind(this);
  }

  componentWillMount() {
  	const { user } = this.props;
  console.log(GoogleSignin.currentUser());
  	// console.log(user);

  	// Fetch data google sheets
	this._getFileGoogleDrive(user.accessToken).then((responseJson) => {      
     // console.log(responseJson);
     this.setState({
     	dataSource: this.state.dataSource.cloneWithRows(responseJson.items)
     });

    }).catch((error) => {
        console.error(error);
    });
  }

  render() { 	
     // const rightButtonConfig = {
     //    title: 'Next',
     //    tintColor: '#68EFAD',
     //    handler: () => {
     //      alert('hello!');
     //    }
     //  };

      const titleConfig = {
        title: 'List Google Sheets',
        tintColor: '#FFFFFF',

      };

      const leftButtonConfig ={
        title: 'Sign out',
        tintColor: '#68EFAD',

        handler: () => this._signOut()
      };

    return (
      <View style={styles.container}>
         <NavigationBar
         leftButton={leftButtonConfig}
        title={titleConfig}
        tintColor="#7A1EA1"
         />
       
	      <ListView
	        style={styles.list}
	        dataSource={this.state.dataSource}
	        renderRow={this.itemSheet.bind(this)} 
	        />
	      
      </View>
    );
  }
  
  itemSheet(property){
  	const { user } = this.props;
    const colorBtn = {
      textColor: '#00BFA5',
      backgroundColor: '#68EFAD',
      rippleColor: '#68EFAD'
    };
  	return(
        <Card style={styles.card}>
            <Card.Body>
                <Text>{property.title}</Text>
            </Card.Body>
            <Card.Actions position="right" style={styles.btn}>
                <Button overrides={colorBtn} text="See More" value="ACTION" onPress={() => this._navigate(property.id, property.title ,user)}/>
            </Card.Actions>
        </Card>
  		
  	)
  }

  _signOut(){
    GoogleSignin.signOut()
    	.then(() => {
    	  console.log('out');
       
    	  this.props.navigator.pop({
          		name: 'Login', // Matches route.name
    	     
    	 })
  	})
  	.catch((err) => {

  	});
  }

  _navigate(property, title ,user){

  	this.props.navigator.push({
      name: 'DetailSheet', // Matches route.name
      passProps: {
        idSheet: property,
        title: title,
        user: user
      }
    })
  }

  _getFileGoogleDrive(accessToken){
  	var url = "https://www.googleapis.com/drive/v2/files?corpus=DOMAIN&maxResults=10&projection=FULL&q=mimeType+%3D+'application%2Fvnd.google-apps.spreadsheet'&fields=items";
  
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
  container:{
    flex: 1
  },
  list: {
    flex: 1
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#68EFAD',
    color: '#00BFA5'
  },
  card: {
    flex: 0.5,
    flexDirection: 'row',
    backgroundColor: '#68EFAD'
  }
});


export default listSheets;