// Action Creators
export function searchTracks(term){
	return {
		type: 'SEARCH_TRACKS',
		term: term
	};
}
export function selectTrack(track){
	return {
		type: 'SELECT_TRACK',
		track: track
	};
}
export function updateElapsedTime(time){
	return {
		type: 'UPDATE_ELAPSED_TIME',
		time: time
	};
}
export function updatePlayStatus(isPlaying){
	return {
		type: 'UPDATE_PLAY_STATUS',
		isPlaying: isPlaying
	};
}
export function updateVolume(volume){
	return {
		type: 'UPDATE_VOLUME',
		volume: volume
	};
}