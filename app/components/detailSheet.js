'use strict';

import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

class detailSheet extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
      values: [],
    };
  }

  componentWillMount() {
  	const { idSheet ,user } = this.props;

    this._getDataSheets(idSheet,user.accessToken).then((responseJson) => { 

		const titleFirstItem = responseJson.sheets[0].properties.title;
		
		this._getDataSheetRow(idSheet, titleFirstItem, user.accessToken).then((response) => { 

      this.setState({
        values: response.values,
      });

			}).catch((error) => {
		        console.error(error);
		    });

    }).catch((error) => {
        console.error(error);
    });
  }

  render() {
   


  	const { idSheet ,user, title } = this.props;
    const leftButtonConfig = {
        title: 'Back',
        tintColor: '#68EFAD',
        handler: () => {
         this._navigate(user)
        }
      };

    const titleConfig = {
      title: 'Sheet Detail',
      tintColor: '#FFFFFF',

    };

    const values = this.state.values;
    var stylesRow = styles.row;
    var detailSheet =[];

    for (let row of values) {
        if(row == values[0]){
           stylesRow = styles.rowFirst;
        }
        else{
          stylesRow = styles.row;
        }
        detailSheet.push(
          <View key={row.key} style={stylesRow}>
            {row.map((col,index) =>{
                return(
                  <View style={styles.col}>
                    <Text key={index} >
                      {col}
                    </Text>
                  </View>
                )
               })
            }  
          </View>
       )
    }

    return (
      <View style={styles.container}>

       <NavigationBar
         leftButton={leftButtonConfig}
        title={titleConfig}
        tintColor="#7A1EA1"
         />
         <Text style={styles.titleSheet}>
           {title}
         </Text>

         <View style={styles.table}>
           {detailSheet}
         </View>

      </View>
    );
  }
  _navigate(property){
  	 this.props.navigator.pop({
      name: 'ListSheets', // Matches route.name
      passProps: {
        user: property
      }
    })
  }

  _getDataSheets(idSheets,accessToken){
  	var url = "https://sheets.googleapis.com/v4/spreadsheets/" + idSheets;
  	var obj = {
  		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + accessToken
		  },
  	}
  	return fetch(url,obj)
      .then((response) => response.json());
  }
  
  _getDataSheetRow(idSheets,name,accessToken){
  	var url = "https://sheets.googleapis.com/v4/spreadsheets/" + idSheets +"/values/"+ name;
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
  table:{
    flex: 1,
    backgroundColor: '#68EFAD',
  },
  titleSheet: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',

  },
  rowFirst: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#00BFA5'
  },
  col:{
    flex: 1,
    alignItems: 'center'
  },


});


export default detailSheet;