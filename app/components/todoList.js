import React, { Component } from "react";
import { 
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TextInput ,
	ListView
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar}from 'react-native-scrollable-tab-view';
import Counter from '../containers/counterApp';

export default class ToDoList extends Component{
	constructor(props) {
	  super(props);
	  
	  const ds = new ListView.DataSource({rowHasChanged: (row1,row2) => row1 !== row2});
	  this.state= {
	  	text: '',
	  	dataSource: ds
	  }

	  if(this.props.todos){
	  	this.state.dataSource = this.state.dataSource.cloneWithRows(this.props.todos);
	  }

	}
	_onPress = () => {
		// this.props.addToDo('abc');
	}

	componentWillReceiveProps (nextProps) {
	  if (nextProps.todos !== this.props.todos) {
	    this.setState({
	      dataSource: this.state.dataSource.cloneWithRows(nextProps.todos)
	    })
	  }
	 }
	render(){
		const { addToDo , todos} = this.props;

		return(
			<View>
				<ScrollableTabView
					 style={{marginTop: 20, }}
				      initialPage={0}
				      renderTabBar={() => <ScrollableTabBar />}
				>
			       <Text tabLabel='Tab #1'>My</Text>
				      <Text tabLabel='Tab #2 word word'>favorite</Text>
				      <Text tabLabel='Tab #3 word word word'>project</Text>
				      <Text tabLabel='Tab #4 word word word word'>favorite</Text>
				      <Text tabLabel='Tab #5'>project</Text>
		      	</ScrollableTabView>

				<Text>{todos.length}</Text>
				<TouchableOpacity onPress = {() => addToDo(this.state.text)} >
					<Text>ADD</Text>
				</TouchableOpacity>
				<TextInput 
					onChangeText={(text) => this.setState({text})}
					value={this.state.text}
				 />	
				 <Text> List to do</Text>
				 <ListView
				   dataSource={this.state.dataSource}
				   renderRow={this.listTodo} />
				 
			</View>			
		);
	}

	listTodo(property){
	    return(
	      <View style={styles.listTodo}>
	        <TouchableOpacity>
	          <Text style={styles.titleTask}>
	            {(property.name) ?  property.name : 'Helo'}
	          </Text>
	        </TouchableOpacity>
	      </View>
	    )
	  }
}	
const styles = StyleSheet.create({
  
});