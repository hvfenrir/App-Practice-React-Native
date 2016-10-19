import * as types from '../actions/actionTypes';

const initialState ={
	todos:[] 
};

export default function todo(state = initialState.todos, action = {}){
	switch(action.type){
		case types.ADD_TO_DO:
			return [
				...state,
				action.todo
			];
		default:
			return state;
	}
}