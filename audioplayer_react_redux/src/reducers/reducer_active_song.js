// Active Track Reducer
export default function(state=null, action){
	switch(action.type) {
		// Process select track action
		case 'SELECT_TRACK':
			// If there is no previous state: return new track object
			if( !state ){ 
				return Object.assign({},action.track,{elapsedTime: 0, isPlaying: true});
			}
			// toggle play on select the same track twice, just return the old state and toggle isPlaying
			if(state.id == action.track.id){ 
			return Object.assign({},state,{isPlaying: !state.isPlaying});
			}
			// Else return the current track object 
			return Object.assign({},action.track,{elapsedTime: 0, isPlaying: true});
		// Process elapsed time action 
		case 'UPDATE_ELAPSED_TIME':
		return Object.assign({},state,{elapsedTime: action.time});
		// Process play pause action
		case 'UPDATE_PLAY_STATUS':
		return Object.assign({},state,{isPlaying: action.isPlaying});


		default: 
		return state;
	}
}