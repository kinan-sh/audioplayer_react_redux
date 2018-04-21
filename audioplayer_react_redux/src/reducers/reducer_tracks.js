// Tracks Reducer

// Initial tracks
const initialTracks = [
		{id: 1, title: 'John - track1', url: '/songs/track1.mp3', duration: "00:3:45"},
		{id: 2, title: 'Johny - track2', url: '/songs/track2.mp3', duration: "00:00:43"},
		{id: 3, title: 'Scott - track3', url: '/songs/track3.mp3', duration: "00:00:05"},
		{id: 4, title: 'Tiger - track4', url: '/songs/track4.mp3', duration: "00:00:18"}
	];

export default function(state = initialTracks, action){
	switch(action.type) {
		// Process search action
		case 'SEARCH_TRACKS':
		return initialTracks.filter((track) => track.title.toLowerCase().indexOf(action.term.toLowerCase()) > -1);
		
		default: 
		return state;
	}
}