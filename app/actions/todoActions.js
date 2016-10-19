import * as types from './actionTypes'

export function addToDo(item){
	return {
		type: types.ADD_TO_DO,
		todo: {
			name: item,
			completed: false
		}
	};
}