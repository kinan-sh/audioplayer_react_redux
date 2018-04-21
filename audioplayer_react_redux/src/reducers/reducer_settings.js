// General Settings Reducer

// Initial settings for the player, it could be extended with more settings
const initialSettings = {
	volume: 0.5
}
export default function(state=initialSettings, action){
	// Process change volume action
	switch(action.type) {
		case 'UPDATE_VOLUME':
		return Object.assign({},state,{volume: action.volume});

		default: 
		return state;
	}
}